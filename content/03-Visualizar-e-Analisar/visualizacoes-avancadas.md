  visualizacoes-avancadas body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; } .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } pre { background-color: #eee; padding: 10px; border-radius: 5px; overflow-x: auto; } code { font-family: "Courier New", Courier, monospace; background-color: #eee; padding: 2px 4px; border-radius: 3px; } img { max-width: 100%; height: auto; display: block; margin: 10px 0; } table { width: 100%; border-collapse: collapse; margin-bottom: 1em; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }

# ⚙️ Visualizações Avançadas

Esta seção aprofunda recursos avançados para aprimorar storytelling e análise dentro do Power BI.

* * *

## 🔹 KPIs

KPIs destacam: - Valor atual  
\- Meta  
\- Variação  
\- Tendência

Exemplo de medida:

    Meta Atingida = IF([Total Vendas] >= [Meta], "Sim", "Não")
    

* * *

## 🔹 Matriz (Matrix Visual)

Recursos: - Stepped layout  
\- Drilldown  
\- Subtotais  
\- Formatação condicional  
\- Expandir/contrair níveis

* * *

## 🔹 Gráficos de Combinação

Usos típicos: - Coluna + linha  
\- Dual axis  
\- Mostrar valores e tendências simultaneamente

* * *

## 🔹 Botões e Navegação

Tipos de botões: - Navegação entre páginas  
\- Bookmarks  
\- Reset filters  
\- Tooltip triggers

* * *

## 🔹 Bookmarks

Permitem salvar estados do relatório:

*   Filtros
*   Seleções
*   Visuais visíveis
*   Navegação

* * *

## 🔹 Tooltips Personalizados

Podem conter: - KPIs  
\- Gráficos pequenos  
\- Resumos de comparação

* * *

## 🔹 Small Multiples

Mostram gráficos repetidos por categoria.

Exemplo: - Vendas por estado  
\- Desempenho por produto

* * *

## 🔹 Decomposition Tree

Usado para: - Identificar causas  
\- Explorar drivers de métricas  
\- Análise explicativa

* * *

## 📚 Links Oficiais

*   Visualization types:  
    https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-types