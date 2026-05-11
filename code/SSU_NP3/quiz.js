let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let wrongQuestions = [];

async function loadQuiz() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'elec';
    const levelParam = urlParams.get('level'); // '1', '2', '3' 또는 'all'

    const titles = {
        'elec': '소방설비기사 (전기분야)',
        'mech': '소방설비기사 (기계분야)',
        'danger': '위험물산업기사',
        'manager': '소방시설관리사',
        'pe': '소방기술사'
    };

    const titleEl = document.getElementById('category-title');
    let levelTitle = '';
    if (levelParam === '1') levelTitle = '⭐ 기초 단계 ';
    else if (levelParam === '2') levelTitle = '⭐⭐ 응용 단계 ';
    else if (levelParam === '3') levelTitle = '⭐⭐⭐ 심화 단계 ';
    else levelTitle = '🎲 전체 랜덤 ';

    if (titleEl) titleEl.textContent = levelTitle + (titles[category] || '자격증 퀴즈');

    try {
        const response = await fetch(`./data/${category}.json`);
        if (!response.ok) throw new Error('Data not found');
        let data = await response.json();

        // 난이도 필터링
        if (levelParam && levelParam !== 'all') {
            const targetLevel = parseInt(levelParam);
            const filtered = data.filter(q => (q.difficulty || 1) === targetLevel);
            // 해당 난이도 문제가 10개 이상이면 필터링 적용, 아니면 전체에서 출제
            if (filtered.length >= 10) {
                data = filtered;
            }
        }

        // ── 중복 방지: localStorage에서 이미 출제된 문제 키 로드 ──
        const storageKey = `firekit_seen_${category}_lv${levelParam || 'all'}`;
        let seenKeys = JSON.parse(localStorage.getItem(storageKey) || '[]');

        // 아직 안 나온 문제 필터링
        let unseenData = data.filter(q => !seenKeys.includes(q.question));

        // 남은 문제가 10개 미만이면 전체 리셋 후 다시 시작
        let wasReset = false;
        if (unseenData.length < 10) {
            seenKeys = [];
            localStorage.setItem(storageKey, JSON.stringify(seenKeys));
            unseenData = data;
            wasReset = true;
        }

        // 셔플
        for (let i = unseenData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [unseenData[i], unseenData[j]] = [unseenData[j], unseenData[i]];
        }

        // 10문제 선택
        if (unseenData.length === 0) throw new Error('No questions available');
        currentQuestions = unseenData.slice(0, 10);
        currentIndex = 0;
        score = 0;
        wrongQuestions = [];

        // 출제된 문제를 seen 목록에 추가 & 저장
        const newSeen = currentQuestions.map(q => q.question);
        const updatedSeen = [...seenKeys, ...newSeen];
        localStorage.setItem(storageKey, JSON.stringify(updatedSeen));

        // 진행 상황 대시보드 업데이트
        const totalSeen = updatedSeen.length;
        const totalCount = data.length;
        updateMasteryDashboard(totalSeen, totalCount, wasReset);

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

// ── 진행 상황 상단 대시보드 업데이트 ────────────────────────────
function updateMasteryDashboard(seen, total, wasReset) {
    const dashboard = document.getElementById('mastery-dashboard');
    const bar = document.getElementById('mastery-bar');
    const countText = document.getElementById('mastery-count');
    const percentText = document.getElementById('mastery-percent');

    if (!dashboard || !bar || !countText || !percentText) return;

    const pct = Math.round((seen / total) * 100);

    // 대시보드 표시
    dashboard.style.display = 'block';
    
    // 값 주입
    countText.textContent = `${seen} / ${total} 문항`;
    percentText.textContent = `${pct}%`;
    
    // 바 애니메이션 (약간의 지연 후 실행하여 시각 효과 극대화)
    setTimeout(() => {
        bar.style.width = `${pct}%`;
    }, 100);

    if (wasReset) {
        percentText.innerHTML = `🔄 초기화됨`;
        percentText.style.background = `var(--surface-2)`;
        percentText.style.color = `var(--text-muted)`;
    }
}

// ─── 난이도 별 렌더링 헬퍼 ───────────────────────────────────
function renderStars(difficulty) {
    const level = difficulty || 1;
    const labels = { 1: '기본', 2: '응용', 3: '심화' };
    const colorClass = { 1: 'diff-easy', 2: 'diff-mid', 3: 'diff-hard' };
    const stars = Array(3).fill(0).map((_, i) =>
        `<span class="star ${i < level ? 'on' : 'off'}">★</span>`
    ).join('');
    return `<span class="difficulty-badge ${colorClass[level]}">
        ${stars}<span class="diff-label">${labels[level]}</span>
    </span>`;
}

function renderQuestion() {
    const quizBox = document.getElementById('quiz-box');
    const q = currentQuestions[currentIndex];

    const stepsContainer = document.getElementById('progress-steps');
    if (stepsContainer) {
        // 처음 한 번만 10개 칸 생성
        if (stepsContainer.children.length === 0) {
            for (let i = 0; i < currentQuestions.length; i++) {
                const step = document.createElement('div');
                step.className = 'step';
                stepsContainer.appendChild(step);
            }
        }
        // 현재 단계까지 active 클래스 부여
        Array.from(stepsContainer.children).forEach((step, i) => {
            if (i <= currentIndex) step.classList.add('active');
            else step.classList.remove('active');
        });
    }
    document.getElementById('progress-text').textContent = `Question ${currentIndex + 1} / ${currentQuestions.length}`;

    quizBox.innerHTML = `
        <div class="quiz-main active">
            <div class="q-meta">
                <div class="q-number">Question ${currentIndex + 1}</div>
                ${renderStars(q.difficulty)}
            </div>
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
    setTimeout(() => overlay.classList.remove('show'), 1000);
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

    const scoreCircle = resultScreen.querySelector('.score-circle');
    if (scoreCircle) scoreCircle.textContent = `${finalScore}%`;

    const resultTitle = resultScreen.querySelector('.result-title');
    if (resultTitle) resultTitle.textContent = finalScore >= 60 ? "축하합니다! 합격권입니다." : "조금 더 노력이 필요합니다.";

    const wrongList = document.getElementById('wrong-answer-list');
    if (wrongQuestions.length > 0) {
        wrongList.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:20px; padding-top:20px; border-top:1px solid var(--border);">
                <i data-lucide="list-checks" style="color:var(--primary)"></i>
                <h3 style="font-size:1.1rem; font-weight:800;">오답 정밀 분석 리포트</h3>
            </div>
            ${wrongQuestions.map((q) => `
                <div class="review-card">
                    <div class="review-q-meta">
                        ${renderStars(q.difficulty)}
                    </div>
                    <div class="review-q">
                        <span style="color:var(--error)">Q.</span>
                        <span>${q.question}</span>
                    </div>
                    <div class="review-compare">
                        <div class="compare-box mine">
                            <div style="font-size:0.7rem; opacity:0.8; margin-bottom:4px;">내가 선택한 답</div>
                            ${q.selected}
                        </div>
                        <div class="compare-box correct">
                            <div style="font-size:0.7rem; opacity:0.8; margin-bottom:4px;">올바른 정답</div>
                            ${q.correct}
                        </div>
                    </div>
                    <div class="review-exp">
                        <strong><i data-lucide="help-circle" style="width:14px; vertical-align:middle;"></i> 해설:</strong> ${q.explanation}
                    </div>
                </div>
            `).join('')}
        `;
    } else {
        wrongList.innerHTML = `
            <div class="score-card" style="background:var(--primary-soft); border-color:var(--primary); margin-top:20px;">
                <i data-lucide="trophy" style="width:48px; height:48px; color:var(--primary); margin-bottom:15px;"></i>
                <h3 style="color:var(--primary); font-weight:800;">PERFECT!</h3>
                <p style="color:var(--text-muted); font-size:0.9rem;">모든 문제를 완벽하게 맞히셨습니다.</p>
            </div>
        `;
    }

    resultScreen.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
}

loadQuiz();
