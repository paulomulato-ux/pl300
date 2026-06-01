const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'README.html');
let content = fs.readFileSync(filePath, 'utf-8');

// Remover se já existe
content = content.replace(/<div class="settings-panel"[\s\S]*?<div class="layout-wrapper">[\s\S]*?<div class="content-area">/i, '');
content = content.replace(/    <\/div>\n    <\/div>\n<\/body>/i, '</body>');
content = content.replace(/<div class="layout-wrapper">[\s\S]*?<div class="content-area">/i, '');
content = content.replace(/\/\* Sidebar Styles \*\/[\s\S]*?\[lang-content\] \{ display: none; \}/g, '');

content = content.replace(/background-color:\s*#f4f4f4;/g, 'background-color: var(--bg-main);');
content = content.replace(/background:\s*#fff;/g, 'background: var(--surface-card);');
content = content.replace(/color:\s*#333;/g, 'color: var(--text-primary);');
content = content.replace(/background-color:\s*#eee;/g, 'background-color: var(--bg-secondary);');
content = content.replace(/background-color:\s*#f2f2f2;/g, 'background-color: var(--bg-secondary);');
content = content.replace(/border:\s*1px\s*solid\s*#ddd;/g, 'border: 1px solid var(--border-color);');

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
            <a href="index.html" class="back-btn">
                <span lang-content="pt">&omacr; Voltar para Tela Principal</span>
                <span lang-content="en">&omacr; Back to Main Portal</span>
            </a>
            <h3 lang-content="pt">Materiais Complementares</h3>
            <h3 lang-content="en">Additional Materials</h3>
            <ul class="nav-links">
                <li><a href="05-Labs-Oficiais/guia-labs.html">
                <span lang-content="pt">Guia Labs</span>
                <span lang-content="en">Labs Guide</span>
            </a></li>
                <li><a href="05-Labs-Oficiais/links-uteis.html">
                <span lang-content="pt">Links Úteis</span>
                <span lang-content="en">Useful Links</span>
            </a></li>
                <li><a href="README.html" class="active">
                <span lang-content="pt">Sobre o Projeto (README)</span>
                <span lang-content="en">About (README)</span>
            </a></li>
            </ul>
        </aside>
        <div class="content-area">`;

if (!content.includes('class="layout-wrapper"')) {
    content = content.replace(/<body>/i, `<body>\n    ${sidebarHtml}`);
    content = content.replace(/<\/body>/i, `    </div>\n    </div>\n</body>`);
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

if (!content.includes('portal-core.js')) {
    content = content.replace('</head>', `    <link rel="stylesheet" href="portal-style.css">\n    <script src="portal-core.js?v=2"></script>\n</head>`);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('README.html updated.');
