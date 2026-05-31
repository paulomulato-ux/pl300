// ============================================================
//  PL-300 SIMULADO — JavaScript completo
//  120 questões | 4 domínios | Modo Treino + Simulado Oficial
// ============================================================

// ============================================================
//  BANCO DE QUESTÕES
// ============================================================
// ============================================================
//  BANCO DE QUESTÕES (CARREGADO A PARTIR DE simulado/questions.js)
// ============================================================
let questionBank = window.questionBank || {};

// ============================================================
//  STATE
// ============================================================
const state = {
  mode: null,
  selectedDomains: [],
  questions: [],
  currentIndex: 0,
  answers: [],        // array of { selected:[], correct:bool } or null
  marked: new Set(),
  timerInterval: null,
  timeRemaining: 0,
  startTime: null
};

// ============================================================
//  UTILITIES
// ============================================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'screen-history') renderHistory();
}

// ============================================================
//  WELCOME / MODE SELECTION
// ============================================================
function selectMode(mode) {
  state.mode = mode;
  if (mode === 'treino') {
    showScreen('screen-domain');
  } else {
    state.selectedDomains = Object.keys(questionBank);
    startQuiz();
  }
}

// ============================================================
//  DOMAIN SELECTION
// ============================================================
function toggleDomain(btn) {
  const domain = btn.dataset.domain;

  if (domain === 'Todos') {
    document.querySelectorAll('.domain-card').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
    state.selectedDomains = Object.keys(questionBank);
    return;
  }

  // Deselect "Todos" if individual selected
  document.querySelector('[data-domain="Todos"]').classList.remove('selected');

  btn.classList.toggle('selected');
  const selected = [...document.querySelectorAll('.domain-card.selected')]
    .map(c => c.dataset.domain)
    .filter(d => d !== 'Todos');
  state.selectedDomains = selected;
}

// ============================================================
//  START QUIZ
// ============================================================
function startQuiz() {
  if (state.mode === 'treino' && state.selectedDomains.length === 0) {
    alert('Selecione pelo menos um domínio para continuar.');
    return;
  }

  showScreen('screen-loading');

  setTimeout(() => {
    // Build question pool
    let pool = [];
    state.selectedDomains.forEach(domain => {
      (questionBank[domain] || []).forEach(q => {
        pool.push({ ...q, domain });
      });
    });

    // Shuffle questions
    let shuffledPool = shuffle(pool);
    
    // Select a subset based on mode
    if (state.mode === 'oficial') {
      // For Official Simulator, we want exactly 60 questions with balanced representation (15 per domain if possible).
      let balancedPool = [];
      const domains = ["Preparar Dados", "Modelar Dados", "Visualizar e Analisar", "Implementar e Manter"];
      
      let byDomain = {};
      domains.forEach(d => {
        byDomain[d] = shuffle(pool.filter(q => q.domain === d));
      });
      
      domains.forEach(d => {
        let count = Math.min(15, (byDomain[d] || []).length);
        for (let i = 0; i < count; i++) {
          balancedPool.push(byDomain[d].pop());
        }
      });
      
      let remaining = pool.filter(q => !balancedPool.includes(q));
      let shuffledRemaining = shuffle(remaining);
      while (balancedPool.length < 60 && shuffledRemaining.length > 0) {
        balancedPool.push(shuffledRemaining.pop());
      }
      
      state.questions = shuffle(balancedPool);
    } else {
      // Training mode: take a subset of exactly 30 questions
      state.questions = shuffledPool.slice(0, 30);
    }

    state.currentIndex = 0;
    state.score = 0;
    state.answers = new Array(state.questions.length).fill(null);
    state.marked = new Set();
    state.startTime = Date.now();

    // Timer (official mode only)
    clearInterval(state.timerInterval);
    if (state.mode === 'oficial') {
      state.timeRemaining = 110 * 60;
      startTimer();
    }

    buildNavGrid();
    loadQuestion(0);
    showScreen('screen-quiz');
  }, 600);
}

// ============================================================
//  TIMER
// ============================================================
function startTimer() {
  const display = document.getElementById('timer-display');
  const timerText = document.getElementById('timer-text');
  display.classList.remove('hidden', 'warning', 'danger');
  timerText.textContent = formatTime(state.timeRemaining);

  state.timerInterval = setInterval(() => {
    state.timeRemaining--;
    timerText.textContent = formatTime(state.timeRemaining);

    if (state.timeRemaining <= 600 && state.timeRemaining > 120) {
      display.classList.add('warning');
      display.classList.remove('danger');
    } else if (state.timeRemaining <= 120) {
      display.classList.remove('warning');
      display.classList.add('danger');
    }

    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval);
      showResults();
    }
  }, 1000);
}

