<?php
// =========================================================
//  backend/config.example.php  —  설정 파일 템플릿
//  이 파일을 config.php 로 복사한 뒤 실제 값을 채워넣으세요.
// =========================================================

define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');
define('DB_CHARSET', 'utf8mb4');

define('JWT_SECRET', 'CHANGE_THIS_TO_A_RANDOM_256BIT_SECRET_KEY');
define('JWT_EXPIRE', 86400);

define('ALLOWED_ORIGINS', []);
