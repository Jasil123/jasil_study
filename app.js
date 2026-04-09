// CS MCQ Master - App Logic
let allQuestions = [];
let currentQuiz = [];
let currentIndex = 0;
let answers = {};
let correctCount = 0;
let wrongCount = 0;
let timerEnabled = false;
let timerInterval = null;
let timerValue = 60;
let currentMode = 'all';

function init() {
    allQuestions = [
        ...(window.questionsBasics || []),
        ...(window.questionsData || []),
        ...(window.questionsArch || [])
    ];
    document.getElementById('basics-count').textContent = (window.questionsBasics || []).length + ' Questions';
    document.getElementById('data-count').textContent = (window.questionsData || []).length + ' Questions';
    document.getElementById('arch-count').textContent = (window.questionsArch || []).length + ' Questions';
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}

function startQuiz(mode) {
    currentMode = mode;
    let pool = [];
    if (mode === 'all') pool = [...allQuestions];
    else if (mode === 'basics') pool = [...(window.questionsBasics || [])];
    else if (mode === 'data') pool = [...(window.questionsData || [])];
    else if (mode === 'architecture') pool = [...(window.questionsArch || [])];

    const shuffle = document.getElementById('shuffle-check').checked;
    timerEnabled = document.getElementById('timer-check').checked;
    let count = parseInt(document.getElementById('question-count-select').value);
    if (count === 0) count = pool.length;

    if (shuffle) pool.sort(() => Math.random() - 0.5);
    currentQuiz = pool.slice(0, Math.min(count, pool.length));
    currentIndex = 0;
    answers = {};
    correctCount = 0;
    wrongCount = 0;

    const labels = { all: 'Full Test', basics: 'Computer Basics', data: 'Data Representation', architecture: 'Computer Architecture' };
    document.getElementById('quiz-topic-label').textContent = labels[mode];
    document.getElementById('total-q').textContent = currentQuiz.length;
    document.getElementById('score-correct').textContent = '✓ 0';
    document.getElementById('score-wrong').textContent = '✗ 0';

    buildPalette();
    showScreen('quiz-screen');
    renderQuestion();
}

