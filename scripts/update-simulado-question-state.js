const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'simulado', 'simulado.js');
let content = fs.readFileSync(file, 'utf8');
const startMarker = 'const questionBank = {';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  throw new Error('Start marker not found');
}
let idx = startIdx + startMarker.length - 1;
let depth = 0;
let inString = false;
let stringChar = '';
let escape = false;
for (; idx < content.length; idx++) {
  const ch = content[idx];
  if (inString) {
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === stringChar) { inString = false; stringChar = ''; }
    continue;
  }
  if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
  if (ch === '{') { depth++; continue; }
  if (ch === '}') {
    depth--;
    if (depth === 0) {
      const endIdx = idx + 1;
      const before = content.slice(0, startIdx);
      const after = content.slice(endIdx);
      const replacement = `// ============================================================\n//  BANCO DE QUESTÕES (CARREGADO A PARTIR DE simulado/questions.js)\n// ============================================================\nlet questionBank = window.questionBank || {};\n\n`;
      content = before + replacement + after;
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
      process.exit(0);
    }
  }
}
throw new Error('Matching closing brace not found');
