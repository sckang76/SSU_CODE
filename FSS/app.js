document.addEventListener('DOMContentLoaded', () => {
    const data = {
        "facilityTypes": [
          { "id": "apartment",   "name": "공동주택 (아파트 등)",   "icon": "building-2",     "description": "아파트, 기숙사 등 거주 목적의 특정소방대상물" },
          { "id": "row_house",   "name": "연립/다세대주택",        "icon": "home",           "description": "연립주택, 다세대주택 등 거주 목적 건물" },
          { "id": "commercial",  "name": "근린생활시설",            "icon": "shopping-bag",   "description": "슈퍼마켓, 의원, 음식점, 탁구장, 고시원 등" },
          { "id": "cultural",    "name": "문화 및 집회시설",        "icon": "drama",          "description": "공연장, 집회장, 관람장, 전시장 등" },
          { "id": "medical",     "name": "의료시설",                "icon": "hospital",       "description": "병원, 격리병원, 정신의료기관, 장애인 의료재활시설" },
          { "id": "educational", "name": "교육연구시설",            "icon": "school",         "description": "학교, 학원, 연구소, 도서관 등" },
          { "id": "lodging",     "name": "숙박시설",                "icon": "hotel",          "description": "호텔, 여관, 생활형 숙박시설 등" },
          { "id": "elderly",     "name": "노유자시설",              "icon": "heart-handshake","description": "노인복지시설, 아동복지시설, 유치원 등" },
          { "id": "amusement",   "name": "위락시설",                "icon": "dices",          "description": "단란주점, 유흥주점, 카지노, 무도장 등" },
          { "id": "office",      "name": "업무시설",                "icon": "briefcase",      "description": "공공업무시설, 오피스텔 등" },
          { "id": "factory",     "name": "공장",                    "icon": "factory",        "description": "물품의 제조·가공 시설" }
        ],
        "fireFacilities": [
          {
            "category": "소화설비",
            "icon": "flame",
            "items": [
              { "id": "extinguisher",    "name": "소화기/소화약제",         "criteria": "연면적 33㎡ 이상 (모든 대상물 공통)", "clause": "시행령 별표4 제1호가목", "version": "2024.12 개정" },
              { "id": "res_kitchen",    "name": "주거용 주방자동소화장치", "criteria": "아파트등 및 30층 이상 오피스텔 모든 층", "clause": "시행령 별표4 제1호나목", "version": "2024.12 개정" },
              { "id": "hydrant",        "name": "옥내소화전설비",          "criteria": "연면적 3,000㎡ 이상 또는 층수 4층 이상 중 바닥면적 600㎡ 이상인 층이 있는 것 (특수 용도 1,500㎡ 이상)", "clause": "시행령 별표4 제1호다목", "version": "2024.12 개정" },
              { "id": "sprinkler",      "name": "스프링클러설비",          "criteria": "층수 6층 이상 모든 층, 무창층/지하층/4층 이상 중 바닥면적 기준 이상", "clause": "시행령 별표4 제1호라목", "version": "2024.12 개정" },
              { "id": "simple_sprinkler","name": "간이스프링클러설비",      "criteria": "근린생활시설(의원, 고시원 등), 의료시설(정신의료기관 등), 노유자시설 등", "clause": "시행령 별표4 제1호마목", "version": "2024.12 개정" }
            ]
          },
          {
            "category": "경보설비",
            "icon": "bell",
            "items": [
              { "id": "auto_alarm",    "name": "자동화재탐지설비", "criteria": "연면적 600㎡ 이상 (의료/숙박/노유자 300㎡ 이상, 위락 200㎡ 이상 등)", "clause": "시행령 별표4 제2호사목", "version": "2024.12 개정" },
              { "id": "gas_leak_alarm","name": "가스누설경보기",   "criteria": "가스 연소기를 사용하는 숙박시설, 노유자시설 등", "clause": "시행령 별표4 제2호바목", "version": "2024.12 개정" },
              { "id": "broadcasting",  "name": "비상방송설비",     "criteria": "연면적 3,500㎡ 이상, 층수 11층(지하 3층) 이상", "clause": "시행령 별표4 제2호아목", "version": "2024.12 개정" }
            ]
          },
          {
            "category": "피난구조설비",
            "icon": "door-open",
            "items": [
              { "id": "escape_ladder",  "name": "피난기구",        "criteria": "대상물의 모든 층(1층, 2층, 11층 이상 제외)", "clause": "시행령 별표4 제3호가목", "version": "2024.12 개정" },
              { "id": "guide_sign",     "name": "유도등/유도표지", "criteria": "모든 특정소방대상물 의무 설치", "clause": "시행령 별표4 제3호다목", "version": "2024.12 개정" },
              { "id": "emergency_light","name": "비상조명등",      "criteria": "지층 포함 5층 이상 연면적 3,000㎡ 이상, 지하층·무창층 450㎡ 이상", "clause": "시행령 별표4 제3호라목", "version": "2024.12 개정" }
            ]
          },
          {
            "category": "소화활동설비",
            "icon": "shield-check",
            "items": [
              { "id": "smoke_control","name": "제연설비",         "criteria": "문화/집회/운동/운수/의료 등 지하층/무창층 바닥면적 1,000㎡ 이상", "clause": "시행령 별표4 제4호가목", "version": "2024.12 개정" },
              { "id": "outlet",      "name": "비상콘센트설비",   "criteria": "층수 11층 이상 건물의 11층 이상의 층", "clause": "시행령 별표4 제4호라목", "version": "2024.12 개정" },
              { "id": "radio",       "name": "무선통신보조설비",  "criteria": "지하가 연면적 1,000㎡ 이상, 지하층 바닥면적 합계 3,000㎡ 이상", "clause": "시행령 별표4 제4호마목", "version": "2024.12 개정" }
            ]
          },
          {
            "category": "행정 및 인허가 검토",
            "icon": "gavel",
            "items": [
              { "id": "arch_permit", "name": "건축허가동의 대상",   "criteria": "연면적 400㎡ 이상 (노유자 200㎡, 학교 100㎡ 등)", "clause": "소방시설법 제6조", "version": "2024.12 개정" },
              { "id": "perf_design", "name": "성능위주설계 대상",   "criteria": "연면적 20만㎡ 이상, 30층 이상(지포), 50층 이상(아파트) 등", "clause": "소방시설법 제8조", "version": "2024.12 개정" },
              { "id": "safety_mgr",  "name": "소방안전관리자 선임", "criteria": "특급(50층/30층 이상), 1급(연면적 1.5만㎡), 2급(옥내/SP 설치 시) 등", "clause": "화재예방법 제24조", "version": "2024.12 개정" }
            ]
          },
          {
            "category": "다중이용업소 검토",
            "icon": "store",
            "items": [
              { "id": "multi_permit","name": "완비증명 대상 여부", "criteria": "다중이용업소 중 면적/수용인원 기준 초과 시 (학원 300인 이상 등)", "clause": "다중이용업소법 제9조", "version": "2024.12 개정" }
            ]
          }
        ]
    };

    let selectedFacilityId = 'apartment';
    let state = {
        area: 30,
        floors: 1,
        basementFloors: 0,
        capacity: 50,
        isBasement: false,
        isWindowless: false,
        constructionPeriod: 'current'   // 준공 시기: pre2012 | y2012 | y2017 | y2022 | current
    };

    // UI Elements
    const facilityGrid        = document.getElementById('facilityGrid');
    const resultsGrid         = document.getElementById('resultsGrid');
    const selectionBadge      = document.getElementById('selectionBadge');

    // Manual Input Elements
    const inputArea           = document.getElementById('inputArea');
    const inputPyung          = document.getElementById('inputPyung');
    const inputFloors         = document.getElementById('inputFloors');
    const inputBasementFloors = document.getElementById('inputBasementFloors');
    const inputCapacity       = document.getElementById('inputCapacity');

    // Initialize
    renderFacilities();
    initChips();
    initInputs();
    calculateResults();
    syncPyung();

    // ── Chip Listeners ────────────────────────────────────────────────────────
    function initChips() {
        // Standard numeric chips
        ['areaChips', 'groundFloorChips', 'basementFloorChips', 'capacityChips'].forEach(id => {
            const container = document.getElementById(id);
            if (!container) return;

            container.addEventListener('click', (e) => {
                const chip = e.target.closest('.chip');
                if (!chip) return;

                container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const val = parseInt(chip.dataset.value);

                if (id === 'areaChips') {
                    state.area = val;
                    inputArea.value = val;
                    setInputError(inputArea, '');
                    syncPyung();
                }
                if (id === 'groundFloorChips') {
                    state.floors = val;
                    inputFloors.value = val;
                    setInputError(inputFloors, '');
                }
                if (id === 'basementFloorChips') {
                    state.basementFloors = val;
                    state.isBasement = val > 0;
                    inputBasementFloors.value = val;
                    setInputError(inputBasementFloors, '');
                    const basChip = document.querySelector('[data-type="basement"]');
                    if (basChip) {
                        if (state.isBasement) basChip.classList.add('active');
                        else basChip.classList.remove('active');
                    }
                }
                if (id === 'capacityChips') {
                    state.capacity = val;
                    inputCapacity.value = val;
                    setInputError(inputCapacity, '');
                }
                calculateResults();
            });
        });

        // Extra condition chips (지하층 / 무창층)
        const extraContainer = document.getElementById('extraChips');
        extraContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.chip');
            if (!chip) return;

            chip.classList.toggle('active');
            const type = chip.dataset.type;
            if (type === 'basement') {
                state.isBasement = chip.classList.contains('active');
                if (!state.isBasement) {
                    state.basementFloors = 0;
                    inputBasementFloors.value = 0;
                    document.querySelectorAll('#basementFloorChips .chip').forEach(c => c.classList.remove('active'));
                    document.querySelector('#basementFloorChips [data-value="0"]')?.classList.add('active');
                } else if (state.basementFloors === 0) {
                    state.basementFloors = 1;
                    inputBasementFloors.value = 1;
                    document.querySelectorAll('#basementFloorChips .chip').forEach(c => c.classList.remove('active'));
                    document.querySelector('#basementFloorChips [data-value="1"]')?.classList.add('active');
                }
            }
            if (type === 'windowless') state.isWindowless = chip.classList.contains('active');
            calculateResults();
        });

        // Construction Period chips (준공 시기)
        const constructionContainer = document.getElementById('constructionChips');
        if (constructionContainer) {
            constructionContainer.addEventListener('click', (e) => {
                const chip = e.target.closest('.chip');
                if (!chip) return;
                constructionContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                state.constructionPeriod = chip.dataset.value;
                updateConstructionNotice(state.constructionPeriod);
                calculateResults();
            });
        }
    }

    // Notice text & color per construction period
    function updateConstructionNotice(period) {
        const noticeTexts = {
            'pre2012': '⚠️ 구법 기준 적용 — 스프링클러 11층 이상, 자동화재탐지설비 1,000㎡ 이상, 간이스프링클러 미도입 기준으로 판정합니다.',
            'y2012':   '📋 2012~2017년 기준 — 자탐 600㎡ 이상, 스프링클러 11층 이상 기준으로 판정합니다.',
            'y2017':   '📋 2017~2022년 기준 — 간이스프링클러 확대(고시원 소급), 스프링클러 11층 이상 기준으로 판정합니다.',
            'y2022':   '📋 2022~2024년 기준 — 소방시설법 전면 개정, 스프링클러 11층 이상 기준으로 판정합니다.',
            'current': '✅ 현행 기준 적용 — 2024년 개정 기준. 스프링클러 6층 이상 전면 의무화가 적용됩니다.'
        };
        const noticeColors = {
            'pre2012': { bg: '#fef2f2', border: '#ef4444', color: '#991b1b' },
            'y2012':   { bg: '#fffbeb', border: '#f59e0b', color: '#92400e' },
            'y2017':   { bg: '#fffbeb', border: '#f59e0b', color: '#92400e' },
            'y2022':   { bg: '#eff6ff', border: '#3b82f6', color: '#1e40af' },
            'current': { bg: '#f0fdf4', border: '#22c55e', color: '#166534' }
        };
        const noticeEl = document.getElementById('constructionNotice');
        if (noticeEl) {
            const c = noticeColors[period] || noticeColors['current'];
            noticeEl.style.background       = c.bg;
            noticeEl.style.borderLeftColor  = c.border;
            noticeEl.style.color            = c.color;
            noticeEl.textContent            = noticeTexts[period] || '';
        }
    }

    // ── Manual Input Listeners ────────────────────────────────────────────────
    // ── Input Validation Helper ───────────────────────────────────────
    function setInputError(input, message) {
        input.style.borderColor = message ? '#ef4444' : '';
        input.style.boxShadow   = message ? '0 0 0 3px rgba(239,68,68,0.15)' : '';
        const errEl = input.parentElement.querySelector('.input-error-msg');
        if (errEl) errEl.textContent = message || '';
    }

    function initInputs() {
        const clearChips = (id) => {
            const container = document.getElementById(id);
            if (container) container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        };

        inputArea.oninput = () => {
            let v = parseFloat(inputArea.value);
            if (isNaN(v) || v < 0) { v = 0; inputArea.value = 0; }
            if (v > 1000000) {
                setInputError(inputArea, '1,000,000㎡ 이하로 입력해 주세요.');
            } else {
                setInputError(inputArea, '');
            }
            state.area = Math.min(v, 1000000);
            syncPyung();
            clearChips('areaChips');
            calculateResults();
        };

        inputPyung.oninput = () => {
            const pyung = parseFloat(inputPyung.value) || 0;
            const area  = Math.round(pyung / 0.3025);
            inputArea.value = area;
            state.area = area;
            setInputError(inputArea, '');
            clearChips('areaChips');
            calculateResults();
        };

        inputFloors.oninput = () => {
            let v = parseInt(inputFloors.value);
            if (isNaN(v) || v < 1) { v = 1; inputFloors.value = 1; }
            if (v > 150) {
                setInputError(inputFloors, '150층 이하로 입력해 주세요.');
                v = 150; inputFloors.value = 150;
            } else {
                setInputError(inputFloors, '');
            }
            state.floors = v;
            clearChips('groundFloorChips');
            calculateResults();
        };

        inputBasementFloors.oninput = () => {
            let v = parseInt(inputBasementFloors.value);
            if (isNaN(v) || v < 0) { v = 0; inputBasementFloors.value = 0; }
            if (v > 10) {
                setInputError(inputBasementFloors, '10층 이하로 입력해 주세요.');
                v = 10; inputBasementFloors.value = 10;
            } else {
                setInputError(inputBasementFloors, '');
            }
            state.basementFloors = v;
            state.isBasement = v > 0;
            clearChips('basementFloorChips');
            const basChip = document.querySelector('[data-type="basement"]');
            if (basChip) {
                if (state.isBasement) basChip.classList.add('active');
                else basChip.classList.remove('active');
            }
            calculateResults();
        };

        inputCapacity.oninput = () => {
            let v = parseInt(inputCapacity.value);
            if (isNaN(v) || v < 0) { v = 0; inputCapacity.value = 0; }
            if (v > 100000) {
                setInputError(inputCapacity, '100,000명 이하로 입력해 주세요.');
                v = 100000; inputCapacity.value = 100000;
            } else {
                setInputError(inputCapacity, '');
            }
            state.capacity = v;
            clearChips('capacityChips');
            calculateResults();
        };
    }

    function syncPyung() {
        inputPyung.value = (inputArea.value * 0.3025).toFixed(1);
    }

    // ── Render Facility Cards ─────────────────────────────────────────────────
    function renderFacilities() {
        facilityGrid.innerHTML = '';
        data.facilityTypes.forEach(f => {
            const card = document.createElement('div');
            card.className = `facility-card ${f.id === selectedFacilityId ? 'active' : ''}`;
            card.innerHTML = `
                <div class="icon-wrapper">
                    <i data-lucide="${f.icon}"></i>
                </div>
                <div class="name" style="font-size: 0.85rem; font-weight: 600;">${f.name}</div>
            `;
            card.onclick = () => {
                selectedFacilityId = f.id;
                selectionBadge.textContent = `선택: ${f.name}`;
                document.querySelectorAll('.facility-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                calculateResults();
            };
            facilityGrid.appendChild(card);
        });

        // 12번째 요소: 관련 법령보기 버튼
        const lawBtn = document.createElement('div');
        lawBtn.className = 'facility-card';
        lawBtn.style.background = '#fef2f2';
        lawBtn.style.borderColor = '#fca5a5';
        lawBtn.innerHTML = `
            <div class="icon-wrapper" style="background:#fee2e2; color:#ef4444;">
                <i data-lucide="external-link"></i>
            </div>
            <div class="name" style="font-size: 0.85rem; font-weight: 700; color:#b91c1c;">관련 법령보기</div>
        `;
        lawBtn.onclick = () => {
            window.open('https://www.law.go.kr/lsSc.do?menuId=1&query=%EC%86%8C%EB%B0%A9%EC%8B%9C%EC%84%A4%EB%B2%95#undefined', '_blank');
        };
        facilityGrid.appendChild(lawBtn);

        if (window.lucide) lucide.createIcons();
    }

    // ── Calculation & Render Results ──────────────────────────────────────────
    function calculateResults() {
        resultsGrid.innerHTML = '';

        const catMap = {
            '소화설비':    'cat-extinguishing',
            '경보설비':    'cat-alarm',
            '피난구조설비':'cat-escape',
            '소화활동설비':'cat-activity',
            '소화용수설비':'cat-water'
        };

        data.fireFacilities.forEach(category => {
            const section  = document.createElement('div');
            const catClass = catMap[category.category] || '';
            section.className = `category-section ${catClass}`;
            section.dataset.category = category.category;  // 모달 제목 추출용

            // 1. 판정
            const itemsWithStatus = category.items.map(item => {
                const isRequired = checkRequirement(
                    item.id, state.area, state.floors, state.basementFloors,
                    state.capacity, state.isBasement, state.isWindowless,
                    selectedFacilityId, state.constructionPeriod
                );
                return { ...item, isRequired };
            });

            // 2. 의무 우선 정렬
            itemsWithStatus.sort((a, b) => (a.isRequired === b.isRequired) ? 0 : a.isRequired ? -1 : 1);

            // 3. HTML 생성
            let itemsHtml = itemsWithStatus.map(item => {
                const isLegalReview   = category.category.includes('검토');
                const statusText      = item.isRequired
                    ? (isLegalReview ? '대상(해당)' : '설치 의무')
                    : (isLegalReview ? '해당 없음'  : '대상 아님');
                const displayCriteria = getAdjustedCriteria(item.id, state.constructionPeriod, item.criteria);
                const clauseBadge = (item.clause && item.isRequired)
                    ? `<div class="clause-badge"><span class="clause-text">근거: ${item.clause}</span><span class="version-text">${item.version || ''}</span></div>`
                    : '';

                return `
                    <div class="facility-item ${item.isRequired ? 'required' : ''}">
                        <div class="item-header">
                            <span style="font-weight: 600;">${item.name}</span>
                            <span class="status ${item.isRequired ? 'required' : 'optional'}">${statusText}</span>
                        </div>
                        <div class="criteria">${displayCriteria}</div>
                        ${clauseBadge}
                    </div>
                `;
            }).join('');

            section.innerHTML = `
                <h3 class="category-title">
                    <i data-lucide="${category.icon || 'star'}" style="width: 20px; height: 20px;"></i>
                    ${category.category}
                </h3>
                <div class="items-container">${itemsHtml}</div>
            `;
            resultsGrid.appendChild(section);
        });
        if (window.lucide) lucide.createIcons();
        updateWarning();
        logUsage();
    }

    // ── 입력 가정값 경고 배지 표시·숨김 ─────────────────────────────────
    const DEFAULTS = { area: 30, floors: 1, basementFloors: 0, capacity: 50,
                       isBasement: false, isWindowless: false };
    function updateWarning() {
        const warning = document.getElementById('inputWarning');
        if (!warning) return;
        const isDefault = state.area === DEFAULTS.area
            && state.floors         === DEFAULTS.floors
            && state.basementFloors === DEFAULTS.basementFloors
            && state.isBasement     === DEFAULTS.isBasement
            && state.isWindowless   === DEFAULTS.isWindowless;
        warning.style.display = isDefault ? 'flex' : 'none';
        if (window.lucide) lucide.createIcons();
    }

    let logTimeout;
    function logUsage() {
        clearTimeout(logTimeout);
        logTimeout = setTimeout(async () => {
            try {
                // Analytics
                if (window.firebaseAnalytics) {
                    const { analytics, logEvent } = window.firebaseAnalytics;
                    logEvent(analytics, 'fss_diagnosis', {
                        facility: selectedFacilityId,
                        area: state.area,
                        floors: state.floors,
                        is_basement: state.isBasement,
                        period: state.constructionPeriod
                    });
                }
                // Firestore
                if (window.firebaseDb) {
                    const { db, collection, addDoc, serverTimestamp } = window.firebaseDb;
                    await addDoc(collection(db, 'fss_logs'), {
                        facility: selectedFacilityId,
                        area: state.area,
                        floors: state.floors,
                        basementFloors: state.basementFloors,
                        capacity: state.capacity,
                        isBasement: state.isBasement,
                        isWindowless: state.isWindowless,
                        period: state.constructionPeriod,
                        timestamp: serverTimestamp(),
                        userAgent: navigator.userAgent
                    });
                }
            } catch (e) {
                console.warn("Usage logging skipped:", e);
            }
        }, 3000); // Wait 3 seconds to avoid spamming
    }

    // ── 준공 시기별 기준 텍스트 조정 ────────────────────────────────────────
    function getAdjustedCriteria(id, period, defaultCriteria) {
        if (period === 'current') return defaultCriteria;

        const overrides = {
            'sprinkler': {
                'pre2012': '층수 11층 이상 (구법 기준), 무창층/지하층 바닥면적 1,000㎡ 이상',
                'y2012':   '층수 11층 이상, 무창층/지하층/의료·문화 용도 바닥면적 기준 이상',
                'y2017':   '층수 11층 이상, 무창층/지하층/의료·문화 용도 바닥면적 기준 이상',
                'y2022':   '층수 11층 이상 (6층 의무화 미적용), 무창층/지하층 기준 이상'
            },
            'simple_sprinkler': {
                'pre2012': '해당 없음 (2012년 이전 미도입 설비)'
            },
            'auto_alarm': {
                'pre2012': '연면적 1,000㎡ 이상 (구법 기준)'
            },
            'arch_permit': {
                'pre2012': '연면적 500㎡ 이상 (구법), 노유자 200㎡, 학교 100㎡ 등'
            },
            'perf_design': {
                'pre2012': '해당 없음 (2005년 이전 미도입 — 건축허가 당시 기준 별도 확인 필요)'
            }
        };
        return (overrides[id] && overrides[id][period]) ? overrides[id][period] : defaultCriteria;
    }

    // ── 준공 시기 반영 소방시설 판정 로직 ────────────────────────────────────
    // period: 'pre2012' | 'y2012' | 'y2017' | 'y2022' | 'current'
    function checkRequirement(id, area, floors, basementFloors, capacity, isBasement, isWindowless, facilityId, period = 'current') {

        const isOldLaw  = period === 'pre2012';   // 2012년 이전 구법
        const isCurrent = period === 'current';   // 2024년 이후 현행

        // 시기별 임계값 분기
        const sprFloor   = isCurrent ? 6   : 11;   // 스프링클러 층수 기준
        const alarmArea  = isOldLaw  ? 1000 : 600;  // 자동화재탐지설비 연면적 기준
        const permitArea = isOldLaw  ? 500  : 400;  // 건축허가동의 연면적 기준

        switch (id) {

            // ① 소화설비
            case 'extinguisher':
                return area >= 33;

            case 'res_kitchen':
                return ['apartment', 'row_house'].includes(facilityId) || (facilityId === 'office' && floors >= 30);

            case 'hydrant':
                if (area >= 3000) return true;
                if (floors >= 4 && area / floors >= 600) return true;  // 층당 평균 ≥ 600㎡ (근사값)
                if (['medical', 'lodging', 'commercial', 'factory', 'warehouse'].includes(facilityId) && area >= 1500) return true;
                if ((isBasement || isWindowless) && area >= 450) return true; // 지하층·무창층 단독 면적 기준
                if (floors >= 4 && area / floors >= 300) return true;  // 4층 이상 층당 평균 ≥ 300㎡
                return false;

            case 'sprinkler':
                if (floors >= sprFloor) return true;
                if (facilityId === 'cultural' && area >= 1000) return true;
                if (facilityId === 'medical'  && area >= 600)  return true;
                if (facilityId === 'elderly'  && area >= 600)  return true;
                if (['factory', 'warehouse'].includes(facilityId) && area >= 800) return true;
                if ((isBasement || isWindowless) && area >= 1000) return true;
                return false;

            case 'simple_sprinkler':
                if (isOldLaw) return false;  // 2012년 이전: 미도입
                if (['medical', 'lodging', 'elderly'].includes(facilityId) && area < 600) return true;
                // 근린생활시설(고시원 등): 600㎡ 미만인 경우 간이SP 설치 (시행령 별표4)
                // 600㎡ 이상은 일반 스프링클러 대상으로 전환됨
                if (facilityId === 'commercial' && area < 600 && area >= 33) return true;
                return false;

            // ② 경보설비
            case 'auto_alarm':
                if (area >= alarmArea) return true;
                if (facilityId === 'amusement' && area >= 200) return true;
                if (['medical', 'lodging', 'elderly'].includes(facilityId) && area >= 300) return true;
                if (isBasement || isWindowless) return true;
                return false;

            case 'gas_leak_alarm':
                return ['lodging', 'elderly', 'medical', 'commercial'].includes(facilityId);

            case 'broadcasting':
                return area >= 3500 || floors >= 11 || (isBasement && basementFloors >= 3);

            // ③ 피난구조설비
            case 'escape_ladder':
                // 3층 이상 10층 이하 대상 (1·2층 및 11층 이상 제외). 단, 노유자·의료 시설은 2층 이상.
                if (['medical', 'elderly'].includes(facilityId)) {
                    return floors >= 2 && floors <= 10;
                }
                return floors >= 3 && floors <= 10;

            case 'guide_sign':
                return true;

            case 'emergency_light':
                // 5층 이상이고 연면적 3,000㎡ 이상 (시행령 별표4)
                if (floors >= 5 && area >= 3000) return true;
                // 지하층·무창층으로서 바닥면적 450㎡ 이상 (동 조항)
                if ((isBasement || isWindowless) && area >= 450) return true;
                return false;

            // ④ 소화활동설비
            case 'smoke_control':
                if (['cultural', 'medical', 'amusement'].includes(facilityId) && area >= 1000) return true;
                if (isBasement || isWindowless) return true;
                return false;

            case 'outlet':
                return floors >= 11;

            case 'radio':
                return area >= 1000 || (isBasement && area >= 3000);

            // ⑤ 행정 및 인허가
            case 'arch_permit':
                if (area >= permitArea) return true;
                if (facilityId === 'educational' && area >= 100) return true;
                if (facilityId === 'elderly'     && area >= 200) return true;
                if (facilityId === 'medical'     && area >= 300) return true;
                return false;

            case 'perf_design':
                if (isOldLaw) return false;  // 2005년 이전: 미도입
                if (area >= 200000) return true;
                if (facilityId !== 'apartment' && floors >= 30) return true;
                if (facilityId === 'apartment'  && floors >= 50) return true;
                if (area >= 30000 && (facilityId === 'commercial' || facilityId === 'cultural')) return true;
                return false;

            case 'safety_mgr':
                if (facilityId === 'apartment' && floors >= 50) return true;                        // 특급
                if (facilityId !== 'apartment' && (floors >= 30 || area >= 100000)) return true;    // 특급
                if (area >= 15000 || (facilityId !== 'apartment' && floors >= 11)) return true;     // 1급
                if (checkRequirement('sprinkler', area, floors, basementFloors, capacity, isBasement, isWindowless, facilityId, period)) return true; // 2급
                if (checkRequirement('hydrant',   area, floors, basementFloors, capacity, isBasement, isWindowless, facilityId, period)) return true; // 2급
                return false;

            // ⑥ 다중이용업소
            case 'multi_permit':
                if (facilityId === 'amusement') return true;
                if (facilityId === 'commercial'  && area >= 100) return true;
                if (facilityId === 'educational' && capacity >= 300) return true;
                return false;

            default:
                return false;
        }
    }
});

