import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import * as XLSX from 'xlsx';

type TermRecord = {
  term: string;
  description: string;
  category: string;
  abbreviation: string;
  english: string;
  reference: string;
  status: string;
  tags: string[];
};

const sampleRecords: TermRecord[] = [
  {
    term: '스프링클러 설비',
    description: '화재 발생 시 열에 반응한 헤드가 작동하여 자동으로 소화수를 방출하는 고정식 소화설비.',
    category: '소화설비',
    abbreviation: 'SP',
    english: 'Sprinkler System',
    reference: 'NFSC 103, 화재예방법',
    status: '대표 용어',
    tags: ['소방시설', '자동소화', 'NFSC 103'],
  },
  {
    term: '옥내소화전',
    description: '건축물 내부에서 소방대 또는 관계인이 초기 소화를 위해 사용하는 설비로, 호스와 노즐로 구성된다.',
    category: '소화설비',
    abbreviation: 'Hose Reel',
    english: 'Indoor Fire Hydrant',
    reference: '화재예방법, 시행규칙',
    status: '관련 용어',
    tags: ['소화설비', '초기진압', '법정설비'],
  },
  {
    term: '피난유도등',
    description: '화재 시 피난 방향을 시각적으로 안내해 신속한 대피를 돕는 유도 표지 조명.',
    category: '피난/경보',
    abbreviation: '',
    english: 'Exit Sign',
    reference: '유도등 설치기준',
    status: '연관 용어',
    tags: ['경보/피난', '안전표시'],
  },
];

const referenceItems = [
  {
    term: '소화설비 기준',
    status: '참고',
  },
  {
    term: '피난구조설비 기준',
    status: '참고',
  },
];

const searchFields = ['전체', '용어명', '정의', '분류', '약어', '영문명', '관련기준'] as const;
type SearchField = (typeof searchFields)[number];

const normalize = (value: unknown) => String(value ?? '').trim();

const normalizeKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[()\[\]{}._\-/]/g, '');

const splitTags = (value: string) =>
  value
    .split(/[;,/|]/)
    .map((item) => item.trim())
    .filter(Boolean);

const fieldAliases = {
  term: ['용어명', '용어', '소방용어', '명칭', '표제어', '용어국문', '한글용어', 'term', 'keyword'],
  description: ['정의', '설명', '용어설명', '내용', 'description', 'desc'],
  category: ['분류', '카테고리', '구분', '분야', '설비분류', '대분류', '중분류', '소분류', 'category', 'type'],
  abbreviation: ['약어', '약칭', 'abbr', 'abbreviation', '영문약어'],
  english: ['영문명', '영문', '영어', '영문명칭', '영문표기', 'english'],
  reference: ['관련법령', '관련기준', '법령', '관련근거', '근거법령', '법령근거', 'reference'],
  tags: ['태그', 'tags'],
  status: ['상태', '비고', '참고', 'status'],
};

type FieldAliasKey = keyof typeof fieldAliases;

const detectHeaderRowIndex = (sheet: XLSX.WorkSheet) => {
  const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: '',
    blankrows: false,
  });

  let bestIndex = 0;
  let bestScore = -1;

  for (let i = 0; i < Math.min(matrix.length, 15); i += 1) {
    const row = matrix[i] ?? [];
    const normalizedCells = row.map((cell) => normalizeKey(normalize(cell)));

    let score = 0;

    const hasMatch = (aliases: string[]) => {
      const target = aliases.map(normalizeKey);
      return normalizedCells.some((cell) => target.some((alias) => cell === alias || cell.includes(alias)));
    };

    if (hasMatch(fieldAliases.term)) score += 5;
    if (hasMatch(fieldAliases.description)) score += 2;
    if (hasMatch(fieldAliases.category)) score += 1;
    if (hasMatch(fieldAliases.reference)) score += 1;
    if (hasMatch(fieldAliases.tags)) score += 1;

    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }

  return bestIndex;
};

