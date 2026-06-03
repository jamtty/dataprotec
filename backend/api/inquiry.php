<?php
// backend/api/inquiry.php
// GET  ?page&size&keyword  → 목록 (인증 필요)
// POST (json body)         → 등록 (공개 - 고객 문의 제출)
// DELETE ?id               → 삭제 (인증 필요)
// 테이블: g5_write_request
// 컬럼 매핑: wr_subject=회사명, wr_name=담당자, wr_1=연락처, wr_2=이메일, wr_content=문의내용

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

define('INQ_TABLE', 'g5_write_request');

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

$method = strtoupper($_SERVER['REQUEST_METHOD']);
if ($method === 'POST' && !empty($_POST['_method'])) {
    $method = strtoupper((string)$_POST['_method']);
}

try {
    $pdo = getDB();

    switch ($method) {

        // ────────────────── GET ────────────────────────────
        case 'GET': {
            requireAuth();

            $page    = max(1, (int)($_GET['page'] ?? 1));
            $size    = min(100, max(1, (int)($_GET['size'] ?? 15)));
            $keyword = trim((string)($_GET['keyword'] ?? ''));

            $where  = ['wr_is_comment = 0'];
            $params = [];

            if ($keyword !== '') {
                $where[]  = '(wr_subject LIKE ? OR wr_name LIKE ? OR wr_1 LIKE ? OR wr_2 LIKE ? OR wr_content LIKE ?)';
                $params[] = '%' . $keyword . '%';
                $params[] = '%' . $keyword . '%';
                $params[] = '%' . $keyword . '%';
                $params[] = '%' . $keyword . '%';
                $params[] = '%' . $keyword . '%';
            }

            $whereSQL = implode(' AND ', $where);
            $offset   = ($page - 1) * $size;

            $cnt = $pdo->prepare("SELECT COUNT(*) FROM `" . INQ_TABLE . "` WHERE {$whereSQL}");
            $cnt->execute($params);
            $total = (int)$cnt->fetchColumn();

            $rows = $pdo->prepare(
                "SELECT wr_id       AS id,
                        wr_subject  AS company,
                        wr_name     AS manager,
                        wr_1        AS phone,
                        wr_2        AS email,
                        wr_content  AS content,
                        wr_datetime AS created_at
                 FROM `" . INQ_TABLE . "`
                 WHERE {$whereSQL}
                 ORDER BY wr_id DESC
                 LIMIT {$size} OFFSET {$offset}"
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

        // ────────────────── POST (등록 - 공개) ───────────────
        case 'POST': {
            $raw  = file_get_contents('php://input');
            $body = json_decode($raw ?: '{}', true) ?? [];

            $company = trim((string)($body['company'] ?? ''));
            $manager = trim((string)($body['manager'] ?? ''));
            $phone   = trim((string)($body['phone']   ?? ''));
            $email   = trim((string)($body['email']   ?? ''));
            $content = trim((string)($body['content'] ?? ''));

            if ($company === '' || $manager === '' || $content === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '필수 항목을 입력해주세요.']);
                exit;
            }

            if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '이메일 형식이 올바르지 않습니다.']);
                exit;
            }

            $ip = $_SERVER['REMOTE_ADDR'] ?? '';

            $ins = $pdo->prepare(
                "INSERT INTO `" . INQ_TABLE . "`
                 (wr_subject, wr_name, wr_1, wr_2, wr_email, wr_content, wr_datetime, wr_last,
                  wr_is_comment, wr_parent, wr_num, wr_reply, wr_comment_reply,
                  ca_name, wr_option, wr_link1, wr_link2, wr_ip, mb_id, wr_password,
                  wr_homepage, wr_facebook_user, wr_twitter_user,
                  wr_3, wr_4, wr_5, wr_6, wr_7, wr_8, wr_9, wr_10)
                 VALUES (?,?,?,?,?,?,NOW(),NOW(),0,0,
                         COALESCE((SELECT MIN(wr_num) FROM `" . INQ_TABLE . "` t2),0)-1,
                         '','','','','','',?,'','','','','',
                         '','','','','','','','')"
            );
            $ins->execute([$company, $manager, $phone, $email, $email, $content, $ip]);

            echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()]);
            break;
        }

        // ────────────────── DELETE ───────────────────────
        case 'DELETE': {
            requireAuth();

            parse_str((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $qs);
            $id = (int)($qs['id'] ?? 0);

            if ($id === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'id가 필요합니다.']);
                exit;
            }

            $pdo->prepare("DELETE FROM `" . INQ_TABLE . "` WHERE wr_id = ?")->execute([$id]);
            echo json_encode(['success' => true]);
            break;
        }

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '서버 오류가 발생했습니다.']);
}
