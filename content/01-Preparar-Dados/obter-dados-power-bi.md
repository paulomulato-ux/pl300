  obter-dados-power-bi body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; } .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } pre { background-color: #eee; padding: 10px; border-radius: 5px; overflow-x: auto; } code { font-family: "Courier New", Courier, monospace; background-color: #eee; padding: 2px 4px; border-radius: 3px; } img { max-width: 100%; height: auto; display: block; margin: 10px 0; } table { width: 100%; border-collapse: collapse; margin-bottom: 1em; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }

# 📘 Obter Dados no Power BI

Este arquivo reúne o conteúdo essencial sobre **conexão e importação de dados**, conforme os requisitos da certificação PL-300.

* * *

## 🔹 Tipos de Conexão

### **1\. Arquivos**

*   Excel (.xlsx)
*   CSV/TXT
*   JSON
*   XML
*   Parquet

### **2\. Bancos de Dados**

*   SQL Server
*   Oracle
*   PostgreSQL
*   MySQL
*   Azure SQL
*   Fabric Lakehouse / Warehouse

### **3\. Serviços Online**

*   SharePoint
*   OneDrive
*   OData Feed
*   Microsoft Exchange
*   Dynamics 365
*   Dataverse

### **4\. Outros**

*   Web scraping (Get data > Web)
*   APIs REST
*   Pastas ("Folder") para ingestão em lote

* * *

## 🔹 Import x DirectQuery x Live Connection

Método

Características

Quando usar

**Import**

Dados ficam no modelo

Melhor desempenho; datasets pequenos/médios

**DirectQuery**

Dados permanecem na fonte

Dados muito grandes ou quase em tempo real

**Live Connection**

Conexão com SSAS, Fabric ou Power BI semantic model

Modelos centralizados, governança

* * *

## 🔹 Conectando a pastas (Folder)

Recurso útil para carregar múltiplos arquivos com a mesma estrutura. Passos:

1.  Get Data → Folder
2.  **Combine & Transform**
3.  Aplicar filtros sobre metadados se necessário
4.  Limpar e padronizar colunas

* * *

## 🔹 Conexão com Web/API

No Power BI Desktop:

1.  Get Data → Web
2.  Informar URL
3.  Lidar com autenticação (Anonymous, Basic, OAuth)
4.  Converter JSON → tabelas

* * *

## 🔹 Boas Práticas ao Obter Dados

*   Sempre revisar tipos de dados
*   Evitar colunas desnecessárias
*   Centralizar parâmetros (URL, pastas, datas, tokens)
*   Utilizar _Query folding_ sempre que possível
*   Documentar transformações importantes

* * *

## 📚 Links Oficiais

*   Supported data sources:  
    https://learn.microsoft.com/power-bi/connect-data/desktop-data-sources
*   DirectQuery:  
    https://learn.microsoft.com/power-bi/connect-data/desktop-directquery-about

* * *