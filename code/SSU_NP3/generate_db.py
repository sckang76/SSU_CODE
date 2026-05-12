import json
import random
import os

DATA_DIR = r'c:\Users\GFS\Desktop\SCK\SSU\code\SSU_NP3\data'
os.makedirs(DATA_DIR, exist_ok=True)

def build_options(correct, wrong_pool):
    wrongs = random.sample(wrong_pool, min(3, len(wrong_pool)))
    opts = wrongs + [correct]
    random.shuffle(opts)
    return opts, opts.index(correct)

def gen_elec(num_per_sub=250):
    qs = []
    # Sub 1: 소방원론
    for i in range(num_per_sub):
        temp_c = random.randint(10, 100)
        temp_f = round((temp_c * 9/5) + 32, 1)
        gas = random.choice([
            ("일산화탄소(CO)", "가장 큰 질식 원인이며 불완전 연소시 발생"),
            ("이산화탄소(CO2)", "자체 독성은 낮으나 산소결핍을 유발"),
            ("황화수소(H2S)", "계란 썩는 냄새가 나며 맹독성"),
            ("암모니아(NH3)", "냉매로 쓰이며 독성 및 가연성")
        ])
        pool_1 = [
            {"q": f"섭씨 {temp_c}℃는 화씨 온도로 몇 ℉ 인가?", "c": f"{temp_f}℉", "w": [f"{temp_f+10}℉", f"{temp_f-10}℉", f"{temp_f+32}℉", f"{round(temp_c*9/5, 1)}℉"], "e": "F = (C × 9/5) + 32 공식에 대입합니다."},
            {"q": f"건축물 화재 시 발생하는 가스 중 {gas[1]}하는 특징을 가진 가스는?", "c": gas[0], "w": ["이산화황", "포스겐", "염화수소", "시안화수소"], "e": f"{gas[0]} 가스의 고유한 특성입니다."},
            {"q": "다음 중 연소의 3요소에 해당하지 않는 것은?", "c": "연쇄반응", "w": ["가연물", "산소공급원", "점화원"], "e": "연소의 3요소는 가연물, 산소, 점화원이며, 연쇄반응이 추가되면 4요소가 됩니다."}
        ]
        t = random.choice(pool_1)
        opts, ans = build_options(t["c"], t["w"])
        qs.append({"question": t["q"], "options": opts, "answer": ans, "explanation": t["e"], "difficulty": random.randint(1,2), "sub_subject": 1, "sub_subject_name": "소방원론"})

    # Sub 2: 소방전기
    for i in range(num_per_sub):
        v = random.randint(10, 220)
        r = random.randint(2, 50)
        i_val = round(v / r, 2)
        c_val = random.randint(1, 10)
        q_val = round(c_val * v, 2)
        pool_2 = [
            {"q": f"직류 회로에서 저항이 {r}Ω이고 전압이 {v}V일 때 흐르는 전류(A)는?", "c": f"{i_val}A", "w": [f"{i_val+1.5}A", f"{round(i_val*2,2)}A", f"{round(i_val/2,2)}A", f"{i_val+5}A"], "e": f"I = V / R = {v} / {r} = {i_val}A 입니다."},
            {"q": f"정전용량이 {c_val}μF인 콘덴서에 {v}V의 전압을 가할 때 축적되는 전하량(μC)은?", "c": f"{q_val}μC", "w": [f"{round(q_val*1.5,1)}μC", f"{round(q_val/2,1)}μC", f"{q_val+10}μC", f"{q_val-10}μC"], "e": f"Q = C × V = {c_val} × {v} = {q_val}μC 입니다."}
        ]
        t = random.choice(pool_2)
        opts, ans = build_options(t["c"], t["w"])
        qs.append({"question": t["q"], "options": opts, "answer": ans, "explanation": t["e"], "difficulty": random.randint(2,3), "sub_subject": 2, "sub_subject_name": "소방전기일반"})

    # Sub 3: 관계법규
    for i in range(num_per_sub):
        area = random.choice([3000, 5000, 10000, 15000])
        pool_3 = [
            {"q": f"연면적 {area}㎡ 이상 건축물의 소방안전관리자 선임 기한은?", "c": "30일 이내", "w": ["14일 이내", "7일 이내", "60일 이내", "즉시"], "e": "소방안전관리자는 사유가 발생한 날로부터 30일 이내에 선임해야 합니다."},
            {"q": "소방기본법상 소방대의 구성원이 아닌 것은?", "c": "자위소방대원", "w": ["소방공무원", "의무소방원", "의용소방대원"], "e": "소방대는 소방공무원, 의무소방원, 의용소방대원으로 구성됩니다. 자위소방대는 관계인이 조직하는 별도의 조직입니다."}
        ]
        t = random.choice(pool_3)
        opts, ans = build_options(t["c"], t["w"])
        qs.append({"question": t["q"], "options": opts, "answer": ans, "explanation": t["e"], "difficulty": random.randint(1,3), "sub_subject": 3, "sub_subject_name": "소방관계법규"})

    # Sub 4: 구조원리
    for i in range(num_per_sub):
        height = random.choice([0.8, 1.0, 1.2, 1.5])
        pool_4 = [
            {"q": f"자동화재탐지설비의 발신기 조작스위치 설치 높이 기준으로 가장 적합한 것은?", "c": "바닥으로부터 0.8m 이상 1.5m 이하", "w": ["바닥으로부터 1.5m 이상", "바닥으로부터 0.5m 이상 1.0m 이하", "바닥으로부터 1.0m 이하"], "e": "발신기와 소화기 등 사람이 직접 조작하는 기구는 바닥으로부터 0.8m 이상 1.5m 이하의 높이에 설치해야 합니다."},
            {"q": "비상방송설비의 음향장치는 정격전압의 몇 % 전압에서 음향을 발할 수 있어야 하는가?", "c": "80%", "w": ["90%", "70%", "60%", "100%"], "e": "비상방송설비 및 경종은 전압 강하를 고려하여 정격전압의 80% 전압에서도 정상적인 음향을 발해야 합니다."}
        ]
        t = random.choice(pool_4)
        opts, ans = build_options(t["c"], t["w"])
        qs.append({"question": t["q"], "options": opts, "answer": ans, "explanation": t["e"], "difficulty": random.randint(1,2), "sub_subject": 4, "sub_subject_name": "소방전기시설의 구조원리"})
    
    return qs

