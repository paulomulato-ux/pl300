  resumo body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; } .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } pre { background-color: #eee; padding: 10px; border-radius: 5px; overflow-x: auto; } code { font-family: "Courier New", Courier, monospace; background-color: #eee; padding: 2px 4px; border-radius: 3px; } img { max-width: 100%; height: auto; display: block; margin: 10px 0; } table { width: 100%; border-collapse: collapse; margin-bottom: 1em; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }

# 🧩 Resumo – Modelar Dados

Este módulo aborda os princípios essenciais de **modelagem dimensional**, relações entre tabelas, DAX, desempenho e estruturação de modelos eficientes no Power BI.

* * *

## 🎯 Objetivos do módulo

*   Construir modelos eficientes baseados em **tabelas fato e dimensões**
*   Configurar relacionamentos e cardinalidades
*   Criar medidas com DAX
*   Implementar hierarquias
*   Controlar direcionalidade de filtros
*   Otimizar desempenho do modelo

* * *

## 🔹 Tópicos Principais

### 1\. Modelo Estrela (Star Schema)

Estrutura padrão recomendada pela Microsoft:

*   Tabelas fato → métricas, granularidade definida
*   Tabelas dimensão → atributos descritivos
*   Minimiza duplicidades, melhora performance e compressão

* * *

### 2\. Relacionamentos

Propriedades:

*   Cardinalidade: 1:_,_ :1, _:_
*   Direcionalidade: single vs. both
*   Cross-filtering
*   Relacionamentos ativos e inativos (USERELATIONSHIP)

* * *

### 3\. DAX – medidas e cálculos

Tipos comuns:

*   Medidas implícitas vs. explícitas
*   Funções de agregação
*   Time intelligence
*   Contextos: linha, filtro e avaliação

* * *

### 4\. Otimização de Modelos

Inclui:

*   Remoção de colunas irrelevantes
*   Minimização de cardinalidade
*   Redução de relacionamentos desnecessários
*   Gerenciamento de tabelas intermediárias
*   Uso correto de data table

* * *

## 📚 Links Oficiais

*   Data modeling best practices  
    https://learn.microsoft.com/power-bi/guidance/star-schema
*   Relationships in Power BI  
    https://learn.microsoft.com/power-bi/transform-model/desktop-relationships

* * *

## ✅ Checklist de Estudos

*   \[ \] Criar um modelo estrela com fato e dimensões
*   \[ \] Configurar relacionamentos corretamente
*   \[ \] Criar medidas básicas e avançadas em DAX
*   \[ \] Utilizar funções de time intelligence
*   \[ \] Reduzir cardinalidade de colunas pesadas