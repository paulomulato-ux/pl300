const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'simulado', 'simulado.js');
const content = fs.readFileSync(filePath, 'utf8');
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
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === '\\') {
      escape = true;
      continue;
    }
    if (ch === stringChar) {
      inString = false;
      stringChar = '';
    }
    continue;
  }
  if (ch === '"' || ch === "'") {
    inString = true;
    stringChar = ch;
    continue;
  }
  if (ch === '{') {
    depth++;
    continue;
  }
  if (ch === '}') {
    depth--;
    if (depth === 0) {
      const objectText = content.slice(startIdx + 'const questionBank = '.length, idx + 1);
      const questionBank = new Function('return ' + objectText)();
      const outPath = path.join(__dirname, '..', 'simulado', 'questions.json');
      fs.writeFileSync(outPath, JSON.stringify(questionBank, null, 2), 'utf8');
      console.log('Wrote', outPath);
      process.exit(0);
    }
  }
}
throw new Error('Did not find matching closing brace');
