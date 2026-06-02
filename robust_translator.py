import json
import time
from deep_translator import GoogleTranslator

def needs_translation(pt_text, en_text):
    if not pt_text: return False
    if not en_text: return True
    if pt_text.strip().lower() == en_text.strip().lower(): return True
    pt_words = {' o ', ' a ', ' os ', ' as ', ' um ', ' uma ', ' de ', ' do ', ' da ', ' no ', ' na ', ' para ', ' com ', ' que '}
    en_lower = ' ' + en_text.lower() + ' '
    if any(w in en_lower for w in pt_words): return True
    return False

def translate_text(text, translator, retries=5):
    if not text: return ''
    for attempt in range(retries):
        try:
            res = translator.translate(text)
            if res: return res
        except Exception as e:
            time.sleep(1 + attempt)
    return text

def main():
    with open('current_bank.json', 'r', encoding='utf-8') as f:
        bank = json.load(f)
        
    translator = GoogleTranslator(source='pt', target='en')
    translated_count = 0
    total_processed = 0
    
    for domain, questions in bank.items():
        for q in questions:
            changed = False
            total_processed += 1
            
            if needs_translation(q.get('question_pt'), q.get('question_en')):
                res = translate_text(q.get('question_pt'), translator)
                if res and res != q.get('question_pt'):
                    q['question_en'] = res
                    changed = True
                    
            if needs_translation(q.get('explanation_pt'), q.get('explanation_en')):
                res = translate_text(q.get('explanation_pt'), translator)
                if res and res != q.get('explanation_pt'):
                    q['explanation_en'] = res
                    changed = True
                    
            opts_pt = q.get('options_pt', [])
            opts_en = q.get('options_en', [])
            if len(opts_en) != len(opts_pt):
                opts_en = list(opts_pt)
                changed = True
                
            for i, opt_pt in enumerate(opts_pt):
                if needs_translation(opt_pt, opts_en[i]):
                    res = translate_text(opt_pt, translator)
                    if res and res != opt_pt:
                        opts_en[i] = res
                        changed = True
                        
            if changed:
                q['options_en'] = opts_en
                translated_count += 1
                if translated_count % 5 == 0:
                    try:
                        print(f'[{translated_count}] Translated {q.get("question_en")[:50]}...'.encode('ascii', 'replace').decode())
                    except:
                        pass
                    with open('current_bank.json', 'w', encoding='utf-8') as f:
                        json.dump(bank, f, ensure_ascii=False, indent=2)

    with open('current_bank.json', 'w', encoding='utf-8') as f:
        json.dump(bank, f, ensure_ascii=False, indent=2)
    print(f'Done! Total translated items: {translated_count} out of {total_processed}')

if __name__ == '__main__':
    main()
