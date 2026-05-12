import os
import re

path = r'c:\Users\GFS\Desktop\SCK\SSU\code\SSU_NP3\index.html'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update stats
code = code.replace('2,500+', '4,000+')
code = code.replace('data-target="2500">2,500', 'data-target="4000">4,000')
code = code.replace('625 문항', '1,000 문항')
code = code.replace('data-target="4">4', 'data-target="14">14') # Expert tips counter

# 2. Add Modal Tabs (danger and manager)
new_tabs = """                <!-- 위험물 탭 -->
                <div id="danger-tab" class="tab-content">
                    <div class="secret-item highlight">
                        <span class="secret-tag"><i data-lucide="flame"></i> 지정수량 두음문자 암기</span>
                        <p>제4류 위험물의 지정수량은 <strong>'특오, 일수사, 이일, 삼이, 사육, 동만'</strong> (특수인화물 50L, 제1석유류 수용성 400L...) 형식의 입에 붙는 두음문자를 만들어 외우는 것이 유일한 해법입니다.</p>
                    </div>
                    <div class="secret-item">
                        <span class="secret-tag"><i data-lucide="alert-triangle"></i> 소화적응성 함정</span>
                        <p>제5류 위험물(자기반응성 물질)은 자체적으로 산소를 함유하고 있어 질식소화가 불가능합니다. 반드시 <strong>대량의 물로 냉각소화(주수소화)</strong>를 해야 한다는 점이 매번 정답으로 출제됩니다.</p>
                    </div>
                </div>

                <!-- 관리사 탭 -->
                <div id="manager-tab" class="tab-content">
                    <div class="secret-item highlight">
                        <span class="secret-tag"><i data-lucide="clipboard-list"></i> NFTC 연상기법 암기</span>
                        <p>방대한 NFTC 기준은 단순 암기하면 며칠 뒤 다 잊어버립니다. 물이 흘러가는 순서인 <strong>'수원 → 가압송수장치 → 배관 → 밸브 → 헤드 → 전원'</strong> 순으로 머릿속에 그림을 그리며 외워야 실기까지 통과합니다.</p>
                    </div>
                    <div class="secret-item">
                        <span class="secret-tag"><i data-lucide="search"></i> 점검항목 트렌드 공략</span>
                        <p>최근 전기차 화재, 물류창고 화재 등 사회적 이슈가 된 부분의 <strong>안전기준(예: 창고시설 화재안전기준 제정)</strong>은 당해 연도 시험에 1순위로 출제되니 최신 개정 법령을 1주일 전에 꼭 확인하세요.</p>
                    </div>
                </div>
"""
if 'danger-tab' not in code:
    code = code.replace('<!-- 법령/수치 탭 -->', new_tabs + '\n                <!-- 법령/수치 탭 -->')

new_nav = """                        <button class="tab-btn" onclick="showTab('danger-tab', this)">🔥위험물</button>
                        <button class="tab-btn" onclick="showTab('manager-tab', this)">📋관리사</button>"""
if 'danger-tab' not in code:
    code = code.replace('<button class="tab-btn" onclick="showTab(\'law-tab\', this)">⚖️법령/수치</button>', new_nav + '\n                        <button class="tab-btn" onclick="showTab(\'law-tab\', this)">⚖️법령/수치</button>')

