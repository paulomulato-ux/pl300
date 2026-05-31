  design-modelo-de-dados body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; } .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } pre { background-color: #eee; padding: 10px; border-radius: 5px; overflow-x: auto; } code { font-family: "Courier New", Courier, monospace; background-color: #eee; padding: 2px 4px; border-radius: 3px; } img { max-width: 100%; height: auto; display: block; margin: 10px 0; } table { width: 100%; border-collapse: collapse; margin-bottom: 1em; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }

# 🏗️ Design de Modelo de Dados

Este módulo aprofunda conceitos de **modelagem dimensional**, essenciais para o desempenho e clareza do modelo no Power BI.

* * *

## 🔹 Modelo Estrela (Star Schema)

A estrutura recomendada pela Microsoft para BI:

*   **Tabela Fato** → transações, valores numéricos, chaves estrangeiras
*   **Tabelas Dimensão** → contexto, atributos, categorias
*   **Relacionamentos 1:\* (um para muitos)**

Benefícios:

*   Melhor compressão de dados
*   Menor complexidade
*   Melhor desempenho em DAX
*   Melhor uso de agregações

* * *

## 🔹 Tabela Fato – características

*   Alta granularidade
*   Muitas linhas
*   Poucas colunas
*   Colunas numéricas e chaves

Exemplos:

*   Fato Vendas
*   Fato Estoque
*   Fato Transações

* * *

## 🔹 Tabelas Dimensão – características

*   Muitas colunas
*   Poucas linhas
*   Atributos descritivos
*   Hierarquias (Ano > Mês > Dia, Região > Estado > Cidade)

* * *

## 🔹 Tipos de Cardinalidade

Tipo

Uso

**1:\* (um para muitos)**

padrão ideal

**\*:1 (muitos para um)**

equivalente ao 1:\* invertido

**_:_ (muitos para muitos)**

apenas quando necessário

* * *

## 🔹 Direção de Filtro

Direção

Descrição

**Single**

ideal, mais eficiente

**Both**

usar com cautela, pode causar loops

* * *

## 🔹 Relacionamentos Ativos e Inativos

*   **Ativo** → usado por padrão
*   **Inativo** → habilitado via `USERELATIONSHIP()`

Exemplo:

    Vendas Ano Fiscal =
    CALCULATE(
        [Total Vendas],
        USERELATIONSHIP(DimCalendario[AnoFiscal], FatoVendas[Data])
    )
    

* * *

## 🔹 Tabelas de Datas

Requisitos:

*   Coluna contínua (sem buracos)
*   Sem horários
*   Cobrir todo o intervalo do dataset
*   Marcar como **Date Table**

* * *

## 📚 Links Oficiais

*   Star Schema: https://learn.microsoft.com/power-bi/guidance/star-schema
*   Relationships: https://learn.microsoft.com/power-bi/transform-model/desktop-relationships