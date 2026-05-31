  seguranca-RLS body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; } .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } pre { background-color: #eee; padding: 10px; border-radius: 5px; overflow-x: auto; } code { font-family: "Courier New", Courier, monospace; background-color: #eee; padding: 2px 4px; border-radius: 3px; } img { max-width: 100%; height: auto; display: block; margin: 10px 0; } table { width: 100%; border-collapse: collapse; margin-bottom: 1em; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }

# 🔐 Segurança em Nível de Linha (RLS)

Row-Level Security (RLS) permite que diferentes usuários vejam apenas os dados autorizados, com base em filtros definidos diretamente no modelo semântico do Power BI.

* * *

## 🔹 Tipos de RLS

### ✔ Estática

Os filtros são fixos dentro da função criada no modelo.

Exemplo:

    DimRegiao[Estado] = "SP"
    

### ✔ Dinâmica

Os filtros dependem do usuário conectado, usando funções como `USERPRINCIPALNAME()`.

Exemplo:

    DimVendedor[Email] = USERPRINCIPALNAME()
    

* * *

## 🔹 Como Criar Funções de Segurança

1.  No Power BI Desktop, vá em **Modeling → Manage Roles**
2.  Clique em **Create**
3.  Defina o nome da função (ex.: "Vendedores\_SP")
4.  Aplique o filtro DAX na tabela correspondente

Exemplo de regra:

    FatoVendas[Estado] = "SP"
    

* * *

## 🔹 RLS Dinâmico – Exemplo Completo

Imagine uma dimensão de vendedores:

Vendedor

Email

Região

João

joao@empresa.com

Sul

Maria

maria@empresa.com

Norte

Regra dinâmica:

    DimVendedor[Email] = USERPRINCIPALNAME()
    

O Power BI fará automaticamente o filtro para o usuário conectado no serviço.

* * *

## 🔹 Testar RLS no Power BI Desktop

1.  Vá em **Modeling → View As**
2.  Escolha a função a ser testada
3.  Verifique se o relatório mostra os dados esperados

Isso evita erros antes da publicação.

* * *

## 🔹 Configuração no Power BI Service

Após publicar o dataset:

1.  Acesse o workspace
2.  Vá em **Datasets → Security**
3.  Escolha a função criada
4.  Adicione usuários ou grupos correspondentes

Lembre-se:

*   **RLS não funciona no “Meu Workspace”**
*   Para apps corporativos, recomenda-se workspaces dedicados e governança ativa

* * *

## 🔹 Recomendações Importantes

*   Armazene usuários em uma tabela de dimensão quando usar RLS dinâmico
*   Evite relacionamentos bidirecionais
*   Certifique-se de que a coluna usada no filtro está corretamente relacionada às tabelas fato
*   Teste sempre antes de publicar
*   Combine RLS com governança e sensibilidade de dados

* * *

## 📚 Links Oficiais

*   Documentação RLS:  
    https://learn.microsoft.com/power-bi/enterprise/service-admin-row-level-security