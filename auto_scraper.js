const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const projectRoot = path.resolve(__dirname);
const outputJson = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(projectRoot, 'simulado', 'questions.json');
const outputJs = path.join(projectRoot, 'simulado', 'questions.js');

function classifyDomain(text) {
    const lower = text.toLowerCase();
    if (/(visual|chart|dashboard|slicer|map|gauge|tooltip|bookmark|interaction|report|plot)/i.test(lower)) {
        return "Visualizar e Analisar";
    }
    if (/(workspace|publish|schedule|refresh|subscription|gateway|admin|tenant|role|security)/i.test(lower)) {
        return "Implementar e Manter";
    }
    if (/(query|extract|transform|load|import|dataset|type|column|merge|append|null|error)/i.test(lower)) {
        return "Preparar Dados";
    }
    // Default to Modelar Dados, since it's the largest area
    return "Modelar Dados";
}

async function scrapePage(page) {
    console.log(`Buscando página ${page}...`);
    try {
        const response = await axios.get(`https://www.passnexam.com/microsoft/pl-300/${page}`);
        const $ = cheerio.load(response.data);
        const questions = [];

        $('.badge.badge-secondary:contains("Question")').each((i, elem) => {
            let container = $(elem).parent();
            let htmlContent = container.html();

            // Extract question text
            let parts = htmlContent.split(/<div class="row mt-3">/i);
            let questionHtml = parts[0] || '';
            let qTextMatch = questionHtml.match(/<\/span><br><br>([\s\S]*?)(?:<div|$)/i);
            let pergunta = qTextMatch ? qTextMatch[1] : '';
            pergunta = pergunta.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
            if (!pergunta) return;

            // Extract options
            let optionsPart = parts[1] ? parts[1].split(/<\/div><\/div><br><br>/i)[0] : '';
            let $opts = cheerio.load(optionsPart);
            let opcoes = [];
            let correta = 0;

            $opts('.alert').each((idx, optElem) => {
                let optText = $(optElem).text().replace(/Most Voted/i, '').trim();
                opcoes.push(optText);
                let val = $(optElem).attr('value');
                if (val === '1') {
                    correta = idx;
                }
            });

            // If no correct answer was marked by attribute (fallback)
            if (correta === 0 && opcoes.length > 0) {
                 // Try to look into the answer section
            }

            // Extract explanation / answer
            let collapseId = container.find('.collapse').attr('id');
            let explanation = '';
            if (collapseId) {
                let expText = container.find(`#${collapseId} .card-body`).text();
                // cleanup
                expText = expText.replace(/Discuss\s*Report/g, '');
                expText = expText.replace(/Answer is/g, 'Resposta:');
                expText = expText.replace(/\s+/g, ' ').trim();
                explanation = expText;
            } else {
                 explanation = "A resposta correta é a opção " + (correta + 1) + ".";
            }

            if (opcoes.length < 2) return; // skip invalid questions

            let domain = classifyDomain(pergunta + " " + explanation);

            questions.push({
                domain,
                question: pergunta,
                options: opcoes,
                answer: correta,
                explanation: explanation
            });
        });

        return questions;
    } catch (error) {
        console.error(`Erro na página ${page}:`, error.message);
        return [];
    }
}

async function run() {
    let allQuestions = [];
    for (let p = 19; p <= 36; p++) {
        let qs = await scrapePage(p);
        allQuestions.push(...qs);
        // sleep a bit to avoid rate limiting
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log(`Extraídas ${allQuestions.length} questões no total.`);

    // Group by domain
    let grouped = {
        "Preparar Dados": [],
        "Modelar Dados": [],
        "Visualizar e Analisar": [],
        "Implementar e Manter": []
    };

    for (let q of allQuestions) {
        if (grouped[q.domain]) {
            grouped[q.domain].push(q);
        }
    }

    fs.writeFileSync(outputJson, JSON.stringify(grouped, null, 2), 'utf8');
    fs.writeFileSync(outputJs, 'window.questionBank = ' + JSON.stringify(grouped, null, 2) + ';', 'utf8');
    console.log(`\n🎉 Total de questões extraídas: ${allQuestions.length}`);
    console.log(`Arquivo JSON salvo: ${outputJson}`);
    console.log(`Arquivo JS salvo: ${outputJs}`);
}

run();
