<?php
// backend/api/verify-token.php
// JWT 토큰 유효성 검증 API. AdminRoute 에서 클라이언트 측 변조 방지용으로 사용.

ob_start();
ini_set('display_errors', '0');
ini_set('log_errors', '1');

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

require_once dirname(__DIR__) . '/jwt.php';

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
if ($payload === null) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => '유효하지 않거나 만료된 토큰입니다.']);
    exit;
}

// 토큰이 유효하면 사용자 정보 반환
echo json_encode([
    'success' => true,
    'user'    => [
        'id'   => (int)($payload['sub'] ?? 0),
        'name' => $payload['name'] ?? '',
        'role' => $payload['role'] ?? '',
    ],
]);
