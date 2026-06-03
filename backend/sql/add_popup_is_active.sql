-- g5_new_win 테이블에 사용여부(nw_is_active) 컬럼 추가
-- 실행: mysql -u dataprotec -p DATAPROTEC < backend/sql/add_popup_is_active.sql

ALTER TABLE `g5_new_win`
  ADD COLUMN `nw_is_active` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '사용여부 (1=사용, 0=사용안함)'
  AFTER `nw_content_html`;

-- 기존 데이터는 모두 사용(1)으로 설정
UPDATE `g5_new_win` SET `nw_is_active` = 1;
