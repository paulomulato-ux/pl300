const fs = require('fs');
const code = fs.readFileSync('simulado/simulado.js', 'utf8');
const match = code.match(/const questionBank = (\{[\s\S]*?\n\});\n\n/);
if (!match) {
  const match2 = code.match(/const questionBank = (\{[\s\S]*?\});?\s*(?:const|function|\/\/|$)/);
  if (match2) {
    console.log('Found with match2, length:', match2[1].length);
  } else {
    console.log('Could not parse questionBank');
    process.exit(1);
  }
}

