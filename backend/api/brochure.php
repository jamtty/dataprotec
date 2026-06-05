<?php
// backend/api/brochure.php  (브로슈어 게시판)
// GET  ?page&size&keyword&type&date_from&date_to  → 목록
// GET  ?id&with_files=1                           → 상세 (+파일목록)
// POST (multipart)                                → 등록
// POST _method=PUT                                → 수정
// DELETE ?id                                      → 삭제
// 등록/수정/삭제는 Bearer JWT 인증 필요

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

define('BRO_UPLOAD_DIR',      dirname(__DIR__, 2) . '/uploads/brochure/');
define('BRO_UPLOAD_WEB_PATH', '/uploads/brochure/');
define('BRO_ALLOWED_EXTS',    ['jpg','jpeg','png','gif','webp','pdf','doc','docx','xls','xlsx','ppt','pptx','zip','txt']);
define('BRO_MAX_FILE_SIZE',   20 * 1024 * 1024);

function broRequireAuth(): array {
    $auth = $_SERVER['HTTP_AUTHORIZATION']
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
        ?? (function_exists('getallheaders') ? (getallheaders()['Authorization'] ?? '') : '')
        ?? '';
    if (!preg_match('/^Bearer\s+(.+)$/i', $auth, $m)) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '인증이 필요합니다.']);
        exit;
    }
    $payload = verifyJWT($m[1]);
    if (!$payload) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '토큰이 유효하지 않습니다.']);
        exit;
    }
    return $payload;
}

function broSaveUploadedFile(array $file): array {
    $oriName = (string)$file['name'];
    $ext     = strtolower((string)pathinfo($oriName, PATHINFO_EXTENSION));

    if (!in_array($ext, BRO_ALLOWED_EXTS, true)) {
        throw new RuntimeException("허용되지 않는 파일 형식입니다: {$ext}");
    }
    if ((int)$file['size'] > BRO_MAX_FILE_SIZE) {
        throw new RuntimeException("파일 크기가 20 MB를 초과합니다.");
    }
    if (!is_dir(BRO_UPLOAD_DIR)) {
        mkdir(BRO_UPLOAD_DIR, 0755, true);
    }

    $savedName = date('Ymd_His_') . bin2hex(random_bytes(4)) . '.' . $ext;
    $destPath  = BRO_UPLOAD_DIR . $savedName;

    if (!move_uploaded_file((string)$file['tmp_name'], $destPath)) {
        throw new RuntimeException("파일 저장에 실패했습니다.");
    }

    return [
        'ori_name'  => $oriName,
        'file_path' => BRO_UPLOAD_WEB_PATH . $savedName,
        'file_ext'  => $ext,
        'file_size' => (int)$file['size'],
    ];
}

$method = strtoupper($_SERVER['REQUEST_METHOD']);
if ($method === 'POST' && !empty($_POST['_method'])) {
    $method = strtoupper((string)$_POST['_method']);
}

