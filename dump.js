
const fs = require('fs');
let code = fs.readFileSync('simulado/simulado.js', 'utf8');
code = code.replace('const questionBank =', 'global.questionBank =');
global.localStorage = { getItem: () => 'pt', setItem: () => {} };
global.window = { addEventListener: () => {} };
global.document = { 
  getElementById: () => ({ addEventListener: () => {}, innerHTML: '', style: {}, scrollIntoView: () => {} }),
  querySelector: () => ({ classList: { add: ()=>{}, remove: ()=>{} }, addEventListener: ()=>{} }),
  addEventListener: () => {},
  querySelectorAll: () => []
};
eval(code);
fs.writeFileSync('current_bank.json', JSON.stringify(global.questionBank, null, 2));
console.log('Exported to current_bank.json');

