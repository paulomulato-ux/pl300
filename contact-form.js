/**
 * contact-form.js — PL-300 Portal
 * Define window.__initContactForm(dict) chamado pelo index.html após DOMContentLoaded.
 * Responsabilidades:
 *   • Validação progressiva (onBlur) com feedback visual
 *   • Contador de caracteres da mensagem
 *   • Estados do botão: padrão → carregando → sucesso / erro
 *   • POST para /api/sendContact (Resend via Vercel)
 *   • Exibição de painel de sucesso ou painel de erro pós-envio
 */

(function () {
    'use strict';

    /* ------------------------------------------------------------------ */
    /*  Helpers de validação                                               */
    /* ------------------------------------------------------------------ */

    function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    }

    function validateField(id, value, dict, lang) {
        const fieldEl  = document.getElementById(id);
        const errorEl  = document.getElementById(id + '-error');
        if (!fieldEl || !errorEl) return true;

        let msg = '';

        if (id === 'contact-name') {
            if (!value || value.trim().length < 3) {
                msg = lang === 'en'
                    ? 'Name must be at least 3 characters.'
                    : 'Nome deve ter pelo menos 3 caracteres.';
            }
        } else if (id === 'contact-email') {
            if (!value || !isValidEmail(value)) {
                msg = dict.contact_invalid_email
                    ? dict.contact_invalid_email[lang]
                    : (lang === 'en' ? 'Please enter a valid email.' : 'Informe um e-mail válido.');
            }
        } else if (id === 'contact-message') {
            if (!value || value.trim().length < 10) {
                msg = lang === 'en'
                    ? 'Message must be at least 10 characters.'
                    : 'Mensagem deve ter pelo menos 10 caracteres.';
            }
        }

        if (msg) {
            fieldEl.classList.add('field-invalid');
            fieldEl.classList.remove('field-valid');
            errorEl.textContent = msg;
            errorEl.classList.add('visible');
            errorEl.classList.remove('sr-only');
        } else {
            fieldEl.classList.remove('field-invalid');
            fieldEl.classList.add('field-valid');
            errorEl.textContent = '';
            errorEl.classList.remove('visible');
            errorEl.classList.add('sr-only');
        }

        return msg === '';
    }

    /* ------------------------------------------------------------------ */
    /*  Painel de Sucesso                                                  */
    /* ------------------------------------------------------------------ */

    function buildSuccessPanel(email, lang) {
        const isEn = lang === 'en';
        const panel = document.createElement('div');
        panel.className = 'contact-success-panel';
        panel.setAttribute('role', 'alert');
        panel.innerHTML = `
            <div style="font-size:3rem;margin-bottom:12px;">✅</div>
            <h3>${isEn ? 'Message Sent!' : 'Mensagem Enviada!'}</h3>
            <p>${isEn
                ? 'Thank you! I received your message and will reply within 24 hours.'
                : 'Obrigado! Recebi sua mensagem e responderei em até 24 horas.'}</p>
            ${email ? `<p style="margin-top:8px;font-size:0.85rem;">
                📧 ${isEn ? 'Confirmation sent to' : 'Confirmação enviada para'}:
                <strong>${email}</strong>
            </p>` : ''}
            <ul class="next-steps" style="margin-top:20px;">
                <li>→ <a href="simulado/simulado.html">${isEn ? 'Back to Simulator' : 'Voltar ao Simulado'}</a></li>
                <li>→ <a href="05-Labs-Oficiais/links-uteis.html">${isEn ? 'Useful Links' : 'Links Úteis'}</a></li>
            </ul>
        `;
        return panel;
    }

    /* ------------------------------------------------------------------ */
    /*  Painel de Erro                                                     */
    /* ------------------------------------------------------------------ */

    function buildErrorPanel(detail, lang, onRetry) {
        const isEn = lang === 'en';
        const panel = document.createElement('div');
        panel.className = 'contact-error-panel';
        panel.setAttribute('role', 'alert');
        panel.innerHTML = `
            <p style="font-size:1.3rem;margin-bottom:8px;">⚠️ <strong>${isEn ? 'Failed to send' : 'Erro ao enviar'}</strong></p>
            <p style="color:var(--text-sub);font-size:0.9rem;margin-bottom:12px;">${isEn
                ? 'Something went wrong. Check your connection and try again.'
                : 'Algo deu errado. Verifique sua conexão e tente novamente.'}</p>
            ${detail ? `<p style="font-size:0.78rem;color:var(--text-sub);margin-bottom:16px;font-family:'JetBrains Mono',monospace;">${detail}</p>` : ''}
            <p style="font-size:0.85rem;margin-bottom:8px;">${isEn ? 'Alternatives:' : 'Alternativas:'}</p>
            <ul style="font-size:0.85rem;display:flex;flex-direction:column;gap:6px;">
                <li>→ <a href="https://www.linkedin.com/in/paulomulato/" target="_blank">LinkedIn</a></li>
                <li>→ <a href="mailto:paulomulato@gmail.com">paulomulato@gmail.com</a></li>
            </ul>
        `;

        const retryBtn = document.createElement('button');
        retryBtn.className = 'btn-primary';
        retryBtn.style.cssText = 'margin-top:16px;font-size:0.9rem;padding:10px 24px;';
        retryBtn.textContent = isEn ? '↩ Try again' : '↩ Tentar novamente';
        retryBtn.addEventListener('click', onRetry);
        panel.appendChild(retryBtn);

        return panel;
    }

    /* ------------------------------------------------------------------ */
    /*  Gerenciar estado do botão                                          */
    /* ------------------------------------------------------------------ */

    function setBtnState(btn, state, lang) {
        const isEn = lang === 'en';
        btn.disabled = false;
        btn.className = 'btn-primary';

        switch (state) {
            case 'loading':
                btn.disabled = true;
                btn.classList.add('btn-loading');
                btn.innerHTML = `<span class="contact-spinner"></span> ${isEn ? 'Sending…' : 'Enviando…'}`;
                break;
            case 'success':
                btn.classList.add('btn-success');
                btn.innerHTML = `✅ ${isEn ? 'Sent!' : 'Enviado!'}`;
                break;
            case 'error':
                btn.classList.add('btn-error');
                btn.innerHTML = `❌ ${isEn ? 'Error — try again' : 'Erro — tente novamente'}`;
                break;
            default:
                btn.innerHTML = isEn ? 'Send Message' : 'Enviar Mensagem';
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Inicialização principal                                            */
    /* ------------------------------------------------------------------ */

    window.__initContactForm = function (dict) {

        const form       = document.getElementById('contact-form');
        const card       = document.getElementById('contact-card');
        const nameEl     = document.getElementById('contact-name');
        const emailEl    = document.getElementById('contact-email');
        const messageEl  = document.getElementById('contact-message');
        const submitBtn  = document.getElementById('contact-submit');
        const countEl    = document.getElementById('contact-message-count');

        if (!form || !nameEl || !emailEl || !messageEl || !submitBtn) return;

        const getLang = () => localStorage.getItem('pl300_lang') || 'pt';

        /* ---------- Contador de caracteres em tempo real ---------- */
        messageEl.addEventListener('input', () => {
            const len = messageEl.value.length;
            if (countEl) {
                const min = 10;
                countEl.textContent = `${len}/${min}`;
                countEl.style.color = len >= min ? 'var(--success)' : 'var(--text-sub)';
            }
        });

        /* ---------- Validação onBlur (progressive disclosure) ----- */
        [nameEl, emailEl, messageEl].forEach(el => {
            el.addEventListener('blur', () => {
                validateField(el.id, el.value, dict, getLang());
            });
            // Remove estado de erro ao começar a digitar novamente
            el.addEventListener('input', () => {
                if (el.classList.contains('field-invalid') && el.value.trim().length > 0) {
                    // Revalida silenciosamente só se o campo já foi tocado (tem class invalid)
                    if (el.id === 'contact-email' && el.value.length > 4) {
                        validateField(el.id, el.value, dict, getLang());
                    } else if (el.id !== 'contact-email') {
                        validateField(el.id, el.value, dict, getLang());
                    }
                }
            });
        });

        /* ---------- Submissão do formulário ----------------------- */
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const lang = getLang();

            // Validação completa antes de enviar
            const nameOk    = validateField('contact-name',    nameEl.value,    dict, lang);
            const emailOk   = validateField('contact-email',   emailEl.value,   dict, lang);
            const messageOk = validateField('contact-message', messageEl.value, dict, lang);

            if (!nameOk || !emailOk || !messageOk) {
                // Foca no primeiro campo inválido
                if (!nameOk)    { nameEl.focus();    return; }
                if (!emailOk)   { emailEl.focus();   return; }
                if (!messageOk) { messageEl.focus(); return; }
                return;
            }

            // Estado: carregando
            setBtnState(submitBtn, 'loading', lang);

            const payload = {
                name:    nameEl.value.trim(),
                email:   emailEl.value.trim(),
                message: messageEl.value.trim()
            };

            try {
                const resp = await fetch('/api/sendContact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (resp.ok) {
                    // Sucesso: substituir conteúdo do card
                    setBtnState(submitBtn, 'success', lang);
                    setTimeout(() => {
                        if (card) {
                            card.innerHTML = '';
                            card.appendChild(buildSuccessPanel(payload.email, lang));
                        }
                    }, 600);
                } else {
                    const errData = await resp.json().catch(() => ({}));
                    const detail  = errData.detail || `HTTP ${resp.status}`;
                    setBtnState(submitBtn, 'error', lang);

                    // Painel de erro inline (abaixo do form)
                    showErrorPanel(card, form, detail, lang);
                }
            } catch (err) {
                setBtnState(submitBtn, 'error', lang);
                showErrorPanel(card, form, err.message, lang);
            }
        });

        /* ---------- Reaplica i18n quando o idioma muda ------------ */
        window.addEventListener('portalLangChanged', () => {
            const lang = getLang();
            // Atualiza botão se estiver em estado padrão
            if (!submitBtn.disabled && !submitBtn.classList.contains('btn-success') && !submitBtn.classList.contains('btn-error')) {
                setBtnState(submitBtn, 'default', lang);
            }
        });
    };

    /* ------------------------------------------------------------------ */
    /*  Painel de erro inline                                              */
    /* ------------------------------------------------------------------ */

    function showErrorPanel(card, form, detail, lang) {
        // Remove painel de erro anterior, se houver
        const oldPanel = card && card.querySelector('.contact-error-panel');
        if (oldPanel) oldPanel.remove();

        if (!card) return;

        const onRetry = () => {
            const panel = card.querySelector('.contact-error-panel');
            if (panel) panel.remove();
            const btn = document.getElementById('contact-submit');
            if (btn) setBtnState(btn, 'default', lang);
        };

        const panel = buildErrorPanel(detail, lang, onRetry);
        card.appendChild(panel);
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

})();
