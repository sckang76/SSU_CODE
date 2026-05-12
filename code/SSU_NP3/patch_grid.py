import os

path = r'c:\Users\GFS\Desktop\SCK\SSU\code\SSU_NP3\quiz.js'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update selectMockAnswer
old_select = '''window.selectMockAnswer = function(qIndex, optIndex) {
    currentQuestions[qIndex].userAnswer = optIndex;
    const step = document.getElementById(`step-${qIndex}`);
    if (step) step.classList.add('active'); // 마킹됨 표시
}'''

new_select = '''window.selectMockAnswer = function(qIndex, optIndex) {
    currentQuestions[qIndex].userAnswer = optIndex;
    const totalPages = Math.ceil(currentQuestions.length / Q_PER_PAGE);
    let answeredCount = currentQuestions.filter(q => q.userAnswer !== undefined).length;
    document.getElementById('progress-text').innerHTML = `마킹 완료: <strong style="color:var(--primary);">${answeredCount}</strong> / ${currentQuestions.length} 문항 <span style="margin-left:15px; color:var(--text-muted); font-size:0.9rem;">(시험지 ${currentPage + 1} / ${totalPages} 쪽)</span>`;
}'''
code = code.replace(old_select, new_select)

# 2. Remove grid logic and update text in renderQuestion (Mock Mode)
old_grid = '''        // OMR 그리드
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
        document.getElementById('progress-text').textContent = `시험지 ${currentPage + 1} / ${totalPages} 쪽`;'''

new_grid = '''        const stepsContainer = document.getElementById('progress-steps');
        if (stepsContainer) stepsContainer.style.display = 'none'; // 바둑판 숨김

        const totalPages = Math.ceil(currentQuestions.length / Q_PER_PAGE);
        let answeredCount = currentQuestions.filter(q => q.userAnswer !== undefined).length;
        document.getElementById('progress-text').innerHTML = `마킹 완료: <strong style="color:var(--primary);">${answeredCount}</strong> / ${currentQuestions.length} 문항 <span style="margin-left:15px; color:var(--text-muted); font-size:0.9rem;">(시험지 ${currentPage + 1} / ${totalPages} 쪽)</span>`;'''
code = code.replace(old_grid, new_grid)

# 3. Restore grid display for Normal Mode
old_normal = '''        // ── 기존 1문항 진행 모드 ──
        const q = currentQuestions[currentIndex];
        const stepsContainer = document.getElementById('progress-steps');
        if (stepsContainer) {
            stepsContainer.classList.remove('mock-grid');'''

new_normal = '''        // ── 기존 1문항 진행 모드 ──
        const q = currentQuestions[currentIndex];
        const stepsContainer = document.getElementById('progress-steps');
        if (stepsContainer) {
            stepsContainer.style.display = 'flex'; // 일반 모드에서는 다시 보이기
            stepsContainer.classList.remove('mock-grid');'''
code = code.replace(old_normal, new_normal)

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)
print("Patch applied successfully.")
