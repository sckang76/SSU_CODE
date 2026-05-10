let currentQuestions = [];
let currentIndex = 0;
let score = 0;

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
    
    document.getElementById('category-title').textContent = titles[category] || '자격증 퀴즈';
    
    try {
        // 실제 데이터 파일 로드
        const response = await fetch(`./data/${category}.json`);
        if (!response.ok) throw new Error('Data not found');
        const data = await response.json();
        
        // 1. 문제 배열 셔플 (Fisher-Yates Shuffle)
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        
        // 2. 랜덤으로 10문제만 추출 (데이터가 적으면 전체 사용)
        currentQuestions = data.slice(0, 10);
        
        renderQuestion();
    } catch (e) {
        console.error("Failed to load quiz", e);
        // 데이터가 없을 경우 에러 메시지
        document.getElementById('quiz-box').innerHTML = `
            <div class="question-card active" style="text-align:center;">
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
    document.getElementById('progress-text').textContent = `Question ${currentIndex + 1} of ${currentQuestions.length}`;

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
    resultScreen.style.display = 'block';
}

loadQuiz();