const readValue = (row: Record<string, unknown>, key: FieldAliasKey) => {
  const aliases = fieldAliases[key];
  const normalizedAlias = aliases.map(normalizeKey);

  // 1) exact header match first
  for (const [rawKey, rawValue] of Object.entries(row)) {
    const nk = normalizeKey(rawKey);
    if (normalizedAlias.some((alias) => nk === alias)) {
      const value = normalize(rawValue);
      if (value) {
        return value;
      }
    }
  }

  // 2) loose header match for slightly different column names
  for (const [key, rawValue] of Object.entries(row)) {
    const normalizedKey = normalizeKey(key);

    if (normalizedAlias.some((alias) => normalizedKey === alias || normalizedKey.includes(alias))) {
      const value = normalize(rawValue);

      if (value) {
        return value;
      }
    }
  }

  return '';
};

const rowToRecord = (row: Record<string, unknown>): TermRecord | null => {
  const detectedTerm = readValue(row, 'term');
  const fallbackTerm = Object.values(row)
    .map((value) => normalize(value))
    .find((value) => value.length >= 2 && value.length <= 120 && !/^\d+(?:\.\d+)?$/.test(value));
  const term = detectedTerm || fallbackTerm || '';

  if (!term) {
    return null;
  }

  const description = readValue(row, 'description');
  const category = readValue(row, 'category') || '미분류';
  const abbreviation = readValue(row, 'abbreviation');
  const english = readValue(row, 'english');
  const reference = readValue(row, 'reference');
  const tags = splitTags(readValue(row, 'tags') || category);

  return {
    term,
    description: description || '엑셀에 정의가 없어서 기본 설명이 표시됩니다.',
    category,
    abbreviation,
    english,
    reference,
    status: readValue(row, 'status') || '용어',
    tags,
  };
};

const recordsFromSheet = (sheet: XLSX.WorkSheet) => {
  const headerRowIndex = detectHeaderRowIndex(sheet);
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
    range: headerRowIndex,
  });
  return rows.map(rowToRecord).filter((record): record is TermRecord => record !== null);
};