// ── Overview Modal ───────────────────────────────────────────────────────────
const catColors = {
    '소화설비':            { bg: '#fef2f2', border: '#fecaca', badge: '#ef4444' },
    '경보설비':            { bg: '#fffbeb', border: '#fde68a', badge: '#f59e0b' },
    '피난구조설비':        { bg: '#ecfdf5', border: '#a7f3d0', badge: '#10b981' },
    '소화활동설비':        { bg: '#eff6ff', border: '#bfdbfe', badge: '#3b82f6' },
    '소화용수설비':        { bg: '#ecfeff', border: '#cffafe', badge: '#06b6d4' },
    '행정 및 인허가 검토': { bg: '#f0f4ff', border: '#c7d7fd', badge: '#6366f1' },
    '다중이용업소 검토':   { bg: '#fdf4ff', border: '#e9d5ff', badge: '#a855f7' },
};

function openOverviewModal() {
    const modal    = document.getElementById('overviewModal');
    const content  = document.getElementById('overviewContent');
    const subtitle = document.getElementById('overviewSubtitle');

    subtitle.textContent = document.getElementById('selectionBadge').textContent;

    const categories = document.querySelectorAll('#resultsGrid .category-section');
    content.innerHTML = '';

    categories.forEach(cat => {
        // data-category 속성으로 안정적으로 제목 추출 (SVG textContent 오염 방지)
        const title = cat.dataset.category || cat.querySelector('.category-title')?.textContent?.trim() || '';
        const items = cat.querySelectorAll('.facility-item');
        const color = catColors[title] || { bg: '#f8fafc', border: '#e2e8f0', badge: '#64748b' };

        const rows = Array.from(items).map(item => {
            const name       = item.querySelector('.item-header span:first-child')?.textContent?.trim() || '';
            const statusEl   = item.querySelector('.status');
            const isReq      = statusEl?.classList.contains('required');
            const statusText = statusEl?.textContent?.trim() || '';
            return { name, isReq, statusText };
        });

        const required = rows.filter(r => r.isReq);
        if (required.length === 0) return;

        const block = document.createElement('div');
        block.style.cssText = `
            border-radius: 12px;
            border: 1.5px solid ${color.border};
            margin-bottom: 14px;
            word-break: keep-all;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        `;

        const header = `<div style="background:${color.bg}; padding:10px 16px; border-bottom:1.5px solid ${color.border}; display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <span style="font-weight:800; font-size:0.9rem; color:#1e293b; flex:1; min-width:0;">${title}</span>
            <span style="font-size:0.75rem; color:${color.badge}; font-weight:700; flex-shrink:0;">설치 의무 ${required.length}건</span>
        </div>`;

        // 마지막 행 border-bottom 제거 (블록 하단 이중 선 방지)
        const rowsHtml = required.map((r, i) => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:9px 16px; gap:10px; ${i < required.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">
                <span style="font-size:0.85rem; font-weight:600; color:#1e293b; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${r.name}">${r.name}</span>
                <span style="font-size:0.72rem; font-weight:800; padding:3px 10px; border-radius:5px; background:${color.badge}; color:#fff; white-space:nowrap; flex-shrink:0;">${r.statusText}</span>
            </div>
        `).join('');

        block.innerHTML = header + `<div style="background:white;">${rowsHtml}</div>`;
        content.appendChild(block);
    });

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeOverviewModal() {
    document.getElementById('overviewModal').style.display = 'none';
    document.body.style.overflow = '';
}

// Close on backdrop click
document.getElementById('overviewModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeOverviewModal();
});