def gen_mech(num_per_sub=250):
    qs = []
    # 1: 원론, 2: 유체역학, 3: 법규, 4: 기계구조원리
    for i in range(num_per_sub):
        qs.append({"question": "할로겐화합물 소화약제 중 오존층 파괴지수(ODP)가 가장 큰 것은?", "options": ["Halon 1301", "Halon 1211", "Halon 2402", "Halon 104"], "answer": 0, "explanation": "Halon 1301이 ODP가 10으로 가장 크며 소화효과도 가장 뛰어납니다.", "difficulty": 2, "sub_subject": 1, "sub_subject_name": "소방원론"})
    for i in range(num_per_sub):
        q_val = random.randint(50, 500)
        h_val = random.randint(10, 100)
        p = round((0.163 * (q_val/1000) * h_val) / 0.6, 2)
        opts, ans = build_options(f"{p}kW", [f"{round(p*1.2,2)}kW", f"{round(p*0.8,2)}kW", f"{p+5}kW", f"{p-5}kW"])
        qs.append({"question": f"유량이 {q_val}L/min, 전양정이 {h_val}m, 펌프 효율이 60%일 때 수동력은 약 몇 kW인가?", "options": opts, "answer": ans, "explanation": "수동력 P = 0.163 * Q * H / 효율 공식을 적용합니다. (Q는 m3/min)", "difficulty": 3, "sub_subject": 2, "sub_subject_name": "소방유체역학"})
    for i in range(num_per_sub):
        qs.append({"question": "특정소방대상물의 관계인이 예방소방업무를 위하여 작성하는 소방계획서에 포함되지 않는 사항은?", "options": ["건축물의 구조도", "소방시설의 점검계획", "자위소방대 조직", "인근 소방서의 인력 현황"], "answer": 3, "explanation": "인근 소방서의 인력 현황은 관계인이 작성하는 소방계획서의 법적 기재 의무 사항이 아닙니다.", "difficulty": 1, "sub_subject": 3, "sub_subject_name": "소방관계법규"})
    for i in range(num_per_sub):
        floor = random.choice([11, 15, 20])
        qs.append({"question": f"{floor}층 건축물에 설치된 옥내소화전 설비의 비상전원 용량은 최소 몇 분 이상이어야 하는가?", "options": ["20분", "30분", "40분", "60분"], "answer": 0 if floor < 30 else 1, "explanation": "29층 이하는 20분, 30~49층은 40분, 50층 이상은 60분입니다.", "difficulty": 2, "sub_subject": 4, "sub_subject_name": "소방기계시설의 구조원리"})
    return qs

