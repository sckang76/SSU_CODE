import os
import re

path = r'c:\Users\GFS\Desktop\SCK\SSU\code\SSU_NP3\index.html'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update stats
code = code.replace('2,500+', '4,000+')
code = code.replace('data-target="2500">2,500', 'data-target="4000">4,000')
code = code.replace('625 문항', '1,000 문항')

# 2. Add mock buttons
btn_style = "width:100%; margin-top:12px; padding:12px; border-radius:10px; background:linear-gradient(135deg, #ef4444, #dc2626); color:white; border:none; font-weight:700; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:8px; box-shadow:0 4px 15px rgba(239,68,68,0.3);"

def insert_btn(cat, qs, mins):
    btn = f'''            <button onclick="startMockExam('{cat}')" class="btn-mock" style="{btn_style}">
                <i data-lucide="timer" style="width:18px;height:18px;"></i> 실전 모의고사 ({qs}문항 / {mins}분)
            </button>
        </div>'''
    return btn

# Replace the closing div of each category card with the button + closing div
code = re.sub(r'(<button onclick="startQuiz\(\'elec\', \'all\'\).*?</button>\s*</div>)\s*</div>', r'\1\n' + insert_btn('elec', 80, 120), code, count=1)
code = re.sub(r'(<button onclick="startQuiz\(\'mech\', \'all\'\).*?</button>\s*</div>)\s*</div>', r'\1\n' + insert_btn('mech', 80, 120), code, count=1)
code = re.sub(r'(<button onclick="startQuiz\(\'danger\', \'all\'\).*?</button>\s*</div>)\s*</div>', r'\1\n' + insert_btn('danger', 60, 90), code, count=1)
code = re.sub(r'(<button onclick="startQuiz\(\'manager\', \'all\'\).*?</button>\s*</div>)\s*</div>', r'\1\n' + insert_btn('manager', 125, 125), code, count=1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)
print("Index restored successfully")
