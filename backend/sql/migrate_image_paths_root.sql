-- =============================================================
--  이미지 경로 마이그레이션 (루트 경로로 통일)
--  변경1: https://dataprotec.co.kr/renewal_react_v1/data/ → /data/
--  변경2: https://dataprotec.co.kr/renewal/data/          → /data/
--  변경3: /renewal_react_v1/data/                         → /data/
--  변경4: /renewal_react_v1/uploads/                      → /uploads/
--
--  실행: mysql -u dataprotec -p DATAPROTEC < backend/sql/migrate_image_paths_root.sql
-- =============================================================

-- ─── 뉴스룸 본문 (g5_write_news_room) ────────────────────────

UPDATE `g5_write_news_room`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `g5_write_news_room`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

UPDATE `g5_write_news_room`
SET `wr_content` = REPLACE(`wr_content`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%/renewal_react_v1/data/%';

-- ─── 뉴스룸 본문 (newsroom_items) ────────────────────────────

UPDATE `newsroom_items`
SET `content` = REPLACE(`content`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `content` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `newsroom_items`
SET `content` = REPLACE(`content`,
  'https://dataprotec.co.kr/renewal/data/',
  '/data/')
WHERE `content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

UPDATE `newsroom_items`
SET `content` = REPLACE(`content`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `content` LIKE '%/renewal_react_v1/data/%';

-- ─── 뉴스룸 썸네일 (newsroom_items) ──────────────────────────

UPDATE `newsroom_items`
SET `thumbnail` = REPLACE(`thumbnail`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `thumbnail` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `newsroom_items`
SET `thumbnail` = REPLACE(`thumbnail`,
  'https://dataprotec.co.kr/renewal/data/',
  '/data/')
WHERE `thumbnail` LIKE '%https://dataprotec.co.kr/renewal/data/%';

UPDATE `newsroom_items`
SET `thumbnail` = REPLACE(`thumbnail`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `thumbnail` LIKE '%/renewal_react_v1/data/%';

-- ─── 홍보자료 본문 (g5_write_promotion) ──────────────────────

UPDATE `g5_write_promotion`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `g5_write_promotion`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

UPDATE `g5_write_promotion`
SET `wr_content` = REPLACE(`wr_content`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%/renewal_react_v1/data/%';

-- ─── 홍보자료 본문 (g5_board_promotion) ──────────────────────

UPDATE `g5_board_promotion`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `g5_board_promotion`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

UPDATE `g5_board_promotion`
SET `wr_content` = REPLACE(`wr_content`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%/renewal_react_v1/data/%';

-- ─── 자료실 본문 (g5_board_data) ─────────────────────────────

UPDATE `g5_board_data`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `g5_board_data`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

UPDATE `g5_board_data`
SET `wr_content` = REPLACE(`wr_content`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%/renewal_react_v1/data/%';

-- ─── 팝업 본문 (g5_new_win) ──────────────────────────────────

UPDATE `g5_new_win`
SET `nw_content` = REPLACE(`nw_content`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `nw_content` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `g5_new_win`
SET `nw_content` = REPLACE(`nw_content`,
  'https://dataprotec.co.kr/renewal/data/',
  '/data/')
WHERE `nw_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

UPDATE `g5_new_win`
SET `nw_content` = REPLACE(`nw_content`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `nw_content` LIKE '%/renewal_react_v1/data/%';

-- ─── 문의 본문 (board_inquiry) ───────────────────────────────

UPDATE `board_inquiry`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `board_inquiry`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal/data/',
  '/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

UPDATE `board_inquiry`
SET `wr_content` = REPLACE(`wr_content`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `wr_content` LIKE '%/renewal_react_v1/data/%';

-- ─── 첨부파일 경로 (g5_board_file) ──────────────────────────

UPDATE `g5_board_file`
SET `bf_fileurl` = REPLACE(`bf_fileurl`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `bf_fileurl` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `g5_board_file`
SET `bf_fileurl` = REPLACE(`bf_fileurl`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `bf_fileurl` LIKE '%/renewal_react_v1/data/%';

UPDATE `g5_board_file`
SET `bf_thumburl` = REPLACE(`bf_thumburl`,
  'https://dataprotec.co.kr/renewal_react_v1/data/',
  '/data/')
WHERE `bf_thumburl` LIKE '%https://dataprotec.co.kr/renewal_react_v1/data/%';

UPDATE `g5_board_file`
SET `bf_thumburl` = REPLACE(`bf_thumburl`,
  '/renewal_react_v1/data/',
  '/data/')
WHERE `bf_thumburl` LIKE '%/renewal_react_v1/data/%';

-- ─── 브로셔 첨부파일 경로 (brochure_items) ───────────────────

UPDATE `brochure_items`
SET `file_path` = REPLACE(`file_path`,
  '/renewal_react_v1/uploads/',
  '/uploads/')
WHERE `file_path` LIKE '%/renewal_react_v1/uploads/%';
