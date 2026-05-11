import json
import os

subjects = ['elec', 'mech', 'danger', 'manager']
base_path = r'c:\Users\GFS\Desktop\SCK\SSU\code\SSU_NP3\data'

for sub in subjects:
    file_path = os.path.join(base_path, f'{sub}.json')
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # 500문항에 대해 난이도를 1, 2, 3 순차적으로 또는 랜덤하게 재배정
    # (기존에 3이 적으므로 강제로 분산)
    for i, q in enumerate(data):
        # 1, 2, 3 난이도를 골고루 섞음
        q['difficulty'] = (i % 3) + 1 
        
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Updated {sub}.json: Difficulty distributed (1, 2, 3).")
