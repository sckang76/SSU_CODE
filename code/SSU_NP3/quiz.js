let currentQuestions = [];
let currentIndex = 0;
let score = 0;

async function loadQuiz() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'elec'; // Default to electrical
    
    // Set titles based on category
    const titles = {
        'elec': '소방설비기사 (전기분야)',
        'mech': '소방설비기사 (기계분야)',
        'danger': '위험물산업기사',
        'manager': '소방시설관리사',
        'pe': '소방기술사'
    };
    
    document.getElementById('category-title').textContent = titles[category] || '자격증 퀴즈';
    
    try {
        // In a real app, we'd fetch JSON. For demo, I'll define sample data here if fetch fails.
        // const response = await fetch(`./data/${category}.json`);
        // currentQuestions = await response.json();
        
        // Sample data for demonstration
        if (category === 'elec') {
            currentQuestions = [
                {
                    question: "자동화재탐지설비의 발신기 설치 높이 기준으로 옳은 것은?",
                    options: ["바닥으로부터 0.5m 이상 1.0m 이하", "바닥으로부터 0.8m 이상 1.5m 이하", "바닥으로부터 1.5m 이상 2.0m 이하", "높이 제한 없음"],
                    answer: 1,
                    explanation: "발신기는 조작하기 쉬운 위치에 설치해야 하며, 규정상 **0.8m 이상 1.5m 이하**입니다. 보통 성인 눈높이보다 약간 아래라고 생각하면 쉬워요!"
                },
                {
                    question: "감지기 회로의 말단에 종단저항을 설치하는 주된 목적은?",
                    options: ["회로의 전압을 높이기 위해", "감지기의 감도를 조절하기 위해", "회로의 도통시험을 하기 위해", "화재 신호를 증폭하기 위해"],
                    answer: 2,
                    explanation: "종단저항은 회로가 끊어지지 않고 잘 연결되어 있는지 확인하는 **'도통시험'**을 위해 설치합니다. 끝에 저항이 있어야 전류가 흘러서 선이 살아있는지 알 수 있거든요."
                }
            ];
        } else {
            currentQuestions = [
                {
                    question: "샘플 문제입니다. (데이터 준비 중)",
                    options: ["1번", "2번", "3번", "4번"],
                    answer: 0,
                    explanation: "각 카테고리별 데이터를 구성 중입니다."
                }
            ];
        }
        
        renderQuestion();
    } catch (e) {
        console.error("Failed to load quiz", e);
    }
}

function renderQuestion() {
    const quizBox = document.getElementById('quiz-box');
    const q = currentQuestions[currentIndex];
    
    // Update progress
    const progress = ((currentIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Question ${currentIndex + 1} of ${currentQuestions.length}`;

    quizBox.innerHTML = `
        <div class="question-card active">
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
                <button class="btn-nav btn-next" style="margin-top:20px;" onclick="nextQuestion()">다음 문제로 <i data-lucide="arrow-right"></i></button>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function checkAnswer(selectedIdx) {
    const q = currentQuestions[currentIndex];
    const btns = document.querySelectorAll('.option-btn');
    const expBox = document.getElementById('explanation');
    
    // Disable all buttons after choice
    btns.forEach(btn => btn.onclick = null);
    
    if (selectedIdx === q.answer) {
        btns[selectedIdx].classList.add('correct');
        score++;
    } else {
        btns[selectedIdx].classList.add('wrong');
        btns[q.answer].classList.add('correct');
    }
    
    expBox.classList.add('show');
    lucide.createIcons();
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
