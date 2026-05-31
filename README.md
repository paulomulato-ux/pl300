# PL-300 Portal

Portal de estudo e simulado para a certificação Microsoft **PL-300: Power BI Data Analyst**.

## Visão geral

Este repositório reúne:
- conteúdo de estudo em formato web nas pastas `01-Preparar-Dados`, `02-Modelar-Dados`, `03-Visualizar-e-Analisar`, `04-Implementar-e-Manter-Entregaveis` e `05-Labs-Oficiais`
- um simulado interativo em `simulado/simulado.html`
- um utilitário de extração em `auto_scraper.js`

## Como usar

### Abrir o portal
- Abra `index.html` diretamente no navegador.
- Ou use um servidor local para evitar problemas de CORS ao carregar arquivos estáticos.

### Executar o simulado
- Abra `simulado/simulado.html` no navegador.

### Instalar dependências
```bash
npm install
```

### Executar o scraper (opcional)
```bash
npm run scrape
```

Por padrão, o `auto_scraper.js` grava `simulado/questions.json` e `simulado/questions.js` no repositório. Para usar um caminho diferente, passe o arquivo de saída JSON como argumento:

```bash
node auto_scraper.js ./simulado/questions.json
```

### Gerar o arquivo de dados do simulado
Se você editar `simulado/questions.json` manualmente, execute:

```bash
npm run build:questions
```

### Gerar o site de documentação
Para converter o conteúdo Markdown em site estático, execute:

```bash
npm run build:docs
```

O site sai em `docs/`.

## Estrutura do projeto

- `index.html` — portal principal do material de estudo
- `style.css` — estilo do portal
- `README.html` — versão HTML do README
- `auto_scraper.js` — utilitário de scraping de questões
- `simulado/questions.json` — banco de questões em formato de dados editável
- `simulado/questions.js` — carregamento de dados do simulado no navegador
- `simulado/` — interface do simulado e arquivos relacionados
- `01-... / 05-...` — pastas de conteúdo de estudo

## Melhorias recomendadas

1. Converter o material de `*.html` para `*.md` para facilitar edição colaborativa e renderização no GitHub.
2. Separar o banco de questões do `simulado` em um arquivo JSON dedicado (`simulado/questions.json`).
3. Adicionar um gerador de site estático leve ou usar GitHub Pages para publicar o conteúdo.
4. Incluir validação de dados para o banco de questões e linting de JavaScript.
5. Adicionar `README.md` em cada pasta de domínio para descrever o escopo do conteúdo.

## Nota sobre o projeto

Este repositório é voltado para preparação de exames e revisão rápida de conceitos do Power BI. As melhorias devem priorizar:
- clareza do conteúdo,
- facilidade de atualização,
- navegabilidade das páginas,
- e compatibilidade com GitHub/GitHub Pages.
