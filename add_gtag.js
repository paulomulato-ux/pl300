const fs = require('fs');
const path = require('path');

const gtag = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RPBVGEK9RD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RPBVGEK9RD');
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
            if (content.includes('G-RPBVGEK9RD')) {
                console.log('Skipping ' + fullPath);
                return;
            }
            content = content.replace(/<head>/i, '<head>' + gtag);
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log('Updated ' + fullPath);
        }
    });
}

walkDir(process.cwd());