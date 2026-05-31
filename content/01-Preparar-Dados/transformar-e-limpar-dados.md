  transformar-e-limpar-dados body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; } .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } pre { background-color: #eee; padding: 10px; border-radius: 5px; overflow-x: auto; } code { font-family: "Courier New", Courier, monospace; background-color: #eee; padding: 2px 4px; border-radius: 3px; } img { max-width: 100%; height: auto; display: block; margin: 10px 0; } table { width: 100%; border-collapse: collapse; margin-bottom: 1em; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }

# 🔧 Transformar e Limpar Dados com Power Query

Este módulo aborda a etapa de **transformação**, fundamental para garantir qualidade, consistência e estrutura do dataset.

* * *

## 🔹 Categorias de Transformações

### ✔ Estrutura

*   Remover linhas
*   Remover colunas
*   Dividir colunas
*   Transpor dados
*   Agrupar por

### ✔ Qualidade

*   Remover duplicatas
*   Detectar e corrigir erros
*   Substituir valores
*   Preencher valores

### ✔ Tipos de dados

*   Conversão para inteiro, decimal, data, texto
*   Detecção automática x manual

* * *

## 🔹 Ferramentas importantes

### **Column Profile**

Exibe estatísticas detalhadas: - Valores distintos  
\- Valores vazios  
\- Mínimo/máximo  
\- Distribuição

### **Column Quality**

Mostra: - Porcentagem válida  
\- Erros  
\- Valores vazios

### **Column Distribution**

Histograma por coluna

* * *

## 🔹 Mesclar Tabelas (JOIN)

Power Query suporta:

*   Left Outer (mais comum)
*   Right Outer
*   Inner
*   Full Outer
*   Anti Joins

Aplicações típicas: - Unir tabelas fato e dimensão  
\- Acrescentar parâmetros externos  
\- Substituir _VLOOKUP_ do Excel

* * *

## 🔹 Anexar Tabelas (APPEND)

Usado para empilhar tabelas com **mesma estrutura**, como:

*   Múltiplos arquivos CSV de meses diferentes
*   Logs diários
*   Exportações de sistemas

* * *

## 🔹 Query Folding

Folding é quando o Power Query **empurra transformações para a fonte de dados**.

Transformações que geralmente mantêm folding:

*   Filtrar linhas
*   Selecionar colunas
*   Agrupar
*   Join
*   Alterar tipos

Transformações que quebram folding:

*   Colunas personalizadas complexas
*   Passos que exigem processamento local

* * *

## 📚 Links Oficiais

*   Power Query transformations:  
    https://learn.microsoft.com/power-query/transformation-section

* * *