<?php
// JWT HS256 — 외부 라이브러리 없이 구현

function _b64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function _b64url_decode(string $data): string {
    $pad = strlen($data) % 4;
    if ($pad > 0) {
        $data .= str_repeat('=', 4 - $pad);
    }
    return base64_decode(strtr($data, '-_', '+/'));
}

function createJWT(array $payload): string {
    require_once __DIR__ . '/config.php';

    $header  = _b64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['iat'] = time();
    $payload['exp'] = time() + (int)JWT_EXPIRE;
    $claims  = _b64url_encode(json_encode($payload));
    $sig     = _b64url_encode(hash_hmac('sha256', "$header.$claims", JWT_SECRET, true));

    return "$header.$claims.$sig";
}

/**
 * JWT 검증 후 payload 배열 반환. 실패/만료 시 null 반환.
 */
function verifyJWT(string $token): ?array {
    require_once __DIR__ . '/config.php';

    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }

    [$header, $claims, $sig] = $parts;
    $expected = _b64url_encode(hash_hmac('sha256', "$header.$claims", JWT_SECRET, true));

    // timing-safe compare
    if (!hash_equals($expected, $sig)) {
        return null;
    }

    $payload = json_decode(_b64url_decode($claims), true);
    if (!is_array($payload)) {
        return null;
    }

    if (isset($payload['exp']) && $payload['exp'] < time()) {
        return null;  // 만료
    }

    return $payload;
}