// ============================================================
//  LOAD QUESTION
// ============================================================
function loadQuestion(index) {
  state.currentIndex = index;
  const q = state.questions[index];
  const total = state.questions.length;
  const answered = state.answers[index];

  // Update topbar
  document.getElementById('q-current').textContent = index + 1;
  document.getElementById('q-total').textContent = total;
  document.getElementById('q-domain-badge').textContent = q.domain;
  document.getElementById('q-badge').textContent = `Questão ${index + 1}`;
  document.getElementById('progress-fill').style.width = `${((index + 1) / total) * 100}%`;

  // Mark button
  const markBtn = document.getElementById('btn-mark');
  markBtn.className = 'btn-mark' + (state.marked.has(index) ? ' marked' : '');

  // Multi-hint
  const hintContainer = document.getElementById('multi-hint-container');
  const isMulti = Array.isArray(q.answer);
  hintContainer.innerHTML = isMulti
    ? '<span class="multi-hint">⚠️ Selecione todas as opções corretas</span>'
    : '';

  // Question text
  document.getElementById('question-text').textContent = q.question;

  // Options
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option-item';
    div.dataset.index = i;
    div.onclick = () => toggleOption(div, isMulti);

    // Restore selection if answered
    if (answered) {
      div.classList.add('disabled');
      if (answered.selected.includes(i)) {
        const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
        div.classList.add(correctAnswers.includes(i) ? 'correct' : 'incorrect');
      } else {
        const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
        if (correctAnswers.includes(i) && state.mode === 'treino') {
          div.classList.add('correct'); // show correct answer
        }
      }
    }

    div.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-text">${opt}</span>
    `;
    container.appendChild(div);
  });

  // Submit / Nav
  const submitBtn = document.getElementById('btn-submit');
  const navActions = document.getElementById('nav-actions');
  const feedbackBox = document.getElementById('feedback-box');

  if (answered) {
    submitBtn.style.display = 'none';
    navActions.style.display = 'flex';
    if (state.mode === 'treino') {
      showFeedback(q, answered.correct);
    } else {
      feedbackBox.className = 'feedback-box hidden';
    }
  } else {
    submitBtn.style.display = 'block';
    navActions.style.display = 'none';
    feedbackBox.className = 'feedback-box hidden';
  }

  // Prev/Next buttons
  document.getElementById('btn-prev').disabled = index === 0;
  const nextBtn = document.getElementById('btn-next');
  nextBtn.textContent = index === total - 1 ? 'Ver Resultado →' : 'Próxima →';

  // Update nav grid
  updateNavGrid();
}

// ============================================================
//  OPTION SELECTION
// ============================================================
function toggleOption(div, isMulti) {
  if (div.classList.contains('disabled')) return;

  if (isMulti) {
    div.classList.toggle('selected');
    div.querySelector('.option-letter').style.background = div.classList.contains('selected') ? 'var(--purple)' : '';
  } else {
    document.querySelectorAll('.option-item').forEach(o => {
      o.classList.remove('selected');
      o.querySelector('.option-letter').style.background = '';
    });
    div.classList.add('selected');
    div.querySelector('.option-letter').style.background = 'var(--purple)';
  }
}

// ============================================================
//  SUBMIT ANSWER
// ============================================================
function submitAnswer() {
  const q = state.questions[state.currentIndex];
  const selected = [...document.querySelectorAll('.option-item.selected')].map(d => parseInt(d.dataset.index));

  if (selected.length === 0) {
    alert('Selecione pelo menos uma opção antes de confirmar.');
    return;
  }

  const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
  const isCorrect = selected.length === correctAnswers.length &&
    selected.every(v => correctAnswers.includes(v));

  state.answers[state.currentIndex] = { selected, correct: isCorrect };

  // Highlight options
  document.querySelectorAll('.option-item').forEach(div => {
    const i = parseInt(div.dataset.index);
    div.classList.add('disabled');
    if (selected.includes(i)) {
      div.classList.remove('selected');
      div.classList.add(correctAnswers.includes(i) ? 'correct' : 'incorrect');
    } else if (correctAnswers.includes(i) && state.mode === 'treino') {
      div.classList.add('correct');
    }
    div.querySelector('.option-letter').style.background = '';
  });

  if (state.mode === 'treino') {
    showFeedback(q, isCorrect);
  }

  document.getElementById('btn-submit').style.display = 'none';
  document.getElementById('nav-actions').style.display = 'flex';

  updateNavGrid();
}

function showFeedback(q, isCorrect) {
  const box = document.getElementById('feedback-box');
  const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
  const correctTexts = correctAnswers.map(i => q.options[i]).join(', ');
  box.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
  box.innerHTML = isCorrect
    ? `✅ <strong>Correto!</strong> ${q.explanation}`
    : `❌ <strong>Incorreto.</strong> Resposta correta: <em>${correctTexts}</em><br><br>${q.explanation}`;
}

// ============================================================
//  NAVIGATION
// ============================================================
function nextQuestion() {
  const next = state.currentIndex + 1;
  if (next < state.questions.length) {
    loadQuestion(next);
    window.scrollTo(0, 0);
  } else {
    if (!allAnswered() && state.mode === 'treino') {
      const unanswered = state.questions.length - state.answers.filter(a => a !== null).length;
      if (!confirm(`Você ainda tem ${unanswered} questão(ões) sem resposta. Deseja ver o resultado mesmo assim?`)) return;
    }
    clearInterval(state.timerInterval);
    showResults();
  }
}

function goToQuestion(index) {
  if (index < 0 || index >= state.questions.length) return;
  loadQuestion(index);
  window.scrollTo(0, 0);
}

function allAnswered() {
  return state.answers.every(a => a !== null);
}

// ============================================================
//  MARK FOR REVIEW
// ============================================================
function toggleMark() {
  const i = state.currentIndex;
  if (state.marked.has(i)) {
    state.marked.delete(i);
  } else {
    state.marked.add(i);
  }
  const btn = document.getElementById('btn-mark');
  btn.className = 'btn-mark' + (state.marked.has(i) ? ' marked' : '');
  updateNavGrid();
}

// ============================================================
//  NAV GRID
// ============================================================
function buildNavGrid() {
  const grid = document.getElementById('nav-grid');
  grid.innerHTML = '';
  state.questions.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.textContent = i + 1;
    btn.onclick = () => goToQuestion(i);
    btn.id = `nav-btn-${i}`;
    grid.appendChild(btn);
  });
}

function updateNavGrid() {
  state.questions.forEach((_, i) => {
    const btn = document.getElementById(`nav-btn-${i}`);
    if (!btn) return;
    btn.className = 'nav-btn';
    if (i === state.currentIndex) {
      btn.classList.add('current');
    } else if (state.marked.has(i)) {
      btn.classList.add('marked');
    } else if (state.answers[i] !== null) {
      btn.classList.add(state.answers[i].correct ? 'answered' : 'wrong');
    }
  });
}

// ============================================================
//  QUIT MODAL
// ============================================================
function confirmQuit() {
  document.getElementById('quit-modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('quit-modal').classList.add('hidden');
}
function quitQuiz() {
  clearInterval(state.timerInterval);
  closeModal();
  showScreen('screen-welcome');
}

// ============================================================
//  RESULTS
// ============================================================
function showResults() {
  clearInterval(state.timerInterval);

  const answered = state.answers.filter(a => a !== null);
  const correct = answered.filter(a => a.correct).length;
  const total = state.questions.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const approved = pct >= 70;

  // Save to history
  const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
  saveHistory({
    date: new Date().toLocaleString('pt-BR'),
    mode: state.mode === 'oficial' ? 'Simulado Oficial' : 'Modo Treino',
    domains: state.selectedDomains,
    correct, total, pct, approved,
    elapsed
  });

  // Score ring
  const circumference = 2 * Math.PI * 54; // 339.3
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => {
    document.getElementById('score-ring-fill').style.strokeDashoffset = offset;
  }, 200);

  document.getElementById('score-pct').textContent = `${pct}%`;
  document.getElementById('results-title').textContent =
    state.mode === 'oficial' ? 'Resultado do Simulado Oficial' : 'Resultado do Modo Treino';

  const badge = document.getElementById('result-badge');
  badge.textContent = approved ? '🏆 APROVADO — ≥ 70%' : '📚 Não Atingiu — < 70%';
  badge.className = `result-badge ${approved ? 'approved' : 'failed'}`;

  document.getElementById('results-detail').textContent =
    `${correct} de ${total} questões corretas (${answered.length} respondidas)`;
  document.getElementById('results-time').textContent =
    `Tempo: ${formatTime(elapsed)}`;

  // Domain chart
  renderDomainChart();

  // Review
  renderReview('all');

  showScreen('screen-results');
}

function renderDomainChart() {
  const container = document.getElementById('domain-bars');
  container.innerHTML = '';

  const domains = [...new Set(state.questions.map(q => q.domain))];
  domains.forEach(domain => {
    const qs = state.questions.map((q, i) => ({ q, i })).filter(({ q }) => q.domain === domain);
    const total = qs.length;
    const correct = qs.filter(({ i }) => state.answers[i]?.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const fillClass = pct >= 70 ? 'high' : pct >= 50 ? 'mid' : 'low';

    container.innerHTML += `
      <div class="domain-bar-item">
        <div class="domain-bar-header">
          <span class="domain-bar-label">${domain}</span>
          <span class="domain-bar-pct">${correct}/${total} (${pct}%)</span>
        </div>
        <div class="domain-bar-track">
          <div class="domain-bar-fill ${fillClass}" style="width:0%" data-pct="${pct}"></div>
        </div>
      </div>
    `;
  });

  setTimeout(() => {
    document.querySelectorAll('.domain-bar-fill').forEach(el => {
      el.style.width = el.dataset.pct + '%';
    });
  }, 100);
}

function renderReview(filter) {
  const list = document.getElementById('review-list');
  list.innerHTML = '';

  state.questions.forEach((q, i) => {
    const ans = state.answers[i];
    if (!ans) return;
    if (filter === 'correct' && !ans.correct) return;
    if (filter === 'wrong' && ans.correct) return;

    const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
    const correctTexts = correctAnswers.map(ci => q.options[ci]).join(', ');
    const selectedTexts = ans.selected.map(si => q.options[si]).join(', ') || '(sem resposta)';

    const item = document.createElement('div');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="review-item-header">
        <div class="review-status-dot ${ans.correct ? 'correct' : 'incorrect'}"></div>
        <span class="review-q-num">Q${i + 1}</span>
        <span class="review-q-domain">${q.domain}</span>
      </div>
      <p class="review-q-text">${q.question}</p>
      <div class="review-details" id="review-detail-${i}">
        <div class="review-answer">
          <span class="review-answer-label">Sua resposta:</span>
          <span class="review-answer-val ${ans.correct ? 'correct-answer' : 'wrong-answer'}">${selectedTexts}</span>
        </div>
        ${!ans.correct ? `
        <div class="review-answer">
          <span class="review-answer-label">Correta:</span>
          <span class="review-answer-val correct-answer">${correctTexts}</span>
        </div>` : ''}
        <div class="review-explanation">${q.explanation}</div>
      </div>
    `;
    item.addEventListener('click', () => {
      const detail = document.getElementById(`review-detail-${i}`);
      detail.classList.toggle('open');
    });
    list.appendChild(item);
  });

  if (list.innerHTML === '') {
    list.innerHTML = '<p class="text-muted" style="text-align:center;padding:32px 0">Nenhuma questão encontrada neste filtro.</p>';
  }
}