try {
    $pdo = getDB();

    switch ($method) {

        case 'GET': {
            if (isset($_GET['id'])) {
                $id        = (int)$_GET['id'];
                $withFiles = !empty($_GET['with_files']);

                $stmt = $pdo->prepare('SELECT * FROM brochure_items WHERE id = ? LIMIT 1');
                $stmt->execute([$id]);
                $item = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$item) {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => '게시글을 찾을 수 없습니다.']);
                    exit;
                }

                $pdo->prepare('UPDATE brochure_items SET view_count = view_count + 1 WHERE id = ?')
                    ->execute([$id]);
                $item['view_count'] = (int)$item['view_count'] + 1;

                $files = [];
                if ($withFiles) {
                    $fs = $pdo->prepare('SELECT id, ori_name, file_path AS file_url, file_ext, file_size FROM brochure_files WHERE item_id = ? ORDER BY id ASC');
                    $fs->execute([$id]);
                    $files = $fs->fetchAll(PDO::FETCH_ASSOC);
                }

                echo json_encode(['success' => true, 'item' => $item, 'files' => $files]);
                break;
            }

            $page     = max(1, (int)($_GET['page'] ?? 1));
            $size     = min(100, max(1, (int)($_GET['size'] ?? 15)));
            $keyword  = trim((string)($_GET['keyword'] ?? ''));
            $type     = (int)($_GET['type'] ?? 2);
            $dateFrom = trim((string)($_GET['date_from'] ?? ''));
            $dateTo   = trim((string)($_GET['date_to'] ?? ''));

            $where  = ['1=1'];
            $params = [];

            if ($keyword !== '') {
                if ($type === 1) {
                    $where[] = 'title LIKE ?';
                    $params[] = '%' . $keyword . '%';
                } elseif ($type === 3) {
                    $where[] = 'content LIKE ?';
                    $params[] = '%' . $keyword . '%';
                } else {
                    $where[] = '(title LIKE ? OR content LIKE ?)';
                    $params[] = '%' . $keyword . '%';
                    $params[] = '%' . $keyword . '%';
                }
            }
            if ($dateFrom !== '') { $where[] = 'news_date >= ?'; $params[] = $dateFrom; }
            if ($dateTo   !== '') { $where[] = 'news_date <= ?'; $params[] = $dateTo; }

            $whereSQL = implode(' AND ', $where);
            $offset   = ($page - 1) * $size;

            $cnt = $pdo->prepare("SELECT COUNT(*) FROM brochure_items WHERE {$whereSQL}");
            $cnt->execute($params);
            $total = (int)$cnt->fetchColumn();

            $rows = $pdo->prepare(
                "SELECT id, title, category, news_date, description AS `desc`, thumbnail, is_active, view_count, author_name, created_at, updated_at
                 FROM brochure_items WHERE {$whereSQL} ORDER BY id DESC LIMIT {$size} OFFSET {$offset}"
            );
            $rows->execute($params);
            $items = $rows->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                'success'     => true,
                'items'       => $items,
                'totalCount'  => $total,
                'totalPages'  => (int)ceil($total / $size),
                'page'        => $page,
            ]);
            break;
        }

        case 'POST': {
            broRequireAuth();

            $title    = trim((string)($_POST['title']    ?? ''));
            $category = trim((string)($_POST['category'] ?? ''));
            $newsDate = trim((string)($_POST['news_date'] ?? date('Y-m-d')));
            $desc     = trim((string)($_POST['desc']     ?? ''));
            $content  = trim((string)($_POST['content']  ?? ''));

            if ($title === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '제목을 입력하세요.']);
                exit;
            }

            $thumbnail = '';
            $pdo->beginTransaction();

            $ins = $pdo->prepare(
                'INSERT INTO brochure_items (title, category, news_date, description, content, thumbnail) VALUES (?,?,?,?,?,?)'
            );
            $ins->execute([$title, $category, $newsDate, $desc, $content, $thumbnail]);
            $newId = (int)$pdo->lastInsertId();

            if (!empty($_FILES['files'])) {
                $files = $_FILES['files'];
                $count = is_array($files['name']) ? count($files['name']) : 1;
                for ($i = 0; $i < $count; $i++) {
                    $fileItem = is_array($files['name']) ? [
                        'name'     => $files['name'][$i],
                        'tmp_name' => $files['tmp_name'][$i],
                        'size'     => $files['size'][$i],
                        'error'    => $files['error'][$i],
                    ] : $files;

                    if ((int)$fileItem['error'] !== UPLOAD_ERR_OK) continue;

                    $saved = broSaveUploadedFile($fileItem);
                    $pdo->prepare('INSERT INTO brochure_files (item_id, ori_name, file_path, file_ext, file_size) VALUES (?,?,?,?,?)')
                        ->execute([$newId, $saved['ori_name'], $saved['file_path'], $saved['file_ext'], $saved['file_size']]);

                    if ($thumbnail === '' && in_array($saved['file_ext'], ['jpg','jpeg','png','gif','webp'], true)) {
                        $thumbnail = $saved['file_path'];
                        $pdo->prepare('UPDATE brochure_items SET thumbnail = ? WHERE id = ?')->execute([$thumbnail, $newId]);
                    }
                }
            }

            $pdo->commit();
            echo json_encode(['success' => true, 'id' => $newId]);
            break;
        }

        case 'PUT': {
            broRequireAuth();

            $id       = (int)($_POST['id'] ?? 0);
            $title    = trim((string)($_POST['title']    ?? ''));
            $category = trim((string)($_POST['category'] ?? ''));
            $newsDate = trim((string)($_POST['news_date'] ?? ''));
            $desc     = trim((string)($_POST['desc']     ?? ''));
            $content  = trim((string)($_POST['content']  ?? ''));

            if ($id === 0 || $title === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '필수 값이 누락되었습니다.']);
                exit;
            }

            $pdo->beginTransaction();
            $pdo->prepare('UPDATE brochure_items SET title=?, category=?, news_date=?, description=?, content=? WHERE id=?')
                ->execute([$title, $category, $newsDate, $desc, $content, $id]);

            if (!empty($_FILES['files'])) {
                $files = $_FILES['files'];
                $count = is_array($files['name']) ? count($files['name']) : 1;
                $tRow = $pdo->prepare('SELECT thumbnail FROM brochure_items WHERE id = ?');
                $tRow->execute([$id]);
                $thumbnail = (string)($tRow->fetchColumn() ?? '');

                for ($i = 0; $i < $count; $i++) {
                    $fileItem = is_array($files['name']) ? [
                        'name'     => $files['name'][$i],
                        'tmp_name' => $files['tmp_name'][$i],
                        'size'     => $files['size'][$i],
                        'error'    => $files['error'][$i],
                    ] : $files;

                    if ((int)$fileItem['error'] !== UPLOAD_ERR_OK) continue;

                    $saved = broSaveUploadedFile($fileItem);
                    $pdo->prepare('INSERT INTO brochure_files (item_id, ori_name, file_path, file_ext, file_size) VALUES (?,?,?,?,?)')
                        ->execute([$id, $saved['ori_name'], $saved['file_path'], $saved['file_ext'], $saved['file_size']]);

                    if ($thumbnail === '' && in_array($saved['file_ext'], ['jpg','jpeg','png','gif','webp'], true)) {
                        $thumbnail = $saved['file_path'];
                        $pdo->prepare('UPDATE brochure_items SET thumbnail = ? WHERE id = ?')->execute([$thumbnail, $id]);
                    }
                }
            }

            $pdo->commit();
            echo json_encode(['success' => true]);
            break;
        }

        case 'DELETE': {
            broRequireAuth();

            parse_str((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $qs);
            $id = (int)($qs['id'] ?? 0);

            if ($id === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'id가 필요합니다.']);
                exit;
            }

            $fs = $pdo->prepare('SELECT file_path FROM brochure_files WHERE item_id = ?');
            $fs->execute([$id]);
            $filePaths = $fs->fetchAll(PDO::FETCH_COLUMN);

            $pdo->prepare('DELETE FROM brochure_items WHERE id = ?')->execute([$id]);

            foreach ($filePaths as $webPath) {
                $absPath = dirname(__DIR__, 2) . $webPath;
                if (file_exists($absPath)) { @unlink($absPath); }
            }

            echo json_encode(['success' => true]);
            break;
        }

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }

} catch (RuntimeException $e) {
    if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다.']);
}
