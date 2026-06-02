<?php
// backend/api/change-password.php

header('Content-Type: application/json; charset=utf-8');

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

// Bearer 토큰 검증
$authHeader = $_SERVER['HTTP_AUTHORIZATION']
    ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
    ?? (function_exists('getallheaders') ? (getallheaders()['Authorization'] ?? '') : '')
    ?? '';
if (!preg_match('/^Bearer\s+(\S+)$/i', $authHeader, $m)) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => '인증이 필요합니다.']);
    exit;
}

$payload = verifyJWT($m[1]);
if (!$payload) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => '유효하지 않거나 만료된 토큰입니다.']);
    exit;
}

// 입력값 파싱
$body = (string)file_get_contents('php://input');
$data = json_decode($body, true);

$currentPw = isset($data['current_password']) ? (string)$data['current_password'] : '';
$newPw     = isset($data['new_password'])     ? (string)$data['new_password']     : '';

if ($currentPw === '' || $newPw === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '현재 비밀번호와 새 비밀번호를 입력하세요.']);
    exit;
}

if (mb_strlen($newPw) < 8) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '새 비밀번호는 8자 이상이어야 합니다.']);
    exit;
}

try {
    $pdo  = getDB();
    $stmt = $pdo->prepare('SELECT id, password_hash FROM admin_users WHERE id = ? AND is_active = 1 LIMIT 1');
    $stmt->execute([$payload['sub']]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($currentPw, (string)$user['password_hash'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => '현재 비밀번호가 올바르지 않습니다.']);
        exit;
    }

    $newHash = password_hash($newPw, PASSWORD_BCRYPT, ['cost' => 12]);
    $upd = $pdo->prepare('UPDATE admin_users SET password_hash = ?, updated_at = NOW() WHERE id = ?');
    $upd->execute([$newHash, $user['id']]);

    echo json_encode(['success' => true, 'message' => '비밀번호가 변경되었습니다.']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다.']);
}
