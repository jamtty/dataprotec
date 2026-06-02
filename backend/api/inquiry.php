<?php
// backend/api/inquiry.php
// GET  ?page&size&keyword&is_read   → 목록 (인증 필요)
// GET  ?id                          → 상세 + 읽음 처리 (인증 필요)
// POST (json body)                  → 등록 (공개 - 고객 문의 제출)
// DELETE ?id                        → 삭제 (인증 필요)

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

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

$method = strtoupper($_SERVER['REQUEST_METHOD']);
if ($method === 'POST' && !empty($_POST['_method'])) {
    $method = strtoupper((string)$_POST['_method']);
}

try {
    $pdo = getDB();

    switch ($method) {

        // ────────────────────── GET ──────────────────────────────
        case 'GET': {
            requireAuth();

            // 상세 조회 + 읽음 처리
            if (isset($_GET['id'])) {
                $id = (int)$_GET['id'];
                $stmt = $pdo->prepare('SELECT * FROM inquiry_items WHERE id = ? LIMIT 1');
                $stmt->execute([$id]);
                $item = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$item) {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => '문의를 찾을 수 없습니다.']);
                    exit;
                }
                // 읽음 처리
                if (!(int)$item['is_read']) {
                    $pdo->prepare('UPDATE inquiry_items SET is_read = 1 WHERE id = ?')->execute([$id]);
                    $item['is_read'] = 1;
                }
                echo json_encode(['success' => true, 'item' => $item]);
                break;
            }

            // 목록 조회
            $page    = max(1, (int)($_GET['page'] ?? 1));
            $size    = min(100, max(1, (int)($_GET['size'] ?? 15)));
            $keyword = trim((string)($_GET['keyword'] ?? ''));
            $isRead  = isset($_GET['is_read']) ? (int)$_GET['is_read'] : -1; // -1=전체

            $where  = ['1=1'];
            $params = [];

            if ($keyword !== '') {
                $where[]  = '(company LIKE ? OR manager LIKE ? OR content LIKE ?)';
                $params[] = '%' . $keyword . '%';
                $params[] = '%' . $keyword . '%';
                $params[] = '%' . $keyword . '%';
            }
            if ($isRead >= 0) {
                $where[]  = 'is_read = ?';
                $params[] = $isRead;
            }

            $whereSQL = implode(' AND ', $where);
            $offset   = ($page - 1) * $size;

            $cnt = $pdo->prepare("SELECT COUNT(*) FROM inquiry_items WHERE {$whereSQL}");
            $cnt->execute($params);
            $total = (int)$cnt->fetchColumn();

            $rows = $pdo->prepare(
                "SELECT id, company, manager, phone, email, LEFT(content,100) AS content_preview,
                        is_read, created_at
                 FROM inquiry_items WHERE {$whereSQL} ORDER BY id DESC LIMIT {$size} OFFSET {$offset}"
            );
            $rows->execute($params);
            $items = $rows->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                'success'     => true,
                'items'       => $items,
                'totalCount'  => $total,
                'totalPages'  => (int)ceil($total / $size),
                'page'        => $page,
            ]);
            break;
        }

        // ────────────────────── POST (등록 - 공개) ───────────────
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

            // 이메일 형식 검증
            if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '이메일 형식이 올바르지 않습니다.']);
                exit;
            }

            $ins = $pdo->prepare(
                'INSERT INTO inquiry_items (company, manager, phone, email, content) VALUES (?,?,?,?,?)'
            );
            $ins->execute([$company, $manager, $phone, $email, $content]);

            echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()]);
            break;
        }

        // ────────────────────── DELETE ───────────────────────────
        case 'DELETE': {
            requireAuth();

            parse_str((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $qs);
            $id = (int)($qs['id'] ?? 0);

            if ($id === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'id가 필요합니다.']);
                exit;
            }

            $pdo->prepare('DELETE FROM inquiry_items WHERE id = ?')->execute([$id]);
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
