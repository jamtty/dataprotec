import re

with open('backend/api/material.php', 'rb') as f:
    data = f.read()

lines = data.split(b'\n')
for i, line in enumerate(lines):
    # 깨진 한글이 포함된 500 오류 메시지 라인 교체
    if b'http_response_code(500)' in lines[i-1] if i > 0 else False:
        pass
    if b"json_encode(['success' => false, 'message' => '" in line and b'\xec' in line:
        lines[i] = b"    echo json_encode(['success' => false, 'message' => $e->getMessage()]);\r"
        print(f"Fixed line {i}")

with open('backend/api/material.php', 'wb') as f:
    f.write(b'\n'.join(lines))

print('done')
