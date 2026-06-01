import json
import time
from deep_translator import GoogleTranslator

def main():
    print("Carregando bank.json...")
    with open('bank.json', 'r', encoding='utf-8') as f:
        bank = json.load(f)
    
    translator_pt_to_en = GoogleTranslator(source='pt', target='en')
    translator_en_to_pt = GoogleTranslator(source='en', target='pt')
    
    def safe_translate(text, translator):
        if not text:
            return ""
        try:
            return translator.translate(text)
        except Exception as e:
            print(f"Erro na tradução: {e}")
            time.sleep(1)
            try:
                return translator.translate(text)
            except:
                return text

    total_translated = 0
    
    for domain, questions in bank.items():
        print(f"Traduzindo domínio: {domain} ({len(questions)} questões)")
        for idx, q in enumerate(questions):
            # Se for legado PT (tem 'pergunta')
            if 'pergunta' in q:
                if 'question_en' not in q:
                    q['question_en'] = safe_translate(q['pergunta'], translator_pt_to_en)
                    q['options_en'] = [safe_translate(opt, translator_pt_to_en) for opt in q.get('opcoes', [])]
                    q['explanation_en'] = safe_translate(q.get('explicacao', ''), translator_pt_to_en)
                    q['question_pt'] = q['pergunta']
                    q['options_pt'] = q.get('opcoes', [])
                    q['explanation_pt'] = q.get('explicacao', '')
                    q['answer'] = q.get('correta')
                    total_translated += 1
            # Se for moderno EN (tem 'question')
            elif 'question' in q:
                if 'question_pt' not in q:
                    q['question_pt'] = safe_translate(q['question'], translator_en_to_pt)
                    q['options_pt'] = [safe_translate(opt, translator_en_to_pt) for opt in q.get('options', [])]
                    q['explanation_pt'] = safe_translate(q.get('explanation', ''), translator_en_to_pt)
                    q['question_en'] = q['question']
                    q['options_en'] = q.get('options', [])
                    q['explanation_en'] = q.get('explanation', '')
                    total_translated += 1
            
            if (idx + 1) % 10 == 0:
                print(f"  ... traduzidas {idx + 1} questões de {domain}")
                # Save partial progress just in case
                with open('bank_translated.json', 'w', encoding='utf-8') as f:
                    json.dump(bank, f, ensure_ascii=False, indent=2)

    with open('bank_translated.json', 'w', encoding='utf-8') as f:
        json.dump(bank, f, ensure_ascii=False, indent=2)
    
    print(f"Tradução completa! {total_translated} questões atualizadas.")

if __name__ == '__main__':
    main()
