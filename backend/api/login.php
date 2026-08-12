<?php
// backend/api/login.php

ob_start();
ini_set('display_errors', '0');
ini_set('log_errors', '1');
set_error_handler(function() {
    ob_end_clean();
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다.']);
    exit;
});
register_shutdown_function(function() {
    $err = error_get_last();
    if ($err && in_array($err['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        ob_end_clean();
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다.']);
    }
});

header('Content-Type: application/json; charset=utf-8');

// CORS — 같은 도메인 배포이므로 기본 비활성화.
// 로컬 개발 시 Vite proxy 를 사용하므로 CORS 헤더 불필요.

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

// 입력값 파싱
$body = (string)file_get_contents('php://input');
$data = json_decode($body, true);

$inputId  = isset($data['id'])       ? trim((string)$data['id'])       : '';
$inputPw  = isset($data['password']) ? trim((string)$data['password']) : '';

if ($inputId === '' || $inputPw === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '아이디와 비밀번호를 입력하세요.']);
    exit;
}

try {
    $pdo  = getDB();
    $stmt = $pdo->prepare('SELECT id, name, password_hash, role FROM admin_users WHERE login_id = ? AND is_active = 1 LIMIT 1');
    $stmt->execute([$inputId]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($inputPw, (string)$user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '아이디 또는 비밀번호가 올바르지 않습니다.']);
        exit;
    }

    $token = createJWT([
        'sub'  => $user['id'],
        'name' => $user['name'],
        'role' => $user['role'],
    ]);

    echo json_encode([
        'success' => true,
        'token'   => $token,
        'user'    => [
            'id'   => (int)$user['id'],
            'name' => $user['name'],
        ],
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다.']);
}
