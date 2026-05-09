/**
 * SSU_NP2 - Dynamic Fire Safety Handbook Engine
 * Automatically synchronizes with all 160+ items in data.json
 */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const grid = document.getElementById('equipment-grid');
    const modal = document.getElementById('detail-modal');
    const stepDots = document.querySelectorAll('.step-nav .step-dot');
    
    let fullData = [];

    // 1. 데이터 로드 및 전처리
    fetch('./data.json')
        .then(res => res.json())
        .then(data => {
            fullData = data.map(item => enrichData(item));
            renderCards();
        })
        .catch(err => console.error('Data load error:', err));

    // 2. 키워드 기반 데이터 강화 (자동 카테고리 및 사양 생성)
    function enrichData(item) {
        const title = item.title;
        const desc = item.description;
        let category = 'flame'; // 기본값
        let law = '소방시설 설치 및 관리에 관한 법률';
        let specs = {'항목': '상세 정보 참조'};
        let mechanism = '화재안전기준(NFPC)에 따른 설계 및 작동';
        let components = ['본체', '부속품'];

        // 카테고리 판별 로직
        if (/소화기|소화약제|강화액|분말|가스계|소화기구|자동소화/.test(title)) {
            category = 'ext';
            law = 'NFPC 101 (소화기구 및 자동소화장치)';
        } else if (/수신기|감지기|경보|경종|벨|가스누설|누전|수신부|발신부|감시부|시각경보/.test(title)) {
            category = 'alarm';
            law = 'NFPC 203 (자동화재탐지설비)';
        } else if (/펌프|밸브|배관|헤드|스프링클러|수조|소화전|관창|호스|송수구|방수구|수압개폐/.test(title)) {
            category = 'mech';
            law = 'NFPC 102/103 (소화전/스프링클러)';
        } else if (/유도등|유도표지|피난|완강기|구조대|공기호흡기|조명등|매트|승강기|승강장|하강식/.test(title)) {
            category = 'evac';
            law = 'NFPC 301/303 (피난기구/유도등)';
        } else if (/방화|방염|셔터|댐퍼|내화|내열|틈새|충전|시방서|감리|안전관리|기술자|내진|버팀대/.test(title)) {
            category = 'flame';
            law = 'NFPC 600 계열 또는 건축법';
        }

        // 세부 데이터 보강 (키워드 매칭)
        if (title.includes('감지기')) {
            specs = {'정격전압': 'DC 24V', '감지방식': '열/연기/불꽃 센싱'};
            mechanism = '화재 발생 시 열/연기/불꽃을 감지하여 수신기에 신호를 전달합니다.';
            components = ['감지 소자', '회로 기판', '베이스'];
        } else if (title.includes('수신기')) {
            specs = {'유형': 'P형/R형/GR형', '예비전원': '24V 배터리'};
            mechanism = '각 구역의 감지기 신호를 수신하여 경보 및 연동 설비를 제어합니다.';
            components = ['메인 CPU', '디스플레이', '릴레이 보드'];
        } else if (title.includes('밸브')) {
            specs = {'사용압력': '1.0~1.6 MPa', '재질': '닥타일 주철/강재'};
            mechanism = '배관 내 유체의 흐름을 제어하거나 압력을 조절하여 시스템의 안정성을 유지합니다.';
            components = ['밸브 본체', '시트', '핸들/구동부'];
        } else if (title.includes('소화기')) {
            specs = {'약제': 'ABC분말/CO2/강화액', '압력방식': '축압식/가압식'};
            mechanism = '가압된 소화약제를 화점에 방사하여 질식 및 냉각 효과로 진압합니다.';
            components = ['용기', '레버', '안전핀', '호스'];
        } else if (title.includes('유도등')) {
            specs = {'광원': '고휘도 LED', '배터리': '20분 이상 유지'};
            mechanism = '상시 점등되어 피난 방향을 안내하며 정전 시 비상 전원으로 전환됩니다.';
            components = ['LED 패널', '유도 패널', '비상 배터리'];
        }

        return {
            ...item,
            category,
            law,
            specs,
            mechanism,
            components,
            summary: desc.substring(0, 50) + '...'
        };
    }

    function renderCards(filter = 'all') {
        grid.innerHTML = '';
        const filteredData = filter === 'all' ? fullData : fullData.filter(d => d.category === filter);
        
        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'equip-card';
            card.style.animationDelay = `${index * 0.01}s`;
            
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
                    <span class="view-btn">기술 사양서 <i data-lucide="arrow-right" style="width:12px; height:12px;"></i></span>
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
            'mech': '기계/소화',
            'evac': '피난구조',
            'flame': '방염/기타'
        };
        return names[cat] || cat;
    }

    function showModal(item) {
        document.getElementById('modal-title').textContent = `${item.title} | 기술 사양서`;
        document.getElementById('detail-desc').textContent = item.description;
        document.getElementById('working-principle').textContent = item.mechanism;
        
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

        document.getElementById('law-content').innerHTML = `<strong>법적 근거:</strong> ${item.law}`;

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
