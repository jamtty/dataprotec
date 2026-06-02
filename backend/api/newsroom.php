<?php
// backend/api/newsroom.php
// GET  ?page&size&keyword&type&date_from&date_to  → 목록
// GET  ?id&with_files=1                           → 상세 (+파일목록)
// POST (multipart/json)                           → 등록
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

// ── 업로드 기본 경로 (서버 절대경로 & 웹 경로) ──────────────────
define('UPLOAD_DIR',      dirname(__DIR__, 2) . '/uploads/newsroom/');
define('UPLOAD_WEB_PATH', '/renewal_react_v1/uploads/newsroom/');

// ── 허용 파일 확장자 ─────────────────────────────────────────────
define('ALLOWED_EXTS', ['jpg','jpeg','png','gif','webp','pdf','doc','docx','xls','xlsx','ppt','pptx','zip','txt']);
define('MAX_FILE_SIZE', 20 * 1024 * 1024); // 20 MB

// ── 인증 helper ──────────────────────────────────────────────────
function requireAuth(): array {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
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

// ── 파일 업로드 helper ───────────────────────────────────────────
function saveUploadedFile(array $file): array {
    $oriName = (string)$file['name'];
    $ext     = strtolower((string)pathinfo($oriName, PATHINFO_EXTENSION));

    if (!in_array($ext, ALLOWED_EXTS, true)) {
        throw new RuntimeException("허용되지 않는 파일 형식입니다: {$ext}");
    }
    if ((int)$file['size'] > MAX_FILE_SIZE) {
        throw new RuntimeException("파일 크기가 20 MB를 초과합니다.");
    }
    if (!is_dir(UPLOAD_DIR)) {
        mkdir(UPLOAD_DIR, 0755, true);
    }

    $savedName = date('Ymd_His_') . bin2hex(random_bytes(4)) . '.' . $ext;
    $destPath  = UPLOAD_DIR . $savedName;

    if (!move_uploaded_file((string)$file['tmp_name'], $destPath)) {
        throw new RuntimeException("파일 저장에 실패했습니다.");
    }

    return [
        'ori_name'  => $oriName,
        'file_path' => UPLOAD_WEB_PATH . $savedName,
        'file_ext'  => $ext,
        'file_size' => (int)$file['size'],
    ];
}

// ── 메서드 분기 ──────────────────────────────────────────────────
$method = strtoupper($_SERVER['REQUEST_METHOD']);
// multipart POST는 _method 필드로 메서드 오버라이드 지원
if ($method === 'POST' && !empty($_POST['_method'])) {
    $method = strtoupper((string)$_POST['_method']);
}

try {
    $pdo = getDB();

    switch ($method) {

        // ────────────────────── GET ──────────────────────────────
        case 'GET': {
            // 상세 조회
            if (isset($_GET['id'])) {
                $id        = (int)$_GET['id'];
                $withFiles = !empty($_GET['with_files']);

                $stmt = $pdo->prepare('SELECT * FROM newsroom_items WHERE id = ? LIMIT 1');
                $stmt->execute([$id]);
                $item = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$item) {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => '게시글을 찾을 수 없습니다.']);
                    exit;
                }

                // 조회수 증가 (관리자 요청이 아닐 때만 원하면 분기)
                $pdo->prepare('UPDATE newsroom_items SET view_count = view_count + 1 WHERE id = ?')
                    ->execute([$id]);
                $item['view_count'] = (int)$item['view_count'] + 1;

                $files = [];
                if ($withFiles) {
                    $fs = $pdo->prepare('SELECT id, ori_name, file_path AS file_url, file_ext, file_size FROM newsroom_files WHERE item_id = ? ORDER BY id ASC');
                    $fs->execute([$id]);
                    $files = $fs->fetchAll(PDO::FETCH_ASSOC);
                }

                echo json_encode(['success' => true, 'item' => $item, 'files' => $files]);
                break;
            }

            // 목록 조회
            $page     = max(1, (int)($_GET['page'] ?? 1));
            $size     = min(100, max(1, (int)($_GET['size'] ?? 15)));
            $keyword  = trim((string)($_GET['keyword'] ?? ''));
            $type     = (int)($_GET['type'] ?? 2);   // 1=제목, 2=제목+내용, 3=내용
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

            $cnt  = $pdo->prepare("SELECT COUNT(*) FROM newsroom_items WHERE {$whereSQL}");
            $cnt->execute($params);
            $total = (int)$cnt->fetchColumn();

            $rows = $pdo->prepare(
                "SELECT id, title, news_date, description AS `desc`, thumbnail, is_active, view_count, author_name, created_at, updated_at
                 FROM newsroom_items WHERE {$whereSQL} ORDER BY id DESC LIMIT {$size} OFFSET {$offset}"
            );
            $rows->execute($params);
            $items = $rows->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                'success'     => true,
                'items'       => $items,
                'total_count' => $total,
                'total_pages' => (int)ceil($total / $size),
                'page'        => $page,
            ]);
            break;
        }

        // ────────────────────── POST (등록) ──────────────────────
        case 'POST': {
            requireAuth();

            $title    = trim((string)($_POST['title']    ?? ''));
            $newsDate = trim((string)($_POST['news_date'] ?? date('Y-m-d')));
            $desc     = trim((string)($_POST['desc']     ?? ''));
            $content  = trim((string)($_POST['content']  ?? ''));

            if ($title === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '제목을 입력하세요.']);
                exit;
            }

            // 썸네일: 첫 번째 이미지 파일 경로
            $thumbnail = '';

            $pdo->beginTransaction();

            $ins = $pdo->prepare(
                'INSERT INTO newsroom_items (title, news_date, description, content, thumbnail) VALUES (?,?,?,?,?)'
            );
            $ins->execute([$title, $newsDate, $desc, $content, $thumbnail]);
            $newId = (int)$pdo->lastInsertId();

            // 파일 업로드
            $uploadedFiles = [];
            if (!empty($_FILES['files'])) {
                $files = $_FILES['files'];
                // 단일 파일도 배열로 정규화
                $count = is_array($files['name']) ? count($files['name']) : 1;
                for ($i = 0; $i < $count; $i++) {
                    $fileItem = is_array($files['name']) ? [
                        'name'     => $files['name'][$i],
                        'tmp_name' => $files['tmp_name'][$i],
                        'size'     => $files['size'][$i],
                        'error'    => $files['error'][$i],
                    ] : $files;

                    if ((int)$fileItem['error'] !== UPLOAD_ERR_OK) continue;

                    $saved = saveUploadedFile($fileItem);
                    $fstmt = $pdo->prepare(
                        'INSERT INTO newsroom_files (item_id, ori_name, file_path, file_ext, file_size) VALUES (?,?,?,?,?)'
                    );
                    $fstmt->execute([$newId, $saved['ori_name'], $saved['file_path'], $saved['file_ext'], $saved['file_size']]);
                    $uploadedFiles[] = $saved;

                    // 첫 이미지를 썸네일로
                    if ($thumbnail === '' && in_array($saved['file_ext'], ['jpg','jpeg','png','gif','webp'], true)) {
                        $thumbnail = $saved['file_path'];
                        $pdo->prepare('UPDATE newsroom_items SET thumbnail = ? WHERE id = ?')->execute([$thumbnail, $newId]);
                    }
                }
            }

            $pdo->commit();

            echo json_encode(['success' => true, 'id' => $newId]);
            break;
        }

        // ────────────────────── PUT (수정) ───────────────────────
        case 'PUT': {
            requireAuth();

            $id       = (int)($_POST['id'] ?? 0);
            $title    = trim((string)($_POST['title']    ?? ''));
            $newsDate = trim((string)($_POST['news_date'] ?? ''));
            $desc     = trim((string)($_POST['desc']     ?? ''));
            $content  = trim((string)($_POST['content']  ?? ''));

            if ($id === 0 || $title === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '필수 값이 누락되었습니다.']);
                exit;
            }

            $pdo->beginTransaction();

            $upd = $pdo->prepare(
                'UPDATE newsroom_items SET title=?, news_date=?, description=?, content=? WHERE id=?'
            );
            $upd->execute([$title, $newsDate, $desc, $content, $id]);

            // 신규 파일 업로드
            if (!empty($_FILES['files'])) {
                $files = $_FILES['files'];
                $count = is_array($files['name']) ? count($files['name']) : 1;
                $thumbnail = '';
                // 기존 썸네일 확인
                $tRow = $pdo->prepare('SELECT thumbnail FROM newsroom_items WHERE id = ?');
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

                    $saved = saveUploadedFile($fileItem);
                    $fstmt = $pdo->prepare(
                        'INSERT INTO newsroom_files (item_id, ori_name, file_path, file_ext, file_size) VALUES (?,?,?,?,?)'
                    );
                    $fstmt->execute([$id, $saved['ori_name'], $saved['file_path'], $saved['file_ext'], $saved['file_size']]);

                    // 썸네일이 없으면 첫 이미지로 설정
                    if ($thumbnail === '' && in_array($saved['file_ext'], ['jpg','jpeg','png','gif','webp'], true)) {
                        $thumbnail = $saved['file_path'];
                        $pdo->prepare('UPDATE newsroom_items SET thumbnail = ? WHERE id = ?')->execute([$thumbnail, $id]);
                    }
                }
            }

            $pdo->commit();

            echo json_encode(['success' => true]);
            break;
        }

        // ────────────────────── DELETE ───────────────────────────
        case 'DELETE': {
            requireAuth();

            // DELETE 요청의 쿼리 파라미터 파싱
            parse_str((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $qs);
            $id = (int)($qs['id'] ?? 0);

            if ($id === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'id가 필요합니다.']);
                exit;
            }

            // 파일 목록 수집 후 삭제
            $fs = $pdo->prepare('SELECT file_path FROM newsroom_files WHERE item_id = ?');
            $fs->execute([$id]);
            $filePaths = $fs->fetchAll(PDO::FETCH_COLUMN);

            $pdo->prepare('DELETE FROM newsroom_items WHERE id = ?')->execute([$id]);

            // 파일 시스템에서 파일 삭제
            foreach ($filePaths as $webPath) {
                $absPath = dirname(__DIR__, 2) . $webPath;
                if (file_exists($absPath)) {
                    @unlink($absPath);
                }
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
