
import os

file_path = '/Users/tony/Downloads/gemini/src/pages/KnowledgeCatalogPage.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 替换掉错误的转义序列 \" 为 "
# 同时也处理可能存在的 < div 这种奇怪的空格（虽然不是报错主因，但也最好修一下）
new_content = content.replace('\\"', '"')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully cleaned up the file.")
