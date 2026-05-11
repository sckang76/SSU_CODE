import json
import os
import sys

def add_questions(category, new_questions_file):
    target_path = f"SSU_NP3/data/{category}.json"
    
    if not os.path.exists(target_path):
        print(f"Error: {target_path} not found.")
        return

    # 1. 기존 데이터 로드
    with open(target_path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            data = []

    # 2. 새 데이터 로드 (임시 파일에서)
    with open(new_questions_file, 'r', encoding='utf-8') as f:
        new_data = json.load(f)

    # 3. 병합
    data.extend(new_data)

    # 4. 저장 (들여쓰기 포함하여 예쁘게 저장)
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Successfully added {len(new_data)} questions to {category}.json.")
    print(f"Total questions now: {len(data)}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python add_questions.py <category> <temp_json_file>")
    else:
        add_questions(sys.argv[1], sys.argv[2])
