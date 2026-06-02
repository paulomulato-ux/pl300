(function() {
    const STORAGE_THEME = 'pl300_theme';
    const STORAGE_LANG = 'pl300_lang';

    // Função para aplicar o tema
    const coreSetTheme = function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_THEME, theme);
        updateThemeUI(theme);
        window.dispatchEvent(new CustomEvent('portalThemeChanged', { detail: { theme } }));
    };

    // Função para aplicar o idioma
    const coreSetLang = function(lang) {
        document.body.classList.remove('lang-pt', 'lang-en');
        document.body.classList.add('lang-' + lang);
        localStorage.setItem(STORAGE_LANG, lang);
        updateLangUI(lang);
        window.dispatchEvent(new CustomEvent('portalLangChanged', { detail: { lang } }));
    };

    // Atribuição global imediata
    window.setTheme = coreSetTheme;
    window.setLang = coreSetLang;

    window.toggleTheme = function() {
        const current = localStorage.getItem(STORAGE_THEME) || 'dark';
        const target = current === 'dark' ? 'light' : 'dark';
        window.setTheme(target);
    };

    window.toggleLang = function() {
        const current = localStorage.getItem(STORAGE_LANG) || 'pt';
        const target = current === 'pt' ? 'en' : 'pt';
        window.setLang(target);
    };

    function updateThemeUI(theme) {
        const icon = document.getElementById('theme-icon');
        const label = document.getElementById('theme-label');
        if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
        // quiz topbar duplicate
        const icon2 = document.getElementById('theme-icon-quiz');
        const label2 = document.getElementById('theme-label-quiz');
        if (icon2) icon2.textContent = theme === 'dark' ? '☀️' : '🌙';
        if (label2) label2.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }

    function updateLangUI(lang) {
        const icon = document.getElementById('lang-icon');
        const label = document.getElementById('lang-label');
        if (icon) icon.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
        if (label) label.textContent = lang.toUpperCase();
        // quiz topbar duplicate
        const icon2 = document.getElementById('lang-icon-quiz');
        const label2 = document.getElementById('lang-label-quiz');
        if (icon2) icon2.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
        if (label2) label2.textContent = lang.toUpperCase();
        
        // update injected banner if present
        const injBio = document.getElementById('inj-bio');
        const injConn = document.getElementById('inj-connect');
        if (injBio) injBio.innerText = lang === 'pt' ? "Ajudo empresas na transformação de dados em informações estratégicas para apoiar a tomada de decisão." : "I help companies transform data into strategic information to support decision-making.";
        if (injConn) injConn.innerText = lang === 'pt' ? "Conectar no LinkedIn" : "Connect on LinkedIn";
    }

    // --- Progress Tracking System ---
    const STORAGE_PROGRESS = 'pl300_topics_progress';

    window.getTopicProgress = function() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_PROGRESS)) || {};
        } catch(e) {
            return {};
        }
    };

    window.markTopicCompleted = function(topicKey, isCompleted) {
        const prog = window.getTopicProgress();
        prog[topicKey] = !!isCompleted;
        localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(prog));
        window.dispatchEvent(new CustomEvent('portalProgressChanged', { detail: { topicKey, isCompleted, progress: prog } }));
    };

    function injectBanner() {
        if (document.querySelector('.top-cta-banner')) return;

        const scriptTags = document.querySelectorAll('script[src*="portal-core.js"]');
        let prefix = '';
        if (scriptTags.length > 0) {
            const src = scriptTags[0].getAttribute('src');
            if (src && src.includes('../')) prefix = '../';
        }
        
        const isPt = localStorage.getItem(STORAGE_LANG) !== 'en';
        const bioText = isPt
            ? "Ajudo organizações a converter dados em inteligência de negócio, apoiando decisões estratégicas com análises, indicadores e dashboards orientados a resultados."
            : "I help organizations convert data into business intelligence, supporting strategic decisions with results-oriented analytics, indicators and dashboards.";
        const connectText = isPt ? "Conectar no LinkedIn" : "Connect on LinkedIn";

        const banner = document.createElement('div');
        banner.className = 'top-cta-banner';
        banner.innerHTML = `
            <style>
                .top-cta-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 1001; background: #005699; color: #fff; padding: 10px 5%; font-size: 0.9rem; display: flex; justify-content: center; font-family: 'DM Sans', sans-serif; }
                .cta-banner-content { display: flex; align-items: center; gap: 24px; width: 100%; justify-content: space-between; }
                .cta-profile { display: flex; align-items: center; gap: 16px; text-align: left; }
                .cta-profile-img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255, 255, 255, 0.4); }
                .cta-profile-text { line-height: 1.4; font-family: 'Inter', sans-serif; }
                .cta-profile-name { display: flex; align-items: baseline; gap: 8px; margin-bottom: 2px; }
                .cta-name { font-size: 1.3rem; font-weight: 700; color: #fff; }
                .cta-separator { color: rgba(255, 255, 255, 0.3); font-size: 1rem; }
                .cta-role { font-size: 0.9rem; color: #7dd3fc; font-weight: 500; }
                .cta-profile-bio { font-size: 0.85rem; color: rgba(255, 255, 255, 0.9); font-family: 'DM Sans', sans-serif; }
                .btn-linkedin { display: flex; align-items: center; gap: 8px; background: #3b82f6; color: #fff; padding: 10px 20px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; font-size: 0.9rem; white-space: nowrap; border: none; }
                .btn-linkedin:hover { background: #2563eb; color: #fff; opacity: 1; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); }
                
                body { padding-top: 76px !important; }
                .settings-panel { top: 91px !important; }
                .layout-wrapper { height: calc(100vh - 76px) !important; margin-top: 0 !important; }
                .header, .site-header, .quiz-topbar { top: 76px !important; } 
                .main-container { padding-top: 156px !important; }
                
                @media(max-width:700px) {
                    .cta-banner-content { flex-direction: column; gap: 16px; text-align: center; }
                    .cta-profile { flex-direction: column; text-align: center; gap: 12px; }
                    .cta-profile-name { flex-direction: column; align-items: center; gap: 4px; }
                    .cta-separator { display: none; }
                    body { padding-top: 160px !important; }
                    .settings-panel { top: 175px !important; }
                    .layout-wrapper { height: calc(100vh - 160px) !important; margin-top: 0 !important; }
                    .header, .site-header, .quiz-topbar { top: 160px !important; }
                    .main-container { padding-top: 240px !important; }
                }
            </style>
            <div class="cta-banner-content">
                <div class="cta-profile">
                    <img src="${prefix}paulo.jpg" alt="Paulo Mulato" class="cta-profile-img">
                    <div class="cta-profile-text">
                        <div class="cta-profile-name">
                            <span class="cta-name">Paulo Mulato</span>
                            <span class="cta-separator">|</span>
                            <span class="cta-role">Data Analyst</span>
                        </div>
                        <div class="cta-profile-bio" id="inj-bio">${bioText}</div>
                    </div>
                </div>
                <a href="https://www.linkedin.com/in/paulomulato/" target="_blank" class="btn-linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
                    <span id="inj-connect">${connectText}</span>
                </a>
            </div>
        `;
        document.body.prepend(banner);
    }

    function init() {
        const savedTheme = localStorage.getItem(STORAGE_THEME) || 'dark';
        const savedLang = localStorage.getItem(STORAGE_LANG) || 'pt';
        injectBanner();
        window.setTheme(savedTheme);
        window.setLang(savedLang);
    }

    // Inicialização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
