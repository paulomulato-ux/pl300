
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
try {
  eval(code);
  let fake_en = 0;
  let total = 0;
  const needTranslation = [];
  for (const key in global.questionBank) {
     global.questionBank[key].forEach((q, idx) => {
         total++;
         // If question_en contains common Portuguese words or is exactly the same as question_pt
         const q_en = (q.question_en || '').toLowerCase();
         if (q_en === (q.question_pt || '').toLowerCase() || 
             q_en.match(/\b(um|uma|o|a|os|as|de|do|da|em|no|na|para|com|que)\b/)) {
             fake_en++;
             needTranslation.push({ domain: key, index: idx });
         }
     });
  }
  console.log('Total questions:', total);
  console.log('Fake or untranslated EN questions:', fake_en);
} catch(e) {
  console.error('Eval error:', e.message);
}

