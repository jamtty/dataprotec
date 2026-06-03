import re

src = open('backend/api/newsroom.php', 'r', encoding='utf-8').read()

repl = [
    ('// backend/api/newsroom.php', '// backend/api/material.php'),
    ("/data/file/news_room/", "/data/file/promotion/"),
    ("'news_room'", "'promotion'"),
    ("define('BO_TABLE_NEWSROOM',", "define('MAT_BO_TABLE',"),
    ("define('UPLOAD_DIR',", "define('MAT_UPLOAD_DIR',"),
    ("define('UPLOAD_WEB_PATH',", "define('MAT_UPLOAD_WEB_PATH',"),
    ("define('ALLOWED_EXTS',", "define('MAT_ALLOWED_EXTS',"),
    ("define('MAX_FILE_SIZE',", "define('MAT_MAX_FILE_SIZE',"),
    ('BO_TABLE_NEWSROOM', 'MAT_BO_TABLE'),
    ('UPLOAD_DIR', 'MAT_UPLOAD_DIR'),
    ('UPLOAD_WEB_PATH', 'MAT_UPLOAD_WEB_PATH'),
    ('ALLOWED_EXTS', 'MAT_ALLOWED_EXTS'),
    ('MAX_FILE_SIZE', 'MAT_MAX_FILE_SIZE'),
    ('function requireAuth()', 'function matRequireAuth()'),
    ('requireAuth()', 'matRequireAuth()'),
    ('function saveUploadedFile(', 'function matSaveUploadedFile('),
    ('saveUploadedFile(', 'matSaveUploadedFile('),
    ('g5_write_news_room', 'g5_write_promotion'),
]
for old, new in repl:
    src = src.replace(old, new)

src = re.sub(
    r"echo json_encode\(\['success' => false, 'message' => '[^\x00-\x7f]+'\]\);",
    "echo json_encode(['success' => false, 'message' => \->getMessage()]);",
    src
)

open('backend/api/material.php', 'w', encoding='utf-8').write(src)
print('done len=', len(src))