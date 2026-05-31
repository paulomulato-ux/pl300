const fs = require('fs');
const path = require('path');

const dirs = [
    '01-Preparar-Dados',
    '02-Modelar-Dados',
    '03-Visualizar-e-Analisar',
    '04-Implementar-e-Manter-Entregaveis',
    '05-Labs-Oficiais'
];

function titleize(filename) {
    return filename.replace('.html', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) return;
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        if (content.includes('class="layout-wrapper"')) {
            console.log(`Skipping ${file}, already modified.`);
            return;
        }

        const navLinks = files.map(f => {
            const activeClass = f === file ? ' class="active"' : '';
            return `<li><a href="${f}"${activeClass}>${titleize(f)}</a></li>`;
        }).join('\n                ');

        const sidebarHtml = `<div class="layout-wrapper">
        <aside class="sidebar">
            <a href="../index.html" class="back-btn">&omacr; Voltar para Tela Principal</a>
            <h3>Navegacao</h3>
            <ul class="nav-links">
                ${navLinks}
            </ul>
        </aside>
        <div class="content-area">`;

        content = content.replace(/<body>/i, `<body>\n    ${sidebarHtml}`);
        content = content.replace(/<\/body>/i, `    </div>\n    </div>\n</body>`);

        const sidebarCss = `
        /* Sidebar Styles */
        body { margin: 0 !important; padding: 0 !important; display: flex; height: 100vh; overflow: hidden; background-color: #f4f4f4; }
        .layout-wrapper { display: flex; width: 100%; height: 100vh; }
        .sidebar { width: 280px; background: #2c3e50; color: #ecf0f1; padding: 20px; overflow-y: auto; flex-shrink: 0; font-family: Arial, sans-serif; }
        .sidebar a { color: #ecf0f1; text-decoration: none; display: block; padding: 8px 0; }
        .sidebar a:hover, .sidebar a.active { color: #3498db; font-weight: bold; }
        .sidebar h3 { margin-top: 30px; border-bottom: 1px solid #34495e; padding-bottom: 10px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; color: #bdc3c7; }
        .sidebar .back-btn { font-weight: bold; color: #e74c3c; display: flex; align-items: center; gap: 5px; }
        .sidebar .back-btn:hover { color: #c0392b; text-decoration: none; }
        .sidebar ul { list-style: none; padding: 0; margin: 0; }
        .content-area { flex-grow: 1; overflow-y: auto; padding: 20px; background-color: #f4f4f4; }
        .container { margin: 0 auto; max-width: 800px; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        `;

        if (content.includes('</style>')) {
            content = content.replace('</style>', `${sidebarCss}\n    </style>`);
        } else {
            content = content.replace('</head>', `    <style>${sidebarCss}</style>\n</head>`);
        }
        
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    });
});