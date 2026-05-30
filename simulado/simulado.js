
const questions = [
  {
    "id": 1,
    "question": "Você se conecta a um arquivo CSV que contém dados de vendas. O arquivo é atualizado diariamente com novas linhas. O que você deve fazer para garantir que o Power BI sempre importe apenas novos registros?",
    "options": [
      "Usar o modo Import",
      "Habilitar a Atualização Incremental (Incremental Refresh)",
      "Usar DirectQuery",
      "Criar uma tabela calculada"
    ],
    "answer": 1,
    "explanation": "A Atualização Incremental permite que o Power BI carregue apenas os dados novos ou alterados, em vez de recarregar todo o conjunto de dados."
  },
  {
    "id": 2,
    "question": "Você está limpando dados de clientes no Power Query. Você precisa remover linhas onde o CustomerID é nulo e substituir strings vazias em Country por \'Unknown\'. Quais duas etapas você deve usar? (Selecione duas)",
    "options": [
      "Filtrar linhas (Filter rows)",
      "Substituir valores (Replace values)",
      "Coluna condicional (Conditional column)",
      "Remover erros (Remove errors)"
    ],
    "answer": [0, 1],
    "explanation": "Filtrar linhas é usado para remover nulos e Substituir valores é usado para trocar strings vazias por um valor padrão."
  },
  {
    "id": 3,
    "question": "O recurso do Power Query usado para analisar o perfil dos dados, mostrando a distribuição, qualidade e perfil das colunas, é chamado de:",
    "options": [
      "Data Profiling (Perfil de Dados)",
      "Data Modeling",
      "DAX",
      "M Language"
    ],
    "answer": 0,
    "explanation": "O Data Profiling no Power Query Editor fornece ferramentas visuais para entender a qualidade e distribuição dos seus dados."
  },
  {
    "id": 4,
    "question": "Você deseja reduzir o tamanho do modelo removendo colunas não utilizadas antes de carregar os dados. Onde isso deve ser feito?",
    "options": [
      "No DAX",
      "No Power BI Service",
      "No Power Query Editor",
      "Na visualização de Dados (Data view)"
    ],
    "answer": 2,
    "explanation": "Remover colunas no Power Query Editor garante que elas nunca cheguem ao modelo de dados, economizando memória e melhorando a performance."
  },
  {
    "id": 5,
    "question": "Um conjunto de dados contém valores numéricos armazenados como texto. Qual é a MELHOR abordagem para corrigir isso?",
    "options": [
      "Converter o tipo de dado na visualização de relatório",
      "Criar uma coluna calculada",
      "Alterar o tipo de dado no Power Query",
      "Usar FORMAT() no DAX"
    ],
    "answer": 2,
    "explanation": "Alterar o tipo de dado na fonte (Power Query) é a melhor prática para garantir a integridade dos dados e performance do modelo."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionNumberElement = document.getElementById("question-number");
const questionTextElement = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const submitButton = document.getElementById("submit-answer");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-question");
const quizContainer = document.getElementById("quiz-container");
const resultsCard = document.getElementById("results-card");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-quiz");

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionNumberElement.textContent = `Questão ${currentQuestionIndex + 1}`;
    questionTextElement.textContent = question.question;
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    submitButton.style.display = 'block';
    nextButton.style.display = 'none';

    question.options.forEach((option, index) => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        input.type = Array.isArray(question.answer) ? 'checkbox' : 'radio';
        input.name = 'question';
        input.id = `option${index}`;
        input.value = index;

        const label = document.createElement('label');
        label.htmlFor = `option${index}`;
        label.textContent = option;

        div.appendChild(input);
        div.appendChild(label);
        optionsContainer.appendChild(div);
    });
}

function checkAnswer() {
    const question = questions[currentQuestionIndex];
    let selectedOptions = [];
    optionsContainer.querySelectorAll('input:checked').forEach(input => {
        selectedOptions.push(parseInt(input.value));
    });

    let isCorrect = false;
    if (Array.isArray(question.answer)) {
        isCorrect = selectedOptions.length === question.answer.length &&
                    selectedOptions.every(val => question.answer.includes(val));
    } else {
        isCorrect = selectedOptions.length === 1 && selectedOptions[0] === question.answer;
    }

    userAnswers[currentQuestionIndex] = { selected: selectedOptions, correct: isCorrect };

    if (isCorrect) {
        score++;
        feedbackElement.textContent = 'Correto! ' + question.explanation;
        feedbackElement.style.color = 'green';
    } else {
        let correctAnswerText = '';
        if (Array.isArray(question.answer)) {
            correctAnswerText = question.answer.map(ansIndex => question.options[ansIndex]).join(', ');
        } else {
            correctAnswerText = question.options[question.answer];
        }
        feedbackElement.textContent = `Incorreto. A resposta correta é: ${correctAnswerText}. ${question.explanation}`;
        feedbackElement.style.color = 'red';
    }

    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
    optionsContainer.querySelectorAll('input').forEach(input => input.disabled = true);
}

function showResults() {
    quizContainer.style.display = 'none';
    resultsCard.style.display = 'block';
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = questions.length;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    resultsCard.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
}

submitButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});
restartButton.addEventListener('click', restartQuiz);

loadQuestion();
