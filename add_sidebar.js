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
        content = content.replace(/<div class="settings-panel"[\s\S]*?<div class="layout-wrapper">[\s\S]*?<div class="content-area">/i, '');
        content = content.replace(/    <\/div>\n    <\/div>\n<\/body>/i, '</body>');
        content = content.replace(/<div class="layout-wrapper">[\s\S]*?<div class="content-area">/i, '');
        content = content.replace(/\/\* Sidebar Styles \*\/[\s\S]*?\[lang-content\] \{ display: none; \}/g, '');
        
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
    <div class="settings-panel" id="settings-panel">
      <button class="settings-btn" id="btn-lang" onclick="toggleLang()" title="Switch language / Alternar idioma">
        <span class="btn-icon" id="lang-icon">🇧🇷</span>
        <span id="lang-label">PT</span>
      </button>
      <button class="settings-btn" id="btn-theme" onclick="toggleTheme()" title="Toggle dark/light mode">
        <span class="btn-icon" id="theme-icon">🌙</span>
        <span id="theme-label">Dark</span>
      </button>
    </div>
    <div class="layout-wrapper">
        <aside class="sidebar">
            <a href="../index.html" class="back-btn">
                <span lang-content="pt">&omacr; Voltar para Tela Principal</span>
                <span lang-content="en">&omacr; Back to Main Portal</span>
            </a>
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
        body { margin: 0 !important; padding: 0 !important; display: flex; height: 100vh; overflow: hidden; background-color: var(--bg-main); color: var(--text-primary); }
        .layout-wrapper { display: flex; width: 100%; height: 100vh; }
        .sidebar { width: 280px; background: var(--bg-secondary); color: var(--text-primary); padding: 20px; overflow-y: auto; flex-shrink: 0; font-family: Arial, sans-serif; border-right: 1px solid var(--border-color); }
        .sidebar a { color: var(--text-primary); text-decoration: none; display: block; padding: 8px 0; opacity: 0.8; }
        .sidebar a:hover, .sidebar a.active { color: var(--primary-color); font-weight: bold; opacity: 1; }
        .sidebar h3 { margin-top: 30px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary); }
        .sidebar .back-btn { font-weight: bold; color: #e74c3c; display: flex; align-items: center; gap: 5px; margin-bottom: 20px; }
        .sidebar .back-btn:hover { color: #c0392b; text-decoration: none; }
        .sidebar ul { list-style: none; padding: 0; margin: 0; }
        .content-area { flex-grow: 1; overflow-y: auto; padding: 20px; background-color: var(--bg-main); }
        .container { margin: 0 auto; max-width: 900px; background: var(--surface-card); padding: 30px; border-radius: 12px; box-shadow: var(--shadow); border: 1px solid var(--border-color); }
        
        /* Settings Panel */
        .settings-panel { position: fixed; top: 15px; right: 15px; z-index: 1000; display: flex; gap: 8px; }
        .settings-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; border: 1px solid var(--border-color); background: var(--surface-card); color: var(--text-primary); cursor: pointer; font-size: 0.85rem; font-weight: 600; transition: all 0.2s; }
        .settings-btn:hover { border-color: var(--primary-color); transform: translateY(-1px); }
        
        /* Language Utilities */
        [lang-content] { display: none; }
        body.lang-pt [lang-content="pt"] { display: inline; }
        body.lang-en [lang-content="en"] { display: inline; }
        body.lang-pt div[lang-content="pt"], body.lang-pt p[lang-content="pt"], body.lang-pt h1[lang-content="pt"], body.lang-pt h2[lang-content="pt"], body.lang-pt h3[lang-content="pt"] { display: block; }
        body.lang-en div[lang-content="en"], body.lang-en p[lang-content="en"], body.lang-en h1[lang-content="en"], body.lang-en h2[lang-content="en"], body.lang-en h3[lang-content="en"] { display: block; }
        `;

        if (!content.includes('/* Sidebar Styles */')) {
            if (content.includes('</style>')) {
                content = content.replace('</style>', `${sidebarCss}\n    </style>`);
            } else {
                content = content.replace('</head>', `    <style>${sidebarCss}</style>\n</head>`);
            }
        }

        // Injetar scripts globais
        if (!content.includes('portal-core.js')) {
            content = content.replace('</head>', `    <link rel="stylesheet" href="../portal-style.css">\n    <script src="../portal-core.js"></script>\n</head>`);
        }
        
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    });
});
