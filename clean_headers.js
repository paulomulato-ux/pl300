const fs = require('fs');
const path = require('path');

const dirs = ['01-Preparar-Dados','02-Modelar-Dados','03-Visualizar-e-Analisar','04-Implementar-e-Manter-Entregaveis','05-Labs-Oficiais'];
const allFiles = [];

dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) return;
    fs.readdirSync(dirPath).filter(f => f.endsWith('.html')).forEach(f => {
        allFiles.push(path.join(dirPath, f));
    });
});
allFiles.push(path.join(__dirname, 'README.html'));

allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/\r\n/g, '\n');

    // Remove orphaned <header class="site-header..."> that has no closing </header>
    // These have the pattern: <header class="site-header..."> ... <div class="container">
    // We strip everything from the header open tag up to (but not including) <div class="container">
    if (content.includes('<header class="site-header')) {
        // Try with closing tag first
        content = content.replace(/<header class="site-header[^"]*"[^>]*>[\s\S]*?<\/header>\s*/gi, '');
        // Then try without closing tag (orphaned) - remove up to the next <div class="container">
        content = content.replace(/<header class="site-header[\s\S]*?(?=<div class="container">)/gi, '');
        // Also try: remove up to </div>\n    <div class="container"> pattern
        content = content.replace(/<header class="site-header[\s\S]*?(?=\n\s*<div class="container")/gi, '');
    }

    // Clean up multiple blank lines (more than 2)
    content = content.replace(/\n{4,}/g, '\n\n');

    fs.writeFileSync(filePath, content, 'utf-8');
    const name = path.basename(filePath);
    const hadHeader = fs.readFileSync(filePath, 'utf-8').includes('site-header');
    console.log((hadHeader ? '[STILL HAS] ' : '[OK] ') + name);
});