function App() {
  const [records, setRecords] = useState<TermRecord[]>(sampleRecords);
  const [query, setQuery] = useState('');
  const [selectedField, setSelectedField] = useState<SearchField>('전체');
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [selectedTerm, setSelectedTerm] = useState<TermRecord>(sampleRecords[0]);
  const [uploadName, setUploadName] = useState('샘플 데이터');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const categories = useMemo(() => {
    const values = records.map((record) => record.category).filter(Boolean);
    return ['전체', ...new Set(values)];
  }, [records]);

  const filteredRecords = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    return records.filter((record) => {
      const categoryMatch = activeCategory === '전체' || record.category === activeCategory;

      if (!categoryMatch) {
        return false;
      }

      if (!trimmedQuery) {
        return true;
      }

      const searchableValues = {
        전체: [record.term, record.description, record.category, record.abbreviation, record.english, record.reference, record.tags.join(' ')],
        용어명: [record.term],
        정의: [record.description],
        분류: [record.category],
        약어: [record.abbreviation],
        영문명: [record.english],
        관련기준: [record.reference],
      }[selectedField];

      return searchableValues.some((value) => value.toLowerCase().includes(trimmedQuery));
    });
  }, [activeCategory, query, records, selectedField]);

  const selectedRecord = filteredRecords.find((record) => record.term === selectedTerm.term) ?? filteredRecords[0] ?? records[0] ?? sampleRecords[0];

  useEffect(() => {
    if (selectedRecord) {
      setSelectedTerm(selectedRecord);
    }
  }, [selectedRecord]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      return;
    }

    const nextRecords = recordsFromSheet(workbook.Sheets[sheetName]);

    if (nextRecords.length === 0) {
      setUploadName(`${file.name} (읽을 수 있는 행 없음)`);
      return;
    }

    setRecords(nextRecords);
    setSelectedField('전체');
    setActiveCategory('전체');
    setQuery('');
    setSelectedTerm(nextRecords[0]);
    setUploadName(`${file.name} / 시트: ${sheetName}`);
  };

  const clearUpload = () => {
    setRecords(sampleRecords);
    setSelectedTerm(sampleRecords[0]);
    setQuery('');
    setSelectedField('전체');
    setActiveCategory('전체');
    setUploadName('샘플 데이터');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const visibleResults = filteredRecords.slice(0, 5);

  return (
    <div className="page">
      <div className="wrap">
        <header className="topbar">
          <div className="brand">
            <div className="title">소방용어 검색</div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-head">
            <div className="hero-icon" aria-hidden="true"></div>
          </div>

          <div className="section-body hero-body">
            <div className="control-grid">
              <div className="control-card">
                <div className="control-label">엑셀 업로드</div>
                <div className="upload-row">
                  <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleUpload} />
                  <button className="small action" type="button" onClick={() => inputRef.current?.click()}>
                    파일 선택
                  </button>
                  <button className="small action ghost" type="button" onClick={clearUpload}>
                    샘플로 복원
                  </button>
                </div>
                <div className="upload-note">현재 데이터: {uploadName}</div>
              </div>

              <div className="control-card">
                <div className="control-label">검색 필드</div>
                <div className="field-row">
                  {searchFields.map((field) => (
                    <button
                      key={field}
                      type="button"
                      className={`field-pill ${selectedField === field ? 'active' : ''}`}
                      onClick={() => setSelectedField(field)}
                    >
                      {field}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="search-bar">
              <input
                id="search-term"
                className="search-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="용어명, 약어, 영문명, 관련 기준을 입력하세요. 예) 스프링클러, 옥내소화전, 화재하중"
              />
              <button className="search-btn" type="button">
                검색
              </button>
            </div>

            <div className="hint-row">
              <span className="chip">최근 검색: 화재하중</span>
              <span className="chip">추천: 피난계단</span>
              <span className="chip">약어: RIT</span>
              <span className="chip">법령: NFSC</span>
            </div>
          </div>
        </section>

        <section className="section">
          <h3 className="section-title">1. 대상 용어 입력</h3>
          <div className="section-body">
            <div className="category-row">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="result-list">
              {visibleResults.length === 0 ? (
                <div className="empty-state">검색 결과가 없습니다. 다른 단어를 입력하거나 필터를 변경하세요.</div>
              ) : (
                visibleResults.map((item) => (
                  <button
                    type="button"
                    className={`result-item result-button ${selectedTerm.term === item.term ? 'selected' : ''}`}
                    key={item.term}
                    onClick={() => setSelectedTerm(item)}
                  >
                    <div className="result-top">
                      <div className="term">{item.term}</div>
                      <div className="status">{item.status}</div>
                    </div>
                    <div className="tagrow">
                      {item.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>

        <div className="stack">
          <section className="section">
            <h3 className="section-title">2. 검색 결과</h3>
            <div className="section-body">
              <div className="section-text">총 {filteredRecords.length.toLocaleString('ko-KR')}건</div>
              <div className="result-list">
                {visibleResults.slice(0, 2).map((item) => (
                  <article className="result-item" key={`${item.term}-compact`}>
                    <div className="result-top">
                      <div className="term">{item.term}</div>
                      <div className="status">정의 확인</div>
                    </div>
                    <div className="tagrow">
                      <span className="tag">{item.category}</span>
                      <span className="tag">{item.abbreviation || '약어 없음'}</span>
                      <span className="tag">{item.reference || '관련 기준 없음'}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <h3 className="section-title">3. 상세 정보</h3>
            <div className="section-body">
              <div className="detail-head">{selectedTerm.term}</div>
              <div className="meta">
                <div>분류: {selectedTerm.category}</div>
                <div>약어: {selectedTerm.abbreviation || '없음'}</div>
                <div>영문: {selectedTerm.english || '없음'}</div>
                <div>관련 기준: {selectedTerm.reference || '없음'}</div>
              </div>
              <div className="footer-bar">
                <button className="small" type="button">
                  정의 복사
                </button>
                <button className="small" type="button">
                  관련 법령 보기
                </button>
                <button className="small" type="button">
                  링크 공유
                </button>
              </div>
            </div>
          </section>

          <section className="section">
            <h3 className="section-title">4. 관련 법령 및 규정 참고</h3>
            <div className="section-body">
              <div className="result-list">
                {referenceItems.map((item) => (
                  <article className="result-item" key={item.term}>
                    <div className="result-top">
                      <div className="term">{item.term}</div>
                      <div className="status">{item.status}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;