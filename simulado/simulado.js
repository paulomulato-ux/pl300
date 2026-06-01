// ============================================================
//  PL-300 SIMULADO — JavaScript completo
//  120 questões | 4 domínios | Modo Treino + Simulado Oficial
// ============================================================

// ============================================================
//  BANCO DE QUESTÕES
// ============================================================

/**
 * Normaliza a questão para o formato bilíngue
 */
function getQText(q) {
    const lang = localStorage.getItem('pl300_lang') || 'pt';
    
    // Se já for bilíngue
    if (q.question_pt) {
        return {
            question: lang === 'pt' ? q.question_pt : q.question_en,
            options: lang === 'pt' ? q.options_pt : q.options_en,
            explanation: lang === 'pt' ? q.explanation_pt : q.explanation_en,
            answer: q.answer
        };
    }
    
    // Se for legado PT
    if (q.pergunta) {
        return {
            question: q.pergunta,
            options: q.opcoes,
            explanation: q.explicacao,
            answer: q.correta
        };
    }
    
    // Se for moderno EN
    return {
        question: q.question,
        options: q.options,
        explanation: q.explanation,
        answer: q.answer
    };
}

const questionBank = {
  "Preparar Dados": [
    {
      "pergunta": "Um conector traz emails do último ano (mais de 10 milhões). Análise é sobre redes internas (De quem, Para quem). Você deve impedir leitura dos textos dos emails e reduzir modelo. Como?",
      "opcoes": [
        "Implementar Row-Level Security (RLS) baseada no remetente.",
        "Remover as colunas Subject e Body durante a importação (no Power Query).",
        "Ocultar (Hide) as colunas Subject e Body na visualização do modelo.",
        "Mascarar os textos dos e-mails usando DAX."
      ],
      "correta": 1,
      "explicacao": "Remover as colunas na etapa de transformação (Power Query) impede permanentemente o acesso aos textos (segurança) e evita armazenar dados de texto longos, o que reduz radicalmente o tamanho (10M * colunas de texto livres gastam muita memória)."
    },
    {
      "pergunta": "Modelo de 950 MB, 5 milhões de linhas de vendas dos últimos 5 anos. Requisito: analisar apenas vendas ativas do ano ATUAL e do ano ANTERIOR. O que você deve fazer para reduzir o modelo?",
      "opcoes": [
        "Remover a coluna de Status do Produto.",
        "Remover linhas de produtos inativos.",
        "Remover as linhas referentes a vendas que ocorreram há mais de dois anos.",
        "Ocultar as colunas não usadas na exibição de relatório."
      ],
      "correta": 2,
      "explicacao": "Se o requisito comercial pede apenas vendas do ano atual e do anterior, manter vendas de 5 anos é um desperdício de memória. Filtrar no Power Query para descartar as linhas velhas minimiza muito o modelo."
    },
    {
      "pergunta": "Você tem um dataset de 1 milhão de linhas com uma coluna DateTime. Como reduzir o tamanho do modelo de dados sem perder dados?",
      "opcoes": [
        "Arredondar a hora para o início da hora.",
        "Mudar o tipo de dado para Texto.",
        "Cortar (Trim) a coluna de data.",
        "Dividir a coluna DateTime em duas colunas: uma de Data e outra de Tempo (Hora)."
      ],
      "correta": 3,
      "explicacao": "Dividir DateTime em duas colunas reduz drasticamente a cardinalidade. Uma coluna DateTime tem milhares de valores únicos (um para cada segundo do ano). Uma coluna de Data terá 365 valores únicos, e a de tempo 86.400 valores."
    },
    {
      "pergunta": "Além do próprio Power BI, onde é o melhor lugar para realizar otimização de desempenho?",
      "opcoes": [
        "Na fonte de dados (At the data source)",
        "No serviço Power BI",
        "No Microsoft SharePoint",
        "No gateway de dados local"
      ],
      "correta": 0,
      "explicacao": "Filtrar, transformar e agregar dados na própria fonte (ex: criando Views no SQL Server ou executando transformações no banco) tira a carga do Power BI e do Power Query (Query Folding)."
    },
    {
      "pergunta": "Qual o benefício de analisar metadados (metadata) no Power Query?",
      "opcoes": [
        "Saber o número de linhas e colunas carregadas.",
        "Identificar claramente inconsistências de dados em seu conjunto de dados.",
        "Reduzir o tamanho do arquivo PBIX.",
        "Criar relações automaticamente."
      ],
      "correta": 1,
      "explicacao": "A análise de metadados no Power Query (ex: Qualidade da coluna, Distribuição de coluna, Perfil de coluna) ajuda a identificar valores nulos, erros e anomalias rapidamente antes de carregar o modelo."
    },
    {
      "pergunta": "Você tem uma API que retorna mais de 100 colunas e precisa remover todas as colunas com sufixo 'sourceid'. Qual combinação de funções M você usaria para completar esse código Power Query?",
      "opcoes": [
        "Table.RemoveColumns, List.Select e Text.EndsWith",
        "Table.SelectColumns, List.Filter e Text.StartsWith",
        "Table.DeleteColumns, List.Contains e Text.Contains",
        "Table.TransformColumns, List.Generate e Text.Replace"
      ],
      "correta": 0,
      "explicacao": "Para remover colunas com base em um padrão de sufixo no Power Query M: Table.RemoveColumns remove as colunas, List.Select filtra a lista de colunas para encontrar as que atendem ao critério, e Text.EndsWith verifica se o nome da coluna termina com o sufixo desejado."
    },
    {
      "pergunta": "Você está mesclando as consultas Orders e Order Details no Editor do Power Query. Devido a problemas de qualidade de dados, algumas linhas da consulta Orders NÃO têm uma linha correspondente na consulta Order Details. Você precisa garantir que todas as linhas da consulta Orders sejam exibidas. Qual tipo de junção deve usar?",
      "opcoes": [
        "Externa Completa (Full Outer)",
        "Interna (Inner)",
        "Externa Esquerda (Left Outer)",
        "Anti Direita (Right Anti)"
      ],
      "correta": 2,
      "explicacao": "Left Outer (Externa Esquerda) retorna TODAS as linhas da tabela da esquerda (Orders) e apenas as linhas correspondentes da tabela da direita (Order Details). Linhas de Orders sem correspondência em Order Details aparecem com valores nulos. Inner Join excluiria as linhas sem correspondência."
    },
    {
      "pergunta": "Você visualiza uma consulta no Editor do Power Query. Nota que a Coluna A contém valores em branco (blank) e valores nulos (null). Você precisa converter todos os valores em branco para null. Qual opção deve selecionar na Coluna A?",
      "opcoes": [
        "Limpar (Clean)",
        "Preencher Abaixo (Fill Down)",
        "Substituir Erros (Replace Errors)",
        "Substituir Valores (Replace Values)"
      ],
      "correta": 3,
      "explicacao": "Substituir Valores (Replace Values) permite especificar um valor de origem (em branco/string vazia) e um valor de destino (null). Esta é a única opção que permite converter especificamente valores em branco para null sem afetar outros dados."
    },
    {
      "pergunta": "Você está usando o Editor do Power Query para importar um arquivo Excel onde os dados começam com nomes de colunas na linha 5 da planilha. Há valores em branco ocasionais na coluna A. Você precisa remover as linhas em branco do topo e usar a 5ª linha como cabeçalhos. O que deve fazer PRIMEIRO?",
      "opcoes": [
        "Remover valores vazios da primeira coluna",
        "Remover as 4 primeiras linhas",
        "Usar os cabeçalhos atuais como primeira linha",
        "Usar a primeira linha como cabeçalhos"
      ],
      "correta": 1,
      "explicacao": "A ordem correta é: primeiro remover as 4 linhas superiores (que não contêm dados), depois usar a primeira linha como cabeçalhos. Se você usasse 'Remover valores vazios' primeiro, poderia remover linhas de dados legítimas que têm valores em branco na coluna A."
    },
    {
      "pergunta": "Você tem um modelo Power BI com dados de sensores de 500 sensores que retornam leituras de temperatura a cada minuto. Os relatórios precisam calcular a temperatura média por sensor a cada hora e NÃO mostram os dados brutos por minuto. Você precisa reduzir o tamanho do modelo para melhorar o desempenho. O que deve fazer?",
      "opcoes": [
        "Criar visuais que agrupem os dados por hora",
        "Usar o Power Query para agrupar os dados do sensor por hora",
        "Adicionar um filtro de relatório para a coluna Hora",
        "Remover as linhas que contêm leituras"
      ],
      "correta": 1,
      "explicacao": "Agrupar os dados por hora no Power Query reduz drasticamente o número de linhas do modelo (de 1 leitura/minuto para 1 leitura/hora = 60x menos dados). Isso melhora o desempenho pois os dados já chegam agregados ao modelo, sem precisar processar os dados brutos durante a visualização."
    },
    {
      "pergunta": "Você tem duas consultas: Query1 recupera a tabela SMB_Customers de um SQL Server e Query2 recupera Enterprise_Customers de um Oracle Server. Ambas as tabelas têm as mesmas colunas. Você precisa combinar os dados. Qual comando deve usar?",
      "opcoes": [
        "Combinar Arquivos",
        "Mesclar Consultas",
        "Mesclar Colunas",
        "Acrescentar Consultas"
      ],
      "correta": 3,
      "explicacao": "Acrescentar Consultas (Append) é usado para combinar tabelas com a mesma estrutura de colunas verticalmente (empilhando linhas). Mesclar Consultas é como um JOIN, combinando colunas horizontalmente. Como ambas as tabelas têm as mesmas colunas e queremos unir os clientes, Acrescentar é a escolha correta."
    },
    {
      "pergunta": "Você planeja usar o Power BI Desktop para importar 100 arquivos CSV de diferentes lojas, todos com a mesma estrutura, armazenados em um compartilhamento de rede. Você precisa importá-los em uma única tabela com o mínimo de esforço administrativo. O que deve fazer?",
      "opcoes": [
        "Adicionar uma fonte de dados de Pasta e usar o comando Combinar Arquivos",
        "Adicionar uma fonte de dados de Pasta e usar o comando Mesclar Consultas",
        "Adicionar uma fonte de dados do Excel e usar o comando Mesclar Consultas",
        "Adicionar fontes de dados texto/CSV individuais e usar o comando Acrescentar Consultas"
      ],
      "correta": 0,
      "explicacao": "Adicionar uma fonte de dados de Pasta e usar 'Combinar Arquivos' é a forma mais eficiente de consolidar múltiplos arquivos com a mesma estrutura. O Power Query cria automaticamente uma função de combinação que processa todos os arquivos na pasta."
    },
    {
      "pergunta": "Você tem um cubo SSAS com dados históricos. A consulta retorna 25.499 registros, mas o data warehouse de origem tem 26.423 registros. Você precisa garantir que a consulta retorne todos os registros. O que deve fazer?",
      "opcoes": [
        "No Editor de Consultas, atualizar todos os dados",
        "Mudar a consulta para modo de conexão dinâmica (Live Connection)",
        "Excluir a etapa Remover Duplicatas",
        "Adicionar uma etapa Desdinamizar Colunas"
      ],
      "correta": 2,
      "explicacao": "A diferença entre 25.499 e 26.423 indica que uma etapa 'Remover Duplicatas' foi aplicada incorretamente. Como os registros de fatos (como rastreamento de pedidos) podem ter valores repetidos em colunas individuais, remover 'duplicatas' com base em uma única coluna exclui registros legítimos."
    },
    {
      "pergunta": "Você está importando dados de vendas de um arquivo Excel. Ao criar um gráfico de barras, as regiões aparecem corretamente, mas o valor de vendas exibe a contagem em vez da soma. Como você deve modificar a consulta para garantir que os dados apareçam corretamente?",
      "opcoes": [
        "Excluir a consulta, importar os dados para o SQL Server e depois reimportar",
        "No Editor de Consultas, adicionar uma coluna calculada que totaliza a coluna de valor de vendas",
        "Alterar o tipo de dados da coluna de valor de vendas para Numérico",
        "Atualizar o modelo de dados"
      ],
      "correta": 2,
      "explicacao": "Quando o Power BI exibe contagem em vez de soma, geralmente significa que a coluna foi importada como texto em vez de número. Alterar o tipo de dados para Numérico (Decimal ou Número Inteiro) resolve o problema, permitindo que o DAX agregue corretamente."
    },
    {
      "pergunta": "Você importa uma tabela no Power BI Desktop. Precisa configurar a tabela para extrair apenas o texto após um delimitador em uma coluna. O que deve fazer?",
      "opcoes": [
        "No menu Formato, clicar em Aparar",
        "No menu Extrair, clicar em Últimos caracteres",
        "No menu Dividir Coluna, clicar em Por Delimitador",
        "No menu Extrair, clicar em Texto Após Delimitador"
      ],
      "correta": 3,
      "explicacao": "A opção 'Texto Após Delimitador' no menu Extrair permite extrair apenas o texto que aparece após um caractere delimitador específico em uma coluna, mantendo a coluna em uma única coluna resultante."
    },
    {
      "pergunta": "Você tem uma consulta de um banco de dados SQL Azure. Descobre que a coluna 'ErrorCode' tem valores com espaço no início e a coluna 'SubStatus' contém caracteres não imprimíveis. Você precisa remover os espaços iniciais de ErrorCode e os caracteres não imprimíveis de SubStatus. O que deve fazer em cada coluna?",
      "opcoes": [
        "Trim e Clean",
        "Substituir valores e Limpar",
        "Extrair e Formatar",
        "Dividir coluna e Aparar"
      ],
      "correta": 0,
      "explicacao": "Trim remove espaços iniciais e finais de uma coluna de texto. Clean remove caracteres não imprimíveis. Ambas as funções estão disponíveis na guia Transformar > Formato do Power Query Editor."
    },
    {
      "pergunta": "Durante o processo de QA dos dados, você percebe que há valores nulos na coluna 'Return type' (Returned, No return e null). Após conversar com seu gerente, você decide substituir os valores nulos por 'No return'. Qual ação você deve executar?",
      "opcoes": [
        "Selecionar a coluna Return type > Transformar > Substituir valores",
        "Selecionar a coluna Return type > Transformar > Preencher abaixo",
        "Selecionar a coluna Return type > Adicionar coluna > Coluna por exemplos",
        "Selecionar a coluna Return type > Início > Remover linhas"
      ],
      "correta": 0,
      "explicacao": "Para substituir valores nulos por um valor específico, use Transformar > Substituir valores. Isso permite definir exatamente qual valor deve substituir os nulos, mantendo todos os outros dados intactos."
    },
    {
      "pergunta": "Quais dois blocos formam o código M que executa sua consulta no Power Query?",
      "opcoes": [
        "do e while",
        "if e then",
        "for e each",
        "let e in"
      ],
      "correta": 3,
      "explicacao": "O código M de uma consulta consiste em dois blocos: 'let' (onde todas as variáveis e etapas são definidas) e 'in' (que especifica a saída final da consulta). Você pode ver isso no Editor Avançado."
    },
    {
      "pergunta": "O que acontece internamente cada vez que você aplica uma transformação no Power Query?",
      "opcoes": [
        "A mesma transformação é aplicada aos dados de origem",
        "As alterações são permanentes e não podem ser modificadas",
        "O Editor de Consultas escreve o código DAX correspondente para a etapa aplicada",
        "O Editor de Consultas escreve o código M correspondente para a etapa aplicada"
      ],
      "correta": 3,
      "explicacao": "Data Mashup, ou código M, é a linguagem de fórmula que impulsiona o Power Query. Sempre que você usa as ferramentas de UI para aplicar uma transformação, o código M correspondente é gerado automaticamente."
    },
    {
      "pergunta": "Qual operação do Power Query adiciona linhas a uma tabela existente combinando tabelas com a mesma estrutura de colunas?",
      "opcoes": [
        "Agrupar por",
        "Dinamizar",
        "Mesclar consultas",
        "Acrescentar consultas"
      ],
      "correta": 3,
      "explicacao": "Acrescentar consultas (Append queries) combina tabelas que compartilham exatamente a mesma estrutura de colunas e tipos de dados, adicionando as linhas de uma tabela ao final da outra."
    },
    {
      "pergunta": "Você tem dados de vendas anuais por departamento onde cada ano tem sua própria coluna. Qual ferramenta do Power Query converte as múltiplas colunas 'Ano' em linhas?",
      "opcoes": [
        "Dinamizar (Pivot)",
        "Desdinamizar (Unpivot)",
        "Transpor",
        "Agrupar por"
      ],
      "correta": 1,
      "explicacao": "Desdinamizar (Unpivot) converte colunas em linhas. No exemplo dado, as colunas de ano seriam convertidas em valores de linha, criando uma estrutura mais adequada para análise no Power BI."
    },
    {
      "pergunta": "Qual ferramenta do Power Query você usaria para consolidar dados diários de transações em transações mensais?",
      "opcoes": [
        "Mesclar consultas",
        "Acrescentar consultas",
        "Agrupar por (Group By)",
        "Dinamizar colunas (Pivot Columns)"
      ],
      "correta": 2,
      "explicacao": "Agrupar por (Group By) permite agregar dados em um nível diferente de granularidade, como consolidar dados diários em mensais. Você pode especificar a coluna de agrupamento (mês) e a agregação (soma, média, etc.)."
    },
    {
      "pergunta": "Qual ferramenta do Power Query você usaria quando sabe o resultado desejado de uma coluna, mas não sabe quais transformações usar?",
      "opcoes": [
        "Coluna por exemplos",
        "Coluna condicional",
        "Coluna personalizada",
        "Coluna de índice"
      ],
      "correta": 0,
      "explicacao": "Coluna por exemplos permite adicionar novas colunas fornecendo apenas um valor de exemplo do resultado desejado. O Power Query infere automaticamente as transformações necessárias para gerar esse resultado."
    },
    {
      "pergunta": "O que pode ser útil para criar IDs únicos e formar relacionamentos entre tabelas no Power Query?",
      "opcoes": [
        "Adicionar uma coluna por exemplos",
        "Agrupar dados",
        "Adicionar uma coluna de índice",
        "Acrescentar consultas"
      ],
      "correta": 2,
      "explicacao": "Colunas de índice contêm uma lista de valores sequenciais que podem identificar cada linha única em uma tabela, sendo frequentemente usadas para criar IDs únicos e formar relacionamentos entre tabelas."
    },
    {
      "pergunta": "Quando você usaria uma ferramenta da guia Transformar em vez da guia Adicionar Coluna no Power Query?",
      "opcoes": [
        "Quando você deseja sobrescrever os valores das colunas existentes",
        "Quando você deseja manter os valores das colunas existentes",
        "Quando você deseja criar novas colunas",
        "Quando você quer adicionar uma coluna de índice"
      ],
      "correta": 0,
      "explicacao": "A guia Transformar modifica os valores da coluna existente (sobrescreve), enquanto a guia Adicionar Coluna cria uma nova coluna mantendo a original intacta. Use Transformar quando quiser modificar os dados da coluna atual."
    },
    {
      "pergunta": "Qual ferramenta de perfil de dados fornece estatísticas detalhadas de coluna e distribuição de valores para uma coluna selecionada?",
      "opcoes": [
        "Qualidade da coluna",
        "Distribuição da coluna",
        "Perfil da coluna",
        "Estatísticas da coluna"
      ],
      "correta": 2,
      "explicacao": "O Perfil da coluna fornece uma visão mais holística dos dados de uma coluna selecionada, incluindo distribuição de amostra dos dados e estatísticas de coluna como min, max, média, contagem de valores distintos e únicos."
    },
    {
      "pergunta": "Qual é o propósito do perfil de dados (data profiling) no Power Query?",
      "opcoes": [
        "Fornecer uma forma visual de explorar dados",
        "Ter uma ideia da composição do dataset",
        "Resolver problemas de qualidade de dados nas colunas",
        "Todas as opções acima"
      ],
      "correta": 3,
      "explicacao": "O perfil de dados no Power Query serve para tudo isso: explorar visualmente os dados, entender a composição do dataset (tipos de dados, distribuição) e identificar e resolver problemas de qualidade como erros, nulos e inconsistências."
    },
    {
      "pergunta": "Qual ferramenta de perfil de dados pode ser usada para verificar o número de erros em uma coluna no Power Query?",
      "opcoes": [
        "Qualidade da coluna",
        "Distribuição da coluna",
        "Perfil da coluna",
        "Qualidade da coluna e Perfil da coluna"
      ],
      "correta": 3,
      "explicacao": "Tanto a Qualidade da coluna (que mostra a porcentagem de erros) quanto o Perfil da coluna (que fornece estatísticas detalhadas incluindo contagem de erros) podem ser usadas para verificar erros em uma coluna."
    },
    {
      "pergunta": "Quais ferramentas de perfil de dados o Power Query possui?",
      "opcoes": [
        "Coluna por exemplos, coluna personalizada e coluna condicional",
        "Qualidade da coluna, Distribuição da coluna e Perfil da coluna",
        "Coluna de índice e duplicar coluna",
        "Formato, extrair e analisar"
      ],
      "correta": 1,
      "explicacao": "A guia EXIBIÇÃO do Power Query inclui ferramentas de perfil de dados: Qualidade da coluna (mostra % de válidos, erros e vazios), Distribuição da coluna (mostra distribuição dos valores) e Perfil da coluna (estatísticas detalhadas)."
    },
    {
      "pergunta": "Você tem um site SharePoint Online com várias bibliotecas de documentos. Uma delas contém relatórios de fabricação salvos como arquivos Excel com a mesma estrutura. Você precisa carregar apenas esses relatórios em uma tabela no Power BI Desktop. O que você deve fazer?",
      "opcoes": [
        "Obter dados de uma Pasta do SharePoint Online, inserir a URL do site e selecionar Combinar e Carregar",
        "Obter dados de uma Lista do SharePoint Online e inserir a URL do site. Selecionar Combinar e Transformar e filtrar pelo caminho da biblioteca",
        "Obter dados de uma Pasta do SharePoint Online, inserir a URL do site, selecionar Combinar e Transformar e filtrar pelo caminho da biblioteca de relatórios de fabricação",
        "Obter dados de uma Lista do SharePoint Online, inserir a URL e selecionar Combinar e Carregar"
      ],
      "correta": 2,
      "explicacao": "Para carregar apenas arquivos de uma biblioteca específica: use 'Pasta do SharePoint Online' (não Lista), selecione 'Combinar e Transformar' (não Carregar direto) para poder filtrar pelo caminho da pasta desejada antes de carregar."
    },
    {
      "pergunta": "Você tem um arquivo CSV com uma coluna de data no formato '2018-12-31 at 08:59'. Você precisa analisar as reclamações por data e usar uma hierarquia de data integrada. O que você deve fazer?",
      "opcoes": [
        "Alterar o tipo de dados da coluna para Data",
        "Aplicar a função Analisar (Parse) das transformações de Data à coluna",
        "Criar uma coluna por exemplo que começa com 2018-12-31 e definir o tipo de dados da nova coluna como Data",
        "Aplicar uma transformação para extrair os primeiros 11 caracteres da coluna"
      ],
      "correta": 2,
      "explicacao": "Como o formato inclui texto 'at', você precisa criar uma coluna por exemplo para extrair apenas a data, e depois definir o tipo como Data para habilitar a hierarquia de data integrada do Power BI."
    },
    {
      "pergunta": "Você tem uma lista de clientes em potencial com 1.500 linhas. Você precisa garantir que a lista contém registros para cada Estado/Região. Quais duas ações você deve realizar no Editor do Power Query?",
      "opcoes": [
        "Abrir o Editor Avançado e selecionar Qualidade da coluna",
        "Habilitar perfil de coluna baseado no conjunto de dados completo e selecionar Perfil de coluna",
        "Selecionar Distribuição da coluna e Qualidade da coluna",
        "Filtrar por Estado/Região e exportar para Excel"
      ],
      "correta": 1,
      "explicacao": "Como o dataset tem 1.500 linhas, você precisa primeiro habilitar o perfil de coluna para todo o dataset (padrão é apenas as primeiras 1.000 linhas) e depois usar Perfil de coluna para ver os valores distintos de Estado/Região."
    },
    {
      "pergunta": "Qual funcionalidade do Power Query permite visualizar o código M gerado por cada etapa de transformação?",
      "opcoes": [
        "Editor Avançado",
        "Perfil de dados",
        "Painel de consultas",
        "Configurações de consulta"
      ],
      "correta": 0,
      "explicacao": "O Editor Avançado permite visualizar e editar o código M completo gerado por cada etapa de transformação aplicada no Power Query."
    },
    {
      "pergunta": "Qual é o risco de ter valores nulos em uma coluna numérica no Power BI?",
      "opcoes": [
        "Expressões DAX que calculam MAX nos dados serão incorretas",
        "Expressões DAX que calculam SUM nos dados serão incorretas",
        "Expressões DAX que calculam AVERAGE nos dados serão incorretas",
        "Os dados não poderão ser importados"
      ],
      "correta": 2,
      "explicacao": "Valores nulos em colunas numéricas afetam principalmente as expressões DAX de AVERAGE (média), pois o Power BI pode excluir os nulos do denominador, resultando em médias incorretas se você não tratar os valores nulos adequadamente."
    },
    {
      "pergunta": "Você planeja preencher uma tabela em um conjunto de dados do Power BI com dados de uma lista do SharePoint Online. Qual modo de armazenamento será usado?",
      "opcoes": [
        "DirectQuery",
        "Conexão dinâmica (Live connection)",
        "Composto (Composite)",
        "Importado (Import)"
      ],
      "correta": 3,
      "explicacao": "Quando dados são conectados de fontes como SharePoint Online, o modo padrão é Importado, onde os dados são copiados para o cache do modelo do Power BI."
    },
    {
      "pergunta": "No Power BI Desktop, você está atualizando um relatório que se conecta a um banco de dados SQL Server usando autenticação de banco de dados. As credenciais anteriores expiraram. Quais dois procedimentos você deve realizar para atualizar as credenciais?",
      "opcoes": [
        "Abrir a caixa de diálogo Configurações de Fonte de Dados e localizar a fonte de dados, depois selecionar Editar Permissões e inserir novas credenciais",
        "Abrir a caixa de diálogo Obter Dados e fazer uma nova conexão ao banco de dados",
        "Abrir a caixa de diálogo Opções e permitir que as visualizações de dados sejam baixadas em segundo plano",
        "Excluir o relatório e criar um novo com as credenciais corretas"
      ],
      "correta": 0,
      "explicacao": "Para atualizar credenciais expiradas: 1) Abra Configurações de Fonte de Dados e localize a fonte, 2) Selecione Editar Permissões e insira as novas credenciais."
    },
    {
      "pergunta": "O que é perfil de dados (data profiling) no Power BI?",
      "opcoes": [
        "Agregar colunas contendo dados numéricos",
        "Estudar as nuances dos dados para entender sua estrutura e qualidade",
        "Modelagem de dados",
        "Criação de métricas calculadas"
      ],
      "correta": 1,
      "explicacao": "O perfil de dados (data profiling) é o processo de estudar as nuances dos dados – suas características, qualidade, distribuição e anomalias – para entender melhor o conjunto de dados."
    },
    {
      "pergunta": "Quantas linhas o Power Query verifica para detectar o tipo de dados nas colunas?",
      "opcoes": [
        "10.000",
        "1.000",
        "100",
        "5.000"
      ],
      "correta": 1,
      "explicacao": "O Power Query verifica as primeiras 1.000 linhas para detectar automaticamente o tipo de dados nas colunas."
    },
    {
      "pergunta": "O processo de transformar dados simples em uma tabela que contém um valor de agregação para cada valor único em uma coluna é chamado de quê?",
      "opcoes": [
        "Agrupar por colunas",
        "Dinamizar (pivotear uma coluna)",
        "Gerenciar agregações",
        "Mesclar consultas"
      ],
      "correta": 1,
      "explicacao": "Dinamizar (pivoting) uma coluna converte dados simples em uma tabela de referência cruzada contendo um valor de agregação para cada valor único em uma coluna."
    },
    {
      "pergunta": "Qual é a ferramenta principal de preparação de dados no Power BI Desktop?",
      "opcoes": [
        "Editor de relatórios",
        "Editor do Power Query",
        "Editor de dados",
        "Designer de modelo"
      ],
      "correta": 1,
      "explicacao": "O Editor do Power Query (também chamado de Editor de Consultas) é a ferramenta principal de preparação de dados no Power BI Desktop."
    },
    {
      "pergunta": "Qual fonte de dados no Power BI organiza as informações em sites, bibliotecas de documentos, pastas e arquivos?",
      "opcoes": [
        "SharePoint Online",
        "Microsoft Dataverse",
        "Power BI Libraries",
        "OneDrive for Business"
      ],
      "correta": 0,
      "explicacao": "O SharePoint Online organiza informações em sites, bibliotecas de documentos, pastas e arquivos dentro de pastas."
    },
    {
      "pergunta": "Você tem um serviço publicado em um website que retorna dados em formato OData com coleções de Categorias e Clientes. Qual tipo de fonte você deve usar para criar uma consulta que recupere esses dados?",
      "opcoes": [
        "JSON",
        "Texto/CSV",
        "OData Feed",
        "XML"
      ],
      "correta": 2,
      "explicacao": "O OData suporta dois formatos para representar recursos: o formato Atom baseado em XML e o formato JSON. Quando um serviço retorna dados como coleções OData, use o conector 'OData Feed'."
    },
    {
      "pergunta": "Você tem dois servidores SQL Server chamados SQLProd e SQLDev. O SQLDev contém as mesmas tabelas que o SQLProd, mas apenas um subconjunto dos dados. Você cria um modelo com 120 tabelas do SQLDev e precisa conectar ao SQLProd com esforço administrativo mínimo. O que você deve fazer no Editor de Consultas antes de publicar?",
      "opcoes": [
        "Criar uma nova conexão ao SQLProd e importar as tabelas",
        "Excluir as consultas existentes e adicionar novas fontes de dados",
        "Configurar as configurações de Fonte de Dados",
        "Editar a origem de cada consulta de tabela individualmente"
      ],
      "correta": 2,
      "explicacao": "Configurar as Configurações de Fonte de Dados permite alterar a fonte de dados de todas as consultas de uma vez, minimizando o esforço administrativo em comparação com editar cada consulta individualmente."
    },
    {
      "pergunta": "Você tem uma planilha do Microsoft Excel que contém uma tabela chamada Vendas. Você precisa adicionar a tabela Vendas a um dashboard do Power BI como um bloco. Como você deve configurar o bloco?",
      "opcoes": [
        "No serviço Power BI, importe os dados da pasta de trabalho do Excel",
        "No Excel, publique a pasta de trabalho no serviço Power BI",
        "Na guia Power BI do Excel, fixe a tabela",
        "No serviço Power BI, faça o upload da pasta de trabalho do Excel"
      ],
      "correta": 2,
      "explicacao": "Para adicionar uma tabela do Excel como bloco em um dashboard do Power BI, você deve usar a guia Power BI no Excel para fixar a tabela diretamente."
    },
    {
      "pergunta": "Qual fonte de dados permite conectar seus dados a outros aplicativos de negócios como Power Apps e Power Automate?",
      "opcoes": [
        "Microsoft Dataverse",
        "Microsoft Dataplatform",
        "Microsoft Dataflows",
        "Microsoft Excel"
      ],
      "correta": 0,
      "explicacao": "O Dataverse é uma opção de armazenamento em nuvem para dados da organização que pode ser conectado a aplicativos de negócios como Power Apps, Power Automate e Power Virtual Agents."
    },
    {
      "pergunta": "Como os parâmetros podem ser usados ao conectar-se a dados no Power Query?",
      "opcoes": [
        "Para conectar a um arquivo JSON",
        "Para alterar valores de fonte de dados dinamicamente",
        "Para criar cenários 'E se'",
        "Para formatar e transformar dados no Editor de Consultas"
      ],
      "correta": 1,
      "explicacao": "Parâmetros são uma forma útil de alterar valores de fonte de dados dinamicamente no Power Query. Esses parâmetros são diferentes dos parâmetros 'E se' criados no front-end do Power BI Desktop."
    },
    {
      "question": "Você se conecta a uma tabela SQL com 100 milhões de linhas que cresce diariamente. A atualização completa demora 3 horas. Qual recurso do Power BI permite importar apenas registros novos ou modificados?",
      "options": [
        "Modo DirectQuery",
        "Atualização Incremental (Incremental Refresh)",
        "Atualização Manual agendada",
        "Tabela de Partições DAX"
      ],
      "answer": 1,
      "explanation": "A Atualização Incremental divide a tabela em partições e recarrega apenas os dados novos ou alterados dentro de um intervalo de datas definido, reduzindo drasticamente o tempo de atualização."
    },
    {
      "question": "Você importa uma tabela com 60 colunas, mas usa apenas 10 no relatório. Onde é a MELHOR prática remover as colunas desnecessárias?",
      "options": [
        "Na visualização de Relatório, ocultando as colunas",
        "No Power Query Editor, antes de carregar para o modelo",
        "Em uma coluna calculada DAX",
        "No Power BI Service após publicar"
      ],
      "answer": 1,
      "explanation": "Remover colunas no Power Query impede que elas cheguem ao modelo de dados, economizando memória e melhorando a performance. Ocultar colunas no relatório ainda as mantém no modelo."
    },
    {
      "question": "No Power Query Editor, qual guia contém as opções 'Perfil de Coluna', 'Distribuição de Coluna' e 'Qualidade de Coluna'?",
      "options": [
        "Guia Página Inicial (Home)",
        "Guia Transformar (Transform)",
        "Guia Exibição (View)",
        "Guia Adicionar Coluna (Add Column)"
      ],
      "answer": 2,
      "explanation": "As ferramentas de Data Profiling (Perfil de Dados) estão na guia 'Exibição' (View) do Power Query Editor, na seção 'Visualização de Dados'."
    },
    {
      "question": "O que é Query Folding no Power Query?",
      "options": [
        "Combinar múltiplas queries em uma única query consolidada",
        "Converter as etapas do Power Query em consultas nativas executadas na fonte de dados",
        "Comprimir os dados durante o carregamento para economizar espaço",
        "Criar uma função M reutilizável a partir de uma query existente"
      ],
      "answer": 1,
      "explanation": "Query Folding (ou query pushdown) ocorre quando o Power Query converte suas etapas de transformação em uma consulta nativa (ex.: SQL) executada na fonte, aproveitando o poder de processamento do servidor."
    },
    {
      "question": "Uma coluna de valores numéricos está armazenada como Texto. Qual é a MELHOR abordagem para corrigir este problema?",
      "options": [
        "Converter usando uma coluna calculada DAX com VALUE()",
        "Alterar o tipo de dado no Power Query Editor",
        "Usar FORMAT() em cada medida que referenciar a coluna",
        "Deixar como Texto e converter apenas nas visualizações"
      ],
      "answer": 1,
      "explanation": "Alterar o tipo de dado na fonte (Power Query) é a melhor prática. Garante integridade dos dados e evita a necessidade de conversões repetidas em DAX."
    },
    {
      "question": "Você precisa: (1) Remover linhas onde CustomerID é nulo e (2) Substituir células vazias em Country por 'Desconhecido'. Quais duas etapas do Power Query atendem esses requisitos? (Selecione duas)",
      "options": [
        "Filtrar Linhas (Filter Rows)",
        "Substituir Valores (Replace Values)",
        "Remover Erros (Remove Errors)",
        "Coluna Condicional (Conditional Column)"
      ],
      "answer": [
        0,
        1
      ],
      "explanation": "'Filtrar Linhas' remove registros com base em condições (incluindo nulos). 'Substituir Valores' troca valores específicos, como strings vazias, por um valor padrão."
    },
    {
      "question": "Você tem as tabelas Vendas_2024 e Vendas_2025, com as mesmas colunas. Qual operação do Power Query combina essas tabelas verticalmente (empilhando as linhas)?",
      "options": [
        "Mesclar Consultas (Merge Queries)",
        "Acrescentar Consultas (Append Queries)",
        "Junção Cruzada (Cross Join)",
        "Expandir Coluna (Expand Column)"
      ],
      "answer": 1,
      "explanation": "'Acrescentar' (Append) empilha tabelas com a mesma estrutura verticalmente. 'Mesclar' (Merge) combina tabelas horizontalmente com base em uma coluna-chave (equivalente ao JOIN do SQL)."
    },
    {
      "question": "Uma planilha tem colunas: Produto, Jan, Fev, Mar...Dez, onde cada mês é uma coluna com o valor de vendas. Para análises temporais, você precisa transformar para: Produto, Mês, Valor. Qual transformação usar?",
      "options": [
        "Pivotar Colunas (Pivot Columns)",
        "Despivotar Colunas (Unpivot Columns)",
        "Transpor (Transpose)",
        "Dividir Coluna (Split Column)"
      ],
      "answer": 1,
      "explanation": "Unpivot transforma colunas em linhas, convertendo uma tabela 'wide' (larga) em uma tabela 'tall' (alta), ideal para análises por período no Power BI."
    },
    {
      "question": "Você deseja criar uma conexão parametrizada no Power Query para alternar entre ambientes (Dev, QA, Prod) sem editar a query manualmente. O que usar?",
      "options": [
        "Variáveis DAX (VAR)",
        "Parâmetros do Power Query (Query Parameters)",
        "Filtros de Relatório",
        "Grupos de Cálculo"
      ],
      "answer": 1,
      "explanation": "Os Parâmetros do Power Query são valores configuráveis que podem ser referenciados nas etapas das queries, permitindo alternar entre fontes ou configurações sem editar a lógica manualmente."
    },
    {
      "question": "Qual é a diferença entre criar uma Referência (Reference) e uma Duplicata (Duplicate) de uma query no Power Query?",
      "options": [
        "Não há diferença prática entre as duas opções",
        "Uma Referência cria cópia independente; uma Duplicata depende da original",
        "Uma Referência depende da query original e reflete suas mudanças; uma Duplicata é independente",
        "Referência é usada apenas para fontes SQL Server"
      ],
      "answer": 2,
      "explanation": "Uma Referência cria uma nova query que parte do resultado da original (como um 'ponteiro'). Uma Duplicata copia todos os passos da query de forma independente."
    },
    {
      "question": "Uma pasta compartilhada contém 12 arquivos CSV (um por mês). Você precisa combinar todos em uma única tabela no Power BI. Qual é a abordagem MAIS eficiente?",
      "options": [
        "Importar cada arquivo individualmente e usar Append depois",
        "Usar o conector de Pasta (Folder) para combinar arquivos automaticamente",
        "Criar 12 conexões separadas e unir via DAX",
        "Usar o conector Web para ler a pasta"
      ],
      "answer": 1,
      "explanation": "O conector de Pasta (Folder) do Power Query detecta automaticamente todos os arquivos na pasta e cria uma função para combiná-los, inclusive adicionando novos arquivos automaticamente nas atualizações futuras."
    },
    {
      "question": "Uma coluna DateTime tem alta cardinalidade e prejudica a performance do modelo. Qual transformação no Power Query resolve isso preservando a informação de data?",
      "options": [
        "Converter para texto no formato dd/mm/yyyy",
        "Extrair apenas a data (Date Only), removendo o horário",
        "Remover completamente a coluna",
        "Criar um índice numérico"
      ],
      "answer": 1,
      "explanation": "Extrair somente a parte da data reduz a cardinalidade (de valores únicos por segundo para valores únicos por dia), melhorando a compactação e a performance do modelo VertiPaq."
    },
    {
      "question": "Você criou uma query auxiliar no Power Query que é usada como passo intermediário por outras queries. Você NÃO quer que ela apareça como tabela no modelo. O que fazer?",
      "options": [
        "Deletar a query e recriar a lógica em cada query filha",
        "Desabilitar o Carregamento (Disable Load) da query auxiliar",
        "Marcar a tabela como oculta nas configurações do modelo",
        "Converter em uma Função M"
      ],
      "answer": 1,
      "explanation": "Desabilitar o carregamento (botão direito na query → 'Habilitar Carregamento') mantém a query ativa como etapa intermediária, mas impede que ela seja carregada como tabela no modelo de dados."
    },
    {
      "question": "Uma coluna importada de um CSV contém células com erro (#ERROR). Você deseja substituir esses erros por 0. Qual etapa usar?",
      "options": [
        "Filtrar Linhas para excluir os erros",
        "Remover Erros (Remove Errors)",
        "Substituir Erros (Replace Errors)",
        "Substituir Valores (Replace Values)"
      ],
      "answer": 2,
      "explanation": "'Substituir Erros' (Replace Errors) permite definir um valor de substituição para células com erro, mantendo a linha no dataset. 'Remover Erros' deleta as linhas com erro."
    },
    {
      "question": "Você publicou um relatório no Power BI Service conectado a um banco SQL Server local. Para configurar a atualização agendada, o que é obrigatório?",
      "options": [
        "Licença Power BI Premium",
        "Um Data Gateway instalado na rede local com acesso ao banco",
        "Conta de Administrador do Workspace",
        "Habilitar o Endpoint XMLA"
      ],
      "answer": 1,
      "explanation": "O Data Gateway (modo Padrão ou Pessoal) é o componente que cria uma ponte segura entre o Power BI Service na nuvem e fontes de dados locais na rede corporativa."
    },
    {
      "question": "Qual é o propósito da opção 'Ativar Carregamento para' (Enable Load) em uma query do Power Query?",
      "options": [
        "Forçar a atualização imediata da query",
        "Controlar se a query será carregada como tabela no modelo de dados",
        "Habilitar a query para uso em relatórios paginados",
        "Converter a query para formato DirectQuery"
      ],
      "answer": 1,
      "explanation": "Quando 'Enable Load' está desativado, a query existe no Power Query mas não é carregada como tabela no modelo, sendo útil para queries de apoio ou staging."
    },
    {
      "question": "Ao usar o Power Query para conectar a uma API REST via Web.Contents, o que é necessário para garantir o Query Folding?",
      "options": [
        "Query Folding não é suportado para fontes Web/API REST",
        "Usar o parâmetro RelativePath e Query no Web.Contents",
        "Habilitar DirectQuery para a fonte Web",
        "Usar apenas filtros nativos da API"
      ],
      "answer": 0,
      "explanation": "Query Folding não é suportado para conectores Web/API REST, pois o Power Query não consegue traduzir as transformações M em requisições HTTP nativas. As transformações são sempre feitas localmente."
    },
    {
      "question": "Você precisa criar uma coluna personalizada no Power Query baseada em condições. Qual é a diferença entre 'Coluna Condicional' (Conditional Column) e 'Coluna Personalizada' (Custom Column)?",
      "options": [
        "Não há diferença funcional",
        "Coluna Condicional usa interface visual com regras IF/ELSE; Coluna Personalizada usa linguagem M livremente",
        "Coluna Personalizada é mais lenta",
        "Coluna Condicional suporta apenas dois resultados"
      ],
      "answer": 1,
      "explanation": "A Coluna Condicional oferece uma interface gráfica para criar lógica IF/ELSE simples. A Coluna Personalizada usa a linguagem M, oferecendo flexibilidade total para expressões complexas."
    },
    {
      "question": "Qual função M do Power Query é equivalente ao VLOOKUP do Excel, buscando um valor em outra tabela?",
      "options": [
        "Table.Join()",
        "Table.NestedJoin() combinado com expansão de coluna",
        "List.Contains()",
        "Record.Field()"
      ],
      "answer": 1,
      "explanation": "Table.NestedJoin (ou 'Mesclar Consultas' na interface) combinado com a expansão da coluna resultante é o equivalente ao VLOOKUP no Power Query, buscando valores de tabelas relacionadas."
    },
    {
      "question": "Você conecta o Power BI a uma fonte de dados SQL e percebe que as transformações do Power Query NÃO estão sendo enviadas como SQL para o servidor (Query Folding quebrado). Qual é o impacto mais significativo?",
      "options": [
        "O relatório não consegue atualizar os dados",
        "Todos os dados são transferidos para o Power BI antes das transformações serem aplicadas, aumentando o consumo de rede e memória",
        "As medidas DAX param de funcionar",
        "O RLS deixa de funcionar"
      ],
      "answer": 1,
      "explanation": "Quando o Query Folding está quebrado, o Power Query baixa todos os dados brutos da fonte para aplicar as transformações localmente, o que é muito mais lento e consome mais recursos."
    },
    {
      "question": "Qual é o tipo de dado mais eficiente para representar datas no modelo do Power BI, visando melhor compactação e suporte a funções de inteligência de tempo?",
      "options": [
        "Texto (Text) no formato AAAA-MM-DD",
        "Número Inteiro (Whole Number) no formato AAAAMMDD",
        "Data (Date)",
        "DateTime"
      ],
      "answer": 2,
      "explanation": "O tipo 'Date' sem componente de hora é mais eficiente que DateTime (menor cardinalidade), mais funcional que texto (suporta operações de data) e mais legível que inteiros, além de ser compatível com inteligência de tempo DAX."
    },
    {
      "question": "Você está usando o Power Query para combinar dados de múltiplas planilhas dentro de um único arquivo Excel. Qual recurso permite isso de forma automática?",
      "options": [
        "Importar cada aba individualmente usando múltiplas conexões",
        "Usar a opção 'Combinar e Transformar' ao conectar ao arquivo Excel",
        "Criar uma macro VBA no Excel primeiro",
        "Usar o conector OData"
      ],
      "answer": 1,
      "explanation": "Ao conectar a um arquivo Excel e selecionar múltiplas planilhas ou usar a opção 'Combinar e Transformar', o Power Query gera automaticamente uma função para combinar as abas."
    },
    {
      "question": "Qual é o propósito do 'Diagnóstico de Query' (Query Diagnostics) no Power Query?",
      "options": [
        "Verificar erros de sintaxe na linguagem M",
        "Identificar gargalos de performance nas etapas de transformação e verificar o Query Folding",
        "Testar conexões com fontes de dados externas",
        "Monitorar o uso de memória em tempo real"
      ],
      "answer": 1,
      "explanation": "O Diagnóstico de Query registra informações detalhadas sobre cada etapa do Power Query, mostrando quais consultas foram enviadas à fonte (Query Folding) e onde estão os gargalos de performance."
    },
    {
      "question": "Você precisa que o Power Query leia apenas os dados dos últimos 30 dias de uma tabela SQL enorme. Qual é a abordagem mais eficiente para filtrar na fonte?",
      "options": [
        "Carregar todos os dados e filtrar depois com DAX",
        "Adicionar um passo de Filtrar Linhas baseado na coluna de data após carregar tudo",
        "Usar um Parâmetro de Data e aplicar o filtro no Power Query, garantindo Query Folding para SQL",
        "Criar uma view no banco de dados e conectar a ela"
      ],
      "answer": 2,
      "explanation": "Usar um Parâmetro de Data no filtro do Power Query, quando a fonte suporta Query Folding (como SQL Server), envia o filtro diretamente para o banco, transferindo apenas os dados necessários."
    },
    {
      "question": "Você tem três versões de um banco de dados SQL do Azure: Desenvolvimento, Teste e Produção. O seu conjunto de dados atualmente aponta para a base de Desenvolvimento. Como configurar o modelo para alternar facilmente o servidor de banco de dados diretamente pelo Power BI Service (powerbi.com) com o menor esforço?",
      "options": [
        "Criar um arquivo JSON com os nomes dos servidores e importá-lo",
        "Criar um Parâmetro no Power Query e atualizar as consultas para usá-lo",
        "Criar uma consulta para cada servidor e ocultar as tabelas de desenvolvimento",
        "Alterar o nível de privacidade e usar a função ReplaceValue"
      ],
      "answer": 1,
      "explanation": "Criar parâmetros de conexão no Power Query permite que os valores dos servidores sejam modificados de forma dinâmica nas configurações do dataset no Power BI Service, sem necessidade de editar o arquivo .pbix local."
    },
    {
      "question": "Você criou um modelo no Power BI Desktop que se conecta a 120 tabelas de um servidor SQL de teste (SQLDev). Antes de publicar o modelo para produção, você precisa alterar a conexão de todas as tabelas para o servidor de produção (SQLProd). Como fazer isso com o menor esforço administrativo?",
      "options": [
        "Criar uma nova conexão para o SQLProd e importar as 120 tabelas novamente",
        "Deletar as consultas existentes e adicionar as novas fontes",
        "Alterar a origem nas Configurações da Fonte de Dados (Data Source Settings) no menu do Power Query",
        "Editar a origem no Editor Avançado de cada uma das 120 tabelas individualmente"
      ],
      "answer": 2,
      "explanation": "Alterar a string de conexão nas 'Configurações da Fonte de Dados' altera a origem de todas as tabelas dependentes daquele servidor de uma só vez, economizando esforço administrativo."
    },
    {
      "question": "No Power BI Desktop, você está atualizando um relatório conectado a um banco de dados SQL Server usando autenticação SQL. As credenciais armazenadas expiraram. Qual ação você deve realizar para atualizar as credenciais?",
      "options": [
        "Abrir as 'Configurações da Fonte de Dados', localizar a fonte e clicar em 'Editar Permissões' para inserir as novas credenciais",
        "Abrir a janela 'Obter Dados' e criar uma nova conexão com o banco",
        "Limpar as permissões globais nas Opções do Power BI e reiniciar o arquivo",
        "Abrir as Opções e permitir que a visualização de dados baixe em segundo plano"
      ],
      "answer": 0,
      "explanation": "O caminho correto para gerenciar ou atualizar credenciais expiradas de uma fonte existente é através de Página Inicial -> Configurações da Fonte de Dados -> Editar Permissões."
    },
    {
      "question": "Você importou uma lista de 1.500 clientes no Power Query. Você precisa verificar se a lista possui registros válidos de todas as regiões para as quais deseja direcionar uma campanha de marketing. Qual ação você deve realizar no Power Query?",
      "options": [
        "Abrir o Editor Avançado e habilitar a qualidade da coluna",
        "Habilitar o 'Perfil de coluna baseado no conjunto de dados completo' na barra de status e selecionar 'Distribuição de Coluna'",
        "Ativar a 'Qualidade de Coluna' e 'Perfil de Coluna' apenas nas primeiras 1000 linhas",
        "Criar uma coluna condicional com as regiões válidas"
      ],
      "answer": 1,
      "explanation": "Para obter estatísticas corretas sobre a distribuição de termos em toda a coluna (além das primeiras 1000 linhas padrão), você deve alterar a amostragem na barra de status para o conjunto de dados completo e selecionar a opção 'Distribuição de Coluna'."
    },
    {
      "question": "No Power Query, você aplica a etapa: Table.ReplaceValue(Tabela, \"1318\", \"1319\", Replacer.ReplaceText, {\"Endereco\"}). Uma das linhas possui o valor 'Avenida Brasil, 1318' na coluna Endereco. Qual será o valor resultante após a aplicação dessa etapa?",
      "options": [
        "1318",
        "1319",
        "Avenida Brasil, 1318",
        "Avenida Brasil, 1319"
      ],
      "answer": 3,
      "explanation": "Como a função utiliza o substituidor Replacer.ReplaceText, ela age como uma substituição parcial de texto em qualquer lugar da string, mudando '1318' para '1319' e preservando o restante do endereço."
    },
    {
      "question": "Uma biblioteca do SharePoint Online contém relatórios mensais de fabricação salvos como arquivos Excel com a mesma estrutura de dados. Você precisa carregar apenas os arquivos dessa pasta para análise no Power BI. Qual é o fluxo correto de etapas?",
      "options": [
        "Obter dados de Pasta do SharePoint Online, inserir a URL do site, clicar em 'Combinar e Transformar' e aplicar filtro pelo caminho da pasta (Folder Path)",
        "Obter dados de Lista do SharePoint, selecionar os arquivos Excel e mesclá-los via DAX",
        "Conectar a cada arquivo Excel individualmente usando o conector Web",
        "Obter dados de Lista do SharePoint, clicar em Combinar e Filtrar pelo nome do arquivo"
      ],
      "answer": 0,
      "explanation": "Conectar a uma Pasta do SharePoint Online (SharePoint Folder) lê todos os arquivos do site. Filtrar pelo 'Folder Path' garante que apenas os arquivos da biblioteca desejada sejam mantidos, e 'Combinar e Transformar' os consolida automaticamente em uma única tabela."
    },
    {
      "question": "Você precisa importar 100 arquivos CSV que possuem a mesma estrutura de colunas e estão salvos em uma pasta compartilhada na rede da sua empresa. Como consolidar esses arquivos em uma única tabela no Power BI com o menor esforço administrativo?",
      "options": [
        "Adicionar cada arquivo CSV individualmente e combiná-los usando etapas de Append",
        "Adicionar uma fonte de dados do tipo 'Pasta' (Folder), apontar para o diretório e selecionar a opção 'Combinar e Carregar'",
        "Copiar todos os dados manualmente para uma planilha Excel e importá-la",
        "Utilizar o conector SQL Server para ler os arquivos de rede"
      ],
      "answer": 1,
      "explanation": "O conector de Pasta (Folder) lê todo o conteúdo de um diretório de arquivos planos de mesma estrutura e gera uma função automática em M para empilhar (combinar) todas as linhas em uma única tabela consolidada automaticamente."
    },
    {
      "question": "Você possui duas consultas no Power BI: Query1 traz a tabela SMB_Customers do SQL Server e Query2 traz Enterprise_Customers de um banco Oracle. Ambas possuem as mesmas colunas. Qual comando você deve usar para unir essas duas tabelas em uma única listagem consolidada de clientes?",
      "options": [
        "Mesclar Consultas (Merge Queries)",
        "Acrescentar Consultas (Append Queries)",
        "Combinar Arquivos",
        "Mesclar Colunas"
      ],
      "answer": 1,
      "explanation": "Como as tabelas possuem a mesma estrutura de colunas e você quer empilhar as linhas verticalmente (unir as bases), a operação correta é o 'Acrescentar Consultas' (Append Queries)."
    },
    {
      "question": "Um modelo do Power BI recebe leituras de temperatura de 500 sensores a cada minuto. O requisito de relatório é exibir apenas a temperatura média de cada sensor consolidada por hora. Como reduzir o tamanho do modelo e otimizar a performance?",
      "options": [
        "Criar visuais que agrupam os dados por hora na aba de Relatório",
        "Utilizar o Power Query para aplicar uma etapa de 'Agrupar Por' (Group By) por Sensor e Hora, agregando a Média",
        "Aplicar um filtro de nível de relatório para a coluna de minutos",
        "Remover as colunas de ID dos sensores"
      ],
      "answer": 1,
      "explanation": "Agrupar e resumir os dados no Power Query (pré-agregação) reduz drasticamente o número de linhas importadas pelo VertiPaq (de 60 linhas por hora por sensor para apenas 1 linha por hora por sensor), melhorando a compactação e a performance."
    },
    {
      "question": "Você está mesclando as consultas de Pedidos (Orders) e Detalhes dos Pedidos (Order Details) no Power Query. Devido a problemas de qualidade, alguns pedidos não possuem registros correspondentes nos detalhes. Qual tipo de junção (join) garante que todos os registros da tabela de Pedidos sejam mantidos no resultado?",
      "options": [
        "Junção Externa Completa (Full Outer)",
        "Junção Interna (Inner)",
        "Junção Externa Esquerda (Left Outer)",
        "Junção Anti Direita (Right Anti)"
      ],
      "answer": 2,
      "explanation": "A Junção Externa Esquerda (Left Outer Join) preserva 100% das linhas da primeira tabela (Pedidos) e traz correspondências da segunda tabela (Detalhes), preenchendo com nulo onde não houver correspondência."
    },
    {
      "question": "Qual é a melhor prática ao lidar com erros de tipo de dado durante a importação de arquivos CSV no Power Query?",
      "options": [
        "Ignorar os erros e deixar o Power BI resolver automaticamente",
        "Definir explicitamente os tipos de dado de cada coluna no Power Query e tratar os erros com Substituir Erros ou Remover Erros",
        "Sempre converter tudo para Texto e tratar no DAX",
        "Usar um arquivo Excel em vez de CSV"
      ],
      "answer": 1,
      "explanation": "Definir os tipos de dado explicitamente no Power Query garante consistência e permite tratar erros de conversão de forma controlada antes que os dados cheguem ao modelo."
    },
    {
      "question": "Você tem uma tabela de clientes com uma coluna 'Endereço Completo' no formato 'Rua, Cidade, Estado'. Você precisa separar em três colunas. Qual recurso do Power Query usar?",
      "options": [
        "Extrair (Extract) → Texto Após Delimitador",
        "Dividir Coluna (Split Column) por delimitador",
        "Coluna Condicional",
        "Substituir Valores"
      ],
      "answer": 1,
      "explanation": "'Dividir Coluna por Delimitador' separa o conteúdo de uma coluna em múltiplas colunas com base em um caractere separador, como vírgula ou ponto e vírgula."
    },
    {
      "question": "Qual é o comportamento padrão do Power Query ao alterar o tipo de uma coluna que contém valores incompatíveis?",
      "options": [
        "A importação falha completamente",
        "Os valores incompatíveis são convertidos para null",
        "Os valores incompatíveis geram um erro na célula (#Error)",
        "O Power Query ignora a alteração de tipo"
      ],
      "answer": 2,
      "explanation": "Ao alterar o tipo de dado, valores que não podem ser convertidos geram um erro (#Error) na célula. O usuário precisa tratar esses erros com 'Substituir Erros' ou 'Remover Erros'."
    },
    {
      "question": "Qual é a vantagem de usar 'Funções Personalizadas' (Custom Functions) em M no Power Query?",
      "options": [
        "Melhoram o Query Folding automaticamente",
        "Permitem reutilizar lógica de transformação em múltiplas queries evitando duplicação de código",
        "São mais rápidas que os passos nativos do Power Query",
        "Permitem executar código Python dentro do Power Query"
      ],
      "answer": 1,
      "explanation": "Funções personalizadas em M encapsulam lógica reutilizável que pode ser aplicada a múltiplas queries ou tabelas, evitando duplicação e facilitando a manutenção."
    },
    {
      "question": "Você precisa conectar o Power BI a dados de um banco Oracle local e configurar atualização agendada no Service. Qual requisito adicional é necessário?",
      "options": [
        "Instalar o driver Oracle ODBC no servidor do Gateway",
        "Usar apenas DirectQuery para Oracle",
        "Converter os dados para CSV primeiro",
        "Não é possível usar Oracle com Power BI"
      ],
      "answer": 0,
      "explanation": "Para conectar a fontes Oracle, além do Data Gateway, é necessário instalar o provedor Oracle Data Provider for .NET (ODP.NET) ou o driver Oracle ODBC na máquina onde o Gateway está instalado."
    },
    {
      "question": "Qual é o impacto de manter muitas etapas de transformação no Power Query que quebram o Query Folding em uma fonte SQL?",
      "options": [
        "Nenhum impacto, o Power BI otimiza automaticamente",
        "Aumenta o tempo de atualização pois os dados são processados no motor local do Power Query em vez do servidor de banco de dados",
        "Impede o uso de medidas DAX",
        "Quebra os relacionamentos do modelo"
      ],
      "answer": 1,
      "explanation": "Quando o Query Folding é quebrado, o Power Query precisa baixar os dados brutos e processá-los localmente, o que é significativamente mais lento do que deixar o servidor de banco de dados fazer o processamento."
    },
    {
      "question": "Você quer criar uma tabela de calendário completa diretamente no Power Query (não no DAX). Qual função M é a base para gerar uma lista de datas contínua?",
      "options": [
        "List.Numbers()",
        "List.Dates()",
        "Table.FromList()",
        "Date.AddDays()"
      ],
      "answer": 1,
      "explanation": "List.Dates(startDate, count, step) gera uma lista de datas a partir de uma data inicial, com um número de datas e um incremento definidos. É a base para criar tabelas de calendário em M."
    },
    {
      "question": "Você se conecta a uma API REST usando Web.Contents. Durante a atualização agendada no Power BI Service, você recebe um erro de que as credenciais do recurso não podem ser validadas dinamicamente. Qual parâmetro da função M resolve este problema de segurança?",
      "options": [
        "Headers",
        "RelativePath",
        "Query",
        "Timeout"
      ],
      "answer": 1,
      "explanation": "No Power BI Service, URLs dinâmicas falham na atualização porque o serviço não consegue analisar a URL base estática para autenticação. O uso de 'RelativePath' mantém a URL base estática no Web.Contents, permitindo a validação correta das credenciais enquanto acrescenta caminhos dinâmicos."
    },
    {
      "question": "Você está combinando dados de um banco SQL Server (DirectQuery) e de uma planilha Excel (Import) em um modelo composto. Para otimizar o desempenho de relacionamentos entre tabelas de dimensão pequenas do SQL e tabelas de fato do Excel, qual modo de armazenamento deve ser atribuído às tabelas de dimensão?",
      "options": [
        "DirectQuery",
        "Import",
        "Duplo (Dual)",
        "Híbrido"
      ],
      "answer": 2,
      "explanation": "O modo Duplo (Dual) permite que a tabela atue tanto em cache (Import) quanto via consulta direta (DirectQuery) dependendo do contexto. Ao relacionar com fatos locais (Import), ela age como Import evitando cross-source queries lentas. Ao relacionar com fatos DirectQuery, ela age como DirectQuery preservando performance."
    },
    {
      "question": "Você está escrevendo uma etapa de transformação complexa no Power Query em M que ocasionalmente gera erros de divisão por zero ou nulos. Qual estrutura em M permite testar uma expressão e retornar um valor padrão caso ocorra uma falha?",
      "options": [
        "if ... then ... else",
        "try ... otherwise",
        "error ... rescue",
        "catch"
      ],
      "answer": 1,
      "explanation": "A expressão 'try ... otherwise' na linguagem M avalia o primeiro bloco e, se ele falhar ou retornar erro, executa e retorna o valor fornecido no bloco 'otherwise', agindo como tratamento de exceções robusto."
    },
    {
      "question": "No Power Query Editor, a mensagem 'Perfil de coluna baseado nas primeiras 1000 linhas' é exibida na barra de status. O seu conjunto de dados possui 1 milhão de linhas. Qual o impacto prático dessa configuração padrão?",
      "options": [
        "Os dados acima de 1000 linhas não serão importados pelo modelo final",
        "As estatísticas de qualidade, distribuição e perfil dos dados podem ser imprecisas para o conjunto completo",
        "O Power Query executará de forma mais lenta porque força a leitura por lotes",
        "Nenhum, pois a amostragem de 1000 linhas é estatisticamente idêntica para qualquer volume"
      ],
      "answer": 1,
      "explanation": "Por padrão, o Perfil de Dados do Power Query analisa apenas as primeiras 1000 linhas para garantir velocidade de preview. Se o arquivo contiver anomalias ou erros após a linha 1000, eles não serão exibidos no Perfil até que o usuário clique na mensagem e ative 'Perfil de coluna baseado no conjunto de dados completo'."
    },
    {
      "question": "Você precisa extrair dados de uma instância corporativa do Microsoft Dataverse de forma rápida e com suporte a consultas nativas eficientes. Qual conector ou recurso oferece melhor desempenho técnico?",
      "options": [
        "Conector Dataverse Padrão com modo Import",
        "Ponto de extremidade TDS (Tabular Data Stream) ativo na organização",
        "Conector Web lendo endpoints de OData",
        "Exportar para arquivos CSV no OneDrive e lê-los"
      ],
      "answer": 1,
      "explanation": "O ponto de extremidade TDS (Tabular Data Stream) permite que aplicativos externos se conectem ao Dataverse exatamente da mesma forma que fariam com um banco de dados SQL Server, otimizando o fluxo e permitindo que o Power BI envie consultas SQL nativas e aproveite o Query Folding."
    },
    {
      "question": "Ao conectar a uma base de dados SQL Server corporativa, um analista cola uma consulta SQL personalizada complexa no campo 'Instrução SQL' das Opções Avançadas do conector. Qual é o impacto direto no Query Folding?",
      "options": [
        "Habilita o Query Folding em todas as etapas subsequentes criadas na interface do Power Query",
        "Desabilita permanentemente o Query Folding para quaisquer etapas de transformação subsequentes aplicadas a essa query",
        "Nenhum impacto, desde que a query SQL não possua cláusulas ORDER BY",
        "A query é automaticamente forçada a rodar apenas no modo DirectQuery"
      ],
      "answer": 1,
      "explanation": "Ao inserir uma consulta SQL nativa no conector, você assume o controle da extração. O Power Query não consegue analisar o SQL bruto complexo para fundir (fold) transformações de etapas posteriores (como filtros adicionais) na fonte. Toda transformação subsequente será feita em memória local."
    },
    {
      "question": "Você importa um arquivo de log estruturado em formato JSON que contém uma matriz (list) de registros de auditoria. Qual fluxo básico de etapas do Power Query é necessário para expor esses registros em uma tabela colunar limpa?",
      "options": [
        "Mesclar Colunas → Dividir Coluna por delimitador",
        "Converter para Tabela → Expandir as colunas e extrair valores",
        "Despivotar Colunas → Transpor linhas",
        "Agrupar por ID de auditoria → Criar coluna de índice"
      ],
      "answer": 1,
      "explanation": "Arquivos JSON que contêm listas aninhadas são lidos como objetos 'List' ou 'Record'. O fluxo correto é converter a lista de registros em uma Tabela do Power Query e, em seguida, clicar no ícone de expansão (setas duplas) no cabeçalho da coluna para expor os campos individuais em novas colunas."
    },
    {
      "question": "Você está modelando uma conexão em DirectQuery com SQL Server. Para otimizar a performance dos relacionamentos e forçar o banco a realizar INNER JOINs mais rápidos em vez de OUTER JOINs lentos, qual propriedade de relacionamento deve ser configurada?",
      "options": [
        "Direção do filtro cruzado: Ambos (Both)",
        "Assumir Integridade Referencial (Assume Referential Integrity)",
        "Ativar filtro de segurança em ambas as direções",
        "Marcar como relacionamento inativo"
      ],
      "answer": 1,
      "explanation": "Ao marcar 'Assumir Integridade Referencial', você garante ao Power BI que os valores de chave estrangeira na tabela de fatos sempre possuem um correspondente exato na tabela de dimensões. Isso permite que o motor gere consultas usando INNER JOIN, que é significativamente mais rápido que LEFT OUTER JOIN."
    },
    {
      "question": "Ao utilizar o recurso 'Mesclar Consultas' com correspondência difusa (Fuzzy Merge), qual parâmetro do Power Query define o quão parecidos dois termos textuais devem ser para que ocorra o cruzamento de linhas?",
      "options": [
        "Tabela de transformação (Transformation Table)",
        "Limiar de Similaridade (Similarity Threshold)",
        "Ignorar maiúsculas e minúsculas",
        "Combinar por partes de palavras"
      ],
      "answer": 1,
      "explanation": "O 'Limiar de Similaridade' (Similarity Threshold) aceita valores de 0,00 a 1,00. O valor padrão de 0,80 significa que termos com pelo menos 80% de similaridade serão combinados. Valores menores são mais tolerantes a variações ortográficas mas aumentam falsos positivos."
    },
    {
      "question": "No Power Query Editor, sob a guia 'Exibição', as ferramentas de perfil mostram que uma coluna de ID de Cliente possui '12% Vazias' (Empty) e '3% de Erros' (Errors). Qual é a distinção de processamento entre esses dois estados de célula?",
      "options": [
        "Vazias são nulos ou strings sem texto; Erros são falhas críticas de conversão ou inconsistências de dados na fonte",
        "Erros são gerados por valores nulos; Vazias são strings em branco",
        "Vazias impedem o carregamento do modelo; Erros são ignorados pelo VertiPaq",
        "Não há diferença, ambos são lidos como BLANK no DAX"
      ],
      "answer": 0,
      "explanation": "Células 'Vazias' contêm ausência de valor (valores nulos em banco de dados ou células de planilha sem conteúdo) e são perfeitamente normais. Células de 'Erro' indicam que a importação ou a conversão de tipo falhou (ex: tentar ler o texto 'ABC' em uma coluna numérica)."
    },
    {
      "question": "Uma grande tabela fato de vendas em DirectQuery no SQL Server contém uma coluna de data e hora com alta precisão (segundos). Isso está deixando as consultas lentas. Qual é a melhor prática recomendada para esta modelagem?",
      "options": [
        "Manter a coluna exatamente como está para preservar a granularidade",
        "Dividir a coluna DateTime em duas: uma coluna apenas de Data (tipo Date) e outra coluna apenas de Hora (tipo Time)",
        "Converter a coluna inteira para formato de Texto longo",
        "Remover completamente o relacionamento com a tabela Calendário"
      ],
      "answer": 1,
      "explanation": "Dividir DateTime em colunas de Data e Hora separadas reduz drasticamente a cardinalidade (valores únicos) da chave de relacionamento e melhora significativamente a performance de indexação no SQL e o comportamento de agrupamento e agregação no Power BI."
    },
    {
      "question": "Ao desenvolver scripts ou etapas avançadas no Power Query Editor, um desenvolvedor digita 'table.selectrows' (minúsculo) na Barra de Fórmulas. O que ocorre quando a etapa tenta rodar?",
      "options": [
        "O Power Query interpreta normalmente porque M é case-insensitive",
        "Ocorre um erro indicando que a função 'table.selectrows' não foi encontrada, pois M é estritamente case-sensitive",
        "O editor autocrashará o Power BI Desktop",
        "A transformação roda, mas em velocidade reduzida por não mapear o tipo nativo"
      ],
      "answer": 1,
      "explanation": "A linguagem M é estritamente case-sensitive (diferencia maiúsculas de minúsculas). Escrever funções nativas com letras incorretas (ex: 'table.selectrows' em vez de 'Table.SelectRows') resultará em erro de compilação ou 'NameNotFoundError'."
    },
    {
      "question": "Você publica um relatório no Power BI Service que utiliza a função M 'DateTime.LocalNow()' para carregar a data de atualização. Após o agendamento de refresh na nuvem, você percebe que a data exibida está algumas horas atrasada/adiantada. Por que ocorre essa divergência?",
      "options": [
        "O gateway local alterou o relógio da máquina física",
        "O Power BI Service executa a atualização no fuso horário UTC (tempo universal), ignorando o fuso horário local da máquina do criador",
        "A licença Pro do workspace restringe a atualização em fusos dinâmicos",
        "A função DateTime.LocalNow() é incompatível com fontes locais"
      ],
      "answer": 1,
      "explanation": "O Power BI Service opera sob o fuso horário UTC padrão da nuvem Azure. Funções de hora local como 'DateTime.LocalNow()' serão avaliadas no servidor do Service como UTC. Para exibir a hora local correta, o desenvolvedor deve usar 'DateTimeZone.UtcNow()' e aplicar o deslocamento de horas (timezone offset) correto do fuso desejado."
    },
    {
      "question": "Ao configurar 'Atualização Incremental' para uma tabela de vendas do SQL no Power BI Desktop, quais tipos de parâmetros do Power Query são estritamente obrigatórios em termos de nome e tipo de dado?",
      "options": [
        "RangeStart e RangeEnd do tipo Texto (Text)",
        "RangeStart e RangeEnd do tipo Data/Hora (DateTime)",
        "MinDate e MaxDate do tipo Data (Date)",
        "StartDate e EndDate do tipo Número Inteiro (Int)"
      ],
      "answer": 1,
      "explanation": "A atualização incremental exige a criação de dois parâmetros chamados exatamente 'RangeStart' e 'RangeEnd' (respeitando maiúsculas) e configurados estritamente com o tipo de dados Data/Hora (DateTime). O Power BI usa esses parâmetros dinamicamente para particionar e atualizar os dados."
    },
    {
      "question": "Em ambientes corporativos, onde são armazenadas e gerenciadas as definições das tabelas resultantes do ETL de um Dataflow (Fluxo de Dados) criado no Power BI Service?",
      "options": [
        "Em um banco de dados SQL Server temporário na nuvem",
        "Em contas de armazenamento Azure Blob ou Azure Data Lake Storage Gen2 no formato Common Data Model (CDM)",
        "Diretamente no cache de memória RAM da capacidade Premium",
        "Em pastas do OneDrive para Business do usuário proprietário"
      ],
      "answer": 1,
      "explanation": "Dataflows geram arquivos e metadados estruturados que são armazenados em estruturas de pastas do Azure Data Lake Storage Gen2 de propriedade gerenciada do Power BI (ou de propriedade da empresa), organizados seguindo as especificações do Common Data Model (CDM)."
    }
  ],
  "Modelar Dados": [
    {
      "pergunta": "A tabela de Vendas está relacionada à Tabela Data e Produto (Muitos para um). Você tem Total Sales Amount. Como criar uma medida escalável para agregar isso?",
      "opcoes": [
        "Total Sales = SUM('Sales'[Total Sales Amount])",
        "Total Sales = ALL('Sales'[Total Sales Amount])",
        "Total Sales = MAX('Sales'[Total Sales Amount])",
        "Total Sales = CALCULATE([Total Sales])"
      ],
      "correta": 0,
      "explicacao": "A função de agregação padrão em DAX para calcular subtotais (vendas) é SUM."
    },
    {
      "pergunta": "Você criou um KPI usando um mês como eixo de tendência (trend axis), mas não está ordenado corretamente por mês e você descobre que visuais KPI não têm botão de ordenar. Como resolver?",
      "opcoes": [
        "Modificar os filtros visuais.",
        "Converter a visualização temporariamente para um tipo diferente (ex: Tabela ou Barra) e ordenar lá.",
        "Remover o eixo de tendência do visual.",
        "Deletar o dataset inteiro."
      ],
      "correta": 1,
      "explicacao": "Como não existe a opção de ordenação ativa no KPI Visual nativo, o truque de contorno é convertê-lo em barra/tabela, usar as reticências para 'Ordenar Eixo' pelo mês e, em seguida, voltar para KPI."
    },
    {
      "pergunta": "Num medidor, você vê valores numéricos como 0.52. Mas precisa que apareçam como 52%. Qual a forma nativa recomendada de consertar isso?",
      "opcoes": [
        "Na aba Modelagem (Modeling), alterar o Tipo de Dados (Data Type) ou formato para Porcentagem.",
        "Editar a consulta e alterar o tipo de dados lá.",
        "Criar uma coluna calculada que concatena '%' no final.",
        "Criar uma medida que adiciona '%' manualmente usando DAX FORMAT."
      ],
      "correta": 0,
      "explicacao": "A forma preferencial no Power BI é selecionar a coluna ou medida e, usando a guia Ferramentas de Coluna/Medida, definir a Formatação nativa para Porcentagem."
    },
    {
      "pergunta": "Você exibe nomes de meses (Jan, Fev, Mar...) e eles aparecem em ordem alfabética num visual. Como garantir que apareçam na ordem do calendário?",
      "opcoes": [
        "Ordenar a coluna MonthName de forma descendente.",
        "Classificar a coluna MonthName por (Sort by column) MonthNumber.",
        "Ordenar a coluna MonthName de forma ascendente.",
        "Classificar a coluna MonthName por DateKey."
      ],
      "correta": 1,
      "explicacao": "Para organizar textos corretamente em cronologia ou outras sequências, usa-se 'Classificar por coluna' para ordenar os nomes (textos) por uma coluna numérica associada, como 'Número do Mês' (1 a 12)."
    },
    {
      "pergunta": "Usuários usam a palavra 'assinantes' em vez de 'clientes' e o modelo tem a tabela Customer. Como garantir que Q&A entenda a pergunta 'número de assinantes' sem inflar o tamanho do modelo?",
      "opcoes": [
        "Definir 'Summarize By' para Count na coluna CustomerID.",
        "Adicionar um sinônimo 'assinante' (subscriber) à tabela Customer.",
        "Criar uma nova tabela calculada filtrando assinantes.",
        "Adicionar uma descrição à medida 'Customer Count'."
      ],
      "correta": 1,
      "explicacao": "Adicionar sinônimos às tabelas e campos informa ao mecanismo de P&R as diferentes nomenclaturas usadas pela organização sem afetar tamanho de modelo."
    },
    {
      "pergunta": "Relatório com 12 milhões de linhas e 25 visuais carrega lentamente. Atualiza 2x por dia. Como melhorar a performance com MENOS impacto nos recursos?",
      "opcoes": [
        "Mudar as medidas para usar funções iteradoras.",
        "Mudar o dataset importado para DirectQuery.",
        "Aumentar a frequência de atualização.",
        "Substituir os visuais padrão por visuais do AppSource."
      ],
      "correta": 1,
      "explicacao": "DirectQuery transfere a carga de processamento para o banco de dados de origem, o que pode aliviar o consumo de memória do Power BI, especialmente para modelos grandes (12M de linhas não é gigante para importação, mas a questão aponta para DQ como solução de contorno para capacidade)."
    },
    {
      "pergunta": "Para uma tabela com 30 milhões de registros/mês, como apresentar contagens de impressão por campanha e site mantendo o modelo pequeno?",
      "opcoes": [
        "Agrupar as impressões por Ad_id, Site_name e Impression_date no Power Query e agregar usando CountRows.",
        "Criar uma medida calculada com COUNTROWS.",
        "Criar uma tabela calculada em DAX com Ad_id e Site_name.",
        "Manter todos os dados e usar DirectQuery."
      ],
      "correta": 0,
      "explicacao": "Agrupar os dados (Group By) na fonte ou no Power Query eleva a granularidade, reduzindo drasticamente o número de linhas e o tamanho do modelo."
    },
    {
      "pergunta": "Antes de começar a criar agregações (aggregations) no Power BI, você deve primeiro decidir:",
      "opcoes": [
        "O modo de armazenamento (Storage mode)",
        "A granularidade (nível de detalhe) na qual criá-las.",
        "O tipo de relacionamento",
        "A linguagem de consulta (DAX ou M)"
      ],
      "correta": 1,
      "explicacao": "A granularidade (nível) define como os dados serão resumidos (ex: agrupar vendas diárias por mês). Isso afeta diretamente a perda de detalhes versus ganho de desempenho."
    },
    {
      "pergunta": "É possível criar um relacionamento entre duas colunas se elas tiverem TIPOS DE DADOS diferentes?",
      "opcoes": [
        "Sim, se for muitos-para-muitos.",
        "Sim, é totalmente suportado na versão mais recente.",
        "Não, ambas as colunas devem ter o mesmo tipo de dados.",
        "Sim, desde que uma seja texto e outra seja data."
      ],
      "correta": 2,
      "explicacao": "No Power BI, as colunas usadas para criar um relacionamento entre tabelas DEVEM ter o mesmo tipo de dados (ex: Inteiro com Inteiro, Texto com Texto)."
    },
    {
      "pergunta": "Qual opção do Power BI permite reduzir o número de consultas enviadas ao banco de dados cruzado e desativar atualizações em tempo real durante interações?",
      "opcoes": [
        "Direct query",
        "Query reduction (Redução de consulta)",
        "Query diagnostics",
        "Dual mode"
      ],
      "correta": 1,
      "explicacao": "Em 'Opções > Redução de consulta', você pode adicionar botões 'Aplicar' aos segmentadores e filtros para evitar que consultas sejam disparadas a cada clique."
    },
    {
      "pergunta": "O que é Cardinalidade (Cardinality) em modelagem de dados?",
      "opcoes": [
        "A granularidade dos dados.",
        "O tempo que os dados levam para carregar.",
        "A singularidade (uniqueness) dos valores em uma coluna. Ex: Relação um-para-muitos.",
        "Um tipo de elemento visual."
      ],
      "correta": 2,
      "explicacao": "Cardinalidade refere-se ao número de valores exclusivos em uma coluna, o que dita o tipo de relacionamento que pode ser formado entre tabelas (1:1, 1:*, *:*)."
    },
    {
      "pergunta": "Qual ferramenta do Power BI Desktop permite identificar gargalos de desempenho em DAX ou recursos visuais?",
      "opcoes": [
        "Q&A",
        "Column profiling (Criação de perfil de coluna)",
        "Performance analyzer (Analisador de desempenho)",
        "Query diagnostics"
      ],
      "correta": 2,
      "explicacao": "O Analisador de Desempenho (Performance Analyzer) permite gravar as interações no relatório e ver quanto tempo cada visual gasta consultando (DAX) e renderizando."
    },
    {
      "pergunta": "Você precisa substituir uma coluna arrastada para Valores (que faz soma automática) por uma medida explícita de Soma. Qual a fórmula?",
      "opcoes": [
        "Sales Amount = COUNT(Sales[SalesAmt])",
        "Sales Amount = Sales",
        "Sales Amount = Sales[SalesAmt]",
        "Sales Amount = SUM(Sales[SalesAmt])"
      ],
      "correta": 3,
      "explicacao": "SUM é a função agregadora que soma os valores de uma coluna."
    },
    {
      "pergunta": "Para uma tabela de estoque onde saldos NÃO são gravados aos finais de semana, qual função usar para pegar o último saldo disponível em um período?",
      "opcoes": [
        "EOMONTH",
        "FIRSTNONBLANK",
        "LASTNONBLANK",
        "NETWORKDAYS"
      ],
      "correta": 2,
      "explicacao": "LASTNONBLANK encontra a última data onde a expressão (neste caso, o saldo de estoque) não está em branco. Como não há dados nos finais de semana, LASTDATE poderia retornar em branco se o mês terminar no fim de semana."
    },
    {
      "pergunta": "Você tem uma tabela de estoque (snapshot) com saldo por dia. Qual medida retorna o estoque disponível no ÚLTIMO dia do período selecionado?",
      "opcoes": [
        "CALCULATE(SUM(FactInventory[UnitsBalance]), LASTDATE('Date'[Date]))",
        "CALCULATE(SUM(FactInventory[UnitsBalance]), FIRSTDATE('Date'[Date]))",
        "CALCULATE(SUM(FactInventory[UnitsBalance]), MAX('Date'[Date]))",
        "SUM(FactInventory[UnitsBalance])"
      ],
      "correta": 0,
      "explicacao": "LASTDATE retorna a última data no contexto de filtro atual, ideal para obter saldos de fechamento de período (semi-aditivos)."
    },
    {
      "pergunta": "Você precisa criar uma dimensão role-playing (ex: uma mesma tabela de data servindo para Data Pedido e Data Entrega). Que tipo de expressão DAX usar?",
      "opcoes": [
        "Calculated column (Coluna calculada)",
        "Calculated table (Tabela calculada)",
        "Measure (Medida)",
        "What-If analysis"
      ],
      "correta": 1,
      "explicacao": "Para dimensões role-playing no Power BI, você cria múltiplas instâncias da tabela, normalmente usando uma Tabela Calculada (ex: ShipDate = 'Date'). Outra opção é usar múltiplos relacionamentos e a função USERELATIONSHIP."
    },
    {
      "pergunta": "Você precisa calcular o percentual de aumento do total de ativos desde um ano atrás. Qual fórmula usar?",
      "opcoes": [
        "(SUM(Assets[Value]) - CALCULATE(SUM(Assets[Value]), SAMEPERIODLASTYEAR('Date'[Date]))) / CALCULATE(SUM(Assets[Value]), SAMEPERIODLASTYEAR('Date'[Date]))",
        "CALCULATE(SUM(Assets[Value]), SAMEPERIODLASTYEAR('Date'[Date])) / SUM(Assets[Value])",
        "CALCULATE(SUM(Assets[Value]), DATESYTD('Date'[Date])) / SUM(Assets[Value])",
        "SUM(Assets[Value]) / CALCULATE(SUM(Assets[Value]), SAMEPERIODLASTYEAR('Date'[Date]))"
      ],
      "correta": 0,
      "explicacao": "A fórmula básica de percentual de crescimento é (Atual - Anterior) / Anterior. SAMEPERIODLASTYEAR('Date'[Date]) obtém o valor anterior."
    },
    {
      "pergunta": "Você tem uma tabela Person com uma coluna Age. Qual fórmula DAX encontra o valor do meio na faixa de valores de idade?",
      "opcoes": [
        "AVERAGE('Person'[Age])",
        "MEDIAN('Person'[Age])",
        "RANK.EQ('Person'[Age], 'Person'[Age])",
        "PERCENTILE.INC('Person'[Age], 0.5)"
      ],
      "correta": 1,
      "explicacao": "MEDIAN('Person'[Age]) retorna a mediana da coluna Age, que é exatamente o valor do meio do conjunto de dados."
    },
    {
      "pergunta": "Você precisa criar uma medida para calcular as vendas dos últimos 12 meses a partir da última data com venda, ignorando filtros do relatório. Quais funções DAX usar?",
      "opcoes": [
        "DATEADD e LASTNONBLANK",
        "DATESYTD e MAX",
        "SAMEPERIODLASTYEAR e MIN",
        "DATESBETWEEN e TODAY"
      ],
      "correta": 0,
      "explicacao": "DATEADD pode recuar 12 meses, LASTNONBLANK encontra a última data com vendas registradas, e CALCULATE junta isso ignorando os filtros. Ex: CALCULATE([Sales], DATESBETWEEN(Date[Date], DATEADD(LASTNONBLANK(Date[Date], [Sales]), -1, YEAR), LASTNONBLANK(Date[Date], [Sales])))"
    },
    {
      "pergunta": "Você tem um modelo para vendas e precisa comparar o YTD (acumulado do ano) com o mesmo período do ano anterior. Qual função DAX deve usar?",
      "opcoes": [
        "LASTDATE",
        "TOTALYTD",
        "SAMEPERIODLASTYEAR",
        "PREVIOUSYEAR"
      ],
      "correta": 2,
      "explicacao": "SAMEPERIODLASTYEAR retorna um conjunto de datas correspondente ao mesmo período do ano anterior. Para comparar YTD com o ano anterior: YtdSalesSamePeriodLastYear = CALCULATE([YtdSales], SAMEPERIODLASTYEAR(Date[Date])). PREVIOUSYEAR retorna todo o ano anterior, não o mesmo período."
    },
    {
      "pergunta": "Você precisa criar uma medida para ranquear clientes pelo total de vendas. Quais tabelas são Sales e Customer, relacionadas por CustomerID. Qual fórmula DAX usar?",
      "opcoes": [
        "RANKX(ALL(Sales), SUMX(RELATEDTABLE(Customer), [Sales_amount]))",
        "TOPN(ALL(Customer), SUMX(RELATEDTABLE(Sales), [Sales_amount]))",
        "RANKX(ALL(Customer), SUMX(RELATEDTABLE(Sales), [Sales_amount]))",
        "RANK.EQ(Sales[sales_amount], Customer[CustomerID])"
      ],
      "correta": 2,
      "explicacao": "RANKX(ALL(Customer), SUMX(RELATEDTABLE(Sales), [Sales_amount])) é a fórmula correta. ALL(Customer) remove filtros da tabela Customer para avaliar o rank globalmente. SUMX(RELATEDTABLE(Sales), [Sales_amount]) soma as vendas de todas as transações relacionadas a cada cliente."
    },
    {
      "pergunta": "Você precisa adicionar uma coluna de data formatada como 'December 01, 2014'. Qual fórmula DAX deve usar?",
      "opcoes": [
        "FORMAT([Date], \"MMM\") & \" \" & FORMAT([Date], \"DD\") & \", \" & FORMAT([Date], \"YYYY\")",
        "FORMAT([Date], \"M\") & \" \" & FORMAT([Date], \"D\") & \", \" & [Date].[Year]",
        "[Date].[Month] & \" \" & FORMAT([Date], \"D\") & \", \" & [Date].[Year]",
        "FORMAT([Date], \"MMMM DD, YYYY\")"
      ],
      "correta": 3,
      "explicacao": "FORMAT([Date], \"MMMM DD, YYYY\") produz o formato completo 'December 01, 2014'. MMMM = nome completo do mês, DD = dia com dois dígitos, YYYY = ano com quatro dígitos. MMM produziria a versão abreviada (Dec). Essa é a forma mais simples e correta."
    },
    {
      "pergunta": "Você precisa criar uma medida para calcular vendas do mesmo período do ano anterior. Qual fórmula DAX deve usar?",
      "opcoes": [
        "SUM(sales[sales_amount]) - CALCULATE(SUM(sales[sales_amount]), DATESYTD('Date'[Date]))",
        "CALCULATE(SUM(sales[sales_amount]), SAMEPERIODLASTYEAR('Date'[Date]))",
        "SUM(sales[sales_amount]) - CALCULATE(SUM(sales[sales_amount]), SAMEPERIODLASTYEAR('Date'[Date]))",
        "CALCULATEX(SUM(sales[sales_amount]), DATESYTD('Date'[Date]))"
      ],
      "correta": 1,
      "explicacao": "CALCULATE(SUM(sales[sales_amount]), SAMEPERIODLASTYEAR('Date'[Date])) é a fórmula correta para calcular vendas do mesmo período do ano anterior. SAMEPERIODLASTYEAR retorna um conjunto de datas equivalentes ao período atual, mas no ano anterior."
    },
    {
      "pergunta": "Qual função DAX permite calcular totais acumulados (running totals)?",
      "opcoes": [
        "DATESYTD",
        "DATEADD",
        "DATESINPERIOD",
        "Todas as anteriores"
      ],
      "correta": 2,
      "explicacao": "DATESINPERIOD retorna um conjunto de datas baseado em um intervalo de tempo específico, o que permite calcular totais acumulados (rolling totals). DATESYTD calcula o acumulado do ano. DATEADD desloca datas para comparar com período anterior. DATESINPERIOD é a mais flexível para acumulados móveis."
    },
    {
      "pergunta": "Qual das seguintes afirmações NÃO é verdadeira sobre modificadores do CALCULATE?",
      "opcoes": [
        "Eles são usados para alterar o contexto de filtro",
        "Eles são usados para acessar relacionamentos de tabela inativos",
        "Eles permitem arrastar e soltar campos em vez de escrever DAX do zero",
        "Eles são usados para alterar como os filtros se propagam"
      ],
      "correta": 2,
      "explicacao": "Medidas Rápidas (Quick Measures) é que permitem arrastar e soltar campos para gerar DAX automaticamente, não os modificadores do CALCULATE. Os modificadores do CALCULATE (como ALL, USERELATIONSHIP, CROSSFILTER) são usados para alterar contexto de filtro, ativar relacionamentos inativos e controlar propagação de filtros."
    },
    {
      "pergunta": "Quais das seguintes funções DAX retornam uma tabela?",
      "opcoes": [
        "Apenas TOPN",
        "Apenas FILTER",
        "Apenas DATEADD",
        "Todas as anteriores (TOPN, FILTER e DATEADD)"
      ],
      "correta": 3,
      "explicacao": "TOPN, FILTER e DATEADD são todas funções que retornam tabelas no DAX. Funções que retornam tabelas são usadas como argumentos de tabela em outras funções ou podem ser usadas para criar tabelas calculadas. Isso as distingue de funções escalares que retornam um único valor."
    },
    {
      "pergunta": "Qual função DAX modifica e substitui qualquer contexto de filtro concorrente?",
      "opcoes": [
        "CALCULATE",
        "SUMX",
        "RELATED",
        "REPLACE"
      ],
      "correta": 0,
      "explicacao": "CALCULATE é a função mais poderosa do DAX que modifica e substitui o contexto de filtro concorrente. Seus filtros têm precedência sobre o contexto de filtro herdado do relatório. Por exemplo, CALCULATE([Vendas], ALL(Produto)) ignora qualquer filtro de produto aplicado pelo usuário."
    },
    {
      "pergunta": "Qual categoria de funções DAX percorre o mesmo cálculo em cada linha de uma tabela e depois agrega os resultados?",
      "opcoes": [
        "Funções Lógicas",
        "Funções de Filtro",
        "Funções Estatísticas",
        "Funções de Iteração (Iterator Functions)"
      ],
      "correta": 3,
      "explicacao": "Funções de Iteração (ou funções 'X') como SUMX, AVERAGEX, COUNTX percorrem cada linha de uma tabela, calculam uma expressão para cada linha, e depois agregam os resultados. São identificadas pelo sufixo 'X' e criam contexto de linha dentro de um contexto de filtro."
    },
    {
      "pergunta": "Em qual campo de um visual as medidas tipicamente 'vivem' (são colocadas)?",
      "opcoes": [
        "Linhas (Rows)",
        "Colunas (Columns)",
        "Valores (Values)",
        "Filtros (Filters)"
      ],
      "correta": 2,
      "explicacao": "Medidas são valores numéricos calculados que são analisados no campo 'Valores' (Values) de um visual de relatório. Elas representam o 'quê' que você está medindo. Dimensões (textos/categorias) vão em Linhas ou Colunas; medidas vão em Valores."
    },
    {
      "pergunta": "Qual das seguintes afirmações NÃO é verdadeira sobre medidas DAX?",
      "opcoes": [
        "Elas são avaliadas com base no contexto de linha",
        "Elas referenciam tabelas ou colunas inteiras",
        "Elas não são visíveis dentro das tabelas",
        "Elas recalculam em resposta a qualquer mudança nos filtros do relatório"
      ],
      "correta": 0,
      "explicacao": "Medidas são avaliadas com base no contexto de FILTRO, não de linha. Contexto de linha é usado por colunas calculadas (que processam linha a linha). Medidas operam sobre conjuntos de dados filtrados e respondem dinamicamente às interações do usuário com o relatório."
    },
    {
      "pergunta": "Onde você deve criar colunas calculadas para reduzir o tamanho do modelo e melhorar o desempenho?",
      "opcoes": [
        "Nos dados de origem (fonte)",
        "No Power Query",
        "No modelo de dados",
        "Todos os métodos produzem os mesmos resultados"
      ],
      "correta": 0,
      "explicacao": "Criar colunas calculadas o mais próximo possível da fonte de dados reduz o tamanho do modelo e melhora o desempenho. Colunas criadas no modelo de dados DAX são armazenadas no modelo e ocupam memória. Colunas criadas no Power Query são mais eficientes que DAX, mas ainda menos que criar na fonte."
    },
    {
      "pergunta": "O que significa a sigla DAX no contexto do Power BI?",
      "opcoes": [
        "Data Analysis Expressions",
        "Data & Analysis Exchange",
        "Data Aggregation Expressions",
        "Dynamic Analysis Expressions"
      ],
      "correta": 0,
      "explicacao": "DAX significa Data Analysis Expressions (Expressões de Análise de Dados). É a linguagem de fórmulas que impulsiona o Power BI, o Power Pivot e o Analysis Services. DAX inclui funções, operadores e constantes que podem ser usados em fórmulas ou expressões para calcular e retornar valores."
    },
    {
      "pergunta": "Ao criar uma tabela de calendário dinâmica no Editor de Consultas, qual expressão M cria uma coluna 'Start of Week' que começa na segunda-feira?",
      "opcoes": [
        "Table.AddColumn(..., each Date.StartOfWeek([Date], Day.Sunday), type date)",
        "Table.AddColumn(..., each Date.StartOfWeek([Date], Day.Monday), type date)",
        "Table.AddColumn(..., each Date.EndOfWeek([Date], Day.Sunday), type date)",
        "Table.AddColumn(..., each Date.EndOfWeek([Date], Day.Tuesday), type date)"
      ],
      "correta": 1,
      "explicacao": "Date.StartOfWeek([Date], Day.Monday) retorna o início da semana definindo segunda-feira como o primeiro dia. Se Day.Sunday fosse usado, a semana começaria no domingo (padrão americano). A função Date.StartOfWeek vs Date.EndOfWeek determina se retorna o início ou fim da semana."
    },
    {
      "pergunta": "Você precisa criar uma tabela calculada para retornar os 100 clientes com maior gasto. Quais funções DAX você usaria para completar a expressão?",
      "opcoes": [
        "TOPN, SUMMARIZE e DESC",
        "TOPN, CALCULATE e ASC",
        "FILTER, SUMMARIZE e DESC",
        "RANKX, ALL e DESC"
      ],
      "correta": 0,
      "explicacao": "TOPN retorna as N primeiras linhas de uma tabela. SUMMARIZE cria uma tabela resumida com totais por grupos. DESC especifica a ordenação decrescente. Sintaxe: TOPN(100, SUMMARIZE(Customers, ..., 'Total Gasto'), [Total Gasto], DESC)"
    },
    {
      "pergunta": "Seu modelo de dados contém muitas expressões DAX complexas com frequentes referências às funções RELATED e RELATEDTABLE. Você precisa minimizar o uso dessas funções. O que deve recomendar?",
      "opcoes": [
        "Dividir o modelo em múltiplos modelos",
        "Ocultar colunas não utilizadas no modelo",
        "Mesclar tabelas usando o Power Query",
        "Transpor as tabelas"
      ],
      "correta": 2,
      "explicacao": "RELATED e RELATEDTABLE são usadas para acessar dados em tabelas relacionadas. Mesclar tabelas no Power Query elimina a necessidade dessas funções, pois todos os dados ficam na mesma tabela. Isso simplifica as expressões DAX ao custo de maior redundância de dados."
    },
    {
      "pergunta": "Você importou as tabelas Customer e Address para o Power Query. Customer tem Address ID como chave estrangeira. Você precisa criar uma consulta com uma linha por cliente, incluindo City, State/Region e Country. O que deve fazer?",
      "opcoes": [
        "Mesclar as tabelas Customer e Address",
        "Transpor as tabelas Customer e Address",
        "Agrupar as tabelas Customer e Address pela coluna Address ID",
        "Acrescentar as tabelas Customer e Address"
      ],
      "correta": 0,
      "explicacao": "Mesclar (Merge) é a operação correta para trazer colunas de uma tabela relacionada para outra - equivalente a um JOIN. Como você quer adicionar colunas de endereço (City, State, Country) a cada cliente (baseado em Address ID), Mesclar é a opção certa. Acrescentar empilharia linhas, não colunas."
    },
    {
      "pergunta": "Quais duas funções DAX você usaria para comparar dados com o mês anterior?",
      "opcoes": [
        "TOTALYTD e PREVIOUSMONTH",
        "CALCULATE e TOTALYTD",
        "CALCULATE e PREVIOUSMONTH",
        "DATEADD e SAMEPERIODLASTYEAR"
      ],
      "correta": 2,
      "explicacao": "Para comparar com o mês anterior, você usa CALCULATE (para modificar o contexto de filtro) em combinação com PREVIOUSMONTH (para deslocar o filtro de data para o mês anterior). Exemplo: Vendas Mês Anterior = CALCULATE([Total Vendas], PREVIOUSMONTH(DimDate[Date]))"
    },
    {
      "pergunta": "Que tipo de funções DAX permitem manipular dados usando períodos de tempo como anos, trimestres, meses e dias?",
      "opcoes": [
        "Funções de inteligência de tempo (Time intelligence)",
        "Funções de comparação (Comparer functions)",
        "Funções de valor (Value functions)",
        "Funções de filtro (Filter functions)"
      ],
      "correta": 0,
      "explicacao": "Funções de inteligência de tempo no DAX (como TOTALYTD, SAMEPERIODLASTYEAR, PREVIOUSMONTH, DATESINPERIOD) permitem criar cálculos que comparam períodos de tempo, calculam acumulados e analisam tendências temporais. Requerem uma tabela de datas marcada."
    },
    {
      "pergunta": "Que tipo de medida usa SUM para agregar sobre um conjunto de dimensões e uma agregação diferente sobre outro conjunto de dimensões?",
      "opcoes": [
        "Aditiva (Additive)",
        "Agregada (Aggregate)",
        "Semi-aditiva (Semi-additive)",
        "Não aditiva (Non-additive)"
      ],
      "correta": 2,
      "explicacao": "Medidas semi-aditivas se somam em algumas dimensões mas não em outras. O exemplo clássico é saldo de conta bancária: pode ser somado por conta ou agência (dimensão de entidade), mas não por tempo (não faz sentido somar saldos de janeiro, fevereiro e março - deve-se pegar o último valor)."
    },
    {
      "pergunta": "Por que você desejaria substituir o contexto de filtro padrão em uma medida DAX?",
      "opcoes": [
        "Para criar medidas que se comportem de acordo com a seleção do usuário",
        "Para criar medidas que se comportem de acordo com sua intenção, independentemente do que o usuário seleciona",
        "Para melhorar o desempenho das consultas",
        "Para ocultar dados sensíveis dos usuários"
      ],
      "correta": 1,
      "explicacao": "Você substitui o contexto padrão quando precisa que uma medida se comporte de uma forma específica, independente do que o usuário filtra. Por exemplo: calcular sempre a % do total geral, ou comparar com o mesmo período do ano anterior, onde você define o período, não o usuário."
    },
    {
      "pergunta": "Qual função DAX avalia uma expressão em um contexto de filtro modificado?",
      "opcoes": [
        "SUMX",
        "CALCULATE",
        "ALL",
        "FILTER"
      ],
      "correta": 1,
      "explicacao": "CALCULATE() é a função mais poderosa do DAX. Ela avalia uma expressão em um contexto de filtro modificado pelos filtros que você especifica. Permite substituir, adicionar ou remover filtros do contexto atual, sendo a base para cálculos avançados como comparações com período anterior."
    },
    {
      "pergunta": "Qual tipo de objeto DAX é calculado com base nos filtros aplicados pelo usuário do relatório?",
      "opcoes": [
        "Medidas",
        "Colunas calculadas",
        "Tabelas calculadas",
        "Hierarquias"
      ],
      "correta": 0,
      "explicacao": "Medidas são avaliadas dinamicamente com base no contexto de filtro criado pelas interações do usuário (slicers, filtros, seleções em visuais). Isso as torna extremamente poderosas para análises dinâmicas. Colunas calculadas têm contexto de linha fixo calculado na atualização."
    },
    {
      "pergunta": "Qual tipo de objeto DAX é calculado sob demanda, no momento em que o usuário interage com o relatório?",
      "opcoes": [
        "Colunas calculadas",
        "Tabelas calculadas",
        "Medidas",
        "Parâmetros de campo"
      ],
      "correta": 2,
      "explicacao": "Medidas (Measures) são calculadas sob demanda, ou seja, apenas quando são usadas em um visual. Elas respondem ao contexto de filtro atual do relatório. Colunas calculadas e tabelas calculadas são computadas durante a atualização do modelo e armazenadas na memória."
    },
    {
      "pergunta": "Você tem FactSales com 50 milhões de linhas de dados diários, DimProduct com 1.000 produtos e DimDate com 3 anos. Os relatórios mostram vendas mensais por produto. Você precisa minimizar o tamanho do modelo. O que deve fazer?",
      "opcoes": [
        "Resumir a tabela DimDate ao nível de mês",
        "Resumir a tabela FactSales ao nível de mês",
        "Resumir a tabela FactSales ao nível de categoria de produto",
        "Resumir a tabela FactSales ao nível de trimestre"
      ],
      "correta": 1,
      "explicacao": "Como os relatórios mostram dados mensais, você pode agregar FactSales por mês e produto, reduzindo dramaticamente o número de linhas (de 50M de linhas diárias para muito menos linhas mensais). A DimDate mantém os 3 anos; o que muda é a granularidade da tabela de fatos."
    },
    {
      "pergunta": "Você tem DimCustomer (uma linha por cliente) e FactOrder (uma linha por pedido). Que tipo de cardinalidade de relacionamento deve usar entre DimCustomer e FactOrder?",
      "opcoes": [
        "Muitos-para-muitos",
        "Muitos-para-um",
        "Um-para-muitos",
        "Um-para-um"
      ],
      "correta": 2,
      "explicacao": "Um cliente pode ter muitos pedidos, portanto o relacionamento é um-para-muitos (1:*) de DimCustomer (lado 'um', chave primária CustomerID) para FactOrder (lado 'muitos', chave estrangeira CustomerID). Este é o padrão clássico de esquema estrela."
    },
    {
      "pergunta": "Você tem um modelo com as tabelas DimDate e FactSales, onde FactSales tem um relacionamento ativo com DimDate[Date] via OrderDate, e dois relacionamentos inativos via ShipDate e ReturnDate. Qual tipo de dimensão é DimDate?",
      "opcoes": [
        "Dimensão degenerada",
        "Dimensão junk",
        "Dimensão outrigger",
        "Dimensão de interpretação múltipla (role-playing dimension)"
      ],
      "correta": 3,
      "explicacao": "DimDate é uma role-playing dimension porque a mesma tabela de dimensão (DimDate) é usada múltiplas vezes com papéis diferentes (Data do Pedido, Data de Envio, Data de Retorno). Cada papel usa um relacionamento diferente com a tabela de fatos."
    },
    {
      "pergunta": "Você visualiza uma tabela com colunas LocationName, LocationID, Temperature e DateTime. Você precisa convertê-la em um esquema estrela. Em qual tabela o campo LocationName deve ser adicionado?",
      "opcoes": [
        "Dimensão de Data (Date Dimension)",
        "Dimensão de Localização (Location Dimension)",
        "Fato de Localização (Location Fact)",
        "Fato de Medições de Temperatura (Temperature Measurements Fact)"
      ],
      "correta": 1,
      "explicacao": "LocationName é um atributo descritivo de uma localização, portanto pertence à tabela de dimensão de localização. Temperature e DateTime são métricas/eventos que vão para a tabela de fatos. LocationID ficaria em ambas como chave de relacionamento."
    },
    {
      "pergunta": "Você precisa criar um relacionamento entre as tabelas Sales e Sales Detail. Para cada linha na tabela Sales, existe pelo menos uma linha, e possivelmente múltiplas, na tabela Sales Detail. Como configurar o relacionamento?",
      "opcoes": [
        "Um-para-um de Sales para Sales Detail",
        "Um-para-muitos de Sales para Sales Detail",
        "Muitos-para-muitos de Sales para Sales Detail",
        "Muitos-para-um de Sales para Sales Detail"
      ],
      "correta": 1,
      "explicacao": "Como cada linha em Sales pode ter múltiplas linhas em Sales Detail, o relacionamento é um-para-muitos (1:*) de Sales (lado 'um') para Sales Detail (lado 'muitos'). Sales contém a chave primária; Sales Detail contém a chave estrangeira."
    },
    {
      "pergunta": "Você tem um modelo Power BI com uma tabela de datas chamada Sale Date. Você precisa adicionar uma segunda tabela de datas chamada Ship Date com as mesmas colunas, sem repetir a lógica de consulta. O que você deve fazer?",
      "opcoes": [
        "Referenciar a consulta Sale Date",
        "Duplicar a consulta Sale Date",
        "Renomear a consulta Sale Date para Ship Date",
        "Acrescentar a consulta Sale Date como uma nova consulta"
      ],
      "correta": 0,
      "explicacao": "Referenciar (Reference) cria uma nova consulta que usa os resultados da consulta original como ponto de partida, sem duplicar a lógica subjacente. Se a consulta original mudar, a referência também muda. Duplicar cria uma cópia independente (com lógica repetida)."
    },
    {
      "pergunta": "Você cria um gráfico de colunas que exibe ProductName por Date, mas o eixo mostra todas as datas individuais. Você precisa exibir por ano com drill-down para semana e dia. O que deve fazer PRIMEIRO?",
      "opcoes": [
        "Criar uma nova tabela com colunas para data, ano, semana e dia",
        "Criar uma nova hierarquia na tabela Sales",
        "Formatar a visualização e definir o tipo do Eixo X como Categórico",
        "Configurar um filtro visual para a coluna Date usando filtro avançado"
      ],
      "correta": 0,
      "explicacao": "Para ter drill-down por Ano > Semana > Dia, você precisa primeiro criar uma tabela de datas dedicada com essas colunas. Em seguida, crie um relacionamento entre a tabela Date e a tabela Sales e crie a hierarquia de datas. A tabela Sales por si só não tem as colunas de granularidade necessárias."
    },
    {
      "pergunta": "Você tem uma consulta de dados de vendas onde a coluna Date contém valores nulos que devem ser substituídos pela data da linha anterior. O que você deve clicar na guia Transformar do Editor de Consultas?",
      "opcoes": [
        "Formato e depois Limpar",
        "Data e depois Mais Antigo",
        "Preencher e depois Abaixo",
        "Substituir Valores e depois Substituir Erros"
      ],
      "correta": 2,
      "explicacao": "Fill Down (Preencher Abaixo) substitui valores nulos pelo valor da linha anterior (acima). Fill Up faria o contrário - substituiria nulos pelo valor da linha seguinte. Esta é a operação correta para propagar datas para baixo quando há nulos."
    },
    {
      "pergunta": "Você tem tabelas CustomerVisits e Date no Power BI. A medida de total de visitas mostra 60.000 para todos os meses, mas o total real é 60.000 com 5.000 apenas em agosto. Como corrigir o relatório?",
      "opcoes": [
        "Modificar a medida para usar a função DAX CALCULATE",
        "Criar um relacionamento entre a tabela CustomerVisits e a tabela Date",
        "Modificar a medida para usar a função DAX SUM",
        "Criar uma hierarquia na tabela Date"
      ],
      "correta": 1,
      "explicacao": "Quando uma medida mostra o mesmo valor total para todos os filtros de data, geralmente significa que não existe relacionamento entre a tabela de fatos (CustomerVisits) e a tabela de dimensão Date. Sem o relacionamento, os filtros de data não propagam para a tabela de fatos."
    },
    {
      "pergunta": "Você tem um modelo Power Pivot no Excel com tabelas Product, Sales e Salesperson relacionadas. Você precisa gerar um relatório que mostre a contagem de produtos vendidos por cada vendedor. O que você deve fazer antes de criar o relatório?",
      "opcoes": [
        "Criar um relacionamento um-para-um entre Product e Salesperson",
        "Para cada relacionamento, alterar a direção do filtro cruzado para Ambos (Both)",
        "Para cada relacionamento, alterar a cardinalidade para Um para um (1:1)",
        "Criar um relacionamento muitos-para-um entre Product e Salesperson"
      ],
      "correta": 1,
      "explicacao": "Para contar produtos por vendedor, o filtro deve fluir da tabela Sales para a tabela Product (que filtra quais produtos foram vendidos) e também para Salesperson. Alterar o Cross Filter Direction para Both nas relações existentes permite esse fluxo bidirecional sem criar novos relacionamentos."
    },
    {
      "pergunta": "Se você importar ou criar sua própria tabela de datas no Power BI, quais requisitos ela deve atender?",
      "opcoes": [
        "Deve conter todos os dias de todos os anos representados no modelo",
        "Não pode conter datas duplicadas",
        "Deve ter pelo menos um campo definido como tipo Date ou DateTime",
        "Todos os itens acima"
      ],
      "correta": 3,
      "explicacao": "Uma tabela de datas personalizada deve atender a todos esses requisitos: conter todos os dias de todos os anos do modelo, não ter datas duplicadas e ter pelo menos um campo Date/DateTime. Além disso, todos os horários devem ser idênticos (ex: 12:00)."
    },
    {
      "pergunta": "Qual das seguintes afirmações sobre usar tabelas mescladas em vez de modelos de dados NÃO é verdadeira?",
      "opcoes": [
        "Mesclar cria dados redundantes",
        "Mesclar usa mais memória",
        "Mesclar usa mais poder de processamento",
        "Mesclar mantém métricas e dimensões em tabelas separadas"
      ],
      "correta": 3,
      "explicacao": "Quando você mescla dados em uma única tabela (flat table), as métricas e dimensões ficam JUNTAS, não separadas. Isso é o oposto de um modelo de dados em estrela onde fatos e dimensões são tabelas separadas. Além disso, mesclar cria redundância de dados e consome mais memória e CPU."
    },
    {
      "pergunta": "Você tem um modelo Power BI com tabelas Customers e Invoice relacionadas por CustomerID. Você precisa definir o relacionamento para otimizar a performance das consultas. O que deve configurar?",
      "opcoes": [
        "Cardinalidade: Muitos-para-muitos; Direção de filtro cruzado: Ambos",
        "Cardinalidade: Um-para-muitos (Customers para Invoice); Direção de filtro cruzado: Único",
        "Cardinalidade: Um-para-um; Direção de filtro cruzado: Ambos",
        "Cardinalidade: Um-para-muitos (Invoice para Customers); Direção de filtro cruzado: Único"
      ],
      "correta": 1,
      "explicacao": "Como um cliente pode ter muitas faturas, a cardinalidade é um-para-muitos de Customers (lado 'um') para Invoice (lado 'muitos'). Filtro Único é preferido para performance, pois filtros bidirecionais podem criar ambiguidade e prejudicar o desempenho do modelo."
    },
    {
      "pergunta": "Qual função DAX pode ser usada para ativar relacionamentos inativos em um modelo de dados?",
      "opcoes": [
        "RELATED",
        "RELATEDTABLE",
        "USERELATIONSHIP",
        "ACTIVATE"
      ],
      "correta": 2,
      "explicacao": "USERELATIONSHIP() permite especificar qual relacionamento usar em um cálculo DAX, incluindo relacionamentos inativos. É especialmente útil em modelos com role-playing dimensions (como múltiplas datas) onde você precisa ativar um relacionamento alternativo para um cálculo específico."
    },
    {
      "pergunta": "Qual das seguintes afirmações é verdadeira sobre o fluxo de filtros (filter flow) em relacionamentos do Power BI?",
      "opcoes": [
        "Por padrão, o filtro aponta do lado 'um' para o lado 'muitos'",
        "Quando você filtra uma tabela, o contexto de filtro é passado para todas as tabelas 'downstream' relacionadas",
        "Os filtros não podem fluir 'upstream' (contra a direção da seta)",
        "Todas as alternativas acima"
      ],
      "correta": 3,
      "explicacao": "Todas são verdadeiras: por padrão, os filtros fluem do lado 'um' (dimensões) para o lado 'muitos' (fatos). O contexto de filtro se propaga para tabelas downstream (seguindo a direção da seta). Filtros não fluem upstream (contra a seta) sem filtros bidirecionais."
    },
    {
      "pergunta": "Em um relacionamento um-para-muitos, ao que o 'muitos' está associado?",
      "opcoes": [
        "Chave primária",
        "Chave estrangeira",
        "Coluna de índice",
        "Tabela de consulta (lookup)"
      ],
      "correta": 1,
      "explicacao": "Em um relacionamento um-para-muitos, o lado 'um' é a chave primária (valores únicos na tabela de dimensão) e o lado 'muitos' é a chave estrangeira (valores que se repetem na tabela de fatos). A cardinalidade refere-se à unicidade dos valores na coluna."
    },
    {
      "pergunta": "Qual é o nome da coluna ou campo usado para identificar exclusivamente cada linha de uma tabela?",
      "opcoes": [
        "Chave primária (Primary key)",
        "Chave estrangeira (Foreign key)",
        "Chave nativa (Native key)",
        "Chave única (Unique key)"
      ],
      "correta": 0,
      "explicacao": "A chave primária identifica exclusivamente cada linha de uma tabela e corresponde às chaves estrangeiras nas tabelas de dados relacionadas. Em tabelas de dimensão, a chave primária é o campo que liga a dimensão à tabela de fatos."
    },
    {
      "pergunta": "Qual dos seguintes campos seria tipicamente encontrado em uma tabela de dados (fatos) em um modelo Power BI?",
      "opcoes": [
        "Nome do produto",
        "Preço de varejo",
        "Quantidade vendida",
        "Marca do produto"
      ],
      "correta": 2,
      "explicacao": "Tabelas de fatos contêm métricas mensuráveis do negócio, como 'Quantidade Vendida', 'Valor da Venda', 'Custo'. Já nome do produto, preço de varejo e marca do produto são atributos descritivos que pertencem à tabela de dimensão de Produtos."
    },
    {
      "pergunta": "Qual destas NÃO é uma boa prática de modelagem de dados no Power BI?",
      "opcoes": [
        "Usar esquema estrela com relacionamentos muitos-para-muitos",
        "Usar relacionamentos com filtros unidirecionais",
        "Ter tabelas que servem propósitos específicos (fatos e dimensões)",
        "Incluir apenas os dados necessários para análise"
      ],
      "correta": 0,
      "explicacao": "Relacionamentos muitos-para-muitos devem ser evitados no esquema estrela. Um modelo bem projetado usa relacionamentos um-para-muitos (1:*) entre tabelas de dimensão (1) e tabelas de fatos (*). Muitos-para-muitos podem causar problemas de ambiguidade e desempenho."
    },
    {
      "pergunta": "O que transforma uma coleção de tabelas independentes em um modelo de dados no Power BI?",
      "opcoes": [
        "Conectar as tabelas via relacionamentos baseados em seus campos comuns",
        "Conectar às tabelas em um único arquivo Power BI",
        "Mesclar as tabelas em uma única tabela mestre",
        "Dar nomes relacionados às tabelas"
      ],
      "correta": 0,
      "explicacao": "Um modelo de dados é criado ao conectar tabelas através de relacionamentos baseados em campos comuns (chaves primária e estrangeira). Os relacionamentos permitem que os filtros fluam entre as tabelas e que os cálculos DAX naveguem pelo modelo."
    },
    {
      "pergunta": "Que tipo de tabela armazena detalhes sobre entidades de negócio como clientes, produtos ou localizações?",
      "opcoes": [
        "Tabela de fatos",
        "Tabela de dimensão",
        "Tabela de datas",
        "Tabela de dados"
      ],
      "correta": 1,
      "explicacao": "Tabelas de dimensão armazenam detalhes sobre entidades de negócio (atributos descritivos). Por exemplo: tabela de Clientes (nome, endereço, segmento), tabela de Produtos (nome, categoria, preço), tabela de Locais (cidade, estado, país)."
    },
    {
      "pergunta": "Uma dimensão que pode filtrar fatos relacionados de formas diferentes é chamada de quê?",
      "opcoes": [
        "Dimensão de interpretação múltipla (Role-playing dimension)",
        "Dimensão floco de neve (Snowflake dimension)",
        "Dimensão degenerada (Degenerate dimension)",
        "Dimensão conformada (Conformed dimension)"
      ],
      "correta": 0,
      "explicacao": "Uma Role-playing dimension (dimensão de interpretação múltipla) é uma tabela de dimensão, como uma tabela de datas, que pode ser usada várias vezes no mesmo modelo com diferentes papéis. Por exemplo, uma tabela de datas pode ser usada como 'Data do Pedido', 'Data de Entrega' e 'Data de Envio'."
    },
    {
      "pergunta": "Como se chama quando múltiplos registros de uma tabela estão associados a múltiplos registros de outra tabela?",
      "opcoes": [
        "Relacionamento muitos-para-muitos",
        "Relacionamento um-para-muitos",
        "Relacionamento muitos-para-um",
        "Relacionamento um-para-um"
      ],
      "correta": 0,
      "explicacao": "Um relacionamento muitos-para-muitos (many-to-many) ocorre quando múltiplos registros de uma tabela podem estar relacionados com múltiplos registros de outra. No Power BI, esses relacionamentos têm cardinalidade muitos-para-muitos e geralmente requerem uma tabela ponte."
    },
    {
      "pergunta": "Qual é a diferença entre uma tabela de fatos e uma tabela de dimensão no modelo de dados?",
      "opcoes": [
        "Tabelas de fatos armazenam observações ou eventos; tabelas de dimensão contêm informações sobre entidades específicas nos dados",
        "Tabelas de fatos contêm informações sobre entidades; tabelas de dimensão contêm dados observacionais",
        "Tabelas de dimensão definem papéis no Power BI; tabelas de fatos fornecem fatos associados",
        "Não há diferença entre elas"
      ],
      "correta": 0,
      "explicacao": "Tabelas de fatos armazenam observações ou eventos mensuráveis (transações, vendas, logs), geralmente com valores numéricos. Tabelas de dimensão descrevem entidades do negócio (produtos, clientes, locais) com atributos que contextualizam os fatos."
    },
    {
      "pergunta": "Quais são os dois tipos de tabelas em um esquema estrela (star schema)?",
      "opcoes": [
        "Tabelas ativas e inativas",
        "Tabelas de dados qualitativos e quantitativos",
        "Tabelas de fatos e tabelas de dimensão",
        "Tabelas primárias e secundárias"
      ],
      "correta": 2,
      "explicacao": "Um esquema estrela é composto por dois tipos de tabelas: tabelas de fatos (que armazenam métricas e eventos como vendas, transações) e tabelas de dimensão (que armazenam atributos descritivos como produtos, clientes, datas)."
    },
    {
      "pergunta": "O que é o contexto de filtro (filter context) no DAX?",
      "opcoes": [
        "O código M que filtra dados no Power Query",
        "O conjunto de filtros ativos que determinam quais dados são incluídos em um cálculo DAX, incluindo filtros de relatório, segmentadores, hierarquias visuais e relacionamentos",
        "Uma função específica do DAX para filtrar tabelas",
        "O filtro de linhas aplicado por regras RLS"
      ],
      "correta": 1,
      "explicacao": "O contexto de filtro é o conjunto de todos os filtros ativos quando uma medida DAX é avaliada. Inclui filtros aplicados por slicers, filtros de página, filtros de relatório, seleções em visuais e filtros propagados por relacionamentos entre tabelas."
    },
    {
      "pergunta": "Qual função DAX é usada para criar uma medida que retorna o total acumulado no ano (YTD - Year to Date)?",
      "opcoes": [
        "TOTALYTD()",
        "SUMYTD()",
        "YEARTODATE()",
        "CUMULATIVESUM()"
      ],
      "correta": 0,
      "explicacao": "TOTALYTD() é a função de inteligência de tempo DAX que calcula o valor acumulado do início do ano até a data atual no contexto do filtro. Requer uma tabela de datas marcada como tabela de datas."
    },
    {
      "pergunta": "O que é uma tabela de fatos (fact table) em um modelo de dados do Power BI?",
      "opcoes": [
        "Uma tabela que armazena informações descritivas como nomes de clientes e endereços",
        "Uma tabela que contém dados de transações ou eventos mensuráveis, normalmente com chaves estrangeiras para tabelas de dimensão",
        "Uma tabela criada automaticamente pelo Power BI para cada relatório",
        "Uma tabela que armazena apenas dados verdadeiros, sem valores nulos"
      ],
      "correta": 1,
      "explicacao": "Tabelas de fatos contêm dados de transações ou eventos mensuráveis (vendas, pedidos, etc.) com métricas numéricas e chaves estrangeiras que se relacionam com tabelas de dimensão. São o centro do esquema estrela."
    },
    {
      "pergunta": "O que é uma dimensão de mudança lenta (Slowly Changing Dimension - SCD) Tipo 2 no contexto de modelagem de dados?",
      "opcoes": [
        "Uma dimensão que nunca muda",
        "Uma dimensão que sobrescreve os valores antigos quando há mudanças",
        "Uma dimensão que mantém o histórico de mudanças criando novos registros com data de início/fim de validade",
        "Uma dimensão que agrega dados históricos em média"
      ],
      "correta": 2,
      "explicacao": "SCD Tipo 2 mantém o histórico completo de mudanças. Quando um atributo muda, um novo registro é criado com a nova versão, e o registro antigo é marcado como inativo com data de fim. Isso permite análises históricas precisas."
    },
    {
      "pergunta": "Qual é a diferença entre Mesclar Consultas (Merge) e Acrescentar Consultas (Append) no Power Query?",
      "opcoes": [
        "Não há diferença, ambas combinam dados da mesma forma",
        "Mesclar combina colunas de tabelas diferentes (como JOIN no SQL); Acrescentar empilha linhas de tabelas com a mesma estrutura (como UNION)",
        "Acrescentar combina colunas; Mesclar empilha linhas",
        "Mesclar é usado para dados numéricos; Acrescentar para dados textuais"
      ],
      "correta": 1,
      "explicacao": "Mesclar Consultas (Merge) é equivalente a um JOIN SQL - combina colunas de tabelas relacionadas por uma chave. Acrescentar Consultas (Append) é como UNION SQL - empilha linhas de tabelas com a mesma estrutura de colunas."
    },
    {
      "pergunta": "Qual função DAX calcula a soma de uma expressão avaliada para cada linha de uma tabela?",
      "opcoes": [
        "SUM()",
        "SUMX()",
        "CALCULATE(SUM())",
        "TOTALSUM()"
      ],
      "correta": 1,
      "explicacao": "SUMX() é uma função de iteração que avalia uma expressão para cada linha de uma tabela e depois soma os resultados. É diferente de SUM() que apenas soma uma coluna existente."
    },
    {
      "pergunta": "Qual propriedade de relacionamento no Power BI controla a direção em que os filtros se propagam entre as tabelas?",
      "opcoes": [
        "Cardinalidade",
        "Direção do filtro cruzado",
        "Ativo/Inativo",
        "Integridade referencial"
      ],
      "correta": 1,
      "explicacao": "A Direção do filtro cruzado (Cross filter direction) controla como os filtros se propagam entre tabelas relacionadas. Pode ser 'Única' (da tabela de um lado para o lado múltiplo) ou 'Ambas' (bidirecional)."
    },
    {
      "pergunta": "Qual é a diferença entre uma coluna calculada e uma medida no Power BI?",
      "opcoes": [
        "Colunas calculadas são calculadas no momento da consulta; medidas são calculadas durante a importação",
        "Colunas calculadas são armazenadas no modelo e calculadas durante a atualização de dados; medidas são calculadas dinamicamente durante a consulta",
        "Não há diferença, são equivalentes em funcionalidade e desempenho",
        "Medidas só podem usar funções de agregação; colunas calculadas podem usar qualquer função DAX"
      ],
      "correta": 1,
      "explicacao": "Colunas calculadas são computadas durante a atualização de dados e armazenadas no modelo (ocupam memória). Medidas são calculadas dinamicamente em tempo de consulta, o que as torna mais eficientes para dados grandes."
    },
    {
      "pergunta": "O que é uma tabela de datas (Date table) no Power BI e por que ela é importante?",
      "opcoes": [
        "Uma tabela que armazena as datas de criação dos relatórios",
        "Uma tabela com uma linha para cada data em um intervalo contínuo, usada para habilitar a inteligência de tempo DAX",
        "Uma tabela que registra quando os dados foram importados",
        "Uma tabela automática criada pelo Power BI para cada coluna de data"
      ],
      "correta": 1,
      "explicacao": "Uma tabela de datas é uma tabela de dimensão com uma linha para cada data em um intervalo contínuo e sem lacunas. É necessária para usar funções de inteligência de tempo DAX como TOTALYTD, SAMEPERIODLASTYEAR, etc."
    },
    {
      "pergunta": "Qual função DAX deve ser usada para calcular uma medida ignorando todos os filtros aplicados ao contexto atual?",
      "opcoes": [
        "ALL()",
        "REMOVEFILTERS()",
        "ALLEXCEPT()",
        "CALCULATE() com ALL()"
      ],
      "correta": 3,
      "explicacao": "CALCULATE() com ALL() como modificador de filtro remove todos os filtros do contexto atual e calcula a expressão no contexto expandido sem filtros."
    },
    {
      "pergunta": "Qual tipo de relacionamento no Power BI permite que um valor em uma coluna apareça mais de uma vez em ambas as tabelas relacionadas?",
      "opcoes": [
        "Um-para-um (1:1)",
        "Um-para-muitos (1:N)",
        "Muitos-para-muitos (M:M)",
        "Nenhum relacionamento"
      ],
      "correta": 2,
      "explicacao": "O relacionamento muitos-para-muitos (M:M) permite que valores apareçam múltiplas vezes em ambas as tabelas. Deve ser usado com cautela pois pode causar problemas de desempenho e ambiguidade."
    },
    {
      "pergunta": "Qual é o benefício de usar um modelo estrela (star schema) no Power BI?",
      "opcoes": [
        "Permite armazenar mais dados do que um modelo normalizado",
        "Melhora o desempenho das consultas e simplifica as fórmulas DAX",
        "Elimina a necessidade de relacionamentos entre tabelas",
        "Permite conectar-se a mais fontes de dados simultaneamente"
      ],
      "correta": 1,
      "explicacao": "O esquema estrela melhora o desempenho das consultas ao minimizar junções complexas e simplifica as fórmulas DAX porque as relações são mais diretas e previsíveis."
    },
    {
      "pergunta": "Qual função DAX retorna uma tabela de resumo de valores totais em várias categorias?",
      "opcoes": [
        "SUMMARIZE",
        "GROUPBY",
        "ADDCOLUMNS",
        "SUMMARIZECOLUMNS"
      ],
      "correta": 3,
      "explicacao": "SUMMARIZECOLUMNS é a função DAX preferida para criar tabelas de resumo com múltiplos agrupamentos, sendo mais eficiente que SUMMARIZE em muitos cenários."
    },
    {
      "question": "Por que é preferível usar um esquema estrela (Star Schema) com tabelas de fato e dimensão separadas em vez de uma única tabela desnormalizada no Power BI?",
      "options": [
        "É obrigatório pelo Power BI, que não aceita tabelas desnormalizadas",
        "Reduz a redundância de dados, melhora a compactação VertiPaq e a performance das medidas DAX",
        "Permite usar o modo DirectQuery",
        "Habilita RLS automaticamente"
      ],
      "answer": 1,
      "explanation": "O Star Schema melhora a eficiência do motor VertiPaq (compactação por coluna), reduz o tamanho do modelo, e simplifica a escrita de medidas DAX. É a arquitetura recomendada para modelos Power BI."
    },
    {
      "question": "Qual é a diferença fundamental entre uma Medida (Measure) e uma Coluna Calculada (Calculated Column) no DAX?",
      "options": [
        "Medidas são mais rápidas; Colunas Calculadas são mais lentas",
        "Medidas são calculadas em tempo de consulta com contexto de filtro dinâmico; Colunas Calculadas são calculadas no carregamento e armazenadas no modelo",
        "Colunas Calculadas suportam funções de inteligência de tempo; Medidas não",
        "Não há diferença funcional, apenas de sintaxe"
      ],
      "answer": 1,
      "explanation": "Colunas Calculadas são computadas durante o carregamento/atualização e seus valores ficam armazenados no modelo. Medidas são calculadas dinamicamente em cada consulta, respondendo ao contexto de filtro atual."
    },
    {
      "question": "Qual função DAX é utilizada para modificar o contexto de filtro de uma expressão?",
      "options": [
        "FILTER()",
        "CALCULATE()",
        "ALL()",
        "ALLEXCEPT()"
      ],
      "answer": 1,
      "explanation": "CALCULATE() é a função central do DAX para modificar o contexto de filtro. Ela avalia uma expressão no contexto modificado pelos filtros adicionais fornecidos como argumentos."
    },
    {
      "question": "Para que as funções de inteligência de tempo (TOTALYTD, SAMEPERIODLASTYEAR, etc.) funcionem corretamente, o que é necessário na tabela de datas?",
      "options": [
        "A tabela deve ter exatamente 365 linhas por ano",
        "A tabela deve ser marcada como 'Tabela de Data' (Mark as Date Table) e ter uma coluna de data sem lacunas",
        "A tabela de datas deve estar em modo DirectQuery",
        "A coluna de data deve se chamar 'Date' obrigatoriamente"
      ],
      "answer": 1,
      "explanation": "A tabela de datas precisa: (1) ser marcada como 'Tabela de Data', (2) ter uma coluna do tipo Date, (3) conter datas contíguas sem lacunas para o período de análise."
    },
    {
      "question": "Você tem as tabelas: Vendas (N) relacionada com Produto (1) e Produto (1) relacionada com Categoria (1). Por padrão, um filtro em Categoria se propaga até Vendas automaticamente. Isso se chama:",
      "options": [
        "Filtro bidirecional",
        "Propagação de filtro em cadeia (Filter context propagation)",
        "RLS em cascata",
        "Contexto de linha"
      ],
      "answer": 1,
      "explanation": "Em um relacionamento 1:N, os filtros se propagam automaticamente do lado 1 (dimensão) para o lado N (fato), percorrendo toda a cadeia de relacionamentos. Esse comportamento é fundamental no Power BI."
    },
    {
      "question": "Qual é a PRINCIPAL consequência negativa de habilitar o filtro bidirecional em relacionamentos de um modelo complexo?",
      "options": [
        "Melhora a performance mas aumenta o tamanho do arquivo",
        "Pode causar ambiguidade nos caminhos de filtro, resultados incorretos e degradação de performance",
        "Impede o uso de RLS",
        "Desativa o Query Folding"
      ],
      "answer": 1,
      "explanation": "Filtros bidirecionais podem criar múltiplos caminhos de filtro, gerando ambiguidade. O Power BI pode não saber qual caminho usar, causando resultados imprevistos. Devem ser usados com cautela."
    },
    {
      "question": "Você deseja que cada usuário veja apenas os dados da sua região ao acessar um relatório. O email do usuário autenticado deve ser comparado com uma coluna Email na tabela Regiões. Qual função DAX usar na regra RLS?",
      "options": [
        "USERNAME()",
        "USERPRINCIPALNAME()",
        "CURRENTUSER()",
        "USERENV()"
      ],
      "answer": 1,
      "explanation": "USERPRINCIPALNAME() retorna o endereço de email do usuário autenticado no Power BI Service (formato user@domain.com), ideal para implementar RLS dinâmico comparando com dados da tabela."
    },
    {
      "question": "Na tabela Vendas (lado N do relacionamento), você quer criar uma coluna calculada que traga o Nome da tabela Produto (lado 1). Qual função DAX usar?",
      "options": [
        "RELATEDTABLE()",
        "RELATED()",
        "LOOKUPVALUE()",
        "CALCULATE(SELECTEDVALUE(...))"
      ],
      "answer": 1,
      "explanation": "RELATED() navega do lado N de um relacionamento para o lado 1, retornando um valor escalar da tabela relacionada. RELATEDTABLE() faz o oposto, retornando uma tabela do lado N para o lado 1."
    },
    {
      "question": "Qual das seguintes expressões DAX calcula o Total de Vendas acumulado no ano (Year-to-Date)?",
      "options": [
        "CALCULATE([Total Vendas], YEAR(Calendario[Date]) = YEAR(TODAY()))",
        "TOTALYTD([Total Vendas], Calendario[Date])",
        "SUMX(DATESYTD(Calendario[Date]), [Total Vendas])",
        "Apenas a opção B está correta"
      ],
      "answer": 1,
      "explanation": "TOTALYTD([Medida], Tabela[Data]) é a forma mais direta de calcular YTD. Também é possível usar CALCULATE([Total Vendas], DATESYTD(Calendario[Date])), que é equivalente."
    },
    {
      "question": "Por que é preferível usar DIVIDE(Numerador, Denominador, [AlternativeResult]) em vez do operador '/' no DAX?",
      "options": [
        "DIVIDE é mais rápido que o operador '/'",
        "DIVIDE trata automaticamente a divisão por zero, retornando BLANK() ou o resultado alternativo definido",
        "DIVIDE é necessário para medidas visíveis no relatório",
        "Não há diferença entre DIVIDE e o operador '/'"
      ],
      "answer": 1,
      "explanation": "O operador '/' retorna um erro quando o denominador é zero. DIVIDE() retorna BLANK() (ou um valor alternativo opcional), tornando as medidas mais robustas sem necessidade de verificações adicionais."
    },
    {
      "question": "Você tem uma tabela Vendas com duas colunas de data: DataVenda e DataEntrega, ambas relacionadas à tabela Calendário. Apenas uma relação pode ser ativa. Como usar a relação inativa em uma medida DAX?",
      "options": [
        "Criar uma segunda tabela Calendário duplicada",
        "Usar USERELATIONSHIP() dentro de CALCULATE()",
        "Deletar a relação ativa e ativar a inativa",
        "Usar CROSSFILTER() na relação inativa"
      ],
      "answer": 1,
      "explanation": "USERELATIONSHIP(Tabela1[Coluna], Tabela2[Coluna]) dentro de CALCULATE() ativa temporariamente uma relação inativa para o escopo daquela medida, sem afetar outras medidas."
    },
    {
      "question": "Qual é o cenário mais adequado para criar uma Tabela Calculada (Calculated Table) no DAX?",
      "options": [
        "Para realizar todas as transformações de dados, substituindo o Power Query",
        "Para criar tabelas auxiliares como tabela de datas, tabelas de parâmetros What-if ou tabelas de suporte a cálculos",
        "Sempre que precisar de uma nova dimensão",
        "Para melhorar a performance de medidas complexas"
      ],
      "answer": 1,
      "explanation": "Tabelas Calculadas são criadas em DAX e são úteis para: tabela de datas (CALENDARAUTO), tabelas de parâmetros, tabelas auxiliares para cálculos específicos ou seleções de valores únicos (ALL/VALUES/DISTINCT)."
    },
    {
      "question": "Qual é o resultado de CALCULATE([Total Vendas], ALL(Produto)) em um contexto onde Produto[Categoria] = 'Eletrônicos' está filtrado?",
      "options": [
        "Retorna o total de vendas apenas para Eletrônicos",
        "Remove o filtro de Produto e retorna o total de vendas de todos os produtos",
        "Retorna BLANK() pois ALL() remove todos os filtros",
        "Gera um erro de circular dependency"
      ],
      "answer": 1,
      "explanation": "ALL(Produto) remove todos os filtros aplicados na tabela Produto, fazendo CALCULATE() ignorar o contexto de filtro de Categoria. O resultado é o total geral de vendas, independente do produto/categoria."
    },
    {
      "question": "Você precisa criar uma medida que calcule a porcentagem de vendas de cada produto em relação ao total geral. Qual é a fórmula correta?",
      "options": [
        "[Total Vendas] / MAX([Total Vendas])",
        "DIVIDE([Total Vendas], CALCULATE([Total Vendas], ALL(Produto)))",
        "DIVIDE([Total Vendas], SUM(Vendas[Valor]))",
        "[Total Vendas] / TOTALYTD([Total Vendas], Calendario[Date])"
      ],
      "answer": 1,
      "explanation": "CALCULATE([Total Vendas], ALL(Produto)) calcula o total sem filtro de produto (total geral). DIVIDE(...) então calcula a proporção de cada produto, tratando divisão por zero."
    },
    {
      "question": "O que é 'contexto de iteração' (row context) no DAX e quando ele existe?",
      "options": [
        "É o filtro aplicado pelos slicers no relatório",
        "É o contexto criado por funções iteradoras (SUMX, AVERAGEX, etc.) ou em colunas calculadas, onde cada linha da tabela é processada individualmente",
        "É o contexto de filtro da sessão atual do usuário",
        "É criado apenas pelo CALCULATE()"
      ],
      "answer": 1,
      "explanation": "O contexto de linha (row context) é criado automaticamente em colunas calculadas (para cada linha da tabela) e por funções iteradoras como SUMX, MINX, MAXX, FILTER, etc."
    },
    {
      "question": "Qual é a diferença entre FILTER(ALL(Tabela), condição) e FILTER(Tabela, condição) dentro de um CALCULATE()?",
      "options": [
        "Não há diferença funcional",
        "FILTER(ALL(Tabela)) ignora filtros externos e filtra toda a tabela; FILTER(Tabela) respeita os filtros do contexto atual antes de aplicar a condição",
        "FILTER(Tabela) é mais lento",
        "FILTER(ALL) só funciona com tabelas de fato"
      ],
      "answer": 1,
      "explanation": "FILTER(ALL(Tabela), condição) sempre filtra toda a tabela, independente de filtros externos. FILTER(Tabela, condição) aplica a condição sobre os dados já filtrados pelo contexto, podendo retornar subconjuntos menores."
    },
    {
      "question": "Você precisa criar uma medida que retorne as vendas do mesmo período do ano anterior. Qual função de inteligência de tempo usar?",
      "options": [
        "PREVIOUSYEAR()",
        "DATEADD(Calendario[Date], -1, YEAR)",
        "SAMEPERIODLASTYEAR(Calendario[Date])",
        "PARALLELPERIOD(Calendario[Date], -12, MONTH)"
      ],
      "answer": 2,
      "explanation": "SAMEPERIODLASTYEAR(Calendario[Date]) retorna uma tabela com as datas do mesmo período do ano anterior, usada dentro de CALCULATE() para calcular métricas comparativas com o ano anterior."
    },
    {
      "question": "O que são Aggregations (Agregações) no Power BI e qual é o seu principal benefício?",
      "options": [
        "São resumos automáticos criados pelo Power BI para gráficos",
        "São tabelas pré-agregadas que o Power BI usa para responder consultas de alto nível sem varrer a tabela de fato completa, melhorando dramaticamente a performance",
        "São medidas DAX que usam SUMMARIZE()",
        "São índices criados no banco de dados fonte"
      ],
      "answer": 1,
      "explanation": "Agregações são tabelas com dados sumarizados que o Power BI usa automaticamente quando uma consulta pode ser respondida por elas. A tabela de fato detalhada ainda existe e é usada quando necessário (drill-through)."
    },
    {
      "question": "Quando é mais indicado usar uma Coluna Calculada em vez de uma Medida no DAX?",
      "options": [
        "Sempre que o cálculo for complexo",
        "Quando você precisa usar o resultado como eixo, legenda, slicer ou filtro em visuais, pois medidas não podem ser usadas nesses contextos diretamente",
        "Quando quer melhores resultados de performance",
        "Quando trabalha com DirectQuery"
      ],
      "answer": 1,
      "explanation": "Colunas Calculadas são armazenadas no modelo e podem ser usadas como campo em eixos de gráficos, filtros, slicers e legendas. Medidas são valores agregados e não podem ser usados diretamente nessas posições."
    },
    {
      "question": "O que é um modelo Composto (Composite Model) no Power BI?",
      "options": [
        "Um modelo que usa apenas tabelas calculadas DAX",
        "Um modelo que combina tabelas em modo Import e DirectQuery na mesma solução",
        "Um modelo com mais de 100 tabelas",
        "Um modelo que usa RLS em todas as tabelas"
      ],
      "answer": 1,
      "explanation": "Modelos Compostos permitem combinar Import e DirectQuery na mesma solução. Por exemplo: dimensões em Import (rápidas) e tabelas de fato em DirectQuery (sempre atualizadas), obtendo o melhor dos dois mundos."
    },
    {
      "question": "Qual função DAX retorna o número de linhas de uma tabela, respeitando o contexto de filtro atual?",
      "options": [
        "COUNT()",
        "COUNTA()",
        "COUNTROWS()",
        "DISTINCTCOUNT()"
      ],
      "answer": 2,
      "explanation": "COUNTROWS(Tabela) conta o número de linhas da tabela no contexto de filtro atual. COUNT() conta valores não vazios em uma coluna. DISTINCTCOUNT() conta valores únicos."
    },
    {
      "question": "O que é 'Expanded Table' (tabela expandida) no contexto de relacionamentos DAX?",
      "options": [
        "Uma tabela com colunas calculadas adicionais",
        "Uma tabela que inclui implicitamente as colunas de todas as tabelas relacionadas a ela pelo lado '1', permitindo filtros em cadeia",
        "Uma tabela após operação Unpivot",
        "Uma tabela com mais de 1 milhão de linhas"
      ],
      "answer": 1,
      "explanation": "No modelo DAX, cada tabela é 'expandida' para incluir as colunas das tabelas do lado '1' dos relacionamentos. Isso explica como os filtros se propagam automaticamente de dimensões para fatos."
    },
    {
      "question": "Qual é o objetivo da função ALLEXCEPT(Tabela, Coluna1, Coluna2) no DAX?",
      "options": [
        "Remove todos os filtros da tabela, exceto os especificados nas colunas indicadas",
        "Filtra a tabela mantendo apenas as colunas especificadas",
        "Remove duplicatas, mantendo apenas as colunas especificadas",
        "Cria um contexto de linha para as colunas especificadas"
      ],
      "answer": 0,
      "explanation": "ALLEXCEPT(Tabela, Col1, Col2) remove todos os filtros da tabela, preservando apenas os filtros nas colunas especificadas. Útil para criar totais parciais que ignoram alguns filtros mas mantêm outros."
    },
    {
      "question": "Você precisa calcular o ranking de cada produto por vendas dentro de sua categoria. Qual função DAX usar?",
      "options": [
        "RANK.EQ()",
        "RANKX(FILTER(ALL(Produto), Produto[Categoria] = MAX(Produto[Categoria])), [Total Vendas])",
        "TOPN()",
        "RANKX(ALL(Produto), [Total Vendas])"
      ],
      "answer": 1,
      "explanation": "RANKX() com um contexto de filtro adequado (usando FILTER para limitar ao domínio de ranking desejado) é a forma correta de calcular ranking dentro de um grupo no DAX."
    },
    {
      "question": "O que são Grupos de Cálculo (Calculation Groups) no Power BI e qual problema eles resolvem?",
      "options": [
        "São grupos de medidas organizadas em pastas de exibição",
        "Permitem criar uma dimensão dinâmica que aplica diferentes cálculos (YTD, MoM, PY etc.) a qualquer medida base, eliminando duplicação de medidas",
        "São filtros avançados aplicados a grupos de visuais",
        "São conjuntos de regras RLS agrupadas"
      ],
      "answer": 1,
      "explanation": "Grupos de Cálculo permitem definir 'itens de cálculo' (ex.: Atual, YTD, Ano Anterior, % Variação) que se aplicam dinamicamente a qualquer medida. Evitam criar dezenas de medidas para cada combinação de KPI + período."
    },
    {
      "question": "Qual é a função do parâmetro 'What-if' no Power BI e como ele é implementado?",
      "options": [
        "Simula diferentes cenários de dados conectando a fontes alternativas",
        "Cria uma tabela calculada com uma sequência de valores e uma medida associada, permitindo que o usuário ajuste um valor via slicer e veja o impacto nos cálculos",
        "É um recurso exclusivo do Power BI Premium",
        "Permite simular dados sem conexão com a fonte original"
      ],
      "answer": 1,
      "explanation": "O parâmetro What-if cria: (1) uma tabela calculada com valores (ex.: percentual de desconto de 0% a 30%), (2) uma medida de valor selecionado, e (3) um slicer. O usuário ajusta o slicer e as medidas que referenciam o parâmetro se recalculam."
    },
    {
      "question": "Por que é importante que a tabela de calendário (Date Table) seja marcada explicitamente como 'Mark as Date Table' no Power BI?",
      "options": [
        "Para habilitar a interface de calendário nos slicers de data",
        "Para garantir que as funções de inteligência de tempo funcionem corretamente, validando que a tabela tem datas contíguas sem lacunas",
        "Para ativar o modo DirectQuery na tabela",
        "Para habilitar a formatação de data nos visuais"
      ],
      "answer": 1,
      "explanation": "Marcar como 'Tabela de Data' permite ao DAX validar que a tabela atende os requisitos (coluna Date, sem lacunas, sem duplicatas) e garante o comportamento correto das funções de inteligência de tempo em cenários de filtro de data."
    },
    {
      "question": "Qual é a diferença entre relacionamentos 1:1 e N:N (muitos para muitos) no Power BI?",
      "options": [
        "1:1 é mais eficiente; N:N é mais flexível para modelagem",
        "Em 1:1 cada valor da coluna de junção aparece uma vez em ambas as tabelas; em N:N os valores podem aparecer múltiplas vezes em ambos os lados, requerendo tratamento especial de filtro",
        "N:N não é suportado no Power BI",
        "1:1 requer RLS; N:N não"
      ],
      "answer": 1,
      "explanation": "Relacionamentos N:N (muitos para muitos) no Power BI são suportados diretamente (sem tabela ponte obrigatória), mas podem causar double-counting e comportamentos de filtro inesperados se não forem bem compreendidos."
    },
    {
      "question": "O que são Field Parameters (Parâmetros de Campo) no Power BI e qual é seu caso de uso principal?",
      "options": [
        "São parâmetros para conexão com fontes de dados variáveis",
        "Permitem que o usuário final selecione quais campos (colunas ou medidas) são exibidos em um visual via slicer, tornando o relatório mais interativo e flexível",
        "São variáveis DAX reutilizáveis entre medidas",
        "São filtros avançados aplicados por campos específicos"
      ],
      "answer": 1,
      "explanation": "Field Parameters criam um 'slicer de campos' que permite ao usuário escolher quais métricas ou dimensões ver em um gráfico. Por exemplo: alternar entre Vendas, Margem e Quantidade no eixo Y de um gráfico de barras."
    },
    {
      "question": "Qual é o impacto de ter muitas Colunas Calculadas no modelo do Power BI em termos de performance?",
      "options": [
        "Nenhum impacto, pois são calculadas apenas uma vez no carregamento",
        "Aumentam o tamanho do modelo em memória pois seus valores são armazenados no modelo VertiPaq, e aumentam o tempo de atualização pois precisam ser recalculadas a cada refresh",
        "Diminuem a performance apenas de relatórios com muitas páginas",
        "Impactam apenas o modo DirectQuery"
      ],
      "answer": 1,
      "explanation": "Colunas Calculadas armazenam um valor por linha no modelo VertiPaq, aumentando o consumo de memória. Além disso, são recalculadas a cada atualização de dados, aumentando o tempo total do refresh."
    },
    {
      "question": "Considere as seguintes expressões DAX criadas em um modelo: Medida A = SUMX(Cliente, [Total Vendas]) e Medida B = SUMX(Cliente, SUM(Vendas[Valor])). Sabendo que [Total Vendas] é uma medida pré-existente definida por SUM(Vendas[Valor]), qual a diferença de comportamento entre as duas medidas em termos de contexto?",
      "options": [
        "Elas retornam exatamente o mesmo valor em qualquer contexto visual do relatório",
        "A Medida A realiza uma transição de contexto, transformando o contexto de linha do SUMX em contexto de filtro para calcular as vendas de cada cliente; A Medida B calcula as vendas totais de todos os clientes para cada linha de iteração",
        "A Medida B realiza transição de contexto; A Medida A gera um produto cartesiano",
        "A Medida A é estritamente mais lenta porque chama uma submedida redundante"
      ],
      "answer": 1,
      "explanation": "Medidas chamadas dentro de funções iteradoras (como SUMX) ou colunas calculadas possuem um CALCULATE implícito em sua execução. Isso ativa a 'Transição de Contexto', que converte o contexto de linha (cada cliente atual) em contexto de filtro, isolando as vendas apenas do cliente atual. A Medida B usa a função bruta SUM, que não sofre transição de contexto e soma a tabela de vendas inteira para todas as iterações de cliente."
    },
    {
      "question": "Qual é o principal propósito da utilização da função DAX KEEPFILTERS() quando aplicada como argumento de filtro dentro de uma função CALCULATE()?",
      "options": [
        "Forçar o cálculo a rodar de forma síncrona no VertiPaq",
        "Preservar e mesclar os filtros existentes no contexto visual (ex: filtros de slicer ou linhas de tabela) em vez de substituí-los completamente com a condição de filtro do CALCULATE",
        "Impedir que usuários finais apliquem filtros no painel lateral de filtros",
        "Garantir RLS estático em colunas críticas"
      ],
      "answer": 1,
      "explanation": "Por padrão, se você filtrar um campo no CALCULATE (ex: CALCULATE([Total], Produto[Cor] = 'Azul')), esse filtro substitui qualquer outro filtro pré-existente de 'Cor' no contexto visual. Ao encapsular com KEEPFILTERS, as condições se mesclam (AND lógica), de modo que se o visual já estiver filtrado para 'Vermelho', o resultado será BLANK() em vez de 'Azul'."
    },
    {
      "question": "Você possui três relacionamentos mapeados entre a tabela Fato_Vendas e a dimensão Dim_Calendario baseados nas colunas DataPedido, DataEnvio e DataVencimento. Apenas o de DataPedido é ativo. Como você calcula as vendas associadas à DataEnvio em uma medida DAX sem duplicar tabelas?",
      "options": [
        "Usando a função RELATED(Dim_Calendario[Date])",
        "Usando CALCULATE([Total Vendas], USERELATIONSHIP(Fato_Vendas[DataEnvio], Dim_Calendario[Date]))",
        "Usando TREATAS para criar uma relação virtual",
        "Desativando a relação de DataPedido diretamente na visualização de modelo"
      ],
      "answer": 1,
      "explanation": "A função 'USERELATIONSHIP' dentro de 'CALCULATE' permite ativar temporariamente um relacionamento inativo para a duração exclusiva do cálculo daquela medida específica, desativando automaticamente o relacionamento ativo padrão."
    },
    {
      "question": "Você precisa criar um cálculo de Acumulado Corrente (Running Total) que mostre o crescimento acumulado das vendas à medida que o usuário seleciona ou altera filtros de segmentação (slicers). Onde e como esse cálculo deve ser criado?",
      "options": [
        "Como uma Coluna Calculada em DAX, pois colunas armazenam valores fisicamente no modelo",
        "Como uma Medida DAX, porque as medidas respondem dinamicamente ao contexto de filtro ativo gerado pelas seleções dos slicers no relatório",
        "Na fonte SQL usando a cláusula OVER (PARTITION BY)",
        "Como uma etapa de agrupamento recursiva no Power Query Editor"
      ],
      "answer": 1,
      "explanation": "Colunas calculadas são estáticas e calculadas apenas durante o refresh de dados. Como o cálculo de acumulado dinâmico precisa mudar instantaneamente com base no que o usuário seleciona nos slicers em tempo real, ele deve ser criado estritamente como uma Medida DAX."
    },
    {
      "question": "Você configurou RLS (Segurança em Nível de Linha) em um modelo contendo tabelas de Dimensão e Fato. Ao testar as regras RLS, você percebe que filtros de segurança aplicados a tabelas Fato precisam se propagar 'de volta' para filtrar as opções disponíveis na dimensão de Produtos. Qual configuração de relacionamento é obrigatória?",
      "options": [
        "Direção do filtro cruzado configurado como Único (Single)",
        "Marcar a opção 'Aplicar filtro de segurança em ambas as direções' (Apply security filter in both directions) nas propriedades do relacionamento",
        "Habilitar o Query Folding de segurança",
        "Marcar o relacionamento como inativo"
      ],
      "answer": 1,
      "explanation": "Por padrão, filtros se propagam do lado 1 (Dimensão) para o lado N (Fato). Se você define regras RLS que filtram a Fato e quer que isso filtre a dimensão 1, deve marcar explicitamente 'Aplicar filtro de segurança em ambas as direções' nas opções de relacionamento do Power BI Desktop."
    },
    {
      "question": "Qual é o comportamento do escopo de avaliação de Variáveis (VAR) declaradas no corpo de uma medida ou coluna calculada DAX?",
      "options": [
        "Elas são reavaliadas de forma lazy cada vez que são referenciadas no bloco RETURN",
        "Elas são avaliadas exatamente uma vez no momento de sua definição, armazenando o valor resultante no contexto em que a variável foi declarada (contexto de avaliação imutável)",
        "Elas mudam dinamicamente se encapsuladas por funções de modificação de filtro como CALCULATE",
        "São globais e podem ser referenciadas por outras medidas no modelo"
      ],
      "answer": 1,
      "explanation": "Em DAX, variáveis (VAR) são estáticas no escopo do cálculo. Elas são computadas uma única vez e armazenam o valor final resultante na etapa em que foram declaradas. O bloco RETURN apenas consome esse valor estático, ignorando quaisquer mudanças de contexto geradas posteriormente no código."
    },
    {
      "question": "Duas tabelas em seu modelo de dados não compartilham um relacionamento físico físico na aba de visualização de Modelo do Power BI Desktop, mas você precisa fazer uma medida filtrar uma tabela com base nas chaves de outra. Qual função DAX permite criar esse relacionamento virtual de alta performance?",
      "options": [
        "RELATEDTABLE()",
        "TREATAS()",
        "CROSSFILTER()",
        "INTERSECT()"
      ],
      "answer": 1,
      "explanation": "A função 'TREATAS' mapeia virtualmente o resultado de uma expressão de tabela como filtros em colunas de outra tabela não relacionada fisicamente. É a maneira mais otimizada e limpa de criar heranças de filtro virtuais em DAX."
    },
    {
      "question": "Para criar um relatório de análise financeira que exiba a Média Móvel de Vendas dos últimos 12 meses, qual função de inteligência de tempo DAX é ideal para gerar a janela temporal móvel?",
      "options": [
        "DATESYTD()",
        "DATESINPERIOD()",
        "SAMEPERIODLASTYEAR()",
        "DATEADD()"
      ],
      "answer": 1,
      "explanation": "A função 'DATESINPERIOD(Dates, StartDate, NumberOfPeriods, Interval)' é projetada para retornar uma tabela de datas que começa na data inicial indicada e se estende por um número e intervalo específicos de períodos (ex: -12 meses, 30 dias), ideal para janelas móveis (rolling/moving calculations)."
    },
    {
      "question": "Qual das seguintes características técnicas de uma coluna de dados possui o maior impacto negativo na eficiência de compactação de dicionário do motor VertiPaq de armazenamento em memória do Power BI?",
      "options": [
        "O tamanho total das strings de texto em bytes",
        "A alta Cardinalidade da coluna (número elevado de valores exclusivos/únicos)",
        "O fato de a coluna possuir valores nulos (BLANKs)",
        "O tipo de dados estar configurado como Número Inteiro (Integer) em vez de Decimal"
      ],
      "answer": 1,
      "explanation": "O motor VertiPaq usa compactação orientada por coluna e constrói dicionários de termos únicos. Colunas com alta cardinalidade (muitos valores únicos, como IDs detalhados de transações ou carimbos de data/hora exatos) exigem dicionários massivos e quebram a eficiência da compactação por execução de comprimento de linha (RLE)."
    },
    {
      "question": "Após configurar os papéis (Roles) e filtros RLS (Segurança em Nível de Linha) no Power BI Desktop e publicar o relatório no Power BI Service, qual é o próximo passo administrativo obrigatório para que a segurança funcione para os usuários?",
      "options": [
        "Mapear as funções no portal de administração do Tenant do Power BI",
        "Acessar as configurações de Segurança do modelo de dados no Power BI Service e atribuir usuários ou grupos de segurança (Azure Active Directory / Entra ID) aos papéis definidos",
        "Configurar regras de acesso de visualização RLS nas propriedades do workspace",
        "Não há passos adicionais, o RLS é ativado automaticamente pelas credenciais de login dos usuários"
      ],
      "answer": 1,
      "explanation": "O RLS definido no Power BI Desktop apenas mapeia a lógica lógica lógica. Para que funcione na nuvem, o administrador ou proprietário do modelo deve ir nas configurações do dataset no Service (Segurança), selecionar os papéis e adicionar os usuários individuais ou grupos de segurança que devem pertencer a cada papel."
    },
    {
      "question": "Qual é a principal diferença técnica de comportamento entre as funções DAX ALL() e ALLNOBLANKROW() ao remover filtros de uma tabela do modelo de dados?",
      "options": [
        "ALL() mantém a linha em branco automática gerada por inconsistência de integridade referencial; ALLNOBLANKROW() a ignora/remove",
        "ALLNOBLANKROW() limpa filtros de segmentadores; ALL() limpa apenas de tabelas visuais",
        "ALLNOBLANKROW() é obsoleta e foi descontinuada do DAX",
        "Não há diferença prática, pois ambas removem 100% dos filtros da tabela referenciada"
      ],
      "answer": 0,
      "explanation": "Quando há inconsistência referencial no modelo (ex: uma linha na Fato aponta para um ID de produto que não existe na dimensão Produto), o Power BI cria uma linha em branco invisível na dimensão para associar esses órfãos. A função 'ALL' inclui essa linha especial no resultado retornado, enquanto 'ALLNOBLANKROW' a ignora."
    },
    {
      "question": "O que ocorre quando a expressão CALCULATE(SUM(Vendas[Valor])) é avaliada no contexto de linha de uma Coluna Calculada de uma tabela de clientes?",
      "options": [
        "Gera um erro de dependência circular imediato no modelo",
        "Realiza uma Transição de Contexto, convertendo todas as colunas da linha atual do cliente em filtros e retornando a soma das vendas exclusivas desse cliente específico",
        "Calcula a soma das vendas de todos os clientes sem qualquer restrição de linha",
        "Retorna BLANK() porque colunas calculadas não aceitam funções agregadoras encapsuladas"
      ],
      "answer": 1,
      "explanation": "Escrever CALCULATE no contexto de linha força o motor a realizar a transição de contexto. A linha atual da tabela é convertida em um conjunto equivalente de filtros de coluna, o que filtra a tabela de vendas relacionada para mostrar apenas os dados daquele cliente específico."
    },
    {
      "question": "Em uma modelagem estrela clássica, você possui uma tabela fato com duas chaves estrangeiras de data (DataVenda e DataEntrega) conectadas à mesma tabela dimensão Calendário. Qual é o limite de relacionamentos físicos ativos que você pode mapear entre essas duas tabelas?",
      "options": [
        "Nenhum, pois múltiplos relacionamentos exigem uma tabela ponte intermediária",
        "Exatamente um relacionamento ativo; os demais devem ser configurados como inativos nas propriedades",
        "Dois relacionamentos ativos simultâneos, desde que possuam direções de filtro diferentes",
        "Ilimitados, pois o VertiPaq resolve caminhos de forma dinâmica"
      ],
      "answer": 1,
      "explanation": "O Power BI não permite caminhos de filtro ambíguos. Por isso, entre duas tabelas quaisquer, apenas um relacionamento físico pode ser definido como 'Ativo' por vez. Relacionamentos adicionais devem ser marcados como 'Inativos' e ativados no DAX com USERRELATIONSHIP quando necessário."
    },
    {
      "question": "Qual o benefício direto de desabilitar a opção 'Data/Hora Automática' (Auto Date/Time) nas configurações globais ou do arquivo atual do Power BI Desktop?",
      "options": [
        "Melhorar a precisão de relatórios de IoT com dados em tempo real",
        "Excluir tabelas de calendário ocultas criadas automaticamente pelo Power BI para cada coluna de data do modelo, reduzindo o tamanho do arquivo final e o consumo de memória RAM",
        "Impedir que usuários digitem datas incorretas nos filtros de segmentação",
        "Forçar a sincronização de fusos horários locais"
      ],
      "answer": 1,
      "explanation": "Quando 'Data/Hora Automática' está ativa, o Power BI cria silenciosamente uma tabela calendário oculta para cada coluna do tipo Date ou DateTime no modelo. Em modelos com muitas colunas de data, isso aumenta desnecessariamente o tamanho do arquivo .pbix e deteriora a performance de processamento."
    },
    {
      "question": "Qual é a principal vantagem de performance ao projetar uma tabela de relacionamento física intermediária (tabela ponte / bridge table) para resolver relações Muitos-para-Muitos (N:N) em um modelo com milhões de linhas?",
      "options": [
        "Diminuir a quantidade de medidas DAX necessárias",
        "Eliminar caminhos de filtro ambíguos na propagação e otimizar as pesquisas internas no VertiPaq, evitando a deterioração de performance visual",
        "Ativar o Query Folding automático na fonte de dados local",
        "Reduzir o número total de relacionamentos para zero"
      ],
      "answer": 1,
      "explanation": "Relacionamentos Muitos-para-Muitos diretos na modelagem utilizam lógica de produto cruzado que consome muito processamento de CPU em grandes datasets. O uso de uma tabela ponte contendo valores distintos normalizados e filtros unidirecionais claros simplifica a busca do VertiPaq e acelera a renderização de gráficos."
    },
    {
      "question": "No seu modelo de dados, uma única tabela dimensão de Calendário filtra a tabela fato de vendas em três datas distintas (Data do Pedido, Data do Envio, Data da Entrega) por meio de relacionamentos ativos e inativos. Essa dimensão é chamada tecnicamente de:",
      "options": [
        "Dimensão de Degenerada",
        "Dimensão Snowflake",
        "Dimensão de Interpretação de Papéis (Role-Playing Dimension)",
        "Dimensão Junk"
      ],
      "answer": 2,
      "explanation": "Uma dimensão que atua em múltiplos papéis no mesmo modelo filtrando diferentes chaves na fato é conhecida como dimensão de interpretação de papéis (Role-Playing Dimension)."
    },
    {
      "question": "Você está modelando as tabelas Customer (contendo o cadastro de clientes com IDs exclusivos) e Transaction (contendo as transações de compras dos clientes). Qual tipo de relacionamento e direção você deve configurar para vincular as tabelas?",
      "options": [
        "Muitos-para-muitos (N:N) entre Customer e Transaction",
        "Um-para-muitos (1:N) de Transaction para Customer",
        "Um-para-muitos (1:N) de Customer para Transaction",
        "Um-para-um (1:1) entre Customer e Transaction"
      ],
      "answer": 2,
      "explanation": "Um cliente pode realizar múltiplas transações, mas cada transação pertence a um único cliente. Logo, o relacionamento correto é de Um-para-Muitos (1:N) com a direção de filtragem do lado 1 (Customer) para o lado N (Transaction)."
    },
    {
      "question": "Ao projetar um modelo de dados estrela (Star Schema) de alta performance, qual das seguintes práticas NÃO é considerada uma boa prática de modelagem recomendada?",
      "options": [
        "Utilizar esquemas estrela complexos baseados fortemente em relacionamentos Muitos-para-Muitos (N:N) bidirecionais ativos",
        "Configurar relacionamentos com filtros unidirecionais claros em vez de bidirecionais",
        "Manter tabelas com propósitos específicos (Fato para métricas e Dimensão para atributos)",
        "Importar apenas os dados e colunas estritamente necessários para a análise"
      ],
      "answer": 0,
      "explanation": "Relacionamentos Muitos-para-Muitos bidirecionais ativos causam ambiguidade de filtragem, duplo cálculo involuntário e degradação drástica de performance. Devem ser evitados ou modelados com tabelas ponte e filtros unidirecionais."
    },
    {
      "question": "Em um relacionamento clássico de cardinalidade Um-para-Muitos (1:N) entre uma tabela de dimensão e uma fato, a qual tipo de coluna do banco o lado 'Muitos' (N) do relacionamento está vinculado na tabela fato?",
      "options": [
        "Chave Primária (Primary Key)",
        "Chave Estrangeira (Foreign Key)",
        "Coluna de Índice Calculada",
        "Tabela de Pesquisa"
      ],
      "answer": 1,
      "explanation": "O lado 1 (Dimensão) conecta-se por meio de sua Chave Primária (valores exclusivos). O lado N (Fato) conecta-se por meio de sua Chave Estrangeira (valores que podem se repetir)."
    },
    {
      "question": "Em relação ao comportamento do fluxo de filtros em relacionamentos do Power BI, qual das seguintes afirmações é verdadeira?",
      "options": [
        "Por padrão, o filtro se propaga do lado 1 (Um) para o lado N (Muitos) do relacionamento",
        "Ao filtrar uma tabela de dimensão, o contexto de filtro é passado automaticamente para as tabelas fato 'a jusante'",
        "Os filtros não conseguem fluir 'rio acima' (do lado N para o lado 1) a menos que a filtragem bidirecional esteja ativa",
        "Todas as alternativas acima estão corretas"
      ],
      "answer": 3,
      "explanation": "Os filtros seguem o fluxo natural da dimensão para a fato (lado 1 para N). Propagam-se para tabelas dependentes e apenas sobem de volta para o lado 1 se o filtro for configurado explicitamente como bidirecional (Ambos)."
    },
    {
      "question": "Se você decidir importar ou construir sua própria tabela de calendário (Date Table) no Power BI, quais requisitos técnicos ela deve cumprir obrigatoriamente para aceitar inteligência de tempo DAX?",
      "options": [
        "Coneter datas contínuas sem lacunas que representem todos os dias de todos os anos do modelo",
        "Não conter datas duplicadas na coluna de chave de data",
        "Possuir pelo menos uma coluna configurada com o tipo de dado Data (Date) ou Data/Hora (DateTime)",
        "Todas as alternativas acima estão corretas"
      ],
      "answer": 3,
      "explanation": "Uma tabela de datas para inteligência de tempo requer uma coluna de tipo Date/DateTime, com valores únicos, contínuos (sem buracos) e cobrindo anos inteiros mapeados no modelo."
    },
    {
      "question": "Você possui uma tabela FactSales com 50 milhões de linhas de dados diários de vendas abrangendo três anos. A sua necessidade de relatórios restringe-se a exibir vendas mensais por produto, sem necessidade de detalhes por dia. Como otimizar o tamanho do modelo sem afetar as entregas?",
      "options": [
        "Resumir/agrupar a tabela dimensão de datas para o nível mensal",
        "Resumir/agrupar a tabela de fatos FactSales para o nível mensal e de produto no Power Query",
        "Resumir a tabela FactSales para a categoria de produtos apenas",
        "Resumir a tabela fato para o nível trimestral"
      ],
      "answer": 1,
      "explanation": "Pré-agregar as vendas na Fato agrupando por mês e produto reduz dezenas de milhões de linhas diárias para um volume significativamente menor de linhas mensais, economizando memória e acelerando consultas DAX."
    },
    {
      "question": "No modelo tabular do Power BI, qual elemento de cálculo é computado dinamicamente em tempo de execução de consulta (on-demand), não consumindo espaço físico de armazenamento no arquivo de dados?",
      "options": [
        "Colunas Calculadas (Calculated Columns)",
        "Tabelas Calculadas (Calculated Tables)",
        "Medidas DAX (Measures)",
        "Parâmetros de Campo"
      ],
      "answer": 2,
      "explanation": "Medidas DAX são puramente fórmulas matemáticas. Elas não armazenam valores fisicamente no arquivo e são calculadas sob demanda pelo motor de consulta sempre que um visual é renderizado."
    },
    {
      "question": "Qual tipo de cálculo em DAX responde diretamente e em tempo real aos filtros, segmentações de dados (slicers) e seleções ativas na tela do relatório feitas pelo usuário?",
      "options": [
        "Medidas DAX",
        "Colunas Calculadas"
      ],
      "answer": 0,
      "explanation": "Medidas DAX operam dinamicamente sob o 'Contexto de Filtro' atual da página, recalculando-se instantaneamente para refletir qualquer segmentação ou filtro aplicado em tela."
    },
    {
      "question": "Como é classificada tecnicamente uma medida em DAX que soma valores normais ao longo de algumas dimensões (como clientes ou filiais), mas deve retornar o último valor disponível ao longo da dimensão de tempo (como saldos de estoque final)?",
      "options": [
        "Medida Aditiva",
        "Medida Agregada",
        "Medida Semi-aditiva",
        "Medida Não-aditiva"
      ],
      "answer": 2,
      "explanation": "Medidas semi-aditivas são métricas que podem ser somadas em algumas dimensões (ex: somar estoque entre lojas A e B), mas não podem ser somadas na dimensão de datas (ex: somar estoque de Jan + Fev não faz sentido; o saldo correto é o último dia do período)."
    }
  ],
  "Visualizar e Analisar": [
    {
      "pergunta": "Overview Litware, Inc. is an online retailer that uses Microsoft Power BI dashboards and reports. The company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files, and several other data sources. Litware uses Azure Active Directory (Azure AD) to authenticate users. Existing Environment Sales Data Litware has online sales data that has the SQL schema shown in the following table. In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm. The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww. The sales_id column in the Sales table represents a unique transaction. The region_id column can be managed by only one sales manager. Data Concerns You are concerned with the quality and completeness of the sales data. You plan to verify the sales data for negative sales amounts. Reporting Requirements Litware identifies the following technical requirements: Executives require a visual that shows sales by region. Regional managers require a visual to analyze weekly sales and returns. Sales managers must be able to see the sales data of their respective region only. The sales managers require a visual to analyze sales performance versus sales targets. The sale department requires reports that contain the number of sales transactions. Users must be able to see the month in reports as shown in the following example: Feb 2020. The customer service department requires a visual that can be filtered by both sales month and ship month independently. Question You need to create relationships to meet the reporting requirements of the customer service department. What should you create?",
      "opcoes": [
        "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]",
        "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
        "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
        "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]"
      ],
      "correta": 0,
      "explicacao": "Resposta: an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id] Scenario: The customer service department requires a visual that can be filtered by both sales month and ship month independently. In Power BI Desktop, only one relationship can be active between a Fact table and Dimension table, so we need an extra table. Use one-to-many relationship to be able to filter. Incorrect Answers: C: Cannot make a relation between a date_id and a week_id. D: The one-to-many relationships between the Sales and the Date tables goes in the other direction: for each date there can be many sales or shipments. Reference: https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"
    },
    {
      "pergunta": "Overview Litware, Inc. is an online retailer that uses Microsoft Power BI dashboards and reports. The company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files, and several other data sources. Litware uses Azure Active Directory (Azure AD) to authenticate users. Existing Environment Sales Data Litware has online sales data that has the SQL schema shown in the following table. In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm. The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww. The sales_id column in the Sales table represents a unique transaction. The region_id column can be managed by only one sales manager. Data Concerns You are concerned with the quality and completeness of the sales data. You plan to verify the sales data for negative sales amounts. Reporting Requirements Litware identifies the following technical requirements: Executives require a visual that shows sales by region. Regional managers require a visual to analyze weekly sales and returns. Sales managers must be able to see the sales data of their respective region only. The sales managers require a visual to analyze sales performance versus sales targets. The sale department requires reports that contain the number of sales transactions. Users must be able to see the month in reports as shown in the following example: Feb 2020. The customer service department requires a visual that can be filtered by both sales month and ship month independently. Question You need to create relationships to meet the reporting requirements of the customer service department. What should you create?",
      "opcoes": [
        "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]",
        "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
        "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
        "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]"
      ],
      "correta": 0,
      "explicacao": "Resposta: an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id] Scenario: The customer service department requires a visual that can be filtered by both sales month and ship month independently. In Power BI Desktop, only one relationship can be active between a Fact table and Dimension table, so we need an extra table. Use one-to-many relationship to be able to filter. Incorrect Answers: C: Cannot make a relation between a date_id and a week_id. D: The one-to-many relationships between the Sales and the Date tables goes in the other direction: for each date there can be many sales or shipments. Reference: https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"
    },
    {
      "pergunta": "Overview Litware, Inc. is an online retailer that uses Microsoft Power BI dashboards and reports. The company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files, and several other data sources. Litware uses Azure Active Directory (Azure AD) to authenticate users. Existing Environment Sales Data Litware has online sales data that has the SQL schema shown in the following table. In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm. The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww. The sales_id column in the Sales table represents a unique transaction. The region_id column can be managed by only one sales manager. Data Concerns You are concerned with the quality and completeness of the sales data. You plan to verify the sales data for negative sales amounts. Reporting Requirements Litware identifies the following technical requirements: Executives require a visual that shows sales by region. Regional managers require a visual to analyze weekly sales and returns. Sales managers must be able to see the sales data of their respective region only. The sales managers require a visual to analyze sales performance versus sales targets. The sale department requires reports that contain the number of sales transactions. Users must be able to see the month in reports as shown in the following example: Feb 2020. The customer service department requires a visual that can be filtered by both sales month and ship month independently. Question You need to create relationships to meet the reporting requirements of the customer service department. What should you create?",
      "opcoes": [
        "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]",
        "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
        "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
        "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]"
      ],
      "correta": 0,
      "explicacao": "Resposta: an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id] Scenario: The customer service department requires a visual that can be filtered by both sales month and ship month independently. In Power BI Desktop, only one relationship can be active between a Fact table and Dimension table, so we need an extra table. Use one-to-many relationship to be able to filter. Incorrect Answers: C: Cannot make a relation between a date_id and a week_id. D: The one-to-many relationships between the Sales and the Date tables goes in the other direction: for each date there can be many sales or shipments. Reference: https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"
    },
    {
      "pergunta": "Overview Litware, Inc. is an online retailer that uses Microsoft Power BI dashboards and reports. The company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files, and several other data sources. Litware uses Azure Active Directory (Azure AD) to authenticate users. Existing Environment Sales Data Litware has online sales data that has the SQL schema shown in the following table. In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm. The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww. The sales_id column in the Sales table represents a unique transaction. The region_id column can be managed by only one sales manager. Data Concerns You are concerned with the quality and completeness of the sales data. You plan to verify the sales data for negative sales amounts. Reporting Requirements Litware identifies the following technical requirements: Executives require a visual that shows sales by region. Regional managers require a visual to analyze weekly sales and returns. Sales managers must be able to see the sales data of their respective region only. The sales managers require a visual to analyze sales performance versus sales targets. The sale department requires reports that contain the number of sales transactions. Users must be able to see the month in reports as shown in the following example: Feb 2020. The customer service department requires a visual that can be filtered by both sales month and ship month independently. Question You need to create relationships to meet the reporting requirements of the customer service department. What should you create?",
      "opcoes": [
        "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]",
        "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
        "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
        "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]"
      ],
      "correta": 0,
      "explicacao": "Resposta: an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id] Scenario: The customer service department requires a visual that can be filtered by both sales month and ship month independently. In Power BI Desktop, only one relationship can be active between a Fact table and Dimension table, so we need an extra table. Use one-to-many relationship to be able to filter. Incorrect Answers: C: Cannot make a relation between a date_id and a week_id. D: The one-to-many relationships between the Sales and the Date tables goes in the other direction: for each date there can be many sales or shipments. Reference: https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"
    },
    {
      "pergunta": "Overview Litware, Inc. is an online retailer that uses Microsoft Power BI dashboards and reports. The company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files, and several other data sources. Litware uses Azure Active Directory (Azure AD) to authenticate users. Existing Environment Sales Data Litware has online sales data that has the SQL schema shown in the following table. In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm. The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww. The sales_id column in the Sales table represents a unique transaction. The region_id column can be managed by only one sales manager. Data Concerns You are concerned with the quality and completeness of the sales data. You plan to verify the sales data for negative sales amounts. Reporting Requirements Litware identifies the following technical requirements: Executives require a visual that shows sales by region. Regional managers require a visual to analyze weekly sales and returns. Sales managers must be able to see the sales data of their respective region only. The sales managers require a visual to analyze sales performance versus sales targets. The sale department requires reports that contain the number of sales transactions. Users must be able to see the month in reports as shown in the following example: Feb 2020. The customer service department requires a visual that can be filtered by both sales month and ship month independently. Question You need to create relationships to meet the reporting requirements of the customer service department. What should you create?",
      "opcoes": [
        "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]",
        "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
        "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
        "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]"
      ],
      "correta": 0,
      "explicacao": "Resposta: an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id] Scenario: The customer service department requires a visual that can be filtered by both sales month and ship month independently. In Power BI Desktop, only one relationship can be active between a Fact table and Dimension table, so we need an extra table. Use one-to-many relationship to be able to filter. Incorrect Answers: C: Cannot make a relation between a date_id and a week_id. D: The one-to-many relationships between the Sales and the Date tables goes in the other direction: for each date there can be many sales or shipments. Reference: https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"
    },
    {
      "pergunta": "Overview Litware, Inc. is an online retailer that uses Microsoft Power BI dashboards and reports. The company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files, and several other data sources. Litware uses Azure Active Directory (Azure AD) to authenticate users. Existing Environment Sales Data Litware has online sales data that has the SQL schema shown in the following table. In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm. The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww. The sales_id column in the Sales table represents a unique transaction. The region_id column can be managed by only one sales manager. Data Concerns You are concerned with the quality and completeness of the sales data. You plan to verify the sales data for negative sales amounts. Reporting Requirements Litware identifies the following technical requirements: Executives require a visual that shows sales by region. Regional managers require a visual to analyze weekly sales and returns. Sales managers must be able to see the sales data of their respective region only. The sales managers require a visual to analyze sales performance versus sales targets. The sale department requires reports that contain the number of sales transactions. Users must be able to see the month in reports as shown in the following example: Feb 2020. The customer service department requires a visual that can be filtered by both sales month and ship month independently. Question You need to create relationships to meet the reporting requirements of the customer service department. What should you create?",
      "opcoes": [
        "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]",
        "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
        "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
        "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]"
      ],
      "correta": 0,
      "explicacao": "Resposta: an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id] Scenario: The customer service department requires a visual that can be filtered by both sales month and ship month independently. In Power BI Desktop, only one relationship can be active between a Fact table and Dimension table, so we need an extra table. Use one-to-many relationship to be able to filter. Incorrect Answers: C: Cannot make a relation between a date_id and a week_id. D: The one-to-many relationships between the Sales and the Date tables goes in the other direction: for each date there can be many sales or shipments. Reference: https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"
    },
    {
      "pergunta": "Overview Litware, Inc. is an online retailer that uses Microsoft Power BI dashboards and reports. The company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files, and several other data sources. Litware uses Azure Active Directory (Azure AD) to authenticate users. Existing Environment Sales Data Litware has online sales data that has the SQL schema shown in the following table. In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm. The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww. The sales_id column in the Sales table represents a unique transaction. The region_id column can be managed by only one sales manager. Data Concerns You are concerned with the quality and completeness of the sales data. You plan to verify the sales data for negative sales amounts. Reporting Requirements Litware identifies the following technical requirements: Executives require a visual that shows sales by region. Regional managers require a visual to analyze weekly sales and returns. Sales managers must be able to see the sales data of their respective region only. The sales managers require a visual to analyze sales performance versus sales targets. The sale department requires reports that contain the number of sales transactions. Users must be able to see the month in reports as shown in the following example: Feb 2020. The customer service department requires a visual that can be filtered by both sales month and ship month independently. Question You need to create relationships to meet the reporting requirements of the customer service department. What should you create?",
      "opcoes": [
        "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]",
        "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
        "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
        "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]"
      ],
      "correta": 0,
      "explicacao": "Resposta: an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id] Scenario: The customer service department requires a visual that can be filtered by both sales month and ship month independently. In Power BI Desktop, only one relationship can be active between a Fact table and Dimension table, so we need an extra table. Use one-to-many relationship to be able to filter. Incorrect Answers: C: Cannot make a relation between a date_id and a week_id. D: The one-to-many relationships between the Sales and the Date tables goes in the other direction: for each date there can be many sales or shipments. Reference: https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"
    },
    {
      "pergunta": "Overview Litware, Inc. is an online retailer that uses Microsoft Power BI dashboards and reports. The company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files, and several other data sources. Litware uses Azure Active Directory (Azure AD) to authenticate users. Existing Environment Sales Data Litware has online sales data that has the SQL schema shown in the following table. In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm. The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww. The sales_id column in the Sales table represents a unique transaction. The region_id column can be managed by only one sales manager. Data Concerns You are concerned with the quality and completeness of the sales data. You plan to verify the sales data for negative sales amounts. Reporting Requirements Litware identifies the following technical requirements: Executives require a visual that shows sales by region. Regional managers require a visual to analyze weekly sales and returns. Sales managers must be able to see the sales data of their respective region only. The sales managers require a visual to analyze sales performance versus sales targets. The sale department requires reports that contain the number of sales transactions. Users must be able to see the month in reports as shown in the following example: Feb 2020. The customer service department requires a visual that can be filtered by both sales month and ship month independently. Question You need to create relationships to meet the reporting requirements of the customer service department. What should you create?",
      "opcoes": [
        "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]",
        "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
        "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
        "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]"
      ],
      "correta": 0,
      "explicacao": "Resposta: an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id] Scenario: The customer service department requires a visual that can be filtered by both sales month and ship month independently. In Power BI Desktop, only one relationship can be active between a Fact table and Dimension table, so we need an extra table. Use one-to-many relationship to be able to filter. Incorrect Answers: C: Cannot make a relation between a date_id and a week_id. D: The one-to-many relationships between the Sales and the Date tables goes in the other direction: for each date there can be many sales or shipments. Reference: https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"
    },
    {
      "pergunta": "Overview Litware, Inc. is an online retailer that uses Microsoft Power BI dashboards and reports. The company plans to leverage data from Microsoft SQL Server databases, Microsoft Excel files, text files, and several other data sources. Litware uses Azure Active Directory (Azure AD) to authenticate users. Existing Environment Sales Data Litware has online sales data that has the SQL schema shown in the following table. In the Date table, the date_id column has a format of yyyymmdd and the month column has a format of yyyymm. The week column in the Date table and the week_id column in the Weekly_Returns table have a format of yyyyww. The sales_id column in the Sales table represents a unique transaction. The region_id column can be managed by only one sales manager. Data Concerns You are concerned with the quality and completeness of the sales data. You plan to verify the sales data for negative sales amounts. Reporting Requirements Litware identifies the following technical requirements: Executives require a visual that shows sales by region. Regional managers require a visual to analyze weekly sales and returns. Sales managers must be able to see the sales data of their respective region only. The sales managers require a visual to analyze sales performance versus sales targets. The sale department requires reports that contain the number of sales transactions. Users must be able to see the month in reports as shown in the following example: Feb 2020. The customer service department requires a visual that can be filtered by both sales month and ship month independently. Question You need to create relationships to meet the reporting requirements of the customer service department. What should you create?",
      "opcoes": [
        "an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id]",
        "an additional date table named ShipDate, a many-to-many relationship from Sales[sales_date_id] to Date[date_id], and a many-to-many relationship from Sales[sales_ship_date_id] to ShipDate[date_id]",
        "a one-to-many relationship from Date[date_id] to Sales[sales_date_id] and another one-to-many relationship from Date[date_id] to Weekly_Returns[week_id]",
        "a one-to-many relationship from Sales[sales_date_id] to Date[date_id] and a one-to-many relationship from Sales[sales_ship_date_id] to Date[date_id]"
      ],
      "correta": 0,
      "explicacao": "Resposta: an additional date table named ShipDate, a one-to-many relationship from Date[date_id] to Sales[Sales_date_id], and a one-to-many relationship from ShipDate[date_id] to Sales[sales_ship_date_id] Scenario: The customer service department requires a visual that can be filtered by both sales month and ship month independently. In Power BI Desktop, only one relationship can be active between a Fact table and Dimension table, so we need an extra table. Use one-to-many relationship to be able to filter. Incorrect Answers: C: Cannot make a relation between a date_id and a week_id. D: The one-to-many relationships between the Sales and the Date tables goes in the other direction: for each date there can be many sales or shipments. Reference: https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You are building a dataset from a JSON file that contains an array of documents. You need to import attributes as columns from all the documents in the JSON file. The solution must ensure that date attributes can be used as date hierarchies in Microsoft Power BI reports. Which three actions should you perform in sequence?",
      "opcoes": [
        "Create a new aggregation that summarizes by employee.",
        "Create a new group on the state column and set the Group type to List.",
        "Create a new group on the state column and set the Group type to Bin.",
        "Create a new aggregation that summarizes by state."
      ],
      "correta": 1,
      "explicacao": "Reference: https://www.mssqltips.com/sqlservertip/4621/using-power-bi-with-json-data-sources-and-files/"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You embed a Power BI report in a Microsoft SharePoint Online page. A user named User1 can access the SharePoint Online page, but the Power BI web part displays the following error message: \"This content isn't available.\" User1 is unable to view the report. You verify that you can access the SharePoint Online page and that the Power BI report displays as expected. You need to ensure that User1 can view the report from SharePoint Online. What should you do?",
      "opcoes": [
        "Publish the app workspace.",
        "Share the dashboard in the app workspace.",
        "Edit the settings of the Power BI web part.",
        "Modify the members of the app workspace."
      ],
      "correta": 3,
      "explicacao": "Resposta: Modify the members of the app workspace. Users or groups need access to both the SharePoint Online page and the report in the Power BI app to see the report on the SharePoint page. Reference: https://docs.microsoft.com/en-us/power-bi/collaborate-share/service-embed-report-spo"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "You plan to embed multiple visualizations in a public website. Your Power BI infrastructure contains the visualizations configured as shown in the following table. Which two visualizations can you embed into the website? Each correct answer presents a complete solution.",
      "opcoes": [
        "Visual 1",
        "Visual 2",
        "Visual 3",
        "Visual 4",
        "Visual 5"
      ],
      "correta": 3,
      "explicacao": "Resposta: Visual 2 and 4 Not all reports can be published to the web, unsupported scenarios as: 1- R visuals 2- Reports with row-level security (RLS) -> (Visual 1) 3- Reports that connect live to on-premises Analysis Services Tabular (Visual 5) 4- Reports shared with you -> (Visual 3) References: https://docs.microsoft.com/en-us/power-bi/service-publish-to-web"
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "What is the best description of a workspace?",
      "opcoes": [
        "A workspace is a feature in Power BI service that allows you to view reports only.",
        "A workspace is a feature that allows you to view and edit the data model, build visualizations, and transform the data.",
        "A workspace is a feature of Power BI Desktop that allows you to build reports only.",
        "A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
      ],
      "correta": 3,
      "explicacao": "Resposta: A workspace is a centralized location or repository that allows you to collaborate with colleagues and teams to create collections of reports, dashboards, etc."
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You have a table that contains the following three columns: - City - Total Sales - Occupation You need to create a key influencers visualization as shown in the exhibit. How should you configure the visualization?",
      "opcoes": [
        "Add a Top N filter to the visual.",
        "Configure the Sales Profit measure to use the RANKX function.",
        "Add a calculated column to the table that uses the TOPN function. In the visual, replace Sales Profit with the calculated column.",
        "Add a calculated column to the table that returns the city name if the city is in the top 10, otherwise the calculated column will return \"Not in Top 10\". In the visual, replace Sales Profit with the calculated column."
      ],
      "correta": 0,
      "explicacao": "Box 1: Total Sales Box 2: Occupation Box 3: City Total Sales is what we analyze,we explain by occupation and expand by city. You can use Expand By to add fields you want to use for setting the level of the analysis without looking for new influencers. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-influencers"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You use an R visual to produce a map of 500,000 customers. You include the values of CustomerID, Latitude, and Longitude in the fields sent to the visual. Each customer ID is unique. In powerbi.com, when users load the visual, they only see some of the customers. What is the cause of the issue?",
      "opcoes": [
        "The visual was built by using a different version of R.",
        "The data comes from a Microsoft SQL Server source.",
        "The data is deduplicated.",
        "Too many records were sent to the visual."
      ],
      "correta": 3,
      "explicacao": "Resposta: Too many records were sent to the visual. R visuals in the Power BI service have a few limitations including: - Data size limitations data used by the R visual for plotting is limited to 150,000 rows. If more than 150,000 rows are selected, only the top 150,000 rows are used and a message is displayed on the image. Additionally, the input data has a limit of 250 MB. Reference: https://docs.microsoft.com/en-us/power-bi/visuals/service-r-visuals"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "You need to create a dashboard in the Power BI service to display data from a PubNub source. What should you do?",
      "opcoes": [
        "Add a Microsoft SQL Server Analysis Services (SSAS) data source that uses Connect live and create a report. Pin the report to a dashboard.",
        "Create an app workspace and publish the workspace to a dashboard.",
        "Add a Microsoft Azure SQL database data source that uses DirectQuery and create a report. Pin the report to a dashboard.",
        "Add a custom streaming data tile to a dashboard."
      ],
      "correta": 3,
      "explicacao": "Resposta: Add a custom streaming data tile to a dashboard. For pubnub data, we can visualize it using data tile on dashboard and configure pubnub as data source. Reference: https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming#streaming-dataset"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "What allows users to jump to different report pages while simultaneously filtering based on the specific item selected?",
      "opcoes": [
        "Drill through filters",
        "Tooltips",
        "R visuals",
        "Page filters"
      ],
      "correta": 0,
      "explicacao": "Resposta: Drill through filters Drill through filters allow users to jump to different report pages (like bookmarks), while simultaneously filtering based on the specific item selected"
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "Can a dashboard be created from multiple reports?",
      "opcoes": [
        "No, dashboards can only be created from a single dataset or report.",
        "Yes, dashboards can be created from multiple datasets or reports."
      ],
      "correta": 1,
      "explicacao": "Resposta: Yes, dashboards can be created from multiple datasets or reports."
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "You have a report that includes a card visualization. You need to apply the following conditional formatting to the card while minimizing design effort: - For values that are greater than or equal to 100, the font of the data label must be dark red. - For values that are less than 100, the font of the data label must be dark gray. Which type of format should you use?",
      "opcoes": [
        "Color scale",
        "Rules",
        "Field value"
      ],
      "correta": 1,
      "explicacao": "Finding the conditional formatting in the card visual is a bit tricky. There is no separate option for that. You need to go to the Format tab of the visual, and then expand the Data Label. The right beside the Data Label's colour you need to hover your mouse, and you will find a three dots icon appearing, which if you click on it, you will see Conditional Formatting. Now in the Conditional Formatting tab, you can apply it in different methods. for example, you can choose Rules, and then The Rules mode will give you the ability to put custom roles as below; Reference: https://radacad.com/enhance-the-card-visual-in-power-bi-with-conditional-formatting"
    },
    {
      "pergunta": "Para usar um visual do tipo Nuvem de Palavras (Word Cloud) do AppSource na sua página. O que você deve fazer?",
      "opcoes": [
        "Adicionar um visual de relatório paginado (Paginated report visual).",
        "No painel Visualização, selecionar 'Obter mais visuais' (Get More Visuals).",
        "Importar um visual de um arquivo local.",
        "Adicionar um visual do Python à página de relatório."
      ],
      "correta": 1,
      "explicacao": "Obter mais visuais (Get More Visuals) abre o marketplace interno (AppSource) onde você busca e clica para adicionar diretamente o visual."
    },
    {
      "pergunta": "Qual gráfico é ideal para recomendar e fazer uma COMPARAÇÃO RÁPIDA das vendas do trimestre atual por PAÍS?",
      "opcoes": [
        "Matriz (Matrix)",
        "Gráfico de colunas (Column chart)",
        "Gráfico de dispersão (Scatter chart)",
        "Gráfico de medidor (Gauge chart)"
      ],
      "correta": 1,
      "explicacao": "Gráficos de colunas ou barras são os melhores visuais para fazer comparações simples e rápidas de um único valor categórico (País) em relação a um valor numérico (Vendas)."
    },
    {
      "pergunta": "Você tem um relatório em Desktop com gráficos filtrados por um slicer de ano. Você quer criar um Slide Show (apresentação interativa) pro Serviço Power BI. O que fazer ANTES de publicar?",
      "opcoes": [
        "Filtrar os gráficos no slicer e então criar marcadores (bookmarks).",
        "Configurar filtros de nível de página e usar o agrupamento List.",
        "Criar filtros de nível de relatório e agrupar por Bin.",
        "Configurar filtros drillthrough para cada gráfico de barras."
      ],
      "correta": 0,
      "explicacao": "Marcadores capturam o estado atual dos visuais, filtros e slicers da página. Ao gravá-los, você pode compô-los numa sequência de slide usando o botão 'Visualizar Marcadores' (View Bookmarks)."
    },
    {
      "pergunta": "Você precisa criar um visual estilo KPI, mas que pareça uma tabela de linhas. Qual visual nativo é a melhor alternativa ao invés de uma Tabela, se o KPI usar múltiplas colunas e formatações de fundo?",
      "opcoes": [
        "Matriz (Matrix)",
        "KPI nativo",
        "Cartão de várias linhas (Multi row card)",
        "Tabela (Table)"
      ],
      "correta": 0,
      "explicacao": "A Matriz lida nativamente com subtotais, ícones condicionais mais complexos e permite formatar espaços de forma mais flexível (ex. estilo Tabela Dinâmica) quando KPIs visuais sozinhos não bastam."
    },
    {
      "pergunta": "Você tem um gráfico de barras e um de rosca. Como configurar para que selecionar um ano na barra NÃO mude nada na rosca?",
      "opcoes": [
        "Adicionar um Slicer usando a coluna de ano.",
        "Definir um filtro de nível visual na barra.",
        "Editar as interações (Edit Interactions) a partir do menu Formatar.",
        "Definir um filtro visual na rosca."
      ],
      "correta": 2,
      "explicacao": "Com o visual de barras selecionado, você acessa 'Editar Interações' e clica no ícone 'Nenhum' (None) acima do gráfico de rosca para interromper a filtragem cruzada."
    },
    {
      "pergunta": "Um usuário quer poder detalhar a localização (Country > ProvState > City) em um gráfico de barras. Como você configura o drill down nesse gráfico?",
      "opcoes": [
        "No campo Eixo (Axis), adicione Country no topo, seguido por ProvState e depois City.",
        "No campo Valor (Value), adicione Country no topo, seguido por ProvState, e depois City.",
        "No campo Legenda (Legend), adicione Country, e no campo Eixo, ProvState seguido por City.",
        "Mude o gráfico para um Treemap."
      ],
      "correta": 0,
      "explicacao": "Para ativar o recurso de drill down num visual, os campos devem ser hierarquicamente empilhados na área 'Eixo' (Axis)."
    },
    {
      "pergunta": "Qual das seguintes opções de filtro se aplica a todos os visuais em todas as páginas do relatório?",
      "opcoes": [
        "Nível de página (Page level)",
        "Nível visual (Visual level)",
        "Nível de relatório (Report level)",
        "Drill through"
      ],
      "correta": 2,
      "explicacao": "Os filtros de nível de relatório (Report level filters) persistem as seleções de filtro globalmente para todas as páginas no arquivo."
    },
    {
      "pergunta": "Qual visual permite detalhar (break down) uma medida através de múltiplas dimensões fazendo exploração ad-hoc?",
      "opcoes": [
        "Árvore de Decomposição (Decomposition Tree)",
        "Gráfico de Linhas",
        "Principais Influenciadores (Key Influencers)",
        "Mapa de Árvore (Treemap)"
      ],
      "correta": 0,
      "explicacao": "A Árvore de Decomposição permite desmembrar um valor e escolher dinamicamente qual a próxima categoria (dimensão) usar para dividir os dados, muito útil para análise de causa raiz."
    },
    {
      "pergunta": "Qual visual você poderia usar se quisesse entender os fatores que impulsionam (drive) uma métrica específica?",
      "opcoes": [
        "Gráfico de Linhas",
        "Árvore de Decomposição (Decomposition Tree)",
        "Principais Influenciadores (Key Influencers)",
        "Mapa de Árvore (Treemap)"
      ],
      "correta": 2,
      "explicacao": "O visual 'Principais Influenciadores' usa aprendizado de máquina para analisar e mostrar os fatores que afetam diretamente a variação de uma métrica escolhida."
    },
    {
      "pergunta": "Que objeto você poderia adicionar a um dashboard ou relatório se o usuário quisesse uma maneira interativa de classificar e filtrar os dados usando datas?",
      "opcoes": [
        "Filtro Top N",
        "Segmentador de Dados de Data (Date Slicer)",
        "Filtro de Nível de Relatório",
        "Segmentador Categórico"
      ],
      "correta": 1,
      "explicacao": "Slicers (Segmentadores de dados) oferecem filtros visuais interativos. Um Date Slicer permite definir datas em intervalos, controles deslizantes ou menus."
    },
    {
      "pergunta": "Qual configuração de filtro você usaria se quisesse retornar as 3 principais categorias por lucro total?",
      "opcoes": [
        "Filtro Dinâmico (Dynamic)",
        "Filtro Básico (Basic)",
        "Filtro Avançado (Advanced)",
        "Top N"
      ],
      "correta": 3,
      "explicacao": "O filtro Top N (Top N filter) permite limitar os resultados para exibir os 'n' itens superiores ou inferiores com base em uma medida."
    },
    {
      "pergunta": "Qual das seguintes opções de filtro se aplica apenas ao visual específico no qual está definida?",
      "opcoes": [
        "Nível de página (Page level)",
        "Nível visual (Visual level)",
        "Nível de relatório (Report level)",
        "Drill through"
      ],
      "correta": 1,
      "explicacao": "Os filtros de nível visual (Visual level filters) afetam apenas a visualização em que são aplicados."
    },
    {
      "pergunta": "O visual Q&A permite que você explore os dados 'com suas próprias palavras' usando o quê?",
      "opcoes": [
        "Consultas em SQL",
        "Expressões DAX",
        "Consultas em linguagem natural (Natural language queries)",
        "Código M (Power Query M)"
      ],
      "correta": 2,
      "explicacao": "O Q&A (Perguntas e Respostas) usa linguagem natural para que os usuários possam digitar perguntas como 'Total de vendas por país'."
    },
    {
      "pergunta": "Em qual tipo de gráfico você pode adicionar uma previsão (Forecast) com base em períodos de tempo na guia Análise?",
      "opcoes": [
        "Gráfico de colunas clusterizado",
        "Gráfico de dispersão",
        "Gráfico de cascata",
        "Gráfico de linhas (Line chart)"
      ],
      "correta": 3,
      "explicacao": "O recurso nativo de previsão (Forecasting) suporta dados temporais univariados e é ativado nativamente no visual de Gráfico de Linhas."
    },
    {
      "pergunta": "Qual é um caso de uso comum para gráficos de dispersão (scatter charts)?",
      "opcoes": [
        "Mostrar padrões e anomalias em grandes conjuntos de dados bivariados.",
        "Comparar valores categóricos de texto único.",
        "Exibir totais percentuais com fatias.",
        "Mostrar fluxo de entrada e saída."
      ],
      "correta": 0,
      "explicacao": "Dispersão mostra a intersecção de valores x e y e ajuda a revelar tendências, clusters ou outliers em conjuntos grandes."
    },
    {
      "pergunta": "Como criar um menu inicial que leve a diferentes páginas de relatório, garantindo que funcione em qualquer workspace?",
      "opcoes": [
        "Criar caixas de texto com links absolutos.",
        "Criar botões com a ação definida como Navegação de Página (Page navigation) ou Marcador (Bookmark).",
        "Criar um visual do Power Apps com um menu suspenso.",
        "Criar segmentações de página."
      ],
      "correta": 1,
      "explicacao": "Botões com ação 'Navegação na página' ou 'Indicador' levam o usuário diretamente à página desejada de forma nativa e não dependem de URLs rígidas."
    },
    {
      "pergunta": "Qual gráfico é mais adequado para comparar a evolução de receita e custo ao longo do TEMPO?",
      "opcoes": [
        "Gráfico de área empilhada",
        "Gráfico de rosca (Donut chart)",
        "Gráfico de cascata (Waterfall)",
        "Gráfico de linhas (Line chart)"
      ],
      "correta": 3,
      "explicacao": "Gráficos de linhas são a melhor escolha padrão para comparar múltiplas medidas ao longo do tempo ou de categorias sequenciais."
    },
    {
      "pergunta": "Qual gráfico usar para relacionar Preço Unitário e Quantidade Pedida, evidenciando padrões ou agrupamentos (clusters) de preços e quantidades semelhantes?",
      "opcoes": [
        "Gráfico de colunas clusterizado",
        "Gráfico de dispersão (Scatter chart)",
        "Gráfico de barras 100% empilhadas",
        "Árvore de decomposição"
      ],
      "correta": 1,
      "explicacao": "Gráficos de dispersão usam dois eixos de valor para mostrar as relações entre duas medidas. Eles possuem uma funcionalidade nativa para 'Localizar clusters automaticamente'."
    },
    {
      "pergunta": "Gráfico de barras (contagem por segmento) e colunas (vendas por mês). Ao clicar num segmento na barra, como configurar as interações para que o gráfico de colunas mostre qual PORÇÃO da barra pertence àquele segmento?",
      "opcoes": [
        "Filtro (Filter)",
        "Realce (Highlight)",
        "Nenhum (None)",
        "Drillthrough"
      ],
      "correta": 1,
      "explicacao": "O realce (highlight) mantém a barra inteira (total) e escurece a porção da barra que corresponde ao filtro selecionado, mostrando a proporção visualmente."
    },
    {
      "pergunta": "Você tem um gráfico de linhas e precisa ver os custos salariais totais ao passar o mouse sobre um ponto de dados (sem alterar a linha do gráfico). Como fazer?",
      "opcoes": [
        "Adicionar salário aos campos de drillthrough.",
        "Adicionar salário aos tooltips (dicas de ferramenta).",
        "Adicionar um filtro visual de salário.",
        "Alterar o gráfico de linhas para um gráfico de dispersão."
      ],
      "correta": 1,
      "explicacao": "Adicionar a medida ao campo Tooltips exibirá esse valor extra quando o usuário passar o cursor (hover) no ponto de dados."
    },
    {
      "pergunta": "Você pode usar marcadores (bookmarks) para criar uma apresentação de slides (slide show) no Power BI?",
      "opcoes": [
        "Não, marcadores não são dinâmicos.",
        "Não, é necessário um visual específico do AppSource.",
        "Sim, adicionando botões como navegação para alternar entre marcadores salvos.",
        "Sim, usando a funcionalidade de reprodução automática nativa no Desktop."
      ],
      "correta": 2,
      "explicacao": "Você pode salvar diferentes estados (bookmarks) e usar Botões com ações definidas para 'Bookmark' para permitir que os usuários naveguem através deles como um slide show."
    },
    {
      "pergunta": "Como você pode analisar o desempenho de cada um dos elementos do seu relatório e descobrir consultas demoradas?",
      "opcoes": [
        "Usando o analisador de desempenho (Performance Analyzer).",
        "Analisando seus metadados no Power Query.",
        "Usando o SQL Server Profiler conectado ao modelo importado.",
        "Verificando os logs do Gateway de dados local."
      ],
      "correta": 0,
      "explicacao": "O Analisador de Desempenho (Performance Analyzer) no Power BI Desktop permite inspecionar quanto tempo cada visual leva para renderizar e avaliar consultas DAX."
    },
    {
      "pergunta": "Qual dos seguintes filtros NÃO está disponível em relatórios do Power BI?",
      "opcoes": [
        "Filtro de nível de relatório (Report level)",
        "Filtro de tipo de página (Page type)",
        "Filtro de nível de página (Page level)",
        "Drillthrough"
      ],
      "correta": 1,
      "explicacao": "Os tipos padrão de filtros no painel de filtro são: Visual, Página (Page), Relatório (Report) e Drillthrough. Não existe 'Page type filter'."
    },
    {
      "pergunta": "Você precisa importar visuais personalizados (custom visuals) cada vez que deseja usá-los ao desenvolver um novo relatório?",
      "opcoes": [
        "Não, visuais personalizados estão sempre disponíveis na aba Visualizations.",
        "Não, importando uma vez, eles ficam permanentemente no Power BI Desktop.",
        "Sim, visuais personalizados devem ser importados do AppSource cada vez que você começa um novo relatório.",
        "Sim, mas apenas para relatórios no Power BI Service."
      ],
      "correta": 2,
      "explicacao": "No Power BI Desktop, os visuais personalizados são importados em um nível por relatório (arquivo PBIX). Para usar em um novo relatório, você deve importá-lo novamente (ou usar o recurso de visuais organizacionais)."
    },
    {
      "pergunta": "Qual é o benefício de usar uma dica de ferramenta (tooltip) de relatório?",
      "opcoes": [
        "Dar aos usuários a capacidade de exportar dados do visual.",
        "Dar aos usuários informações sobre o autor do relatório.",
        "Fornecer detalhes adicionais específicos ao contexto dos dados sobre os quais se passa o mouse.",
        "Permitir o drill-through para outras páginas."
      ],
      "correta": 2,
      "explicacao": "Tooltips fornecem contexto adicional e detalhado (como outros valores de medidas ou gráficos) quando o usuário passa o cursor sobre um ponto de dados específico."
    },
    {
      "pergunta": "Você criou uma tabela com Region e Sales, mas um visual agrupa as regiões mostrando apenas 4 linhas em vez de 6 linhas brutas. O que causa isso?",
      "opcoes": [
        "A categoria de dados (Data Category) de Region",
        "A sumarização padrão (Default Summarization) em Region",
        "A sumarização padrão (Default Summarization) em Sales",
        "O tipo de dados de Sales"
      ],
      "correta": 2,
      "explicacao": "Se a coluna Sales estiver com sumarização padrão definida (ex: Soma), o Power BI agregará automaticamente os valores da região. Para ver todas as linhas brutas, a sumarização de Sales precisaria ser 'Não resumir' ou a visualização configurada como tabela sem resumo."
    },
    {
      "pergunta": "Qual das seguintes alternativas não é uma prática recomendada ao usar o visual de Perguntas e Respostas (Q&A)?",
      "opcoes": [
        "Adicionar sinônimos a tabelas e colunas",
        "Adicionar relacionamentos ausentes entre tabelas",
        "Corrigir tipos de dados incorretos",
        "Adicionar rótulos de eixo a todos os gráficos"
      ],
      "correta": 3,
      "explicacao": "Práticas recomendadas para Q&A incluem renomear tabelas/colunas, corrigir tipos de dados, adicionar relacionamentos ausentes e adicionar sinônimos. Adicionar rótulos de eixo não afeta o modelo de P&R."
    },
    {
      "pergunta": "O que é o recurso de Narrativa Inteligente (Smart Narrative) no Power BI e quando é útil?",
      "opcoes": [
        "Um chatbot integrado ao Power BI para responder perguntas",
        "Um visual de IA que gera automaticamente resumos textuais das principais tendências e insights dos dados em um relatório, atualizando conforme os filtros mudam",
        "Uma ferramenta de tradução automática para relatórios multilíngues",
        "Um gerador de documentação técnica para o modelo de dados"
      ],
      "correta": 1,
      "explicacao": "Narrativa Inteligente é um visual de IA que gera automaticamente descrições textuais contextualizadas dos dados, destacando tendências importantes, anomalias e insights. O texto se atualiza dinamicamente quando filtros são aplicados."
    },
    {
      "pergunta": "O que são segmentações de dados (slicers) do tipo hierarquia no Power BI e qual sua vantagem?",
      "opcoes": [
        "Segmentações que mostram dados em ordem alfabética",
        "Segmentações que permitem filtrar por múltiplos níveis de uma hierarquia (ex: País > Estado > Cidade) em um único visual, com capacidade de expandir e recolher níveis",
        "Segmentações vinculadas a colunas de índice",
        "Segmentações automáticas criadas para cada coluna de texto"
      ],
      "correta": 1,
      "explicacao": "Segmentações de hierarquia permitem filtrar por múltiplos níveis hierárquicos em um único visual compacto. O usuário pode expandir a hierarquia (ex: selecionar país e depois estados dentro dele), tornando o filtro mais intuitivo e eficiente."
    },
    {
      "pergunta": "O que é o Bookmarks (Marcadores) no Power BI e como pode ser usado?",
      "opcoes": [
        "Um recurso para salvar URLs favoritas dentro do relatório",
        "Um recurso que captura o estado atual de uma página do relatório (filtros, seleções, visibilidade de visuais) e permite retornar a esse estado ou criar uma narrativa visual",
        "Uma funcionalidade para marcar questões incorretas no relatório",
        "Um sistema de comentários para colaboração em relatórios"
      ],
      "correta": 1,
      "explicacao": "Bookmarks capturam o estado de uma página do relatório incluindo filtros ativos, seleções e visibilidade de visuais. Podem ser usados para criar stories/apresentações, alternar entre diferentes visões do mesmo relatório, ou criar botões de navegação."
    },
    {
      "pergunta": "Qual é a diferença entre um Dashboard e um Relatório no Power BI Service?",
      "opcoes": [
        "Não há diferença, são termos intercambiáveis",
        "Dashboards são criados no Power BI Desktop; Relatórios são criados no Power BI Service",
        "Dashboards são páginas únicas com blocos de vários relatórios/fontes, sem interatividade de filtros cruzados; Relatórios têm múltiplas páginas com visualizações totalmente interativas",
        "Relatórios são para usuários finais; Dashboards são para administradores"
      ],
      "correta": 2,
      "explicacao": "Dashboards são painéis de página única que compilam blocos de múltiplas fontes (relatórios, conjuntos de dados, URLs), sem filtros cruzados entre blocos. Relatórios têm múltiplas páginas com visualizações totalmente interativas e filtros cruzados."
    },
    {
      "pergunta": "O que é um visual de Principais Influenciadores (Key Influencers) no Power BI e para que serve?",
      "opcoes": [
        "Um visual que mostra os top N produtos por vendas",
        "Um visual de IA que analisa os dados e classifica os fatores que influenciam uma métrica específica, explicando o que aumenta ou diminui um valor",
        "Um visual para mostrar influenciadores de redes sociais",
        "Um gráfico de barras com os principais KPIs"
      ],
      "correta": 1,
      "explicacao": "O visual Principais Influenciadores usa IA para analisar os dados e identificar quais fatores (dimensões) influenciam mais uma métrica específica. Ele explica de forma visual o que aumenta ou diminui um valor, sendo útil para análise de causa raiz."
    },
    {
      "pergunta": "O que é a Árvore de Decomposição (Decomposition Tree) no Power BI e para que serve?",
      "opcoes": [
        "Um visual que mostra a hierarquia das pastas de trabalho",
        "Um visual de IA que permite explorar e decompor uma métrica ao longo de múltiplas dimensões, identificando fatores que contribuem para um valor",
        "Uma ferramenta para visualizar a estrutura do modelo de dados",
        "Um gráfico de árvore hierárquica para dados organizacionais"
      ],
      "correta": 1,
      "explicacao": "A Árvore de Decomposição é um visual de IA que permite explorar uma métrica ao longo de múltiplas dimensões em qualquer ordem. Você pode usá-la para análise ad-hoc e investigação de causa raiz."
    },
    {
      "pergunta": "Qual funcionalidade do Power BI Service permite aos usuários explorar dados fazendo perguntas em linguagem natural?",
      "opcoes": [
        "Quick Insights",
        "Perguntas e Respostas (Q&A)",
        "Analyze in Excel",
        "Decomposition Tree"
      ],
      "correta": 1,
      "explicacao": "O recurso Perguntas e Respostas (Q&A) permite que os usuários façam perguntas sobre seus dados usando linguagem natural e o Power BI gera visualizações automaticamente com base nas respostas."
    },
    {
      "pergunta": "O que é um tooltip de relatório (report tooltip) no Power BI e quando deve ser usado?",
      "opcoes": [
        "Um texto de ajuda exibido quando o usuário passa o mouse sobre um botão de navegação",
        "Uma página especial do relatório que aparece como um popover ao passar o mouse sobre visuais, mostrando informações adicionais de contexto",
        "Uma dica de ferramenta automática gerada pelo Power BI para todos os visuais",
        "Um campo de descrição adicionado às medidas no modelo de dados"
      ],
      "correta": 1,
      "explicacao": "Um tooltip de relatório é uma página especial configurada para aparecer como um popover quando o usuário passa o mouse sobre pontos de dados em visuais. Permite exibir informações detalhadas adicionais sem navegar para outra página."
    },
    {
      "pergunta": "Qual visual do Power BI é mais adequado para mostrar a composição de um total e como cada parte contribui para o todo?",
      "opcoes": [
        "Gráfico de linhas",
        "Gráfico de barras empilhadas ou gráfico de pizza",
        "Gráfico de dispersão",
        "Mapa coroplético"
      ],
      "correta": 1,
      "explicacao": "Gráficos de barras empilhadas e gráficos de pizza são ideais para mostrar composição – como diferentes categorias contribuem para um total. O gráfico de pizza mostra proporções, enquanto as barras empilhadas permitem comparar totais entre categorias."
    },
    {
      "pergunta": "Quais são os blocos de construção (building blocks) do Power BI?",
      "opcoes": [
        "Blocos, dashboards, bancos de dados, dispositivos móveis",
        "Visual Studio, C# e arquivos JSON",
        "Conjuntos de dados, Visualizações, Relatórios, Dashboards e Blocos",
        "Consultas, Modelos, Relatórios e Serviços"
      ],
      "correta": 2,
      "explicacao": "Os blocos de construção do Power BI são: Conjuntos de dados (Datasets), Visualizações (Visualizations), Relatórios (Reports), Dashboards e Blocos (Tiles)."
    },
    {
      "pergunta": "Qual é o principal benefício da análise de dados?",
      "opcoes": [
        "Analytics decisiva",
        "Decisões de negócios informadas",
        "Relatórios complexos",
        "Automatização de processos"
      ],
      "correta": 1,
      "explicacao": "O principal benefício da análise de dados é fornecer insights que levam a decisões de negócios mais informadas e baseadas em evidências."
    },
    {
      "pergunta": "Uma coleção de visuais prontos, pré-organizados em dashboards e relatórios é chamada de quê no Power BI?",
      "opcoes": [
        "A tela (canvas)",
        "Um aplicativo (app)",
        "Um conjunto de dados (dataset)",
        "Uma atualização agendada"
      ],
      "correta": 1,
      "explicacao": "Um aplicativo (App) no Power BI é uma coleção de visuais prontos, relatórios e dashboards pré-organizados que podem ser distribuídos aos usuários como um pacote completo."
    },
    {
      "pergunta": "Qual é o fluxo de atividade comum no Power BI?",
      "opcoes": [
        "Importar dados no Power BI Mobile, criar um relatório e compartilhar com o Power BI Desktop",
        "Importar dados no Power BI Desktop, criar um relatório, publicar no serviço Power BI e visualizar/interagir com os relatórios",
        "Criar um relatório no serviço Power BI, compartilhar com o Power BI Mobile e interagir no Power BI Desktop",
        "Criar um relatório no Power BI Mobile e compartilhar com o Power BI Desktop"
      ],
      "correta": 1,
      "explicacao": "O fluxo comum é: 1) Conectar dados no Power BI Desktop, 2) Criar relatórios, 3) Publicar no serviço Power BI, 4) Visualizar e interagir com relatórios e dashboards."
    },
    {
      "question": "Ao clicar em uma barra de um gráfico, outro visual na mesma página exibe os demais valores em cinza semitransparente, mantendo todos os dados visíveis. Isso é um exemplo de:",
      "options": [
        "Filtro Cruzado (Cross-filter)",
        "Realce Cruzado (Cross-highlight)",
        "Drillthrough",
        "Slicer Sincronizado"
      ],
      "answer": 1,
      "explanation": "Cross-highlight realça os valores relacionados ao selecionado, mantendo os demais valores visíveis (em cinza). Cross-filter efetivamente filtra os outros visuais, removendo os itens não selecionados."
    },
    {
      "question": "Você criou uma página de detalhes de pedidos. Ao clicar com o botão direito em qualquer visual do relatório e selecionar um pedido, o usuário navega para essa página com os dados filtrados. Isso é:",
      "options": [
        "Drill Down hierárquico",
        "Drillthrough",
        "Bookmark de navegação",
        "Tooltip de Relatório"
      ],
      "answer": 1,
      "explanation": "Drillthrough é uma navegação contextual que leva o usuário de um visual para uma página de detalhes, passando automaticamente os filtros do item selecionado. É configurado nas Propriedades da página de destino."
    },
    {
      "question": "Você quer criar um botão que alterna entre exibir um gráfico de barras e um gráfico de pizza na mesma área do relatório. Qual é a abordagem correta?",
      "options": [
        "Criar duas páginas separadas e adicionar botões de navegação",
        "Usar Bookmarks combinados com a seleção de visibilidade de visuais",
        "Usar o painel de Filtros para alternar os tipos de visual",
        "Usar Drillthrough entre os dois visuais"
      ],
      "answer": 1,
      "explanation": "Bookmarks capturam o estado do relatório (incluindo quais visuais estão visíveis). Criando dois bookmarks — um com o gráfico de barras visível e outro com a pizza visível — um botão pode alternar entre eles."
    },
    {
      "question": "Você criou uma página especial e a configurou como Tooltip (Dica de Ferramenta) de relatório. O que acontece quando o usuário passa o mouse sobre um ponto de dados?",
      "options": [
        "A página de tooltip aparece como pop-up com visualizações contextuais ricas",
        "A página de tooltip substitui o visual principal",
        "A página de tooltip é enviada por email para o usuário",
        "A página de tooltip filtra toda a tela atual"
      ],
      "answer": 0,
      "explanation": "Report Page Tooltips aparecem como pop-up ao passar o mouse sobre pontos de dados, exibindo uma página completa de visuais contextualizados com os dados do ponto selecionado. São configuradas nas Propriedades da página."
    },
    {
      "question": "Você quer colorir células de uma tabela automaticamente: verde para metas atingidas e vermelho para abaixo da meta. Qual feature usar?",
      "options": [
        "Temas de Relatório (Report Themes)",
        "Formatação Condicional (Conditional Formatting)",
        "Regras de RLS por cor",
        "Grupos de Cálculo de Cores"
      ],
      "answer": 1,
      "explanation": "Formatação Condicional permite aplicar cores de fundo, cores de fonte, ícones ou barras de dados em tabelas e matrizes, com base em valores, regras ou campos. Está disponível nas configurações de formato do visual."
    },
    {
      "question": "Qual visual do Power BI permite que usuários finais façam perguntas em linguagem natural (ex: 'vendas por estado em 2024') e recebam uma visualização automática?",
      "options": [
        "Árvore de Decomposição (Decomposition Tree)",
        "Visual Q&A",
        "Principais Influenciadores (Key Influencers)",
        "Narrativa Inteligente (Smart Narrative)"
      ],
      "answer": 1,
      "explanation": "O visual Q&A usa processamento de linguagem natural (NLP) para interpretar perguntas em texto e gerar automaticamente a visualização mais adequada para a resposta. Pode ser personalizado com sinônimos e dados de treinamento."
    },
    {
      "question": "Um gerente quer decompor a variação de vendas entendendo quais combinações de Região, Produto e Vendedor mais contribuíram. Qual visual é projetado para esse tipo de análise exploratória em árvore?",
      "options": [
        "Gráfico de Cascata (Waterfall)",
        "Árvore de Decomposição (Decomposition Tree)",
        "Principais Influenciadores (Key Influencers)",
        "Gráfico de Funil (Funnel)"
      ],
      "answer": 1,
      "explanation": "A Árvore de Decomposição permite ao usuário explorar hierarquicamente as contribuições de diferentes dimensões para um valor, com suporte a IA para encontrar automaticamente os maiores influenciadores em cada nível."
    },
    {
      "question": "Você quer descobrir quais fatores aumentam a probabilidade de um cliente avaliar um produto negativamente. Qual visual do Power BI analisa estatisticamente esses influenciadores?",
      "options": [
        "Árvore de Decomposição",
        "Principais Influenciadores (Key Influencers)",
        "Gráfico de Dispersão",
        "Funil (Funnel)"
      ],
      "answer": 1,
      "explanation": "O visual 'Principais Influenciadores' usa análise estatística para identificar quais variáveis (campos) têm maior impacto sobre um resultado específico, mostrando a direção e magnitude da influência."
    },
    {
      "question": "Você tem um slicer de Ano na Página 1 e quer que ele filtre automaticamente as Páginas 2 e 3 do mesmo relatório. O que usar?",
      "options": [
        "Duplicar o slicer em cada página manualmente",
        "Painel 'Sincronizar Segmentações' (Sync Slicers)",
        "Filtros de nível de relatório no painel de Filtros",
        "Bookmarks de sincronização"
      ],
      "answer": 1,
      "explanation": "O painel 'Sincronizar Segmentações' (View → Sync Slicers) permite configurar quais páginas um slicer deve filtrar, com opções de visibilidade e sincronização independentes por página."
    },
    {
      "question": "Como garantir uma experiência otimizada para usuários que acessam o relatório pelo aplicativo Power BI Mobile?",
      "options": [
        "Criar um relatório separado com nome '_mobile'",
        "Usar o Layout Móvel (Mobile Layout) no Power BI Desktop para reorganizar os visuais para tela vertical",
        "Habilitar 'Responsividade' nas configurações avançadas do workspace",
        "Reduzir o número de visuais para menos de 5 por página"
      ],
      "answer": 1,
      "explanation": "O Layout Móvel permite reorganizar e redimensionar os visuais do relatório para uma experiência otimizada em telas verticais de celular, sem criar um relatório separado."
    },
    {
      "question": "Um visual específico no relatório carrega muito lentamente. Qual ferramenta do Power BI Desktop permite medir o tempo de carregamento de cada visual e identificar consultas DAX lentas?",
      "options": [
        "Query Diagnostics no Power Query",
        "Analisador de Performance (Performance Analyzer)",
        "DAX Studio (ferramenta externa)",
        "Monitor de Gateway no Power BI Service"
      ],
      "answer": 1,
      "explanation": "O Analisador de Performance (View → Performance Analyzer) registra o tempo que cada visual levou para renderizar, separando em tempo DAX, Visual e outro. Permite copiar a consulta DAX para análise externa."
    },
    {
      "question": "Você quer que todos os relatórios da empresa usem automaticamente as cores e fontes corporativas. Qual é a abordagem MAIS escalável?",
      "options": [
        "Configurar cada visual manualmente em cada relatório",
        "Criar um arquivo de Tema JSON personalizado e aplicar a todos os relatórios",
        "Usar formatação condicional em cada relatório",
        "Configurar no portal de Administração do Power BI Service"
      ],
      "answer": 1,
      "explanation": "Temas de Relatório (JSON) definem cores, fontes, estilos padrão para todos os tipos de visual. O arquivo .json pode ser aplicado a qualquer relatório e distribuído pela organização."
    },
    {
      "question": "Você precisa exibir o gráfico de tendência de vendas separadamente para cada categoria de produto, com o mesmo eixo Y para facilitar a comparação. Qual feature usar?",
      "options": [
        "Criar um visual separado para cada categoria manualmente",
        "Pequenos Múltiplos (Small Multiples)",
        "Drill Down por Categoria",
        "Filtro de Visual em cada gráfico"
      ],
      "answer": 1,
      "explanation": "Pequenos Múltiplos repetem o mesmo visual para cada valor de uma dimensão escolhida, com escala padronizada, facilitando a comparação visual entre grupos. Disponível em gráficos de barras, linhas, área e dispersão."
    },
    {
      "question": "Você precisa mostrar como o lucro líquido foi formado, exibindo receitas (positivas) e deduções/impostos (negativos) até chegar ao valor final. Qual visual é mais adequado?",
      "options": [
        "Gráfico de Barras Empilhadas",
        "Gráfico Cascata (Waterfall Chart)",
        "Gráfico de Área",
        "Gráfico de Rosca (Donut)"
      ],
      "answer": 1,
      "explanation": "O Gráfico Cascata (Waterfall) é projetado para mostrar como um valor inicial é afetado por uma série de valores positivos e negativos ao longo de uma sequência, chegando ao valor final."
    },
    {
      "question": "Qual é a diferença entre Modo Foco (Focus Mode) e Destaque (Spotlight) em um visual do Power BI?",
      "options": [
        "Não há diferença, são sinônimos",
        "Modo Foco expande o visual para ocupar toda a tela de relatório; Spotlight ilumina o visual enquanto escurece os demais, mantendo o contexto da página",
        "Spotlight remove os outros visuais da página; Modo Foco os mantém",
        "Modo Foco é exclusivo para tabelas e matrizes"
      ],
      "answer": 1,
      "explanation": "Modo Foco: o visual ocupa toda a tela (outros visuais ficam ocultos). Spotlight: o visual fica iluminado e os demais ficam escurecidos, mas todos permanecem visíveis na mesma página."
    },
    {
      "question": "Você quer impedir que visuais de uma página se filtrem mutuamente quando o usuário clica neles. Como configurar isso para um visual específico?",
      "options": [
        "Desabilitar 'Interações Visuais' no menu Formatar Visual",
        "Em 'Editar Interações', selecionar o ícone de 'sem filtro' para o visual desejado",
        "Usar RLS para bloquear o filtro cruzado",
        "Criar a página em modo de 'Leitura'"
      ],
      "answer": 1,
      "explanation": "'Editar Interações' (Format → Edit Interactions) permite controlar como cada visual responde às seleções nos outros visuais, podendo definir: Filtro, Realce ou Nenhum para cada par de visuais."
    },
    {
      "question": "Um relatório tem 10 páginas e você quer criar um índice/menu de navegação visual. Qual recurso usar para criar botões que levam o usuário a páginas específicas?",
      "options": [
        "Criar links de texto em uma caixa de texto",
        "Usar Botões (Buttons) com a Ação configurada para 'Navegação de Página'",
        "Usar o painel de Bookmarks para navegar",
        "Adicionar o visual 'Navegador de Páginas' (Page Navigator)"
      ],
      "answer": 3,
      "explanation": "O visual 'Navegador de Páginas' (inserido como botão ou visual) cria automaticamente botões de navegação para todas as páginas visíveis do relatório. Botões individuais com ação 'Navegação de Página' também funcionam para páginas específicas."
    },
    {
      "question": "Qual é o comportamento padrão ao usar um Slicer (Segmentador de Dados) com o tipo 'Lista' no Power BI?",
      "options": [
        "Permite selecionar apenas um item por vez (seleção única)",
        "Permite selecionar múltiplos itens usando Ctrl+Clique; a seleção única requer desabilitar 'Seleção Múltipla'",
        "Filtra automaticamente todos os outros slicers da página",
        "Cria um filtro de nível de relatório automaticamente"
      ],
      "answer": 1,
      "explanation": "Por padrão, os Slicers do Power BI permitem múltipla seleção via Ctrl+Clique ou ativando o botão 'Selecionar tudo'. A seleção única pode ser forçada nas configurações do slicer."
    },
    {
      "question": "Você precisa exibir informações detalhadas ao passar o mouse sobre um ponto de um gráfico de dispersão, mostrando mais de 3 campos. Qual é a melhor abordagem?",
      "options": [
        "Adicionar mais colunas ao visual até o limite máximo de campos",
        "Criar uma Página de Tooltip de Relatório com múltiplos visuais e associá-la ao gráfico",
        "Usar o visual de Tabela ao lado do gráfico",
        "Habilitar a opção 'Detalhes Expandidos' nas configurações do visual"
      ],
      "answer": 1,
      "explanation": "Páginas de Tooltip de Relatório permitem criar uma exibição rica e personalizada com múltiplos visuais que aparecem ao passar o mouse sobre qualquer ponto de dados, sem limitação de campos."
    },
    {
      "question": "Qual visual é mais adequado para mostrar a distribuição de frequência de valores numéricos (ex.: distribuição de idades de clientes)?",
      "options": [
        "Gráfico de Barras Clusterizado",
        "Histograma (criado com agrupamento no Gráfico de Colunas)",
        "Gráfico de Pizza",
        "Gráfico de Cascata"
      ],
      "answer": 1,
      "explanation": "Histogramas mostram a distribuição de frequências de uma variável numérica contínua. No Power BI, são criados usando o Gráfico de Colunas com a coluna de dados agrupada em intervalos (bins)."
    },
    {
      "question": "Você criou um relatório com dados de vendas e quer adicionar um 'Resumo Automático' em linguagem natural que descreve os insights principais. Qual visual usar?",
      "options": [
        "Q&A Visual",
        "Narrativa Inteligente (Smart Narrative)",
        "Caixa de Texto com fórmulas DAX",
        "Visual de Cartão (Card)"
      ],
      "answer": 1,
      "explanation": "O visual Narrativa Inteligente gera automaticamente um resumo em linguagem natural baseado nos dados do relatório, identificando tendências, outliers e comparações. O texto pode ser personalizado com valores dinâmicos."
    },
    {
      "question": "Em um gráfico de linhas com hierarquia de datas (Ano > Trimestre > Mês > Dia), qual é a função de 'Drill Down'?",
      "options": [
        "Filtra o gráfico para mostrar apenas os dados do período clicado",
        "Expande o nível atual da hierarquia para o próximo nível mais detalhado para o item clicado, mantendo o filtro contextual",
        "Navega para outra página com detalhes (drillthrough)",
        "Exibe uma tooltip com detalhes adicionais"
      ],
      "answer": 1,
      "explanation": "Drill Down desce um nível na hierarquia mantendo o contexto do item clicado. Por exemplo: clicando em '2024' no gráfico anual, o gráfico passa a mostrar os trimestres de 2024. É diferente de Drill Through."
    },
    {
      "question": "Qual é o propósito do painel 'Seleção' (Selection Pane) no Power BI Desktop?",
      "options": [
        "Permite selecionar e filtrar dados de múltiplas fontes simultaneamente",
        "Gerencia a visibilidade, a ordem de empilhamento e os nomes de todos os visuais e objetos na página do relatório",
        "Configura as interações entre os visuais",
        "Lista todas as medidas DAX disponíveis"
      ],
      "answer": 1,
      "explanation": "O Painel de Seleção (View → Selection) mostra todos os objetos da página, permitindo: renomeá-los (importante para bookmarks), ocultar/mostrar individualmente, e controlar a ordem de empilhamento (Z-order)."
    },
    {
      "question": "Você quer que um gráfico de linhas exiba automaticamente uma linha de tendência estatística. Como adicionar isso no Power BI?",
      "options": [
        "Criar uma medida de Regressão Linear no DAX",
        "Usar a opção 'Linha de Tendência' em Analytics (Análise) do painel de formatação do visual",
        "Usar o visual Python Script para plotar a tendência",
        "Adicionar uma coluna calculada com os valores previstos"
      ],
      "answer": 1,
      "explanation": "O painel 'Análise' (Analytics) dos visuais de gráfico de linhas e dispersão oferece linhas automáticas de: Tendência, Média, Mediana, Percentil, Máximo, Mínimo, entre outras, sem necessidade de DAX."
    },
    {
      "question": "Qual é a diferença entre um Dashboard e um Relatório no Power BI Service?",
      "options": [
        "Dashboards têm mais páginas que relatórios",
        "Dashboards são telas únicas com tiles de múltiplos relatórios/datasets, sem filtros interativos; Relatórios têm múltiplas páginas com visuais interativos e filtros",
        "Dashboards são criados no Power BI Desktop; Relatórios no Service",
        "Relatórios suportam RLS; Dashboards não"
      ],
      "answer": 1,
      "explanation": "Dashboards: tela única, tiles (recortes) de múltiplas fontes, alertas de dados, sem filtros por página. Relatórios: múltiplas páginas, visuais interativos com filtros, drillthrough, bookmarks — editáveis no Desktop."
    },
    {
      "question": "Como configurar um visual para que ele seja excluído de todas as interações de outros visuais na página (nem filtrado, nem realçado)?",
      "options": [
        "Bloquear o visual no painel de Seleção",
        "Em 'Editar Interações', definir o tipo de interação como 'Nenhum' para esse visual em relação a todos os outros",
        "Usar RLS para proteger o visual",
        "Mover o visual para outra página"
      ],
      "answer": 1,
      "explanation": "'Editar Interações' permite definir para cada par de visuais se a seleção em um deve Filtrar, Realçar ou Não afetar o outro. Definindo 'Nenhum' (None) para todos os outros visuais em relação ao visual protegido."
    },
    {
      "question": "Qual é a finalidade dos 'Grupos' (Grouping) e 'Compartimentos' (Binning) no Power BI Desktop?",
      "options": [
        "Agrupar visuais no canvas para facilitar o layout",
        "Agrupar valores de colunas categóricas em grupos personalizados ou criar intervalos numéricos, simplificando a análise de dados granulares",
        "Compartimentar relatórios em workspaces separados",
        "Agrupar medidas em pastas de exibição"
      ],
      "answer": 1,
      "explanation": "Grouping permite agrupar valores categóricos (ex.: 'SP', 'RJ' → 'Sudeste'). Binning divide valores numéricos ou datas em intervalos (ex.: idades em grupos 0-18, 18-30, 30-50), criando novas categorias para análise."
    },
    {
      "question": "Você quer adicionar uma imagem de logotipo corporativo que seja clicável e navegue para o site da empresa. Como fazer isso no Power BI Desktop?",
      "options": [
        "Inserir uma imagem comum e adicionar uma URL no campo 'Página de Destino'",
        "Adicionar um botão com uma imagem como fundo e configurar a Ação para 'URL da Web'",
        "Usar uma caixa de texto com link hiperlink",
        "Não é possível adicionar links externos no Power BI Desktop"
      ],
      "answer": 1,
      "explanation": "Botões no Power BI Desktop suportam ações como: Bookmark, Navegação de Página, Q&A, Drillthrough e URL da Web. Usando uma imagem como fundo do botão e configurando a ação como 'URL da Web', cria-se um logo clicável."
    },
    {
      "question": "Qual visual do Power BI é mais indicado para mostrar a correlação entre duas variáveis numéricas?",
      "options": [
        "Gráfico de Linhas",
        "Gráfico de Dispersão (Scatter Chart)",
        "Gráfico de Barras Clusterizado",
        "Treemap"
      ],
      "answer": 1,
      "explanation": "O Gráfico de Dispersão posiciona pontos em um eixo X e Y numérico, mostrando visualmente a correlação (positiva, negativa ou ausente) entre duas variáveis. Pode incluir uma terceira dimensão pelo tamanho das bolhas."
    },
    {
      "question": "Como um desenvolvedor pode testar como um relatório será exibido para diferentes perfis de RLS sem precisar compartilhar com cada usuário?",
      "options": [
        "Publicar no Service e logar com credenciais de cada usuário",
        "Usar 'Exibir Como' (View As) com o papel RLS desejado diretamente no Power BI Desktop ou Service",
        "Criar relatórios separados para cada perfil",
        "Usar o modo de Depuração do Power BI Desktop"
      ],
      "answer": 1,
      "explanation": "'Exibir Como' (View As Role) permite que administradores e criadores de relatório visualizem o conteúdo como se fossem um usuário pertencente a um papel RLS específico, sem precisar das credenciais desse usuário."
    },
    {
      "question": "Qual é o propósito do visual 'Medidor' (Gauge) no Power BI e quando é mais adequado usá-lo?",
      "options": [
        "Para mostrar a distribuição de valores em uma escala",
        "Para mostrar o progresso de um único valor em relação a um mínimo, máximo e meta, como um velocímetro",
        "Para comparar múltiplas métricas simultaneamente",
        "Para exibir tendências ao longo do tempo"
      ],
      "answer": 1,
      "explanation": "O visual Medidor é ideal para exibir um único KPI em relação a um valor meta, como '% de atingimento de meta de vendas'. Por mostrar apenas um valor, deve ser usado com parcimônia — prefira KPIs ou cartões para múltiplas métricas."
    },
    {
      "question": "Ao selecionar uma categoria em um gráfico de barras, você percebe que os outros visuais da tela mantêm os itens não relacionados visíveis, mas com uma transparência cinza. Você quer que os visuais ocultem completamente os dados não selecionados. Como configurar isso?",
      "options": [
        "Aumentar a transparência dos elementos na folha de temas JSON",
        "Habilitar a edição de interações (Format → Edit Interactions) e mudar o ícone de interação do visual selecionado de 'Realçar' (Highlight) para 'Filtrar' (Filter)",
        "Configurar a RLS visual dos elementos de gráfico",
        "Mapear todos os gráficos em um único grupo de segmentação de dados sincronizado"
      ],
      "answer": 1,
      "explanation": "Por padrão, o Power BI usa 'Cross-highlight' (Realce cruzado) para interações visuais. Ao ativar 'Editar Interações' (guia Formato), você pode selecionar um visual e definir, nos pequenos ícones no topo dos demais visuais, se eles devem Filtrar completamente (ícone de funil), Realçar parcialmente (ícone de gráfico) ou Não interagir (ícone de bloqueio)."
    },
    {
      "question": "Você desenvolveu uma página de destino detalhada configurada para Drillthrough. Para garantir que apenas a categoria exata selecionada no visual de origem seja passada como filtro para a página de Drillthrough, ignorando outros filtros ativos na página de origem, qual propriedade deve ser alterada?",
      "options": [
        "Marcar a opção 'Sincronizar filtros na página'",
        "Desativar a opção 'Manter todos os filtros' (Keep all filters) nas propriedades de configuração do campo de Drillthrough da página de destino",
        "Bloquear os filtros do painel lateral de filtragem do relatório",
        "Converter a página de destino para o tipo Dica de Ferramenta (Tooltip)"
      ],
      "answer": 1,
      "explanation": "A opção 'Manter todos os filtros' (Keep all filters) vem ativa por padrão nas páginas de Drillthrough. Se você deseja ignorar quaisquer outros filtros ativos na página de origem (ex: filtros de ano, região) e passar exclusivamente o campo de cruzamento selecionado, deve desativá-la."
    },
    {
      "question": "Qual funcionalidade analítica de Inteligência Artificial integrada ao Power BI gera textos automatizados de síntese explicativa sobre o comportamento, tendências e anomalias de um conjunto de gráficos, além de aceitar a inclusão de medidas dinâmicas criadas pelo usuário?",
      "options": [
        "Visual Q&A (Perguntas e Respostas)",
        "Narrativa Inteligente (Smart Narrative)",
        "Árvore de Decomposição (Decomposition Tree)",
        "Principais Influenciadores (Key Influencers)"
      ],
      "answer": 1,
      "explanation": "O visual de Narrativa Inteligente analisa os dados selecionados em tela e redige de forma automática um sumário textual inteligente. O analista pode editar o texto bruto e inserir perguntas ou medidas DAX dinâmicas dentro dos parágrafos, que se recalculam conforme filtros de tela são acionados."
    },
    {
      "question": "Ao utilizar o visual analítico de IA 'Principais Influenciadores' (Key Influencers) para investigar uma métrica que possui comportamento contínuo (por exemplo, Valor de Venda em números decimais), qual método estatístico de análise é executado silenciosamente por trás do gráfico?",
      "options": [
        "Regressão Logística",
        "Regressão Linear",
        "Árvores de Decisão baseadas em entropia",
        "Agrupamento de K-means"
      ],
      "answer": 1,
      "explanation": "Para resultados categóricos (ex: Cliente Cancelou = Sim/Não), o visual Key Influencers executa uma Regressão Logística. Para resultados numéricos contínuos (ex: Valor da Venda), ele computa uma Regressão Linear para identificar o quanto cada variável altera a média da métrica analisada."
    },
    {
      "question": "Você precisa criar botões de navegação para todas as 10 páginas de um relatório corporativo. Qual é a abordagem recomendada visando facilitar alterações futuras de layout e evitar retrabalho manual?",
      "options": [
        "Criar botões manuais usando imagens personalizadas copiadas página por página",
        "Inserir um visual nativo de 'Navegador de Páginas' (Page Navigator), que lê automaticamente a estrutura de páginas do arquivo e se atualiza de forma autônoma",
        "Usar código JavaScript embutido em um visual de HTML customizado",
        "Escrever bookmarks específicos para transições e atribuí-los a botões"
      ],
      "answer": 1,
      "explanation": "O visual 'Navegador de Páginas' (Inserir → Botões → Navegador) gera automaticamente uma barra com botões para as páginas do relatório. Se você adicionar, remover, renomear ou reordenar páginas posteriormente, o visual se atualiza automaticamente, eliminando a manutenção manual."
    },
    {
      "question": "Ao criar um layout de visualização otimizado para Dispositivos Móveis (Mobile Layout) no Power BI Desktop, qual é a flexibilidade de formatação dada ao designer no editor de celular?",
      "options": [
        "Nenhuma, as configurações visuais do desktop são replicadas idênticamente sem personalização de estilo",
        "É possível alterar tamanhos de fontes, alinhamentos, bordas e cores de elementos visuais específicos para celular, sem alterar o visual no layout padrão de computador",
        "Apenas a posição e ordem dos visuais podem ser ajustadas; qualquer alteração de cor é replicada de volta ao desktop",
        "A edição móvel exige duplicar e criar visuais exclusivos para celular na aba desktop"
      ],
      "answer": 1,
      "explanation": "O Power BI Desktop suporta formatação independente para o Layout Móvel. Propriedades de texto, tamanho de fonte, alinhamentos, cores de fundo e formatações de grades/títulos podem ser alteradas exclusivamente na visualização móvel sem afetar a versão clássica do relatório desktop."
    },
    {
      "question": "Ao utilizar a ferramenta de 'Analisador de Performance' (Performance Analyzer) no Power BI Desktop, qual é o principal benefício de utilizar o botão 'Copiar Consulta' (Copy Query) em um visual de matriz lento?",
      "options": [
        "Copiar a planilha Excel resultante do visual para o clipboard",
        "Obter o código de consulta DAX exato executado pelo visual, permitindo que você o analise, debuge e otimize em ferramentas externas como o DAX Studio ou Tabular Editor",
        "Copiar o estilo de cores CSS do visual para aplicar em outros cards",
        "Enviar o relatório visual direto para análise de desempenho na nuvem"
      ],
      "answer": 1,
      "explanation": "O 'Copiar Consulta' extrai a instrução DAX bruta gerada pelo motor do Power BI para renderizar aquele visual específico na página. Colar essa consulta no DAX Studio permite rodar análises de plano de execução (Server Timings / Query Plan) para mapear o porquê de o cálculo estar lento."
    },
    {
      "question": "Para configurar com sucesso uma página personalizada de relatório para atuar como dica de ferramenta visual (Report Page Tooltip) ao passar o mouse em pontos de dados de outros visuais, quais duas ações de formatação de página de destino são requeridas?",
      "options": [
        "Configurar o Tipo de Página como 'Dica de ferramenta' (Tooltip) sob as informações da página e ajustar o tamanho do papel para dimensões reduzidas (ex: tamanho Tooltip)",
        "Deixar a página com tamanho padrão 16:9 e ativar RLS nas propriedades",
        "Definir a página como oculta e marcar a opção 'Drillthrough cruzado'",
        "Criar um bookmark com a página invisível"
      ],
      "answer": 0,
      "explanation": "A página que atuará como pop-up deve ter nas configurações de página o tipo configurado como 'Dica de ferramenta' (Tooltip) e ter seu tamanho de tela reduzido (o tamanho padrão do modelo Tooltip é 320x240 pixels) para que o pop-up não oclua excessivamente o gráfico principal."
    },
    {
      "question": "Você deseja criar um Bookmark (Indicador) no Power BI que oculte temporariamente um visual de detalhe na tela quando ativado, mas quer garantir que qualquer filtro de dados ou seleção de slicer atual feita pelo usuário não seja perdida ou reiniciada ao clicar no botão do Bookmark. Qual opção do Bookmark deve ser desmarcada?",
      "options": [
        "Exibição (Display)",
        "Dados (Data)",
        "Página atual (Page)",
        "Visuais selecionados (Selected visuals)"
      ],
      "answer": 1,
      "explanation": "Cada bookmark grava três estados principais: Dados (filtros, segmentações), Exibição (visibilidade, modo de foco) e Página. Se você quer que o bookmark apenas controle quais visuais estão escondidos/exibidos em tela, mas respeite as seleções de filtro atuais do usuário, deve desmarcar a propriedade 'Dados' nas opções do bookmark."
    },
    {
      "question": "Um analista precisa exibir graficamente o fluxo de receitas corporativas, partindo do Faturamento Bruto e deduzindo passo a passo impostos, custos e despesas até atingir o Lucro Líquido final. Qual tipo de visual nativo atende perfeitamente este caso de uso?",
      "options": [
        "Gráfico de Dispersão (Scatter Chart)",
        "Gráfico de Cascata (Waterfall Chart)",
        "Gráfico de Funil (Funnel Chart)",
        "Treemap"
      ],
      "answer": 1,
      "explanation": "O gráfico de Cascata (Waterfall) é projetado especificamente para ilustrar como um valor inicial é modificado por incrementos positivos e decrementos negativos cumulativos até atingir um saldo final, exibindo pilares flutuantes de conciliação."
    },
    {
      "question": "Você deseja construir um gráfico interativo no Power BI que exiba o histórico de evolução anual das vendas e das margens de lucro dos seus concorrentes no mesmo plano cartesiano, rodando uma animação que trace o caminho ano a ano de forma fluida. Qual visual nativo e recurso específico atende esta necessidade?",
      "options": [
        "Gráfico de Linha com múltiplos níveis de hierarquia de datas",
        "Gráfico de Dispersão (Scatter Chart) associado ao recurso de Eixo de Reprodução (Play Axis) contendo a coluna de Anos",
        "Árvore de Decomposição visualizada em cascata",
        "Gráfico de Velocímetro dinâmico"
      ],
      "answer": 1,
      "explanation": "O gráfico de Dispersão aceita um campo no campo 'Eixo de reprodução' (Play Axis). Quando preenchido com uma dimensão de tempo (como Ano ou Mês), ele habilita um painel multimídia no relatório (com botão Play). Ao clicar, as bolhas de dispersão se movem deixando um rastro histórico dinâmico de sua trajetória."
    },
    {
      "question": "Um desenvolvedor aplica uma restrição de dados no painel de filtragem do relatório na seção 'Filtros neste visual'. Onde este filtro atuará quando o relatório for publicado?",
      "options": [
        "Filtrará todas as páginas do relatório para todos os visuais",
        "Filtrará todos os visuais da página atual",
        "Atuará exclusivamente no visual específico que estava selecionado no momento da criação do filtro",
        "Filtrará apenas os segmentadores de dados (slicers)"
      ],
      "answer": 2,
      "explanation": "O painel de filtros do Power BI possui três níveis clássicos: Filtros neste visual (afeta apenas o gráfico selecionado), Filtros nesta página (afeta todos os elementos da página atual) e Filtros em todas as páginas (afeta o relatório completo)."
    },
    {
      "question": "Você possui duas páginas em seu relatório com layouts diferentes de segmentadores de dados (uma página usa um slicer no formato Lista e a outra no formato Menu Suspenso), mas ambos filtram a coluna Região. Como você garante que ao alterar o filtro em um deles, o outro seja atualizado automaticamente para manter a sincronia?",
      "options": [
        "Os slicers de formatos diferentes são incompatíveis e não podem ser sincronizados",
        "Configurando o mesmo Nome de Grupo de Sincronização (Sync Group Name) nas Opções Avançadas do painel 'Sincronizar Segmentações' para ambos os slicers",
        "Agrupando ambos os slicers em um único Bookmark de dados",
        "Duplicando as páginas e aplicando RLS nas mesmas"
      ],
      "answer": 1,
      "explanation": "Ao abrir a Exibição → Sincronizar Segmentações, você pode acessar as Opções Avançadas de cada slicer e atribuir um 'Nome de Grupo' personalizado. Qualquer slicer que compartilhe o mesmo nome de grupo ficará sincronizado de forma bidirecional, mesmo que pertença a páginas distintas ou use layouts visuais diferentes."
    },
    {
      "question": "Você quer destacar o background das células de uma coluna de Lucro em sua tabela com cores customizadas, baseando-se estritamente em códigos hexadecimais de cor (ex: '#00FF00' para lucro, '#FF0000' para prejuízo) gerados e armazenados diretamente em uma coluna calculada no seu modelo de dados. Qual estilo de Formatação Condicional aplicar?",
      "options": [
        "Gradiente de cores",
        "Regras estáticas",
        "Valor do Campo (Field Value)",
        "Escala de cores automática"
      ],
      "answer": 2,
      "explanation": "Ao escolher 'Valor do Campo' (Field Value) como a base de formatação nas opções de Formatação Condicional, o Power BI lê os códigos hexadecimais textuais armazenados na coluna selecionada do modelo e os aplica diretamente como estilo (background ou fonte), garantindo flexibilidade total controlada por DAX ou banco."
    },
    {
      "question": "Um relatório corporativo plota mais de 50.000 localizações geográficas detalhadas de lojas em um visual de Mapa. O carregamento de renderização está extremamente lento e o visual apresenta avisos de limite de plotagem. Qual é a melhor prática recomendada para contornar essa falha de alta cardinalidade?",
      "options": [
        "Mudar a conexão de todos os dados do mapa para DirectQuery",
        "Preencher o mapa usando agregações de hierarquia (ex: agrupar por Estado ou Código Postal) em vez de coordenadas de latitude/longitude detalhadas individuais, e ativar o agrupamento de bolhas (clustering)",
        "Remover completamente o mapa e usar tabelas estáticas de texto",
        "Converter as colunas geográficas para tipo Decimal de alta precisão"
      ],
      "answer": 1,
      "explanation": "Plotar milhares de coordenadas individuais satura o visual do mapa e a memória do navegador. Agrupar os pontos em níveis hierárquicos (ex: Cidade, Estado) permite fazer drill-down conforme necessário. Habilitar o 'Clustering' (agrupamento de bolhas) consolida pontos próximos em um único círculo numérico, aliviando a performance visual."
    },
    {
      "question": "Você possui uma tabela de Vendas e cria um visual de mapa contendo a coluna 'Zone' (que armazena nomes de estados norte-americanos). O mapa plota incorretamente bolhas em cidades aleatórias do mundo. Como garantir que as bolhas representem estados corretamente?",
      "options": [
        "Adicionar uma coluna contendo o termo 'Estados Unidos' em todas as linhas",
        "Obter coordenadas exatas de latitude e longitude para cada zona e adicioná-las no mapa",
        "Selecionar o campo 'Zone' e, na guia de Modelagem, alterar a Categoria de Dados para 'Estado ou Província'",
        "Alterar o tipo de dados da coluna para Inteiro"
      ],
      "answer": 2,
      "explanation": "Alterar a Categoria de Dados (Data Category) de uma coluna de texto para termos geográficos específicos (como Estado ou Província, Cidade, Código Postal) ajuda o serviço de mapas do Bing a geolocalizar corretamente as localizações."
    },
    {
      "question": "Você cria um gráfico de colunas empilhadas contendo a coluna 'Data'. O gráfico exibe todas as datas diárias individuais no eixo X, o que deixa o visual poluído. Você quer que exiba dados consolidados por Ano e que o usuário possa fazer Drill down para ver por Semana e Dia. O que fazer?",
      "options": [
        "Criar uma nova tabela de calendário com colunas de data, ano, semana e dia, e usá-las para criar uma hierarquia no eixo X do gráfico",
        "Criar uma nova hierarquia de data diretamente dentro da tabela fato de vendas",
        "Alterar o eixo X para o tipo Categórico nas propriedades do gráfico",
        "Adicionar um filtro visual avançado para a coluna de data"
      ],
      "answer": 0,
      "explanation": "Usar uma tabela calendário adequada contendo os níveis hierárquicos e adicioná-los em sequência no campo de 'Eixo' do gráfico cria uma hierarquia de drill-down limpa e profissional."
    },
    {
      "question": "Ao estruturar relatórios corporativos na plataforma Power BI, quais são considerados os blocos de construção essenciais da arquitetura do serviço?",
      "options": [
        "Linguagem M, Scripts R, HTML e consultas SQL",
        "Workspaces, Fluxos de dados, Gateways e conexões locais",
        "Conjuntos de Dados (Datasets), Visualizações, Relatórios, Painéis (Dashboards) e Blocos (Tiles)",
        "Arquivos PBIX, Arquivos RDL, Temas JSON e arquivos CSV"
      ],
      "answer": 2,
      "explanation": "A hierarquia clássica de entrega do Power BI Service é baseada em importar/modelar dados (Datasets) -> criar visuais individuais (Visualizations) -> reuni-los em abas (Reports) -> fixar visuais importantes em telas únicas (Dashboards) contendo blocos interativos (Tiles)."
    },
    {
      "question": "No Power BI Service, qual é a diferença de comportamento interativo quando um usuário clica em um visual fixado em um Dashboard (painel) corporativo, comparado a clicar em um gráfico dentro de um Relatório?",
      "options": [
        "Clicar em um visual do Dashboard navega o usuário de volta ao relatório de origem correspondente; clicar em um gráfico no relatório aplica filtros e realça dados em outros visuais da mesma página",
        "Ambos realizam filtros cruzados dinâmicos nas respectivas telas",
        "O visual do Dashboard abre o editor de consultas M",
        "O visual de relatório é estático"
      ],
      "answer": 0,
      "explanation": "Dashboards são painéis executivos de monitoramento estáticos e rápidos. Seus blocos (tiles) agem como links rápidos. Ao clicar nele, você é direcionado para o relatório interativo de origem, onde os filtros cruzados funcionam dinamicamente."
    },
    {
      "question": "Você precisa padronizar as cores, fontes, estilos e margens padrão de todos os visuais corporativos para que sigam estritamente o manual de marca da empresa. Qual é a melhor prática para aplicar essa formatação?",
      "options": [
        "Modificar as cores manualmente em cada gráfico de todas as páginas dos relatórios",
        "Importar um arquivo de tema JSON personalizado que define os estilos visuais globais para o relatório atual",
        "Escrever regras CSS customizadas na aba de opções avançadas",
        "Publicar um workspace público e mudar o tema corporativo no Service"
      ],
      "answer": 1,
      "explanation": "Os arquivos de tema JSON contêm especificações de paleta de cores e configurações padrão para os visuais. Ao importar o JSON, o Power BI o aplica instantaneamente a todos os gráficos, mantendo consistência de marca."
    },
    {
      "question": "Você configurou uma página de dica de ferramenta visual de relatório (Tooltip) com detalhes adicionais de vendas. Como vincular essa página para que apareça automaticamente ao passar o mouse em um gráfico de barras na página principal?",
      "options": [
        "Arrastar o nome da página de tooltip para o campo de legenda do gráfico",
        "Habilitar dicas de ferramentas nas propriedades de formato do gráfico de destino, alterar o tipo para Página de Relatório e selecionar o nome da página criada",
        "Mapear a página de tooltip como uma ação de botão de navegação",
        "Ativar a sincronização de segmentadores"
      ],
      "answer": 1,
      "explanation": "O gráfico principal consome o tooltip configurando a seção 'Dica de ferramenta' (Tooltip) nas propriedades visuais: Tipo = Página de Relatório, e selecionando a página de destino que foi marcada como Tooltip."
    },
    {
      "question": "Um visual de matriz complexo demora mais de 10 segundos para carregar no relatório do Power BI Desktop. Como você identifica se o atraso se deve a uma consulta DAX ineficiente, tempo de renderização gráfica ou processamento na fonte?",
      "options": [
        "Executar o Diagnóstico de Consulta do Power Query",
        "Utilizar o Analisador de Performance (Performance Analyzer) e analisar os tempos detalhados de DAX, Renderização e Outros para o visual",
        "Criar um alerta de dados no Service",
        "Mudar a conexão de import para DirectQuery"
      ],
      "answer": 1,
      "explanation": "O Analisador de Performance registra logs milissegundo a milissegundo de cada visual em tela, identificando gargalos exatos divididos em Consulta DAX, Renderização Visual e tempo de espera interno (Outros)."
    },
    {
      "question": "Você está analisando a correlação entre Vendas e Lucratividade de milhares de produtos usando um gráfico de Dispersão (Scatter Chart). Para identificar agrupamentos naturais de comportamento sem definir regras manuais, qual recurso usar?",
      "options": [
        "Aplicar filtros visuais de categoria",
        "Executar o recurso de Agrupamento Automático (Clustering / Localizar Clusters) integrado no painel de análise do gráfico",
        "Criar um parâmetro de What-if de cor",
        "Usar RLS por clusters"
      ],
      "answer": 1,
      "explanation": "O Power BI possui algoritmo de K-means nativo no painel de análise de gráficos de dispersão e tabelas. O recurso de clusterização cria colunas de agrupamento automaticamente baseando-se em padrões matemáticos dos eixos."
    },
    {
      "question": "Ao criar um painel de filtros retrátil no relatório (que abre e fecha ao clicar em ícones), você usa Bookmarks. Quais dois painéis auxiliares do Power BI Desktop devem estar ativos para configurar essa interatividade de ocultar e exibir visuais?",
      "options": [
        "Painel de Indicadores (Bookmarks) e Painel de Seleção (Selection)",
        "Painel de Filtros e Painel de Modelagem",
        "Painel de Propriedades e Visualização de Dados",
        "Painel de Gateway e Painel de Campos"
      ],
      "answer": 0,
      "explanation": "O painel de Seleção é crucial porque permite alternar a visibilidade (ícone de olho) de cada gráfico individualmente. O painel de Indicadores grava esses estados de exibição para criar a interatividade."
    },
    {
      "question": "Você está desenhando um relatório corporativo focado em ser exibido exclusivamente em TVs de monitoramento na recepção da empresa. Como configurar a visualização da tela para preencher 100% do monitor sem barras de rolagem?",
      "options": [
        "Ajustar a visualização da página para 'Ajustar à Página' (Fit to Page) nas opções de exibição e configurar o tamanho de tela adequado nas propriedades da página",
        "Reduzir a resolução das imagens",
        "Configurar o layout de tela como Tooltip",
        "Usar visualização mobile"
      ],
      "answer": 0,
      "explanation": "Configurar a exibição como 'Ajustar à Página' (Fit to Page) dimensiona dinamicamente a área de desenho do Power BI para caber nas dimensões físicas do monitor, garantindo apresentação limpa."
    }
  ],
  "Implementar e Manter": [
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following functions allows you to define filtered views for a specific list of users?",
      "opcoes": [
        "USER",
        "USERPRINCIPALNAME",
        "ROLE",
        "USERELATIONSHIP"
      ],
      "correta": 1,
      "explicacao": "Resposta: USERPRINCIPALNAME Dynamic roles allow you to define filtered views for a specific list of users with the DAX functions USERNAME or USERPRINCIPALNAME."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "Which of the following is a benefit of incremental refresh?",
      "opcoes": [
        "Faster refresh times",
        "More reliable",
        "Reduced resource usage",
        "All of the above"
      ],
      "correta": 3,
      "explicacao": "Resposta: All of the above Incremental Refresh is the process of reloading only the part of a dataset that may change over time and adding it to the rest of the data set that no longer changes, which includes all 3 of these benefits."
    },
    {
      "pergunta": "O Report1.pbix tem custom visuals. Report2.pbix tem Row-Level Security. Report3.pbix é DirectQuery. Quais suportam Publish to Web (publicação pública não autenticada)?",
      "opcoes": [
        "Somente Report1.pbix",
        "Report1.pbix e Report3.pbix",
        "Todos suportam",
        "Somente Report2.pbix"
      ],
      "correta": 1,
      "explicacao": "O recurso 'Publicar na Web (público)' não suporta relatórios que implementam Row-Level Security (RLS) porque exporia o conteúdo a qualquer pessoa anonimamente."
    },
    {
      "pergunta": "Uma dashboard tem 10 visuais. Os usuários reclamam que as consultas P&R (Q&A) de linguagem natural não entendem os nomes que eles usam na empresa. Onde você configura a integração nativa (sinônimos) se estiver usando Service + DirectQuery?",
      "opcoes": [
        "A partir do painel de Vendas, defini-lo como Favorito.",
        "Das configurações de idioma do workspace.",
        "Nas propriedades dos datasets, modificar as configurações de Q&A.",
        "A partir das propriedades do dashboard, modificar as configurações."
      ],
      "correta": 2,
      "explicacao": "O suporte a P&R é gerenciado no nível do Conjunto de Dados (Dataset), permitindo configurações e indexações especiais, bem como adicionar sinônimos via modelo."
    },
    {
      "pergunta": "Um usuário quer receber notificações diárias automáticas com o valor mostrado em um cartão no painel. O usuário tem função de Espectador (Viewer). Como fazer isso?",
      "opcoes": [
        "Criar um alerta de dados (Data Alert).",
        "Criar uma assinatura (Subscription) para o e-mail dele.",
        "Compartilhar o dashboard marcando a opção de notificação diária.",
        "Mencioná-lo em um comentário diário automático."
      ],
      "correta": 1,
      "explicacao": "Assinaturas de email enviam o relatório/painel por e-mail em uma frequência definida (ex: diariamente). Alertas de dados não enviam automaticamente todo dia a não ser que o dado mude e cruze o limite, enquanto que a assinatura entrega relatórios regulares garantidos."
    },
    {
      "pergunta": "O que é necessário instalar primeiro para desenvolver seus próprios visuais personalizados (custom visuals) programando do zero?",
      "opcoes": [
        "Visual Studio 2022",
        "Node.js",
        "Azure PowerShell",
        "jQuery"
      ],
      "correta": 1,
      "explicacao": "Para construir Custom Visuals com ferramentas CLI da Microsoft (pbiviz), você precisa do Node.js como plataforma de execução das ferramentas."
    },
    {
      "pergunta": "Qual é a finalidade da certificação de conjuntos de dados e relatórios no Power BI?",
      "opcoes": [
        "Proteger os dados com criptografia avançada",
        "Indicar que o conteúdo foi revisado e aprovado como confiável, preciso e pronto para uso pela organização, aumentando a confiança dos usuários",
        "Certificar que o relatório está em conformidade com LGPD/GDPR",
        "Validar automaticamente as fórmulas DAX do modelo"
      ],
      "correta": 1,
      "explicacao": "A certificação no Power BI é um processo pelo qual administradores ou usuários autorizados marcam conjuntos de dados e relatórios como 'Certificado', indicando que foram revisados, são confiáveis e representam a fonte oficial de dados para a organização."
    },
    {
      "pergunta": "O que é o Power BI Embedded e qual é seu caso de uso principal?",
      "opcoes": [
        "Uma versão do Power BI para dispositivos móveis offline",
        "Uma API que permite incorporar relatórios e dashboards do Power BI em aplicações customizadas para usuários que não precisam de conta Power BI",
        "Uma funcionalidade para criar dashboards embutidos em emails",
        "Um conector para incorporar dados de ERPs externos ao Power BI"
      ],
      "correta": 1,
      "explicacao": "Power BI Embedded permite que desenvolvedores incorporem relatórios e dashboards do Power BI em suas próprias aplicações usando APIs. Os usuários finais não precisam de conta Power BI, pois a autenticação é feita pela aplicação host."
    },
    {
      "pergunta": "O que é um conjunto de dados compartilhado (Shared Dataset) no Power BI e qual é seu benefício principal?",
      "opcoes": [
        "Um dataset disponível publicamente na internet",
        "Um conjunto de dados certificado e central que múltiplos relatórios podem usar como fonte, promovendo consistência e reduzindo duplicação de dados",
        "Um dataset exportado para uso em Excel",
        "Uma funcionalidade Premium para compartilhar dados entre organizações"
      ],
      "correta": 1,
      "explicacao": "Conjuntos de dados compartilhados permitem que múltiplos relatórios se conectem ao mesmo modelo de dados central. Isso promove uma 'única fonte da verdade', garante consistência de métricas entre relatórios e reduz duplicação de modelos."
    },
    {
      "pergunta": "O que são pipelines de implantação (Deployment Pipelines) no Power BI Service e para que servem?",
      "opcoes": [
        "Uma ferramenta de CI/CD para código Python integrada ao Power BI",
        "Uma funcionalidade que permite gerenciar o ciclo de vida dos conteúdos do Power BI (relatórios, dashboards, conjuntos de dados) em estágios de Desenvolvimento, Teste e Produção",
        "Um sistema de backup automático de relatórios",
        "Uma API para publicação automatizada de relatórios via linha de comando"
      ],
      "correta": 1,
      "explicacao": "Pipelines de Implantação permitem criar fluxos de trabalho de Desenvolvimento → Teste → Produção para conteúdo Power BI. Você pode comparar estágios, promover conteúdo entre estágios e gerenciar regras de dataset por estágio."
    },
    {
      "pergunta": "Como você pode compartilhar um relatório do Power BI com usuários externos à sua organização?",
      "opcoes": [
        "Apenas exportando o arquivo .pbix e enviando por e-mail",
        "Usando o recurso 'Publicar na Web' para compartilhamento público, ou Azure B2B para compartilhamento seguro com usuários externos com identidade Azure AD",
        "Não é possível compartilhar relatórios com usuários externos",
        "Apenas convertendo o relatório para PDF e compartilhando"
      ],
      "correta": 1,
      "explicacao": "Para compartilhar externamente: 'Publicar na Web' torna o relatório acessível publicamente (sem autenticação), ou Azure Active Directory B2B permite compartilhamento seguro com usuários externos convidados que possuem identidade Azure AD."
    },
    {
      "pergunta": "Qual é a diferença entre um workspace padrão e um workspace Premium no Power BI Service?",
      "opcoes": [
        "Workspaces Premium suportam mais usuários simultâneos e permitem publicar aplicativos",
        "Workspaces Premium oferecem capacidade dedicada, sem compartilhamento de recursos, permitindo conjuntos de dados maiores, atualizações mais frequentes e recursos avançados como paginação de relatórios",
        "Não há diferença técnica, apenas preço diferente",
        "Workspaces Premium permitem criar mais de 10 relatórios"
      ],
      "correta": 1,
      "explicacao": "Workspaces Premium usam capacidade dedicada (não compartilhada), o que oferece desempenho consistente, conjuntos de dados maiores (até 400GB vs 1GB), até 48 atualizações diárias e acesso gratuito para usuários visualizadores sem licença Pro."
    },
    {
      "pergunta": "O que é RLS (Row-Level Security) no Power BI e como funciona?",
      "opcoes": [
        "Um método de criptografia de dados em repouso no serviço Power BI",
        "Um mecanismo que restringe o acesso aos dados no nível de linha, filtrando os dados que cada usuário pode ver com base em regras definidas",
        "Uma funcionalidade para proteger as credenciais de fonte de dados",
        "Um controle de acesso que determina quem pode editar relatórios"
      ],
      "correta": 1,
      "explicacao": "RLS (Row-Level Security) é um mecanismo que restringe o acesso aos dados ao nível de linha. Você define regras DAX que filtram os dados retornados para cada usuário com base em sua identidade ou papel, garantindo que usuários vejam apenas os dados a que têm direito."
    },
    {
      "pergunta": "Qual método de atualização do Power BI permite que apenas os dados novos ou modificados sejam processados, em vez de reprocessar todos os dados?",
      "opcoes": [
        "Atualização completa (Full refresh)",
        "Atualização incremental (Incremental refresh)",
        "Atualização programada (Scheduled refresh)",
        "Atualização manual (Manual refresh)"
      ],
      "correta": 1,
      "explicacao": "A atualização incremental processa apenas os dados novos ou modificados desde a última atualização, em vez de reprocessar todos os dados. Isso reduz o tempo de atualização e o consumo de recursos, especialmente para grandes conjuntos de dados."
    },
    {
      "pergunta": "O que é o gateway de dados do Power BI e quando ele é necessário?",
      "opcoes": [
        "Um aplicativo para criar relatórios em dispositivos móveis",
        "Um software instalado em servidores locais para permitir que o serviço Power BI acesse fontes de dados locais (on-premises)",
        "Uma API para integração com sistemas externos",
        "Um serviço de criptografia para dados em trânsito"
      ],
      "correta": 1,
      "explicacao": "O gateway de dados do Power BI é um software instalado em servidores locais que serve como ponte entre o serviço Power BI na nuvem e fontes de dados locais (on-premises). É necessário para atualização agendada de dados locais."
    },
    {
      "pergunta": "Qual tarefa do analista de dados tem impacto crítico no desempenho dos relatórios e análise de dados?",
      "opcoes": [
        "Analisar",
        "Visualizar",
        "Modelar",
        "Publicar"
      ],
      "correta": 2,
      "explicacao": "Modelar dados é a tarefa com maior impacto crítico no desempenho. Um modelo bem projetado com relacionamentos adequados, tabelas de dimensão e medidas otimizadas melhora significativamente o desempenho dos relatórios."
    },
    {
      "pergunta": "Qual função de dados permite que os analistas habilitem recursos avançados de análise por meio de relatórios e visualizações?",
      "opcoes": [
        "Analista de dados",
        "Cientista de dados",
        "Engenheiro de dados",
        "Administrador de banco de dados"
      ],
      "correta": 0,
      "explicacao": "O Analista de dados é a função que habilita recursos avançados de análise por meio de relatórios e visualizações, transformando dados brutos em insights acionáveis para as organizações."
    },
    {
      "question": "A empresa quer um processo formal para promover relatórios por ambientes: Desenvolvimento → Teste → Produção no Power BI Service, com controle de versão e comparação de conteúdo. Qual feature implementa isso?",
      "options": [
        "Power BI Embedded com controle de versão Git",
        "Pipelines de Implantação (Deployment Pipelines)",
        "Workspaces Clássicos com permissões diferenciadas",
        "Power BI Report Server"
      ],
      "answer": 1,
      "explanation": "Deployment Pipelines (Power BI Premium) permitem criar ambientes separados de Dev/Test/Prod com um clique para promover conteúdo entre estágios, comparar diferenças e definir regras de dados por ambiente."
    },
    {
      "question": "Um analista publicou um relatório conectado a um arquivo Excel no próprio computador pessoal. Qual tipo de gateway permite atualização agendada nesse cenário?",
      "options": [
        "Data Gateway (modo Padrão/Corporativo)",
        "Gateway Pessoal (Personal Mode)",
        "Gateway VPN",
        "Não é necessário gateway para arquivos locais"
      ],
      "answer": 1,
      "explanation": "O Gateway Pessoal é instalado no computador do usuário e permite que o Power BI Service acesse arquivos locais daquela máquina. Não suporta múltiplos usuários — é para uso individual."
    },
    {
      "question": "Com uma licença Power BI Pro (sem Premium), quantas atualizações agendadas diárias são permitidas por dataset?",
      "options": [
        "Ilimitadas",
        "8 por dia",
        "24 por dia",
        "48 por dia"
      ],
      "answer": 1,
      "explanation": "Com licença Pro sem Premium, o limite é 8 atualizações agendadas por dia por dataset. Com Power BI Premium, o limite sobe para 48 atualizações por dia."
    },
    {
      "question": "Você precisa distribuir um pacote de relatórios para 300 usuários que devem ver apenas a versão publicada (sem editar). Qual é a abordagem MAIS adequada?",
      "options": [
        "Compartilhar cada relatório individualmente via link para cada usuário",
        "Publicar um Power BI App a partir de um Workspace e conceder acesso ao App",
        "Exportar para PDF e distribuir por email",
        "Habilitar 'Publicar na Web' (Publish to Web) para acesso público"
      ],
      "answer": 1,
      "explanation": "Power BI Apps empacotam relatórios e dashboards de um workspace para consumo controlado. Os usuários veem apenas a versão publicada e não têm acesso direto ao workspace de edição."
    },
    {
      "question": "Qual é a diferença entre o papel de 'Colaborador' (Contributor) e 'Membro' (Member) em um Workspace do Power BI Service?",
      "options": [
        "Não há diferença prática entre os dois papéis",
        "Colaborador pode publicar e editar conteúdo no workspace, mas não pode gerenciar permissões de acesso; Membro pode gerenciar permissões e convidar outros colaboradores",
        "Membro pode criar workspaces; Colaborador não",
        "Colaborador tem acesso apenas de leitura; Membro tem acesso de edição"
      ],
      "answer": 1,
      "explanation": "Colaborador: publica, edita e exclui conteúdo. Membro: tudo do Colaborador + gerencia membros do nível Colaborador para baixo e pode publicar Apps. Administrador: controle total, incluindo excluir o workspace."
    },
    {
      "question": "Você implementou RLS estático com uma regra [Região] = 'Sul'. Ao testar no Power BI Service como Administrador do workspace, os dados não aparecem filtrados. Por quê?",
      "options": [
        "Administradores são isentos de RLS no Power BI Service",
        "O RLS não foi publicado corretamente",
        "Administradores precisam aceitar o RLS manualmente",
        "O RLS só funciona em modo DirectQuery"
      ],
      "answer": 0,
      "explanation": "Administradores do workspace e do dataset são isentos de RLS automaticamente — eles sempre veem todos os dados. Para testar o RLS, use 'Exibir como função' (View as Role) nas configurações do dataset."
    },
    {
      "question": "No Power BI Service, qual é a diferença entre um dataset 'Promovido' (Promoted) e 'Certificado' (Certified)?",
      "options": [
        "Não há diferença; são termos sinônimos",
        "Promovido é marcado pelo próprio proprietário do dataset; Certificado requer aprovação formal por administradores ou pessoa designada da organização",
        "Certificado é exclusivo para Power BI Premium; Promovido é para Pro",
        "Promovido requer RLS; Certificado não exige"
      ],
      "answer": 1,
      "explanation": "Endosso tem dois níveis: Promoted (proprietário do dataset marca como confiável) e Certified (administrador ou designado valida o dataset como autoritativo). Certified tem mais credibilidade e restrições de quem pode conceder."
    },
    {
      "question": "A organização precisa classificar relatórios com dados pessoais (LGPD) para que os usuários sejam alertados ao exportar para Excel. Qual recurso do Power BI Service implementa isso?",
      "options": [
        "RLS em nível de coluna",
        "Rótulos de Sensibilidade (Sensitivity Labels) integrados ao Microsoft Purview",
        "Endosso de Dataset",
        "Workspaces com acesso restrito"
      ],
      "answer": 1,
      "explanation": "Rótulos de Sensibilidade (integrados ao Microsoft Purview/MIP) classificam e protegem conteúdo do Power BI. Quando um usuário exporta conteúdo com rótulo 'Confidencial', o Excel/PDF recebe o mesmo rótulo automaticamente."
    },
    {
      "question": "Quais são as principais vantagens de usar Dataflows (Fluxos de Dados) no Power BI Service?",
      "options": [
        "São mais rápidos que o Power Query Desktop e não precisam de Gateway",
        "Permitem reutilizar lógica de transformação entre múltiplos datasets, suportam tabelas computadas e podem ser usados por diferentes equipes",
        "Substituem completamente o modelo de dados (dataset)",
        "São exclusivos do Power BI Premium"
      ],
      "answer": 1,
      "explanation": "Dataflows centralizam transformações no Power BI Service, permitindo: reutilização entre datasets, colaboração entre equipes, tabelas computadas (Premium), integração com Azure Data Lake, e redução de duplicação de lógica ETL."
    },
    {
      "question": "Um sistema de RH precisa de um relatório com layout de formulário preciso, exportação perfeita para PDF com quebras de página controladas e suporte a sub-relatórios. Qual tipo usar?",
      "options": [
        "Relatório Power BI padrão com muitas páginas",
        "Relatório Paginado (Paginated Report / SSRS)",
        "Dashboard do Power BI Service",
        "Relatório publicado via 'Publicar na Web'"
      ],
      "answer": 1,
      "explanation": "Relatórios Paginados (criados no Power BI Report Builder, baseados no SSRS) são projetados para: impressão/PDF perfeito, controle de quebra de página, formulários, faturas, e dados que se estendem por centenas de páginas."
    },
    {
      "question": "Qual é o principal caso de uso do Endpoint XMLA (XML for Analysis) no Power BI Premium?",
      "options": [
        "Publicar relatórios do Power BI Desktop sem o botão Publicar",
        "Permitir conexões de ferramentas externas (Tabular Editor, SSMS, DAX Studio) ao dataset para administração, desenvolvimento e consulta avançada do modelo tabular",
        "Habilitar a exportação de dados para XML",
        "Conectar o Power BI a fontes OLAP externas"
      ],
      "answer": 1,
      "explanation": "O Endpoint XMLA expõe os datasets do Power BI Premium como modelos tabulares SSAS, permitindo que ferramentas como Tabular Editor, DAX Studio e SSMS se conectem para administração avançada, scripting, e análise de performance."
    },
    {
      "question": "Qual é o risco principal de usar a opção 'Publicar na Web' (Publish to Web) para compartilhar um relatório?",
      "options": [
        "O relatório pode ser editado por qualquer pessoa que tenha o link",
        "O relatório fica publicamente acessível na internet sem qualquer autenticação, expondo todos os dados visíveis para qualquer pessoa",
        "O RLS passa a ser ignorado apenas para usuários internos",
        "O relatório fica disponível apenas por 30 dias"
      ],
      "answer": 1,
      "explanation": "'Publicar na Web' gera um link e código de incorporação público, sem autenticação. Qualquer pessoa com o link (ou que encontre o iframe) vê todos os dados do relatório. Nunca use para dados sensíveis ou confidenciais."
    },
    {
      "question": "Uma organização tem usuários sem licença Power BI Pro. Em qual cenário esses usuários podem acessar relatórios publicados no Power BI Service?",
      "options": [
        "Nunca — a licença Pro é sempre obrigatória para consumo",
        "Quando o workspace está em uma Capacidade Power BI Premium ou Premium Per User (PPU)",
        "Quando o relatório é compartilhado via link público",
        "Quando o administrador desabilita a verificação de licença"
      ],
      "answer": 1,
      "explanation": "Em capacidades Premium, os usuários sem licença Pro podem consumir (apenas ler) relatórios publicados no workspace Premium. Para editar, a licença Pro ainda é necessária. PPU requer licença PPU individual."
    },
    {
      "question": "No Power BI Service, em qual tipo de visual é possível configurar Alertas de Dados (Data Alerts) para notificação por email?",
      "options": [
        "Gráficos de Barras e Linhas em Relatórios",
        "Tiles de Cartão (Card), KPI e Medidores (Gauge) em Dashboards",
        "Tabelas e Matrizes em Relatórios",
        "Qualquer visual em qualquer dashboard"
      ],
      "answer": 1,
      "explanation": "Alertas de Dados funcionam apenas em tiles de dashboards do tipo: Cartão (Card), KPI e Medidor (Gauge). Não funcionam em gráficos nem em relatórios — apenas em dashboards, e apenas nos tipos mencionados."
    },
    {
      "question": "Qual é a função de um 'Gateway de Dados' (Data Gateway) no modo Padrão/Corporativo?",
      "options": [
        "Criptografar dados do Power BI armazenados no Service",
        "Criar uma ponte segura entre o Power BI Service e fontes de dados locais ou em redes privadas, permitindo atualização agendada sem expor as fontes à internet",
        "Gerenciar licenças de usuários no Power BI Service",
        "Servir como proxy para acessar o Azure de dentro da empresa"
      ],
      "answer": 1,
      "explanation": "O Data Gateway (modo Padrão) é instalado na rede corporativa e permite que o Power BI Service acesse dados locais de forma segura. Suporta múltiplas fontes, múltiplos usuários e é gerenciado centralmente."
    },
    {
      "question": "Como um Administrador do Power BI pode monitorar quais relatórios são mais acessados e por quais usuários na organização?",
      "options": [
        "Através do Analisador de Performance no Power BI Desktop",
        "Usando o Log de Atividades (Activity Log) ou a API Admin e o relatório de Métricas de Uso do workspace",
        "Verificando o histórico de atualizações no Gateway",
        "Consultando diretamente os logs do Azure Active Directory"
      ],
      "answer": 1,
      "explanation": "O Log de Atividades (disponível via API Admin ou exportação) registra todas as atividades no tenant. As Métricas de Uso (Usage Metrics) de cada workspace mostram visualizações, usuários ativos e relatórios mais acessados."
    },
    {
      "question": "Qual é a diferença entre 'Compartilhar Relatório' diretamente e publicar um 'Power BI App'?",
      "options": [
        "Não há diferença, são abordagens equivalentes",
        "Compartilhar dá acesso direto ao relatório individual com possível acesso ao workspace; App empacota múltiplos relatórios para consumo controlado sem expor o workspace",
        "Apps são mais rápidos de criar que o compartilhamento direto",
        "Compartilhamento suporta RLS; Apps não"
      ],
      "answer": 1,
      "explanation": "Compartilhamento direto pode expor o workspace ao usuário. Apps isolam o consumidor do workspace, permitem personalizar a navegação, incluir múltiplos relatórios/dashboards, e atualizações do workspace não afetam o App até nova publicação."
    },
    {
      "question": "Você precisa que usuários externos (fora do tenant Azure AD da empresa) acessem um relatório do Power BI Service. Qual é o mecanismo mais seguro?",
      "options": [
        "Publicar na Web (Publish to Web)",
        "Compartilhar via Azure AD B2B (convidar como usuário convidado)",
        "Exportar para PDF e compartilhar por email",
        "Criar uma cópia do relatório em uma conta pública"
      ],
      "answer": 1,
      "explanation": "Azure AD B2B permite convidar usuários externos como 'Guest Users' no tenant, mantendo o controle de autenticação e autorização (incluindo RLS). É a forma mais segura de compartilhar com externos."
    },
    {
      "question": "Qual é o comportamento de um Pipeline de Implantação (Deployment Pipeline) ao comparar estágios Dev e Teste?",
      "options": [
        "Exibe apenas uma lista de relatórios diferentes entre os estágios",
        "Mostra quais itens existem apenas em um estágio, quais são idênticos e quais são diferentes, permitindo implantar seletivamente",
        "Sincroniza automaticamente todos os itens sem necessidade de revisão",
        "Compara apenas as medidas DAX, ignorando layouts"
      ],
      "answer": 1,
      "explanation": "O comparador de estágios do Deployment Pipeline mostra o status de cada item: novo (existe apenas em um estágio), idêntico (mesmo conteúdo) ou diferente (modificado). O administrador escolhe o que implantar."
    },
    {
      "question": "Uma empresa quer que o departamento de TI gerencie centralmente os datasets (modelos de dados) enquanto os analistas criam seus próprios relatórios conectados a esses datasets. Como isso é habilitado?",
      "options": [
        "Usando o modo DirectQuery em todos os relatórios",
        "Habilitando 'Conjuntos de Dados Compartilhados' (Shared Datasets / Live Connection) — analistas conectam relatórios novos a datasets publicados no Service",
        "Exportando os dados para Excel e compartilhando com os analistas",
        "Usando Power BI Embedded para cada analista"
      ],
      "answer": 1,
      "explanation": "Live Connection para datasets do Service (Shared Datasets) permite que analistas criem relatórios conectados a datasets gerenciados centralmente, sem precisar recriar o modelo. Uma única fonte de verdade para todos os relatórios."
    },
    {
      "question": "O que é 'Row-Level Security Dinâmica' (Dynamic RLS) e qual é a principal diferença para o RLS Estático?",
      "options": [
        "RLS Dinâmico usa filtros que mudam com o horário do dia; Estático usa filtros fixos",
        "RLS Dinâmico usa funções DAX como USERPRINCIPALNAME() para filtrar dados baseado no usuário logado; Estático usa valores fixos na regra que exigem manutenção manual quando usuários mudam",
        "RLS Dinâmico é mais rápido que o Estático",
        "RLS Estático suporta tabelas maiores que o Dinâmico"
      ],
      "answer": 1,
      "explanation": "RLS Estático: regras com valores fixos (ex: [Região] = 'Sul') — requer atualização manual quando papéis mudam. RLS Dinâmico: usa USERPRINCIPALNAME() para comparar com uma tabela de mapeamento usuário-permissão, escalando automaticamente."
    },
    {
      "question": "Qual é o papel do 'Administrador de Capacidade' (Capacity Administrator) no Power BI Premium?",
      "options": [
        "Gerenciar licenças Pro de todos os usuários do tenant",
        "Controlar recursos da capacidade Premium: atribuir workspaces, configurar limites de memória, monitorar uso e gerenciar cargas de trabalho (Paginated Reports, AI, Dataflows)",
        "Publicar relatórios em todos os workspaces do tenant",
        "Gerenciar as credenciais de todos os gateways"
      ],
      "answer": 1,
      "explanation": "O Administrador de Capacidade gerencia a infraestrutura de uma capacidade Premium específica: quais workspaces estão nessa capacidade, configurações de performance, cargas de trabalho habilitadas e monitoramento via app de métricas."
    },
    {
      "question": "Ao configurar 'Atualização Incremental' em um dataset, quais dois parâmetros do Power Query são obrigatórios?",
      "options": [
        "StartDate e EndDate (ou RangeStart e RangeEnd)",
        "MinDate e MaxDate",
        "DateFrom e DateTo",
        "PeriodStart e PeriodEnd"
      ],
      "answer": 0,
      "explanation": "A Atualização Incremental requer os parâmetros do Power Query chamados exatamente 'RangeStart' e 'RangeEnd' do tipo DateTime. O Power BI os usa para definir as partições e filtrar quais dados recarregar."
    },
    {
      "question": "Qual é a diferença entre 'Dataset' e 'Dataflow' no Power BI Service?",
      "options": [
        "São termos diferentes para a mesma coisa",
        "Dataflow: camada de preparação/transformação de dados (ETL) que produz tabelas reutilizáveis; Dataset: modelo de dados com relacionamentos, medidas DAX e RLS, usado diretamente pelos relatórios",
        "Dataset contém os dados brutos; Dataflow contém as medidas DAX",
        "Dataflows são exclusivos do Power BI Premium; Datasets estão disponíveis no Pro"
      ],
      "answer": 1,
      "explanation": "Dataflows são a camada ETL no Service (equivalente ao Power Query), produzindo tabelas de dados que podem ser consumidas por múltiplos datasets. Datasets são modelos analíticos com relacionamentos, DAX e RLS usados pelos relatórios."
    },
    {
      "question": "Um desenvolvedor precisa editar um dataset publicado no Power BI Service (adicionar medidas, alterar relacionamentos) sem usar o Power BI Desktop. Qual ferramenta permite isso via Endpoint XMLA?",
      "options": [
        "Power BI Report Builder",
        "Tabular Editor (ferramenta de terceiros)",
        "DAX Studio apenas para consultas, não edição",
        "Power BI Premium apenas via interface web"
      ],
      "answer": 1,
      "explanation": "O Tabular Editor (versão 2 gratuita ou versão 3 paga) conecta ao Endpoint XMLA do Power BI Premium e permite editar o modelo tabular diretamente no Service: adicionar medidas, tabelas, colunas calculadas, grupos de cálculo, etc."
    },
    {
      "question": "Como funciona o recurso 'Assinaturas de Email' (Email Subscriptions) no Power BI Service?",
      "options": [
        "Enviam alertas apenas quando um valor ultrapassa um limite",
        "Permitem que usuários ou administradores agendem o envio automático de capturas de relatórios ou dashboards por email em horários definidos",
        "Substituem a necessidade de atualização agendada do dataset",
        "Funcionam apenas com relatórios paginados"
      ],
      "answer": 1,
      "explanation": "Assinaturas de Email enviam uma captura (snapshot) do relatório ou dashboard por email no horário configurado. Podem incluir um link para o relatório ao vivo e suportam filtros para personalizar o conteúdo enviado."
    },
    {
      "question": "Qual é o impacto de mover um workspace para uma Capacidade Power BI Premium?",
      "options": [
        "Todos os usuários do workspace ganham licença Pro automaticamente",
        "O conteúdo do workspace pode ser acessado por usuários sem licença Pro, suporte a Relatórios Paginados, Dataflows com tabelas computadas, atualizações mais frequentes e recursos de IA",
        "O workspace passa a ser público automaticamente",
        "Os dados ficam armazenados no servidor local da empresa"
      ],
      "answer": 1,
      "explanation": "Premium habilita no workspace: acesso para usuários sem Pro (apenas leitura), Deployment Pipelines, Relatórios Paginados, Dataflows com tabelas computadas e IA, XMLA Endpoint, até 48 atualizações/dia e maior capacidade de memória."
    },
    {
      "question": "Qual recurso permite automatizar ações no Power BI Service com base em eventos, como enviar um Teams message quando um dataset falha na atualização?",
      "options": [
        "Power BI Admin Portal → Automation",
        "Power Automate integrado com conectores do Power BI",
        "Power BI REST API diretamente via script",
        "Alertas de Dados (Data Alerts)"
      ],
      "answer": 1,
      "explanation": "O Power Automate tem conectores nativos para o Power BI que permitem criar fluxos automatizados acionados por eventos como: falha de atualização, refresh concluído, alerta de dado disparado, etc."
    },
    {
      "question": "O que é 'Lineage View' (Exibição de Linhagem) no Power BI Service e para que serve?",
      "options": [
        "Exibe o histórico de alterações em um relatório",
        "Mostra graficamente as dependências entre fontes de dados, dataflows, datasets e relatórios, facilitando o impacto de análise de mudanças",
        "Lista todos os usuários que acessaram um relatório",
        "Mostra o fluxo de dados entre tabelas dentro de um dataset"
      ],
      "answer": 1,
      "explanation": "A Lineage View (disponível em workspaces) exibe um diagrama mostrando como os dados fluem de fontes → dataflows → datasets → relatórios → dashboards, ajudando a entender o impacto de mudanças em qualquer ponto da cadeia."
    },
    {
      "question": "Em qual situação o uso do 'Power BI Report Server' (servidor local) é mais adequado em relação ao Power BI Service (nuvem)?",
      "options": [
        "Quando a empresa quer relatórios mais bonitos",
        "Quando regulamentações ou políticas de segurança impedem que os dados saiam da rede interna da organização, exigindo hospedagem on-premises",
        "Quando a empresa tem mais de 1.000 usuários",
        "Quando os relatórios precisam de atualização em tempo real"
      ],
      "answer": 1,
      "explanation": "O Power BI Report Server é a versão on-premises para organizações com requisitos regulatórios ou de segurança que impedem o uso de serviços em nuvem. Tem menos recursos que o Power BI Service mas mantém os dados localmente."
    },
    {
      "question": "Você precisa configurar o acesso de um analista em um Workspace no Power BI Service. Ele deve ter permissões para publicar novos relatórios, editar modelos e atualizar dados, mas não deve ter direitos para alterar membros do Workspace, modificar permissões de segurança ou publicar Aplicativos (Apps) corporativos. Qual papel (Role) atribuir?",
      "options": [
        "Administrador (Admin)",
        "Membro (Member)",
        "Contribuidor (Contributor)",
        "Leitor (Viewer)"
      ],
      "answer": 2,
      "explanation": "O papel 'Contribuidor' (Contributor) é ideal para criadores e analistas técnicos de relatórios. Ele concede permissões completas de desenvolvimento e publicação de conteúdo no workspace, mas impede ações administrativas como gerenciar acesso a membros, alterar papéis de workspace ou criar/publicar Apps (que é um direito de Administradores e Membros)."
    },
    {
      "question": "O recurso de 'Audiências de Aplicativo' (App Audiences) no Power BI Service permite que criadores realizem qual ação específica ao distribuir conteúdo corporativo?",
      "options": [
        "Acompanhar estatísticas de acesso e audiência de visualização do aplicativo em tempo real",
        "Criar diferentes caminhos de acesso dentro do mesmo Aplicativo, determinando quais páginas, relatórios ou painéis estarão visíveis ou ocultos para diferentes grupos de usuários do AD",
        "Converter relatórios interativos em transmissões de vídeo ao vivo",
        "Limitar o acesso apenas para usuários com celulares homologados"
      ],
      "answer": 1,
      "explanation": "A funcionalidade de Audiências em Aplicativos do Power BI permite criar subgrupos de distribuição dentro de um único App publicado no Service. Você pode definir que a Audiência A (Diretores) veja todas as páginas do relatório, enquanto a Audiência B (Vendedores) veja apenas páginas selecionadas, evitando duplicar workspaces e apps."
    },
    {
      "question": "Qual é a principal limitação técnica de segurança e arquitetura do Data Gateway configurado em 'Modo Pessoal' (Personal Mode) comparado ao 'Modo Padrão' (Standard/Enterprise Mode)?",
      "options": [
        "O modo Pessoal não suporta atualizações agendadas automáticas",
        "O modo Pessoal executa como um aplicativo associado estritamente ao login de um usuário específico, não rodando como serviço em segundo plano, e não oferece suporte a conexões DirectQuery compartilhadas ou RLS no banco",
        "O modo Pessoal requer licenciamento Premium de capacidade",
        "O modo Pessoal é limitado a conexões com arquivos TXT ou CSV locais"
      ],
      "answer": 1,
      "explanation": "O Personal Gateway roda sob a sessão do Windows do usuário que o instalou. Se o usuário deslogar da máquina, o gateway fecha. Além disso, ele não suporta DirectQuery e não pode ser compartilhado com outros membros da organização, sendo útil apenas para cenários individuais simples."
    },
    {
      "question": "Qual o limite máximo diário de atualizações agendadas (Scheduled Refresh) permitido pelo Power BI Service para um conjunto de dados residente em um Workspace compartilhado de licença Pro clássica, comparado a um dataset em capacidade Premium?",
      "options": [
        "8 vezes ao dia para Pro; 48 vezes ao dia para Premium",
        "1 vez ao dia para Pro; 8 vezes ao dia para Premium",
        "10 vezes ao dia para Pro; Atualização contínua infinita para Premium",
        "Não há limites diários de atualização para nenhum tipo de licença corporativa"
      ],
      "answer": 0,
      "explanation": "Conjuntos de dados sob licenças compartilhadas padrão do Power BI Pro podem ser atualizados automaticamente até 8 vezes ao dia. Ao migrar o modelo para um workspace contendo recursos do Power BI Premium (seja capacidade dedicada ou Premium por Usuário - PPU), o limite é ampliado para até 48 atualizações diárias agendadas."
    },
    {
      "question": "Em um pipeline de implantação de ciclo de vida (Deployment Pipelines) no Power BI Service, quais são as três etapas padrão recomendadas e quais artefatos analíticos podem ser promovidos entre essas fases?",
      "options": [
        "Início → Teste → Fim; Suporta apenas relatórios paginados",
        "Desenvolvimento → Teste → Produção; Suporta a transição de conjuntos de dados (datasets), relatórios, painéis (dashboards) e fluxos de dados (dataflows)",
        "Local → Nuvem → Externo; Suporta apenas arquivos .pbix brutos",
        "Desenho → Aprovação → Arquivamento; Suporta apenas métricas organizacionais"
      ],
      "answer": 1,
      "explanation": "Os Deployment Pipelines criam três ambientes sequenciais no Service: Desenvolvimento (para novos recursos), Teste (para validação e RLS) e Produção (para consumo final). Ele gerencia a migração controlada de Datasets, Reports, Dashboards e Dataflows entre workspaces irmãos mapeados para cada etapa."
    },
    {
      "question": "Quando você aplica um Rótulo de Sensibilidade (Sensitivity Label) configurado com políticas de proteção e criptografia corporativas a um relatório do Power BI, o que ocorre quando um usuário faz o download desse relatório ou exporta seus dados para Excel, PDF ou PowerPoint?",
      "options": [
        "A segurança é removida para facilitar a visualização local no Office",
        "O rótulo e as políticas de proteção criptográfica integradas do Microsoft Purview / Information Protection são mantidos e continuam protegendo o arquivo resultante exportado",
        "A exportação de dados é bloqueada e o arquivo .pbix local é deletado por segurança",
        "O rótulo apenas atua na interface web, não afetando arquivos exportados"
      ],
      "answer": 1,
      "explanation": "A integração com o Microsoft Purview garante conformidade e segurança ponta a ponta. Se um relatório possui rótulo 'Confidencial', qualquer exportação (PDF, PPTX ou arquivos de dados do Excel) carregará a marca d'água e aplicará a criptografia de arquivos do Office, exigindo autenticação do usuário para leitura."
    },
    {
      "question": "Para publicar alterações de modelo de dados diretamente do Tabular Editor para o Power BI Service por meio do Ponto de Extremidade XMLA (XMLA Endpoint), qual configuração deve ser habilitada no portal de capacidade Premium corporativo?",
      "options": [
        "XMLA Endpoint desativado",
        "XMLA Endpoint configurado como Apenas Leitura (Read Only)",
        "XMLA Endpoint configurado como Ler/Gravar (Read Write)",
        "Ativar Principal de Serviço nas opções de desenvolvimento do Azure"
      ],
      "answer": 2,
      "explanation": "Por padrão, o Endpoint XMLA do Premium vem definido como Apenas Leitura (permitindo apenas ler metadados ou rodar queries). Para permitir modificações de modelo, deploys diretos ou criação de grupos de cálculo usando ferramentas externas (como Tabular Editor, ALM Toolkit), o XMLA Endpoint deve ser configurado como 'Ler/Gravar' (Read-Write)."
    },
    {
      "question": "Qual é a principal diferença de propósito arquitetural entre Relatórios Paginados (Paginated Reports) e Relatórios Interativos padrão do Power BI?",
      "options": [
        "Relatórios Paginados são exclusivos para dispositivos móveis; Interativos para monitores desktop",
        "Relatórios Interativos são focados em visualizações gráficas e exploração dinâmica de dados; Relatórios Paginados são desenvolvidos no Report Builder e focam em tabelas extensas e altamente formatadas para impressão ou geração de PDFs, onde as páginas se estendem verticalmente até exibir todas as linhas",
        "Relatórios Paginados não aceitam conexões com bancos SQL locais; Interativos aceitam",
        "Relatórios Paginados não utilizam o motor VertiPaq sob hipótese alguma"
      ],
      "answer": 1,
      "explanation": "Interactive Reports (.pbix) limitam rolagem vertical de tabelas e focam em interatividade visual em tela única. Paginated Reports (.rdl) são otimizados para relatórios de tabelas 'pixel-perfect' (como faturas, extratos ou listas fiscais longas) que precisam quebrar páginas perfeitamente para impressão ou relatórios em anexo de email."
    },
    {
      "question": "Ao tentar gerar um link público para compartilhamento de relatório usando 'Publicar na Web' (Publish to Web), um usuário recebe a mensagem de que a opção está cinza ou bloqueada. Onde essa permissão deve ser liberada?",
      "options": [
        "Nas configurações de propriedades da página atual no Power BI Desktop",
        "Nas Configurações de Locatário (Tenant Settings) do Portal de Administração (Admin Portal) pelo Administrador de Power BI da empresa",
        "Nas permissões de licença Pro do workspace de desenvolvimento",
        "No console do Azure Active Directory da empresa"
      ],
      "answer": 1,
      "explanation": "Como 'Publicar na Web' cria links que não exigem autenticação (públicos na internet), é uma funcionalidade com alto risco de vazamento de dados confidenciais. Por isso, a liberação ou restrição deste recurso é gerida de forma centralizada pelo Administrador de TI no painel Admin Portal nas Tenant Settings."
    },
    {
      "question": "Você deseja criar uma automação que envie um email e notificação no celular para o Diretor Financeiro imediatamente e de forma exclusiva quando a taxa de inadimplência corporativa superar 5%. Qual recurso do Power BI Service deve ser utilizado?",
      "options": [
        "Criar uma assinatura de email comum do relatório completo",
        "Configurar um Alerta de Dados (Data Alert) associado a um visual de Cartão, Medidor (Gauge) ou KPI fixado em um Painel (Dashboard) corporativo",
        "Mapear filtros de nível de relatório em uma exibição de aplicativo móvel",
        "Escrever uma rotina em linguagem M acionada no refresh de dados"
      ],
      "answer": 1,
      "explanation": "Alertas de dados são recursos exclusivos do Power BI Service que atuam sobre cards ou gauges fixados em Dashboards. Você pode definir a métrica, a regra de corte (ex: maior que 0.05) e a frequência de envio. Também pode integrar os alertas com o Power Automate para disparar fluxos externos corporativos."
    },
    {
      "question": "Para permitir que um analista de outra área da empresa crie seus próprios relatórios customizados no Power BI Desktop conectando-se diretamente a um Dataset central homologado e publicado em seu workspace, qual permissão específica do conjunto de dados deve ser atribuída a ele?",
      "options": [
        "Acesso de Leitura simples (Read)",
        "Permissão de Compilar/Construir (Build Permission)",
        "Direito de Recompartilhamento avançado (Reshare)",
        "Acesso de Gravação no modelo (Write)"
      ],
      "answer": 1,
      "explanation": "A permissão de 'Compilar' (Build) no dataset permite que usuários criem novos relatórios baseados no modelo publicado (via Live Connection/DirectQuery). Isso evita que eles baixem arquivos locais brutos e mantém as fontes de dados em um repositório central unificado."
    },
    {
      "question": "Qual é o principal valor administrativo da funcionalidade de 'Análise de Impacto' (Impact Analysis) disponível ao examinar a Linhagem de Dados (Lineage View) de um conjunto de dados?",
      "options": [
        "Calcular se a velocidade das medidas DAX prejudica a performance da nuvem",
        "Listar e analisar todos os relatórios, painéis e workspaces impactados se você alterar a estrutura, renomear colunas ou deletar aquele dataset específico, com a capacidade de notificar os proprietários afetados diretamente por email",
        "Identificar anomalias e erros de dados importados",
        "Criar automaticamente cópias de backup seguras"
      ],
      "answer": 1,
      "explanation": "A Análise de Impacto varre o ecossistema corporativo do Power BI e mapeia quais relatórios e painéis (inclusive de outros workspaces) dependem daquele dataset. Isso evita que atualizações estruturais de tabelas corrompam visuais de outros analistas sem aviso prévio."
    },
    {
      "question": "Um usuário quer fixar relatórios de alta prioridade ou painéis na página inicial (Home Page) do Power BI Service de todos os membros de seu workspace para acesso fácil e rápido. Qual recurso deve ser acionado pelo criador nas propriedades do item?",
      "options": [
        "Mapear o item como Marcador global",
        "Ativar a opção 'Destaque' (Featured / Feature Content) nas configurações do relatório/painel",
        "Publicar o workspace como público no portal administrativo",
        "Configurar assinaturas automáticas de hora em hora"
      ],
      "answer": 1,
      "explanation": "Ao marcar um conteúdo (relatório ou painel) como 'Destaque' (Feature Content) nas opções avançadas, o Power BI Service posicionará esse artefato em destaque no topo da guia de boas-vindas do portal web de todos os usuários que tiverem direitos de leitura sobre o workspace."
    },
    {
      "question": "Qual é o principal benefício de segurança ao utilizar um 'Principal de Serviço' (Service Principal / aplicativo registrado no Azure AD) para autenticar conexões locais corporativas no Data Gateway, em vez de usar as credenciais de um usuário específico?",
      "options": [
        "Otimizar a compactação de dados no gateway",
        "Eliminar a dependência de contas e senhas individuais de colaboradores, garantindo que as atualizações agendadas não falhem no futuro se o funcionário mudar de senha ou sair da empresa",
        "Aumentar o limite diário de atualizações de 8 para 48",
        "Eliminar a necessidade física de instalar um software de gateway"
      ],
      "answer": 1,
      "explanation": "Usar o Service Principal cria uma identidade de nuvem sem dependência de usuários humanos. Credenciais de colaboradores expiram, exigem troca de senhas ou são inativadas no desligamento corporativo, interrompendo refreshes cruciais de relatórios. O Service Principal soluciona isso."
    },
    {
      "question": "Ao configurar a atualização agendada (Scheduled Refresh) no Power BI Service, quem recebe por padrão a notificação automática em caso de falhas na atualização dos dados?",
      "options": [
        "Todos os visualizadores do aplicativo associado",
        "O Proprietário do Dataset (usuário cujas credenciais configuram o refresh), com a opção de adicionar contatos ou grupos adicionais na interface",
        "Todos os administradores da capacidade Premium corporativa",
        "Nenhum email é gerado para evitar saturação de caixas de correio"
      ],
      "answer": 1,
      "explanation": "Por padrão, o Power BI envia o alerta de falha de refresh diretamente ao proprietário do dataset. Na interface de configuração de atualização, o proprietário pode marcar a caixa para expandir as notificações para outros usuários do workspace ou grupos de segurança para gerenciamento de falhas corporativo."
    },
    {
      "question": "Você planeja publicar um modelo de dados conectado localmente via Conexão Dinâmica (Live Connection) ao SQL Server Analysis Services (SSAS) Tabular para o Power BI Service. O que deve ser configurado obrigatoriamente para possibilitar as consultas aos dados?",
      "options": [
        "Instalar e configurar um Data Gateway (Gateway de Dados local) na rede corporativa com acesso ao servidor SSAS",
        "Ativar o modo de armazenamento Duplo nas tabelas do modelo",
        "Adicionar parâmetros de conexão dinâmica M",
        "Ativar permissões de administrador de tenant para todos os usuários"
      ],
      "answer": 0,
      "explanation": "Conexões em DirectQuery ou Live Connection a servidores locais como SSAS ou SQL Server exigem o Data Gateway em modo Standard configurado na rede local para intermediar com segurança as requisições sob demanda vindas do Power BI Service."
    },
    {
      "question": "No Power BI Desktop, você precisa criar uma regra de Segurança em Nível de Linha (RLS) para o papel 'EUA_Clothing'. A regra deve limitar os dados das tabelas de vendas de forma que os usuários vejam apenas registros que possuam País/Região igual a 'United States' E categoria de produto igual a 'Clothing'. Qual expressão DAX deve ser definida na regra RLS da tabela?",
      "options": [
        "[CountryRegionName] = \"United States\" OR [ProductCategory] = \"Clothing\"",
        "[CountryRegionName] = \"United States\" , [ProductCategory] = \"Clothing\"",
        "[CountryRegionName] = \"United States\" && [ProductCategory] = \"Clothing\"",
        "[CountryRegionName] = \"United States\" || [ProductCategory] = \"Clothing\""
      ],
      "answer": 2,
      "explanation": "O operador lógico 'E' em DAX é representado por `&&`. Portanto, a expressão correta para impor que ambas as condições sejam estritamente verdadeiras ao mesmo tempo é `&&`."
    },
    {
      "question": "No Power BI Service, você precisa distribuir um aplicativo corporativo contendo 5 relatórios diferentes para a equipe de vendas e a de finanças. A equipe de finanças não deve ver os relatórios de vendas. Qual é a melhor prática administrativa?",
      "options": [
        "Criar dois workspaces distintos e publicar dois aplicativos separados",
        "Publicar um único Aplicativo e criar dois grupos de Audiência distintos, configurando a visibilidade de páginas de relatório específica para cada grupo",
        "Configurar permissões de segurança RLS para cada página do relatório",
        "Utilizar gateways separados para cada relatório"
      ],
      "answer": 1,
      "explanation": "As Audiências de Aplicativos permitem personalizar a exibição do mesmo app. Você cria uma audiência de Vendas (ocultando páginas de finanças) e outra de Finanças (ocultando páginas de vendas), distribuindo tudo sob um único workspace gerenciável."
    },
    {
      "question": "O seu relatório corporativo em capacidade Pro corporativa está agendado para atualizar às 08:00 todos os dias. Você percebe que a atualização ocasionalmente inicia às 08:15 ou 08:20. Por que essa discrepância ocorre?",
      "options": [
        "O servidor de banco de dados atrasa o envio de dados",
        "Em capacidades compartilhadas (Pro), a atualização agendada inicia conforme disponibilidade de recursos em fila na infraestrutura Microsoft, com uma margem de início de até 2 horas",
        "A licença Pro restringe atualizações com precisão de minutos",
        "O gateway de dados local foi desligado"
      ],
      "answer": 1,
      "explanation": "Em workspaces Pro compartilhados, as atualizações concorrem por recursos globais em fila de processamento da Microsoft. A atualização inicia o mais próximo possível da hora agendada, mas pode haver pequenas variações de tempo."
    },
    {
      "question": "Como garantir alta disponibilidade e tolerância a falhas (failover) para o seu servidor de Gateway de Dados local corporativo que atende a dezenas de relatórios críticos da empresa?",
      "options": [
        "Duplicar o arquivo do gateway em várias pastas locais",
        "Criar um Cluster de Gateways, adicionando múltiplos servidores físicos de gateway ao mesmo grupo administrativo",
        "Mudar a conexão de todos os relatórios para Import sem gateway",
        "Habilitar o endpoint XMLA em gravação"
      ],
      "answer": 1,
      "explanation": "Clusters de gateways unem múltiplos computadores físicos rodando o software gateway. Se um servidor falhar ou estiver sem conectividade, as atualizações são redirecionadas automaticamente para as demais máquinas ativas del cluster."
    },
    {
      "question": "Um usuário possui a função de 'Membro' (Member) em um workspace do Power BI Service. Qual ação administrativa ele pode realizar que um usuário com a função de 'Contribuidor' (Contributor) é bloqueado de fazer?",
      "options": [
        "Adicionar novos relatórios e editar modelos de dados existentes",
        "Atualizar dados manualmente e agendar refreshes",
        "Compartilhar itens do workspace e publicar/atualizar o Aplicativo (App) do workspace",
        "Deletar painéis criados por ele mesmo"
      ],
      "answer": 2,
      "explanation": "Membros têm direitos de curadoria e compartilhamento de conteúdo. Eles podem publicar, atualizar e gerenciar o Aplicativo do workspace, enquanto Contribuidores focam apenas no desenvolvimento do conteúdo técnico das tabelas e relatórios."
    },
    {
      "question": "Você precisa alterar a estrutura de dados de uma tabela central em seu dataset no Power BI Service. Como você avalia previamente quais relatórios e painéis da empresa serão afetados (e possivelmente quebrados) com essa alteração?",
      "options": [
        "Acessar o Performance Analyzer no Power BI Desktop",
        "Exibir a Linhagem de Dados (Lineage View) no workspace e clicar em 'Análise de Impacto' (Impact Analysis) no dataset desejado",
        "Enviar um email para todos os administradores do Tenant",
        "Deletar o dataset e ver quem reporta erro"
      ],
      "answer": 1,
      "explanation": "A Análise de Impacto na Visualização de Linhagem exibe detalhadamente todos os artefatos de dados e relatórios dependentes daquele dataset em múltiplos workspaces, gerando um mapa claro do impacto de mudanças estruturais."
    },
    {
      "question": "Como configurar para que a equipe de suporte de TI (e não apenas o proprietário do dataset) receba um email de notificação imediato se a atualização agendada de um dataset crítico falhar?",
      "options": [
        "Mapear a TI como RLS administrativo",
        "Adicionar os endereços de email da equipe ou grupos de email de TI nas configurações de notificação de falha de atualização do dataset nas opções do Service",
        "Instalar o gateway na máquina da equipe de TI",
        "Criar um alerta de dados no dashboard"
      ],
      "answer": 1,
      "explanation": "Nas configurações avançadas do dataset sob agendamento de refresh, há um campo específico para inserir emails de contatos adicionais que devem receber alertas em caso de falha de atualização."
    },
    {
      "question": "Ao exportar dados de um relatório corporativo protegido por um Rótulo de Sensibilidade (Sensitivity Label) 'Altamente Confidencial' para o Excel, qual comportamento de segurança ocorre no arquivo local gerado?",
      "options": [
        "A criptografia é removida e qualquer pessoa pode ler os dados no Excel",
        "O arquivo Excel herda o rótulo de sensibilidade e as políticas de proteção criptográficas integradas, exigindo autenticação do usuário para leitura",
        "A exportação falha com erro de restrição de proxy",
        "O arquivo é automaticamente excluído após 5 minutos"
      ],
      "answer": 1,
      "explanation": "A integração do Power BI com o Microsoft Information Protection garante que rótulos e restrições criptográficas sejam herdados em qualquer exportação externa, mantendo a confidencialidade dos dados."
    },
    {
      "question": "Com o ponto de extremidade XMLA (XMLA Endpoint) configurado como Ler/Gravar (Read-Write) na capacidade Premium, qual ferramenta externa pode ser usada para implantar novas medidas e modelos tabulares diretamente na nuvem de forma síncrona?",
      "options": [
        "DAX Studio",
        "Tabular Editor",
        "Power Query Editor",
        "Power Automate"
      ],
      "answer": 1,
      "explanation": "O Tabular Editor conecta-se ao XMLA Endpoint do Service como se fosse um servidor do Analysis Services local, permitindo gravação e implantação síncrona de metadados, medidas, tabelas calculadas e grupos de cálculo."
    }
  ]
};

// ============================================================
//  STATE
// ============================================================
const state = {
  mode: null,
  selectedDomains: [],
  questions: [],
  currentIndex: 0,
  answers: [],        // array of { selected:[], correct:bool } or null
  marked: new Set(),
  timerInterval: null,
  timeRemaining: 0,
  startTime: null,
  lang: 'pt',        // 'pt' or 'en'
  theme: 'dark'      // 'dark' or 'light'
};

// ============================================================
//  UI TEXT (i18n)
// ============================================================
const UI_TEXT = {
  pt: {
    simulatorBadge: '⚡ PL-300 Simulator',
    welcomeTitle1: 'Simulado ',
    welcomeTitlePBI: 'Power BI',
    welcomeTitle2: 'Data Analyst',
    welcomeSubtitle: 'Prepare-se para a certificação com 340+ questões cobrindo todos os domínios do exame real Microsoft.',
    statQuestions: 'Questões', statDomains: 'Domínios', statModes: 'Modos', statApproval: 'Aprovação',
    modeTrainTitle: 'Modo Treino', modeTrainDesc: 'Feedback imediato, escolha o domínio, sem cronômetro',
    modeOfficialTitle: 'Simulado Oficial', modeOfficialDesc: '110 minutos, todos os domínios, condições reais do exame',
    viewHistory: '📊 Ver Histórico', backToPortal: '🏠 Voltar ao Portal',
    chooseDomain: 'Escolha o Domínio', chooseDomainSub: 'Selecione um ou mais domínios para praticar',
    allDomains: 'Todos os Domínios',
    domPreparar: 'Preparar Dados', domModelar: 'Modelar Dados',
    domVisualizar: 'Visualizar e Analisar', domImplementar: 'Implementar e Manter',
    startTraining: 'Iniciar Treino →',
    loadingTitle: 'Preparando o simulado...', loadingSub: 'Embaralhando questões dos domínios selecionados',
    quit: '✕ Sair', question: 'Questão',
    markReview: '🚩 Marcar para revisão', multiHint: '⚠️ Selecione todas as opções corretas',
    confirmAnswer: 'Confirmar Resposta', prev: '← Anterior', next: 'Próxima →', seeResult: 'Ver Resultado →',
    navigation: 'Navegação', answered: 'Respondida', marked: 'Marcada', current: 'Atual',
    resultTitle: 'Resultado do Simulado', resultTitleOfficial: 'Resultado do Simulado Oficial',
    resultTitleTraining: 'Resultado do Modo Treino',
    hits: 'acertos', approved: '🏆 APROVADO — ≥ 70%', failed: '📚 Não Atingiu — < 70%',
    ofQuestions: 'de', correctQuestions: 'questões corretas', answeredLabel: 'respondidas',
    time: 'Tempo', domainPerformance: '📊 Desempenho por Domínio',
    reviewTitle: '📋 Revisão das Questões',
    filterAll: 'Todas', filterWrong: 'Erradas', filterCorrect: 'Certas',
    yourAnswer: 'Sua resposta:', correctLabel: 'Correta:', noAnswer: '(sem resposta)',
    correctFeedback: '✅ <strong>Correto!</strong> ', incorrectFeedback: '❌ <strong>Incorreto.</strong> Resposta correta: ',
    newSimulado: '🔄 Novo Simulado', history: '📊 Histórico', portal: '🏠 Portal',
    historyTitle: '📊 Histórico de Simulados', historySub: 'Seus últimos 10 simulados realizados',
    clearHistory: '🗑️ Limpar Histórico', noHistory: '📭 Nenhum simulado realizado ainda.',
    confirmClear: 'Tem certeza que deseja apagar todo o histórico?',
    quitTitle: 'Deseja mesmo sair?', quitMsg: 'Seu progresso atual será perdido.',
    continueBtn: 'Continuar', quitBtn: 'Sair',
    selectDomain: 'Selecione pelo menos um domínio para continuar.',
    selectOption: 'Selecione pelo menos uma opção antes de confirmar.',
    noQuestions: 'Nenhuma questão foi carregada. Verifique os domínios selecionados e tente novamente.',
    unansweredMsg: (n) => `Você ainda tem ${n} questão(ões) sem resposta. Deseja ver o resultado mesmo assim?`,
    questionsOf: 'questões corretas', noFilter: 'Nenhuma questão encontrada neste filtro.',
    approvedBadge: '✅ Aprovado', failedBadge: '❌ Reprovado',
    officialLabel: 'Simulado Oficial', trainingLabel: 'Modo Treino',
    questions: 'questões', back: '← Voltar'
  },
  en: {
    simulatorBadge: '⚡ PL-300 Simulator',
    welcomeTitle1: 'Simulator ',
    welcomeTitlePBI: 'Power BI',
    welcomeTitle2: 'Data Analyst',
    welcomeSubtitle: 'Prepare for your certification with 340+ questions covering all domains of the real Microsoft exam.',
    statQuestions: 'Questions', statDomains: 'Domains', statModes: 'Modes', statApproval: 'Pass Rate',
    modeTrainTitle: 'Training Mode', modeTrainDesc: 'Instant feedback, choose domains, no timer',
    modeOfficialTitle: 'Official Exam', modeOfficialDesc: '110 minutes, all domains, real exam conditions',
    viewHistory: '📊 View History', backToPortal: '🏠 Back to Portal',
    chooseDomain: 'Choose Domain', chooseDomainSub: 'Select one or more domains to practice',
    allDomains: 'All Domains',
    domPreparar: 'Prepare Data', domModelar: 'Model Data',
    domVisualizar: 'Visualize & Analyze', domImplementar: 'Deploy & Maintain',
    startTraining: 'Start Training →',
    loadingTitle: 'Preparing the exam...', loadingSub: 'Shuffling questions from selected domains',
    quit: '✕ Quit', question: 'Question',
    markReview: '🚩 Mark for review', multiHint: '⚠️ Select all correct options',
    confirmAnswer: 'Confirm Answer', prev: '← Previous', next: 'Next →', seeResult: 'See Result →',
    navigation: 'Navigation', answered: 'Answered', marked: 'Marked', current: 'Current',
    resultTitle: 'Exam Result', resultTitleOfficial: 'Official Exam Result',
    resultTitleTraining: 'Training Mode Result',
    hits: 'correct', approved: '🏆 PASSED — ≥ 70%', failed: '📚 Not Passed — < 70%',
    ofQuestions: 'of', correctQuestions: 'correct answers', answeredLabel: 'answered',
    time: 'Time', domainPerformance: '📊 Performance by Domain',
    reviewTitle: '📋 Question Review',
    filterAll: 'All', filterWrong: 'Wrong', filterCorrect: 'Correct',
    yourAnswer: 'Your answer:', correctLabel: 'Correct:', noAnswer: '(no answer)',
    correctFeedback: '✅ <strong>Correct!</strong> ', incorrectFeedback: '❌ <strong>Incorrect.</strong> Correct answer: ',
    newSimulado: '🔄 New Exam', history: '📊 History', portal: '🏠 Portal',
    historyTitle: '📊 Exam History', historySub: 'Your last 10 exams',
    clearHistory: '🗑️ Clear History', noHistory: '📭 No exams taken yet.',
    confirmClear: 'Are you sure you want to clear all history?',
    quitTitle: 'Do you really want to quit?', quitMsg: 'Your current progress will be lost.',
    continueBtn: 'Continue', quitBtn: 'Quit',
    selectDomain: 'Please select at least one domain to continue.',
    selectOption: 'Please select at least one option before confirming.',
    noQuestions: 'No questions loaded. Check selected domains and try again.',
    unansweredMsg: (n) => `You still have ${n} unanswered question(s). Do you want to see the result anyway?`,
    questionsOf: 'correct answers', noFilter: 'No questions found for this filter.',
    approvedBadge: '✅ Passed', failedBadge: '❌ Failed',
    officialLabel: 'Official Exam', trainingLabel: 'Training Mode',
    questions: 'questions', back: '← Back'
  }
};

function t(key) { return UI_TEXT[state.lang]?.[key] ?? UI_TEXT['pt'][key] ?? key; }

// ============================================================
//  THEME & LANGUAGE
// ============================================================
// Theme and Language are now handled by portal-core.js
const originalSetLang = window.setLang;
window.setLang = function(lang) {
  if (typeof originalSetLang === 'function') originalSetLang(lang);
  state.lang = lang;
  applyUITexts();
  // If quiz is running, reload current question
  if (document.getElementById('screen-quiz') && document.getElementById('screen-quiz').classList.contains('active') && state.questions && state.questions.length > 0) {
    loadQuestion(state.currentIndex);
  }
};

const originalSetTheme = window.setTheme;
window.setTheme = function(theme) {
  if (typeof originalSetTheme === 'function') originalSetTheme(theme);
  state.theme = theme;
};

// toggleTheme e toggleLang são fornecidos pelo portal-core.js
function applyTheme() { /* handled by portal-core */ }
function applyLang() { /* handled by portal-core */ }

function applyUITexts() {
  // Welcome screen
  const el = (id) => document.getElementById(id);
  const qs = (sel) => document.querySelector(sel);

  const logoBadge = qs('.logo-badge');
  if (logoBadge) logoBadge.textContent = t('simulatorBadge');

  const welcomeTitle = qs('.welcome-title');
  if (welcomeTitle) welcomeTitle.innerHTML = `${t('welcomeTitle1')}<span class="gradient-text">${t('welcomeTitlePBI')}</span><br>${t('welcomeTitle2')}`;

  const welcomeSub = qs('.welcome-subtitle');
  if (welcomeSub) welcomeSub.textContent = t('welcomeSubtitle');

  // Stats
  const statLabels = document.querySelectorAll('.stat-label');
  const statKeys = ['statQuestions', 'statDomains', 'statModes', 'statApproval'];
  statLabels.forEach((el, i) => { if (statKeys[i]) el.textContent = t(statKeys[i]); });

  // Mode cards
  const modeCards = document.querySelectorAll('.mode-info');
  if (modeCards[0]) { modeCards[0].querySelector('h3').textContent = t('modeTrainTitle'); modeCards[0].querySelector('p').textContent = t('modeTrainDesc'); }
  if (modeCards[1]) { modeCards[1].querySelector('h3').textContent = t('modeOfficialTitle'); modeCards[1].querySelector('p').textContent = t('modeOfficialDesc'); }

  // Welcome actions
  const welcomeActions = document.querySelectorAll('.welcome-actions .btn-ghost');
  if (welcomeActions[0]) welcomeActions[0].textContent = t('viewHistory');
  if (welcomeActions[1]) welcomeActions[1].textContent = t('backToPortal');

  // Domain screen
  const domTitle = qs('#screen-domain .screen-title');
  if (domTitle) domTitle.textContent = t('chooseDomain');
  const domSub = qs('#screen-domain .screen-subtitle');
  if (domSub) domSub.textContent = t('chooseDomainSub');

  // Domain cards
  const domainNames = document.querySelectorAll('.domain-name');
  const domKeys = ['allDomains', 'domPreparar', 'domModelar', 'domVisualizar', 'domImplementar'];
  domainNames.forEach((el, i) => { if (domKeys[i]) el.textContent = t(domKeys[i]); });

  // Domain counts
  const domainCounts = document.querySelectorAll('.domain-count');
  domainCounts.forEach(el => {
    const num = el.textContent.match(/\d+/);
    if (num) el.textContent = `${num[0]}+ ${t('questions')}`;
  });

  // Start training button
  const startBtn = el('btn-start-treino');
  if (startBtn) startBtn.textContent = t('startTraining');

  // Back buttons
  document.querySelectorAll('.btn-back').forEach(b => b.textContent = t('back'));

  // Loading
  const loadH3 = qs('#screen-loading h3');
  if (loadH3) loadH3.textContent = t('loadingTitle');
  const loadP = qs('#screen-loading .text-muted');
  if (loadP) loadP.textContent = t('loadingSub');

  // Quiz topbar
  const quitBtn = qs('.btn-quit');
  if (quitBtn) quitBtn.textContent = t('quit');

  // Mark button
  const markBtn = el('btn-mark');
  if (markBtn) markBtn.innerHTML = t('markReview');

  // Submit button
  const submitBtn = el('btn-submit');
  if (submitBtn) submitBtn.textContent = t('confirmAnswer');

  // Nav prev
  const prevBtn = el('btn-prev');
  if (prevBtn) prevBtn.textContent = t('prev');

  // Nav panel
  const navTitle = qs('.nav-panel-title');
  if (navTitle) navTitle.textContent = t('navigation');

  const legendItems = document.querySelectorAll('.nav-legend-item');
  const legendKeys = ['answered', 'marked', 'current'];
  legendItems.forEach((el, i) => {
    const dot = el.querySelector('.nav-dot');
    if (dot && legendKeys[i]) el.innerHTML = dot.outerHTML + ' ' + t(legendKeys[i]);
  });

  // Results
  const scoreLabel = qs('.score-label-sm');
  if (scoreLabel) scoreLabel.textContent = t('hits');

  // Results card titles
  const cardTitles = document.querySelectorAll('.card-title');
  if (cardTitles[0]) cardTitles[0].textContent = t('domainPerformance');
  if (cardTitles[1]) cardTitles[1].textContent = t('reviewTitle');

  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterKeys = ['filterAll', 'filterWrong', 'filterCorrect'];
  filterBtns.forEach((el, i) => { if (filterKeys[i]) el.textContent = t(filterKeys[i]); });

  // Results actions
  const resultsActions = document.querySelectorAll('.results-actions .btn-primary, .results-actions .btn-ghost, .results-actions a');
  if (resultsActions[0]) resultsActions[0].textContent = t('newSimulado');
  if (resultsActions[1]) resultsActions[1].textContent = t('history');
  if (resultsActions[2]) resultsActions[2].textContent = t('portal');

  // History screen
  const histTitle = qs('#screen-history .screen-title');
  if (histTitle) histTitle.textContent = t('historyTitle');
  const histSub = qs('#screen-history .screen-subtitle');
  if (histSub) histSub.textContent = t('historySub');
  const clearBtn = qs('.btn-danger');
  if (clearBtn) clearBtn.textContent = t('clearHistory');

  // Modal
  const modalH3 = qs('.modal-box h3');
  if (modalH3) modalH3.textContent = t('quitTitle');
  const modalP = qs('.modal-box p');
  if (modalP) modalP.textContent = t('quitMsg');
  const modalBtns = document.querySelectorAll('.modal-actions button');
  if (modalBtns[0]) modalBtns[0].textContent = t('continueBtn');
  if (modalBtns[1]) modalBtns[1].textContent = t('quitBtn');
}

function checkActiveSession() {
  const active = localStorage.getItem('pl300_active_session');
  const btn = document.getElementById('btn-resume-session');
  if (btn) {
    if (active) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  }
}

function initSettings() {
  const savedTheme = localStorage.getItem('pl300_theme') || 'dark';
  const savedLang  = localStorage.getItem('pl300_lang')  || 'pt';
  // Chamar via window.setLang/setTheme garante que o interceptor acima
  // (que atualiza state e chama applyUITexts) seja executado na ordem certa
  if (typeof window.setTheme === 'function') window.setTheme(savedTheme);
  if (typeof window.setLang  === 'function') window.setLang(savedLang);
  else { state.lang = savedLang; state.theme = savedTheme; applyUITexts(); }
  checkActiveSession();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('mode') === 'revisao') {
    selectMode('revisao');
  }
}

// Auto-init on load
document.addEventListener('DOMContentLoaded', initSettings);

// ============================================================
//  QUESTION TEXT HELPER (bilingual)
// ============================================================
function getQText(raw) {
  // Returns { question, options, explanation } in the selected language
  if (state.lang === 'pt') {
    return {
      question: raw.pergunta ?? raw.question ?? '',
      options: raw.opcoes ?? raw.options ?? [],
      explanation: raw.explicacao ?? raw.explanation ?? ''
    };
  } else {
    return {
      question: raw.question ?? raw.pergunta ?? '',
      options: raw.options ?? raw.opcoes ?? [],
      explanation: raw.explanation ?? raw.explicacao ?? ''
    };
  }
}

// ============================================================
//  UTILITIES
// ============================================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'screen-history') renderHistory();
}

// ============================================================
//  WELCOME / MODE SELECTION
// ============================================================
function selectMode(mode) {
  state.mode = mode;
  if (mode === 'treino') {
    showScreen('screen-domain');
  } else {
    state.selectedDomains = Object.keys(questionBank);
    startQuiz();
  }
}

// ============================================================
//  DOMAIN SELECTION
// ============================================================
function toggleDomain(btn) {
  const domain = btn.dataset.domain;

  if (domain === 'Todos') {
    document.querySelectorAll('.domain-card').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
    state.selectedDomains = Object.keys(questionBank);
    return;
  }

  // Deselect "Todos" if individual selected
  document.querySelector('[data-domain="Todos"]').classList.remove('selected');

  btn.classList.toggle('selected');
  const selected = [...document.querySelectorAll('.domain-card.selected')]
    .map(c => c.dataset.domain)
    .filter(d => d !== 'Todos');
  state.selectedDomains = selected;
}

function normalizeQuestion(raw) {
  const answerValue = raw.answer !== undefined ? raw.answer : raw.correta;
  return {
    ...raw,
    question: raw.question ?? raw.pergunta ?? '',
    options: raw.options ?? raw.opcoes ?? [],
    answer: answerValue,
    explanation: raw.explanation ?? raw.explicacao ?? ''
  };
}

// ============================================================
//  START QUIZ
// ============================================================
function startQuiz() {
  if (state.mode === 'treino' && state.selectedDomains.length === 0) {
    alert(t('selectDomain'));
    return;
  }

  showScreen('screen-loading');

  setTimeout(() => {
    // Build question pool
    let pool = [];
    let answeredGlobally = new Set(JSON.parse(localStorage.getItem('pl300_answered') || '[]'));
    let globalMarked = new Set(JSON.parse(localStorage.getItem('pl300_global_marked') || '[]'));

    state.selectedDomains.forEach(domain => {
      (questionBank[domain] || []).forEach((raw, idx) => {
        const qId = `${domain}-${idx}`;
        if (state.mode === 'revisao') {
          if (globalMarked.has(qId)) {
            pool.push({ ...normalizeQuestion(raw), domain, id: qId });
          }
        } else {
          if (!answeredGlobally.has(qId)) {
            pool.push({ ...normalizeQuestion(raw), domain, id: qId });
          }
        }
      });
    });

    if (pool.length === 0) {
      if (state.mode === 'revisao') {
        alert(state.lang === 'pt' ? 'Você não tem questões marcadas para revisão.' : 'You have no questions marked for review.');
      } else {
        alert(state.lang === 'pt' ? 'Você já respondeu todas as questões destes domínios! Zere o progresso para recomeçar.' : 'You have already answered all questions in these domains! Reset progress to start over.');
      }
      window.location.href = '../index.html';
      return;
    }

    // Shuffle questions
    let shuffledPool = shuffle(pool);
    
    // Select a subset based on mode
    if (state.mode === 'oficial') {
      // For Official Simulator, we want exactly 60 questions with balanced representation (15 per domain if possible).
      let balancedPool = [];
      const domains = ["Preparar Dados", "Modelar Dados", "Visualizar e Analisar", "Implementar e Manter"];
      
      let byDomain = {};
      domains.forEach(d => {
        byDomain[d] = shuffle(pool.filter(q => q.domain === d));
      });
      
      domains.forEach(d => {
        let count = Math.min(15, (byDomain[d] || []).length);
        for (let i = 0; i < count; i++) {
          balancedPool.push(byDomain[d].pop());
        }
      });
      
      let remaining = pool.filter(q => !balancedPool.includes(q));
      let shuffledRemaining = shuffle(remaining);
      while (balancedPool.length < 60 && shuffledRemaining.length > 0) {
        balancedPool.push(shuffledRemaining.pop());
      }
      
      state.questions = shuffle(balancedPool);
    } else if (state.mode === 'revisao') {
      // In review mode, we just load all marked questions (or up to a sensible limit like 60 to prevent memory issues, but they probably won't have more than that)
      state.questions = shuffledPool;
    } else {
      // Training mode: take a subset of exactly 30 questions
      state.questions = shuffledPool.slice(0, 30);
    }

    state.currentIndex = 0;
    state.score = 0;
    state.answers = new Array(state.questions.length).fill(null);
    state.marked = new Set();

    // globalMarked already declared above
    state.questions.forEach((q, i) => {
      if (globalMarked.has(q.id)) {
        state.marked.add(i);
      }
    });

    state.startTime = Date.now();
    if (typeof updateGlobalStats === 'function') updateGlobalStats();

    // Timer (official mode only)
    clearInterval(state.timerInterval);
    if (state.mode === 'oficial') {
      state.timeRemaining = 110 * 60;
      startTimer();
    }

    buildNavGrid();
    loadQuestion(0);
    saveActiveSession();
    showScreen('screen-quiz');
  }, 600);
}

// ============================================================
//  TIMER
// ============================================================
function startTimer() {
  const display = document.getElementById('timer-display');
  const timerText = document.getElementById('timer-text');
  display.classList.remove('hidden', 'warning', 'danger');
  timerText.textContent = formatTime(state.timeRemaining);

  state.timerInterval = setInterval(() => {
    state.timeRemaining--;
    timerText.textContent = formatTime(state.timeRemaining);

    if (state.timeRemaining <= 600 && state.timeRemaining > 120) {
      display.classList.add('warning');
      display.classList.remove('danger');
    } else if (state.timeRemaining <= 120) {
      display.classList.remove('warning');
      display.classList.add('danger');
    }

    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval);
      showResults();
    } else {
      saveActiveSession();
    }
  }, 1000);
}

// ============================================================
//  LOAD QUESTION
// ============================================================
function loadQuestion(index) {
  state.currentIndex = index;
  const q = state.questions[index];
  
  if (!q) {
    alert(t('noQuestions'));
    showScreen('screen-start');
    return;
  }

  const question = normalizeQuestion(q);
  const qText = getQText(q);
  const total = state.questions.length;
  const answered = state.answers[index];

  // Update topbar
  document.getElementById('q-current').textContent = index + 1;
  document.getElementById('q-total').textContent = total;
  document.getElementById('q-domain-badge').textContent = question.domain;
  document.getElementById('q-badge').textContent = `${t('question')} ${index + 1}`;
  document.getElementById('progress-fill').style.width = `${((index + 1) / total) * 100}%`;

  // Mark button
  const markBtn = document.getElementById('btn-mark');
  markBtn.className = 'btn-mark' + (state.marked.has(index) ? ' marked' : '');

  // Multi-hint
  const hintContainer = document.getElementById('multi-hint-container');
  const isMulti = Array.isArray(question.answer);
  hintContainer.innerHTML = isMulti
    ? `<span class="multi-hint">${t('multiHint')}</span>`
    : '';

  // Question text (bilingual)
  document.getElementById('question-text').textContent = qText.question;

  // Options
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  (qText.options || []).forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option-item';
    div.dataset.index = i;
    div.onclick = () => toggleOption(div, isMulti);

    // Restore selection if answered
    if (answered) {
      div.classList.add('disabled');
      if (answered.selected.includes(i)) {
        const correctAnswers = Array.isArray(qText.answer) ? qText.answer : [qText.answer];
        div.classList.add(correctAnswers.includes(i) ? 'correct' : 'incorrect');
      } else {
        const correctAnswers = Array.isArray(qText.answer) ? qText.answer : [qText.answer];
        if (correctAnswers.includes(i) && state.mode === 'treino') {
          div.classList.add('correct'); // show correct answer
        }
      }
    }

    div.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-text">${opt}</span>
    `;
    container.appendChild(div);
  });

  // Submit / Nav
  const submitBtn = document.getElementById('btn-submit');
  const navActions = document.getElementById('nav-actions');
  const feedbackBox = document.getElementById('feedback-box');

  if (answered) {
    submitBtn.style.display = 'none';
    navActions.style.display = 'flex';
    if (state.mode === 'treino') {
      showFeedback(q, answered.correct);
    } else {
      feedbackBox.className = 'feedback-box hidden';
    }
  } else {
    submitBtn.style.display = 'block';
    navActions.style.display = 'none';
    feedbackBox.className = 'feedback-box hidden';
  }

  // Prev/Next buttons
  document.getElementById('btn-prev').disabled = index === 0;
  const nextBtn = document.getElementById('btn-next');
  nextBtn.textContent = index === total - 1 ? t('seeResult') : t('next');

  // Update nav grid
  updateNavGrid();
}

// ============================================================
//  OPTION SELECTION
// ============================================================
function toggleOption(div, isMulti) {
  if (div.classList.contains('disabled')) return;

  if (isMulti) {
    div.classList.toggle('selected');
    div.querySelector('.option-letter').style.background = div.classList.contains('selected') ? 'var(--purple)' : '';
  } else {
    document.querySelectorAll('.option-item').forEach(o => {
      o.classList.remove('selected');
      o.querySelector('.option-letter').style.background = '';
    });
    div.classList.add('selected');
    div.querySelector('.option-letter').style.background = 'var(--purple)';
  }
}

// ============================================================
//  SUBMIT ANSWER
// ============================================================
function submitAnswer() {
  const q = state.questions[state.currentIndex];
  const selected = [...document.querySelectorAll('.option-item.selected')].map(d => parseInt(d.dataset.index));

  if (selected.length === 0) {
    alert(t('selectOption'));
    return;
  }

  const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
  const isCorrect = selected.length === correctAnswers.length &&
    selected.every(v => correctAnswers.includes(v));

  state.answers[state.currentIndex] = { selected, correct: isCorrect };

  // Highlight options
  document.querySelectorAll('.option-item').forEach(div => {
    const i = parseInt(div.dataset.index);
    div.classList.add('disabled');
    if (selected.includes(i)) {
      div.classList.remove('selected');
      div.classList.add(correctAnswers.includes(i) ? 'correct' : 'incorrect');
    } else if (correctAnswers.includes(i) && state.mode === 'treino') {
      div.classList.add('correct');
    }
    div.querySelector('.option-letter').style.background = '';
  });

  if (state.mode === 'treino') {
    showFeedback(q, isCorrect);
  }

  document.getElementById('btn-submit').style.display = 'none';
  document.getElementById('nav-actions').style.display = 'flex';

  let answeredGlobally = new Set(JSON.parse(localStorage.getItem('pl300_answered') || '[]'));
  answeredGlobally.add(q.id);
  localStorage.setItem('pl300_answered', JSON.stringify(Array.from(answeredGlobally)));

  updateNavGrid();
  if (typeof updateGlobalStats === 'function') updateGlobalStats();
  saveActiveSession();
}

function showFeedback(q, isCorrect) {
  const box = document.getElementById('feedback-box');
  const qText = getQText(q);
  const correctAnswers = Array.isArray(qText.answer) ? qText.answer : [qText.answer];
  const correctTexts = correctAnswers.map(i => qText.options[i]).join(', ');
  box.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
  box.innerHTML = isCorrect
    ? `${t('correctFeedback')} ${qText.explanation}`
    : `${t('incorrectFeedback')} <em>${correctTexts}</em><br><br>${qText.explanation}`;
}

// ============================================================
//  NAVIGATION
// ============================================================
function nextQuestion() {
  const next = state.currentIndex + 1;
  if (next < state.questions.length) {
    loadQuestion(next);
    window.scrollTo(0, 0);
    saveActiveSession();
  } else {
    if (!allAnswered() && state.mode === 'treino') {
      const unanswered = state.questions.length - state.answers.filter(a => a !== null).length;
      if (!confirm(t('unansweredMsg')(unanswered))) return;
    }
    clearInterval(state.timerInterval);
    showResults();
  }
}

function goToQuestion(index) {
  if (index < 0 || index >= state.questions.length) return;
  loadQuestion(index);
  window.scrollTo(0, 0);
  saveActiveSession();
}

function allAnswered() {
  return state.answers.every(a => a !== null);
}

// ============================================================
//  MARK FOR REVIEW
// ============================================================
function toggleMark() {
  const i = state.currentIndex;
  const qId = state.questions[i].id;
  let globalMarked = new Set(JSON.parse(localStorage.getItem('pl300_global_marked') || '[]'));

  if (state.marked.has(i)) {
    state.marked.delete(i);
    globalMarked.delete(qId);
  } else {
    state.marked.add(i);
    globalMarked.add(qId);
  }
  localStorage.setItem('pl300_global_marked', JSON.stringify(Array.from(globalMarked)));

  const btn = document.getElementById('btn-mark');
  btn.className = 'btn-mark' + (state.marked.has(i) ? ' marked' : '');
  updateNavGrid();
  if (typeof updateGlobalStats === 'function') updateGlobalStats();
  saveActiveSession();
}

function updateGlobalStats() {
  try {
    const solved = state.answers.filter(a => a !== null).length;
    const review = state.marked.size;
    localStorage.setItem('pl300_sim_stats', JSON.stringify({ solved, review }));
  } catch(e) {}
}

// ============================================================
//  NAV GRID
// ============================================================
function buildNavGrid() {
  const grid = document.getElementById('nav-grid');
  grid.innerHTML = '';
  state.questions.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.textContent = i + 1;
    btn.onclick = () => goToQuestion(i);
    btn.id = `nav-btn-${i}`;
    grid.appendChild(btn);
  });
}

function updateNavGrid() {
  state.questions.forEach((_, i) => {
    const btn = document.getElementById(`nav-btn-${i}`);
    if (!btn) return;
    btn.className = 'nav-btn';
    if (i === state.currentIndex) {
      btn.classList.add('current');
    } else if (state.marked.has(i)) {
      btn.classList.add('marked');
    } else if (state.answers[i] !== null) {
      btn.classList.add(state.answers[i].correct ? 'answered' : 'wrong');
    }
  });
}

// ============================================================
//  QUIT MODAL
// ============================================================
function confirmQuit() {
  document.getElementById('quit-modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('quit-modal').classList.add('hidden');
}
function quitQuiz() {
  clearInterval(state.timerInterval);
  closeModal();
  showScreen('screen-welcome');
  checkActiveSession();
}

// ============================================================
//  RESULTS
// ============================================================
function showResults() {
  clearInterval(state.timerInterval);
  localStorage.removeItem('pl300_active_session');

  const answered = state.answers.filter(a => a !== null);
  const correct = answered.filter(a => a.correct).length;
  const total = state.questions.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const approved = pct >= 70;

  // Save to history
  const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
  saveHistory({
    date: new Date().toLocaleString(state.lang === 'pt' ? 'pt-BR' : 'en-US'),
    mode: state.mode === 'oficial' ? t('officialLabel') : t('trainingLabel'),
    domains: state.selectedDomains,
    correct, total, pct, approved,
    elapsed
  });

  // Score ring
  const circumference = 2 * Math.PI * 54; // 339.3
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => {
    document.getElementById('score-ring-fill').style.strokeDashoffset = offset;
  }, 200);

  document.getElementById('score-pct').textContent = `${pct}%`;
  document.getElementById('results-title').textContent =
    state.mode === 'oficial' ? t('resultTitleOfficial') : t('resultTitleTraining');

  const badge = document.getElementById('result-badge');
  badge.textContent = approved ? t('approved') : t('failed');
  badge.className = `result-badge ${approved ? 'approved' : 'failed'}`;

  document.getElementById('results-detail').textContent =
    `${correct} ${t('ofQuestions')} ${total} ${t('correctQuestions')} (${answered.length} ${t('answeredLabel')})`;
  document.getElementById('results-time').textContent =
    `${t('time')}: ${formatTime(elapsed)}`;

  // Domain chart
  renderDomainChart();

  // Review
  renderReview('all');

  showScreen('screen-results');
}

function renderDomainChart() {
  const container = document.getElementById('domain-bars');
  container.innerHTML = '';

  const domains = [...new Set(state.questions.map(q => q.domain))];
  domains.forEach(domain => {
    const qs = state.questions.map((q, i) => ({ q, i })).filter(({ q }) => q.domain === domain);
    const total = qs.length;
    const correct = qs.filter(({ i }) => state.answers[i]?.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const fillClass = pct >= 70 ? 'high' : pct >= 50 ? 'mid' : 'low';

    container.innerHTML += `
      <div class="domain-bar-item">
        <div class="domain-bar-header">
          <span class="domain-bar-label">${domain}</span>
          <span class="domain-bar-pct">${correct}/${total} (${pct}%)</span>
        </div>
        <div class="domain-bar-track">
          <div class="domain-bar-fill ${fillClass}" style="width:0%" data-pct="${pct}"></div>
        </div>
      </div>
    `;
  });

  setTimeout(() => {
    document.querySelectorAll('.domain-bar-fill').forEach(el => {
      el.style.width = el.dataset.pct + '%';
    });
  }, 100);
}

function renderReview(filter) {
  const list = document.getElementById('review-list');
  list.innerHTML = '';

  state.questions.forEach((q, i) => {
    const ans = state.answers[i];
    if (!ans) return;
    if (filter === 'correct' && !ans.correct) return;
    if (filter === 'wrong' && ans.correct) return;

    const qText = getQText(q);
    const correctAnswers = Array.isArray(qText.answer) ? qText.answer : [qText.answer];
    const correctTexts = correctAnswers.map(ci => qText.options[ci]).join(', ');
    const selectedTexts = ans.selected.map(si => qText.options[si]).join(', ') || t('noAnswer');

    const item = document.createElement('div');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="review-item-header">
        <div class="review-status-dot ${ans.correct ? 'correct' : 'incorrect'}"></div>
        <span class="review-q-num">Q${i + 1}</span>
        <span class="review-q-domain">${q.domain}</span>
      </div>
      <p class="review-q-text">${qText.question}</p>
      <div class="review-details" id="review-detail-${i}">
        <div class="review-answer">
          <span class="review-answer-label">${t('yourAnswer')}</span>
          <span class="review-answer-val ${ans.correct ? 'correct-answer' : 'wrong-answer'}">${selectedTexts}</span>
        </div>
        ${!ans.correct ? `
        <div class="review-answer">
          <span class="review-answer-label">${t('correctLabel')}</span>
          <span class="review-answer-val correct-answer">${correctTexts}</span>
        </div>` : ''}
        <div class="review-explanation">${qText.explanation}</div>
      </div>
    `;
    item.addEventListener('click', () => {
      const detail = document.getElementById(`review-detail-${i}`);
      detail.classList.toggle('open');
    });
    list.appendChild(item);
  });

  if (list.innerHTML === '') {
    list.innerHTML = `<p class="text-muted" style="text-align:center;padding:32px 0">${t('noFilter')}</p>`;
  }
}

function filterReview(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderReview(filter);
}

function restartFromResults() {
  showScreen('screen-welcome');
}

// ============================================================
//  HISTORY (localStorage)
// ============================================================
function saveHistory(entry) {
  const history = loadHistoryData();
  history.unshift(entry);
  if (history.length > 10) history.pop();
  localStorage.setItem('pl300_history', JSON.stringify(history));
}

function loadHistoryData() {
  try {
    return JSON.parse(localStorage.getItem('pl300_history')) || [];
  } catch {
    return [];
  }
}

function renderHistory() {
  const list = document.getElementById('history-list');
  const history = loadHistoryData();

  if (history.length === 0) {
    list.innerHTML = `<div class="no-history">${t('noHistory')}</div>`;
    return;
  }

  list.innerHTML = history.map((h, idx) => `
    <div class="history-item" style="animation-delay:${idx * 0.05}s">
      <div class="history-score">${h.pct}%</div>
      <div class="history-info">
        <div class="h-mode">${h.mode}</div>
        <div class="h-detail">${h.correct} ${t('ofQuestions')} ${h.total} ${t('correctQuestions')} · ${formatTime(h.elapsed || 0)}</div>
        <div class="h-date">${h.date}</div>
      </div>
      <div class="history-badge ${h.approved ? 'approved' : 'failed'}">
        ${h.approved ? t('approvedBadge') : t('failedBadge')}
      </div>
    </div>
  `).join('');
}

function clearHistory() {
  if (confirm(t('confirmClear'))) {
    localStorage.removeItem('pl300_history');
    renderHistory();
  }
}

// ============================================================
//  ACTIVE SESSION (localStorage)
// ============================================================
function saveActiveSession() {
  const sessionData = {
    mode: state.mode,
    selectedDomains: state.selectedDomains,
    questions: state.questions,
    currentIndex: state.currentIndex,
    score: state.score,
    answers: state.answers,
    marked: Array.from(state.marked),
    startTime: state.startTime,
    timeRemaining: state.timeRemaining
  };
  localStorage.setItem('pl300_active_session', JSON.stringify(sessionData));
}

function resumeSession() {
  const sessionJson = localStorage.getItem('pl300_active_session');
  if (!sessionJson) return;
  const sessionData = JSON.parse(sessionJson);
  
  state.mode = sessionData.mode;
  state.selectedDomains = sessionData.selectedDomains;
  state.questions = sessionData.questions;
  state.currentIndex = sessionData.currentIndex;
  state.score = sessionData.score;
  state.answers = sessionData.answers;
  state.marked = new Set(sessionData.marked);
  state.startTime = sessionData.startTime;
  state.timeRemaining = sessionData.timeRemaining;
  
  if (state.mode === 'oficial') {
    startTimer();
  }
  
  buildNavGrid();
  loadQuestion(state.currentIndex);
  showScreen('screen-quiz');
}

function resetGlobalProgress() {
  const msg = state.lang === 'pt' 
    ? "Tem certeza que deseja zerar TODAS as marcações, histórico de respondidas e sessões ativas?"
    : "Are you sure you want to reset ALL markings, answered history and active sessions?";
  if (confirm(msg)) {
    localStorage.removeItem('pl300_answered');
    localStorage.removeItem('pl300_global_marked');
    localStorage.removeItem('pl300_active_session');
    localStorage.removeItem('pl300_history');
    localStorage.removeItem('pl300_sim_stats');
    alert(state.lang === 'pt' ? "Progresso zerado com sucesso!" : "Progress reset successfully!");
    location.reload();
  }
}
