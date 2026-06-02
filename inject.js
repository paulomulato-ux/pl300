
const fs = require('fs');
let simulado = fs.readFileSync('simulado/simulado.js', 'utf8');
const bankJSON = fs.readFileSync('current_bank.json', 'utf8');
const startStr = 'const questionBank = {';
const startIdx = simulado.indexOf(startStr);
const endStr = '\n};\n';
const endIdx = simulado.indexOf(endStr, startIdx);
const newSimulado = simulado.substring(0, startIdx) + 'const questionBank = ' + bankJSON + ';\n' + simulado.substring(endIdx + endStr.length - 1);
fs.writeFileSync('simulado/simulado.js', newSimulado);
console.log('Injected successfully');

