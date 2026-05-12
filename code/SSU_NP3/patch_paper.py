import os

# 1. Update style.css
style_path = r'c:\Users\GFS\Desktop\SCK\SSU\code\SSU_NP3\style.css'
with open(style_path, 'r', encoding='utf-8') as f:
    style_content = f.read()

if '.paper-mock' not in style_content:
    paper_css = """
/* --- 실전 시험지(Paper) 모드 스타일 --- */
.paper-mock {
    font-family: 'Batang', 'BatangChe', 'Gungsuh', 'Malgun Gothic', serif;
    background: #fff;
    color: #111;
    padding: 30px 20px;
    border-radius: 4px;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    max-width: 800px;
    margin: 0 auto;
}
.paper-header {
    border-bottom: 2px solid #000;
    padding-bottom: 10px;
    margin-bottom: 20px;
}
.paper-top-right {
    text-align: right;
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 4px;
    margin-bottom: 10px;
}
.paper-table {
    width: 100%;
    border-collapse: collapse;
    border: 2px solid #000;
}
.paper-table th, .paper-table td {
    border: 1px solid #000;
    padding: 10px 12px;
    font-size: 1.1rem;
}
.paper-table th {
    background: #f0f0f0;
    width: 20%;
    font-weight: bold;
}
.paper-subject-title {
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    text-align: center;
    font-size: 1.4rem;
    font-weight: bold;
    padding: 12px 0;
    margin: 35px 0 25px 0;
}
.paper-q-item {
    margin-bottom: 30px;
    line-height: 1.6;
}
.paper-q-text {
    font-size: 1.15rem;
    font-weight: bold;
    margin-bottom: 12px;
    word-break: keep-all;
}
.paper-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 15px;
}
.paper-options label {
    font-size: 1.05rem;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    gap: 8px;
}
.paper-options input[type="radio"] {
    margin-top: 6px;
    transform: scale(1.3);
    accent-color: #333;
}
.paper-nav-btns {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    border-top: 1px dashed #ccc;
    padding-top: 25px;
}
.btn-paper {
    padding: 12px 24px;
    font-size: 1.1rem;
    font-weight: bold;
    border: 2px solid #333;
    background: #fff;
    color: #333;
    cursor: pointer;
    border-radius: 4px;
    transition: 0.2s;
}
.btn-paper:hover { background: #333; color: #fff; }
.btn-paper-submit {
    background: #dc2626; color: #fff; border-color: #dc2626;
}
.btn-paper-submit:hover { background: #b91c1c; }
@media(min-width: 600px) {
    .paper-options { flex-direction: row; flex-wrap: wrap; gap: 20px; }
    .paper-options label { width: 45%; }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(paper_css)

# 2. Complete rewrite of quiz.js to include Paging Logic
quiz_js = """let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let wrongQuestions = [];
let isMockMode = false;
let mockTimerInterval = null;

let currentPage = 0;
const Q_PER_PAGE = 10;

