const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, '..', 'simulado', 'questions.json');
const jsPath = path.join(__dirname, '..', 'simulado', 'questions.js');

if (!fs.existsSync(jsonPath)) {
  throw new Error(`Arquivo não encontrado: ${jsonPath}`);
}

const data = fs.readFileSync(jsonPath, 'utf8');
JSON.parse(data);
fs.writeFileSync(jsPath, 'window.questionBank = ' + data + ';', 'utf8');
console.log(`Gerado: ${jsPath}`);
