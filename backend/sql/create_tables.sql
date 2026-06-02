-- =========================================================
--  backend/sql/create_tables.sql
--  관리자 시스템 DB 테이블 생성 스크립트
--  실행: mysql -u [user] -p [database] < create_tables.sql
-- =========================================================

-- 관리자 계정 테이블
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id`            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  `login_id`      VARCHAR(50)      NOT NULL COMMENT '로그인 아이디',
  `password_hash` VARCHAR(255)     NOT NULL COMMENT 'bcrypt 해시',
  `name`          VARCHAR(50)      NOT NULL COMMENT '표시 이름',
  `role`          VARCHAR(20)      NOT NULL DEFAULT 'admin' COMMENT '권한',
  `is_active`     TINYINT(1)       NOT NULL DEFAULT 1 COMMENT '활성 여부',
  `created_at`    DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_login_id` (`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='관리자 계정';

-- =========================================================
--  뉴스룸 아이템 테이블
-- =========================================================
CREATE TABLE IF NOT EXISTS `newsroom_items` (
  `id`          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(255)  NOT NULL COMMENT '제목',
  `category`    VARCHAR(50)   NOT NULL DEFAULT '' COMMENT '카테고리 (행사/공지사항/보도자료)',
  `news_date`   DATE          NOT NULL COMMENT '게시일',
  `description` TEXT          NOT NULL COMMENT '목록 요약',
  `content`     LONGTEXT      NOT NULL COMMENT '본문 HTML',
  `thumbnail`   VARCHAR(512)  NOT NULL DEFAULT '' COMMENT '썸네일 이미지 경로',
  `is_active`   TINYINT(1)   NOT NULL DEFAULT 1 COMMENT '노출 여부',
  `view_count`  INT          NOT NULL DEFAULT 0 COMMENT '조회수',
  `author_name` VARCHAR(50)  NOT NULL DEFAULT '관리자' COMMENT '작성자명',
  `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='뉴스룸 게시글';

-- =========================================================
--  뉴스룸 첨부파일 테이블
-- =========================================================
CREATE TABLE IF NOT EXISTS `newsroom_files` (
  `id`        INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `item_id`   INT UNSIGNED  NOT NULL COMMENT '게시글 ID',
  `ori_name`  VARCHAR(255)  NOT NULL COMMENT '원본 파일명',
  `file_path` VARCHAR(512)  NOT NULL COMMENT '저장 경로 (웹 기준)',
  `file_ext`  VARCHAR(20)   NOT NULL COMMENT '확장자',
  `file_size` BIGINT        NOT NULL DEFAULT 0 COMMENT '파일 크기 (bytes)',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_nrf_item` (`item_id`),
  CONSTRAINT `fk_nrf_item` FOREIGN KEY (`item_id`) REFERENCES `newsroom_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='뉴스룸 첨부파일';
