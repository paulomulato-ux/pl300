const fs = require('fs');
const path = require('path');

const clarityTag = `
<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c|a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "wzwdkspl1k");
</script>
`;

function walkDir(dir) {
    if (dir.includes('node_modules') || dir.includes('.git')) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('wzwdkspl1k')) {
                console.log('Skipping ' + fullPath);
                return;
            }
            content = content.replace(/ <\/head> /i, clarityTag + '</head>');
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log('Updated ' + fullPath);
        }
    });
}

walkDir(process.cwd());