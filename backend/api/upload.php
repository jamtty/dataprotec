<?php
// backend/api/upload.php
ob_start();
ini_set('display_errors', '0');
ini_set('log_errors', '1');

register_shutdown_function(function () {
    $err = error_get_last();
    if ($err && in_array($err['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        ob_end_clean();
        if (!headers_sent()) {
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(500);
        }
        echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다.']);
    }
});

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    ob_end_clean();
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_end_clean();
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

require_once dirname(__DIR__) . '/jwt.php';

$auth = $_SERVER['HTTP_AUTHORIZATION']
    ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
    ?? (function_exists('getallheaders') ? (getallheaders()['Authorization'] ?? '') : '')
    ?? '';
if (!preg_match('/^Bearer\s+(.+)$/i', $auth, $m) || !verifyJWT($m[1])) {
    ob_end_clean();
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => '인증이 필요합니다.']);
    exit;
}

if (!isset($_FILES['image']) || (int)$_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    ob_end_clean();
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '이미지 파일이 없습니다.']);
    exit;
}

$file = $_FILES['image'];
$mime = mime_content_type((string)$file['tmp_name']);
$allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
if (!in_array($mime, $allowedMimes, true)) {
    ob_end_clean();
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '허용되지 않는 파일 형식입니다.']);
    exit;
}

if ((int)$file['size'] > 10 * 1024 * 1024) {
    ob_end_clean();
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '파일 크기는 10MB 이하여야 합니다.']);
    exit;
}

$extMap    = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/gif' => 'gif', 'image/webp' => 'webp'];
$ext       = $extMap[$mime];
$saved     = date('Ymd') . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
$yearMonth = date('ym');

$uploadDir = dirname(__DIR__, 2) . '/data/editor/' . $yearMonth . '/';
$webPath   = '/data/editor/' . $yearMonth . '/' . $saved;

if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => '디렉토리 생성 실패: ' . $uploadDir]);
        exit;
    }
}

if (!move_uploaded_file((string)$file['tmp_name'], $uploadDir . $saved)) {
    $buffered = ob_get_clean();
    if (!empty(trim($buffered))) error_log('[upload.php] ' . $buffered);
    echo json_encode(['success' => false, 'message' => '파일 저장 실패. 경로: ' . $uploadDir]);
    exit;
}

$buffered = ob_get_clean();
if (!empty(trim($buffered))) error_log('[upload.php] unexpected output: ' . $buffered);
echo json_encode(['success' => true, 'url' => $webPath]);
