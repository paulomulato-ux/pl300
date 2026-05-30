// ============================================================
//  PL-300 SIMULADO — JavaScript completo
//  120 questões | 4 domínios | Modo Treino + Simulado Oficial
// ============================================================

// ============================================================
//  BANCO DE QUESTÕES
// ============================================================
const questionBank = {

  /* ==================== DOMÍNIO 1 ==================== */
  "Preparar Dados": [
    {
      question: "Você se conecta a uma tabela SQL com 100 milhões de linhas que cresce diariamente. A atualização completa demora 3 horas. Qual recurso do Power BI permite importar apenas registros novos ou modificados?",
      options: ["Modo DirectQuery", "Atualização Incremental (Incremental Refresh)", "Atualização Manual agendada", "Tabela de Partições DAX"],
      answer: 1,
      explanation: "A Atualização Incremental divide a tabela em partições e recarrega apenas os dados novos ou alterados dentro de um intervalo de datas definido, reduzindo drasticamente o tempo de atualização."
    },
    {
      question: "Você importa uma tabela com 60 colunas, mas usa apenas 10 no relatório. Onde é a MELHOR prática remover as colunas desnecessárias?",
      options: ["Na visualização de Relatório, ocultando as colunas", "No Power Query Editor, antes de carregar para o modelo", "Em uma coluna calculada DAX", "No Power BI Service após publicar"],
      answer: 1,
      explanation: "Remover colunas no Power Query impede que elas cheguem ao modelo de dados, economizando memória e melhorando a performance. Ocultar colunas no relatório ainda as mantém no modelo."
    },
    {
      question: "No Power Query Editor, qual guia contém as opções 'Perfil de Coluna', 'Distribuição de Coluna' e 'Qualidade de Coluna'?",
      options: ["Guia Página Inicial (Home)", "Guia Transformar (Transform)", "Guia Exibição (View)", "Guia Adicionar Coluna (Add Column)"],
      answer: 2,
      explanation: "As ferramentas de Data Profiling (Perfil de Dados) estão na guia 'Exibição' (View) do Power Query Editor, na seção 'Visualização de Dados'."
    },
    {
      question: "O que é Query Folding no Power Query?",
      options: ["Combinar múltiplas queries em uma única query consolidada", "Converter as etapas do Power Query em consultas nativas executadas na fonte de dados", "Comprimir os dados durante o carregamento para economizar espaço", "Criar uma função M reutilizável a partir de uma query existente"],
      answer: 1,
      explanation: "Query Folding (ou query pushdown) ocorre quando o Power Query converte suas etapas de transformação em uma consulta nativa (ex.: SQL) executada na fonte, aproveitando o poder de processamento do servidor."
    },
    {
      question: "Uma coluna de valores numéricos está armazenada como Texto. Qual é a MELHOR abordagem para corrigir este problema?",
      options: ["Converter usando uma coluna calculada DAX com VALUE()", "Alterar o tipo de dado no Power Query Editor", "Usar FORMAT() em cada medida que referenciar a coluna", "Deixar como Texto e converter apenas nas visualizações"],
      answer: 1,
      explanation: "Alterar o tipo de dado na fonte (Power Query) é a melhor prática. Garante integridade dos dados e evita a necessidade de conversões repetidas em DAX."
    },
    {
      question: "Você precisa: (1) Remover linhas onde CustomerID é nulo e (2) Substituir células vazias em Country por 'Desconhecido'. Quais duas etapas do Power Query atendem esses requisitos? (Selecione duas)",
      options: ["Filtrar Linhas (Filter Rows)", "Substituir Valores (Replace Values)", "Remover Erros (Remove Errors)", "Coluna Condicional (Conditional Column)"],
      answer: [0, 1],
      explanation: "'Filtrar Linhas' remove registros com base em condições (incluindo nulos). 'Substituir Valores' troca valores específicos, como strings vazias, por um valor padrão."
    },
    {
      question: "Você tem as tabelas Vendas_2024 e Vendas_2025, com as mesmas colunas. Qual operação do Power Query combina essas tabelas verticalmente (empilhando as linhas)?",
      options: ["Mesclar Consultas (Merge Queries)", "Acrescentar Consultas (Append Queries)", "Junção Cruzada (Cross Join)", "Expandir Coluna (Expand Column)"],
      answer: 1,
      explanation: "'Acrescentar' (Append) empilha tabelas com a mesma estrutura verticalmente. 'Mesclar' (Merge) combina tabelas horizontalmente com base em uma coluna-chave (equivalente ao JOIN do SQL)."
    },
    {
      question: "Uma planilha tem colunas: Produto, Jan, Fev, Mar...Dez, onde cada mês é uma coluna com o valor de vendas. Para análises temporais, você precisa transformar para: Produto, Mês, Valor. Qual transformação usar?",
      options: ["Pivotar Colunas (Pivot Columns)", "Despivotar Colunas (Unpivot Columns)", "Transpor (Transpose)", "Dividir Coluna (Split Column)"],
      answer: 1,
      explanation: "Unpivot transforma colunas em linhas, convertendo uma tabela 'wide' (larga) em uma tabela 'tall' (alta), ideal para análises por período no Power BI."
    },
    {
      question: "Você deseja criar uma conexão parametrizada no Power Query para alternar entre ambientes (Dev, QA, Prod) sem editar a query manualmente. O que usar?",
      options: ["Variáveis DAX (VAR)", "Parâmetros do Power Query (Query Parameters)", "Filtros de Relatório", "Grupos de Cálculo"],
      answer: 1,
      explanation: "Os Parâmetros do Power Query são valores configuráveis que podem ser referenciados nas etapas das queries, permitindo alternar entre fontes ou configurações sem editar a lógica manualmente."
    },
    {
      question: "Qual é a diferença entre criar uma Referência (Reference) e uma Duplicata (Duplicate) de uma query no Power Query?",
      options: ["Não há diferença prática entre as duas opções", "Uma Referência cria cópia independente; uma Duplicata depende da original", "Uma Referência depende da query original e reflete suas mudanças; uma Duplicata é independente", "Referência é usada apenas para fontes SQL Server"],
      answer: 2,
      explanation: "Uma Referência cria uma nova query que parte do resultado da original (como um 'ponteiro'). Uma Duplicata copia todos os passos da query de forma independente."
    },
    {
      question: "Uma pasta compartilhada contém 12 arquivos CSV (um por mês). Você precisa combinar todos em uma única tabela no Power BI. Qual é a abordagem MAIS eficiente?",
      options: ["Importar cada arquivo individualmente e usar Append depois", "Usar o conector de Pasta (Folder) para combinar arquivos automaticamente", "Criar 12 conexões separadas e unir via DAX", "Usar o conector Web para ler a pasta"],
      answer: 1,
      explanation: "O conector de Pasta (Folder) do Power Query detecta automaticamente todos os arquivos na pasta e cria uma função para combiná-los, inclusive adicionando novos arquivos automaticamente nas atualizações futuras."
    },
    {
      question: "Uma coluna DateTime tem alta cardinalidade e prejudica a performance do modelo. Qual transformação no Power Query resolve isso preservando a informação de data?",
      options: ["Converter para texto no formato dd/mm/yyyy", "Extrair apenas a data (Date Only), removendo o horário", "Remover completamente a coluna", "Criar um índice numérico"],
      answer: 1,
      explanation: "Extrair somente a parte da data reduz a cardinalidade (de valores únicos por segundo para valores únicos por dia), melhorando a compactação e a performance do modelo VertiPaq."
    },
    {
      question: "Você criou uma query auxiliar no Power Query que é usada como passo intermediário por outras queries. Você NÃO quer que ela apareça como tabela no modelo. O que fazer?",
      options: ["Deletar a query e recriar a lógica em cada query filha", "Desabilitar o Carregamento (Disable Load) da query auxiliar", "Marcar a tabela como oculta nas configurações do modelo", "Converter em uma Função M"],
      answer: 1,
      explanation: "Desabilitar o carregamento (botão direito na query → 'Habilitar Carregamento') mantém a query ativa como etapa intermediária, mas impede que ela seja carregada como tabela no modelo de dados."
    },
    {
      question: "Uma coluna importada de um CSV contém células com erro (#ERROR). Você deseja substituir esses erros por 0. Qual etapa usar?",
      options: ["Filtrar Linhas para excluir os erros", "Remover Erros (Remove Errors)", "Substituir Erros (Replace Errors)", "Substituir Valores (Replace Values)"],
      answer: 2,
      explanation: "'Substituir Erros' (Replace Errors) permite definir um valor de substituição para células com erro, mantendo a linha no dataset. 'Remover Erros' deleta as linhas com erro."
    },
    {
      question: "Você publicou um relatório no Power BI Service conectado a um banco SQL Server local. Para configurar a atualização agendada, o que é obrigatório?",
      options: ["Licença Power BI Premium", "Um Data Gateway instalado na rede local com acesso ao banco", "Conta de Administrador do Workspace", "Habilitar o Endpoint XMLA"],
      answer: 1,
      explanation: "O Data Gateway (modo Padrão ou Pessoal) é o componente que cria uma ponte segura entre o Power BI Service na nuvem e fontes de dados locais na rede corporativa."
    },
    {
      question: "Qual é o propósito da opção 'Ativar Carregamento para' (Enable Load) em uma query do Power Query?",
      options: ["Forçar a atualização imediata da query", "Controlar se a query será carregada como tabela no modelo de dados", "Habilitar a query para uso em relatórios paginados", "Converter a query para formato DirectQuery"],
      answer: 1,
      explanation: "Quando 'Enable Load' está desativado, a query existe no Power Query mas não é carregada como tabela no modelo, sendo útil para queries de apoio ou staging."
    },
    {
      question: "Ao usar o Power Query para conectar a uma API REST via Web.Contents, o que é necessário para garantir o Query Folding?",
      options: ["Query Folding não é suportado para fontes Web/API REST", "Usar o parâmetro RelativePath e Query no Web.Contents", "Habilitar DirectQuery para a fonte Web", "Usar apenas filtros nativos da API"],
      answer: 0,
      explanation: "Query Folding não é suportado para conectores Web/API REST, pois o Power Query não consegue traduzir as transformações M em requisições HTTP nativas. As transformações são sempre feitas localmente."
    },
    {
      question: "Você precisa criar uma coluna personalizada no Power Query baseada em condições. Qual é a diferença entre 'Coluna Condicional' (Conditional Column) e 'Coluna Personalizada' (Custom Column)?",
      options: ["Não há diferença funcional", "Coluna Condicional usa interface visual com regras IF/ELSE; Coluna Personalizada usa linguagem M livremente", "Coluna Personalizada é mais lenta", "Coluna Condicional suporta apenas dois resultados"],
      answer: 1,
      explanation: "A Coluna Condicional oferece uma interface gráfica para criar lógica IF/ELSE simples. A Coluna Personalizada usa a linguagem M, oferecendo flexibilidade total para expressões complexas."
    },
    {
      question: "Qual função M do Power Query é equivalente ao VLOOKUP do Excel, buscando um valor em outra tabela?",
      options: ["Table.Join()", "Table.NestedJoin() combinado com expansão de coluna", "List.Contains()", "Record.Field()"],
      answer: 1,
      explanation: "Table.NestedJoin (ou 'Mesclar Consultas' na interface) combinado com a expansão da coluna resultante é o equivalente ao VLOOKUP no Power Query, buscando valores de tabelas relacionadas."
    },
    {
      question: "Você conecta o Power BI a uma fonte de dados SQL e percebe que as transformações do Power Query NÃO estão sendo enviadas como SQL para o servidor (Query Folding quebrado). Qual é o impacto mais significativo?",
      options: ["O relatório não consegue atualizar os dados", "Todos os dados são transferidos para o Power BI antes das transformações serem aplicadas, aumentando o consumo de rede e memória", "As medidas DAX param de funcionar", "O RLS deixa de funcionar"],
      answer: 1,
      explanation: "Quando o Query Folding está quebrado, o Power Query baixa todos os dados brutos da fonte para aplicar as transformações localmente, o que é muito mais lento e consome mais recursos."
    },
    {
      question: "Qual é o tipo de dado mais eficiente para representar datas no modelo do Power BI, visando melhor compactação e suporte a funções de inteligência de tempo?",
      options: ["Texto (Text) no formato AAAA-MM-DD", "Número Inteiro (Whole Number) no formato AAAAMMDD", "Data (Date)", "DateTime"],
      answer: 2,
      explanation: "O tipo 'Date' sem componente de hora é mais eficiente que DateTime (menor cardinalidade), mais funcional que texto (suporta operações de data) e mais legível que inteiros, além de ser compatível com inteligência de tempo DAX."
    },
    {
      question: "Você está usando o Power Query para combinar dados de múltiplas planilhas dentro de um único arquivo Excel. Qual recurso permite isso de forma automática?",
      options: ["Importar cada aba individualmente usando múltiplas conexões", "Usar a opção 'Combinar e Transformar' ao conectar ao arquivo Excel", "Criar uma macro VBA no Excel primeiro", "Usar o conector OData"],
      answer: 1,
      explanation: "Ao conectar a um arquivo Excel e selecionar múltiplas planilhas ou usar a opção 'Combinar e Transformar', o Power Query gera automaticamente uma função para combinar as abas."
    },
    {
      question: "Qual é o propósito do 'Diagnóstico de Query' (Query Diagnostics) no Power Query?",
      options: ["Verificar erros de sintaxe na linguagem M", "Identificar gargalos de performance nas etapas de transformação e verificar o Query Folding", "Testar conexões com fontes de dados externas", "Monitorar o uso de memória em tempo real"],
      answer: 1,
      explanation: "O Diagnóstico de Query registra informações detalhadas sobre cada etapa do Power Query, mostrando quais consultas foram enviadas à fonte (Query Folding) e onde estão os gargalos de performance."
    },
    {
      question: "Você precisa que o Power Query leia apenas os dados dos últimos 30 dias de uma tabela SQL enorme. Qual é a abordagem mais eficiente para filtrar na fonte?",
      options: ["Carregar todos os dados e filtrar depois com DAX", "Adicionar um passo de Filtrar Linhas baseado na coluna de data após carregar tudo", "Usar um Parâmetro de Data e aplicar o filtro no Power Query, garantindo Query Folding para SQL", "Criar uma view no banco de dados e conectar a ela"],
      answer: 2,
      explanation: "Usar um Parâmetro de Data no filtro do Power Query, quando a fonte suporta Query Folding (como SQL Server), envia o filtro diretamente para o banco, transferindo apenas os dados necessários."
    },
    {
      question: "Qual é a melhor prática ao lidar com erros de tipo de dado durante a importação de arquivos CSV no Power Query?",
      options: ["Ignorar os erros e deixar o Power BI resolver automaticamente", "Definir explicitamente os tipos de dado de cada coluna no Power Query e tratar os erros com Substituir Erros ou Remover Erros", "Sempre converter tudo para Texto e tratar no DAX", "Usar um arquivo Excel em vez de CSV"],
      answer: 1,
      explanation: "Definir os tipos de dado explicitamente no Power Query garante consistência e permite tratar erros de conversão de forma controlada antes que os dados cheguem ao modelo."
    },
    {
      question: "Você tem uma tabela de clientes com uma coluna 'Endereço Completo' no formato 'Rua, Cidade, Estado'. Você precisa separar em três colunas. Qual recurso do Power Query usar?",
      options: ["Extrair (Extract) → Texto Após Delimitador", "Dividir Coluna (Split Column) por delimitador", "Coluna Condicional", "Substituir Valores"],
      answer: 1,
      explanation: "'Dividir Coluna por Delimitador' separa o conteúdo de uma coluna em múltiplas colunas com base em um caractere separador, como vírgula ou ponto e vírgula."
    },
    {
      question: "Qual é o comportamento padrão do Power Query ao alterar o tipo de uma coluna que contém valores incompatíveis?",
      options: ["A importação falha completamente", "Os valores incompatíveis são convertidos para null", "Os valores incompatíveis geram um erro na célula (#Error)", "O Power Query ignora a alteração de tipo"],
      answer: 2,
      explanation: "Ao alterar o tipo de dado, valores que não podem ser convertidos geram um erro (#Error) na célula. O usuário precisa tratar esses erros com 'Substituir Erros' ou 'Remover Erros'."
    },
    {
      question: "Qual é a vantagem de usar 'Funções Personalizadas' (Custom Functions) em M no Power Query?",
      options: ["Melhoram o Query Folding automaticamente", "Permitem reutilizar lógica de transformação em múltiplas queries evitando duplicação de código", "São mais rápidas que os passos nativos do Power Query", "Permitem executar código Python dentro do Power Query"],
      answer: 1,
      explanation: "Funções personalizadas em M encapsulam lógica reutilizável que pode ser aplicada a múltiplas queries ou tabelas, evitando duplicação e facilitando a manutenção."
    },
    {
      question: "Você precisa conectar o Power BI a dados de um banco Oracle local e configurar atualização agendada no Service. Qual requisito adicional é necessário?",
      options: ["Instalar o driver Oracle ODBC no servidor do Gateway", "Usar apenas DirectQuery para Oracle", "Converter os dados para CSV primeiro", "Não é possível usar Oracle com Power BI"],
      answer: 0,
      explanation: "Para conectar a fontes Oracle, além do Data Gateway, é necessário instalar o provedor Oracle Data Provider for .NET (ODP.NET) ou o driver Oracle ODBC na máquina onde o Gateway está instalado."
    },
    {
      question: "Qual é o impacto de manter muitas etapas de transformação no Power Query que quebram o Query Folding em uma fonte SQL?",
      options: ["Nenhum impacto, o Power BI otimiza automaticamente", "Aumenta o tempo de atualização pois os dados são processados no motor local do Power Query em vez do servidor de banco de dados", "Impede o uso de medidas DAX", "Quebra os relacionamentos do modelo"],
      answer: 1,
      explanation: "Quando o Query Folding é quebrado, o Power Query precisa baixar os dados brutos e processá-los localmente, o que é significativamente mais lento do que deixar o servidor de banco de dados fazer o processamento."
    },
    {
      question: "Você quer criar uma tabela de calendário completa diretamente no Power Query (não no DAX). Qual função M é a base para gerar uma lista de datas contínua?",
      options: ["List.Numbers()", "List.Dates()", "Table.FromList()", "Date.AddDays()"],
      answer: 1,
      explanation: "List.Dates(startDate, count, step) gera uma lista de datas a partir de uma data inicial, com um número de datas e um incremento definidos. É a base para criar tabelas de calendário em M."
    }
  ],

  /* ==================== DOMÍNIO 2 ==================== */
  "Modelar Dados": [
    {
      question: "Por que é preferível usar um esquema estrela (Star Schema) com tabelas de fato e dimensão separadas em vez de uma única tabela desnormalizada no Power BI?",
      options: ["É obrigatório pelo Power BI, que não aceita tabelas desnormalizadas", "Reduz a redundância de dados, melhora a compactação VertiPaq e a performance das medidas DAX", "Permite usar o modo DirectQuery", "Habilita RLS automaticamente"],
      answer: 1,
      explanation: "O Star Schema melhora a eficiência do motor VertiPaq (compactação por coluna), reduz o tamanho do modelo, e simplifica a escrita de medidas DAX. É a arquitetura recomendada para modelos Power BI."
    },
    {
      question: "Qual é a diferença fundamental entre uma Medida (Measure) e uma Coluna Calculada (Calculated Column) no DAX?",
      options: ["Medidas são mais rápidas; Colunas Calculadas são mais lentas", "Medidas são calculadas em tempo de consulta com contexto de filtro dinâmico; Colunas Calculadas são calculadas no carregamento e armazenadas no modelo", "Colunas Calculadas suportam funções de inteligência de tempo; Medidas não", "Não há diferença funcional, apenas de sintaxe"],
      answer: 1,
      explanation: "Colunas Calculadas são computadas durante o carregamento/atualização e seus valores ficam armazenados no modelo. Medidas são calculadas dinamicamente em cada consulta, respondendo ao contexto de filtro atual."
    },
    {
      question: "Qual função DAX é utilizada para modificar o contexto de filtro de uma expressão?",
      options: ["FILTER()", "CALCULATE()", "ALL()", "ALLEXCEPT()"],
      answer: 1,
      explanation: "CALCULATE() é a função central do DAX para modificar o contexto de filtro. Ela avalia uma expressão no contexto modificado pelos filtros adicionais fornecidos como argumentos."
    },
    {
      question: "Para que as funções de inteligência de tempo (TOTALYTD, SAMEPERIODLASTYEAR, etc.) funcionem corretamente, o que é necessário na tabela de datas?",
      options: ["A tabela deve ter exatamente 365 linhas por ano", "A tabela deve ser marcada como 'Tabela de Data' (Mark as Date Table) e ter uma coluna de data sem lacunas", "A tabela de datas deve estar em modo DirectQuery", "A coluna de data deve se chamar 'Date' obrigatoriamente"],
      answer: 1,
      explanation: "A tabela de datas precisa: (1) ser marcada como 'Tabela de Data', (2) ter uma coluna do tipo Date, (3) conter datas contíguas sem lacunas para o período de análise."
    },
    {
      question: "Você tem as tabelas: Vendas (N) relacionada com Produto (1) e Produto (1) relacionada com Categoria (1). Por padrão, um filtro em Categoria se propaga até Vendas automaticamente. Isso se chama:",
      options: ["Filtro bidirecional", "Propagação de filtro em cadeia (Filter context propagation)", "RLS em cascata", "Contexto de linha"],
      answer: 1,
      explanation: "Em um relacionamento 1:N, os filtros se propagam automaticamente do lado 1 (dimensão) para o lado N (fato), percorrendo toda a cadeia de relacionamentos. Esse comportamento é fundamental no Power BI."
    },
    {
      question: "Qual é a PRINCIPAL consequência negativa de habilitar o filtro bidirecional em relacionamentos de um modelo complexo?",
      options: ["Melhora a performance mas aumenta o tamanho do arquivo", "Pode causar ambiguidade nos caminhos de filtro, resultados incorretos e degradação de performance", "Impede o uso de RLS", "Desativa o Query Folding"],
      answer: 1,
      explanation: "Filtros bidirecionais podem criar múltiplos caminhos de filtro, gerando ambiguidade. O Power BI pode não saber qual caminho usar, causando resultados imprevistos. Devem ser usados com cautela."
    },
    {
      question: "Você deseja que cada usuário veja apenas os dados da sua região ao acessar um relatório. O email do usuário autenticado deve ser comparado com uma coluna Email na tabela Regiões. Qual função DAX usar na regra RLS?",
      options: ["USERNAME()", "USERPRINCIPALNAME()", "CURRENTUSER()", "USERENV()"],
      answer: 1,
      explanation: "USERPRINCIPALNAME() retorna o endereço de email do usuário autenticado no Power BI Service (formato user@domain.com), ideal para implementar RLS dinâmico comparando com dados da tabela."
    },
    {
      question: "Na tabela Vendas (lado N do relacionamento), você quer criar uma coluna calculada que traga o Nome da tabela Produto (lado 1). Qual função DAX usar?",
      options: ["RELATEDTABLE()", "RELATED()", "LOOKUPVALUE()", "CALCULATE(SELECTEDVALUE(...))"],
      answer: 1,
      explanation: "RELATED() navega do lado N de um relacionamento para o lado 1, retornando um valor escalar da tabela relacionada. RELATEDTABLE() faz o oposto, retornando uma tabela do lado N para o lado 1."
    },
    {
      question: "Qual das seguintes expressões DAX calcula o Total de Vendas acumulado no ano (Year-to-Date)?",
      options: ["CALCULATE([Total Vendas], YEAR(Calendario[Date]) = YEAR(TODAY()))", "TOTALYTD([Total Vendas], Calendario[Date])", "SUMX(DATESYTD(Calendario[Date]), [Total Vendas])", "Apenas a opção B está correta"],
      answer: 1,
      explanation: "TOTALYTD([Medida], Tabela[Data]) é a forma mais direta de calcular YTD. Também é possível usar CALCULATE([Total Vendas], DATESYTD(Calendario[Date])), que é equivalente."
    },
    {
      question: "Por que é preferível usar DIVIDE(Numerador, Denominador, [AlternativeResult]) em vez do operador '/' no DAX?",
      options: ["DIVIDE é mais rápido que o operador '/'", "DIVIDE trata automaticamente a divisão por zero, retornando BLANK() ou o resultado alternativo definido", "DIVIDE é necessário para medidas visíveis no relatório", "Não há diferença entre DIVIDE e o operador '/'"],
      answer: 1,
      explanation: "O operador '/' retorna um erro quando o denominador é zero. DIVIDE() retorna BLANK() (ou um valor alternativo opcional), tornando as medidas mais robustas sem necessidade de verificações adicionais."
    },
    {
      question: "Você tem uma tabela Vendas com duas colunas de data: DataVenda e DataEntrega, ambas relacionadas à tabela Calendário. Apenas uma relação pode ser ativa. Como usar a relação inativa em uma medida DAX?",
      options: ["Criar uma segunda tabela Calendário duplicada", "Usar USERELATIONSHIP() dentro de CALCULATE()", "Deletar a relação ativa e ativar a inativa", "Usar CROSSFILTER() na relação inativa"],
      answer: 1,
      explanation: "USERELATIONSHIP(Tabela1[Coluna], Tabela2[Coluna]) dentro de CALCULATE() ativa temporariamente uma relação inativa para o escopo daquela medida, sem afetar outras medidas."
    },
    {
      question: "Qual é o cenário mais adequado para criar uma Tabela Calculada (Calculated Table) no DAX?",
      options: ["Para realizar todas as transformações de dados, substituindo o Power Query", "Para criar tabelas auxiliares como tabela de datas, tabelas de parâmetros What-if ou tabelas de suporte a cálculos", "Sempre que precisar de uma nova dimensão", "Para melhorar a performance de medidas complexas"],
      answer: 1,
      explanation: "Tabelas Calculadas são criadas em DAX e são úteis para: tabela de datas (CALENDARAUTO), tabelas de parâmetros, tabelas auxiliares para cálculos específicos ou seleções de valores únicos (ALL/VALUES/DISTINCT)."
    },
    {
      question: "Qual é o resultado de CALCULATE([Total Vendas], ALL(Produto)) em um contexto onde Produto[Categoria] = 'Eletrônicos' está filtrado?",
      options: ["Retorna o total de vendas apenas para Eletrônicos", "Remove o filtro de Produto e retorna o total de vendas de todos os produtos", "Retorna BLANK() pois ALL() remove todos os filtros", "Gera um erro de circular dependency"],
      answer: 1,
      explanation: "ALL(Produto) remove todos os filtros aplicados na tabela Produto, fazendo CALCULATE() ignorar o contexto de filtro de Categoria. O resultado é o total geral de vendas, independente do produto/categoria."
    },
    {
      question: "Você precisa criar uma medida que calcule a porcentagem de vendas de cada produto em relação ao total geral. Qual é a fórmula correta?",
      options: ["[Total Vendas] / MAX([Total Vendas])", "DIVIDE([Total Vendas], CALCULATE([Total Vendas], ALL(Produto)))", "DIVIDE([Total Vendas], SUM(Vendas[Valor]))", "[Total Vendas] / TOTALYTD([Total Vendas], Calendario[Date])"],
      answer: 1,
      explanation: "CALCULATE([Total Vendas], ALL(Produto)) calcula o total sem filtro de produto (total geral). DIVIDE(...) então calcula a proporção de cada produto, tratando divisão por zero."
    },
    {
      question: "O que é 'contexto de iteração' (row context) no DAX e quando ele existe?",
      options: ["É o filtro aplicado pelos slicers no relatório", "É o contexto criado por funções iteradoras (SUMX, AVERAGEX, etc.) ou em colunas calculadas, onde cada linha da tabela é processada individualmente", "É o contexto de filtro da sessão atual do usuário", "É criado apenas pelo CALCULATE()"],
      answer: 1,
      explanation: "O contexto de linha (row context) é criado automaticamente em colunas calculadas (para cada linha da tabela) e por funções iteradoras como SUMX, MINX, MAXX, FILTER, etc."
    },
    {
      question: "Qual é a diferença entre FILTER(ALL(Tabela), condição) e FILTER(Tabela, condição) dentro de um CALCULATE()?",
      options: ["Não há diferença funcional", "FILTER(ALL(Tabela)) ignora filtros externos e filtra toda a tabela; FILTER(Tabela) respeita os filtros do contexto atual antes de aplicar a condição", "FILTER(Tabela) é mais lento", "FILTER(ALL) só funciona com tabelas de fato"],
      answer: 1,
      explanation: "FILTER(ALL(Tabela), condição) sempre filtra toda a tabela, independente de filtros externos. FILTER(Tabela, condição) aplica a condição sobre os dados já filtrados pelo contexto, podendo retornar subconjuntos menores."
    },
    {
      question: "Você precisa criar uma medida que retorne as vendas do mesmo período do ano anterior. Qual função de inteligência de tempo usar?",
      options: ["PREVIOUSYEAR()", "DATEADD(Calendario[Date], -1, YEAR)", "SAMEPERIODLASTYEAR(Calendario[Date])", "PARALLELPERIOD(Calendario[Date], -12, MONTH)"],
      answer: 2,
      explanation: "SAMEPERIODLASTYEAR(Calendario[Date]) retorna uma tabela com as datas do mesmo período do ano anterior, usada dentro de CALCULATE() para calcular métricas comparativas com o ano anterior."
    },
    {
      question: "O que são Aggregations (Agregações) no Power BI e qual é o seu principal benefício?",
      options: ["São resumos automáticos criados pelo Power BI para gráficos", "São tabelas pré-agregadas que o Power BI usa para responder consultas de alto nível sem varrer a tabela de fato completa, melhorando dramaticamente a performance", "São medidas DAX que usam SUMMARIZE()", "São índices criados no banco de dados fonte"],
      answer: 1,
      explanation: "Agregações são tabelas com dados sumarizados que o Power BI usa automaticamente quando uma consulta pode ser respondida por elas. A tabela de fato detalhada ainda existe e é usada quando necessário (drill-through)."
    },
    {
      question: "Quando é mais indicado usar uma Coluna Calculada em vez de uma Medida no DAX?",
      options: ["Sempre que o cálculo for complexo", "Quando você precisa usar o resultado como eixo, legenda, slicer ou filtro em visuais, pois medidas não podem ser usadas nesses contextos diretamente", "Quando quer melhores resultados de performance", "Quando trabalha com DirectQuery"],
      answer: 1,
      explanation: "Colunas Calculadas são armazenadas no modelo e podem ser usadas como campo em eixos de gráficos, filtros, slicers e legendas. Medidas são valores agregados e não podem ser usados diretamente nessas posições."
    },
    {
      question: "O que é um modelo Composto (Composite Model) no Power BI?",
      options: ["Um modelo que usa apenas tabelas calculadas DAX", "Um modelo que combina tabelas em modo Import e DirectQuery na mesma solução", "Um modelo com mais de 100 tabelas", "Um modelo que usa RLS em todas as tabelas"],
      answer: 1,
      explanation: "Modelos Compostos permitem combinar Import e DirectQuery na mesma solução. Por exemplo: dimensões em Import (rápidas) e tabelas de fato em DirectQuery (sempre atualizadas), obtendo o melhor dos dois mundos."
    },
    {
      question: "Qual função DAX retorna o número de linhas de uma tabela, respeitando o contexto de filtro atual?",
      options: ["COUNT()", "COUNTA()", "COUNTROWS()", "DISTINCTCOUNT()"],
      answer: 2,
      explanation: "COUNTROWS(Tabela) conta o número de linhas da tabela no contexto de filtro atual. COUNT() conta valores não vazios em uma coluna. DISTINCTCOUNT() conta valores únicos."
    },
    {
      question: "O que é 'Expanded Table' (tabela expandida) no contexto de relacionamentos DAX?",
      options: ["Uma tabela com colunas calculadas adicionais", "Uma tabela que inclui implicitamente as colunas de todas as tabelas relacionadas a ela pelo lado '1', permitindo filtros em cadeia", "Uma tabela após operação Unpivot", "Uma tabela com mais de 1 milhão de linhas"],
      answer: 1,
      explanation: "No modelo DAX, cada tabela é 'expandida' para incluir as colunas das tabelas do lado '1' dos relacionamentos. Isso explica como os filtros se propagam automaticamente de dimensões para fatos."
    },
    {
      question: "Qual é o objetivo da função ALLEXCEPT(Tabela, Coluna1, Coluna2) no DAX?",
      options: ["Remove todos os filtros da tabela, exceto os especificados nas colunas indicadas", "Filtra a tabela mantendo apenas as colunas especificadas", "Remove duplicatas, mantendo apenas as colunas especificadas", "Cria um contexto de linha para as colunas especificadas"],
      answer: 0,
      explanation: "ALLEXCEPT(Tabela, Col1, Col2) remove todos os filtros da tabela, preservando apenas os filtros nas colunas especificadas. Útil para criar totais parciais que ignoram alguns filtros mas mantêm outros."
    },
    {
      question: "Você precisa calcular o ranking de cada produto por vendas dentro de sua categoria. Qual função DAX usar?",
      options: ["RANK.EQ()", "RANKX(FILTER(ALL(Produto), Produto[Categoria] = MAX(Produto[Categoria])), [Total Vendas])", "TOPN()", "RANKX(ALL(Produto), [Total Vendas])"],
      answer: 1,
      explanation: "RANKX() com um contexto de filtro adequado (usando FILTER para limitar ao domínio de ranking desejado) é a forma correta de calcular ranking dentro de um grupo no DAX."
    },
    {
      question: "O que são Grupos de Cálculo (Calculation Groups) no Power BI e qual problema eles resolvem?",
      options: ["São grupos de medidas organizadas em pastas de exibição", "Permitem criar uma dimensão dinâmica que aplica diferentes cálculos (YTD, MoM, PY etc.) a qualquer medida base, eliminando duplicação de medidas", "São filtros avançados aplicados a grupos de visuais", "São conjuntos de regras RLS agrupadas"],
      answer: 1,
      explanation: "Grupos de Cálculo permitem definir 'itens de cálculo' (ex.: Atual, YTD, Ano Anterior, % Variação) que se aplicam dinamicamente a qualquer medida. Evitam criar dezenas de medidas para cada combinação de KPI + período."
    },
    {
      question: "Qual é a função do parâmetro 'What-if' no Power BI e como ele é implementado?",
      options: ["Simula diferentes cenários de dados conectando a fontes alternativas", "Cria uma tabela calculada com uma sequência de valores e uma medida associada, permitindo que o usuário ajuste um valor via slicer e veja o impacto nos cálculos", "É um recurso exclusivo do Power BI Premium", "Permite simular dados sem conexão com a fonte original"],
      answer: 1,
      explanation: "O parâmetro What-if cria: (1) uma tabela calculada com valores (ex.: percentual de desconto de 0% a 30%), (2) uma medida de valor selecionado, e (3) um slicer. O usuário ajusta o slicer e as medidas que referenciam o parâmetro se recalculam."
    },
    {
      question: "Por que é importante que a tabela de calendário (Date Table) seja marcada explicitamente como 'Mark as Date Table' no Power BI?",
      options: ["Para habilitar a interface de calendário nos slicers de data", "Para garantir que as funções de inteligência de tempo funcionem corretamente, validando que a tabela tem datas contíguas sem lacunas", "Para ativar o modo DirectQuery na tabela", "Para habilitar a formatação de data nos visuais"],
      answer: 1,
      explanation: "Marcar como 'Tabela de Data' permite ao DAX validar que a tabela atende os requisitos (coluna Date, sem lacunas, sem duplicatas) e garante o comportamento correto das funções de inteligência de tempo em cenários de filtro de data."
    },
    {
      question: "Qual é a diferença entre relacionamentos 1:1 e N:N (muitos para muitos) no Power BI?",
      options: ["1:1 é mais eficiente; N:N é mais flexível para modelagem", "Em 1:1 cada valor da coluna de junção aparece uma vez em ambas as tabelas; em N:N os valores podem aparecer múltiplas vezes em ambos os lados, requerendo tratamento especial de filtro", "N:N não é suportado no Power BI", "1:1 requer RLS; N:N não"],
      answer: 1,
      explanation: "Relacionamentos N:N (muitos para muitos) no Power BI são suportados diretamente (sem tabela ponte obrigatória), mas podem causar double-counting e comportamentos de filtro inesperados se não forem bem compreendidos."
    },
    {
      question: "O que são Field Parameters (Parâmetros de Campo) no Power BI e qual é seu caso de uso principal?",
      options: ["São parâmetros para conexão com fontes de dados variáveis", "Permitem que o usuário final selecione quais campos (colunas ou medidas) são exibidos em um visual via slicer, tornando o relatório mais interativo e flexível", "São variáveis DAX reutilizáveis entre medidas", "São filtros avançados aplicados por campos específicos"],
      answer: 1,
      explanation: "Field Parameters criam um 'slicer de campos' que permite ao usuário escolher quais métricas ou dimensões ver em um gráfico. Por exemplo: alternar entre Vendas, Margem e Quantidade no eixo Y de um gráfico de barras."
    },
    {
      question: "Qual é o impacto de ter muitas Colunas Calculadas no modelo do Power BI em termos de performance?",
      options: ["Nenhum impacto, pois são calculadas apenas uma vez no carregamento", "Aumentam o tamanho do modelo em memória pois seus valores são armazenados no modelo VertiPaq, e aumentam o tempo de atualização pois precisam ser recalculadas a cada refresh", "Diminuem a performance apenas de relatórios com muitas páginas", "Impactam apenas o modo DirectQuery"],
      answer: 1,
      explanation: "Colunas Calculadas armazenam um valor por linha no modelo VertiPaq, aumentando o consumo de memória. Além disso, são recalculadas a cada atualização de dados, aumentando o tempo total do refresh."
    }
  ],

  /* ==================== DOMÍNIO 3 ==================== */
  "Visualizar e Analisar": [
    {
      question: "Ao clicar em uma barra de um gráfico, outro visual na mesma página exibe os demais valores em cinza semitransparente, mantendo todos os dados visíveis. Isso é um exemplo de:",
      options: ["Filtro Cruzado (Cross-filter)", "Realce Cruzado (Cross-highlight)", "Drillthrough", "Slicer Sincronizado"],
      answer: 1,
      explanation: "Cross-highlight realça os valores relacionados ao selecionado, mantendo os demais valores visíveis (em cinza). Cross-filter efetivamente filtra os outros visuais, removendo os itens não selecionados."
    },
    {
      question: "Você criou uma página de detalhes de pedidos. Ao clicar com o botão direito em qualquer visual do relatório e selecionar um pedido, o usuário navega para essa página com os dados filtrados. Isso é:",
      options: ["Drill Down hierárquico", "Drillthrough", "Bookmark de navegação", "Tooltip de Relatório"],
      answer: 1,
      explanation: "Drillthrough é uma navegação contextual que leva o usuário de um visual para uma página de detalhes, passando automaticamente os filtros do item selecionado. É configurado nas Propriedades da página de destino."
    },
    {
      question: "Você quer criar um botão que alterna entre exibir um gráfico de barras e um gráfico de pizza na mesma área do relatório. Qual é a abordagem correta?",
      options: ["Criar duas páginas separadas e adicionar botões de navegação", "Usar Bookmarks combinados com a seleção de visibilidade de visuais", "Usar o painel de Filtros para alternar os tipos de visual", "Usar Drillthrough entre os dois visuais"],
      answer: 1,
      explanation: "Bookmarks capturam o estado do relatório (incluindo quais visuais estão visíveis). Criando dois bookmarks — um com o gráfico de barras visível e outro com a pizza visível — um botão pode alternar entre eles."
    },
    {
      question: "Você criou uma página especial e a configurou como Tooltip (Dica de Ferramenta) de relatório. O que acontece quando o usuário passa o mouse sobre um ponto de dados?",
      options: ["A página de tooltip aparece como pop-up com visualizações contextuais ricas", "A página de tooltip substitui o visual principal", "A página de tooltip é enviada por email para o usuário", "A página de tooltip filtra toda a tela atual"],
      answer: 0,
      explanation: "Report Page Tooltips aparecem como pop-up ao passar o mouse sobre pontos de dados, exibindo uma página completa de visuais contextualizados com os dados do ponto selecionado. São configuradas nas Propriedades da página."
    },
    {
      question: "Você quer colorir células de uma tabela automaticamente: verde para metas atingidas e vermelho para abaixo da meta. Qual feature usar?",
      options: ["Temas de Relatório (Report Themes)", "Formatação Condicional (Conditional Formatting)", "Regras de RLS por cor", "Grupos de Cálculo de Cores"],
      answer: 1,
      explanation: "Formatação Condicional permite aplicar cores de fundo, cores de fonte, ícones ou barras de dados em tabelas e matrizes, com base em valores, regras ou campos. Está disponível nas configurações de formato do visual."
    },
    {
      question: "Qual visual do Power BI permite que usuários finais façam perguntas em linguagem natural (ex: 'vendas por estado em 2024') e recebam uma visualização automática?",
      options: ["Árvore de Decomposição (Decomposition Tree)", "Visual Q&A", "Principais Influenciadores (Key Influencers)", "Narrativa Inteligente (Smart Narrative)"],
      answer: 1,
      explanation: "O visual Q&A usa processamento de linguagem natural (NLP) para interpretar perguntas em texto e gerar automaticamente a visualização mais adequada para a resposta. Pode ser personalizado com sinônimos e dados de treinamento."
    },
    {
      question: "Um gerente quer decompor a variação de vendas entendendo quais combinações de Região, Produto e Vendedor mais contribuíram. Qual visual é projetado para esse tipo de análise exploratória em árvore?",
      options: ["Gráfico de Cascata (Waterfall)", "Árvore de Decomposição (Decomposition Tree)", "Principais Influenciadores (Key Influencers)", "Gráfico de Funil (Funnel)"],
      answer: 1,
      explanation: "A Árvore de Decomposição permite ao usuário explorar hierarquicamente as contribuições de diferentes dimensões para um valor, com suporte a IA para encontrar automaticamente os maiores influenciadores em cada nível."
    },
    {
      question: "Você quer descobrir quais fatores aumentam a probabilidade de um cliente avaliar um produto negativamente. Qual visual do Power BI analisa estatisticamente esses influenciadores?",
      options: ["Árvore de Decomposição", "Principais Influenciadores (Key Influencers)", "Gráfico de Dispersão", "Funil (Funnel)"],
      answer: 1,
      explanation: "O visual 'Principais Influenciadores' usa análise estatística para identificar quais variáveis (campos) têm maior impacto sobre um resultado específico, mostrando a direção e magnitude da influência."
    },
    {
      question: "Você tem um slicer de Ano na Página 1 e quer que ele filtre automaticamente as Páginas 2 e 3 do mesmo relatório. O que usar?",
      options: ["Duplicar o slicer em cada página manualmente", "Painel 'Sincronizar Segmentações' (Sync Slicers)", "Filtros de nível de relatório no painel de Filtros", "Bookmarks de sincronização"],
      answer: 1,
      explanation: "O painel 'Sincronizar Segmentações' (View → Sync Slicers) permite configurar quais páginas um slicer deve filtrar, com opções de visibilidade e sincronização independentes por página."
    },
    {
      question: "Como garantir uma experiência otimizada para usuários que acessam o relatório pelo aplicativo Power BI Mobile?",
      options: ["Criar um relatório separado com nome '_mobile'", "Usar o Layout Móvel (Mobile Layout) no Power BI Desktop para reorganizar os visuais para tela vertical", "Habilitar 'Responsividade' nas configurações avançadas do workspace", "Reduzir o número de visuais para menos de 5 por página"],
      answer: 1,
      explanation: "O Layout Móvel permite reorganizar e redimensionar os visuais do relatório para uma experiência otimizada em telas verticais de celular, sem criar um relatório separado."
    },
    {
      question: "Um visual específico no relatório carrega muito lentamente. Qual ferramenta do Power BI Desktop permite medir o tempo de carregamento de cada visual e identificar consultas DAX lentas?",
      options: ["Query Diagnostics no Power Query", "Analisador de Performance (Performance Analyzer)", "DAX Studio (ferramenta externa)", "Monitor de Gateway no Power BI Service"],
      answer: 1,
      explanation: "O Analisador de Performance (View → Performance Analyzer) registra o tempo que cada visual levou para renderizar, separando em tempo DAX, Visual e outro. Permite copiar a consulta DAX para análise externa."
    },
    {
      question: "Você quer que todos os relatórios da empresa usem automaticamente as cores e fontes corporativas. Qual é a abordagem MAIS escalável?",
      options: ["Configurar cada visual manualmente em cada relatório", "Criar um arquivo de Tema JSON personalizado e aplicar a todos os relatórios", "Usar formatação condicional em cada relatório", "Configurar no portal de Administração do Power BI Service"],
      answer: 1,
      explanation: "Temas de Relatório (JSON) definem cores, fontes, estilos padrão para todos os tipos de visual. O arquivo .json pode ser aplicado a qualquer relatório e distribuído pela organização."
    },
    {
      question: "Você precisa exibir o gráfico de tendência de vendas separadamente para cada categoria de produto, com o mesmo eixo Y para facilitar a comparação. Qual feature usar?",
      options: ["Criar um visual separado para cada categoria manualmente", "Pequenos Múltiplos (Small Multiples)", "Drill Down por Categoria", "Filtro de Visual em cada gráfico"],
      answer: 1,
      explanation: "Pequenos Múltiplos repetem o mesmo visual para cada valor de uma dimensão escolhida, com escala padronizada, facilitando a comparação visual entre grupos. Disponível em gráficos de barras, linhas, área e dispersão."
    },
    {
      question: "Você precisa mostrar como o lucro líquido foi formado, exibindo receitas (positivas) e deduções/impostos (negativos) até chegar ao valor final. Qual visual é mais adequado?",
      options: ["Gráfico de Barras Empilhadas", "Gráfico Cascata (Waterfall Chart)", "Gráfico de Área", "Gráfico de Rosca (Donut)"],
      answer: 1,
      explanation: "O Gráfico Cascata (Waterfall) é projetado para mostrar como um valor inicial é afetado por uma série de valores positivos e negativos ao longo de uma sequência, chegando ao valor final."
    },
    {
      question: "Qual é a diferença entre Modo Foco (Focus Mode) e Destaque (Spotlight) em um visual do Power BI?",
      options: ["Não há diferença, são sinônimos", "Modo Foco expande o visual para ocupar toda a tela de relatório; Spotlight ilumina o visual enquanto escurece os demais, mantendo o contexto da página", "Spotlight remove os outros visuais da página; Modo Foco os mantém", "Modo Foco é exclusivo para tabelas e matrizes"],
      answer: 1,
      explanation: "Modo Foco: o visual ocupa toda a tela (outros visuais ficam ocultos). Spotlight: o visual fica iluminado e os demais ficam escurecidos, mas todos permanecem visíveis na mesma página."
    },
    {
      question: "Você quer impedir que visuais de uma página se filtrem mutuamente quando o usuário clica neles. Como configurar isso para um visual específico?",
      options: ["Desabilitar 'Interações Visuais' no menu Formatar Visual", "Em 'Editar Interações', selecionar o ícone de 'sem filtro' para o visual desejado", "Usar RLS para bloquear o filtro cruzado", "Criar a página em modo de 'Leitura'"],
      answer: 1,
      explanation: "'Editar Interações' (Format → Edit Interactions) permite controlar como cada visual responde às seleções nos outros visuais, podendo definir: Filtro, Realce ou Nenhum para cada par de visuais."
    },
    {
      question: "Um relatório tem 10 páginas e você quer criar um índice/menu de navegação visual. Qual recurso usar para criar botões que levam o usuário a páginas específicas?",
      options: ["Criar links de texto em uma caixa de texto", "Usar Botões (Buttons) com a Ação configurada para 'Navegação de Página'", "Usar o painel de Bookmarks para navegar", "Adicionar o visual 'Navegador de Páginas' (Page Navigator)"],
      answer: 3,
      explanation: "O visual 'Navegador de Páginas' (inserido como botão ou visual) cria automaticamente botões de navegação para todas as páginas visíveis do relatório. Botões individuais com ação 'Navegação de Página' também funcionam para páginas específicas."
    },
    {
      question: "Qual é o comportamento padrão ao usar um Slicer (Segmentador de Dados) com o tipo 'Lista' no Power BI?",
      options: ["Permite selecionar apenas um item por vez (seleção única)", "Permite selecionar múltiplos itens usando Ctrl+Clique; a seleção única requer desabilitar 'Seleção Múltipla'", "Filtra automaticamente todos os outros slicers da página", "Cria um filtro de nível de relatório automaticamente"],
      answer: 1,
      explanation: "Por padrão, os Slicers do Power BI permitem múltipla seleção via Ctrl+Clique ou ativando o botão 'Selecionar tudo'. A seleção única pode ser forçada nas configurações do slicer."
    },
    {
      question: "Você precisa exibir informações detalhadas ao passar o mouse sobre um ponto de um gráfico de dispersão, mostrando mais de 3 campos. Qual é a melhor abordagem?",
      options: ["Adicionar mais colunas ao visual até o limite máximo de campos", "Criar uma Página de Tooltip de Relatório com múltiplos visuais e associá-la ao gráfico", "Usar o visual de Tabela ao lado do gráfico", "Habilitar a opção 'Detalhes Expandidos' nas configurações do visual"],
      answer: 1,
      explanation: "Páginas de Tooltip de Relatório permitem criar uma exibição rica e personalizada com múltiplos visuais que aparecem ao passar o mouse sobre qualquer ponto de dados, sem limitação de campos."
    },
    {
      question: "Qual visual é mais adequado para mostrar a distribuição de frequência de valores numéricos (ex.: distribuição de idades de clientes)?",
      options: ["Gráfico de Barras Clusterizado", "Histograma (criado com agrupamento no Gráfico de Colunas)", "Gráfico de Pizza", "Gráfico de Cascata"],
      answer: 1,
      explanation: "Histogramas mostram a distribuição de frequências de uma variável numérica contínua. No Power BI, são criados usando o Gráfico de Colunas com a coluna de dados agrupada em intervalos (bins)."
    },
    {
      question: "Você criou um relatório com dados de vendas e quer adicionar um 'Resumo Automático' em linguagem natural que descreve os insights principais. Qual visual usar?",
      options: ["Q&A Visual", "Narrativa Inteligente (Smart Narrative)", "Caixa de Texto com fórmulas DAX", "Visual de Cartão (Card)"],
      answer: 1,
      explanation: "O visual Narrativa Inteligente gera automaticamente um resumo em linguagem natural baseado nos dados do relatório, identificando tendências, outliers e comparações. O texto pode ser personalizado com valores dinâmicos."
    },
    {
      question: "Em um gráfico de linhas com hierarquia de datas (Ano > Trimestre > Mês > Dia), qual é a função de 'Drill Down'?",
      options: ["Filtra o gráfico para mostrar apenas os dados do período clicado", "Expande o nível atual da hierarquia para o próximo nível mais detalhado para o item clicado, mantendo o filtro contextual", "Navega para outra página com detalhes (drillthrough)", "Exibe uma tooltip com detalhes adicionais"],
      answer: 1,
      explanation: "Drill Down desce um nível na hierarquia mantendo o contexto do item clicado. Por exemplo: clicando em '2024' no gráfico anual, o gráfico passa a mostrar os trimestres de 2024. É diferente de Drill Through."
    },
    {
      question: "Qual é o propósito do painel 'Seleção' (Selection Pane) no Power BI Desktop?",
      options: ["Permite selecionar e filtrar dados de múltiplas fontes simultaneamente", "Gerencia a visibilidade, a ordem de empilhamento e os nomes de todos os visuais e objetos na página do relatório", "Configura as interações entre os visuais", "Lista todas as medidas DAX disponíveis"],
      answer: 1,
      explanation: "O Painel de Seleção (View → Selection) mostra todos os objetos da página, permitindo: renomeá-los (importante para bookmarks), ocultar/mostrar individualmente, e controlar a ordem de empilhamento (Z-order)."
    },
    {
      question: "Você quer que um gráfico de linhas exiba automaticamente uma linha de tendência estatística. Como adicionar isso no Power BI?",
      options: ["Criar uma medida de Regressão Linear no DAX", "Usar a opção 'Linha de Tendência' em Analytics (Análise) do painel de formatação do visual", "Usar o visual Python Script para plotar a tendência", "Adicionar uma coluna calculada com os valores previstos"],
      answer: 1,
      explanation: "O painel 'Análise' (Analytics) dos visuais de gráfico de linhas e dispersão oferece linhas automáticas de: Tendência, Média, Mediana, Percentil, Máximo, Mínimo, entre outras, sem necessidade de DAX."
    },
    {
      question: "Qual é a diferença entre um Dashboard e um Relatório no Power BI Service?",
      options: ["Dashboards têm mais páginas que relatórios", "Dashboards são telas únicas com tiles de múltiplos relatórios/datasets, sem filtros interativos; Relatórios têm múltiplas páginas com visuais interativos e filtros", "Dashboards são criados no Power BI Desktop; Relatórios no Service", "Relatórios suportam RLS; Dashboards não"],
      answer: 1,
      explanation: "Dashboards: tela única, tiles (recortes) de múltiplas fontes, alertas de dados, sem filtros por página. Relatórios: múltiplas páginas, visuais interativos com filtros, drillthrough, bookmarks — editáveis no Desktop."
    },
    {
      question: "Como configurar um visual para que ele seja excluído de todas as interações de outros visuais na página (nem filtrado, nem realçado)?",
      options: ["Bloquear o visual no painel de Seleção", "Em 'Editar Interações', definir o tipo de interação como 'Nenhum' para esse visual em relação a todos os outros", "Usar RLS para proteger o visual", "Mover o visual para outra página"],
      answer: 1,
      explanation: "'Editar Interações' permite definir para cada par de visuais se a seleção em um deve Filtrar, Realçar ou Não afetar o outro. Definindo 'Nenhum' (None) para todos os outros visuais em relação ao visual protegido."
    },
    {
      question: "Qual é a finalidade dos 'Grupos' (Grouping) e 'Compartimentos' (Binning) no Power BI Desktop?",
      options: ["Agrupar visuais no canvas para facilitar o layout", "Agrupar valores de colunas categóricas em grupos personalizados ou criar intervalos numéricos, simplificando a análise de dados granulares", "Compartimentar relatórios em workspaces separados", "Agrupar medidas em pastas de exibição"],
      answer: 1,
      explanation: "Grouping permite agrupar valores categóricos (ex.: 'SP', 'RJ' → 'Sudeste'). Binning divide valores numéricos ou datas em intervalos (ex.: idades em grupos 0-18, 18-30, 30-50), criando novas categorias para análise."
    },
    {
      question: "Você quer adicionar uma imagem de logotipo corporativo que seja clicável e navegue para o site da empresa. Como fazer isso no Power BI Desktop?",
      options: ["Inserir uma imagem comum e adicionar uma URL no campo 'Página de Destino'", "Adicionar um botão com uma imagem como fundo e configurar a Ação para 'URL da Web'", "Usar uma caixa de texto com link hiperlink", "Não é possível adicionar links externos no Power BI Desktop"],
      answer: 1,
      explanation: "Botões no Power BI Desktop suportam ações como: Bookmark, Navegação de Página, Q&A, Drillthrough e URL da Web. Usando uma imagem como fundo do botão e configurando a ação como 'URL da Web', cria-se um logo clicável."
    },
    {
      question: "Qual visual do Power BI é mais indicado para mostrar a correlação entre duas variáveis numéricas?",
      options: ["Gráfico de Linhas", "Gráfico de Dispersão (Scatter Chart)", "Gráfico de Barras Clusterizado", "Treemap"],
      answer: 1,
      explanation: "O Gráfico de Dispersão posiciona pontos em um eixo X e Y numérico, mostrando visualmente a correlação (positiva, negativa ou ausente) entre duas variáveis. Pode incluir uma terceira dimensão pelo tamanho das bolhas."
    },
    {
      question: "Como um desenvolvedor pode testar como um relatório será exibido para diferentes perfis de RLS sem precisar compartilhar com cada usuário?",
      options: ["Publicar no Service e logar com credenciais de cada usuário", "Usar 'Exibir Como' (View As) com o papel RLS desejado diretamente no Power BI Desktop ou Service", "Criar relatórios separados para cada perfil", "Usar o modo de Depuração do Power BI Desktop"],
      answer: 1,
      explanation: "'Exibir Como' (View As Role) permite que administradores e criadores de relatório visualizem o conteúdo como se fossem um usuário pertencente a um papel RLS específico, sem precisar das credenciais desse usuário."
    },
    {
      question: "Qual é o propósito do visual 'Medidor' (Gauge) no Power BI e quando é mais adequado usá-lo?",
      options: ["Para mostrar a distribuição de valores em uma escala", "Para mostrar o progresso de um único valor em relação a um mínimo, máximo e meta, como um velocímetro", "Para comparar múltiplas métricas simultaneamente", "Para exibir tendências ao longo do tempo"],
      answer: 1,
      explanation: "O visual Medidor é ideal para exibir um único KPI em relação a um valor meta, como '% de atingimento de meta de vendas'. Por mostrar apenas um valor, deve ser usado com parcimônia — prefira KPIs ou cartões para múltiplas métricas."
    }
  ],

  /* ==================== DOMÍNIO 4 ==================== */
  "Implementar e Manter": [
    {
      question: "A empresa quer um processo formal para promover relatórios por ambientes: Desenvolvimento → Teste → Produção no Power BI Service, com controle de versão e comparação de conteúdo. Qual feature implementa isso?",
      options: ["Power BI Embedded com controle de versão Git", "Pipelines de Implantação (Deployment Pipelines)", "Workspaces Clássicos com permissões diferenciadas", "Power BI Report Server"],
      answer: 1,
      explanation: "Deployment Pipelines (Power BI Premium) permitem criar ambientes separados de Dev/Test/Prod com um clique para promover conteúdo entre estágios, comparar diferenças e definir regras de dados por ambiente."
    },
    {
      question: "Um analista publicou um relatório conectado a um arquivo Excel no próprio computador pessoal. Qual tipo de gateway permite atualização agendada nesse cenário?",
      options: ["Data Gateway (modo Padrão/Corporativo)", "Gateway Pessoal (Personal Mode)", "Gateway VPN", "Não é necessário gateway para arquivos locais"],
      answer: 1,
      explanation: "O Gateway Pessoal é instalado no computador do usuário e permite que o Power BI Service acesse arquivos locais daquela máquina. Não suporta múltiplos usuários — é para uso individual."
    },
    {
      question: "Com uma licença Power BI Pro (sem Premium), quantas atualizações agendadas diárias são permitidas por dataset?",
      options: ["Ilimitadas", "8 por dia", "24 por dia", "48 por dia"],
      answer: 1,
      explanation: "Com licença Pro sem Premium, o limite é 8 atualizações agendadas por dia por dataset. Com Power BI Premium, o limite sobe para 48 atualizações por dia."
    },
    {
      question: "Você precisa distribuir um pacote de relatórios para 300 usuários que devem ver apenas a versão publicada (sem editar). Qual é a abordagem MAIS adequada?",
      options: ["Compartilhar cada relatório individualmente via link para cada usuário", "Publicar um Power BI App a partir de um Workspace e conceder acesso ao App", "Exportar para PDF e distribuir por email", "Habilitar 'Publicar na Web' (Publish to Web) para acesso público"],
      answer: 1,
      explanation: "Power BI Apps empacotam relatórios e dashboards de um workspace para consumo controlado. Os usuários veem apenas a versão publicada e não têm acesso direto ao workspace de edição."
    },
    {
      question: "Qual é a diferença entre o papel de 'Colaborador' (Contributor) e 'Membro' (Member) em um Workspace do Power BI Service?",
      options: ["Não há diferença prática entre os dois papéis", "Colaborador pode publicar e editar conteúdo no workspace, mas não pode gerenciar permissões de acesso; Membro pode gerenciar permissões e convidar outros colaboradores", "Membro pode criar workspaces; Colaborador não", "Colaborador tem acesso apenas de leitura; Membro tem acesso de edição"],
      answer: 1,
      explanation: "Colaborador: publica, edita e exclui conteúdo. Membro: tudo do Colaborador + gerencia membros do nível Colaborador para baixo e pode publicar Apps. Administrador: controle total, incluindo excluir o workspace."
    },
    {
      question: "Você implementou RLS estático com uma regra [Região] = 'Sul'. Ao testar no Power BI Service como Administrador do workspace, os dados não aparecem filtrados. Por quê?",
      options: ["Administradores são isentos de RLS no Power BI Service", "O RLS não foi publicado corretamente", "Administradores precisam aceitar o RLS manualmente", "O RLS só funciona em modo DirectQuery"],
      answer: 0,
      explanation: "Administradores do workspace e do dataset são isentos de RLS automaticamente — eles sempre veem todos os dados. Para testar o RLS, use 'Exibir como função' (View as Role) nas configurações do dataset."
    },
    {
      question: "No Power BI Service, qual é a diferença entre um dataset 'Promovido' (Promoted) e 'Certificado' (Certified)?",
      options: ["Não há diferença; são termos sinônimos", "Promovido é marcado pelo próprio proprietário do dataset; Certificado requer aprovação formal por administradores ou pessoa designada da organização", "Certificado é exclusivo para Power BI Premium; Promovido é para Pro", "Promovido requer RLS; Certificado não exige"],
      answer: 1,
      explanation: "Endosso tem dois níveis: Promoted (proprietário do dataset marca como confiável) e Certified (administrador ou designado valida o dataset como autoritativo). Certified tem mais credibilidade e restrições de quem pode conceder."
    },
    {
      question: "A organização precisa classificar relatórios com dados pessoais (LGPD) para que os usuários sejam alertados ao exportar para Excel. Qual recurso do Power BI Service implementa isso?",
      options: ["RLS em nível de coluna", "Rótulos de Sensibilidade (Sensitivity Labels) integrados ao Microsoft Purview", "Endosso de Dataset", "Workspaces com acesso restrito"],
      answer: 1,
      explanation: "Rótulos de Sensibilidade (integrados ao Microsoft Purview/MIP) classificam e protegem conteúdo do Power BI. Quando um usuário exporta conteúdo com rótulo 'Confidencial', o Excel/PDF recebe o mesmo rótulo automaticamente."
    },
    {
      question: "Quais são as principais vantagens de usar Dataflows (Fluxos de Dados) no Power BI Service?",
      options: ["São mais rápidos que o Power Query Desktop e não precisam de Gateway", "Permitem reutilizar lógica de transformação entre múltiplos datasets, suportam tabelas computadas e podem ser usados por diferentes equipes", "Substituem completamente o modelo de dados (dataset)", "São exclusivos do Power BI Premium"],
      answer: 1,
      explanation: "Dataflows centralizam transformações no Power BI Service, permitindo: reutilização entre datasets, colaboração entre equipes, tabelas computadas (Premium), integração com Azure Data Lake, e redução de duplicação de lógica ETL."
    },
    {
      question: "Um sistema de RH precisa de um relatório com layout de formulário preciso, exportação perfeita para PDF com quebras de página controladas e suporte a sub-relatórios. Qual tipo usar?",
      options: ["Relatório Power BI padrão com muitas páginas", "Relatório Paginado (Paginated Report / SSRS)", "Dashboard do Power BI Service", "Relatório publicado via 'Publicar na Web'"],
      answer: 1,
      explanation: "Relatórios Paginados (criados no Power BI Report Builder, baseados no SSRS) são projetados para: impressão/PDF perfeito, controle de quebra de página, formulários, faturas, e dados que se estendem por centenas de páginas."
    },
    {
      question: "Qual é o principal caso de uso do Endpoint XMLA (XML for Analysis) no Power BI Premium?",
      options: ["Publicar relatórios do Power BI Desktop sem o botão Publicar", "Permitir conexões de ferramentas externas (Tabular Editor, SSMS, DAX Studio) ao dataset para administração, desenvolvimento e consulta avançada do modelo tabular", "Habilitar a exportação de dados para XML", "Conectar o Power BI a fontes OLAP externas"],
      answer: 1,
      explanation: "O Endpoint XMLA expõe os datasets do Power BI Premium como modelos tabulares SSAS, permitindo que ferramentas como Tabular Editor, DAX Studio e SSMS se conectem para administração avançada, scripting, e análise de performance."
    },
    {
      question: "Qual é o risco principal de usar a opção 'Publicar na Web' (Publish to Web) para compartilhar um relatório?",
      options: ["O relatório pode ser editado por qualquer pessoa que tenha o link", "O relatório fica publicamente acessível na internet sem qualquer autenticação, expondo todos os dados visíveis para qualquer pessoa", "O RLS passa a ser ignorado apenas para usuários internos", "O relatório fica disponível apenas por 30 dias"],
      answer: 1,
      explanation: "'Publicar na Web' gera um link e código de incorporação público, sem autenticação. Qualquer pessoa com o link (ou que encontre o iframe) vê todos os dados do relatório. Nunca use para dados sensíveis ou confidenciais."
    },
    {
      question: "Uma organização tem usuários sem licença Power BI Pro. Em qual cenário esses usuários podem acessar relatórios publicados no Power BI Service?",
      options: ["Nunca — a licença Pro é sempre obrigatória para consumo", "Quando o workspace está em uma Capacidade Power BI Premium ou Premium Per User (PPU)", "Quando o relatório é compartilhado via link público", "Quando o administrador desabilita a verificação de licença"],
      answer: 1,
      explanation: "Em capacidades Premium, os usuários sem licença Pro podem consumir (apenas ler) relatórios publicados no workspace Premium. Para editar, a licença Pro ainda é necessária. PPU requer licença PPU individual."
    },
    {
      question: "No Power BI Service, em qual tipo de visual é possível configurar Alertas de Dados (Data Alerts) para notificação por email?",
      options: ["Gráficos de Barras e Linhas em Relatórios", "Tiles de Cartão (Card), KPI e Medidores (Gauge) em Dashboards", "Tabelas e Matrizes em Relatórios", "Qualquer visual em qualquer dashboard"],
      answer: 1,
      explanation: "Alertas de Dados funcionam apenas em tiles de dashboards do tipo: Cartão (Card), KPI e Medidor (Gauge). Não funcionam em gráficos nem em relatórios — apenas em dashboards, e apenas nos tipos mencionados."
    },
    {
      question: "Qual é a função de um 'Gateway de Dados' (Data Gateway) no modo Padrão/Corporativo?",
      options: ["Criptografar dados do Power BI armazenados no Service", "Criar uma ponte segura entre o Power BI Service e fontes de dados locais ou em redes privadas, permitindo atualização agendada sem expor as fontes à internet", "Gerenciar licenças de usuários no Power BI Service", "Servir como proxy para acessar o Azure de dentro da empresa"],
      answer: 1,
      explanation: "O Data Gateway (modo Padrão) é instalado na rede corporativa e permite que o Power BI Service acesse dados locais de forma segura. Suporta múltiplas fontes, múltiplos usuários e é gerenciado centralmente."
    },
    {
      question: "Como um Administrador do Power BI pode monitorar quais relatórios são mais acessados e por quais usuários na organização?",
      options: ["Através do Analisador de Performance no Power BI Desktop", "Usando o Log de Atividades (Activity Log) ou a API Admin e o relatório de Métricas de Uso do workspace", "Verificando o histórico de atualizações no Gateway", "Consultando diretamente os logs do Azure Active Directory"],
      answer: 1,
      explanation: "O Log de Atividades (disponível via API Admin ou exportação) registra todas as atividades no tenant. As Métricas de Uso (Usage Metrics) de cada workspace mostram visualizações, usuários ativos e relatórios mais acessados."
    },
    {
      question: "Qual é a diferença entre 'Compartilhar Relatório' diretamente e publicar um 'Power BI App'?",
      options: ["Não há diferença, são abordagens equivalentes", "Compartilhar dá acesso direto ao relatório individual com possível acesso ao workspace; App empacota múltiplos relatórios para consumo controlado sem expor o workspace", "Apps são mais rápidos de criar que o compartilhamento direto", "Compartilhamento suporta RLS; Apps não"],
      answer: 1,
      explanation: "Compartilhamento direto pode expor o workspace ao usuário. Apps isolam o consumidor do workspace, permitem personalizar a navegação, incluir múltiplos relatórios/dashboards, e atualizações do workspace não afetam o App até nova publicação."
    },
    {
      question: "Você precisa que usuários externos (fora do tenant Azure AD da empresa) acessem um relatório do Power BI Service. Qual é o mecanismo mais seguro?",
      options: ["Publicar na Web (Publish to Web)", "Compartilhar via Azure AD B2B (convidar como usuário convidado)", "Exportar para PDF e compartilhar por email", "Criar uma cópia do relatório em uma conta pública"],
      answer: 1,
      explanation: "Azure AD B2B permite convidar usuários externos como 'Guest Users' no tenant, mantendo o controle de autenticação e autorização (incluindo RLS). É a forma mais segura de compartilhar com externos."
    },
    {
      question: "Qual é o comportamento de um Pipeline de Implantação (Deployment Pipeline) ao comparar estágios Dev e Teste?",
      options: ["Exibe apenas uma lista de relatórios diferentes entre os estágios", "Mostra quais itens existem apenas em um estágio, quais são idênticos e quais são diferentes, permitindo implantar seletivamente", "Sincroniza automaticamente todos os itens sem necessidade de revisão", "Compara apenas as medidas DAX, ignorando layouts"],
      answer: 1,
      explanation: "O comparador de estágios do Deployment Pipeline mostra o status de cada item: novo (existe apenas em um estágio), idêntico (mesmo conteúdo) ou diferente (modificado). O administrador escolhe o que implantar."
    },
    {
      question: "Uma empresa quer que o departamento de TI gerencie centralmente os datasets (modelos de dados) enquanto os analistas criam seus próprios relatórios conectados a esses datasets. Como isso é habilitado?",
      options: ["Usando o modo DirectQuery em todos os relatórios", "Habilitando 'Conjuntos de Dados Compartilhados' (Shared Datasets / Live Connection) — analistas conectam relatórios novos a datasets publicados no Service", "Exportando os dados para Excel e compartilhando com os analistas", "Usando Power BI Embedded para cada analista"],
      answer: 1,
      explanation: "Live Connection para datasets do Service (Shared Datasets) permite que analistas criem relatórios conectados a datasets gerenciados centralmente, sem precisar recriar o modelo. Uma única fonte de verdade para todos os relatórios."
    },
    {
      question: "O que é 'Row-Level Security Dinâmica' (Dynamic RLS) e qual é a principal diferença para o RLS Estático?",
      options: ["RLS Dinâmico usa filtros que mudam com o horário do dia; Estático usa filtros fixos", "RLS Dinâmico usa funções DAX como USERPRINCIPALNAME() para filtrar dados baseado no usuário logado; Estático usa valores fixos na regra que exigem manutenção manual quando usuários mudam", "RLS Dinâmico é mais rápido que o Estático", "RLS Estático suporta tabelas maiores que o Dinâmico"],
      answer: 1,
      explanation: "RLS Estático: regras com valores fixos (ex: [Região] = 'Sul') — requer atualização manual quando papéis mudam. RLS Dinâmico: usa USERPRINCIPALNAME() para comparar com uma tabela de mapeamento usuário-permissão, escalando automaticamente."
    },
    {
      question: "Qual é o papel do 'Administrador de Capacidade' (Capacity Administrator) no Power BI Premium?",
      options: ["Gerenciar licenças Pro de todos os usuários do tenant", "Controlar recursos da capacidade Premium: atribuir workspaces, configurar limites de memória, monitorar uso e gerenciar cargas de trabalho (Paginated Reports, AI, Dataflows)", "Publicar relatórios em todos os workspaces do tenant", "Gerenciar as credenciais de todos os gateways"],
      answer: 1,
      explanation: "O Administrador de Capacidade gerencia a infraestrutura de uma capacidade Premium específica: quais workspaces estão nessa capacidade, configurações de performance, cargas de trabalho habilitadas e monitoramento via app de métricas."
    },
    {
      question: "Ao configurar 'Atualização Incremental' em um dataset, quais dois parâmetros do Power Query são obrigatórios?",
      options: ["StartDate e EndDate (ou RangeStart e RangeEnd)", "MinDate e MaxDate", "DateFrom e DateTo", "PeriodStart e PeriodEnd"],
      answer: 0,
      explanation: "A Atualização Incremental requer os parâmetros do Power Query chamados exatamente 'RangeStart' e 'RangeEnd' do tipo DateTime. O Power BI os usa para definir as partições e filtrar quais dados recarregar."
    },
    {
      question: "Qual é a diferença entre 'Dataset' e 'Dataflow' no Power BI Service?",
      options: ["São termos diferentes para a mesma coisa", "Dataflow: camada de preparação/transformação de dados (ETL) que produz tabelas reutilizáveis; Dataset: modelo de dados com relacionamentos, medidas DAX e RLS, usado diretamente pelos relatórios", "Dataset contém os dados brutos; Dataflow contém as medidas DAX", "Dataflows são exclusivos do Power BI Premium; Datasets estão disponíveis no Pro"],
      answer: 1,
      explanation: "Dataflows são a camada ETL no Service (equivalente ao Power Query), produzindo tabelas de dados que podem ser consumidas por múltiplos datasets. Datasets são modelos analíticos com relacionamentos, DAX e RLS usados pelos relatórios."
    },
    {
      question: "Um desenvolvedor precisa editar um dataset publicado no Power BI Service (adicionar medidas, alterar relacionamentos) sem usar o Power BI Desktop. Qual ferramenta permite isso via Endpoint XMLA?",
      options: ["Power BI Report Builder", "Tabular Editor (ferramenta de terceiros)", "DAX Studio apenas para consultas, não edição", "Power BI Premium apenas via interface web"],
      answer: 1,
      explanation: "O Tabular Editor (versão 2 gratuita ou versão 3 paga) conecta ao Endpoint XMLA do Power BI Premium e permite editar o modelo tabular diretamente no Service: adicionar medidas, tabelas, colunas calculadas, grupos de cálculo, etc."
    },
    {
      question: "Como funciona o recurso 'Assinaturas de Email' (Email Subscriptions) no Power BI Service?",
      options: ["Enviam alertas apenas quando um valor ultrapassa um limite", "Permitem que usuários ou administradores agendem o envio automático de capturas de relatórios ou dashboards por email em horários definidos", "Substituem a necessidade de atualização agendada do dataset", "Funcionam apenas com relatórios paginados"],
      answer: 1,
      explanation: "Assinaturas de Email enviam uma captura (snapshot) do relatório ou dashboard por email no horário configurado. Podem incluir um link para o relatório ao vivo e suportam filtros para personalizar o conteúdo enviado."
    },
    {
      question: "Qual é o impacto de mover um workspace para uma Capacidade Power BI Premium?",
      options: ["Todos os usuários do workspace ganham licença Pro automaticamente", "O conteúdo do workspace pode ser acessado por usuários sem licença Pro, suporte a Relatórios Paginados, Dataflows com tabelas computadas, atualizações mais frequentes e recursos de IA", "O workspace passa a ser público automaticamente", "Os dados ficam armazenados no servidor local da empresa"],
      answer: 1,
      explanation: "Premium habilita no workspace: acesso para usuários sem Pro (apenas leitura), Deployment Pipelines, Relatórios Paginados, Dataflows com tabelas computadas e IA, XMLA Endpoint, até 48 atualizações/dia e maior capacidade de memória."
    },
    {
      question: "Qual recurso permite automatizar ações no Power BI Service com base em eventos, como enviar um Teams message quando um dataset falha na atualização?",
      options: ["Power BI Admin Portal → Automation", "Power Automate integrado com conectores do Power BI", "Power BI REST API diretamente via script", "Alertas de Dados (Data Alerts)"],
      answer: 1,
      explanation: "O Power Automate tem conectores nativos para o Power BI que permitem criar fluxos automatizados acionados por eventos como: falha de atualização, refresh concluído, alerta de dado disparado, etc."
    },
    {
      question: "O que é 'Lineage View' (Exibição de Linhagem) no Power BI Service e para que serve?",
      options: ["Exibe o histórico de alterações em um relatório", "Mostra graficamente as dependências entre fontes de dados, dataflows, datasets e relatórios, facilitando o impacto de análise de mudanças", "Lista todos os usuários que acessaram um relatório", "Mostra o fluxo de dados entre tabelas dentro de um dataset"],
      answer: 1,
      explanation: "A Lineage View (disponível em workspaces) exibe um diagrama mostrando como os dados fluem de fontes → dataflows → datasets → relatórios → dashboards, ajudando a entender o impacto de mudanças em qualquer ponto da cadeia."
    },
    {
      question: "Em qual situação o uso do 'Power BI Report Server' (servidor local) é mais adequado em relação ao Power BI Service (nuvem)?",
      options: ["Quando a empresa quer relatórios mais bonitos", "Quando regulamentações ou políticas de segurança impedem que os dados saiam da rede interna da organização, exigindo hospedagem on-premises", "Quando a empresa tem mais de 1.000 usuários", "Quando os relatórios precisam de atualização em tempo real"],
      answer: 1,
      explanation: "O Power BI Report Server é a versão on-premises para organizações com requisitos regulatórios ou de segurança que impedem o uso de serviços em nuvem. Tem menos recursos que o Power BI Service mas mantém os dados localmente."
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
  startTime: null
};

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

// ============================================================
//  START QUIZ
// ============================================================
function startQuiz() {
  if (state.mode === 'treino' && state.selectedDomains.length === 0) {
    alert('Selecione pelo menos um domínio para continuar.');
    return;
  }

  showScreen('screen-loading');

  setTimeout(() => {
    // Build question pool
    let pool = [];
    state.selectedDomains.forEach(domain => {
      (questionBank[domain] || []).forEach(q => {
        pool.push({ ...q, domain });
      });
    });

    // Shuffle questions
    state.questions = shuffle(pool);
    state.currentIndex = 0;
    state.score = 0;
    state.answers = new Array(state.questions.length).fill(null);
    state.marked = new Set();
    state.startTime = Date.now();

    // Timer (official mode only)
    clearInterval(state.timerInterval);
    if (state.mode === 'oficial') {
      state.timeRemaining = 110 * 60;
      startTimer();
    }

    buildNavGrid();
    loadQuestion(0);
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
    }
  }, 1000);
}

// ============================================================
//  LOAD QUESTION
// ============================================================
function loadQuestion(index) {
  state.currentIndex = index;
  const q = state.questions[index];
  const total = state.questions.length;
  const answered = state.answers[index];

  // Update topbar
  document.getElementById('q-current').textContent = index + 1;
  document.getElementById('q-total').textContent = total;
  document.getElementById('q-domain-badge').textContent = q.domain;
  document.getElementById('q-badge').textContent = `Questão ${index + 1}`;
  document.getElementById('progress-fill').style.width = `${((index + 1) / total) * 100}%`;

  // Mark button
  const markBtn = document.getElementById('btn-mark');
  markBtn.className = 'btn-mark' + (state.marked.has(index) ? ' marked' : '');

  // Multi-hint
  const hintContainer = document.getElementById('multi-hint-container');
  const isMulti = Array.isArray(q.answer);
  hintContainer.innerHTML = isMulti
    ? '<span class="multi-hint">⚠️ Selecione todas as opções corretas</span>'
    : '';

  // Question text
  document.getElementById('question-text').textContent = q.question;

  // Options
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option-item';
    div.dataset.index = i;
    div.onclick = () => toggleOption(div, isMulti);

    // Restore selection if answered
    if (answered) {
      div.classList.add('disabled');
      if (answered.selected.includes(i)) {
        const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
        div.classList.add(correctAnswers.includes(i) ? 'correct' : 'incorrect');
      } else {
        const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
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
  nextBtn.textContent = index === total - 1 ? 'Ver Resultado →' : 'Próxima →';

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
    alert('Selecione pelo menos uma opção antes de confirmar.');
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

  updateNavGrid();
}

function showFeedback(q, isCorrect) {
  const box = document.getElementById('feedback-box');
  const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
  const correctTexts = correctAnswers.map(i => q.options[i]).join(', ');
  box.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
  box.innerHTML = isCorrect
    ? `✅ <strong>Correto!</strong> ${q.explanation}`
    : `❌ <strong>Incorreto.</strong> Resposta correta: <em>${correctTexts}</em><br><br>${q.explanation}`;
}

// ============================================================
//  NAVIGATION
// ============================================================
function nextQuestion() {
  const next = state.currentIndex + 1;
  if (next < state.questions.length) {
    loadQuestion(next);
    window.scrollTo(0, 0);
  } else {
    if (!allAnswered() && state.mode === 'treino') {
      const unanswered = state.questions.length - state.answers.filter(a => a !== null).length;
      if (!confirm(`Você ainda tem ${unanswered} questão(ões) sem resposta. Deseja ver o resultado mesmo assim?`)) return;
    }
    clearInterval(state.timerInterval);
    showResults();
  }
}

function goToQuestion(index) {
  if (index < 0 || index >= state.questions.length) return;
  loadQuestion(index);
  window.scrollTo(0, 0);
}

function allAnswered() {
  return state.answers.every(a => a !== null);
}

// ============================================================
//  MARK FOR REVIEW
// ============================================================
function toggleMark() {
  const i = state.currentIndex;
  if (state.marked.has(i)) {
    state.marked.delete(i);
  } else {
    state.marked.add(i);
  }
  const btn = document.getElementById('btn-mark');
  btn.className = 'btn-mark' + (state.marked.has(i) ? ' marked' : '');
  updateNavGrid();
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
}

// ============================================================
//  RESULTS
// ============================================================
function showResults() {
  clearInterval(state.timerInterval);

  const answered = state.answers.filter(a => a !== null);
  const correct = answered.filter(a => a.correct).length;
  const total = state.questions.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const approved = pct >= 70;

  // Save to history
  const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
  saveHistory({
    date: new Date().toLocaleString('pt-BR'),
    mode: state.mode === 'oficial' ? 'Simulado Oficial' : 'Modo Treino',
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
    state.mode === 'oficial' ? 'Resultado do Simulado Oficial' : 'Resultado do Modo Treino';

  const badge = document.getElementById('result-badge');
  badge.textContent = approved ? '🏆 APROVADO — ≥ 70%' : '📚 Não Atingiu — < 70%';
  badge.className = `result-badge ${approved ? 'approved' : 'failed'}`;

  document.getElementById('results-detail').textContent =
    `${correct} de ${total} questões corretas (${answered.length} respondidas)`;
  document.getElementById('results-time').textContent =
    `Tempo: ${formatTime(elapsed)}`;

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

    const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
    const correctTexts = correctAnswers.map(ci => q.options[ci]).join(', ');
    const selectedTexts = ans.selected.map(si => q.options[si]).join(', ') || '(sem resposta)';

    const item = document.createElement('div');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="review-item-header">
        <div class="review-status-dot ${ans.correct ? 'correct' : 'incorrect'}"></div>
        <span class="review-q-num">Q${i + 1}</span>
        <span class="review-q-domain">${q.domain}</span>
      </div>
      <p class="review-q-text">${q.question}</p>
      <div class="review-details" id="review-detail-${i}">
        <div class="review-answer">
          <span class="review-answer-label">Sua resposta:</span>
          <span class="review-answer-val ${ans.correct ? 'correct-answer' : 'wrong-answer'}">${selectedTexts}</span>
        </div>
        ${!ans.correct ? `
        <div class="review-answer">
          <span class="review-answer-label">Correta:</span>
          <span class="review-answer-val correct-answer">${correctTexts}</span>
        </div>` : ''}
        <div class="review-explanation">${q.explanation}</div>
      </div>
    `;
    item.addEventListener('click', () => {
      const detail = document.getElementById(`review-detail-${i}`);
      detail.classList.toggle('open');
    });
    list.appendChild(item);
  });

  if (list.innerHTML === '') {
    list.innerHTML = '<p class="text-muted" style="text-align:center;padding:32px 0">Nenhuma questão encontrada neste filtro.</p>';
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
    list.innerHTML = '<div class="no-history">📭 Nenhum simulado realizado ainda.</div>';
    return;
  }

  list.innerHTML = history.map((h, idx) => `
    <div class="history-item" style="animation-delay:${idx * 0.05}s">
      <div class="history-score">${h.pct}%</div>
      <div class="history-info">
        <div class="h-mode">${h.mode}</div>
        <div class="h-detail">${h.correct} de ${h.total} questões corretas · ${formatTime(h.elapsed || 0)}</div>
        <div class="h-date">${h.date}</div>
      </div>
      <div class="history-badge ${h.approved ? 'approved' : 'failed'}">
        ${h.approved ? '✅ Aprovado' : '❌ Reprovado'}
      </div>
    </div>
  `).join('');
}

function clearHistory() {
  if (confirm('Tem certeza que deseja apagar todo o histórico?')) {
    localStorage.removeItem('pl300_history');
    renderHistory();
  }
}
