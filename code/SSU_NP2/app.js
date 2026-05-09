const equipmentData = [
    // --- 소화기류 (Extinguishers) ---
    {
        id: 'ext-abc',
        category: 'ext',
        title: 'ABC 분말 소화기 (Dry Chemical Extinguisher)',
        image: 'https://images.unsplash.com/photo-1596753106193-41c304f43427?auto=format&fit=crop&q=80&w=1000',
        summary: '가장 보편적인 다목적 소화기',
        desc: 'A급(일반), B급(유류), C급(전기) 화재에 모두 사용 가능한 범용 소화기입니다. KFI 형식승인 제품으로 질소가스를 이용한 축압식 구조입니다.',
        components: ['소화약제(제1인산암모늄)', '축압가스(N2)', '안전핀', '레버', '압력계', '호스'],
        working: '안전핀을 뽑고 레버를 누르면 내부 축압가스가 미세 분말 약제를 밀어내어 화재 지점을 산소 차단(질식) 및 냉각 효과로 진압합니다.',
        specs: { material: 'Steel (KSD 3503)', capacity: '3.3kg / 4.5kg / 6kg', rating: 'A3, B5, C', kfi_no: 'KFI-2024-EXT-01' },
        hotspots: [{ x: 50, y: 30, label: '레버/손잡이', detail: '약제 방출을 조절하는 트리거' }, { x: 50, y: 70, label: '본체 용기', detail: '고압 가스와 약제가 저장된 강철 용기' }]
    },
    {
        id: 'ext-co2',
        category: 'ext',
        title: '이산화탄소 소화기 (CO2 Extinguisher)',
        image: 'https://images.unsplash.com/photo-1610492316736-2f6382029583?auto=format&fit=crop&q=80&w=1000',
        summary: '전기 및 유류 화재 전용 잔여물 없는 소화기',
        desc: '소화 후 잔여물이 남지 않아 전산실, 통신실 등 정밀 기기 보호가 필요한 장소에 필수적인 소화기입니다.',
        components: ['고압 용기', '방출 혼(Horn)', '안전 밸브', '액화 이산화탄소'],
        working: '액체 상태의 CO2가 기체로 방출되면서 극저온의 냉각 효과와 산소 농도 저하를 통해 불을 끕니다.',
        specs: { capacity: '2.3kg / 4.6kg', material: 'Seamless Steel', kfi_no: 'KFI-2024-CO2-05' },
        hotspots: [{ x: 80, y: 50, label: '방출 혼', detail: '가스 팽창 시 손상을 방지하고 방향을 유도하는 깔대기형 노즐' }]
    },

    // --- 경보설비 (Alarm) ---
    {
        id: 'alarm-panel-r',
        category: 'alarm',
        title: 'R형 수신기 (Digital Receiver)',
        image: 'assets/fire_panel.png',
        summary: '대형 건물용 지능형 화재 감시 시스템',
        desc: '개별 감지기의 주소를 식별하여 정확한 화재 위치를 파악하고 시스템을 통합 제어하는 디지털 두뇌입니다.',
        components: ['메인보드', '7인치 터치스크린', 'LOOP 통신카드', '비상 배터리'],
        working: '중계기와의 통신을 통해 신호를 주고받으며, 화재 발생 시 그래픽 화면에 위치를 표시하고 연동 설비를 가동합니다.',
        specs: { address: '최대 2048개', display: 'Full Color Touch', protocol: 'R-Type Digital' },
        hotspots: [{ x: 50, y: 40, label: '상태창', detail: '실시간 시스템 무결성 및 화재 여부 표시' }]
    },
    {
        id: 'alarm-detector-smk',
        category: 'alarm',
        title: '광전식 연기감지기 (Smoke Detector)',
        image: 'assets/detector.png',
        summary: '연기 산란을 이용한 조기 화재 탐지기',
        desc: '화재 초기 발생하는 연기를 포착하여 신속하게 경보를 보냅니다. KFI 형식승인 기준에 따른 감도 시험을 통과한 제품입니다.',
        components: ['산란 챔버', 'IR 발광부', '수광 소자', 'LED 표시등'],
        working: '챔버 내로 연기 입자가 들어와 빛을 산란시키면 수광부가 이를 감지하여 전기 신호를 발생시킵니다.',
        specs: { voltage: 'DC 24V', sensitive: '종별 1종/2종', area: '150m² (4m 이하)' }
    },
    {
        id: 'alarm-call',
        category: 'alarm',
        title: '화재 발신기 (Manual Call Point)',
        image: 'assets/call_point.png',
        summary: '수동 화재 통보용 누름 버튼',
        desc: '사람이 화재를 발견했을 때 직접 눌러서 수신기에 신호를 보내는 장치입니다.',
        components: ['누름 스위치', '전화 잭', '응답 램프'],
        working: '버튼을 누르면 회로가 구성되어 수신기에 화재 신호가 전달되며, 수신기에서 확인 신호가 오면 램프가 켜집니다.'
    },

    // --- 기계설비 (Mechanical) ---
    {
        id: 'mech-valve-alarm',
        category: 'mech',
        title: '알람 체크 밸브 (Alarm Valve)',
        image: 'assets/alarm_valve.png',
        summary: '습식 스프링클러 설비의 핵심 밸브',
        desc: '배관 내 유수를 감지하여 화재 경보를 발령하고 송수를 제어하는 유수제어밸브입니다.',
        components: ['본체', '클래퍼', '압력스위치', '리타딩챔버'],
        working: '2차측 압력이 낮아지면 1차측 가압수가 클래퍼를 밀어올려 배관에 물을 공급하고 경보를 울립니다.',
        specs: { size: '65A ~ 150A', pressure: '12 kgf/cm²', type: 'Wet Type' }
    },
    {
        id: 'mech-sprinkler',
        category: 'mech',
        title: '표준형 스프링클러 헤드',
        image: 'assets/sprinkler.png',
        summary: '자동 살수를 통한 화재 진압 장치',
        desc: '설정 온도에서 감열체가 파괴되어 물을 분사하는 종단 설비입니다.',
        components: ['프레임', '글라스벌브', '디플렉터', '오리피스'],
        working: '열기에 의해 글라스벌브 속 액체가 팽창/파열되면 캡이 이탈하며 가압수가 방출됩니다.',
        specs: { k_factor: '80', temp: '68°C / 93°C', type: 'Pendent / Upright' }
    },
    {
        id: 'mech-pump',
        category: 'mech',
        title: '소방 주펌프 (Fire Pump)',
        image: 'assets/fire_pump.png',
        summary: '송수를 위한 고압 가압 송수 장치',
        desc: '건물 소화용수를 말단까지 보내기 위한 높은 양정과 유량을 갖춘 가압 펌프입니다.',
        components: ['원심 펌프', '고효율 전동기', '압력 챔버'],
        working: '배관 압력이 떨어지면 압력 챔버의 스위치가 감지하여 펌프를 자동으로 기동합니다.'
    },

    // --- 피난구조설비 (Evacuation) ---
    {
        id: 'evac-light',
        category: 'evac',
        title: '피난구 유도등 (Exit Sign)',
        image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1000',
        summary: '비상 탈출구 위치 안내 등기구',
        desc: '화재 시 전력이 끊겨도 예비전원으로 20분 이상 밝게 켜져 출구를 안내합니다.',
        components: ['고휘도 LED', '예비전원 배터리', '도광판'],
        working: '상시 전원으로 충전 및 점등 상태를 유지하다가 정전 시 내장 배터리로 전환됩니다.',
        specs: { size: '대형/중형/소형', duration: '20min / 60min' }
    },
    {
        id: 'evac-mask',
        category: 'evac',
        title: '공기호흡기 (SCBA)',
        image: 'https://images.unsplash.com/photo-1513224502586-d1e602410265?auto=format&fit=crop&q=80&w=1000',
        summary: '소방대원 및 피난자용 산소 공급 장치',
        desc: '연기가 가득한 곳에서도 안전하게 호흡할 수 있도록 압축 공기를 공급하는 장비입니다.',
        components: ['고압 실린더', '등지게', '면체(Mask)', '압력조절기'],
        working: '실린더의 고압 공기를 대기압 수준으로 낮추어 면체 내부로 공급합니다.',
        specs: { volume: '6.8L', duration: '45min / 60min' }
    },

    // --- 방염류 (Flame Retardant) ---
    {
        id: 'flame-spray',
        category: 'flame',
        title: '침투성 방염액 (Flame Retardant Chemical)',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000',
        summary: '목재 및 섬유 화재 확산 방지제',
        desc: '가연물 표면에 도포하여 화재 시 연소를 지연시키고 불길이 번지는 것을 막아주는 약제입니다.',
        components: ['인계 화합물', '침투 촉진제', '수성 용매'],
        working: '화재 열에 노출되면 탄화막을 형성하여 가연물로의 산소 공급을 차단하고 가연성 가스 발생을 억제합니다.',
        specs: { type: '수성 / 유성', target: '목재, 합판, 실내장식물' }
    },
    {
        id: 'flame-fabric',
        category: 'flame',
        title: '방염 커튼 (Flame Retardant Fabric)',
        image: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&q=80&w=1000',
        summary: 'KFI 인증을 획득한 특수 방염 원단',
        desc: '화재 발생 시 불이 잘 붙지 않고 유독가스 배출이 적은 특수 처리 원단입니다.',
        components: ['방염 처리사', '특수 코팅층'],
        working: '불꽃이 닿아도 불길이 번지지 않고 스스로 꺼지는(자기소화성) 성질을 가집니다.'
    },

    // --- 추가 장비 (기타) ---
    {
        id: 'mech-hydrant',
        category: 'mech',
        title: '옥내 소화전함 (Indoor Hydrant Box)',
        image: 'https://images.unsplash.com/photo-1582531608316-e575796c994f?auto=format&fit=crop&q=80&w=1000',
        summary: '강력한 수압으로 직접 화재를 진압하는 함',
        desc: '건물 복도 등에 설치되어 강력한 수압으로 초기 화재를 진압하는 장치입니다.',
        components: ['앵글 밸브', '소방 호스', '관창(Nozzle)', '방수구'],
        working: '밸브를 열면 가압 송수 장치에서 물이 공급되며 관창을 조절하여 직사 또는 분무 상태로 방수합니다.'
    },
    {
        id: 'evac-ladder',
        category: 'evac',
        title: '피난 사다리 (Escape Ladder)',
        image: 'https://images.unsplash.com/photo-1590486803833-ffc6f68d88e5?auto=format&fit=crop&q=80&w=1000',
        summary: '비상 탈출용 접이식 사다리',
        desc: '화재 시 계단을 이용할 수 없는 상황에서 창문을 통해 아래층으로 대피할 때 사용하는 기구입니다.',
        specs: { type: '접이식 / 올림식', material: 'Aluminum Alloy' }
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
            card.style.animationDelay = `${index * 0.03}s`;
            card.innerHTML = `
                <div class="card-visual">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=1000'">
                    <div class="card-overlay-badge">${item.category.toUpperCase()}</div>
                </div>
                <div class="card-body">
                    <span class="card-tag">KFI Standard</span>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-summary">${item.summary}</p>
                    <div class="card-footer">
                        <span class="view-detail">기술 사양 분석 <i data-lucide="activity"></i></span>
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
        
        const list = document.getElementById('component-list');
        list.innerHTML = '';
        item.components.forEach(comp => {
            const li = document.createElement('li');
            li.innerHTML = `<i data-lucide="check-circle-2" style="width:14px; height:14px; color:var(--accent); margin-right:6px; display:inline-block; vertical-align:middle;"></i> ${comp}`;
            list.appendChild(li);
        });

        let infoContent = document.querySelector('.info-content');
        
        // Remove old dynamic sections
        const dynamicSections = infoContent.querySelectorAll('.dynamic-section');
        dynamicSections.forEach(s => s.remove());

        // Specs section
        if (item.specs) {
            const specSection = document.createElement('section');
            specSection.className = 'info-block dynamic-section';
            specSection.innerHTML = '<h3><i data-lucide="settings"></i> KFI 형식승인 기준 (Specs)</h3><ul class="specs-list comp-list"></ul>';
            const specList = specSection.querySelector('.specs-list');
            Object.entries(item.specs).forEach(([key, value]) => {
                const li = document.createElement('li');
                li.style.borderColor = 'var(--primary)';
                li.innerHTML = `<strong style="color:var(--text-muted); font-size:11px;">${key.toUpperCase()}</strong><br>${value}`;
                specList.appendChild(li);
            });
            infoContent.appendChild(specSection);
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
