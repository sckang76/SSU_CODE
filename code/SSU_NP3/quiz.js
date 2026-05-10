let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let wrongQuestions = []; // 틀린 문제 저장

async function loadQuiz() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'elec'; 
    
    const titles = {
        'elec': '소방설비기사 (전기분야)',
        'mech': '소방설비기사 (기계분야)',
        'danger': '위험물산업기사',
        'manager': '소방시설관리사',
        'pe': '소방기술사'
    };
    
    const titleEl = document.getElementById('category-title');
    if (titleEl) titleEl.textContent = titles[category] || '자격증 퀴즈';
    
    try {
        const response = await fetch(`./data/${category}.json`);
        if (!response.ok) throw new Error('Data not found');
        const data = await response.json();
        
        // 1. 문제 배열 셔플
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        
        // 2. 랜덤 10문제 추출
        currentQuestions = data.slice(0, 10);
        currentIndex = 0;
        score = 0;
        wrongQuestions = [];
        
        document.getElementById('quiz-box').style.display = 'block';
        document.querySelector('.quiz-header').style.display = 'block';
        document.getElementById('result-screen').style.display = 'none';
        
        renderQuestion();
    } catch (e) {
        console.error("Failed to load quiz", e);
        document.getElementById('quiz-box').innerHTML = `
            <div class="quiz-main active" style="text-align:center;">
                <p style="margin-bottom:20px;">준비 중인 카테고리입니다. 곧 방대한 문제가 업데이트될 예정입니다!</p>
                <button class="btn-start" onclick="location.href='index.html'">돌아가기</button>
            </div>
        `;
    }
}

function renderQuestion() {
    const quizBox = document.getElementById('quiz-box');
    const q = currentQuestions[currentIndex];
    
    const progress = ((currentIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Question ${currentIndex + 1} / ${currentQuestions.length}`;

    quizBox.innerHTML = `
        <div class="quiz-main active">
            <div class="q-number">Question ${currentIndex + 1}</div>
            <div class="q-text">${q.question}</div>
            <div class="options-list">
                ${q.options.map((opt, i) => `
                    <button class="option-btn" onclick="checkAnswer(${i})">${opt}</button>
                `).join('')}
            </div>
            <div class="explanation-box" id="explanation">
                <div class="exp-title"><i data-lucide="lightbulb"></i> 핵심 콕! 합격 포인트</div>
                <div class="exp-text">${q.explanation}</div>
                <button class="btn-nav btn-next" style="margin-top:20px; width:100%;" onclick="nextQuestion()">다음 문제로 넘어가기</button>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function checkAnswer(selectedIdx) {
    const q = currentQuestions[currentIndex];
    const btns = document.querySelectorAll('.option-btn');
    const expBox = document.getElementById('explanation');
    
    btns.forEach(btn => btn.onclick = null);
    
    const isCorrect = (selectedIdx === q.answer);
    showOX(isCorrect);
    
    if (isCorrect) {
        btns[selectedIdx].classList.add('correct');
        score++;
    } else {
        btns[selectedIdx].classList.add('wrong');
        btns[q.answer].classList.add('correct');
        // 틀린 문제 정보 저장
        wrongQuestions.push({
            ...q,
            selected: q.options[selectedIdx],
            correct: q.options[q.answer]
        });
    }
    
    setTimeout(() => {
        expBox.classList.add('show');
    }, 800);
}

function showOX(isCorrect) {
    let overlay = document.getElementById('ox-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'ox-overlay';
        overlay.className = 'ox-overlay';
        document.body.appendChild(overlay);
    }
    
    overlay.innerHTML = isCorrect 
        ? `<svg class="ox-o" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`
        : `<svg class="ox-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    
    overlay.classList.add('show');
    
    setTimeout(() => {
        overlay.classList.remove('show');
    }, 1000);
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-box').style.display = 'none';
    document.querySelector('.quiz-header').style.display = 'none';
    const resultScreen = document.getElementById('result-screen');
    const finalScore = Math.round((score / currentQuestions.length) * 100);
    
    document.getElementById('final-score').textContent = `${finalScore}%`;
    
    // 오답 리스트 생성
    const wrongList = document.getElementById('wrong-answer-list');
    if (wrongQuestions.length > 0) {
        wrongList.innerHTML = `
            <h3 style="margin-bottom:15px; font-size:1.1rem; color:var(--error);"><i data-lucide="alert-circle" style="vertical-align:middle; width:20px;"></i> 오답 다시 보기</h3>
            ${wrongQuestions.map((q, i) => `
                <div class="explanation-box" style="margin-bottom:15px; border-left:4px solid var(--error); background:#fff;">
                    <p style="font-weight:800; margin-bottom:8px;">${q.question}</p>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:4px;">❌ 선택: <span style="color:var(--error)">${q.selected}</span></p>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:10px;">✅ 정답: <span style="color:var(--success)">${q.correct}</span></p>
                    <div style="font-size:0.9rem; padding:10px; background:var(--bg); border-radius:6px; color:var(--text-main);">
                        <strong>해설:</strong> ${q.explanation}
                    </div>
                </div>
            `).join('')}
        `;
    } else {
        wrongList.innerHTML = `<div class="explanation-box" style="border-left-color:var(--success);"><p style="font-weight:800; color:var(--success);">모든 문제를 맞히셨습니다! 완벽합니다. 👏</p></div>`;
    }
    
    resultScreen.style.display = 'block';
    lucide.createIcons();
}

loadQuiz();
