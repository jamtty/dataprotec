<?php
// backend/api/newsroom-file.php
// DELETE ?wr_id=X&bf_no=Y  → g5_board_file 단건 삭제 (DB + 파일시스템)
// Bearer JWT 인증 필요

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

define('NF_UPLOAD_DIR',  dirname(__DIR__, 2) . '/data/file/news_room/');
define('NF_BO_TABLE',    'news_room');

function nfRequireAuth(): void {
    $auth = $_SERVER['HTTP_AUTHORIZATION']
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
        ?? (function_exists('getallheaders') ? (getallheaders()['Authorization'] ?? '') : '')
        ?? '';
    if (!preg_match('/^Bearer\s+(.+)$/i', $auth, $m)) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '인증이 필요합니다.']);
        exit;
    }
    if (!verifyJWT($m[1])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '토큰이 유효하지 않습니다.']);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

nfRequireAuth();

parse_str((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $qs);
$wrId = (int)($qs['wr_id'] ?? 0);
$bfNo = isset($qs['bf_no']) ? (int)$qs['bf_no'] : -1;

if ($wrId === 0 || $bfNo < 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'wr_id 와 bf_no 가 필요합니다.']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare(
        'SELECT bf_file FROM g5_board_file WHERE bo_table = ? AND wr_id = ? AND bf_no = ? LIMIT 1'
    );
    $stmt->execute([NF_BO_TABLE, $wrId, $bfNo]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => '파일을 찾을 수 없습니다.']);
        exit;
    }

    $pdo->prepare(
        'DELETE FROM g5_board_file WHERE bo_table = ? AND wr_id = ? AND bf_no = ?'
    )->execute([NF_BO_TABLE, $wrId, $bfNo]);

    // 파일 시스템 삭제
    $absPath = NF_UPLOAD_DIR . (string)$row['bf_file'];
    if (file_exists($absPath)) {
        @unlink($absPath);
    }

    // 썸네일 슬롯(bf_no=0)을 삭제한 경우 wr_2 필드도 정리
    if ($bfNo === 0) {
        $pdo->prepare('UPDATE g5_write_news_room SET wr_2 = ? WHERE wr_id = ?')
            ->execute(['', $wrId]);
    }

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다.']);
}


header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

// ── 인증 ────────────────────────────────────────────────────────
function requireAuth(): void {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/^Bearer\s+(.+)$/i', $auth, $m)) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '인증이 필요합니다.']);
        exit;
    }
    if (!verifyJWT($m[1])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '토큰이 유효하지 않습니다.']);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

requireAuth();

// DELETE 요청의 쿼리 파라미터 파싱
parse_str((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $qs);
$id = (int)($qs['id'] ?? 0);

if ($id === 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'id가 필요합니다.']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare('SELECT file_path FROM newsroom_files WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => '파일을 찾을 수 없습니다.']);
        exit;
    }

    $pdo->prepare('DELETE FROM newsroom_files WHERE id = ?')->execute([$id]);

    // 파일 시스템 삭제
    $absPath = dirname(__DIR__, 2) . (string)$row['file_path'];
    if (file_exists($absPath)) {
        @unlink($absPath);
    }

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다.']);
}
