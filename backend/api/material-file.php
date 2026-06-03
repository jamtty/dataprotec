<?php
// backend/api/material-file.php
// DELETE ?wr_id=X&bf_no=Y  → g5_board_file 단건 삭제 (DB + 파일시스템)
// Bearer JWT 인증 필요

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

define('MF_UPLOAD_DIR', dirname(__DIR__, 2) . '/data/file/promotion/');
define('MF_BO_TABLE',   'promotion');

function mfRequireAuth(): void {
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

mfRequireAuth();

parse_str((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $qs);
$wrId     = (int)($qs['wr_id'] ?? 0);
$bfNo     = isset($qs['bf_no']) ? (int)$qs['bf_no'] : -1;
$fileType = isset($qs['file_type']) ? (int)$qs['file_type'] : -1; // 0=파일, 1=이미지, -1=미지정

if ($wrId === 0 || $bfNo < 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'wr_id 와 bf_no 가 필요합니다.']);
    exit;
}

try {
    $pdo = getDB();

    // file_type 이 전달된 경우 bf_type 조건도 추가 (bf_no 중복 시 정확한 행 특정)
    if ($fileType >= 0) {
        $stmt = $pdo->prepare(
            'SELECT bf_file FROM g5_board_file WHERE bo_table = ? AND wr_id = ? AND bf_no = ? AND bf_type = ? LIMIT 1'
        );
        $stmt->execute([MF_BO_TABLE, $wrId, $bfNo, $fileType]);
    } else {
        $stmt = $pdo->prepare(
            'SELECT bf_file FROM g5_board_file WHERE bo_table = ? AND wr_id = ? AND bf_no = ? LIMIT 1'
        );
        $stmt->execute([MF_BO_TABLE, $wrId, $bfNo]);
    }
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => '파일을 찾을 수 없습니다.']);
        exit;
    }

    if ($fileType >= 0) {
        $pdo->prepare(
            'DELETE FROM g5_board_file WHERE bo_table = ? AND wr_id = ? AND bf_no = ? AND bf_type = ?'
        )->execute([MF_BO_TABLE, $wrId, $bfNo, $fileType]);
    } else {
        $pdo->prepare(
            'DELETE FROM g5_board_file WHERE bo_table = ? AND wr_id = ? AND bf_no = ?'
        )->execute([MF_BO_TABLE, $wrId, $bfNo]);
    }

    $absPath = MF_UPLOAD_DIR . (string)$row['bf_file'];
    if (file_exists($absPath)) {
        @unlink($absPath);
    }

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류: ' . $e->getMessage()]);
}
