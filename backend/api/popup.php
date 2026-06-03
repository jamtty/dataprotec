<?php
// backend/api/popup.php
// GET    ?page&size&keyword&type&date_from&date_to  → 목록 (인증 필요)
// GET    ?id=N               → 단건 조회 (인증 필요)
// POST   (json body)         → 등록 (인증 필요)
// PUT    ?id=N (json body)   → 수정 (인증 필요)
// PATCH  ?id=N&toggle=active → 사용여부 토글 (인증 필요)
// DELETE ?id=N               → 삭제 (인증 필요)
// 테이블: g5_new_win

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

define('POPUP_TABLE', 'g5_new_win');

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
// POST body 에 _method 오버라이드 지원
if (in_array($method, ['POST', 'PUT', 'PATCH']) ) {
    $raw  = file_get_contents('php://input');
    $body = json_decode($raw ?: '{}', true) ?? [];
    if (!empty($body['_method'])) {
        $method = strtoupper((string)$body['_method']);
    }
} else {
    $body = [];
}

parse_str((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $qs);

try {
    $pdo = getDB();

    switch ($method) {

        // ────────────────── GET ────────────────────────────
        case 'GET': {
            // ?public=1 → 인증 없이 현재 활성 팝업 목록만 반환 (프론트 메인 페이지용)
            if (!empty($qs['public'])) {
                $device = trim((string)($qs['device'] ?? ''));
                $devCond = '';
                $devParams = [];
                if ($device === 'pc') {
                    $devCond = "AND (nw_device = 'pc' OR nw_device = 'both')";
                } elseif ($device === 'mobile') {
                    $devCond = "AND (nw_device = 'mobile' OR nw_device = 'both')";
                }
                $stmt = $pdo->prepare(
                    "SELECT nw_id AS id, nw_device AS device,
                            nw_begin_time AS begin_time, nw_end_time AS end_time,
                            nw_disable_hours AS disable_hours,
                            nw_left AS pos_left, nw_top AS pos_top,
                            nw_width AS width, nw_height AS height,
                            nw_subject AS subject, nw_content AS content,
                            nw_content_html AS content_html
                     FROM `" . POPUP_TABLE . "`
                     WHERE nw_is_active = 1
                       AND (nw_begin_time = '0000-00-00 00:00:00' OR nw_begin_time <= NOW())
                       AND (nw_end_time   = '0000-00-00 00:00:00' OR nw_end_time   >= NOW())
                       {$devCond}
                     ORDER BY nw_id DESC"
                );
                $stmt->execute($devParams);
                $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode(['success' => true, 'items' => $items]);
                break;
            }

            requireAuth();

            // 단건 조회
            if (!empty($qs['id'])) {
                $id = (int)$qs['id'];
                $stmt = $pdo->prepare(
                    "SELECT nw_id AS id, nw_device AS device,
                            nw_begin_time AS begin_time, nw_end_time AS end_time,
                            nw_disable_hours AS disable_hours,
                            nw_left AS pos_left, nw_top AS pos_top,
                            nw_width AS width, nw_height AS height,
                            nw_subject AS subject, nw_content AS content,
                            nw_content_html AS content_html,
                            nw_is_active AS is_active
                     FROM `" . POPUP_TABLE . "` WHERE nw_id = ? LIMIT 1"
                );
                $stmt->execute([$id]);
                $item = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$item) {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => '팝업을 찾을 수 없습니다.']);
                    exit;
                }
                echo json_encode(['success' => true, 'item' => $item]);
                break;
            }

            // 목록 조회
            $page      = max(1, (int)($qs['page'] ?? 1));
            $size      = min(100, max(1, (int)($qs['size'] ?? 15)));
            $keyword   = trim((string)($qs['keyword'] ?? ''));
            $type      = isset($qs['type']) ? (int)$qs['type'] : 2;
            $date_from = trim((string)($qs['date_from'] ?? ''));
            $date_to   = trim((string)($qs['date_to']   ?? ''));

            $where  = ['1=1'];
            $params = [];

            if ($keyword !== '') {
                if ($type === 0) {
                    $where[]  = 'nw_subject LIKE ?';
                    $params[] = '%' . $keyword . '%';
                } elseif ($type === 1) {
                    $where[]  = 'nw_content LIKE ?';
                    $params[] = '%' . $keyword . '%';
                } else { // 전체
                    $where[]  = '(nw_subject LIKE ? OR nw_content LIKE ?)';
                    $params[] = '%' . $keyword . '%';
                    $params[] = '%' . $keyword . '%';
                }
            }

            if ($date_from !== '') {
                $where[]  = 'nw_begin_time >= ?';
                $params[] = $date_from . ' 00:00:00';
            }
            if ($date_to !== '') {
                $where[]  = 'nw_begin_time <= ?';
                $params[] = $date_to . ' 23:59:59';
            }

            $whereSQL = implode(' AND ', $where);
            $offset   = ($page - 1) * $size;

            $cnt = $pdo->prepare("SELECT COUNT(*) FROM `" . POPUP_TABLE . "` WHERE {$whereSQL}");
            $cnt->execute($params);
            $total = (int)$cnt->fetchColumn();

            $rows = $pdo->prepare(
                "SELECT nw_id AS id, nw_device AS device,
                        nw_begin_time AS begin_time, nw_end_time AS end_time,
                        nw_subject AS subject,
                        nw_width AS width, nw_height AS height,
                        nw_is_active AS is_active
                 FROM `" . POPUP_TABLE . "`
                 WHERE {$whereSQL}
                 ORDER BY
                   CASE WHEN nw_end_time != '0000-00-00 00:00:00' AND nw_end_time < NOW() THEN 1 ELSE 0 END ASC,
                   nw_is_active DESC,
                   nw_id DESC
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

        // ────────────────── POST (등록) ───────────────────
        case 'POST': {
            requireAuth();

            $subject      = trim((string)($body['subject']      ?? ''));
            $content      = (string)($body['content']           ?? '');
            $device       = (string)($body['device']            ?? 'both');
            $begin_time   = (string)($body['begin_time']        ?? '0000-00-00 00:00:00');
            $end_time     = (string)($body['end_time']          ?? '0000-00-00 00:00:00');
            $disable_hours = (int)($body['disable_hours']       ?? 24);
            $pos_left     = (int)($body['pos_left']             ?? 0);
            $pos_top      = (int)($body['pos_top']              ?? 0);
            $width        = (int)($body['width']                ?? 400);
            $height       = (int)($body['height']               ?? 400);
            $content_html = (int)($body['content_html']         ?? 0);
            $is_active    = isset($body['is_active']) ? (int)$body['is_active'] : 1;

            if ($subject === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '팝업 제목을 입력해주세요.']);
                exit;
            }

            $ins = $pdo->prepare(
                "INSERT INTO `" . POPUP_TABLE . "`
                 (nw_device, nw_begin_time, nw_end_time, nw_disable_hours,
                  nw_left, nw_top, nw_width, nw_height,
                  nw_subject, nw_content, nw_content_html, nw_is_active)
                 VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
            );
            $ins->execute([
                $device, $begin_time, $end_time, $disable_hours,
                $pos_left, $pos_top, $width, $height,
                $subject, $content, $content_html, $is_active,
            ]);

            echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()]);
            break;
        }

        // ────────────────── PUT (수정) ────────────────────
        case 'PUT': {
            requireAuth();

            $id = (int)($qs['id'] ?? 0);
            if ($id === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'id가 필요합니다.']);
                exit;
            }

            $subject      = trim((string)($body['subject']      ?? ''));
            $content      = (string)($body['content']           ?? '');
            $device       = (string)($body['device']            ?? 'both');
            $begin_time   = (string)($body['begin_time']        ?? '0000-00-00 00:00:00');
            $end_time     = (string)($body['end_time']          ?? '0000-00-00 00:00:00');
            $disable_hours = (int)($body['disable_hours']       ?? 24);
            $pos_left     = (int)($body['pos_left']             ?? 0);
            $pos_top      = (int)($body['pos_top']              ?? 0);
            $width        = (int)($body['width']                ?? 400);
            $height       = (int)($body['height']               ?? 400);
            $content_html = (int)($body['content_html']         ?? 0);
            $is_active    = isset($body['is_active']) ? (int)$body['is_active'] : 1;

            if ($subject === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => '팝업 제목을 입력해주세요.']);
                exit;
            }

            $upd = $pdo->prepare(
                "UPDATE `" . POPUP_TABLE . "` SET
                  nw_device=?, nw_begin_time=?, nw_end_time=?, nw_disable_hours=?,
                  nw_left=?, nw_top=?, nw_width=?, nw_height=?,
                  nw_subject=?, nw_content=?, nw_content_html=?, nw_is_active=?
                 WHERE nw_id=?"
            );
            $upd->execute([
                $device, $begin_time, $end_time, $disable_hours,
                $pos_left, $pos_top, $width, $height,
                $subject, $content, $content_html, $is_active, $id,
            ]);

            echo json_encode(['success' => true]);
            break;
        }

        // ────────────────── PATCH (사용여부 토글) ──────────
        case 'PATCH': {
            requireAuth();

            $id = (int)($qs['id'] ?? 0);
            if ($id === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'id가 필요합니다.']);
                exit;
            }

            // 현재 값 조회 후 반전
            $cur = $pdo->prepare("SELECT nw_is_active FROM `" . POPUP_TABLE . "` WHERE nw_id=? LIMIT 1");
            $cur->execute([$id]);
            $row = $cur->fetch(PDO::FETCH_ASSOC);
            if (!$row) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => '팝업을 찾을 수 없습니다.']);
                exit;
            }
            $newVal = (int)$row['nw_is_active'] === 1 ? 0 : 1;
            $pdo->prepare("UPDATE `" . POPUP_TABLE . "` SET nw_is_active=? WHERE nw_id=?")
                ->execute([$newVal, $id]);

            echo json_encode(['success' => true, 'is_active' => $newVal]);
            break;
        }

        // ────────────────── DELETE ────────────────────────
        case 'DELETE': {
            requireAuth();

            $id = (int)($qs['id'] ?? 0);
            if ($id === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'id가 필요합니다.']);
                exit;
            }

            $pdo->prepare("DELETE FROM `" . POPUP_TABLE . "` WHERE nw_id = ?")->execute([$id]);
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
