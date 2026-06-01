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
        if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
        // quiz topbar duplicate
        const icon2 = document.getElementById('theme-icon-quiz');
        const label2 = document.getElementById('theme-label-quiz');
        if (icon2) icon2.textContent = theme === 'dark' ? '🌙' : '☀️';
        if (label2) label2.textContent = theme === 'dark' ? 'Dark' : 'Light';
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

    function init() {
        const savedTheme = localStorage.getItem(STORAGE_THEME) || 'dark';
        const savedLang = localStorage.getItem(STORAGE_LANG) || 'pt';
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
