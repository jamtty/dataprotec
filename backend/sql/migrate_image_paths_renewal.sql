-- =============================================================
--  이미지 경로 마이그레이션
--  변경: /renewal/data/ → /renewal_react_v1/data/
--       https://dataprotec.co.kr/renewal/data/
--    →  https://dataprotec.co.kr/renewal_react_v1/data/
--
--  실행: mysql -u dataprotec -p DATAPROTEC < backend/sql/migrate_image_paths_renewal.sql
-- =============================================================

-- 뉴스룸 본문
UPDATE `newsroom_items`
SET `content` = REPLACE(`content`,
  'https://dataprotec.co.kr/renewal/data/',
  'https://dataprotec.co.kr/renewal_react_v1/data/')
WHERE `content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

-- 뉴스룸 썸네일
UPDATE `newsroom_items`
SET `thumbnail` = REPLACE(`thumbnail`,
  'https://dataprotec.co.kr/renewal/data/',
  'https://dataprotec.co.kr/renewal_react_v1/data/')
WHERE `thumbnail` LIKE '%https://dataprotec.co.kr/renewal/data/%';

-- 홍보자료(g5_board_promotion) 본문
UPDATE `g5_board_promotion`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal/data/',
  'https://dataprotec.co.kr/renewal_react_v1/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

-- 자료실(g5_board_data) 본문
UPDATE `g5_board_data`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal/data/',
  'https://dataprotec.co.kr/renewal_react_v1/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

-- 팝업(g5_new_win) 본문
UPDATE `g5_new_win`
SET `nw_content` = REPLACE(`nw_content`,
  'https://dataprotec.co.kr/renewal/data/',
  'https://dataprotec.co.kr/renewal_react_v1/data/')
WHERE `nw_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';

-- 문의(board_inquiry) 본문
UPDATE `board_inquiry`
SET `wr_content` = REPLACE(`wr_content`,
  'https://dataprotec.co.kr/renewal/data/',
  'https://dataprotec.co.kr/renewal_react_v1/data/')
WHERE `wr_content` LIKE '%https://dataprotec.co.kr/renewal/data/%';