# 3. Replace cards
def make_card_bottom(cat, q_mock, min_mock, options_html):
    return f"""            <select id="sub-{cat}" class="sub-select" style="width:100%; padding:10px 14px; border-radius:10px; border:1px solid rgba(148, 163, 184, 0.3); background:var(--surface); color:var(--text-main); margin-bottom:14px; font-weight:700; font-size:0.9rem; outline:none; cursor:pointer;">
                <option value="all">📘 전체 과목 종합 (랜덤 출제)</option>
{options_html}
            </select>
            <div class="difficulty-selector">
                <button onclick="startQuiz('{cat}', '1')" class="diff-btn lv1" style="border:1px solid var(--border); background:var(--surface);">⭐ 기초</button>
                <button onclick="startQuiz('{cat}', '2')" class="diff-btn lv2" style="border:1px solid var(--border); background:var(--surface);">⭐⭐ 응용</button>
                <button onclick="startQuiz('{cat}', '3')" class="diff-btn lv3" style="border:1px solid var(--border); background:var(--surface);">⭐⭐⭐ 심화</button>
                <button onclick="startQuiz('{cat}', 'all')" class="diff-btn lv-all" style="border:none;"><i data-lucide="shuffle"></i> 랜덤</button>
            </div>
            <button onclick="startMockExam('{cat}')" class="btn-mock" style="width:100%; margin-top:12px; padding:12px; border-radius:10px; background:linear-gradient(135deg, #ef4444, #dc2626); color:white; border:none; font-weight:700; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:8px; box-shadow:0 4px 15px rgba(239,68,68,0.3);">
                <i data-lucide="timer" style="width:18px;height:18px;"></i> 실전 모의고사 ({q_mock}문항 / {min_mock}분)
            </button>
        </div>"""

opt_elec = '''                <option value="1">1과목: 소방원론</option>
                <option value="2">2과목: 소방전기일반</option>
                <option value="3">3과목: 소방관계법규</option>
                <option value="4">4과목: 소방전기시설의 구조/원리</option>'''

opt_mech = '''                <option value="1">1과목: 소방원론</option>
                <option value="2">2과목: 소방유체역학</option>
                <option value="3">3과목: 소방관계법규</option>
                <option value="4">4과목: 소방기계시설의 구조/원리</option>'''

opt_danger = '''                <option value="1">1과목: 일반화학</option>
                <option value="2">2과목: 화재예방과 소화방법</option>
                <option value="3">3과목: 위험물의 성질과 취급</option>'''

opt_manager = '''                <option value="1">1과목: 안전관리론 및 화재역학</option>
                <option value="2">2과목: 수리학/약제화학/소방전기</option>
                <option value="3">3과목: 소방관련법령</option>
                <option value="4">4과목: 위험물 성상 및 시설기준</option>
                <option value="5">5과목: 소방시설의 구조원리</option>'''

code = re.sub(r'<div class="difficulty-selector">\s*<a href="quiz.html\?cat=elec.*?</div>\s*</div>', make_card_bottom('elec', 80, 120, opt_elec), code, flags=re.DOTALL)
code = re.sub(r'<div class="difficulty-selector">\s*<a href="quiz.html\?cat=mech.*?</div>\s*</div>', make_card_bottom('mech', 80, 120, opt_mech), code, flags=re.DOTALL)
code = re.sub(r'<div class="difficulty-selector">\s*<a href="quiz.html\?cat=danger.*?</div>\s*</div>', make_card_bottom('danger', 60, 90, opt_danger), code, flags=re.DOTALL)
code = re.sub(r'<div class="difficulty-selector">\s*<a href="quiz.html\?cat=manager.*?</div>\s*</div>', make_card_bottom('manager', 125, 125, opt_manager), code, flags=re.DOTALL)

# 4. Add Javascript functions
js_funcs = """
    function startQuiz(cat, level) {
        const selectBox = document.getElementById('sub-' + cat);
        const sub = selectBox.value;
        let subName = '';
        if(sub !== 'all') {
            subName = selectBox.options[selectBox.selectedIndex].text;
        }
        window.location.href = `quiz.html?cat=${cat}&level=${level}&sub=${sub}&subName=${encodeURIComponent(subName)}`;
    }
    function startMockExam(cat) {
        window.location.href = `quiz.html?cat=${cat}&mode=mock`;
    }
"""
if 'function startQuiz' not in code:
    code = code.replace('// ── Theme Toggle ──', js_funcs + '\n    // ── Theme Toggle ──')

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)
print("Full restore complete!")
