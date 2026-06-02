import re

files = [
    '05-Labs-Oficiais/guia-labs.html',
    '05-Labs-Oficiais/links-uteis.html'
]

# Regex to find URLs not already in href
url_pattern = re.compile(r'(?<!href=")(?<!src=")(https?://[A-Za-z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\%]+)')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = url_pattern.sub(r'<a href="\1" target="_blank" style="color: #1A4CB0; text-decoration: underline; font-weight: 500;">\1</a>', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f'Fixed {filepath}')
