const equipmentData = [
    // --- 1. 소화기구 및 자동소화장치 (Extinguishers & Auto-devices) ---
    {
        id: 'EXT-001',
        category: 'ext',
        title: 'ABC 분말 소화기',
        summary: '제1인산암모늄을 주성분으로 하는 가장 보편적인 소화기',
        desc: '일반화재(A), 유류화재(B), 전기화재(C)에 모두 사용할 수 있는 범용 소화기입니다. 용기 내부에 질소가스와 약제가 함께 가압되어 있는 축압식 구조가 일반적입니다.',
        components: ['소화약제 용기', '지시압력계', '안전핀', '노즐 및 호스', '레버'],
        mechanism: '레버를 누르면 가압된 질소가 약제를 밀어내어 노즐을 통해 방출됩니다. 약제가 열분해되면서 발생하는 부촉매 효과와 질식 효과로 화재를 제압합니다.',
        specs: {
            '약제명': '제1인산암모늄 (분말)',
            '사용압력': '0.7 ~ 0.98 MPa',
            '충전량': '3.3kg (표준)',
            '방사거리': '3~5m'
        },
        law: 'NFPC 101 (소화기구 및 자동소화장치), 소방용품 형식승인 기준'
    },
    {
        id: 'EXT-002',
        category: 'ext',
        title: '주거용 주방자동소화장치',
        summary: '주방 후드 내부에 설치되어 화재 시 자동으로 소화하는 장치',
        desc: '아파트 등 공동주택 주방에 의무 설치되는 설비로, 화재 발생 시 열을 감지하여 가스를 차단하고 소화약제를 자동으로 방출합니다.',
        components: ['수신부', '열감지기', '가스차단장치', '약제저장용기', '방출구'],
        mechanism: '감지기가 일정 온도 이상을 감지하면 수신부로 신호를 보내며, 1차로 가스 밸브를 차단하고 2차로 약제를 방출하여 화재를 진압합니다.',
        specs: {
            '설치장소': '주방 렌지후드 상단',
            '전원': 'AC 220V / DC 12V',
            '차단방식': '기계식 또는 전자식',
            '약제': '강화액 또는 분말'
        },
        law: 'NFPC 101, 소방시설 설치 및 관리에 관한 법률'
    },
    {
        id: 'EXT-003',
        category: 'ext',
        title: '자동확산소화기',
        summary: '천장에 설치되어 화재 열에 의해 자동으로 작동하는 소화기',
        desc: '보일러실, 건조실, 변전실 등 소규모 공간의 천장에 설치되어, 화재 시 주위 온도가 상승하면 노즐의 유리 벌브가 파손되면서 약제를 확산시킵니다.',
        components: ['약제 용기', '가압 가스', '감열 헤드 (유리 벌브)', '확산용 반사판'],
        mechanism: '화재 열에 의해 헤드의 감열체가 파손되면 용기 내 약제가 압력에 의해 사방으로 퍼지며 무인 소화를 수행합니다.',
        specs: {
            '작동온도': '72°C (표준)',
            '충전량': '3kg / 10kg',
            '유효면적': '약 5~10m²',
            '약제': 'ABC 분말'
        },
        law: 'KFI 형식승인 기준 (자동확산소화기)'
    },

    // --- 2. 소방경보설비 (Alarm & Detection) ---
    {
        id: 'ALM-001',
        category: 'alarm',
        title: '차동식 스포트형 감지기',
        summary: '주위 온도의 급격한 상승률을 감지하는 열 감지기',
        desc: '일반 거실, 사무실 등에 가장 많이 설치되는 감지기로, 평상시의 완만한 온도 상승에는 반응하지 않고 화재 시의 급속한 온도 상승에만 작동합니다.',
        components: ['감열실(다이어프램)', '리크 구멍 (Leak hole)', '접점', '베이스'],
        mechanism: '주위 온도가 급격히 상승하면 감열실 내부 공기가 팽창하여 다이어프램을 밀어 올리고 접점이 붙어 화재 신호를 보냅니다. 완만한 상승은 리크 구멍으로 공기가 빠져나가 작동하지 않습니다.',
        specs: {
            '정격전압': 'DC 24V',
            '작동원리': '공기 팽창식',
            '설치높이': '4m 미만 (표준)',
            '감지면적': '약 70~90m²'
        },
        law: 'NFPC 203 (자동화재탐지설비), 감지기의 형식승인 및 제품검사 기준'
    },
    {
        id: 'ALM-002',
        category: 'alarm',
        title: '광전식 스포트형 연기감지기',
        summary: '연기 입자에 의한 빛의 산란을 이용한 감지기',
        desc: '복도, 계단, 거실 등 초기 연기 발생이 예상되는 장소에 설치됩니다. 불꽃이 나기 전 훈소 단계의 연기를 잡아내는 데 탁월합니다.',
        components: ['암실(챔버)', '발광 LED', '수광부(포토다이오드)', '차광판'],
        mechanism: '암실 내로 연기가 유입되면 발광부의 빛이 연기 입자에 부딪혀 산란되고, 산란된 빛이 수광부에 도달하여 전류를 발생시키면 화재로 판단합니다.',
        specs: {
            '감지방식': '산란광 방식 (Scattered Light)',
            '감시전류': '50μA 이하',
            '작동온도': '-10 ~ 50°C',
            '응답시간': '30초 이내'
        },
        law: 'NFPC 203, 소방용품 기술기준'
    },
    {
        id: 'ALM-003',
        category: 'alarm',
        title: '가스누설경보기',
        summary: '가연성 가스 또는 일산화탄소의 누출을 감지하여 경보',
        desc: 'LPG, LNG 등의 누설을 감지하여 폭발 사고를 방지합니다. 가스의 비중에 따라 천장(LNG) 또는 바닥(LPG) 부근에 설치합니다.',
        components: ['가스 센서', '수신부 회로', '경보 부저', '전원 표시등'],
        mechanism: '센서가 가스 분자를 포착하여 전기적 저항 변화 또는 화학 반응을 일으키면 이를 감지하여 음향과 시각 신호로 경보를 발합니다.',
        specs: {
            '대상가스': 'LNG(메탄), LPG(프로판), CO',
            '설치거리': '연소기나 관통부로부터 8m 이내',
            '경보농도': '폭발하한계(LEL)의 1/4 이하',
            '전원': 'AC 220V'
        },
        law: '가스누설경보기의 형식승인 및 제품검사 기준'
    },
    {
        id: 'ALM-004',
        category: 'alarm',
        title: 'P형/R형 수신기',
        summary: '화재 신호를 수신하여 경보 및 연동 설비를 제어하는 중앙 장치',
        desc: 'P형은 접점 신호를 직접 받고, R형은 통신 신호(Address)를 통해 위치를 정확히 식별합니다. 건물의 규모와 관리 방식에 따라 선택합니다.',
        components: ['메인 CPU 카드', '디스플레이(LCD)', '예비전원(배터리)', '연동 릴레이'],
        mechanism: '감지기로부터 신호가 오면 화재 발생 지구창을 점등하고 주경종/지구경종을 울리며, 엘리베이터, 셔터, 소화펌프 등을 연동 제어합니다.',
        specs: {
            '회로수': '5회로 ~ 수천 회로',
            '예비전원': '24V 배터리 내장',
            '통신규격': 'RS-485 / CAN (R형)',
            '기록관리': '이벤트 로그 저장 기능'
        },
        law: '수신기의 형식승인 및 제품검사 기준, NFPC 203'
    },

    // --- 3. 소방기계 및 소화설비 (Mechanical & Suppression) ---
    {
        id: 'MCH-001',
        category: 'mech',
        title: '유수제어밸브 (알람밸브)',
        summary: '습식 스프링클러 배관의 핵심 제어 장치',
        desc: '항상 가압수가 채워진 습식 시스템에서 헤드가 개방되어 물이 흐르기 시작하면 이를 검지하여 수신기에 신호를 보내고 사이렌을 울립니다.',
        components: ['밸브 본체', '클래퍼', '압력스위치', '리타딩 챔버'],
        mechanism: '헤드 작동으로 2차측 압력이 낮아지면 클래퍼가 열리고, 클래퍼 시트 사이로 들어간 물이 압력스위치를 작동시켜 화재 경보를 발령합니다.',
        specs: {
            '호칭경': '65A / 100A / 150A',
            '정격압력': '1.0 ~ 1.6 MPa',
            '형식': '습식 (Wet Type)',
            '재질': '닥타일 주철'
        },
        law: '유수제어밸브의 형식승인 및 제품검사 기술기준'
    },
    {
        id: 'MCH-002',
        category: 'mech',
        title: '스프링클러 헤드 (폐쇄형)',
        summary: '화재 열에 의해 자동으로 개방되는 살수 장치',
        desc: '화재 초기 진압을 위한 가장 효율적인 장치입니다. 감열부의 종류에 따라 가융합금형과 유리벌브형으로 나뉩니다.',
        components: ['프레임', '디플렉터 (반사판)', '감열체 (Glass Bulb)', '캡 및 시트'],
        mechanism: '설정 온도 이상의 열이 가해지면 감열체가 파손되거나 녹으면서 막혀있던 시트가 이탈하고, 배관 내 물이 디플렉터에 부딪혀 사방으로 비산됩니다.',
        specs: {
            '작동온도': '72°C / 93°C / 105°C',
            '방출계수(K)': '80 (표준)',
            '표준방수량': '80 L/min (0.1 MPa 시)',
            '나사규격': 'PT 1/2'
        },
        law: '스프링클러헤드의 형식승인 및 제품검사 기술기준'
    },
    {
        id: 'MCH-003',
        category: 'mech',
        title: '기동용 수압개폐장치 (압력챔버)',
        summary: '배관 내 압력 변화를 감지하여 펌프를 자동으로 기동/정지',
        desc: '소화전이나 스프링클러 배관의 압력을 상시 감시하며, 누설이나 화재 사용으로 인한 압력 저하 시 펌프를 작동시키는 장치입니다.',
        components: ['압력탱크 (100L)', '압력스위치', '안전밸브', '배수밸브', '압력계'],
        mechanism: '배관 압력이 압력스위치 설정값 이하로 떨어지면 접점이 붙어 펌프 제어반(MCC)에 기동 신호를 보냅니다.',
        specs: {
            '용량': '100L (표준)',
            '최고압력': '1.0 ~ 2.0 MPa',
            '재질': '압력용기용 강판 (SS400 등)'
        },
        law: 'NFPC 102 (옥내소화전), NFPC 103 (스프링클러)'
    },

    // --- 4. 피난구조설비 (Evacuation & Rescue) ---
    {
        id: 'EVC-001',
        category: 'evac',
        title: '피난구 유도등 (LED)',
        summary: '비상구의 위치를 알리는 상시 점등 유도등',
        desc: '정전 시에도 내장 배터리로 20분 이상 점등되어야 하며, 피난구 상단 또는 피난 경로에 설치하여 탈출 방향을 안내합니다.',
        components: ['LED 광원', '유도 도안 패널', '예비전원 배터리', '상시 충전 회로'],
        mechanism: '평시에는 AC 전원으로 점등 및 충전을 유지하다가, 전원 차단 시 즉시 배터리 전원으로 전환되어 화재 연기 속에서도 식별 가능한 휘도를 유지합니다.',
        specs: {
            '휘도': '150 cd/m² 이상',
            '배터리유지': '20분 (고층 60분)',
            '소비전력': '3~10W (LED형)',
            '크기': '대/중/소형 구분'
        },
        law: '유도등 및 유도표지의 형식승인 및 제품검사 기준'
    },
    {
        id: 'EVC-002',
        category: 'evac',
        title: '완강기',
        summary: '자중에 의해 일정한 속도로 하강하는 피난 기구',
        desc: '3층 이상 10층 이하의 층에 설치되어, 화재 시 계단 이용이 불가능할 경우 몸에 벨트를 매고 외부로 하강하는 장치입니다.',
        components: ['속도조절기', '와이어 로프', '벨트', '결속용 후크'],
        mechanism: '사용자의 체중에 의해 로프가 풀려나갈 때 조절기 내부의 원심력 브레이크가 작동하여, 체중에 상관없이 0.16 ~ 1.5m/s의 일정한 속도로 내려가게 합니다.',
        specs: {
            '최대하중': '150kg (1,500N)',
            '로프재질': '면사 외장형 항공 와이어',
            '작동속도': '0.16m/s ~ 1.5m/s'
        },
        law: '피난기구의 형식승인 및 제품검사 기술기준'
    },
    {
        id: 'EVC-003',
        category: 'evac',
        title: '공기호흡기',
        summary: '화재 시 소방대원 또는 피난자가 사용하는 개인용 호흡 장치',
        desc: '산소가 부족하거나 유독가스가 가득한 장소에서 고압으로 압축된 공기를 공급받아 안전하게 호흡할 수 있도록 돕는 장비입니다.',
        components: ['공기 용기', '등지게', '면체 (마스크)', '감압밸브', '경보기'],
        mechanism: '고압(300bar)의 공기를 감압하여 사용자에게 공급하며, 용기 압력이 일정 이하로 떨어지면 경고음을 울려 탈출 시점을 알려줍니다.',
        specs: {
            '용기용량': '6.8L / 9.0L',
            '사용시간': '45분 / 60분 (표준)',
            '사용압력': '30 MPa (300 bar)',
            '재질': '복합소재 (탄소섬유)'
        },
        law: '공기호흡기의 형식승인 및 제품검사 기준'
    },

    // --- 5. 방염 및 기타 소방용품 (Flame Retardant & Others) ---
    {
        id: 'FLM-001',
        category: 'flame',
        title: '방염물품 (커튼/벽지)',
        summary: '화재 시 초기 연소 확산을 막기 위해 처리된 물품',
        desc: '다중이용업소나 고층 건물 내부 마감재에 적용됩니다. 불이 붙어도 쉽게 타지 않고 스스로 꺼지는 자기소화성을 가집니다.',
        components: ['난연 처리 섬유', '방염 코팅제', 'KFI 방염 필증'],
        mechanism: '열에 노출되면 탄화막(Char)을 형성하여 내부로 산소 유입을 차단하거나, 연소 시 가연성 가스 방출을 억제합니다.',
        specs: {
            '탄화길이': '20cm 이내',
            '잔염시간': '5초 이내',
            '잔신시간': '30초 이내',
            '발연량': '최대 연기밀도 400 이하'
        },
        law: '방염성능기준 (소방청 고시), 소방시설법 제24조'
    },
    {
        id: 'FLM-002',
        category: 'flame',
        title: '흔들림 방지 버팀대 (Seismic Brace)',
        summary: '지진 시 소방 배관의 파손을 방지하는 내진 설비',
        desc: '지진 하중에 견디도록 배관을 구조물에 고정하는 장치입니다. 종방향과 횡방향 버팀대를 적절히 배치하여 배관의 이탈을 막습니다.',
        components: ['고정용 클램프', '지지대 (Pipe)', '앵커 볼트', '회전 커플러'],
        mechanism: '지진에 의한 관성력을 구조물로 전달하여 배관의 흔들림 폭을 제한하고, 연결부의 파손이나 펌프와의 이격 사고를 방지합니다.',
        specs: {
            '설치간격': '횡방향 12m / 종방향 24m 이내',
            '허용하중': 'KFI 인증 하중 준수',
            '재질': '아연도금강판'
        },
        law: '소방시설의 내진설계기준 (소방청 고시)'
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
                    <span class="view-btn">상세 사양서 <i data-lucide="arrow-right" style="width:12px; height:12px;"></i></span>
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
        document.getElementById('modal-title').textContent = `${item.title} | 기술 사양서 (Data Sheet)`;
        document.getElementById('detail-desc').textContent = item.desc;
        document.getElementById('working-principle').textContent = item.mechanism;
        
        const specsTable = document.getElementById('specs-table');
        specsTable.innerHTML = '';
        if (item.specs) {
            Object.entries(item.specs).forEach(([key, value]) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<th>${key}</th><td>${value}</td>`;
                specsTable.appendChild(tr);
            });
        }

        const list = document.getElementById('component-list');
        list.innerHTML = '';
        item.components.forEach(comp => {
            const li = document.createElement('li');
            li.innerHTML = `<i data-lucide="check" style="width:14px; height:14px; color:var(--accent);"></i> ${comp}`;
            list.appendChild(li);
        });

        document.getElementById('law-content').innerHTML = `<strong>근거 법규:</strong> ${item.law}`;

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
