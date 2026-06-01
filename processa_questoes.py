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

    output_file = 'Questoes_Traduzidas_Agrupadas.md'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Questões PL-300 Agrupadas e Traduzidas\n\n")
        f.write("Este arquivo foi gerado automaticamente agrupando as questões originais 'Yes/No' em perguntas de múltipla escolha.\n\n---\n\n")
        
        for i, (scenario, options) in enumerate(grouped.items(), 1):
            print(f"Traduzindo cenário {i} de {len(grouped)}...")
            
            translated_scenario = safe_translate(scenario)
            
            f.write(f"## Questão {i}\n\n")
            f.write(f"**Cenário:**\n{translated_scenario}\n\n")
            f.write("**Qual solução atende ao objetivo?**\n\n")
            
            letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
            for idx, opt in enumerate(options):
                translated_opt = safe_translate(opt['solution'])
                correct_mark = "**(CORRETA)**" if opt['is_correct'] else "(Incorreta)"
                letter = letters[idx] if idx < len(letters) else str(idx+1)
                
                f.write(f"- **{letter})** {translated_opt} {correct_mark}\n")
            
            f.write("\n---\n\n")

    print(f"Concluído! Arquivo salvo em: {output_file}")

if __name__ == "__main__":
    main()
