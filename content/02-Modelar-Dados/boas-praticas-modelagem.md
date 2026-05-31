  boas-praticas-modelagem body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; } .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } pre { background-color: #eee; padding: 10px; border-radius: 5px; overflow-x: auto; } code { font-family: "Courier New", Courier, monospace; background-color: #eee; padding: 2px 4px; border-radius: 3px; } img { max-width: 100%; height: auto; display: block; margin: 10px 0; } table { width: 100%; border-collapse: collapse; margin-bottom: 1em; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }

# ⭐ Boas Práticas de Modelagem

Estas práticas garantem um modelo limpo, eficiente e fácil de manter.

* * *

## ✔ Usar Modelo Estrela

*   Tabelas fato no centro
*   Dimensões ao redor
*   Evitar snowflake (normalização excessiva)

* * *

## ✔ Criar Medidas Explícitas

Evitar medidas automáticas (implícitas). Sempre crie medidas no painel **Modeling > New Measure**.

* * *

## ✔ Nomear Tabelas e Medidas Claramente

Exemplos:

*   `Fato Vendas`
*   `Dim Produto`
*   `[Total Vendas]`
*   `[Qtd Clientes Ativos]`

* * *

## ✔ Criar Pastas de Exibição (Display Folders)

Organizar medidas:

*   \_01 KPIs
*   \_02 Time Intelligence
*   \_03 Métricas Financeiras

* * *

## ✔ Evitar Colunas Calculadas (quando possível)

Preferir medidas:

*   consumem menos memória
*   não aumentam tamanho do modelo

* * *

## ✔ Usar Tabela de Datas Oficial

Com colunas:

*   Data
*   Ano
*   Mês
*   Trimestre
*   Semana ISO

* * *

## ✔ Documentar o Modelo

Utilizar:

*   Descrições
*   Linhas de anotação
*   Notas no GitHub

* * *

## 📚 Links Oficiais

*   Data Modeling Guidance:  
    https://learn.microsoft.com/power-bi/guidance/