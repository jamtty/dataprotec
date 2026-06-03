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
define('UPLOAD_DIR',      dirname(__DIR__, 2) . '/data/file/news_room/');
define('UPLOAD_WEB_PATH', '/renewal_react_v1/data/file/news_room/');
define('BO_TABLE_NEWSROOM', 'news_room');

// ── 허용 파일 확장자 ─────────────────────────────────────────────
define('ALLOWED_EXTS', ['jpg','jpeg','png','gif','webp','pdf','doc','docx','xls','xlsx','ppt','pptx','zip','txt']);
define('MAX_FILE_SIZE', 20 * 1024 * 1024); // 20 MB

// ── 인증 helper ──────────────────────────────────────────────────
function requireAuth(): array {
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
        'file_name' => $savedName,
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

                $stmt = $pdo->prepare(
                    'SELECT wr_id AS id, wr_subject AS title, DATE(wr_datetime) AS news_date, wr_content AS content,
                            wr_hit AS view_count, wr_name AS author_name,
                            wr_datetime AS created_at, wr_last AS updated_at
                     FROM g5_write_news_room WHERE wr_id = ? AND wr_is_comment = 0 LIMIT 1'
                );
                $stmt->execute([$id]);
                $item = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$item) {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => '게시글을 찾을 수 없습니다.']);
                    exit;
                }

                // 조회수 증가
                $pdo->prepare('UPDATE g5_write_news_room SET wr_hit = wr_hit + 1 WHERE wr_id = ?')
                    ->execute([$id]);
                $item['view_count'] = (int)$item['view_count'] + 1;

                $files = [];
                if ($withFiles) {
                    $fs = $pdo->prepare(
                        'SELECT bf_no, wr_id, bf_source AS ori_name,
                                CASE WHEN bf_fileurl != \'\'  THEN bf_fileurl
                                     WHEN bf_file   != \'\'  THEN CONCAT(\'' . UPLOAD_WEB_PATH . '\', bf_file)
                                     ELSE \'\'  END AS file_url,
                                bf_thumburl AS thumb_url, bf_type AS file_type, bf_filesize AS file_size
                         FROM g5_board_file WHERE bo_table = ? AND wr_id = ? ORDER BY bf_no ASC'
                    );
                    $fs->execute([BO_TABLE_NEWSROOM, $id]);
                    $rawFiles = $fs->fetchAll(PDO::FETCH_ASSOC);
                    $files = array_map(function($f) {
                        $f['bf_no']     = (int)$f['bf_no'];
                        $f['wr_id']     = (int)$f['wr_id'];
                        $f['file_type'] = (int)$f['file_type'];
                        $f['file_size'] = (int)$f['file_size'];
                        $f['file_ext']  = strtolower((string)pathinfo((string)$f['ori_name'], PATHINFO_EXTENSION));
                        return $f;
                    }, $rawFiles);
                    // 이미지 파일(bf_type=1)을 thumbnail 필드로 로지 타입 API 호환성 유지
                    $thumbArr = array_values(array_filter($files, fn($f) => $f['file_type'] === 1));
                    $item['thumbnail'] = !empty($thumbArr) ? $thumbArr[0]['file_url'] : '';
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

            $where  = ['wr_is_comment = 0'];
            $params = [];

            if ($keyword !== '') {
                if ($type === 1) {
                    $where[] = 'wr_subject LIKE ?';
                    $params[] = '%' . $keyword . '%';
                } elseif ($type === 3) {
                    $where[] = 'wr_content LIKE ?';
                    $params[] = '%' . $keyword . '%';
                } else {
                    $where[] = '(wr_subject LIKE ? OR wr_content LIKE ?)';
                    $params[] = '%' . $keyword . '%';
                    $params[] = '%' . $keyword . '%';
                }
            }
            if ($dateFrom !== '') { $where[] = 'DATE(wr_datetime) >= ?'; $params[] = $dateFrom; }
            if ($dateTo   !== '') { $where[] = 'DATE(wr_datetime) <= ?'; $params[] = $dateTo; }

            $whereSQL = implode(' AND ', $where);
            $offset   = ($page - 1) * $size;

            $cnt  = $pdo->prepare("SELECT COUNT(*) FROM g5_write_news_room WHERE {$whereSQL}");
            $cnt->execute($params);
            $total = (int)$cnt->fetchColumn();

            $webPath = UPLOAD_WEB_PATH;
            $rows = $pdo->prepare(
                "SELECT w.wr_id AS id, w.wr_subject AS title, DATE(w.wr_datetime) AS news_date,
                        w.wr_hit AS view_count, w.wr_name AS author_name,
                        w.wr_content AS content,
                        w.wr_datetime AS created_at, w.wr_last AS updated_at,
                        COALESCE(
                            NULLIF((SELECT CASE
                                       WHEN bf_thumburl != '' THEN bf_thumburl
                                       WHEN bf_fileurl  != '' THEN bf_fileurl
                                       WHEN bf_file     != '' THEN CONCAT('{$webPath}', bf_file)
                                       ELSE NULL END
                                   FROM g5_board_file
                                   WHERE bo_table='news_room' AND wr_id=w.wr_id AND bf_type=1
                                   ORDER BY bf_no ASC LIMIT 1), ''),
                            NULLIF((SELECT CASE
                                       WHEN bf_thumburl != '' THEN bf_thumburl
                                       WHEN bf_fileurl  != '' THEN bf_fileurl
                                       WHEN bf_file     != '' THEN CONCAT('{$webPath}', bf_file)
                                       ELSE NULL END
                                   FROM g5_board_file
                                   WHERE bo_table='news_room' AND wr_id=w.wr_id
                                   ORDER BY bf_no ASC LIMIT 1), ''),
                            ''
                        ) AS thumbnail
                 FROM g5_write_news_room w WHERE {$whereSQL} ORDER BY w.wr_id DESC LIMIT {$size} OFFSET {$offset}"
            );
            $rows->execute($params);
            $items = $rows->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                'success'    => true,
                'items'      => $items,
                'totalCount' => $total,
                'totalPages' => (int)ceil($total / $size),
                'page'       => $page,
            ]);
            break;
        }

        // ────────────────────── POST (등록) ──────────────────────
        case 'POST': {
            requireAuth();

            $title   = trim((string)($_POST['title']   ?? ''));
            $content = trim((string)($_POST['content'] ?? ''));

            if ($title === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '제목을 입력하세요.']);
                exit;
            }

            $pdo->beginTransaction();

            // GnuBoard5 규칙:
            //   wr_num  = MIN(wr_num) - 1  (음수, 값이 클수록 새 글)
            //   wr_parent = wr_id          (최상위 글은 자기 자신)
            $minNumStmt = $pdo->query('SELECT IFNULL(MIN(wr_num), 0) - 1 FROM g5_write_news_room');
            $nextNum = (int)$minNumStmt->fetchColumn();

            $ins = $pdo->prepare(
                'INSERT INTO g5_write_news_room (wr_subject, wr_content, wr_2, wr_name, wr_datetime, wr_last, wr_is_comment, wr_parent, wr_num) VALUES (?,?,?,?,NOW(),NOW(),0,0,?)'
            );
            $ins->execute([$title, $content, '', '관리자', $nextNum]);
            $newId = (int)$pdo->lastInsertId();
            // wr_parent를 자기 자신으로 설정 (GnuBoard5 최상위 글 규칙)
            $pdo->prepare('UPDATE g5_write_news_room SET wr_parent = ? WHERE wr_id = ?')->execute([$newId, $newId]);

            // 첫번째 첨부: 썸네일 이미지 (bf_no=0, bf_type=1)
            if (!empty($_FILES['thumbnail']) && (int)$_FILES['thumbnail']['error'] === UPLOAD_ERR_OK) {
                $imgExts = ['jpg','jpeg','png','gif','webp'];
                $tExt = strtolower((string)pathinfo((string)$_FILES['thumbnail']['name'], PATHINFO_EXTENSION));
                if (!in_array($tExt, $imgExts, true)) {
                    $pdo->rollBack();
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => '썸네일은 이미지 파일만 가능합니다.']);
                    exit;
                }
                $saved = saveUploadedFile($_FILES['thumbnail']);
                // g5_board_file에 bf_no=0으로 삽입
                $pdo->prepare(
                    'INSERT INTO g5_board_file (bo_table, wr_id, bf_no, bf_source, bf_file, bf_fileurl, bf_storage, bf_filesize, bf_width, bf_height, bf_type, bf_download, bf_content, bf_datetime)
                     VALUES (?,?,0,?,?,?,?,?,0,0,1,0,\'\',NOW())'
                )->execute([BO_TABLE_NEWSROOM, $newId, $saved['ori_name'], $saved['file_name'], $saved['file_path'], 'local', $saved['file_size']]);
                // wr_2 필드 저장 생략 — 최신 코드에서는 g5_board_file 사용
            }

            // 두번째 첨부: 다운로드 파일 (bf_no=1, bf_type=0)
            if (!empty($_FILES['download_file']) && (int)$_FILES['download_file']['error'] === UPLOAD_ERR_OK) {
                $saved = saveUploadedFile($_FILES['download_file']);
                // 다운로드 파일은 항상 bf_no=1 슬롯으로 저장
                $pdo->prepare(
                    'INSERT INTO g5_board_file (bo_table, wr_id, bf_no, bf_source, bf_file, bf_fileurl, bf_storage, bf_filesize, bf_width, bf_height, bf_type, bf_download, bf_content, bf_datetime)
                     VALUES (?,?,1,?,?,?,?,?,0,0,0,0,\'\',NOW())'
                )->execute([BO_TABLE_NEWSROOM, $newId, $saved['ori_name'], $saved['file_name'], $saved['file_path'], 'local', $saved['file_size']]);
            }

            $pdo->commit();

            echo json_encode(['success' => true, 'id' => $newId]);
            break;
        }

        // ────────────────────── PUT (수정) ───────────────────────
        case 'PUT': {
            requireAuth();

            $id      = (int)($_POST['id'] ?? 0);
            $title   = trim((string)($_POST['title']   ?? ''));
            $content = trim((string)($_POST['content'] ?? ''));

            if ($id === 0 || $title === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '필수 값이 누락되었습니다.']);
                exit;
            }

            $pdo->beginTransaction();

            $upd = $pdo->prepare(
                'UPDATE g5_write_news_room SET wr_subject=?, wr_content=?, wr_last=NOW() WHERE wr_id=?'
            );
            $upd->execute([$title, $content, $id]);

            // 새 썸네일 업로드 (bf_no=0, bf_type=1) — 기존 파일 삭제 후 대체
            if (!empty($_FILES['thumbnail']) && (int)$_FILES['thumbnail']['error'] === UPLOAD_ERR_OK) {
                $imgExts = ['jpg','jpeg','png','gif','webp'];
                $tExt = strtolower((string)pathinfo((string)$_FILES['thumbnail']['name'], PATHINFO_EXTENSION));
                if (!in_array($tExt, $imgExts, true)) {
                    $pdo->rollBack();
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => '썸네일은 이미지 파일만 가능합니다.']);
                    exit;
                }
                $oldRow = $pdo->prepare('SELECT bf_file FROM g5_board_file WHERE bo_table=? AND wr_id=? AND bf_no=0');
                $oldRow->execute([BO_TABLE_NEWSROOM, $id]);
                $oldFile = $oldRow->fetchColumn();
                if ($oldFile) {
                    $absOld = UPLOAD_DIR . $oldFile;
                    if (file_exists($absOld)) @unlink($absOld);
                    $pdo->prepare('DELETE FROM g5_board_file WHERE bo_table=? AND wr_id=? AND bf_no=0')
                        ->execute([BO_TABLE_NEWSROOM, $id]);
                }
                $saved = saveUploadedFile($_FILES['thumbnail']);
                $pdo->prepare(
                    'INSERT INTO g5_board_file (bo_table, wr_id, bf_no, bf_source, bf_file, bf_fileurl, bf_storage, bf_filesize, bf_width, bf_height, bf_type, bf_download, bf_content, bf_datetime)
                     VALUES (?,?,0,?,?,?,?,?,0,0,1,0,\'\',NOW())'
                )->execute([BO_TABLE_NEWSROOM, $id, $saved['ori_name'], $saved['file_name'], $saved['file_path'], 'local', $saved['file_size']]);
                // wr_2 필드 저장 생략 — 최신 코드에서는 g5_board_file 사용
            }

            // 새 다운로드 파일 업로드 (bf_no=1, bf_type=0) — 기존 파일 삭제 후 대체
            if (!empty($_FILES['download_file']) && (int)$_FILES['download_file']['error'] === UPLOAD_ERR_OK) {
                $oldRow = $pdo->prepare('SELECT bf_file FROM g5_board_file WHERE bo_table=? AND wr_id=? AND bf_no=1');
                $oldRow->execute([BO_TABLE_NEWSROOM, $id]);
                $oldFile = $oldRow->fetchColumn();
                if ($oldFile) {
                    $absOld = UPLOAD_DIR . $oldFile;
                    if (file_exists($absOld)) @unlink($absOld);
                    $pdo->prepare('DELETE FROM g5_board_file WHERE bo_table=? AND wr_id=? AND bf_no=1')
                        ->execute([BO_TABLE_NEWSROOM, $id]);
                }
                $saved = saveUploadedFile($_FILES['download_file']);
                $pdo->prepare(
                    'INSERT INTO g5_board_file (bo_table, wr_id, bf_no, bf_source, bf_file, bf_fileurl, bf_storage, bf_filesize, bf_width, bf_height, bf_type, bf_download, bf_content, bf_datetime)
                     VALUES (?,?,1,?,?,?,?,?,0,0,0,0,\'\',NOW())'
                )->execute([BO_TABLE_NEWSROOM, $id, $saved['ori_name'], $saved['file_name'], $saved['file_path'], 'local', $saved['file_size']]);
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
            $fs = $pdo->prepare('SELECT bf_file FROM g5_board_file WHERE bo_table = ? AND wr_id = ?');
            $fs->execute([BO_TABLE_NEWSROOM, $id]);
            $fileNames = $fs->fetchAll(PDO::FETCH_COLUMN);

            $pdo->prepare('DELETE FROM g5_write_news_room WHERE wr_id = ?')->execute([$id]);
            $pdo->prepare('DELETE FROM g5_board_file WHERE bo_table = ? AND wr_id = ?')->execute([BO_TABLE_NEWSROOM, $id]);

            // 파일 시스템에서 파일 삭제
            foreach ($fileNames as $fileName) {
                $absPath = UPLOAD_DIR . $fileName;
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
