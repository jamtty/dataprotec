<?php
// backend/api/migrate-image-paths.php
// 이미지 경로 일괄 변경 (관리자 인증 필요)
// GET  → 영향받는 행 수 미리보기 (dry-run)
// POST → 실제 변경 실행

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once dirname(__DIR__) . '/db.php';
require_once dirname(__DIR__) . '/jwt.php';

// ── 인증 ─────────────────────────────────────────────────────
$auth = $_SERVER['HTTP_AUTHORIZATION']
    ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
    ?? (function_exists('getallheaders') ? (getallheaders()['Authorization'] ?? '') : '')
    ?? '';
if (!preg_match('/^Bearer\s+(.+)$/i', $auth, $m) || !verifyJWT($m[1])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => '인증이 필요합니다.']);
    exit;
}

$OLD = 'https://dataprotec.co.kr/renewal/data/';
$NEW = '/renewal_react_v1/data/';

// 변경 대상: [테이블, 컬럼] 목록
$targets = [
    ['g5_write_news_room', 'wr_content'],   // 뉴스룸 본문
    ['g5_write_promotion', 'wr_content'],   // 홍보자료 본문
    ['brochure_items',     'content'],
    ['brochure_items',     'thumbnail'],
    ['g5_board_file',      'bf_fileurl'],   // g5 첨부파일 URL
    ['g5_board_file',      'bf_thumburl'],  // g5 첨부파일 썸네일 URL
    ['brochure_files',     'file_path'],
];

try {
    $pdo = getDB();
    $dryRun = ($_SERVER['REQUEST_METHOD'] !== 'POST');
    $report = [];
    $totalAffected = 0;

    foreach ($targets as [$table, $col]) {
        // 영향받는 행 수 확인
        $countSql = "SELECT COUNT(*) FROM `{$table}` WHERE `{$col}` LIKE ?";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute(['%' . $OLD . '%']);
        $count = (int)$countStmt->fetchColumn();

        $entry = ['table' => $table, 'column' => $col, 'affected' => $count];

        if (!$dryRun && $count > 0) {
            $updateSql = "UPDATE `{$table}` SET `{$col}` = REPLACE(`{$col}`, ?, ?) WHERE `{$col}` LIKE ?";
            $updateStmt = $pdo->prepare($updateSql);
            $updateStmt->execute([$OLD, $NEW, '%' . $OLD . '%']);
            $entry['updated'] = $updateStmt->rowCount();
        }

        $report[] = $entry;
        $totalAffected += $count;
    }

    echo json_encode([
        'success'       => true,
        'dry_run'       => $dryRun,
        'old_prefix'    => $OLD,
        'new_prefix'    => $NEW,
        'total_affected'=> $totalAffected,
        'report'        => $report,
        'message'       => $dryRun
            ? "dry-run: {$totalAffected}개 행이 변경 대상입니다. POST 요청으로 실제 변경하세요."
            : "{$totalAffected}개 행의 이미지 경로를 변경했습니다.",
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
