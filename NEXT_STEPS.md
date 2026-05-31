# Próximas etapas do projeto

Este documento define a primeira fase de migração do portal PL-300 para um formato mais fácil de manter e publicar.

## Objetivo

Transformar o conteúdo atual em um site estático baseado em Markdown, com suporte a GitHub Pages.

## Etapas iniciais

1. Converter os arquivos de estudo `*.html` em Markdown.
   - O script `scripts/convert-html-to-md.js` gera `content/` a partir das pastas de estudo.
   - Execute `npm run convert:md` para gerar os arquivos Markdown.

2. Validar o conteúdo convertido.
   - Revisar os arquivos em `content/`.
   - Ajustar a conversão de tabelas e imagens conforme necessário.

3. Planejar a estrutura do site estático.
   - Criar uma página inicial de documentação.
   - Generar navegação baseada nas pastas e nos tópicos de estudo.

4. Publicar no GitHub Pages.
   - Usar `docs/` como pasta de publicação ou configurar `gh-pages`.

## Scripts disponíveis

- `npm run scrape` — extrai questões do site de referência e atualiza `simulado/questions.json` e `simulado/questions.js`.
- `npm run build:questions` — gera `simulado/questions.js` a partir de `simulado/questions.json`.
- `npm run convert:md` — converte arquivos HTML de estudo para Markdown em `content/`.

## Próxima entrega

- Gerar a primeira versão de `content/` a partir dos arquivos HTML atuais.
- Criar um protótipo de site estático que navegue pelo conteúdo convertido.
