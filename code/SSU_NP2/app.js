/**
 * SSU_NP2 - Excel-Based Technical Handbook Engine
 * Strictly synchronized with data_basic.xlsx items
 */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const grid = document.getElementById('equipment-grid');
    const modal = document.getElementById('detail-modal');
    const stepDots = document.querySelectorAll('.step-nav .step-dot');
    
    let fullData = [];

    // 1. 데이터 로드 (Excel 추출 데이터)
    fetch('./equipmentData.json')
        .then(res => res.json())
        .then(data => {
            fullData = data.map(item => enrichData(item));
            // 가나다 순으로 정렬
            fullData.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
            renderCards();
        })
        .catch(err => console.error('Data load error:', err));

    // 2. 키워드 기반 데이터 강화 (공식 및 상세 사양 추가)
    function enrichData(item) {
        const title = item.title;
        let law = item.law;
        let specs = { ...item.specs };
        let mechanism = item.mechanism;
        let components = [...item.components];
        let formula = '';

        // 지능형 데이터 보강
        if (title.includes('감지기')) {
            specs['전압'] = 'DC 24V';
            mechanism = '화재 발생 시 열/연기/불꽃을 감지하여 수신기에 화재 신호를 전송합니다.';
            components = ['감지 센서', '신호 처리부', '베이스'];
            law = 'NFPC 203 (자동화재탐지설비)';
        } else if (title.includes('수신기')) {
            specs['유형'] = 'P형/R형';
            mechanism = '감지기 신호를 수신하여 경보를 발하고 관련 소방 설비를 연동 제어합니다.';
            components = ['메인 컨트롤러', '전원부', '상태 표시창'];
            law = 'NFPC 203 (자동화재탐지설비)';
        } else if (title.includes('스프링클러헤드')) {
            specs['K-Factor'] = '80 (표준형)';
            mechanism = '열에 의해 감열체가 파손되면서 노즐이 열려 살수가 시작됩니다.';
            formula = 'Q = K√P (Q: 유량[L/min], K: 상수, P: 방수압[MPa])';
            law = 'NFPC 103 (스프링클러설비)';
        } else if (title.includes('펌프')) {
            formula = 'P = (γ·Q·H) / (102·η) (P: 동력[kW], Q: 유량, H: 양정)';
            law = 'NFPC 102 (옥내소화전설비)';
        } else if (title.includes('소화기')) {
            mechanism = '소화약제를 가압하여 방출함으로써 질식, 냉각, 부촉매 효과로 진압합니다.';
            components = ['용기', '레버', '안전핀', '호스'];
            law = 'NFPC 101 (소화기구)';
        } else if (title.includes('유도등')) {
            specs['광원'] = '고휘도 LED';
            mechanism = '상시 점등되어 피난 방향을 안내하며 비상 시 배터리로 구동됩니다.';
            law = 'NFPC 303 (유도등)';
        } else if (title.includes('완강기')) {
            mechanism = '사용자의 몸무게에 의해 일정한 속도로 하강할 수 있게 하는 피난 기구입니다.';
            law = 'NFPC 301 (피난기구)';
        }

        return {
            ...item,
            law,
            specs,
            mechanism,
            components,
            formula
        };
    }

    function renderCards(filter = 'all') {
        grid.innerHTML = '';
        const filteredData = filter === 'all' ? fullData : fullData.filter(d => d.category === filter);
        
        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `equip-card cat-${item.category}`;
            card.style.animationDelay = `${index * 0.005}s`;
            
            let icon = 'book';
            if (item.category === 'ext') icon = 'flame';
            if (item.category === 'alarm') icon = 'bell';
            if (item.category === 'mech') icon = 'settings';
            if (item.category === 'evac') icon = 'door-open';
            if (item.category === 'flame') icon = 'shield-check';

            card.innerHTML = `
                <div class="card-head">
                    <span class="card-category">${getCategoryName(item.category)}</span>
                    <div class="card-symbol"><i data-lucide="${icon}"></i></div>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-summary">${item.summary}</p>
                <div class="card-meta">
                    <span class="meta-code">${item.id}</span>
                    <span class="view-btn">상세 정보 <i data-lucide="arrow-right" style="width:12px; height:12px;"></i></span>
                </div>
            `;
            card.onclick = () => showModal(item);
            grid.appendChild(card);
        });
        lucide.createIcons();
    }

    function getCategoryName(cat) {
        const names = {
            'ext': '소화기구',
            'alarm': '경보설비',
            'mech': '기계설비',
            'evac': '피난구조',
            'flame': '방염류'
        };
        return names[cat] || cat;
    }

    function showModal(item) {
        document.getElementById('modal-title').textContent = `${item.title}`;
        document.getElementById('detail-desc').textContent = item.desc;
        document.getElementById('working-principle').textContent = item.mechanism;
        
        // 인증 배지 처리
        const certContainer = document.getElementById('certification-badges');
        certContainer.innerHTML = '';
        
        // 1. KFI 형식승인 (기본)
        const kfi = document.createElement('div');
        kfi.className = 'cert-badge ci-kfi';
        kfi.innerHTML = '<span>KFI</span>';
        kfi.title = 'KFI 형식승인';
        certContainer.appendChild(kfi);

        // 2. KC 전파인증 (전자제품)
        if (item.category === 'alarm' || item.title.includes('전자') || item.title.includes('전기') || item.title.includes('수신기')) {
            const kc = document.createElement('div');
            kc.className = 'cert-badge ci-kc';
            kc.innerHTML = '<span>KC</span>';
            kc.title = 'KC 전파인증';
            certContainer.appendChild(kc);
        }

        // 3. 성능인증 (CP - 특정 기계/특수 품목)
        if (item.category === 'mech' && (item.title.includes('밸브') || item.title.includes('헤드') || item.title.includes('버팀대'))) {
            const cp = document.createElement('div');
            cp.className = 'cert-badge ci-cp';
            cp.innerHTML = '<span>CP</span>';
            cp.title = '성능인증';
            certContainer.appendChild(cp);
        }

        // 4. 방염성능검사 (방염물품)
        if (item.category === 'flame' || item.title.includes('방염')) {
            const flame = document.createElement('div');
            flame.className = 'cert-badge ci-flame';
            flame.innerHTML = '<span>방염</span>';
            flame.title = '방염성능검사';
            certContainer.appendChild(flame);
        }

        const formulaBox = document.getElementById('formula-box');
        if (item.formula) {
            formulaBox.innerHTML = `
                <div class="formula-label"><i data-lucide="function-square" style="width:16px; height:16px;"></i> 핵심 계산식</div>
                <div class="formula-text">${item.formula}</div>
            `;
            formulaBox.classList.remove('hidden');
        } else {
            formulaBox.classList.add('hidden');
        }

        const specsTable = document.getElementById('specs-table');
        specsTable.innerHTML = '';
        Object.entries(item.specs).forEach(([key, value]) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<th>${key}</th><td>${value}</td>`;
            specsTable.appendChild(tr);
        });

        const list = document.getElementById('component-list');
        list.innerHTML = '';
        item.components.forEach(comp => {
            const li = document.createElement('li');
            li.innerHTML = `<i data-lucide="check" style="width:14px; height:14px; color:var(--accent);"></i> ${comp}`;
            list.appendChild(li);
        });

        document.getElementById('law-content').innerHTML = `<strong>근거 법령:</strong> ${item.law}`;

        // 구글 검색 버튼 URL 설정
        const searchBtn = document.getElementById('google-search-btn');
        searchBtn.href = `https://www.google.com/search?q=소방+${encodeURIComponent(item.title)}`;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        lucide.createIcons();
    }

    stepDots.forEach(dot => {
        dot.addEventListener('click', () => {
            stepDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            renderCards(dot.dataset.filter);
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    document.querySelector('.close-btn').onclick = closeModal;
    document.querySelector('.modal-overlay').onclick = closeModal;
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
