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

-- =========================================================
--  GnuBoard5 호환 뉴스룸 게시판 테이블 (g5_write_news_room)
-- =========================================================
CREATE TABLE IF NOT EXISTS `g5_write_news_room` (
  `wr_id`         INT(11)      NOT NULL AUTO_INCREMENT,
  `wr_num`        INT(11)      NOT NULL DEFAULT 0,
  `wr_reply`      VARCHAR(10)  NOT NULL DEFAULT '',
  `wr_parent`     INT(11)      NOT NULL DEFAULT 0,
  `wr_is_comment` TINYINT(4)   NOT NULL DEFAULT 0,
  `wr_comment`    INT(11)      NOT NULL DEFAULT 0,
  `wr_comment_reply` VARCHAR(5) NOT NULL DEFAULT '',
  `ca_name`       VARCHAR(255) NOT NULL DEFAULT '',
  `wr_option`     SET('html1','html2','secret','mail') NOT NULL DEFAULT '',
  `wr_subject`    VARCHAR(255) NOT NULL DEFAULT '',
  `wr_content`    MEDIUMTEXT   NOT NULL,
  `wr_link1`      TEXT         NOT NULL,
  `wr_link2`      TEXT         NOT NULL,
  `wr_link1_hit`  INT(11)      NOT NULL DEFAULT 0,
  `wr_link2_hit`  INT(11)      NOT NULL DEFAULT 0,
  `wr_hit`        INT(11)      NOT NULL DEFAULT 0,
  `wr_good`       INT(11)      NOT NULL DEFAULT 0,
  `wr_nogood`     INT(11)      NOT NULL DEFAULT 0,
  `mb_id`         VARCHAR(20)  NOT NULL DEFAULT '',
  `wr_password`   VARCHAR(255) NOT NULL DEFAULT '',
  `wr_name`       VARCHAR(255) NOT NULL DEFAULT '',
  `wr_email`      VARCHAR(255) NOT NULL DEFAULT '',
  `wr_homepage`   VARCHAR(255) NOT NULL DEFAULT '',
  `wr_datetime`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `wr_last`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `wr_ip`         VARCHAR(100) NOT NULL DEFAULT '',
  `wr_facebook_user` VARCHAR(255) NOT NULL DEFAULT '',
  `wr_twitter_user`  VARCHAR(255) NOT NULL DEFAULT '',
  `wr_1`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_2`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_3`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_4`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_5`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_6`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_7`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_8`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_9`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_10`         VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`wr_id`),
  KEY `idx_wr_num` (`wr_num`),
  KEY `idx_wr_parent` (`wr_parent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='GnuBoard5 뉴스룸 게시판';

-- =========================================================
--  GnuBoard5 호환 홍보자료 게시판 테이블 (g5_write_promotion)
-- =========================================================
CREATE TABLE IF NOT EXISTS `g5_write_promotion` (
  `wr_id`         INT(11)      NOT NULL AUTO_INCREMENT,
  `wr_num`        INT(11)      NOT NULL DEFAULT 0,
  `wr_reply`      VARCHAR(10)  NOT NULL DEFAULT '',
  `wr_parent`     INT(11)      NOT NULL DEFAULT 0,
  `wr_is_comment` TINYINT(4)   NOT NULL DEFAULT 0,
  `wr_comment`    INT(11)      NOT NULL DEFAULT 0,
  `wr_comment_reply` VARCHAR(5) NOT NULL DEFAULT '',
  `ca_name`       VARCHAR(255) NOT NULL DEFAULT '',
  `wr_option`     SET('html1','html2','secret','mail') NOT NULL DEFAULT '',
  `wr_subject`    VARCHAR(255) NOT NULL DEFAULT '',
  `wr_content`    MEDIUMTEXT   NOT NULL,
  `wr_link1`      TEXT         NOT NULL,
  `wr_link2`      TEXT         NOT NULL,
  `wr_link1_hit`  INT(11)      NOT NULL DEFAULT 0,
  `wr_link2_hit`  INT(11)      NOT NULL DEFAULT 0,
  `wr_hit`        INT(11)      NOT NULL DEFAULT 0,
  `wr_good`       INT(11)      NOT NULL DEFAULT 0,
  `wr_nogood`     INT(11)      NOT NULL DEFAULT 0,
  `mb_id`         VARCHAR(20)  NOT NULL DEFAULT '',
  `wr_password`   VARCHAR(255) NOT NULL DEFAULT '',
  `wr_name`       VARCHAR(255) NOT NULL DEFAULT '',
  `wr_email`      VARCHAR(255) NOT NULL DEFAULT '',
  `wr_homepage`   VARCHAR(255) NOT NULL DEFAULT '',
  `wr_datetime`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `wr_last`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `wr_ip`         VARCHAR(100) NOT NULL DEFAULT '',
  `wr_facebook_user` VARCHAR(255) NOT NULL DEFAULT '',
  `wr_twitter_user`  VARCHAR(255) NOT NULL DEFAULT '',
  `wr_1`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_2`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_3`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_4`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_5`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_6`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_7`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_8`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_9`          VARCHAR(255) NOT NULL DEFAULT '',
  `wr_10`         VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`wr_id`),
  KEY `idx_wr_num` (`wr_num`),
  KEY `idx_wr_parent` (`wr_parent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='GnuBoard5 홍보자료 게시판';

-- =========================================================
--  GnuBoard5 호환 첨부파일 테이블 (g5_board_file)
-- =========================================================
CREATE TABLE IF NOT EXISTS `g5_board_file` (
  `bo_table`    VARCHAR(20)   NOT NULL DEFAULT '',
  `wr_id`       INT(11)       NOT NULL DEFAULT 0,
  `bf_no`       TINYINT(4)    NOT NULL DEFAULT 0,
  `bf_source`   VARCHAR(255)  NOT NULL DEFAULT '' COMMENT '원본 파일명',
  `bf_file`     VARCHAR(255)  NOT NULL DEFAULT '' COMMENT '저장 파일명',
  `bf_fileurl`  VARCHAR(512)  NOT NULL DEFAULT '' COMMENT '웹 접근 URL',
  `bf_thumburl` VARCHAR(512)  NOT NULL DEFAULT '' COMMENT '썸네일 URL',
  `bf_storage`  VARCHAR(50)   NOT NULL DEFAULT 'local',
  `bf_filesize` BIGINT        NOT NULL DEFAULT 0,
  `bf_width`    INT(11)       NOT NULL DEFAULT 0,
  `bf_height`   INT(11)       NOT NULL DEFAULT 0,
  `bf_type`     TINYINT(4)    NOT NULL DEFAULT 0 COMMENT '0=파일, 1=이미지',
  `bf_download` INT(11)       NOT NULL DEFAULT 0,
  `bf_content`  TEXT          NOT NULL,
  `bf_datetime` DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bo_table`, `wr_id`, `bf_no`),
  KEY `idx_gbf_table_wr` (`bo_table`, `wr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='GnuBoard5 첨부파일';

-- =========================================================
--  브로슈어 신청 테이블 (GnuBoard5 호환 구조)
-- =========================================================
CREATE TABLE IF NOT EXISTS `g5_write_brochure` (
  `wr_id`         INT(11)       NOT NULL AUTO_INCREMENT COMMENT '신청 ID',
  `wr_num`        INT(11)       NOT NULL DEFAULT 0       COMMENT '정렬번호',
  `wr_subject`    VARCHAR(255)  NOT NULL DEFAULT ''      COMMENT '제목(미사용)',
  `wr_content`    MEDIUMTEXT    NOT NULL                 COMMENT '문의내용',
  `wr_name`       VARCHAR(255)  NOT NULL DEFAULT ''      COMMENT '담당자',
  `wr_password`   VARCHAR(255)  NOT NULL DEFAULT '',
  `wr_1`          VARCHAR(255)  NOT NULL DEFAULT ''      COMMENT '연락처',
  `wr_2`          VARCHAR(255)  NOT NULL DEFAULT ''      COMMENT '이메일',
  `wr_3`          VARCHAR(255)  NOT NULL DEFAULT ''      COMMENT '이메일',
  `wr_4`          VARCHAR(255)  NOT NULL DEFAULT '',
  `wr_5`          VARCHAR(255)  NOT NULL DEFAULT '',
  `wr_6`          VARCHAR(255)  NOT NULL DEFAULT '',
  `wr_7`          VARCHAR(255)  NOT NULL DEFAULT '',
  `wr_8`          VARCHAR(255)  NOT NULL DEFAULT '',
  `wr_9`          VARCHAR(255)  NOT NULL DEFAULT '',
  `wr_10`         VARCHAR(255)  NOT NULL DEFAULT '',
  `wr_datetime`   DATETIME      NOT NULL                 COMMENT '다운로드 일자',
  `wr_last`       DATETIME      NOT NULL,
  `wr_hit`        INT(11)       NOT NULL DEFAULT 0,
  `wr_is_comment` TINYINT(4)    NOT NULL DEFAULT 0,
  `wr_parent`     INT(11)       NOT NULL DEFAULT 0,
  PRIMARY KEY (`wr_id`),
  KEY `idx_brochure_datetime` (`wr_datetime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='브로슈어 신청 목록';
