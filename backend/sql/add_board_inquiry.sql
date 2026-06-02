-- =========================================================
--  홍보자료 게시판 테이블
-- =========================================================

CREATE TABLE IF NOT EXISTS `material_items` (
  `id`          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(255)  NOT NULL COMMENT '제목',
  `category`    VARCHAR(50)   NOT NULL DEFAULT '' COMMENT '카테고리',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='홍보자료 게시글';

CREATE TABLE IF NOT EXISTS `material_files` (
  `id`        INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `item_id`   INT UNSIGNED  NOT NULL COMMENT '게시글 ID',
  `ori_name`  VARCHAR(255)  NOT NULL COMMENT '원본 파일명',
  `file_path` VARCHAR(512)  NOT NULL COMMENT '저장 경로 (웹 기준)',
  `file_ext`  VARCHAR(20)   NOT NULL COMMENT '확장자',
  `file_size` BIGINT        NOT NULL DEFAULT 0 COMMENT '파일 크기 (bytes)',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_mf_item` (`item_id`),
  CONSTRAINT `fk_mf_item` FOREIGN KEY (`item_id`) REFERENCES `material_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='홍보자료 첨부파일';

-- =========================================================
--  브로슈어 게시판 테이블
-- =========================================================

CREATE TABLE IF NOT EXISTS `brochure_items` (
  `id`          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(255)  NOT NULL COMMENT '제목',
  `category`    VARCHAR(50)   NOT NULL DEFAULT '' COMMENT '카테고리',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='브로슈어 게시글';

CREATE TABLE IF NOT EXISTS `brochure_files` (
  `id`        INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `item_id`   INT UNSIGNED  NOT NULL COMMENT '게시글 ID',
  `ori_name`  VARCHAR(255)  NOT NULL COMMENT '원본 파일명',
  `file_path` VARCHAR(512)  NOT NULL COMMENT '저장 경로 (웹 기준)',
  `file_ext`  VARCHAR(20)   NOT NULL COMMENT '확장자',
  `file_size` BIGINT        NOT NULL DEFAULT 0 COMMENT '파일 크기 (bytes)',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_bf_item` (`item_id`),
  CONSTRAINT `fk_bf_item` FOREIGN KEY (`item_id`) REFERENCES `brochure_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='브로슈어 첨부파일';

-- =========================================================
--  고객문의 테이블
-- =========================================================

CREATE TABLE IF NOT EXISTS `inquiry_items` (
  `id`         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `company`    VARCHAR(100)  NOT NULL DEFAULT '' COMMENT '회사명',
  `manager`    VARCHAR(50)   NOT NULL DEFAULT '' COMMENT '담당자',
  `phone`      VARCHAR(20)   NOT NULL DEFAULT '' COMMENT '연락처',
  `email`      VARCHAR(100)  NOT NULL DEFAULT '' COMMENT '이메일',
  `content`    TEXT          NOT NULL COMMENT '문의내용',
  `is_read`    TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '읽음 여부 (0:미확인, 1:확인)',
  `created_at` DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_inq_read` (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='고객문의';
