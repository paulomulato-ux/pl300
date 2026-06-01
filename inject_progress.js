const fs = require('fs');
const path = require('path');
const dirs = ['01-Preparar-Dados', '02-Modelar-Dados', '03-Visualizar-e-Analisar', '04-Implementar-e-Manter-Entregaveis'];

let totalModified = 0;

for (const dir of dirs) {
    const dirPath = path.join('c:/Users/Public/Apps/pl300-portal', dir);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes('topic-completion')) continue;

        const injection = `
<!-- PROGRESSO DO TÓPICO -->
<div class="topic-completion" style="text-align:center; padding: 30px 0; margin-top: 40px; border-top: 1px solid var(--border-color);">
    <button id="btn-complete-topic" onclick="toggleTopicCompletion()" style="padding: 12px 24px; border-radius: 8px; border: 2px solid var(--border-color); background: transparent; color: var(--text-primary); font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;">
        <span id="completion-icon">⭕</span> <span id="completion-text">Marcar como Concluído</span>
    </button>
</div>
<script>
    const topicKey = window.location.pathname.split('/').pop().replace('.html', '');
    function toggleTopicCompletion() {
        const prog = window.getTopicProgress ? window.getTopicProgress() : {};
        const isNowCompleted = !prog[topicKey];
        if (window.markTopicCompleted) window.markTopicCompleted(topicKey, isNowCompleted);
        updateCompletionUI(isNowCompleted);
    }
    function updateCompletionUI(isCompleted) {
        const btn = document.getElementById('btn-complete-topic');
        const icon = document.getElementById('completion-icon');
        const text = document.getElementById('completion-text');
        if(!btn) return;
        if(isCompleted) {
            btn.style.borderColor = "var(--success, #2EA043)";
            btn.style.color = "var(--success, #2EA043)";
            btn.style.background = "rgba(46, 160, 67, 0.1)";
            icon.innerText = "✅";
            text.innerText = "Concluído";
        } else {
            btn.style.borderColor = "var(--border-color)";
            btn.style.color = "var(--text-primary)";
            btn.style.background = "transparent";
            icon.innerText = "⭕";
            text.innerText = "Marcar como Concluído";
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        const prog = window.getTopicProgress ? window.getTopicProgress() : {};
        updateCompletionUI(!!prog[topicKey]);
    });
</script>
</div>`;

        if (content.includes('<hr /></div>')) {
            content = content.replace('<hr /></div>', '<hr />\\n' + injection + '\\n</div>');
            fs.writeFileSync(filePath, content);
            totalModified++;
        } else {
            // Regex to match the end of the file closing divs
            const regex = /(<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/body>\s*<\/html>)/;
            if (regex.test(content)) {
                content = content.replace(regex, injection + '\\n$1');
                fs.writeFileSync(filePath, content);
                totalModified++;
            } else {
                console.log('Could not inject automatically in', filePath);
            }
        }
    }
}
console.log('Total files modified:', totalModified);
