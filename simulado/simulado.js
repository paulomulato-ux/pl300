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
    },
    {
      question: "Você se conecta a uma API REST usando Web.Contents. Durante a atualização agendada no Power BI Service, você recebe um erro de que as credenciais do recurso não podem ser validadas dinamicamente. Qual parâmetro da função M resolve este problema de segurança?",
      options: ["Headers","RelativePath","Query","Timeout"],
      answer: 1,
      explanation: "No Power BI Service, URLs dinâmicas falham na atualização porque o serviço não consegue analisar a URL base estática para autenticação. O uso de 'RelativePath' mantém a URL base estática no Web.Contents, permitindo a validação correta das credenciais enquanto acrescenta caminhos dinâmicos."
    },
    {
      question: "Você está combinando dados de um banco SQL Server (DirectQuery) e de uma planilha Excel (Import) em um modelo composto. Para otimizar o desempenho de relacionamentos entre tabelas de dimensão pequenas do SQL e tabelas de fato do Excel, qual modo de armazenamento deve ser atribuído às tabelas de dimensão?",
      options: ["DirectQuery","Import","Duplo (Dual)","Híbrido"],
      answer: 2,
      explanation: "O modo Duplo (Dual) permite que a tabela atue tanto em cache (Import) quanto via consulta direta (DirectQuery) dependendo do contexto. Ao relacionar com fatos locais (Import), ela age como Import evitando cross-source queries lentas. Ao relacionar com fatos DirectQuery, ela age como DirectQuery preservando performance."
    },
    {
      question: "Você está escrevendo uma etapa de transformação complexa no Power Query em M que ocasionalmente gera erros de divisão por zero ou nulos. Qual estrutura em M permite testar uma expressão e retornar um valor padrão caso ocorra uma falha?",
      options: ["if ... then ... else","try ... otherwise","error ... rescue","catch"],
      answer: 1,
      explanation: "A expressão 'try ... otherwise' na linguagem M avalia o primeiro bloco e, se ele falhar ou retornar erro, executa e retorna o valor fornecido no bloco 'otherwise', agindo como tratamento de exceções robusto."
    },
    {
      question: "No Power Query Editor, a mensagem 'Perfil de coluna baseado nas primeiras 1000 linhas' é exibida na barra de status. O seu conjunto de dados possui 1 milhão de linhas. Qual o impacto prático dessa configuração padrão?",
      options: ["Os dados acima de 1000 linhas não serão importados pelo modelo final","As estatísticas de qualidade, distribuição e perfil dos dados podem ser imprecisas para o conjunto completo","O Power Query executará de forma mais lenta porque força a leitura por lotes","Nenhum, pois a amostragem de 1000 linhas é estatisticamente idêntica para qualquer volume"],
      answer: 1,
      explanation: "Por padrão, o Perfil de Dados do Power Query analisa apenas as primeiras 1000 linhas para garantir velocidade de preview. Se o arquivo contiver anomalias ou erros após a linha 1000, eles não serão exibidos no Perfil até que o usuário clique na mensagem e ative 'Perfil de coluna baseado no conjunto de dados completo'."
    },
    {
      question: "Você precisa extrair dados de uma instância corporativa do Microsoft Dataverse de forma rápida e com suporte a consultas nativas eficientes. Qual conector ou recurso oferece melhor desempenho técnico?",
      options: ["Conector Dataverse Padrão com modo Import","Ponto de extremidade TDS (Tabular Data Stream) ativo na organização","Conector Web lendo endpoints de OData","Exportar para arquivos CSV no OneDrive e lê-los"],
      answer: 1,
      explanation: "O ponto de extremidade TDS (Tabular Data Stream) permite que aplicativos externos se conectem ao Dataverse exatamente da mesma forma que fariam com um banco de dados SQL Server, otimizando o fluxo e permitindo que o Power BI envie consultas SQL nativas e aproveite o Query Folding."
    },
    {
      question: "Ao conectar a uma base de dados SQL Server corporativa, um analista cola uma consulta SQL personalizada complexa no campo 'Instrução SQL' das Opções Avançadas do conector. Qual é o impacto direto no Query Folding?",
      options: ["Habilita o Query Folding em todas as etapas subsequentes criadas na interface do Power Query","Desabilita permanentemente o Query Folding para quaisquer etapas de transformação subsequentes aplicadas a essa query","Nenhum impacto, desde que a query SQL não possua cláusulas ORDER BY","A query é automaticamente forçada a rodar apenas no modo DirectQuery"],
      answer: 1,
      explanation: "Ao inserir uma consulta SQL nativa no conector, você assume o controle da extração. O Power Query não consegue analisar o SQL bruto complexo para fundir (fold) transformações de etapas posteriores (como filtros adicionais) na fonte. Toda transformação subsequente será feita em memória local."
    },
    {
      question: "Você importa um arquivo de log estruturado em formato JSON que contém uma matriz (list) de registros de auditoria. Qual fluxo básico de etapas do Power Query é necessário para expor esses registros em uma tabela colunar limpa?",
      options: ["Mesclar Colunas → Dividir Coluna por delimitador","Converter para Tabela → Expandir as colunas e extrair valores","Despivotar Colunas → Transpor linhas","Agrupar por ID de auditoria → Criar coluna de índice"],
      answer: 1,
      explanation: "Arquivos JSON que contêm listas aninhadas são lidos como objetos 'List' ou 'Record'. O fluxo correto é converter a lista de registros em uma Tabela do Power Query e, em seguida, clicar no ícone de expansão (setas duplas) no cabeçalho da coluna para expor os campos individuais em novas colunas."
    },
    {
      question: "Você está modelando uma conexão em DirectQuery com SQL Server. Para otimizar a performance dos relacionamentos e forçar o banco a realizar INNER JOINs mais rápidos em vez de OUTER JOINs lentos, qual propriedade de relacionamento deve ser configurada?",
      options: ["Direção do filtro cruzado: Ambos (Both)","Assumir Integridade Referencial (Assume Referential Integrity)","Ativar filtro de segurança em ambas as direções","Marcar como relacionamento inativo"],
      answer: 1,
      explanation: "Ao marcar 'Assumir Integridade Referencial', você garante ao Power BI que os valores de chave estrangeira na tabela de fatos sempre possuem um correspondente exato na tabela de dimensões. Isso permite que o motor gere consultas usando INNER JOIN, que é significativamente mais rápido que LEFT OUTER JOIN."
    },
    {
      question: "Ao utilizar o recurso 'Mesclar Consultas' com correspondência difusa (Fuzzy Merge), qual parâmetro do Power Query define o quão parecidos dois termos textuais devem ser para que ocorra o cruzamento de linhas?",
      options: ["Tabela de transformação (Transformation Table)","Limiar de Similaridade (Similarity Threshold)","Ignorar maiúsculas e minúsculas","Combinar por partes de palavras"],
      answer: 1,
      explanation: "O 'Limiar de Similaridade' (Similarity Threshold) aceita valores de 0,00 a 1,00. O valor padrão de 0,80 significa que termos com pelo menos 80% de similaridade serão combinados. Valores menores são mais tolerantes a variações ortográficas mas aumentam falsos positivos."
    },
    {
      question: "No Power Query Editor, sob a guia 'Exibição', as ferramentas de perfil mostram que uma coluna de ID de Cliente possui '12% Vazias' (Empty) e '3% de Erros' (Errors). Qual é a distinção de processamento entre esses dois estados de célula?",
      options: ["Vazias são nulos ou strings sem texto; Erros são falhas críticas de conversão ou inconsistências de dados na fonte","Erros são gerados por valores nulos; Vazias são strings em branco","Vazias impedem o carregamento do modelo; Erros são ignorados pelo VertiPaq","Não há diferença, ambos são lidos como BLANK no DAX"],
      answer: 0,
      explanation: "Células 'Vazias' contêm ausência de valor (valores nulos em banco de dados ou células de planilha sem conteúdo) e são perfeitamente normais. Células de 'Erro' indicam que a importação ou a conversão de tipo falhou (ex: tentar ler o texto 'ABC' em uma coluna numérica)."
    },
    {
      question: "Uma grande tabela fato de vendas em DirectQuery no SQL Server contém uma coluna de data e hora com alta precisão (segundos). Isso está deixando as consultas lentas. Qual é a melhor prática recomendada para esta modelagem?",
      options: ["Manter a coluna exatamente como está para preservar a granularidade","Dividir a coluna DateTime em duas: uma coluna apenas de Data (tipo Date) e outra coluna apenas de Hora (tipo Time)","Converter a coluna inteira para formato de Texto longo","Remover completamente o relacionamento com a tabela Calendário"],
      answer: 1,
      explanation: "Dividir DateTime em colunas de Data e Hora separadas reduz drasticamente a cardinalidade (valores únicos) da chave de relacionamento e melhora significativamente a performance de indexação no SQL e o comportamento de agrupamento e agregação no Power BI."
    },
    {
      question: "Ao desenvolver scripts ou etapas avançadas no Power Query Editor, um desenvolvedor digita 'table.selectrows' (minúsculo) na Barra de Fórmulas. O que ocorre quando a etapa tenta rodar?",
      options: ["O Power Query interpreta normalmente porque M é case-insensitive","Ocorre um erro indicando que a função 'table.selectrows' não foi encontrada, pois M é estritamente case-sensitive","O editor autocrashará o Power BI Desktop","A transformação roda, mas em velocidade reduzida por não mapear o tipo nativo"],
      answer: 1,
      explanation: "A linguagem M é estritamente case-sensitive (diferencia maiúsculas de minúsculas). Escrever funções nativas com letras incorretas (ex: 'table.selectrows' em vez de 'Table.SelectRows') resultará em erro de compilação ou 'NameNotFoundError'."
    },
    {
      question: "Você publica um relatório no Power BI Service que utiliza a função M 'DateTime.LocalNow()' para carregar a data de atualização. Após o agendamento de refresh na nuvem, você percebe que a data exibida está algumas horas atrasada/adiantada. Por que ocorre essa divergência?",
      options: ["O gateway local alterou o relógio da máquina física","O Power BI Service executa a atualização no fuso horário UTC (tempo universal), ignorando o fuso horário local da máquina do criador","A licença Pro do workspace restringe a atualização em fusos dinâmicos","A função DateTime.LocalNow() é incompatível com fontes locais"],
      answer: 1,
      explanation: "O Power BI Service opera sob o fuso horário UTC padrão da nuvem Azure. Funções de hora local como 'DateTime.LocalNow()' serão avaliadas no servidor do Service como UTC. Para exibir a hora local correta, o desenvolvedor deve usar 'DateTimeZone.UtcNow()' e aplicar o deslocamento de horas (timezone offset) correto do fuso desejado."
    },
    {
      question: "Ao configurar 'Atualização Incremental' para uma tabela de vendas do SQL no Power BI Desktop, quais tipos de parâmetros do Power Query são estritamente obrigatórios em termos de nome e tipo de dado?",
      options: ["RangeStart e RangeEnd do tipo Texto (Text)","RangeStart e RangeEnd do tipo Data/Hora (DateTime)","MinDate e MaxDate do tipo Data (Date)","StartDate e EndDate do tipo Número Inteiro (Int)"],
      answer: 1,
      explanation: "A atualização incremental exige a criação de dois parâmetros chamados exatamente 'RangeStart' e 'RangeEnd' (respeitando maiúsculas) e configurados estritamente com o tipo de dados Data/Hora (DateTime). O Power BI usa esses parâmetros dinamicamente para particionar e atualizar os dados."
    },
    {
      question: "Em ambientes corporativos, onde são armazenadas e gerenciadas as definições das tabelas resultantes do ETL de um Dataflow (Fluxo de Dados) criado no Power BI Service?",
      options: ["Em um banco de dados SQL Server temporário na nuvem","Em contas de armazenamento Azure Blob ou Azure Data Lake Storage Gen2 no formato Common Data Model (CDM)","Diretamente no cache de memória RAM da capacidade Premium","Em pastas do OneDrive para Business do usuário proprietário"],
      answer: 1,
      explanation: "Dataflows geram arquivos e metadados estruturados que são armazenados em estruturas de pastas do Azure Data Lake Storage Gen2 de propriedade gerenciada do Power BI (ou de propriedade da empresa), organizados seguindo as especificações do Common Data Model (CDM)."
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
    },
    {
      question: "Considere as seguintes expressões DAX criadas em um modelo: Medida A = SUMX(Cliente, [Total Vendas]) e Medida B = SUMX(Cliente, SUM(Vendas[Valor])). Sabendo que [Total Vendas] é uma medida pré-existente definida por SUM(Vendas[Valor]), qual a diferença de comportamento entre as duas medidas em termos de contexto?",
      options: ["Elas retornam exatamente o mesmo valor em qualquer contexto visual do relatório","A Medida A realiza uma transição de contexto, transformando o contexto de linha do SUMX em contexto de filtro para calcular as vendas de cada cliente; A Medida B calcula as vendas totais de todos os clientes para cada linha de iteração","A Medida B realiza transição de contexto; A Medida A gera um produto cartesiano","A Medida A é estritamente mais lenta porque chama uma submedida redundante"],
      answer: 1,
      explanation: "Medidas chamadas dentro de funções iteradoras (como SUMX) ou colunas calculadas possuem um CALCULATE implícito em sua execução. Isso ativa a 'Transição de Contexto', que converte o contexto de linha (cada cliente atual) em contexto de filtro, isolando as vendas apenas do cliente atual. A Medida B usa a função bruta SUM, que não sofre transição de contexto e soma a tabela de vendas inteira para todas as iterações de cliente."
    },
    {
      question: "Qual é o principal propósito da utilização da função DAX KEEPFILTERS() quando aplicada como argumento de filtro dentro de uma função CALCULATE()?",
      options: ["Forçar o cálculo a rodar de forma síncrona no VertiPaq","Preservar e mesclar os filtros existentes no contexto visual (ex: filtros de slicer ou linhas de tabela) em vez de substituí-los completamente com a condição de filtro do CALCULATE","Impedir que usuários finais apliquem filtros no painel lateral de filtros","Garantir RLS estático em colunas críticas"],
      answer: 1,
      explanation: "Por padrão, se você filtrar um campo no CALCULATE (ex: CALCULATE([Total], Produto[Cor] = 'Azul')), esse filtro substitui qualquer outro filtro pré-existente de 'Cor' no contexto visual. Ao encapsular com KEEPFILTERS, as condições se mesclam (AND lógica), de modo que se o visual já estiver filtrado para 'Vermelho', o resultado será BLANK() em vez de 'Azul'."
    },
    {
      question: "Você possui três relacionamentos mapeados entre a tabela Fato_Vendas e a dimensão Dim_Calendario baseados nas colunas DataPedido, DataEnvio e DataVencimento. Apenas o de DataPedido é ativo. Como você calcula as vendas associadas à DataEnvio em uma medida DAX sem duplicar tabelas?",
      options: ["Usando a função RELATED(Dim_Calendario[Date])","Usando CALCULATE([Total Vendas], USERELATIONSHIP(Fato_Vendas[DataEnvio], Dim_Calendario[Date]))","Usando TREATAS para criar uma relação virtual","Desativando a relação de DataPedido diretamente na visualização de modelo"],
      answer: 1,
      explanation: "A função 'USERELATIONSHIP' dentro de 'CALCULATE' permite ativar temporariamente um relacionamento inativo para a duração exclusiva do cálculo daquela medida específica, desativando automaticamente o relacionamento ativo padrão."
    },
    {
      question: "Você precisa criar um cálculo de Acumulado Corrente (Running Total) que mostre o crescimento acumulado das vendas à medida que o usuário seleciona ou altera filtros de segmentação (slicers). Onde e como esse cálculo deve ser criado?",
      options: ["Como uma Coluna Calculada em DAX, pois colunas armazenam valores fisicamente no modelo","Como uma Medida DAX, porque as medidas respondem dinamicamente ao contexto de filtro ativo gerado pelas seleções dos slicers no relatório","Na fonte SQL usando a cláusula OVER (PARTITION BY)","Como uma etapa de agrupamento recursiva no Power Query Editor"],
      answer: 1,
      explanation: "Colunas calculadas são estáticas e calculadas apenas durante o refresh de dados. Como o cálculo de acumulado dinâmico precisa mudar instantaneamente com base no que o usuário seleciona nos slicers em tempo real, ele deve ser criado estritamente como uma Medida DAX."
    },
    {
      question: "Você configurou RLS (Segurança em Nível de Linha) em um modelo contendo tabelas de Dimensão e Fato. Ao testar as regras RLS, você percebe que filtros de segurança aplicados a tabelas Fato precisam se propagar 'de volta' para filtrar as opções disponíveis na dimensão de Produtos. Qual configuração de relacionamento é obrigatória?",
      options: ["Direção do filtro cruzado configurado como Único (Single)","Marcar a opção 'Aplicar filtro de segurança em ambas as direções' (Apply security filter in both directions) nas propriedades do relacionamento","Habilitar o Query Folding de segurança","Marcar o relacionamento como inativo"],
      answer: 1,
      explanation: "Por padrão, filtros se propagam do lado 1 (Dimensão) para o lado N (Fato). Se você define regras RLS que filtram a Fato e quer que isso filtre a dimensão 1, deve marcar explicitamente 'Aplicar filtro de segurança em ambas as direções' nas opções de relacionamento do Power BI Desktop."
    },
    {
      question: "Qual é o comportamento do escopo de avaliação de Variáveis (VAR) declaradas no corpo de uma medida ou coluna calculada DAX?",
      options: ["Elas são reavaliadas de forma lazy cada vez que são referenciadas no bloco RETURN","Elas são avaliadas exatamente uma vez no momento de sua definição, armazenando o valor resultante no contexto em que a variável foi declarada (contexto de avaliação imutável)","Elas mudam dinamicamente se encapsuladas por funções de modificação de filtro como CALCULATE","São globais e podem ser referenciadas por outras medidas no modelo"],
      answer: 1,
      explanation: "Em DAX, variáveis (VAR) são estáticas no escopo do cálculo. Elas são computadas uma única vez e armazenam o valor final resultante na etapa em que foram declaradas. O bloco RETURN apenas consome esse valor estático, ignorando quaisquer mudanças de contexto geradas posteriormente no código."
    },
    {
      question: "Duas tabelas em seu modelo de dados não compartilham um relacionamento físico físico na aba de visualização de Modelo do Power BI Desktop, mas você precisa fazer uma medida filtrar uma tabela com base nas chaves de outra. Qual função DAX permite criar esse relacionamento virtual de alta performance?",
      options: ["RELATEDTABLE()","TREATAS()","CROSSFILTER()","INTERSECT()"],
      answer: 1,
      explanation: "A função 'TREATAS' mapeia virtualmente o resultado de uma expressão de tabela como filtros em colunas de outra tabela não relacionada fisicamente. É a maneira mais otimizada e limpa de criar heranças de filtro virtuais em DAX."
    },
    {
      question: "Para criar um relatório de análise financeira que exiba a Média Móvel de Vendas dos últimos 12 meses, qual função de inteligência de tempo DAX é ideal para gerar a janela temporal móvel?",
      options: ["DATESYTD()","DATESINPERIOD()","SAMEPERIODLASTYEAR()","DATEADD()"],
      answer: 1,
      explanation: "A função 'DATESINPERIOD(Dates, StartDate, NumberOfPeriods, Interval)' é projetada para retornar uma tabela de datas que começa na data inicial indicada e se estende por um número e intervalo específicos de períodos (ex: -12 meses, 30 dias), ideal para janelas móveis (rolling/moving calculations)."
    },
    {
      question: "Qual das seguintes características técnicas de uma coluna de dados possui o maior impacto negativo na eficiência de compactação de dicionário do motor VertiPaq de armazenamento em memória do Power BI?",
      options: ["O tamanho total das strings de texto em bytes","A alta Cardinalidade da coluna (número elevado de valores exclusivos/únicos)","O fato de a coluna possuir valores nulos (BLANKs)","O tipo de dados estar configurado como Número Inteiro (Integer) em vez de Decimal"],
      answer: 1,
      explanation: "O motor VertiPaq usa compactação orientada por coluna e constrói dicionários de termos únicos. Colunas com alta cardinalidade (muitos valores únicos, como IDs detalhados de transações ou carimbos de data/hora exatos) exigem dicionários massivos e quebram a eficiência da compactação por execução de comprimento de linha (RLE)."
    },
    {
      question: "Após configurar os papéis (Roles) e filtros RLS (Segurança em Nível de Linha) no Power BI Desktop e publicar o relatório no Power BI Service, qual é o próximo passo administrativo obrigatório para que a segurança funcione para os usuários?",
      options: ["Mapear as funções no portal de administração do Tenant do Power BI","Acessar as configurações de Segurança do modelo de dados no Power BI Service e atribuir usuários ou grupos de segurança (Azure Active Directory / Entra ID) aos papéis definidos","Configurar regras de acesso de visualização RLS nas propriedades do workspace","Não há passos adicionais, o RLS é ativado automaticamente pelas credenciais de login dos usuários"],
      answer: 1,
      explanation: "O RLS definido no Power BI Desktop apenas mapeia a lógica lógica lógica. Para que funcione na nuvem, o administrador ou proprietário do modelo deve ir nas configurações do dataset no Service (Segurança), selecionar os papéis e adicionar os usuários individuais ou grupos de segurança que devem pertencer a cada papel."
    },
    {
      question: "Qual é a principal diferença técnica de comportamento entre as funções DAX ALL() e ALLNOBLANKROW() ao remover filtros de uma tabela do modelo de dados?",
      options: ["ALL() mantém a linha em branco automática gerada por inconsistência de integridade referencial; ALLNOBLANKROW() a ignora/remove","ALLNOBLANKROW() limpa filtros de segmentadores; ALL() limpa apenas de tabelas visuais","ALLNOBLANKROW() é obsoleta e foi descontinuada do DAX","Não há diferença prática, pois ambas removem 100% dos filtros da tabela referenciada"],
      answer: 0,
      explanation: "Quando há inconsistência referencial no modelo (ex: uma linha na Fato aponta para um ID de produto que não existe na dimensão Produto), o Power BI cria uma linha em branco invisível na dimensão para associar esses órfãos. A função 'ALL' inclui essa linha especial no resultado retornado, enquanto 'ALLNOBLANKROW' a ignora."
    },
    {
      question: "O que ocorre quando a expressão CALCULATE(SUM(Vendas[Valor])) é avaliada no contexto de linha de uma Coluna Calculada de uma tabela de clientes?",
      options: ["Gera um erro de dependência circular imediato no modelo","Realiza uma Transição de Contexto, convertendo todas as colunas da linha atual do cliente em filtros e retornando a soma das vendas exclusivas desse cliente específico","Calcula a soma das vendas de todos os clientes sem qualquer restrição de linha","Retorna BLANK() porque colunas calculadas não aceitam funções agregadoras encapsuladas"],
      answer: 1,
      explanation: "Escrever CALCULATE no contexto de linha força o motor a realizar a transição de contexto. A linha atual da tabela é convertida em um conjunto equivalente de filtros de coluna, o que filtra a tabela de vendas relacionada para mostrar apenas os dados daquele cliente específico."
    },
    {
      question: "Em uma modelagem estrela clássica, você possui uma tabela fato com duas chaves estrangeiras de data (DataVenda e DataEntrega) conectadas à mesma tabela dimensão Calendário. Qual é o limite de relacionamentos físicos ativos que você pode mapear entre essas duas tabelas?",
      options: ["Nenhum, pois múltiplos relacionamentos exigem uma tabela ponte intermediária","Exatamente um relacionamento ativo; os demais devem ser configurados como inativos nas propriedades","Dois relacionamentos ativos simultâneos, desde que possuam direções de filtro diferentes","Ilimitados, pois o VertiPaq resolve caminhos de forma dinâmica"],
      answer: 1,
      explanation: "O Power BI não permite caminhos de filtro ambíguos. Por isso, entre duas tabelas quaisquer, apenas um relacionamento físico pode ser definido como 'Ativo' por vez. Relacionamentos adicionais devem ser marcados como 'Inativos' e ativados no DAX com USERRELATIONSHIP quando necessário."
    },
    {
      question: "Qual o benefício direto de desabilitar a opção 'Data/Hora Automática' (Auto Date/Time) nas configurações globais ou do arquivo atual do Power BI Desktop?",
      options: ["Melhorar a precisão de relatórios de IoT com dados em tempo real","Excluir tabelas de calendário ocultas criadas automaticamente pelo Power BI para cada coluna de data do modelo, reduzindo o tamanho do arquivo final e o consumo de memória RAM","Impedir que usuários digitem datas incorretas nos filtros de segmentação","Forçar a sincronização de fusos horários locais"],
      answer: 1,
      explanation: "Quando 'Data/Hora Automática' está ativa, o Power BI cria silenciosamente uma tabela calendário oculta para cada coluna do tipo Date ou DateTime no modelo. Em modelos com muitas colunas de data, isso aumenta desnecessariamente o tamanho do arquivo .pbix e deteriora a performance de processamento."
    },
    {
      question: "Qual é a principal vantagem de performance ao projetar uma tabela de relacionamento física intermediária (tabela ponte / bridge table) para resolver relações Muitos-para-Muitos (N:N) em um modelo com milhões de linhas?",
      options: ["Diminuir a quantidade de medidas DAX necessárias","Eliminar caminhos de filtro ambíguos na propagação e otimizar as pesquisas internas no VertiPaq, evitando a deterioração de performance visual","Ativar o Query Folding automático na fonte de dados local","Reduzir o número total de relacionamentos para zero"],
      answer: 1,
      explanation: "Relacionamentos Muitos-para-Muitos diretos na modelagem utilizam lógica de produto cruzado que consome muito processamento de CPU em grandes datasets. O uso de uma tabela ponte contendo valores distintos normalizados e filtros unidirecionais claros simplifica a busca do VertiPaq e acelera a renderização de gráficos."
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
    },
    {
      question: "Ao selecionar uma categoria em um gráfico de barras, você percebe que os outros visuais da tela mantêm os itens não relacionados visíveis, mas com uma transparência cinza. Você quer que os visuais ocultem completamente os dados não selecionados. Como configurar isso?",
      options: ["Aumentar a transparência dos elementos na folha de temas JSON","Habilitar a edição de interações (Format → Edit Interactions) e mudar o ícone de interação do visual selecionado de 'Realçar' (Highlight) para 'Filtrar' (Filter)","Configurar a RLS visual dos elementos de gráfico","Mapear todos os gráficos em um único grupo de segmentação de dados sincronizado"],
      answer: 1,
      explanation: "Por padrão, o Power BI usa 'Cross-highlight' (Realce cruzado) para interações visuais. Ao ativar 'Editar Interações' (guia Formato), você pode selecionar um visual e definir, nos pequenos ícones no topo dos demais visuais, se eles devem Filtrar completamente (ícone de funil), Realçar parcialmente (ícone de gráfico) ou Não interagir (ícone de bloqueio)."
    },
    {
      question: "Você desenvolveu uma página de destino detalhada configurada para Drillthrough. Para garantir que apenas a categoria exata selecionada no visual de origem seja passada como filtro para a página de Drillthrough, ignorando outros filtros ativos na página de origem, qual propriedade deve ser alterada?",
      options: ["Marcar a opção 'Sincronizar filtros na página'","Desativar a opção 'Manter todos os filtros' (Keep all filters) nas propriedades de configuração do campo de Drillthrough da página de destino","Bloquear os filtros do painel lateral de filtragem do relatório","Converter a página de destino para o tipo Dica de Ferramenta (Tooltip)"],
      answer: 1,
      explanation: "A opção 'Manter todos os filtros' (Keep all filters) vem ativa por padrão nas páginas de Drillthrough. Se você deseja ignorar quaisquer outros filtros ativos na página de origem (ex: filtros de ano, região) e passar exclusivamente o campo de cruzamento selecionado, deve desativá-la."
    },
    {
      question: "Qual funcionalidade analítica de Inteligência Artificial integrada ao Power BI gera textos automatizados de síntese explicativa sobre o comportamento, tendências e anomalias de um conjunto de gráficos, além de aceitar a inclusão de medidas dinâmicas criadas pelo usuário?",
      options: ["Visual Q&A (Perguntas e Respostas)","Narrativa Inteligente (Smart Narrative)","Árvore de Decomposição (Decomposition Tree)","Principais Influenciadores (Key Influencers)"],
      answer: 1,
      explanation: "O visual de Narrativa Inteligente analisa os dados selecionados em tela e redige de forma automática um sumário textual inteligente. O analista pode editar o texto bruto e inserir perguntas ou medidas DAX dinâmicas dentro dos parágrafos, que se recalculam conforme filtros de tela são acionados."
    },
    {
      question: "Ao utilizar o visual analítico de IA 'Principais Influenciadores' (Key Influencers) para investigar uma métrica que possui comportamento contínuo (por exemplo, Valor de Venda em números decimais), qual método estatístico de análise é executado silenciosamente por trás do gráfico?",
      options: ["Regressão Logística","Regressão Linear","Árvores de Decisão baseadas em entropia","Agrupamento de K-means"],
      answer: 1,
      explanation: "Para resultados categóricos (ex: Cliente Cancelou = Sim/Não), o visual Key Influencers executa uma Regressão Logística. Para resultados numéricos contínuos (ex: Valor da Venda), ele computa uma Regressão Linear para identificar o quanto cada variável altera a média da métrica analisada."
    },
    {
      question: "Você precisa criar botões de navegação para todas as 10 páginas de um relatório corporativo. Qual é a abordagem recomendada visando facilitar alterações futuras de layout e evitar retrabalho manual?",
      options: ["Criar botões manuais usando imagens personalizadas copiadas página por página","Inserir um visual nativo de 'Navegador de Páginas' (Page Navigator), que lê automaticamente a estrutura de páginas do arquivo e se atualiza de forma autônoma","Usar código JavaScript embutido em um visual de HTML customizado","Escrever bookmarks específicos para transições e atribuí-los a botões"],
      answer: 1,
      explanation: "O visual 'Navegador de Páginas' (Inserir → Botões → Navegador) gera automaticamente uma barra com botões para as páginas do relatório. Se você adicionar, remover, renomear ou reordenar páginas posteriormente, o visual se atualiza automaticamente, eliminando a manutenção manual."
    },
    {
      question: "Ao criar um layout de visualização otimizado para Dispositivos Móveis (Mobile Layout) no Power BI Desktop, qual é a flexibilidade de formatação dada ao designer no editor de celular?",
      options: ["Nenhuma, as configurações visuais do desktop são replicadas idênticamente sem personalização de estilo","É possível alterar tamanhos de fontes, alinhamentos, bordas e cores de elementos visuais específicos para celular, sem alterar o visual no layout padrão de computador","Apenas a posição e ordem dos visuais podem ser ajustadas; qualquer alteração de cor é replicada de volta ao desktop","A edição móvel exige duplicar e criar visuais exclusivos para celular na aba desktop"],
      answer: 1,
      explanation: "O Power BI Desktop suporta formatação independente para o Layout Móvel. Propriedades de texto, tamanho de fonte, alinhamentos, cores de fundo e formatações de grades/títulos podem ser alteradas exclusivamente na visualização móvel sem afetar a versão clássica do relatório desktop."
    },
    {
      question: "Ao utilizar a ferramenta de 'Analisador de Performance' (Performance Analyzer) no Power BI Desktop, qual é o principal benefício de utilizar o botão 'Copiar Consulta' (Copy Query) em um visual de matriz lento?",
      options: ["Copiar a planilha Excel resultante do visual para o clipboard","Obter o código de consulta DAX exato executado pelo visual, permitindo que você o analise, debuge e otimize em ferramentas externas como o DAX Studio ou Tabular Editor","Copiar o estilo de cores CSS do visual para aplicar em outros cards","Enviar o relatório visual direto para análise de desempenho na nuvem"],
      answer: 1,
      explanation: "O 'Copiar Consulta' extrai a instrução DAX bruta gerada pelo motor do Power BI para renderizar aquele visual específico na página. Colar essa consulta no DAX Studio permite rodar análises de plano de execução (Server Timings / Query Plan) para mapear o porquê de o cálculo estar lento."
    },
    {
      question: "Para configurar com sucesso uma página personalizada de relatório para atuar como dica de ferramenta visual (Report Page Tooltip) ao passar o mouse em pontos de dados de outros visuais, quais duas ações de formatação de página de destino são requeridas?",
      options: ["Configurar o Tipo de Página como 'Dica de ferramenta' (Tooltip) sob as informações da página e ajustar o tamanho do papel para dimensões reduzidas (ex: tamanho Tooltip)","Deixar a página com tamanho padrão 16:9 e ativar RLS nas propriedades","Definir a página como oculta e marcar a opção 'Drillthrough cruzado'","Criar um bookmark com a página invisível"],
      answer: 0,
      explanation: "A página que atuará como pop-up deve ter nas configurações de página o tipo configurado como 'Dica de ferramenta' (Tooltip) e ter seu tamanho de tela reduzido (o tamanho padrão do modelo Tooltip é 320x240 pixels) para que o pop-up não oclua excessivamente o gráfico principal."
    },
    {
      question: "Você deseja criar um Bookmark (Indicador) no Power BI que oculte temporariamente um visual de detalhe na tela quando ativado, mas quer garantir que qualquer filtro de dados ou seleção de slicer atual feita pelo usuário não seja perdida ou reiniciada ao clicar no botão do Bookmark. Qual opção do Bookmark deve ser desmarcada?",
      options: ["Exibição (Display)","Dados (Data)","Página atual (Page)","Visuais selecionados (Selected visuals)"],
      answer: 1,
      explanation: "Cada bookmark grava três estados principais: Dados (filtros, segmentações), Exibição (visibilidade, modo de foco) e Página. Se você quer que o bookmark apenas controle quais visuais estão escondidos/exibidos em tela, mas respeite as seleções de filtro atuais do usuário, deve desmarcar a propriedade 'Dados' nas opções do bookmark."
    },
    {
      question: "Um analista precisa exibir graficamente o fluxo de receitas corporativas, partindo do Faturamento Bruto e deduzindo passo a passo impostos, custos e despesas até atingir o Lucro Líquido final. Qual tipo de visual nativo atende perfeitamente este caso de uso?",
      options: ["Gráfico de Dispersão (Scatter Chart)","Gráfico de Cascata (Waterfall Chart)","Gráfico de Funil (Funnel Chart)","Treemap"],
      answer: 1,
      explanation: "O gráfico de Cascata (Waterfall) é projetado especificamente para ilustrar como um valor inicial é modificado por incrementos positivos e decrementos negativos cumulativos até atingir um saldo final, exibindo pilares flutuantes de conciliação."
    },
    {
      question: "Você deseja construir um gráfico interativo no Power BI que exiba o histórico de evolução anual das vendas e das margens de lucro dos seus concorrentes no mesmo plano cartesiano, rodando uma animação que trace o caminho ano a ano de forma fluida. Qual visual nativo e recurso específico atende esta necessidade?",
      options: ["Gráfico de Linha com múltiplos níveis de hierarquia de datas","Gráfico de Dispersão (Scatter Chart) associado ao recurso de Eixo de Reprodução (Play Axis) contendo a coluna de Anos","Árvore de Decomposição visualizada em cascata","Gráfico de Velocímetro dinâmico"],
      answer: 1,
      explanation: "O gráfico de Dispersão aceita um campo no campo 'Eixo de reprodução' (Play Axis). Quando preenchido com uma dimensão de tempo (como Ano ou Mês), ele habilita um painel multimídia no relatório (com botão Play). Ao clicar, as bolhas de dispersão se movem deixando um rastro histórico dinâmico de sua trajetória."
    },
    {
      question: "Um desenvolvedor aplica uma restrição de dados no painel de filtragem do relatório na seção 'Filtros neste visual'. Onde este filtro atuará quando o relatório for publicado?",
      options: ["Filtrará todas as páginas do relatório para todos os visuais","Filtrará todos os visuais da página atual","Atuará exclusivamente no visual específico que estava selecionado no momento da criação do filtro","Filtrará apenas os segmentadores de dados (slicers)"],
      answer: 2,
      explanation: "O painel de filtros do Power BI possui três níveis clássicos: Filtros neste visual (afeta apenas o gráfico selecionado), Filtros nesta página (afeta todos os elementos da página atual) e Filtros em todas as páginas (afeta o relatório completo)."
    },
    {
      question: "Você possui duas páginas em seu relatório com layouts diferentes de segmentadores de dados (uma página usa um slicer no formato Lista e a outra no formato Menu Suspenso), mas ambos filtram a coluna Região. Como você garante que ao alterar o filtro em um deles, o outro seja atualizado automaticamente para manter a sincronia?",
      options: ["Os slicers de formatos diferentes são incompatíveis e não podem ser sincronizados","Configurando o mesmo Nome de Grupo de Sincronização (Sync Group Name) nas Opções Avançadas do painel 'Sincronizar Segmentações' para ambos os slicers","Agrupando ambos os slicers em um único Bookmark de dados","Duplicando as páginas e aplicando RLS nas mesmas"],
      answer: 1,
      explanation: "Ao abrir a Exibição → Sincronizar Segmentações, você pode acessar as Opções Avançadas de cada slicer e atribuir um 'Nome de Grupo' personalizado. Qualquer slicer que compartilhe o mesmo nome de grupo ficará sincronizado de forma bidirecional, mesmo que pertença a páginas distintas ou use layouts visuais diferentes."
    },
    {
      question: "Você quer destacar o background das células de uma coluna de Lucro em sua tabela com cores customizadas, baseando-se estritamente em códigos hexadecimais de cor (ex: '#00FF00' para lucro, '#FF0000' para prejuízo) gerados e armazenados diretamente em uma coluna calculada no seu modelo de dados. Qual estilo de Formatação Condicional aplicar?",
      options: ["Gradiente de cores","Regras estáticas","Valor do Campo (Field Value)","Escala de cores automática"],
      answer: 2,
      explanation: "Ao escolher 'Valor do Campo' (Field Value) como a base de formatação nas opções de Formatação Condicional, o Power BI lê os códigos hexadecimais textuais armazenados na coluna selecionada do modelo e os aplica diretamente como estilo (background ou fonte), garantindo flexibilidade total controlada por DAX ou banco."
    },
    {
      question: "Um relatório corporativo plota mais de 50.000 localizações geográficas detalhadas de lojas em um visual de Mapa. O carregamento de renderização está extremamente lento e o visual apresenta avisos de limite de plotagem. Qual é a melhor prática recomendada para contornar essa falha de alta cardinalidade?",
      options: ["Mudar a conexão de todos os dados do mapa para DirectQuery","Preencher o mapa usando agregações de hierarquia (ex: agrupar por Estado ou Código Postal) em vez de coordenadas de latitude/longitude detalhadas individuais, e ativar o agrupamento de bolhas (clustering)","Remover completamente o mapa e usar tabelas estáticas de texto","Converter as colunas geográficas para tipo Decimal de alta precisão"],
      answer: 1,
      explanation: "Plotar milhares de coordenadas individuais satura o visual do mapa e a memória do navegador. Agrupar os pontos em níveis hierárquicos (ex: Cidade, Estado) permite fazer drill-down conforme necessário. Habilitar o 'Clustering' (agrupamento de bolhas) consolida pontos próximos em um único círculo numérico, aliviando a performance visual."
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
    },
    {
      question: "Você precisa configurar o acesso de um analista em um Workspace no Power BI Service. Ele deve ter permissões para publicar novos relatórios, editar modelos e atualizar dados, mas não deve ter direitos para alterar membros do Workspace, modificar permissões de segurança ou publicar Aplicativos (Apps) corporativos. Qual papel (Role) atribuir?",
      options: ["Administrador (Admin)","Membro (Member)","Contribuidor (Contributor)","Leitor (Viewer)"],
      answer: 2,
      explanation: "O papel 'Contribuidor' (Contributor) é ideal para criadores e analistas técnicos de relatórios. Ele concede permissões completas de desenvolvimento e publicação de conteúdo no workspace, mas impede ações administrativas como gerenciar acesso a membros, alterar papéis de workspace ou criar/publicar Apps (que é um direito de Administradores e Membros)."
    },
    {
      question: "O recurso de 'Audiências de Aplicativo' (App Audiences) no Power BI Service permite que criadores realizem qual ação específica ao distribuir conteúdo corporativo?",
      options: ["Acompanhar estatísticas de acesso e audiência de visualização do aplicativo em tempo real","Criar diferentes caminhos de acesso dentro do mesmo Aplicativo, determinando quais páginas, relatórios ou painéis estarão visíveis ou ocultos para diferentes grupos de usuários do AD","Converter relatórios interativos em transmissões de vídeo ao vivo","Limitar o acesso apenas para usuários com celulares homologados"],
      answer: 1,
      explanation: "A funcionalidade de Audiências em Aplicativos do Power BI permite criar subgrupos de distribuição dentro de um único App publicado no Service. Você pode definir que a Audiência A (Diretores) veja todas as páginas do relatório, enquanto a Audiência B (Vendedores) veja apenas páginas selecionadas, evitando duplicar workspaces e apps."
    },
    {
      question: "Qual é a principal limitação técnica de segurança e arquitetura do Data Gateway configurado em 'Modo Pessoal' (Personal Mode) comparado ao 'Modo Padrão' (Standard/Enterprise Mode)?",
      options: ["O modo Pessoal não suporta atualizações agendadas automáticas","O modo Pessoal executa como um aplicativo associado estritamente ao login de um usuário específico, não rodando como serviço em segundo plano, e não oferece suporte a conexões DirectQuery compartilhadas ou RLS no banco","O modo Pessoal requer licenciamento Premium de capacidade","O modo Pessoal é limitado a conexões com arquivos TXT ou CSV locais"],
      answer: 1,
      explanation: "O Personal Gateway roda sob a sessão do Windows do usuário que o instalou. Se o usuário deslogar da máquina, o gateway fecha. Além disso, ele não suporta DirectQuery e não pode ser compartilhado com outros membros da organização, sendo útil apenas para cenários individuais simples."
    },
    {
      question: "Qual o limite máximo diário de atualizações agendadas (Scheduled Refresh) permitido pelo Power BI Service para um conjunto de dados residente em um Workspace compartilhado de licença Pro clássica, comparado a um dataset em capacidade Premium?",
      options: ["8 vezes ao dia para Pro; 48 vezes ao dia para Premium","1 vez ao dia para Pro; 8 vezes ao dia para Premium","10 vezes ao dia para Pro; Atualização contínua infinita para Premium","Não há limites diários de atualização para nenhum tipo de licença corporativa"],
      answer: 0,
      explanation: "Conjuntos de dados sob licenças compartilhadas padrão do Power BI Pro podem ser atualizados automaticamente até 8 vezes ao dia. Ao migrar o modelo para um workspace contendo recursos do Power BI Premium (seja capacidade dedicada ou Premium por Usuário - PPU), o limite é ampliado para até 48 atualizações diárias agendadas."
    },
    {
      question: "Em um pipeline de implantação de ciclo de vida (Deployment Pipelines) no Power BI Service, quais são as três etapas padrão recomendadas e quais artefatos analíticos podem ser promovidos entre essas fases?",
      options: ["Início → Teste → Fim; Suporta apenas relatórios paginados","Desenvolvimento → Teste → Produção; Suporta a transição de conjuntos de dados (datasets), relatórios, painéis (dashboards) e fluxos de dados (dataflows)","Local → Nuvem → Externo; Suporta apenas arquivos .pbix brutos","Desenho → Aprovação → Arquivamento; Suporta apenas métricas organizacionais"],
      answer: 1,
      explanation: "Os Deployment Pipelines criam três ambientes sequenciais no Service: Desenvolvimento (para novos recursos), Teste (para validação e RLS) e Produção (para consumo final). Ele gerencia a migração controlada de Datasets, Reports, Dashboards e Dataflows entre workspaces irmãos mapeados para cada etapa."
    },
    {
      question: "Quando você aplica um Rótulo de Sensibilidade (Sensitivity Label) configurado com políticas de proteção e criptografia corporativas a um relatório do Power BI, o que ocorre quando um usuário faz o download desse relatório ou exporta seus dados para Excel, PDF ou PowerPoint?",
      options: ["A segurança é removida para facilitar a visualização local no Office","O rótulo e as políticas de proteção criptográfica integradas do Microsoft Purview / Information Protection são mantidos e continuam protegendo o arquivo resultante exportado","A exportação de dados é bloqueada e o arquivo .pbix local é deletado por segurança","O rótulo apenas atua na interface web, não afetando arquivos exportados"],
      answer: 1,
      explanation: "A integração com o Microsoft Purview garante conformidade e segurança ponta a ponta. Se um relatório possui rótulo 'Confidencial', qualquer exportação (PDF, PPTX ou arquivos de dados do Excel) carregará a marca d'água e aplicará a criptografia de arquivos do Office, exigindo autenticação do usuário para leitura."
    },
    {
      question: "Para publicar alterações de modelo de dados diretamente do Tabular Editor para o Power BI Service por meio do Ponto de Extremidade XMLA (XMLA Endpoint), qual configuração deve ser habilitada no portal de capacidade Premium corporativo?",
      options: ["XMLA Endpoint desativado","XMLA Endpoint configurado como Apenas Leitura (Read Only)","XMLA Endpoint configurado como Ler/Gravar (Read Write)","Ativar Principal de Serviço nas opções de desenvolvimento do Azure"],
      answer: 2,
      explanation: "Por padrão, o Endpoint XMLA do Premium vem definido como Apenas Leitura (permitindo apenas ler metadados ou rodar queries). Para permitir modificações de modelo, deploys diretos ou criação de grupos de cálculo usando ferramentas externas (como Tabular Editor, ALM Toolkit), o XMLA Endpoint deve ser configurado como 'Ler/Gravar' (Read-Write)."
    },
    {
      question: "Qual é a principal diferença de propósito arquitetural entre Relatórios Paginados (Paginated Reports) e Relatórios Interativos padrão do Power BI?",
      options: ["Relatórios Paginados são exclusivos para dispositivos móveis; Interativos para monitores desktop","Relatórios Interativos são focados em visualizações gráficas e exploração dinâmica de dados; Relatórios Paginados são desenvolvidos no Report Builder e focam em tabelas extensas e altamente formatadas para impressão ou geração de PDFs, onde as páginas se estendem verticalmente até exibir todas as linhas","Relatórios Paginados não aceitam conexões com bancos SQL locais; Interativos aceitam","Relatórios Paginados não utilizam o motor VertiPaq sob hipótese alguma"],
      answer: 1,
      explanation: "Interactive Reports (.pbix) limitam rolagem vertical de tabelas e focam em interatividade visual em tela única. Paginated Reports (.rdl) são otimizados para relatórios de tabelas 'pixel-perfect' (como faturas, extratos ou listas fiscais longas) que precisam quebrar páginas perfeitamente para impressão ou relatórios em anexo de email."
    },
    {
      question: "Ao tentar gerar um link público para compartilhamento de relatório usando 'Publicar na Web' (Publish to Web), um usuário recebe a mensagem de que a opção está cinza ou bloqueada. Onde essa permissão deve ser liberada?",
      options: ["Nas configurações de propriedades da página atual no Power BI Desktop","Nas Configurações de Locatário (Tenant Settings) do Portal de Administração (Admin Portal) pelo Administrador de Power BI da empresa","Nas permissões de licença Pro do workspace de desenvolvimento","No console do Azure Active Directory da empresa"],
      answer: 1,
      explanation: "Como 'Publicar na Web' cria links que não exigem autenticação (públicos na internet), é uma funcionalidade com alto risco de vazamento de dados confidenciais. Por isso, a liberação ou restrição deste recurso é gerida de forma centralizada pelo Administrador de TI no painel Admin Portal nas Tenant Settings."
    },
    {
      question: "Você deseja criar uma automação que envie um email e notificação no celular para o Diretor Financeiro imediatamente e de forma exclusiva quando a taxa de inadimplência corporativa superar 5%. Qual recurso do Power BI Service deve ser utilizado?",
      options: ["Criar uma assinatura de email comum do relatório completo","Configurar um Alerta de Dados (Data Alert) associado a um visual de Cartão, Medidor (Gauge) ou KPI fixado em um Painel (Dashboard) corporativo","Mapear filtros de nível de relatório em uma exibição de aplicativo móvel","Escrever uma rotina em linguagem M acionada no refresh de dados"],
      answer: 1,
      explanation: "Alertas de dados são recursos exclusivos do Power BI Service que atuam sobre cards ou gauges fixados em Dashboards. Você pode definir a métrica, a regra de corte (ex: maior que 0.05) e a frequência de envio. Também pode integrar os alertas com o Power Automate para disparar fluxos externos corporativos."
    },
    {
      question: "Para permitir que um analista de outra área da empresa crie seus próprios relatórios customizados no Power BI Desktop conectando-se diretamente a um Dataset central homologado e publicado em seu workspace, qual permissão específica do conjunto de dados deve ser atribuída a ele?",
      options: ["Acesso de Leitura simples (Read)","Permissão de Compilar/Construir (Build Permission)","Direito de Recompartilhamento avançado (Reshare)","Acesso de Gravação no modelo (Write)"],
      answer: 1,
      explanation: "A permissão de 'Compilar' (Build) no dataset permite que usuários criem novos relatórios baseados no modelo publicado (via Live Connection/DirectQuery). Isso evita que eles baixem arquivos locais brutos e mantém as fontes de dados em um repositório central unificado."
    },
    {
      question: "Qual é o principal valor administrativo da funcionalidade de 'Análise de Impacto' (Impact Analysis) disponível ao examinar a Linhagem de Dados (Lineage View) de um conjunto de dados?",
      options: ["Calcular se a velocidade das medidas DAX prejudica a performance da nuvem","Listar e analisar todos os relatórios, painéis e workspaces impactados se você alterar a estrutura, renomear colunas ou deletar aquele dataset específico, com a capacidade de notificar os proprietários afetados diretamente por email","Identificar anomalias e erros de dados importados","Criar automaticamente cópias de backup seguras"],
      answer: 1,
      explanation: "A Análise de Impacto varre o ecossistema corporativo do Power BI e mapeia quais relatórios e painéis (inclusive de outros workspaces) dependem daquele dataset. Isso evita que atualizações estruturais de tabelas corrompam visuais de outros analistas sem aviso prévio."
    },
    {
      question: "Um usuário quer fixar relatórios de alta prioridade ou painéis na página inicial (Home Page) do Power BI Service de todos os membros de seu workspace para acesso fácil e rápido. Qual recurso deve ser acionado pelo criador nas propriedades do item?",
      options: ["Mapear o item como Marcador global","Ativar a opção 'Destaque' (Featured / Feature Content) nas configurações do relatório/painel","Publicar o workspace como público no portal administrativo","Configurar assinaturas automáticas de hora em hora"],
      answer: 1,
      explanation: "Ao marcar um conteúdo (relatório ou painel) como 'Destaque' (Feature Content) nas opções avançadas, o Power BI Service posicionará esse artefato em destaque no topo da guia de boas-vindas do portal web de todos os usuários que tiverem direitos de leitura sobre o workspace."
    },
    {
      question: "Qual é o principal benefício de segurança ao utilizar um 'Principal de Serviço' (Service Principal / aplicativo registrado no Azure AD) para autenticar conexões locais corporativas no Data Gateway, em vez de usar as credenciais de um usuário específico?",
      options: ["Otimizar a compactação de dados no gateway","Eliminar a dependência de contas e senhas individuais de colaboradores, garantindo que as atualizações agendadas não falhem no futuro se o funcionário mudar de senha ou sair da empresa","Aumentar o limite diário de atualizações de 8 para 48","Eliminar a necessidade física de instalar um software de gateway"],
      answer: 1,
      explanation: "Usar o Service Principal cria uma identidade de nuvem sem dependência de usuários humanos. Credenciais de colaboradores expiram, exigem troca de senhas ou são inativadas no desligamento corporativo, interrompendo refreshes cruciais de relatórios. O Service Principal soluciona isso."
    },
    {
      question: "Ao configurar a atualização agendada (Scheduled Refresh) no Power BI Service, quem recebe por padrão a notificação automática em caso de falhas na atualização dos dados?",
      options: ["Todos os visualizadores do aplicativo associado","O Proprietário do Dataset (usuário cujas credenciais configuram o refresh), com a opção de adicionar contatos ou grupos adicionais na interface","Todos os administradores da capacidade Premium corporativa","Nenhum email é gerado para evitar saturação de caixas de correio"],
      answer: 1,
      explanation: "Por padrão, o Power BI envia o alerta de falha de refresh diretamente ao proprietário do dataset. Na interface de configuração de atualização, o proprietário pode marcar a caixa para expandir as notificações para outros usuários do workspace ou grupos de segurança para gerenciamento de falhas corporativo."
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
    } else {
      // Training mode: take a subset of exactly 30 questions
      state.questions = shuffledPool.slice(0, 30);
    }

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
