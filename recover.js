const fs = require('fs');
const readline = require('readline');
const path = 'C:/Users/paulo/.gemini/antigravity/brain/57720987-7d11-442e-8113-145776e81f57/.system_generated/logs/transcript.jsonl';
const fileStream = fs.createReadStream(path);
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

let foundCount = 0;
rl.on('line', (line) => {
    try {
        const json = JSON.parse(line);
        if (json.tool_calls) {
            for (let call of json.tool_calls) {
                if (call.name === 'default_api:write_to_file' || call.name === 'default_api:replace_file_content') {
                    if (call.args && call.args.TargetFile && call.args.TargetFile.includes('index.html')) {
                        console.log('Found index.html edit at step', json.step_index);
                        if (call.args.CodeContent) {
                            fs.writeFileSync('c:/Users/Public/Apps/pl300-portal/recovered_' + json.step_index + '.html', call.args.CodeContent);
                        } else if (call.args.ReplacementContent) {
                            fs.writeFileSync('c:/Users/Public/Apps/pl300-portal/recovered_' + json.step_index + '.txt', call.args.ReplacementContent);
                        }
                    }
                }
            }
        }
    } catch (e) {}
});
