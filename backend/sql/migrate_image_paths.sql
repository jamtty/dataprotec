-- =========================================================
--  backend/sql/migrate_image_paths.sql
--  이미지 경로 일괄 변경
--  이전: https://dataprotec.co.kr/renewal/data/
--  신규: /renewal_react_v1/data/
--
--  실행 전 반드시 DB 백업!
--  실행: mysql -u [user] -p [database] < migrate_image_paths.sql
-- =========================================================

SET @old = 'https://www.dataprotec.co.kr/renewal/data/';
SET @new = 'https://dataprotec.co.kr/renewal_react_v1/data/';

-- ── g5_write_promotion (홍보자료) ─────────────────────────────
UPDATE `g5_write_promotion`
SET `wr_content` = REPLACE(`wr_content`, @old, @new)
WHERE `wr_content` LIKE CONCAT('%', @old, '%');

-- ── brochure_items ──────────────────────────────────────────
UPDATE `brochure_items`
SET `content`   = REPLACE(`content`,   @old, @new)
WHERE `content`   LIKE CONCAT('%', @old, '%');

UPDATE `brochure_items`
SET `thumbnail` = REPLACE(`thumbnail`, @old, @new)
WHERE `thumbnail` LIKE CONCAT('%', @old, '%');

-- ── 첨부파일 경로 (g5_board_file) ───────────────────────────
UPDATE `g5_board_file`
SET `bf_fileurl`  = REPLACE(`bf_fileurl`,  @old, @new)
WHERE `bf_fileurl`  LIKE CONCAT('%', @old, '%');

UPDATE `g5_board_file`
SET `bf_thumburl` = REPLACE(`bf_thumburl`, @old, @new)
WHERE `bf_thumburl` LIKE CONCAT('%', @old, '%');

-- ── brochure_files ──────────────────────────────────────────
UPDATE `brochure_files`
SET `file_path` = REPLACE(`file_path`, @old, @new)
WHERE `file_path` LIKE CONCAT('%', @old, '%');

-- ── 결과 확인 ───────────────────────────────────────────────
SELECT 'g5_write_news_room wr_content' AS target, COUNT(*) AS updated FROM `g5_write_news_room` WHERE `wr_content` LIKE '%/renewal_react_v1/data/%'
UNION ALL
SELECT 'g5_write_promotion wr_content',   COUNT(*) FROM `g5_write_promotion`  WHERE `wr_content` LIKE '%/renewal_react_v1/data/%'
UNION ALL
SELECT 'brochure_items content',          COUNT(*) FROM `brochure_items`       WHERE `content`    LIKE '%/renewal_react_v1/data/%'
UNION ALL
SELECT 'brochure_items thumb',            COUNT(*) FROM `brochure_items`       WHERE `thumbnail`  LIKE '%/renewal_react_v1/data/%'
UNION ALL
SELECT 'g5_board_file bf_fileurl',        COUNT(*) FROM `g5_board_file`        WHERE `bf_fileurl`  LIKE '%/renewal_react_v1/data/%'
UNION ALL
SELECT 'g5_board_file bf_thumburl',       COUNT(*) FROM `g5_board_file`        WHERE `bf_thumburl` LIKE '%/renewal_react_v1/data/%'
UNION ALL
SELECT 'brochure_files path',             COUNT(*) FROM `brochure_files`       WHERE `file_path`  LIKE '%/renewal_react_v1/data/%';
