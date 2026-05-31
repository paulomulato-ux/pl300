const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const sourceDirs = [
  '01-Preparar-Dados',
  '02-Modelar-Dados',
  '03-Visualizar-e-Analisar',
  '04-Implementar-e-Manter-Entregaveis',
  '05-Labs-Oficiais'
];
const targetRoot = path.join(__dirname, '..', 'content');
const turndownService = new TurndownService({ headingStyle: 'atx' });

defaultOptions = {
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
};

turndownService.addRule('tables', {
  filter: ['table'],
  replacement: function(content) {
    return content;
  }
});

function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function convertFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const markdown = turndownService.turndown(html);
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  const targetPath = path.join(targetRoot, relativePath).replace(/\.html$/i, '.md');
  ensureDirectory(path.dirname(targetPath));
  fs.writeFileSync(targetPath, markdown, 'utf8');
  console.log('Converted:', relativePath, '->', path.relative(path.join(__dirname, '..'), targetPath));
}

function walkDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      convertFile(fullPath);
    }
  });
}

ensureDirectory(targetRoot);
sourceDirs.forEach((dir) => {
  const fullDir = path.join(__dirname, '..', dir);
  if (fs.existsSync(fullDir)) {
    walkDir(fullDir);
  } else {
    console.warn('Pasta não encontrada:', fullDir);
  }
});

console.log('\nConversão concluída. Arquivos Markdown salvos em content/');
