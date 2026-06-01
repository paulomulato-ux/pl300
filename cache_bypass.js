const fs = require('fs');
const path = require('path');
const dirs = ['01-Preparar-Dados', '02-Modelar-Dados', '03-Visualizar-e-Analisar', '04-Implementar-e-Manter-Entregaveis'];
for (const dir of dirs) {
    const dirPath = path.join('c:/Users/Public/Apps/pl300-portal', dir);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('portal-core.js?v=2')) continue;
        content = content.replace('<script src="../portal-core.js"></script>', '<script src="../portal-core.js?v=2"></script>');
        fs.writeFileSync(filePath, content);
    }
}
console.log('Cache buster applied.');
