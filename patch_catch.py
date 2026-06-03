lines = open('backend/api/material.php','r',encoding='utf-8').readlines()
in_exc_catch = False
for i, l in enumerate(lines):
    if '} catch (Exception' in l:
        in_exc_catch = True
    if in_exc_catch and 'json_encode' in l and 'getMessage' not in l:
        lines[i] = "    echo json_encode(['success' => false, 'message' => $e->getMessage()]);\n"
        break
open('backend/api/material.php','w',encoding='utf-8').writelines(lines)
print('done')