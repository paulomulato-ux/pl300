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
            ? "Transformo dados em inteligência de negócios, auxiliando empresas na tomada de decisões estratégicas por meio de análises, indicadores e dashboards."
            : "I help companies transform data into strategic information to support decision-making";
        const connectText = isPt ? "Conectar no LinkedIn" : "Connect on LinkedIn";

        const banner = document.createElement('div');
        banner.className = 'top-cta-banner';
        banner.innerHTML = `
            <style>
                .top-cta-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 1001; background: #005699; color: #fff; padding: 10px 5%; font-size: 0.9rem; display: flex; justify-content: center; font-family: 'DM Sans', sans-serif; }
                .cta-banner-content { display: flex; align-items: center; gap: 24px; width: 100%; justify-content: space-between; }
                .cta-profile { display: flex; align-items: center; gap: 16px; text-align: left; }
                .cta-profile-img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255, 255, 255, 0.4); flex-shrink: 0; }
                .cta-profile-text { line-height: 1.4; font-family: 'Inter', sans-serif; }
                .cta-profile-name { display: flex; align-items: baseline; gap: 8px; margin-bottom: 2px; }
                .cta-name { font-size: 1.1rem; font-weight: 700; color: #fff; }
                .cta-separator { color: rgba(255, 255, 255, 0.3); font-size: 1rem; }
                .cta-role { font-size: 0.9rem; color: #7dd3fc; font-weight: 500; }
                .cta-profile-bio { font-size: 0.85rem; color: rgba(255, 255, 255, 0.9); font-family: 'DM Sans', sans-serif; line-height: 1.3; }
                .btn-linkedin { display: flex; align-items: center; gap: 8px; background: #3b82f6; color: #fff; padding: 10px 20px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; font-size: 0.9rem; white-space: nowrap; border: none; }
                .btn-linkedin:hover { background: #2563eb; color: #fff; opacity: 1; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); }
                
                body { padding-top: var(--banner-h, 76px) !important; }
                .settings-panel { top: calc(var(--banner-h, 76px) + 8px) !important; }
                .layout-wrapper { height: calc(100vh - var(--banner-h, 76px)) !important; margin-top: 0 !important; }
                .header, .site-header, .quiz-topbar { top: var(--banner-h, 76px) !important; } 
                .main-container { padding-top: 156px !important; }
                
                @media(max-width:700px) {
                    .cta-banner-content { flex-direction: column; gap: 8px; text-align: center; }
                    .cta-profile { flex-direction: row; align-items:center; gap: 12px; }
                    .cta-profile-img { width:40px; height:40px; }
                    .cta-profile-text { font-size:0.85rem; }
                    .cta-profile-name { flex-direction:row; align-items:center; gap:6px; }
                    .cta-separator { display: none; }
                    body { padding-top: var(--banner-h, 96px) !important; }
                    .settings-panel { top: calc(var(--banner-h, 96px) + 6px) !important; }
                    .layout-wrapper { height: calc(100vh - var(--banner-h, 96px)) !important; margin-top: 0 !important; }
                    .header, .site-header, .quiz-topbar { top: var(--banner-h, 96px) !important; }
                    .main-container { padding-top: 140px !important; }
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span id="inj-connect">${connectText}</span>
                </a>
            </div>
        `;
        document.body.prepend(banner);

        const adjustBannerHeight = () => {
            const h = banner.offsetHeight;
            const path = window.location.pathname;
            const isHome = path.endsWith('index.html') || path.endsWith('/') || path.endsWith('pl300-portal/');
            if (!isHome) {
                document.documentElement.style.setProperty('--banner-h', h + 'px');
            }
        };
        setTimeout(adjustBannerHeight, 50);
        window.addEventListener('resize', adjustBannerHeight);
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

    // Register service worker for PWA/offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(reg) {
                console.log('ServiceWorker registrado:', reg.scope);
            }).catch(function(err) {
                console.warn('ServiceWorker falhou:', err);
            });
        });
    }
})();
