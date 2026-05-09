const equipmentData = [
    // --- 소화기류 (Extinguishers) ---
    {
        id: 'EXT-001',
        category: 'ext',
        title: 'ABC 분말 소화기',
        summary: '제1인산암모늄을 주성분으로 하는 범용 소화기',
        desc: '일반(A급), 유류(B급), 전기(C급) 화재에 모두 대응 가능한 소화기로, 국내 소방 시설 중 가장 높은 비중을 차지하는 기초 설비입니다.',
        components: ['소화약제 용기', '가압용 가스(N2)', '지시 압력계', '안전핀', '방출 호스'],
        mechanism: '레버를 누르면 용기 내의 질소가스가 약제를 밀어내어 노즐을 통해 방출되며, 약제가 열에 분해되면서 발생하는 부촉매 효과와 질식 효과로 소화합니다.',
        specs: {
            '약제성분': '제1인산암모늄 (NH4H2PO4)',
            '형식': '축압식 (Stored Pressure)',
            '사용압력': '0.7 ~ 0.98 MPa',
            '충전량': '3.3kg (표준)'
        },
        law: '소방시설 설치 및 관리에 관한 법률 제12조 (소화기구의 설치) 및 NFPC 101 (소화기구 및 자동소화장치의 화재안전성능기준)'
    },
    {
        id: 'EXT-002',
        category: 'ext',
        title: 'CO2 소화기',
        summary: '이산화탄소의 질식 및 냉각 작용을 이용한 소화기',
        desc: '소화 후 잔여물이 남지 않아 전산실, 통신실, 변전실 등 정밀 기기가 있는 장소에 적합합니다.',
        components: ['고압 심레스 용기', '방출 혼(Horn)', '안전 밸브', '액화 이산화탄소'],
        mechanism: '액화 상태의 이산화탄소가 기체로 팽창하면서 주위의 열을 흡수(냉각)하고, 산소 농도를 15% 이하로 낮추어(질식) 소화합니다.',
        specs: {
            '약제성분': '액화 이산화탄소 (CO2)',
            '충전압력': '5.9 MPa (at 20°C)',
            '사용온도': '-20 ~ +40°C',
            '방출시간': '약 10 ~ 15초'
        },
        law: 'NFPC 101 및 전기설비가 설치된 장소의 화재안전기준'
    },

    // --- 경보설비 (Alarm) ---
    {
        id: 'ALM-001',
        category: 'alarm',
        title: 'R형 수신기 (Digital Receiver)',
        summary: '디지털 고유 주소 식별형 화재 중앙 제어반',
        desc: '각 감지기의 고유 주소를 통해 화재 위치를 정확히 파악하며, 복잡한 연동 로직을 소프트웨어로 제어하는 대형 건물용 수신기입니다.',
        components: ['메인 CPU 모듈', '루프 통신 카드', '비상 전원 장치', '그래픽 LCD 터치 패널'],
        mechanism: '중계기(Transponder)로부터 디지털 신호를 수신하여 분석하고, 프로그램된 매트릭스에 따라 경보 및 소화 설비 연동 신호를 송출합니다.',
        specs: {
            '통신방식': ' LonWorks / RS-485 / Ethernet',
            '선로용량': '최대 2,048 Address/Loop',
            '예비전원': 'DC 24V (Ni-Cd or Lead-Acid)',
            '로그저장': '최대 100,000건 이상'
        },
        law: 'NFPC 203 (자동화재탐지설비 및 시각경보장치의 화재안전성능기준)'
    },
    {
        id: 'ALM-002',
        category: 'alarm',
        title: '광전식 연기감지기',
        summary: '암실 내 빛의 산란 현상을 이용한 연기 감지 장치',
        desc: '화재 초기 발생하는 연기 입자를 감지하여 신속하게 경보를 발령하는 장치로, 복도, 계단, 거실 등에 설치됩니다.',
        components: ['광학 챔버', '적외선 발광부(LED)', '수광부(Photo Diode)', '미세 방충망'],
        mechanism: '연기 입자가 챔버 내로 유입되면 발광부의 빛이 산란되어 평소에는 닿지 않던 수광부에 빛이 도달하게 되며, 이때 발생하는 기전력을 증폭하여 신호를 전송합니다.',
        specs: {
            '정격전압': 'DC 24V',
            '감시전류': '50μA 이하',
            '작동온도': '-10 ~ 50°C',
            '설치기준': '바닥면적 150m² 마다 1개 (높이 4m 미만)'
        },
        law: '소방용품의 형식승인 및 제품검사의 기술기준 (감지기)'
    },

    // --- 기계설비 (Mechanical) ---
    {
        id: 'MCH-001',
        category: 'mech',
        title: '알람 체크 밸브 (Alarm Valve)',
        summary: '습식 스프링클러 배관의 유수 제어 및 경보 장치',
        desc: '1차측과 2차측 배관에 항상 가압수가 채워져 있는 습식 시스템에서 화재로 인한 헤드 개방 시 유수를 검지하는 밸브입니다.',
        components: ['밸브 본체', '클래퍼(Clapper)', '압력스위치', '리타딩 챔버'],
        mechanism: '헤드가 열려 2차측 압력이 낮아지면 1차측 가압수가 클래퍼를 밀어올려 물이 송수됩니다. 이때 시트 사이의 구멍으로 유입된 물이 압력스위치를 작동시켜 화재 신호를 보냅니다.',
        specs: {
            '호칭경': '65A, 80A, 100A, 125A, 150A',
            '최고시험압력': '2.0 MPa',
            '형식': '습식 (Wet Type)',
            '장착방식': '수직형 / 수평형'
        },
        law: 'NFPC 103 (스프링클러설비의 화재안전성능기준)'
    },
    {
        id: 'MCH-002',
        category: 'mech',
        title: '소방 주펌프 (Main Pump)',
        summary: '시스템 전체의 유량과 양정을 책임지는 핵심 가압 송수 장치',
        desc: '건물 내 화재 진압에 필요한 충분한 물의 압력과 양을 공급하기 위한 전동기 구동 펌프입니다.',
        components: ['원심 펌프(Centrifugal)', '구동 전동기', '공통 베드', '제어반(MCC)'],
        mechanism: '기동용 수압개폐장치(압력챔버)의 압력 저하 신호에 의해 제어반에서 전동기를 기동시켜 물을 가압 송수합니다.',
        specs: {
            '토출량': '건물 용도별 산정치 이상',
            '양정': '최상층 방수압 0.17 MPa 확보',
            '구동방식': '전동기식 / 엔진식'
        },
        law: 'NFTC 103 및 소방시설법 시행령 별표'
    },

    // --- 피난구조설비 (Evacuation) ---
    {
        id: 'EVC-001',
        category: 'evac',
        title: '피난구 유도등 (Exit Sign)',
        summary: '비상 탈출구의 위치를 알리는 시각 안내 등기구',
        desc: '정전 시에도 예비전원으로 전환되어 피난구의 위치를 상시 밝혀주는 안전 시설입니다.',
        components: ['고휘도 LED 소자', '도광판 및 도안', '예비전원 배터리', '자동 충전 회로'],
        mechanism: '평상시 상용 전원으로 점등 및 충전을 유지하다가, 정전 또는 화재 신호 수신 시 내장된 배터리로 자동 전환되어 점등 상태를 유지합니다.',
        specs: {
            '광원': 'Green LED (표준)',
            '점등시간': '20분 이상 (고층 60분)',
            '전원': 'AC 220V / DC 24V(비상)',
            '휘도': '표면휘도 150 cd/m² 이상'
        },
        law: 'NFPC 303 (유도등 및 유도표지의 화재안전성능기준)'
    },
    {
        id: 'EVC-002',
        category: 'evac',
        title: '완강기 (Descent Device)',
        summary: '사용자의 자중에 의해 일정한 속도로 하강하는 피난 기구',
        desc: '화재 시 복도나 계단을 이용할 수 없는 경우, 창문을 통해 지상으로 안전하게 내려올 수 있는 인명구조기구입니다.',
        components: ['속도 조절기', '와이어 로프', '벨트', '릴(Reel)', '결속용 후크'],
        mechanism: '사용자가 벨트를 착용하고 하강하면 속도 조절기 내의 원심력 브레이크가 작동하여 몸무게와 상관없이 약 16~150cm/s의 속도로 일정하게 하강하게 합니다.',
        specs: {
            '최대사용하중': '1,500 N (150kg)',
            '로프길이': '설치 층높이에 따라 상이',
            '구조': '연속 사용 가능형'
        },
        law: 'NFPC 301 (피난기구의 화재안전성능기준)'
    },

    // --- 방염류 (Flame Retardant) ---
    {
        id: 'FLM-001',
        category: 'flame',
        title: '침투성 방염액',
        summary: '가연물 내부로 침투하여 연소 억제 효과를 내는 약제',
        desc: '실내장식물인 목재나 합판 등에 도포하여 화재 시 연소 확산을 지연시키고 연기 발생을 줄여주는 약제입니다.',
        components: ['인계 화합물', '침투 촉진제', '수성 용매'],
        mechanism: '열에 노출되면 가연물 표면에 탄화막(Char)을 형성하여 산소 공급을 차단하고, 가연성 가스 방출을 억제하는 물리화학적 작용을 합니다.',
        specs: {
            '성질': '수성 / 투명',
            '도포량': '0.2 ~ 0.3 L/m²',
            '인증': 'KFI 방염 성능인증'
        },
        law: '소방시설 설치 및 관리에 관한 법률 제24조 (방염)'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const grid = document.getElementById('equipment-grid');
    const modal = document.getElementById('detail-modal');
    const stepDots = document.querySelectorAll('.step-nav .step-dot');

    function renderCards(filter = 'all') {
        grid.innerHTML = '';
        const filteredData = filter === 'all' ? equipmentData : equipmentData.filter(d => d.category === filter);
        
        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'equip-card';
            card.style.animationDelay = `${index * 0.05}s`;
            
            // Generate simple symbolic icon based on category
            let icon = 'book';
            if (item.category === 'ext') icon = 'flame';
            if (item.category === 'alarm') icon = 'bell';
            if (item.category === 'mech') icon = 'settings';
            if (item.category === 'evac') icon = 'door-open';
            if (item.category === 'flame') icon = 'shield-check';

            card.innerHTML = `
                <div class="card-head">
                    <span class="card-category">${item.category}</span>
                    <div class="card-symbol"><i data-lucide="${icon}"></i></div>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-summary">${item.summary}</p>
                <div class="card-meta">
                    <span class="meta-code">${item.id}</span>
                    <span class="view-btn">DATA SHEET <i data-lucide="arrow-right" style="width:12px; height:12px;"></i></span>
                </div>
            `;
            card.onclick = () => showModal(item);
            grid.appendChild(card);
        });
        lucide.createIcons();
    }

    function showModal(item) {
        document.getElementById('modal-title').textContent = item.title + ' (TECHNICAL DATA SHEET)';
        document.getElementById('detail-desc').textContent = item.desc;
        document.getElementById('working-principle').textContent = item.mechanism;
        
        // Specs Table
        const specsTable = document.getElementById('specs-table');
        specsTable.innerHTML = '';
        if (item.specs) {
            Object.entries(item.specs).forEach(([key, value]) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<th>${key}</th><td>${value}</td>`;
                specsTable.appendChild(tr);
            });
        }

        // Component List
        const list = document.getElementById('component-list');
        list.innerHTML = '';
        item.components.forEach(comp => {
            const li = document.createElement('li');
            li.innerHTML = `<i data-lucide="check" style="width:14px; height:14px; color:var(--accent);"></i> ${comp}`;
            list.appendChild(li);
        });

        // Law box
        document.getElementById('law-content').innerHTML = `<i data-lucide="gavel" style="width:14px; height:14px; margin-right:6px;"></i> ${item.law}`;

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

    renderCards();
});
