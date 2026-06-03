<?php
// backend/api/brochure-request.php
// POST (JSON) → g5_write_brochure 에 신청 데이터 저장 (인증 불필요)
// GET ?page&size&keyword&date_from&date_to → 목록 (Bearer JWT 필요)
// DELETE ?id → 삭제 (Bearer JWT 필요)

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

define('BR_TABLE', 'g5_write_brochure');

function brRequireAuth(): void {
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

$method = strtoupper($_SERVER['REQUEST_METHOD']);

try {
    $pdo = getDB();

    switch ($method) {

        // ── 신청 저장 (공개, 인증 불필요) ──────────────────────
        case 'POST': {
            $body = (string)file_get_contents('php://input');
            $data = json_decode($body, true);

            $company = trim((string)($data['company'] ?? ''));
            $manager = trim((string)($data['manager'] ?? ''));
            $phone   = trim((string)($data['phone']   ?? ''));
            $email   = trim((string)($data['email']   ?? ''));
            $memo    = trim((string)($data['memo']    ?? '브로슈어 다운로드'));

            if ($company === '' || $manager === '' || $phone === '' || $email === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '필수 항목이 누락되었습니다.']);
                exit;
            }

            // 이메일 기본 유효성 검사
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '이메일 형식이 올바르지 않습니다.']);
                exit;
            }

            // g5_write_brochure 컬럼 매핑
            // wr_subject=회사명, wr_name=담당자, wr_1=연락처, wr_2=이메일, wr_content=메모
            $stmt = $pdo->prepare(
                'INSERT INTO `' . BR_TABLE . '`
                 (wr_subject, wr_name, wr_1, wr_2, wr_content, wr_datetime, wr_last, wr_is_comment, wr_parent, wr_num)
                 VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 0, 0,
                         COALESCE((SELECT MIN(wr_num) FROM `' . BR_TABLE . '` t2), 0) - 1)'
            );
            $stmt->execute([$company, $manager, $phone, $email, $memo]);

            echo json_encode(['success' => true]);
            break;
        }

        // ── 목록 조회 (관리자) ──────────────────────────────────
        case 'GET': {
            brRequireAuth();

            $page     = max(1, (int)($_GET['page'] ?? 1));
            $size     = min(100, max(1, (int)($_GET['size'] ?? 15)));
            $keyword  = trim((string)($_GET['keyword'] ?? ''));
            $dateFrom = trim((string)($_GET['date_from'] ?? ''));
            $dateTo   = trim((string)($_GET['date_to']   ?? ''));

            $where  = ['1=1'];
            $params = [];

            if ($keyword !== '') {
                $where[]  = '(wr_subject LIKE ? OR wr_name LIKE ? OR wr_1 LIKE ? OR wr_2 LIKE ?)';
                $params[] = '%' . $keyword . '%';
                $params[] = '%' . $keyword . '%';
                $params[] = '%' . $keyword . '%';
                $params[] = '%' . $keyword . '%';
            }
            if ($dateFrom !== '') { $where[] = 'DATE(wr_datetime) >= ?'; $params[] = $dateFrom; }
            if ($dateTo   !== '') { $where[] = 'DATE(wr_datetime) <= ?'; $params[] = $dateTo;   }

            $whereSQL = implode(' AND ', $where);
            $offset   = ($page - 1) * $size;

            $cnt = $pdo->prepare("SELECT COUNT(*) FROM `" . BR_TABLE . "` WHERE {$whereSQL}");
            $cnt->execute($params);
            $total = (int)$cnt->fetchColumn();

            $rows = $pdo->prepare(
                "SELECT wr_id AS id,
                        wr_subject  AS company,
                        wr_name     AS manager,
                        wr_1        AS phone,
                        wr_2        AS email,
                        wr_datetime AS download_at,
                        wr_content  AS memo
                 FROM `" . BR_TABLE . "`
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

        // ── 삭제 (관리자) ────────────────────────────────────────
        case 'DELETE': {
            brRequireAuth();

            parse_str((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $qs);
            $id = (int)($qs['id'] ?? 0);

            if ($id === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'id가 필요합니다.']);
                exit;
            }

            $pdo->prepare("DELETE FROM `" . BR_TABLE . "` WHERE wr_id = ?")->execute([$id]);
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
    echo json_encode(['success' => false, 'message' => '서버 오류: ' . $e->getMessage()]);
}
