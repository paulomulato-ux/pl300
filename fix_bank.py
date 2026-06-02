import json
import time
import re
from deep_translator import GoogleTranslator

def is_english(text):
    if not text: return False
    words = text.lower().split()
    en_words = {'the', 'is', 'what', 'how', 'to', 'and', 'which', 'you', 'your', 'are', 'of', 'in', 'on', 'for', 'with'}
    return len(en_words.intersection(words)) >= 1

def fix_pt_translation(text):
    if not text: return ""
    replacements = {
        "dobra de consulta": "Query Folding",
        "segurança em nível de linha": "Row-Level Security (RLS)",
        "esquema de estrela": "Star Schema",
        "esquema estrela": "Star Schema",
        "tabela de fatos": "Tabela Fato",
        "tabela de dimensões": "Tabela Dimensão",
        "consulta direta": "DirectQuery",
        "espaço de trabalho": "Workspace",
        "espaços de trabalho": "Workspaces",
        "conjunto de dados": "Dataset",
        "conjuntos de dados": "Datasets",
        "fluxo de dados": "Dataflow",
        "fluxos de dados": "Dataflows",
        "tabela calculada": "Tabela Calculada (Calculated Table)",
        "coluna calculada": "Coluna Calculada (Calculated Column)",
    }
    for k, v in replacements.items():
        text = re.sub(re.escape(k), v, text, flags=re.IGNORECASE)
    return text

def main():
    print("Iniciando correção do banco de dados (preservando termos originais)...")
    with open('bank_corrupted.json', 'r', encoding='utf-8') as f:
        bank = json.load(f)

    translator_en = GoogleTranslator(source='pt', target='en')
    translator_pt = GoogleTranslator(source='en', target='pt')

    def safe_translate_en(text):
        if not text: return ""
        try: return translator_en.translate(text)
        except:
            time.sleep(1)
            try: return translator_en.translate(text)
            except: return text

    def safe_translate_pt(text):
        if not text: return ""
        try: 
            t = translator_pt.translate(text)
            return fix_pt_translation(t)
        except:
            time.sleep(1)
            try: 
                t = translator_pt.translate(text)
                return fix_pt_translation(t)
            except: return text

    count = 0
    for domain, questions in bank.items():
        for q in questions:
            count += 1
            original_text = q.get('pergunta') or q.get('question')
            original_options = q.get('opcoes') or q.get('options') or []
            original_explanation = q.get('explicacao') or q.get('explanation') or ""

            # Remove corrupted fields
            for k in ['question_en', 'question_pt', 'options_en', 'options_pt', 'explanation_en', 'explanation_pt']:
                if k in q: del q[k]

            if is_english(original_text):
                q['question_en'] = original_text
                q['options_en'] = original_options
                q['explanation_en'] = original_explanation
                
                q['question_pt'] = safe_translate_pt(original_text)
                q['options_pt'] = [safe_translate_pt(o) for o in original_options]
                q['explanation_pt'] = safe_translate_pt(original_explanation)
            else:
                q['question_pt'] = original_text
                q['options_pt'] = original_options
                q['explanation_pt'] = original_explanation

                q['question_en'] = safe_translate_en(original_text)
                q['options_en'] = [safe_translate_en(o) for o in original_options]
                q['explanation_en'] = safe_translate_en(original_explanation)
            
            if count % 20 == 0:
                print(f"Corrigidas {count} questões...")
                with open('bank_fixed.json', 'w', encoding='utf-8') as f:
                    json.dump(bank, f, ensure_ascii=False, indent=2)

    with open('bank_fixed.json', 'w', encoding='utf-8') as f:
        json.dump(bank, f, ensure_ascii=False, indent=2)
    print("Correção concluída com sucesso!")

if __name__ == '__main__':
    main()
