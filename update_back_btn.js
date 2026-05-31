const fs = require('fs');
const path = require('path');
const dirs = ['01-Preparar-Dados','02-Modelar-Dados','03-Visualizar-e-Analisar','04-Implementar-e-Manter-Entregaveis','05-Labs-Oficiais'];

dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Update HTML
        content = content.replace(/<a href="\.\.\/index\.html" class="back-btn">.*?<\/a>/i, '<a href="../index.html" class="back-btn">🏠 Voltar ao Portal</a>');
        
        // Update CSS
        content = content.replace(
            /\.sidebar \.back-btn \{ font-weight: bold; color: #e74c3c; display: flex; align-items: center; gap: 5px; \}/g,
            '.sidebar .back-btn { font-weight: 500; color: #ecf0f1; display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.15); background-color: rgba(255, 255, 255, 0.05); margin-bottom: 20px; }'
        );
        content = content.replace(
            /\.sidebar \.back-btn:hover \{ color: #c0392b; text-decoration: none; \n/g,
            '.sidebar .back-btn:hover { background-color: rgba(255, 255, 255, 0.1); text-decoration: none; color: #fff; }'
        );
        
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Updated ' + filePath);
    });
});