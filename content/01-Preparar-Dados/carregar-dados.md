  carregar-dados body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; } .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } pre { background-color: #eee; padding: 10px; border-radius: 5px; overflow-x: auto; } code { font-family: "Courier New", Courier, monospace; background-color: #eee; padding: 2px 4px; border-radius: 3px; } img { max-width: 100%; height: auto; display: block; margin: 10px 0; } table { width: 100%; border-collapse: collapse; margin-bottom: 1em; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }

# 📥 Carregar Dados no Power BI

Depois de conectar e transformar os dados no Power Query, o próximo passo é **carregar os dados no modelo**.

* * *

## 🔹 Métodos de Carga

Método

Descrição

Uso Ideal

**Import**

Dados são carregados no modelo

Melhor performance

**DirectQuery**

Consulta sempre a fonte

Dados grandes ou atualizados frequentemente

**Dual**

Pode atuar como Import ou DirectQuery

Modelos compostos

* * *

## 🔹 Atualização de Dados

### **Refresh Manual**

Via Power BI Desktop ou serviço.

### **Agendamento de Atualização**

*   Requer gateway se fonte estiver on-premises
*   Necessário Premium para frequências maiores

* * *

## 🔹 Incremental Refresh

Ideal para grandes volumes de dados. Permite:

*   Atualizar apenas partições recentes
*   Reduzir tempo de atualização
*   Otimizar armazenamento

Pré-requisitos:

*   Parâmetros RangeStart / RangeEnd
*   Filtro na data de fato
*   Dataset publicado em workspace Pro ou Premium

* * *

## 🔹 Boas Práticas de Carga

*   Remover colunas inúteis antes de carregar
*   Evitar tipos de dados textuais pesados
*   Conferir cardinalidade das colunas
*   Revisar dependências de consultas
*   Evitar colunas calculadas no modelo quando possível

* * *

## 📚 Links Oficiais

*   Incremental refresh:  
    https://learn.microsoft.com/power-bi/connect-data/incremental-refresh-overview

* * *