function renderQuestion() {
    const q = currentQuiz[currentIndex];
    document.getElementById('current-q').textContent = currentIndex + 1;
    document.getElementById('question-number').textContent = 'Q' + (currentIndex + 1);
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('progress-bar').style.width = ((currentIndex + 1) / currentQuiz.length * 100) + '%';

    const optList = document.getElementById('options-list');
    optList.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${opt}</span>`;
        btn.onclick = () => selectAnswer(i);

        if (answers[currentIndex] !== undefined) {
            btn.classList.add('disabled');
            if (i === q.answer) btn.classList.add('correct-answer');
            if (answers[currentIndex] === i && i !== q.answer) btn.classList.add('wrong-answer');
        }
        optList.appendChild(btn);
    });

    const exp = document.getElementById('explanation');
    if (answers[currentIndex] !== undefined && q.explanation) {
        exp.innerHTML = '<strong>Explanation:</strong> ' + q.explanation;
        exp.style.display = 'block';
    } else {
        exp.style.display = 'none';
    }

    // Navigation buttons
    document.getElementById('prev-btn').style.display = currentIndex > 0 ? '' : 'none';
    const answered = answers[currentIndex] !== undefined;
    const isLast = currentIndex === currentQuiz.length - 1;
    document.getElementById('skip-btn').style.display = (!answered && !isLast) ? '' : 'none';
    document.getElementById('next-btn').style.display = (answered && !isLast) ? '' : 'none';
    document.getElementById('finish-btn').style.display = isLast && answered ? '' : 'none';

    if (!answered && !isLast) {
        document.getElementById('skip-btn').style.display = '';
    } else if (!answered && isLast) {
        document.getElementById('skip-btn').textContent = 'Skip & Finish';
        document.getElementById('skip-btn').style.display = '';
        document.getElementById('skip-btn').onclick = () => { skipQuestion(); };
    }

    updatePalette();
    if (timerEnabled && answers[currentIndex] === undefined) startTimer();
    else stopTimer();
}

function selectAnswer(optIndex) {
    if (answers[currentIndex] !== undefined) return;
    const q = currentQuiz[currentIndex];
    answers[currentIndex] = optIndex;
    if (optIndex === q.answer) correctCount++;
    else wrongCount++;

    document.getElementById('score-correct').textContent = '✓ ' + correctCount;
    document.getElementById('score-wrong').textContent = '✗ ' + wrongCount;

    stopTimer();
    renderQuestion();
}

function nextQuestion() {
    if (currentIndex < currentQuiz.length - 1) {
        currentIndex++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

function skipQuestion() {
    if (currentIndex < currentQuiz.length - 1) {
        answers[currentIndex] = answers[currentIndex] !== undefined ? answers[currentIndex] : -1;
        currentIndex++;
        renderQuestion();
    } else {
        answers[currentIndex] = answers[currentIndex] !== undefined ? answers[currentIndex] : -1;
        finishQuiz();
    }
}

function goToQuestion(idx) {
    currentIndex = idx;
    renderQuestion();
}

function buildPalette() {
    const grid = document.getElementById('palette-grid');
    grid.innerHTML = '';
    currentQuiz.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'palette-btn';
        btn.textContent = i + 1;
        btn.onclick = () => goToQuestion(i);
        grid.appendChild(btn);
    });
}

function updatePalette() {
    const btns = document.querySelectorAll('.palette-btn');
    btns.forEach((btn, i) => {
        btn.className = 'palette-btn';
        if (i === currentIndex) btn.classList.add('p-current');
        if (answers[i] !== undefined) {
            if (answers[i] === -1) btn.classList.add('p-skipped');
            else if (answers[i] === currentQuiz[i].answer) btn.classList.add('p-correct');
            else btn.classList.add('p-wrong');
        }
    });
}

function togglePalette() {
    document.getElementById('question-palette').classList.toggle('show');
}

function startTimer() {
    stopTimer();
    timerValue = 60;
    document.getElementById('timer-display').style.display = '';
    document.getElementById('timer-value').textContent = timerValue;
    timerInterval = setInterval(() => {
        timerValue--;
        document.getElementById('timer-value').textContent = timerValue;
        if (timerValue <= 0) {
            stopTimer();
            skipQuestion();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    document.getElementById('timer-display').style.display = 'none';
}

function finishQuiz() {
    stopTimer();
    const total = currentQuiz.length;
    const skipped = Object.values(answers).filter(v => v === -1).length + (total - Object.keys(answers).length);
    const percent = Math.round((correctCount / total) * 100);

    // Result emoji and title
    let emoji = '🎉', title = 'Excellent!', sub = 'Outstanding performance!';
    if (percent < 30) { emoji = '😓'; title = 'Keep Trying!'; sub = 'Practice makes perfect!'; }
    else if (percent < 50) { emoji = '🤔'; title = 'Good Effort!'; sub = 'You\'re getting there!'; }
    else if (percent < 70) { emoji = '👍'; title = 'Well Done!'; sub = 'Solid performance!'; }
    else if (percent < 90) { emoji = '🌟'; title = 'Great Job!'; sub = 'Almost perfect!'; }

    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-subtitle').textContent = sub;
    document.getElementById('score-percent').textContent = percent + '%';
    document.getElementById('score-fraction').textContent = correctCount + '/' + total;
    document.getElementById('rs-correct').textContent = correctCount;
    document.getElementById('rs-wrong').textContent = wrongCount;
    document.getElementById('rs-skipped').textContent = skipped;

    // Animated ring
    const ring = document.getElementById('score-ring-fill');
    const circumference = 339.292;
    ring.style.strokeDashoffset = circumference;
    setTimeout(() => {
        ring.style.strokeDashoffset = circumference - (circumference * percent / 100);
        if (percent >= 70) ring.style.stroke = '#22c55e';
        else if (percent >= 40) ring.style.stroke = '#f59e0b';
        else ring.style.stroke = '#ef4444';
    }, 100);

    // Topic breakdown
    const breakdown = document.getElementById('result-topic-breakdown');
    const topics = { basics: 'Computer Basics', data: 'Data Representation', architecture: 'Computer Architecture' };
    let html = '<h3>Topic Breakdown</h3>';
    for (const [key, label] of Object.entries(topics)) {
        let topicCorrect = 0, topicTotal = 0;
        currentQuiz.forEach((q, i) => {
            if (q.topic === key) {
                topicTotal++;
                if (answers[i] === q.answer) topicCorrect++;
            }
        });
        if (topicTotal > 0) {
            const tp = Math.round((topicCorrect / topicTotal) * 100);
            const color = tp >= 70 ? 'var(--correct)' : tp >= 40 ? 'var(--skip)' : 'var(--wrong)';
            html += `<div class="topic-result-row"><span style="min-width:160px;font-size:.9rem">${label}</span><div class="topic-result-bar"><div class="topic-result-fill" style="width:${tp}%;background:${color}"></div></div><span style="font-weight:700;font-size:.9rem;min-width:60px;text-align:right">${topicCorrect}/${topicTotal}</span></div>`;
        }
    }
    breakdown.innerHTML = html;

    showScreen('result-screen');
}

function retryQuiz() {
    currentIndex = 0;
    answers = {};
    correctCount = 0;
    wrongCount = 0;
    document.getElementById('score-correct').textContent = '✓ 0';
    document.getElementById('score-wrong').textContent = '✗ 0';
    buildPalette();
    showScreen('quiz-screen');
    renderQuestion();
}

function reviewAnswers() {
    showScreen('review-screen');
    renderReview('all');
}

function renderReview(filter) {
    const list = document.getElementById('review-list');
    let html = '';
    const letters = ['A', 'B', 'C', 'D'];
    currentQuiz.forEach((q, i) => {
        const userAns = answers[i];
        const isCorrect = userAns === q.answer;
        const isSkipped = userAns === undefined || userAns === -1;
        let cls = 'r-skipped';
        if (!isSkipped) cls = isCorrect ? 'r-correct' : 'r-wrong';

        if (filter !== 'all') {
            if (filter === 'correct' && !isCorrect) return;
            if (filter === 'wrong' && (isCorrect || isSkipped)) return;
            if (filter === 'skipped' && !isSkipped) return;
        }

        html += `<div class="review-item ${cls}"><div class="review-q-text"><strong>Q${i+1}.</strong> ${q.question}</div><div class="review-options">`;
        q.options.forEach((opt, j) => {
            let oc = '';
            if (j === q.answer) oc = 'ro-correct';
            else if (j === userAns && !isCorrect) oc = 'ro-wrong';
            html += `<div class="review-opt ${oc}"><span class="ro-letter">${letters[j]}.</span> ${opt}</div>`;
        });
        if (q.explanation) html += `<div class="explanation" style="display:block;margin-top:12px"><strong>Explanation:</strong> ${q.explanation}</div>`;
        html += '</div></div>';
    });
    if (!html) html = '<p style="text-align:center;color:var(--text2);padding:40px">No questions in this category.</p>';
    list.innerHTML = html;
}

function filterReview(filter, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderReview(filter);
}

function goHome() {
    stopTimer();
    showScreen('landing-screen');
}

document.addEventListener('DOMContentLoaded', init);