function filterReview(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderReview(filter);
}

function restartFromResults() {
  showScreen('screen-welcome');
}

// ============================================================
//  HISTORY (localStorage)
// ============================================================
function saveHistory(entry) {
  const history = loadHistoryData();
  history.unshift(entry);
  if (history.length > 10) history.pop();
  localStorage.setItem('pl300_history', JSON.stringify(history));
}

function loadHistoryData() {
  try {
    return JSON.parse(localStorage.getItem('pl300_history')) || [];
  } catch {
    return [];
  }
}

function renderHistory() {
  const list = document.getElementById('history-list');
  const history = loadHistoryData();

  if (history.length === 0) {
    list.innerHTML = '<div class="no-history">📭 Nenhum simulado realizado ainda.</div>';
    return;
  }

  list.innerHTML = history.map((h, idx) => `
    <div class="history-item" style="animation-delay:${idx * 0.05}s">
      <div class="history-score">${h.pct}%</div>
      <div class="history-info">
        <div class="h-mode">${h.mode}</div>
        <div class="h-detail">${h.correct} de ${h.total} questões corretas · ${formatTime(h.elapsed || 0)}</div>
        <div class="h-date">${h.date}</div>
      </div>
      <div class="history-badge ${h.approved ? 'approved' : 'failed'}">
        ${h.approved ? '✅ Aprovado' : '❌ Reprovado'}
      </div>
    </div>
  `).join('');
}

function clearHistory() {
  if (confirm('Tem certeza que deseja apagar todo o histórico?')) {
    localStorage.removeItem('pl300_history');
    renderHistory();
  }
}
