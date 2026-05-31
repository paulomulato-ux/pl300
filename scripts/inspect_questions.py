import json
from pathlib import Path
path = Path(__file__).resolve().parent.parent / 'simulado' / 'questions.json'
with path.open('r', encoding='utf-8') as f:
    data = json.load(f)
print('domains', list(data.keys()))
for domain, qs in data.items():
    print(domain, 'count', len(qs))
    break
q = data['Preparar Dados'][0]
print('sample keys', list(q.keys()))
print('sample pergunta len', len(q['pergunta']))
print('sample opcoes len', len(q['opcoes']))
print('sample correta', q['correta'])
empty_q = []
missing_options = []
invalid = []
seen = {}
dups = []
for domain, qs in data.items():
    for i,q in enumerate(qs):
        if not q.get('pergunta') or not q['pergunta'].strip():
            empty_q.append((domain,i))
        if not q.get('opcoes') or len(q['opcoes']) < 2:
            missing_options.append((domain,i,q.get('opcoes')))
        if q.get('correta') is None:
            invalid.append((domain,i))
        text = q.get('pergunta','').strip()
        if text in seen:
            dups.append((text[:80], seen[text], (domain,i)))
        else:
            seen[text] = (domain,i)
print('empty_q', len(empty_q))
print('missing_options', len(missing_options))
print('invalid', len(invalid))
print('duplicates', len(dups))
print('first_dup', dups[:10])