async function loadQuiz() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'elec';
    const levelParam = urlParams.get('level'); // '1', '2', '3' 또는 'all'
    const modeParam = urlParams.get('mode');
    isMockMode = (modeParam === 'mock');

    const titles = {
        'elec': '소방설비기사 (전기분야)',
        'mech': '소방설비기사 (기계분야)',
        'danger': '위험물산업기사',
        'manager': '소방시설관리사',
        'pe': '소방기술사'
    };

    const subParam = urlParams.get('sub') || 'all';
    const subNameParam = urlParams.get('subName');

    const titleEl = document.getElementById('category-title');
    let levelTitle = '';
    if (levelParam === '1') levelTitle = '⭐ 기초 단계 ';
    else if (levelParam === '2') levelTitle = '⭐⭐ 응용 단계 ';
    else if (levelParam === '3') levelTitle = '⭐⭐⭐ 심화 단계 ';
    else levelTitle = '🎲 랜덤 모의고사 ';

    if (titleEl) {
        let finalTitle = levelTitle + (titles[category] || '자격증 퀴즈');
        if (isMockMode) {
            finalTitle = `⏱️ 실전 모의고사 [${titles[category]}]`;
            try { document.querySelector('.site-header div:nth-child(2) div:nth-child(2)').textContent = '실전 자격증 취득 모드'; } catch(e){}
        } else if (subNameParam && subParam !== 'all') {
            finalTitle += ` [${subNameParam}]`;
        }
        titleEl.textContent = finalTitle;
    }

    try {
        const response = await fetch(`./data/${category}.json`);
        if (!response.ok) throw new Error('Data not found');
        let data = await response.json();

        if (isMockMode) {
            const mockConfig = {
                'elec': { numSubjects: 4, perSubject: 20, timeLimitSec: 120 * 60 },
                'mech': { numSubjects: 4, perSubject: 20, timeLimitSec: 120 * 60 },
                'danger': { numSubjects: 3, perSubject: 20, timeLimitSec: 90 * 60 },
                'manager': { numSubjects: 5, perSubject: 25, timeLimitSec: 125 * 60 }
            };
            const config = mockConfig[category] || mockConfig['elec'];
            
            let mockQuestions = [];
            for (let s = 1; s <= config.numSubjects; s++) {
                let subQ = data.filter(q => q.sub_subject === s);
                for (let i = subQ.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [subQ[i], subQ[j]] = [subQ[j], subQ[i]];
                }
                mockQuestions = mockQuestions.concat(subQ.slice(0, config.perSubject));
            }
            currentQuestions = mockQuestions;
            currentPage = 0;
            score = 0;
            wrongQuestions = [];

            document.getElementById('mastery-dashboard').style.display = 'none';
            document.getElementById('mock-timer-box').style.display = 'flex';
            startMockTimer(config.timeLimitSec);
            
        } else {
            // ── 기존 로직: 세부 과목 필터링 ──
            if (subParam !== 'all') {
                const targetSub = parseInt(subParam);
                const subFiltered = data.filter(q => q.sub_subject === targetSub);
                if (subFiltered.length > 0) data = subFiltered;
            }

            if (levelParam && levelParam !== 'all') {
                const targetLevel = parseInt(levelParam);
                const filtered = data.filter(q => (q.difficulty || 1) === targetLevel);
                if (filtered.length >= 10) data = filtered;
            }

            const storageKey = `firekit_seen_${category}_sub${subParam}_lv${levelParam || 'all'}`;
            let seenKeys = JSON.parse(localStorage.getItem(storageKey) || '[]');
            let unseenData = data.filter(q => !seenKeys.includes(q.question));

            let wasReset = false;
            if (unseenData.length < 10) {
                seenKeys = [];
                localStorage.setItem(storageKey, JSON.stringify(seenKeys));
                unseenData = data;
                wasReset = true;
            }

            for (let i = unseenData.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [unseenData[i], unseenData[j]] = [unseenData[j], unseenData[i]];
            }

            if (unseenData.length === 0) throw new Error('No questions available');
            currentQuestions = unseenData.slice(0, 10);
            currentIndex = 0;
            score = 0;
            wrongQuestions = [];

            const newSeen = currentQuestions.map(q => q.question);
            const updatedSeen = [...seenKeys, ...newSeen];
            localStorage.setItem(storageKey, JSON.stringify(updatedSeen));

            document.getElementById('mock-timer-box').style.display = 'none';
            updateMasteryDashboard(updatedSeen.length, data.length, wasReset);
        }

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

function startMockTimer(totalSec) {
    let secLeft = totalSec;
    const display = document.getElementById('mock-timer-display');
    clearInterval(mockTimerInterval);
    
    function updateDisplay() {
        if (secLeft <= 0) {
            clearInterval(mockTimerInterval);
            alert('시험 시간이 종료되었습니다! (자동 제출)');
            evaluateMock();
            return;
        }
        const h = String(Math.floor(secLeft / 3600)).padStart(2, '0');
        const m = String(Math.floor((secLeft % 3600) / 60)).padStart(2, '0');
        const s = String(secLeft % 60).padStart(2, '0');
        display.textContent = `${h}:${m}:${s}`;
        
        if (secLeft <= 600) display.style.color = '#ef4444'; // 10분 남으면 빨간색
        secLeft--;
    }
    updateDisplay();
    mockTimerInterval = setInterval(updateDisplay, 1000);
}

function updateMasteryDashboard(seen, total, wasReset) {
    const dashboard = document.getElementById('mastery-dashboard');
    const bar = document.getElementById('mastery-bar');
    const countText = document.getElementById('mastery-count');
    const percentText = document.getElementById('mastery-percent');

    if (!dashboard || !bar || !countText || !percentText) return;

    const pct = Math.round((seen / total) * 100);

    dashboard.style.display = 'block';
    countText.textContent = `${seen} / ${total} 문항`;
    percentText.textContent = `${pct}%`;
    
    setTimeout(() => { bar.style.width = `${pct}%`; }, 100);

    if (wasReset) {
        percentText.innerHTML = `🔄 초기화됨`;
        percentText.style.background = `var(--surface-2)`;
        percentText.style.color = `var(--text-muted)`;
    }
}

function renderStars(difficulty) {
    const level = difficulty || 1;
    const labels = { 1: '기본', 2: '응용', 3: '심화' };
    const colorClass = { 1: 'diff-easy', 2: 'diff-mid', 3: 'diff-hard' };
    const stars = Array(3).fill(0).map((_, i) => `<span class="star ${i < level ? 'on' : 'off'}">★</span>`).join('');
    return `<span class="difficulty-badge ${colorClass[level]}">${stars}<span class="diff-label">${labels[level]}</span></span>`;
}

// ── 모의고사 전용 네비게이션 함수 ──
window.selectMockAnswer = function(qIndex, optIndex) {
    currentQuestions[qIndex].userAnswer = optIndex;
    const step = document.getElementById(`step-${qIndex}`);
    if (step) step.classList.add('active'); // 마킹됨 표시
}
window.prevPage = function() {
    if (currentPage > 0) { currentPage--; renderQuestion(); window.scrollTo(0,0); }
}
window.nextPage = function() {
    const totalPages = Math.ceil(currentQuestions.length / Q_PER_PAGE);
    if (currentPage < totalPages - 1) { currentPage++; renderQuestion(); window.scrollTo(0,0); }
}
window.submitMock = function() {
    let unans = currentQuestions.filter(q => q.userAnswer === undefined).length;
    let msg = unans > 0 ? `아직 풀지 않은 문제가 ${unans}개 있습니다.\\n그래도 제출하시겠습니까?` : '답안지를 제출하시겠습니까?';
    if (confirm(msg)) {
        evaluateMock();
    }
}
function evaluateMock() {
    score = 0;
    wrongQuestions = [];
    currentQuestions.forEach(q => {
        q.isCorrect = (q.userAnswer === q.answer);
        if (q.isCorrect) score++;
        else {
            wrongQuestions.push({
                ...q,
                selected: q.userAnswer !== undefined ? q.options[q.userAnswer] : '미선택',
                correct: q.options[q.answer]
            });
        }
    });
    showResults();
}

function renderQuestion() {
    const quizBox = document.getElementById('quiz-box');
    
    if (isMockMode) {
        // ── 실전 시험지 모드 (페이징) ──
        let html = '<div class="paper-mock">';
        
        // 첫 페이지 헤더
        if (currentPage === 0) {
            html += `
            <div class="paper-header">
                <div class="paper-top-right">국가기술자격</div>
                <table class="paper-table">
                    <tr>
                        <th>자격종목</th>
                        <td style="font-weight:bold;">${document.getElementById('category-title').textContent.replace('⏱️ 실전 모의고사 [', '').replace(']', '')}</td>
                    </tr>
                </table>
            </div>`;
        }

        const startIdx = currentPage * Q_PER_PAGE;
        const endIdx = Math.min(startIdx + Q_PER_PAGE, currentQuestions.length);
        
        let lastSubject = -1;
        if (startIdx > 0) {
            lastSubject = currentQuestions[startIdx - 1].sub_subject;
        }

        for (let i = startIdx; i < endIdx; i++) {
            const q = currentQuestions[i];
            
            if (q.sub_subject !== lastSubject) {
                html += `<div class="paper-subject-title">제${q.sub_subject}과목 : ${q.sub_subject_name}</div>`;
                lastSubject = q.sub_subject;
            }

            html += `<div class="paper-q-item">
                <div class="paper-q-text">${i + 1}. ${q.question}</div>
                <div class="paper-options">`;
            
            const labels = ['가', '나', '다', '라'];
            q.options.forEach((opt, optIdx) => {
                const checked = (q.userAnswer === optIdx) ? 'checked' : '';
                html += `
                    <label>
                        <input type="radio" name="mock_q_${i}" value="${optIdx}" onchange="selectMockAnswer(${i}, ${optIdx})" ${checked}>
                        ${labels[optIdx]}. ${opt}
                    </label>
                `;
            });
            html += `</div></div>`;
        }

        const totalPages = Math.ceil(currentQuestions.length / Q_PER_PAGE);
        html += `<div class="paper-nav-btns">`;
        if (currentPage > 0) html += `<button class="btn-paper" onclick="prevPage()">◀ 이전 장</button>`;
        else html += `<div></div>`;
        
        if (currentPage < totalPages - 1) html += `<button class="btn-paper" onclick="nextPage()">다음 장 ▶</button>`;
        else html += `<button class="btn-paper btn-paper-submit" onclick="submitMock()">답안지 최종 제출</button>`;
        
        html += `</div></div>`;
        quizBox.innerHTML = html;

        // OMR 그리드
        const stepsContainer = document.getElementById('progress-steps');
        if (stepsContainer) {
            stepsContainer.classList.add('mock-grid');
            if (stepsContainer.children.length === 0) {
                for (let i = 0; i < currentQuestions.length; i++) {
                    const step = document.createElement('div');
                    step.className = 'step';
                    step.id = `step-${i}`;
                    stepsContainer.appendChild(step);
                }
            }
            for (let i = 0; i < currentQuestions.length; i++) {
                const step = document.getElementById(`step-${i}`);
                if (currentQuestions[i].userAnswer !== undefined) step.classList.add('active');
                else step.classList.remove('active');
            }
        }
        document.getElementById('progress-text').textContent = `시험지 ${currentPage + 1} / ${totalPages} 쪽`;

    } else {
        // ── 기존 1문항 진행 모드 ──
        const q = currentQuestions[currentIndex];
        const stepsContainer = document.getElementById('progress-steps');
        if (stepsContainer) {
            stepsContainer.classList.remove('mock-grid');
            if (stepsContainer.children.length === 0) {
                for (let i = 0; i < currentQuestions.length; i++) {
                    const step = document.createElement('div');
                    step.className = 'step';
                    stepsContainer.appendChild(step);
                }
            }
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
}

// 기존 checkAnswer (모의고사 아닐 때만 사용됨)
window.checkAnswer = function(selectedIdx) {
    const q = currentQuestions[currentIndex];
    const btns = document.querySelectorAll('.option-btn');
    const expBox = document.getElementById('explanation');

    btns.forEach(btn => btn.onclick = null);

    const isCorrect = (selectedIdx === q.answer);
    q.isCorrect = isCorrect; 
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
    setTimeout(() => { expBox.classList.add('show'); }, 800);
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

window.nextQuestion = function() {
    currentIndex++;
    if (currentIndex < currentQuestions.length) renderQuestion();
    else showResults();
}

function showResults() {
    clearInterval(mockTimerInterval);
    document.getElementById('quiz-box').style.display = 'none';
    document.querySelector('.quiz-header').style.display = 'none';
    document.getElementById('mock-timer-box').style.display = 'none';
    
    const resultScreen = document.getElementById('result-screen');
    const finalScore = Math.round((score / currentQuestions.length) * 100);

    const scoreCircle = resultScreen.querySelector('.score-circle');
    const resultTitle = resultScreen.querySelector('.result-title');
    const wrongList = document.getElementById('wrong-answer-list');
    
    wrongList.innerHTML = '';

    if (isMockMode) {
        let subjectScores = {};
        currentQuestions.forEach(q => {
            if(!subjectScores[q.sub_subject]) subjectScores[q.sub_subject] = { total: 0, correct: 0, name: q.sub_subject_name };
            subjectScores[q.sub_subject].total++;
            if(q.isCorrect) subjectScores[q.sub_subject].correct++;
        });

        let isFail = false;
        let subjectsHtml = '';
        for (const subId in subjectScores) {
            let s = subjectScores[subId];
            let subPct = Math.round((s.correct / s.total) * 100);
            if (subPct < 40) isFail = true;
            subjectsHtml += `
                <div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid rgba(148,163,184,0.2); font-size:0.95rem;">
                    <span>${s.name}</span>
                    <span style="font-weight:800; color: ${subPct < 40 ? 'var(--error)' : 'var(--text-main)'}">
                        ${subPct < 40 ? '⚠️과락 ' : ''}${subPct}점 (${s.correct}/${s.total})
                    </span>
                </div>
            `;
        }

        let isPass = (!isFail && finalScore >= 60);

        if (scoreCircle) {
            scoreCircle.textContent = `${finalScore}점`;
            scoreCircle.style.color = isPass ? 'var(--primary)' : 'var(--error)';
            scoreCircle.style.borderColor = isPass ? 'var(--primary)' : 'var(--error)';
        }

        if (resultTitle) {
            resultTitle.innerHTML = isPass 
                ? "합격을 진심으로 축하합니다! 🎉<br><span style='font-size:0.9rem; color:var(--text-muted); font-weight:500; display:block; margin-top:5px;'>모든 과목 과락 없이 평균 60점 이상입니다.</span>" 
                : "불합격입니다. 💦<br><span style='font-size:0.9rem; color:var(--error); font-weight:500; display:block; margin-top:5px;'>과락(40점 미만) 과목이 있거나 평균 60점 미만입니다.</span>";
        }

        wrongList.innerHTML += `
            <div style="background:var(--surface); border:1px solid rgba(148,163,184,0.3); border-radius:12px; margin-bottom:30px; padding:20px; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
                <h3 style="margin-bottom:15px; font-size:1.1rem; color:var(--fire); border-bottom:2px solid rgba(239,68,68,0.2); display:inline-block; padding-bottom:5px;"><i data-lucide="pie-chart"></i> 과목별 상세 점수</h3>
                ${subjectsHtml}
            </div>
        `;
    } else {
        if (scoreCircle) {
            scoreCircle.textContent = `${finalScore}점`;
            scoreCircle.style.color = ''; scoreCircle.style.borderColor = '';
        }
        if (resultTitle) resultTitle.textContent = finalScore >= 60 ? "축하합니다! 합격권입니다." : "조금 더 노력이 필요합니다.";
    }

    if (wrongQuestions.length > 0) {
        wrongList.innerHTML += `
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
        if (!isMockMode) {
            wrongList.innerHTML += `
                <div class="score-card" style="background:var(--primary-soft); border-color:var(--primary); margin-top:20px;">
                    <i data-lucide="trophy" style="width:48px; height:48px; color:var(--primary); margin-bottom:15px;"></i>
                    <h3 style="color:var(--primary); font-weight:800;">PERFECT!</h3>
                    <p style="color:var(--text-muted); font-size:0.9rem;">모든 문제를 완벽하게 맞히셨습니다.</p>
                </div>
            `;
        }
    }

    resultScreen.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
}

loadQuiz();
"""
with open(r'c:\Users\GFS\Desktop\SCK\SSU\code\SSU_NP3\quiz.js', 'w', encoding='utf-8') as f:
    f.write(quiz_js)
