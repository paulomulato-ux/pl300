const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const contentRoot = path.join(__dirname, '..', 'content');
const docsRoot = path.join(__dirname, '..', 'docs');

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function buildSiteMap() {
  const sections = [];
  fs.readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))
    .forEach((sectionEntry) => {
      const sectionPath = path.join(contentRoot, sectionEntry.name);
      const pages = fs.readdirSync(sectionPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
        .sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))
        .map((pageEntry) => {
          const pageName = pageEntry.name.replace(/\.md$/i, '');
          return {
            section: sectionEntry.name,
            pageName,
            sourcePath: path.join(sectionPath, pageEntry.name),
            targetFile: `${sectionEntry.name}--${pageName}.html`
          };
        });
      sections.push({ section: sectionEntry.name, pages });
    });
  return sections;
}

function renderNav(sections) {
  return sections.map((section) => {
    const items = section.pages.map((page) => `      <li><a href="${page.targetFile}">${page.pageName.replace(/-/g, ' ')}</a></li>`).join('\n');
    return `    <div class="nav-group">
      <h3>${section.section.replace(/-/g, ' ')}</h3>
      <ul>
${items}
      </ul>
    </div>`;
  }).join('\n');
}

function renderPage(title, body, navHtml) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="/pl300/">
  <title>${title} | PL-300 Portal</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="page-shell">
    <aside class="sidebar">
      <div class="brand">
        <a href="index.html">PL-300 Portal</a>
      </div>
      <div class="sidebar-nav">
${navHtml}
      </div>
    </aside>
    <main class="content">
      <header class="page-header">
        <h1>${title}</h1>
        <a class="button" href="index.html">Voltar para Início</a>
      </header>
      <article class="markdown-body">
${body}
      </article>
    </main>
  </div>
</body>
</html>`;
}

function renderIndex(sections) {
  const cards = sections.map((section) => {
    const links = section.pages.map((page) => `          <li><a href="${page.targetFile}">${page.pageName.replace(/-/g, ' ')}</a></li>`).join('\n');
    return `      <section class="card">
        <h2>${section.section.replace(/-/g, ' ')}</h2>
        <ul>
${links}
        </ul>
      </section>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="/pl300/">
  <title>PL-300 Portal Documentation</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="page-shell home-shell">
    <main class="content home-content">
      <header class="home-header">
        <h1>Portal de Estudo PL-300</h1>
        <p>Conteúdo convertido para Markdown e publicado como site estático.</p>
      </header>
      <section class="cards-grid">
${cards}
      </section>
    </main>
  </div>
</body>
</html>`;
}

function adjustLinks(html) {
  return html.replace(/href="([^\"]+)\.md"/g, (match, p1) => `href="${p1}.html"`);
}

function buildDocs() {
  ensureDirectory(docsRoot);
  const sections = buildSiteMap();
  const navHtml = renderNav(sections);

  sections.forEach((section) => {
    section.pages.forEach((page) => {
      const markdown = fs.readFileSync(page.sourcePath, 'utf8');
      const bodyHtml = adjustLinks(marked.parse(markdown));
      const title = `${section.section.replace(/-/g, ' ')} — ${page.pageName.replace(/-/g, ' ')}`;
      const html = renderPage(title, bodyHtml, navHtml);
      fs.writeFileSync(path.join(docsRoot, page.targetFile), html, 'utf8');
    });
  });

  const indexHtml = renderIndex(sections);
  fs.writeFileSync(path.join(docsRoot, 'index.html'), indexHtml, 'utf8');
  console.log('Generated docs site at docs/');
}

buildDocs();