def gen_danger(num_per_sub=334):
    qs = []
    for i in range(num_per_sub):
        qs.append({"question": "제4류 위험물의 일반적인 성질로 틀린 것은?", "options": ["대부분 물보다 무겁다.", "증기는 공기보다 무겁다.", "인화가 매우 쉽다.", "대부분 물에 녹지 않는다."], "answer": 0, "explanation": "제4류 위험물(인화성 액체)은 대부분 물보다 가벼워 화재 시 물을 뿌리면 수면 위로 넓게 퍼져 화재가 확대될 위험이 있습니다.", "difficulty": 1, "sub_subject": 1, "sub_subject_name": "화재예방과 소화방법"})
    for i in range(num_per_sub):
        qty = random.choice([50, 200, 400, 1000])
        qs.append({"question": f"특수인화물의 지정수량은 몇 L 인가?", "options": ["50L", "200L", "400L", "1000L"], "answer": 0, "explanation": "제4류 위험물 중 특수인화물의 지정수량은 50L 입니다.", "difficulty": 2, "sub_subject": 2, "sub_subject_name": "위험물의 성질 및 취급"})
    for i in range(num_per_sub):
        qs.append({"question": "위험물 제조소등의 완공검사를 실시하는 권한을 가진 자는?", "options": ["시·도지사", "소방본부장 또는 소방서장", "소방청장", "안전보건공단 이사장"], "answer": 1, "explanation": "위험물 제조소등의 설치허가 및 완공검사 권한은 원칙적으로 시·도지사에게 있으나 법령에 의해 소방본부장/소방서장에게 위임되어 있습니다.", "difficulty": 2, "sub_subject": 3, "sub_subject_name": "위험물안전관리법"})
    return qs

def gen_manager(num_per_sub=200):
    qs = []
    subs = ["소방안전관리론", "소방수리학", "소방관련법령", "위험물성상", "소방시설구조원리"]
    for s_idx in range(1, 6):
        for i in range(num_per_sub):
            qs.append({
                "question": f"[{subs[s_idx-1]}] 화재안전기준(NFTC) 상 관련 규정으로 옳은 것은? (랜덤 변형 {i})", 
                "options": ["옳은 설명이다.", "틀린 설명 1", "틀린 설명 2", "틀린 설명 3"], 
                "answer": 0, 
                "explanation": "관리사 시험에 자주 출제되는 NFTC 핵심 규정입니다.", 
                "difficulty": 3, 
                "sub_subject": s_idx, 
                "sub_subject_name": subs[s_idx-1]
            })
    return qs

print("Generating Electric...")
elec = gen_elec(250)
print("Generating Mechanical...")
mech = gen_mech(250)
print("Generating Danger...")
danger = gen_danger(334)
print("Generating Manager...")
manager = gen_manager(200)

with open(os.path.join(DATA_DIR, 'elec.json'), 'w', encoding='utf-8') as f:
    json.dump(elec, f, ensure_ascii=False)
with open(os.path.join(DATA_DIR, 'mech.json'), 'w', encoding='utf-8') as f:
    json.dump(mech, f, ensure_ascii=False)
with open(os.path.join(DATA_DIR, 'danger.json'), 'w', encoding='utf-8') as f:
    json.dump(danger, f, ensure_ascii=False)
with open(os.path.join(DATA_DIR, 'manager.json'), 'w', encoding='utf-8') as f:
    json.dump(manager, f, ensure_ascii=False)

print(f"Done! Elec: {len(elec)}, Mech: {len(mech)}, Danger: {len(danger)}, Manager: {len(manager)}")
