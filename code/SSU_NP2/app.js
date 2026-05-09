const equipmentData = [
    {
        id: 'alarm-valve',
        category: 'valve',
        title: '알람 체크 밸브 (Alarm Check Valve)',
        image: 'assets/alarm_valve.png',
        summary: '습식 스프링클러 설비의 유수 검지 장치',
        desc: '습식 스프링클러 설비의 핵심 구성 요소로, 화재 발생 시 물의 흐름을 검지하고 경보를 발령하는 역할을 합니다. 본 도면은 클래퍼와 시트의 밀착 구조를 보여주는 정밀 단면도입니다.',
        components: ['클래퍼 (Clapper)', '시트 (Seat)', '압력스위치', '리타딩 챔버', '드레인 밸브', '시험 밸브'],
        working: '헤드가 열려 2차측 압력이 낮아지면, 1차측 가압수가 클래퍼를 밀어 올리며 유입됩니다. 이때 클래퍼 하단의 구멍을 통해 리타딩 챔버로 물이 들어가 압력스위치를 작동시켜 수신기에 화재 신호를 보냅니다.',
        specs: {
            material: 'GC200 (주철) / Bronze',
            standard: 'KFI 인증 제품',
            pressure: '1.2 MPa (최대작동압력)',
            connection: 'Flange Type (KS B 1511)'
        },
        hotspots: [
            { x: 50, y: 45, label: '클래퍼 (Clapper)', detail: '유수 방향에 따라 개폐되어 역류를 방지하고 유수를 검지함' },
            { x: 75, y: 30, label: '압력스위치', detail: '유수 발생 시 전기적 신호를 수신반으로 송신' },
            { x: 30, y: 70, label: '드레인 밸브', detail: '시험 및 배수 시 사용되는 수동 밸브' }
        ]
    },
    {
        id: 'fire-pump',
        category: 'pump',
        title: '소방 주펌프 (Main Fire Pump)',
        image: 'assets/fire_pump.png',
        summary: '소방 시스템의 수압과 유량을 공급하는 심장',
        desc: '건물 전체 소방 시설에 필요한 압력과 유량을 공급하는 설비입니다. 본 3D 모델은 원심력 발생을 위한 임펠러와 케이싱의 결합 구조를 상세히 나타냅니다.',
        components: ['임펠러', '케이싱', '전동기 (Motor)', '커플링', '제어반 (MCC)', '체크 밸브', '릴리프 밸브'],
        working: '기동용 수압개폐장치(압력챔버)의 압력 저하를 감지하여 제어반에서 전동기를 기동시킵니다. 임펠러의 회전력을 이용하여 수원을 가압하고 배관을 통해 말단 설비까지 물을 송수합니다.',
        specs: {
            type: 'Single Stage Centrifugal',
            flow: '600 ~ 2400 LPM',
            head: '50m ~ 150m',
            power: '15kW ~ 75kW'
        },
        hotspots: [
            { x: 40, y: 50, label: '임펠러 (Impeller)', detail: '원심력을 발생시켜 물에 압력을 가하는 핵심 회전체' },
            { x: 70, y: 50, label: '전동기 (Motor)', detail: '펌프를 구동하기 위한 동력원' },
            { x: 20, y: 45, label: '흡입측 (Suction)', detail: '수원으로부터 물이 유입되는 경로' }
        ]
    },
    {
        id: 'fire-panel',
        category: 'alarm',
        title: 'R형 수신기 (Digital Fire Alarm Control Panel)',
        image: 'assets/fire_panel.png',
        summary: '전체 시스템의 상태를 감시하고 제어하는 두뇌',
        desc: '디지털 통신 방식을 사용하는 R형 수신기로, 수천 개의 감지기 주소를 개별적으로 식별하고 제어할 수 있는 고성능 중앙 제어 장치입니다.',
        components: ['CPU/메인보드', '터치 LCD 패널', '상태 표시 LED', '예비전원 배터리', '통신 카드'],
        working: '각 구역의 중계기로부터 신호를 수신하여 화재 위치를 LCD에 표시하고, 프로그램된 로직에 따라 사이렌, 유도등, 펌프 등을 연동 제어합니다.',
        specs: {
            protocol: 'LonWorks / RS-485',
            capacity: 'Up to 2048 Addresses',
            backup: 'DC 24V / 4Ah Ni-Cd',
            display: '7" Full Color Touch Screen'
        },
        hotspots: [
            { x: 50, y: 35, label: '메인 디스플레이', detail: '화재 위치 및 시스템 상태를 실시간 그래픽으로 표시' },
            { x: 50, y: 65, label: '조작부', detail: '경종 정지, 복구, 시험 등의 기능을 수행하는 인터페이스' }
        ]
    },
    {
        id: 'detector',
        category: 'alarm',
        title: '광전식 연기감지기 (Photoelectric Smoke Detector)',
        image: 'assets/detector.png',
        summary: '연기 입자를 감지하여 화재 초기 신호 발생',
        desc: '빛의 산란 원리를 이용한 연기 감지기입니다. 먼지 등에 의한 오작동을 방지하기 위한 미세 차폐망 구조와 광학 챔버 설계가 특징입니다.',
        components: ['산란실 (Chamber)', '발광 다이오드', '수광 소자', '차폐망', '작동 표시등 (LED)'],
        working: '연기가 감지기 내부의 암실로 유입되면, 발광부의 빛이 연기 입자에 부딪혀 산란됩니다. 이 산란된 빛이 수광 소자에 도달하여 화재 신호를 전송합니다.',
        specs: {
            voltage: 'DC 24V',
            current: '45mA (Alarm) / 50uA (Standby)',
            sensing: 'Infrared Scattering',
            area: 'Up to 150m² (Height < 4m)'
        },
        hotspots: [
            { x: 50, y: 55, label: '광학 챔버', detail: '연기 입자가 빛을 산란시키는 암실 공간' },
            { x: 80, y: 45, label: '작동 표시등', detail: '작동 시 적색 LED가 점등되어 위치 확인 가능' }
        ]
    },
    {
        id: 'sprinkler',
        category: 'head',
        title: '스프링클러 헤드 (Sprinkler Head)',
        image: 'assets/sprinkler.png',
        summary: '열을 감지하여 자동으로 살수하는 종단 장치',
        desc: '68°C 등 특정 온도에서 유리 벌브가 파괴되도록 설계된 표준형 헤드입니다. 물의 분사 패턴을 최적화하는 디플렉터 설계 도면을 기반으로 합니다.',
        components: ['프레임', '디플렉터 (Deflector)', '감열체 (Glass Bulb)', '오리피스', '캡 (Cap)'],
        working: '화재 시 열에 의해 유리 벌브 내의 액체가 팽창하여 벌브가 파괴됩니다. 캡이 튕겨져 나가면서 물이 디플렉터에 부딪혀 넓게 분사됩니다.',
        specs: {
            kfactor: 'K=80 (LPM/bar^0.5)',
            temp: '68°C (Standard Red Bulb)',
            thread: 'PT 1/2"',
            finish: 'Chrome Plated'
        },
        hotspots: [
            { x: 50, y: 40, label: '글라스 벌브', detail: '열에 반응하여 파괴되는 핵심 감열부' },
            { x: 50, y: 80, label: '디플렉터', detail: '방출되는 물을 고르게 분산시키는 반사판' }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const grid = document.getElementById('equipment-grid');
    const modal = document.getElementById('detail-modal');
    const stepDots = document.querySelectorAll('.step-dot');

    function renderCards(filter = 'all') {
        grid.innerHTML = '';
        const filteredData = filter === 'all' ? equipmentData : equipmentData.filter(d => d.category === filter);
        
        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'equip-card';
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <div class="card-visual">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=1000'">
                    <div class="card-overlay-badge">TECHNICAL</div>
                </div>
                <div class="card-body">
                    <span class="card-tag">${item.category}</span>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-summary">${item.summary}</p>
                    <div class="card-footer">
                        <span class="view-detail">상세 도면 보기 <i data-lucide="chevron-right"></i></span>
                    </div>
                </div>
            `;
            card.onclick = () => showModal(item);
            grid.appendChild(card);
        });
        lucide.createIcons();
    }

    function showModal(item) {
        document.getElementById('modal-title').textContent = item.title;
        const detailImg = document.getElementById('detail-image');
        detailImg.src = item.image;
        
        document.getElementById('detail-desc').textContent = item.desc;
        document.getElementById('working-principle').textContent = item.working;
        
        // Component List
        const list = document.getElementById('component-list');
        list.innerHTML = '';
        item.components.forEach(comp => {
            const li = document.createElement('li');
            li.textContent = comp;
            list.appendChild(li);
        });

        // Specs List (Add Specs section if it doesn't exist)
        let specsPanel = document.querySelector('.specs-list');
        if (!specsPanel) {
            const section = document.createElement('section');
            section.className = 'info-block';
            section.innerHTML = '<h3><i data-lucide="settings"></i> 상세 제원 (Specs)</h3><ul class="specs-list comp-list"></ul>';
            document.querySelector('.info-content').appendChild(section);
            specsPanel = section.querySelector('.specs-list');
        }
        specsPanel.innerHTML = '';
        if (item.specs) {
            Object.entries(item.specs).forEach(([key, value]) => {
                const li = document.createElement('li');
                li.style.borderColor = 'var(--primary)';
                li.innerHTML = `<strong style="color:var(--text-muted)">${key.toUpperCase()}:</strong> ${value}`;
                specsPanel.appendChild(li);
            });
        }

        // Hotspots
        const hotspotContainer = document.getElementById('hotspots-container');
        hotspotContainer.innerHTML = '';
        if (item.hotspots) {
            item.hotspots.forEach(hs => {
                const dot = document.createElement('div');
                dot.className = 'hotspot';
                dot.style.left = `${hs.x}%`;
                dot.style.top = `${hs.y}%`;
                dot.setAttribute('title', hs.label);
                
                const tooltip = document.createElement('div');
                tooltip.className = 'hotspot-tooltip';
                tooltip.innerHTML = `<strong>${hs.label}</strong><p>${hs.detail}</p>`;
                dot.appendChild(tooltip);
                
                hotspotContainer.appendChild(dot);
            });
        }

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
