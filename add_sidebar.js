const fs = require('fs');
const path = require('path');

const dirs = [
    '01-Preparar-Dados',
    '02-Modelar-Dados',
    '03-Visualizar-e-Analisar',
    '04-Implementar-e-Manter-Entregaveis',
    '05-Labs-Oficiais'
];

const titleTranslations = {
    "Carregar Dados": "Load Data",
    "Obter Dados Power Bi": "Get Data Power BI",
    "Resumo": "Summary",
    "Transformar E Limpar Dados": "Transform & Clean Data",
    "Boas Praticas Modelagem": "Modeling Best Practices",
    "Design Modelo De Dados": "Data Model Design",
    "Criar Medidas Dax": "Create DAX Measures",
    "Otimizacao De Desempenho": "Performance Optimization",
    "Analisar Performance Relatorios": "Analyze Report Performance",
    "Criar Relatorios": "Create Reports",
    "Visualizacoes Avancadas": "Advanced Visualizations",
    "Compartilhamento E Governanca": "Sharing & Governance",
    "Gerenciar Workspaces": "Manage Workspaces",
    "Seguranca Rls": "RLS Security",
    "Guia Labs": "Labs Guide",
    "Links Uteis": "Useful Links"
};

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
        
        // Forçar atualização sempre para garantir bilinguismo no menu
        // Limpar modificações antigas se existirem para evitar duplicidade
        // Remove site-header (with or without closing tag)
        content = content.replace(/<header class="site-header[^"]*"[^>]*>[\s\S]*?<\/header>\s*/gi, '');
        content = content.replace(/<header class="site-header[\s\S]*?(?=<div class="container">)/gi, '');
        content = content.replace(/<div class="settings-panel"[\s\S]*?<div class="layout-wrapper">[\s\S]*?<div class="content-area">/i, '');
        content = content.replace(/    <\/div>\n    <\/div>\n<\/body>/i, '</body>');
        content = content.replace(/<div class="layout-wrapper">[\s\S]*?<div class="content-area">/i, '');
        // Always remove old CSS block so it's always freshly injected
        content = content.replace(/\/\* Sidebar Styles \*\/[\s\S]*?\{ display: block; \}\s*/g, '');
        // Clean up excessive blank lines
        content = content.replace(/\n{4,}/g, '\n\n');
        
        // Remover estilos hardcoded que quebram o Dark Mode
        content = content.replace(/background-color:\s*#f4f4f4;/g, 'background-color: var(--bg-main);');
        content = content.replace(/background:\s*#fff;/g, 'background: var(--surface-card);');
        content = content.replace(/color:\s*#333;/g, 'color: var(--text-primary);');
        content = content.replace(/background-color:\s*#eee;/g, 'background-color: var(--bg-secondary);');
        content = content.replace(/background-color:\s*#f2f2f2;/g, 'background-color: var(--bg-secondary);');
        content = content.replace(/border:\s*1px\s*solid\s*#ddd;/g, 'border: 1px solid var(--border-color);');

        const navLinks = files.map(f => {
            const activeClass = f === file ? ' class="active"' : '';
            const titlePt = titleize(f);
            const titleEn = titleTranslations[titlePt] || titlePt;
            return `<li><a href="${f}"${activeClass}>
                <span lang-content="pt">${titlePt}</span>
                <span lang-content="en">${titleEn}</span>
            </a></li>`;
        }).join('\n                ');

        const sidebarHtml = `
    <div class="layout-wrapper">
        <aside class="sidebar">
            <div class="sidebar-top">
                <a href="../index.html" class="back-btn" id="btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>
                    <span lang-content="pt">Voltar</span>
                    <span lang-content="en">Back</span>
                </a>
                <div class="sidebar-controls">
                    <button class="settings-btn" id="btn-lang" onclick="toggleLang()" title="Switch language">
                        <span class="btn-icon" id="lang-icon">🇧🇷</span>
                        <span id="lang-label">PT</span>
                    </button>
                    <button class="settings-btn" id="btn-theme" onclick="toggleTheme()" title="Toggle theme">
                        <span class="btn-icon" id="theme-icon">🌙</span>
                        <span id="theme-label">Dark</span>
                    </button>
                </div>
            </div>
            <h3 lang-content="pt">Navegação</h3>
            <h3 lang-content="en">Navigation</h3>
            <ul class="nav-links">
                ${navLinks}
            </ul>
        </aside>
        <div class="content-area">`;

        // Injetar sidebar
        if (!content.includes('class="layout-wrapper"')) {
            content = content.replace(/<body>/i, `<body>\n    ${sidebarHtml}`);
            content = content.replace(/<\/body>/i, `    </div>\n    </div>\n</body>`);
        } else {
            // Se já tem, vamos apenas atualizar o conteúdo da sidebar
            content = content.replace(/<div class="settings-panel"[\s\S]*?<div class="content-area">/i, sidebarHtml);
        }

        const sidebarCss = `
        /* Sidebar Styles */
        body { margin: 0 !important; padding: 0 !important; display: flex; flex-direction: column; min-height: 100vh; background-color: var(--bg-main); color: var(--text-primary); }
        .layout-wrapper { display: flex; width: 100%; height: 100vh; }
        .sidebar { width: 240px; background: var(--bg-secondary); color: var(--text-primary); padding: 16px; overflow-y: auto; flex-shrink: 0; font-family: Arial, sans-serif; border-right: 1px solid var(--border-color); display: flex; flex-direction: column; }
        .sidebar-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color); flex-shrink: 0; }
        .sidebar-controls { display: flex; gap: 6px; }
        .back-btn { display: flex; align-items: center; gap: 6px; font-weight: 700; color: #e74c3c; text-decoration: none; font-size: 0.85rem; flex-shrink: 0; }
        .back-btn:hover { color: #c0392b; opacity: 1; }
        .sidebar a { color: var(--text-primary); text-decoration: none; display: block; padding: 7px 0; opacity: 0.8; font-size: 0.9rem; }
        .sidebar a:hover, .sidebar a.active { color: var(--primary-color); font-weight: bold; opacity: 1; }
        .sidebar h3 { margin: 0 0 8px 0; padding-bottom: 8px; border-bottom: 1px solid var(--border-color); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary); }
        .sidebar ul { list-style: none; padding: 0; margin: 0; flex-grow: 1; }
        .content-area { flex-grow: 1; overflow-y: auto; padding: 20px; background-color: var(--bg-main); }
        .container { margin: 0 auto; max-width: 900px; background: var(--surface-card); padding: 30px; border-radius: 12px; box-shadow: var(--shadow); border: 1px solid var(--border-color); }
        .settings-btn { display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 20px; border: 1px solid var(--border-color); background: var(--surface-card); color: var(--text-primary); cursor: pointer; font-size: 0.75rem; font-weight: 600; transition: all 0.2s; white-space: nowrap; }
        .settings-btn:hover { border-color: var(--primary-color); }
        [lang-content] { display: none; }
        body.lang-pt [lang-content="pt"] { display: inline; }
        body.lang-en [lang-content="en"] { display: inline; }
        body.lang-pt div[lang-content="pt"], body.lang-pt p[lang-content="pt"], body.lang-pt h1[lang-content="pt"], body.lang-pt h2[lang-content="pt"], body.lang-pt h3[lang-content="pt"] { display: block; }
        body.lang-en div[lang-content="en"], body.lang-en p[lang-content="en"], body.lang-en h1[lang-content="en"], body.lang-en h2[lang-content="en"], body.lang-en h3[lang-content="en"] { display: block; }
        `;

        // Always inject fresh CSS (old block already removed above)
        if (content.includes('</style>')) {
            content = content.replace('</style>', `${sidebarCss}\n    </style>`);
        } else {
            content = content.replace('</head>', `    <style>${sidebarCss}</style>\n</head>`);
        }

        // Injetar scripts globais
        if (!content.includes('portal-core.js')) {
            content = content.replace('</head>', `    <link rel="stylesheet" href="../portal-style.css">\n    <script src="../portal-core.js"></script>\n</head>`);
        }
        
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    });
});
