import pandas as pd
import re
from deep_translator import GoogleTranslator

def main():
    print("Iniciando a leitura do arquivo CSV...")
    # Carrega o arquivo usando o separador correto
    try:
        df = pd.read_csv('PL300_Questoes_e_Respostas.csv', sep=';', encoding='utf-8', on_bad_lines='skip')
    except Exception as e:
        print(f"Erro ao ler CSV: {e}")
        return

    # Filtra apenas as linhas onde a coluna de opções contém "A. Yes | B. No"
    if 'Opções' not in df.columns or 'Pergunta' not in df.columns or 'Resposta' not in df.columns:
        print("Erro: As colunas esperadas ('Pergunta', 'Opções', 'Resposta') não foram encontradas.")
        return

    df_yes_no = df[df['Opções'].astype(str).str.contains(r'A\.\s*YES\s*\|\s*B\.\s*NO', case=False, regex=True, na=False)].copy()
    print(f"Encontradas {len(df_yes_no)} perguntas do tipo Yes/No.")

    grouped = {}

    # Regex para extrair o cenário e a solução
    # Padrão típico: [Cenário...] Solution: [Solução sugerida] Does this solution meet the goal?
    pattern = re.compile(r'(.*?)Solution:\s*(.*?)\s*Does this solution meet the goal\?', re.IGNORECASE | re.DOTALL)

    for index, row in df_yes_no.iterrows():
        pergunta_text = str(row['Pergunta'])
        match = pattern.search(pergunta_text)
        if match:
            scenario = match.group(1).strip()
            solution = match.group(2).strip()
            # A resposta correta quando é a solução exata costuma ser "A" (Yes)
            # Remove aspas caso tenha vindo do CSV (ex: '"A')
            res = str(row['Resposta']).strip().upper().replace('"', '')
            is_correct = res.startswith('A')
            
            # Limpa prefixos como 'CASE X' para agrupar melhor, se necessário (opcional)
            scenario_key = re.sub(r'(?i)^CASE\s+\d+\s+', '', scenario).strip()
            
            if scenario_key not in grouped:
                grouped[scenario_key] = []
            
            grouped[scenario_key].append({
                'solution': solution,
                'is_correct': is_correct
            })

    print(f"As perguntas foram agrupadas em {len(grouped)} cenários únicos.")
    print("Iniciando tradução (isso pode levar alguns segundos)...")

    translator = GoogleTranslator(source='en', target='pt')

    def safe_translate(text):
        if not text:
            return ""
        try:
            return translator.translate(text)
        except Exception as e:
            print(f"  [Aviso] Falha ao traduzir trecho: {e}")
            return text

    output_file = 'questoes.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questões Traduzidas</title>
    <link rel="stylesheet" href="portal-style.css">
    <script src="portal-core.js?v=2"></script>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; background-color: var(--bg-main); color: var(--text-primary); margin: 0; padding: 0; }
        .container { max-width: 900px; margin: 60px auto; background: var(--surface-card); padding: 30px; border-radius: 12px; box-shadow: var(--shadow); border: 1px solid var(--border-color); }
        .settings-panel { position: fixed; top: 15px; right: 15px; z-index: 1000; display: flex; gap: 8px; }
        .settings-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; border: 1px solid var(--border-color); background: var(--surface-card); color: var(--text-primary); cursor: pointer; font-size: 0.85rem; font-weight: 600; transition: all 0.2s; }
        .settings-btn:hover { border-color: var(--primary-color); transform: translateY(-1px); }
        .back-btn { display: inline-block; margin-bottom: 20px; color: var(--primary-color); text-decoration: none; font-weight: bold; }
        .question { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color); }
        .options { list-style: none; padding: 0; }
        .options li { margin-bottom: 10px; }
        .correct-mark { color: var(--success); font-weight: bold; }
    </style>
</head>
<body>
    <div class="settings-panel" id="settings-panel">
      <button class="settings-btn" id="btn-lang" onclick="toggleLang()" title="Switch language / Alternar idioma">
        <span class="btn-icon" id="lang-icon">🇧🇷</span>
        <span id="lang-label">PT</span>
      </button>
      <button class="settings-btn" id="btn-theme" onclick="toggleTheme()" title="Toggle dark/light mode">
        <span class="btn-icon" id="theme-icon">🌙</span>
        <span id="theme-label">Dark</span>
      </button>
    </div>

    <div class="container">
        <a href="index.html" class="back-btn">
            <span lang-content="pt">&larr; Voltar para Tela Principal</span>
            <span lang-content="en">&larr; Back to Main Portal</span>
        </a>

        <h1 lang-content="pt">Questões PL-300 Agrupadas e Traduzidas</h1>
        <h1 lang-content="en">PL-300 Grouped and Translated Questions</h1>
''')
        
        for i, (scenario, options) in enumerate(grouped.items(), 1):
            print(f"Traduzindo cenário {i} de {len(grouped)}...")
            
            translated_scenario = safe_translate(scenario)
            
            f.write(f'        <div class="question">\n')
            f.write(f'            <h2 lang-content="pt">Questão {i}</h2>\n')
            f.write(f'            <h2 lang-content="en">Question {i}</h2>\n')
            
            f.write(f'            <div lang-content="pt"><strong>Cenário:</strong><br>{translated_scenario}</div>\n')
            f.write(f'            <div lang-content="en"><strong>Scenario:</strong><br>{scenario}</div>\n')
            
            f.write(f'            <p lang-content="pt"><strong>Qual solução atende ao objetivo?</strong></p>\n')
            f.write(f'            <p lang-content="en"><strong>Which solution meets the goal?</strong></p>\n')
            
            f.write('            <ul class="options">\n')
            
            letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
            for idx, opt in enumerate(options):
                translated_opt = safe_translate(opt['solution'])
                
                correct_mark_pt = ' <span class="correct-mark">(CORRETA)</span>' if opt['is_correct'] else ''
                correct_mark_en = ' <span class="correct-mark">(CORRECT)</span>' if opt['is_correct'] else ''
                
                letter = letters[idx] if idx < len(letters) else str(idx+1)
                
                f.write(f'                <li>\n')
                f.write(f'                    <span lang-content="pt"><strong>{letter})</strong> {translated_opt}{correct_mark_pt}</span>\n')
                f.write(f'                    <span lang-content="en"><strong>{letter})</strong> {opt["solution"]}{correct_mark_en}</span>\n')
                f.write(f'                </li>\n')
                
            f.write('            </ul>\n')
            f.write('        </div>\n')
            
        f.write('''    </div>
</body>
</html>''')

    print(f"Concluído! Arquivo salvo em: {output_file}")

if __name__ == "__main__":
    main()
