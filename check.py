
import json
import re

with open('simulado/simulado.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the questionBank JSON
match = re.search(r'const questionBank = (\{.*?\});\s*const', content, re.DOTALL)
if match:
    qb_str = match.group(1)
    # This might not be valid JSON if it has trailing commas or single quotes. 
    # But let's check if it parses.
    try:
        qb = json.loads(qb_str)
        total = 0
        translated = 0
        for domain, questions in qb.items():
            for q in questions:
                total += 1
                if 'question_en' in q:
                    translated += 1
        print(f'Total: {total}, Translated: {translated}, Missing: {total - translated}')
    except Exception as e:
        print('JSON parse failed:', e)
else:
    print('Regex failed to find questionBank')

