const equipmentData = [
    // --- 소화기류 (Extinguishers) ---
    {
        id: 'ext-abc',
        category: 'ext',
        title: 'ABC 분말 소화기 (Dry Chemical Extinguisher)',
        image: 'https://images.unsplash.com/photo-1596753106193-41c304f43427?auto=format&fit=crop&q=80&w=1000',
        summary: '가장 보편적인 다목적 소화기',
        desc: 'A급(일반), B급(유류), C급(전기) 화재에 모두 사용 가능한 범용 소화기입니다.',
        components: ['소화약제(제1인산암모늄)', '축압가스(N2)', '안전핀', '레버', '압력계', '호스'],
        working: '안전핀을 뽑고 레버를 누르면 내부 축압가스가 미세 분말 약제를 밀어내어 화재 지점을 산소 차단(질식) 및 냉각 효과로 진압합니다.',
        specs: { material: 'Steel (KSD 3503)', capacity: '3.3kg', rating: 'A3, B5, C', kfi_no: 'KFI-2024-EXT-01' }
    },
    {
        id: 'ext-co2',
        category: 'ext',
        title: '이산화탄소 소화기 (CO2 Extinguisher)',
        image: 'https://images.unsplash.com/photo-1610492316736-2f6382029583?auto=format&fit=crop&q=80&w=1000',
        summary: '정밀 기기 보호용 잔여물 없는 소화기',
        desc: '소화 후 잔여물이 남지 않아 전산실, 통신실 등에서 사용됩니다.',
        components: ['고압 용기', '방출 혼(Horn)', '안전 밸브', '액화 이산화탄소'],
        working: '액체 상태의 CO2가 기체로 방출되면서 극저온의 냉각 효과와 산소 농도 저하를 통해 불을 끕니다.',
        specs: { capacity: '2.3kg / 4.6kg', material: 'Seamless Steel' }
    },
    {
        id: 'ext-kitchen',
        category: 'ext',
        title: '주방용 자동소화장치 (Kitchen Auto System)',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000',
        summary: '상업용 주방 화재 자동 진압 시스템',
        desc: '주방 후드 내부에 설치되어 식용유 화재 등을 자동으로 감지하고 소화약제를 방출합니다.',
        components: ['온도 센서', '제어부', '약제 저장용기', '방출 노즐', '가스 차단 장치'],
        working: '설정 온도 이상의 열이 감지되면 제어부에서 경보를 울리고 가스 밸브를 차단한 뒤 소화약제를 살수합니다.',
        specs: { type: 'K-Class Specialized', response: 'Automatic / Manual' }
    },
    {
        id: 'ext-auto-spray',
        category: 'ext',
        title: '자동확산 소화기 (Auto Diffusion Extinguisher)',
        image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1000',
        summary: '천장에 설치하는 무인 자동 소화 장치',
        desc: '보일러실이나 건조실 등 화재 위험이 높은 천장에 설치하여 무인 상태에서 작동합니다.',
        working: '화재 시 주위 온도가 약 72℃가 되면 밸브가 자동으로 열려 약제를 사방으로 확산 살포합니다.'
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
        working: '중계기와의 통신을 통해 신호를 주고받으며, 화재 발생 시 그래픽 화면에 위치를 표시합니다.',
        specs: { address: '최대 2048개', display: 'Full Color Touch', protocol: 'R-Type Digital' }
    },
    {
        id: 'alarm-panel-p',
        category: 'alarm',
        title: 'P형 1급 수신기 (P-Type Panel)',
        image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7bc3?auto=format&fit=crop&q=80&w=1000',
        summary: '중소형 건물용 표준 화재 수신기',
        desc: '회로별로 화재를 감지하는 전통적인 방식의 수신기입니다.',
        specs: { circuit: '5 / 10 / 20 / 30 Circuits', battery: 'DC 24V Internal' }
    },
    {
        id: 'alarm-det-smk',
        category: 'alarm',
        title: '광전식 연기감지기 (Smoke Detector)',
        image: 'assets/detector.png',
        summary: '연기 산란을 이용한 조기 화재 탐지기',
        desc: '화재 초기 발생하는 연기를 포착하여 신속하게 경보를 보냅니다.',
        components: ['산란 챔버', 'IR 발광부', '수광 소자', 'LED 표시등'],
        working: '챔버 내로 연기 입자가 들어와 빛을 산란시키면 수광부가 이를 감지하여 전기 신호를 발생시킵니다.'
    },
    {
        id: 'alarm-det-heat',
        category: 'alarm',
        title: '차동식 스포트형 감지기 (Heat Detector)',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
        summary: '온도 상승률을 감지하는 열감지기',
        desc: '주위 온도가 급격하게 상승할 때 작동하는 가장 일반적인 열감지기입니다.',
        working: '내부 공기실의 공기가 열에 의해 팽창하여 다이어프램을 밀어 올려 접점이 붙게 됩니다.'
    },
    {
        id: 'alarm-det-flame',
        category: 'alarm',
        title: '불꽃 감지기 (Flame Detector)',
        image: 'https://images.unsplash.com/photo-1580137197581-df2bb346a786?auto=format&fit=crop&q=80&w=1000',
        summary: '적외선/자외선을 감지하는 초정밀 감지기',
        desc: '불꽃에서 방출되는 특수 파장을 감지하여 먼 거리에서도 화재를 즉시 발견합니다.',
        specs: { type: 'UV / IR / Multi-IR', distance: '30m ~ 50m' }
    },
    {
        id: 'alarm-visual',
        category: 'alarm',
        title: '시각 경보장치 (Visual Alarm)',
        image: 'https://images.unsplash.com/photo-1590486803833-ffc6f68d88e5?auto=format&fit=crop&q=80&w=1000',
        summary: '청각 장애인용 섬광 경보 장치',
        desc: '강력한 스트로브 라이트를 사용하여 소리를 듣지 못하는 사람에게 화재를 알립니다.',
        specs: { frequency: '1Hz ~ 3Hz', color: 'White Strobe' }
    },
    {
        id: 'alarm-call',
        category: 'alarm',
        title: '화재 발신기 (Manual Call Point)',
        image: 'assets/call_point.png',
        summary: '수동 화재 통보용 누름 버튼',
        desc: '사람이 화재를 발견했을 때 직접 눌러서 수신기에 신호를 보내는 장치입니다.'
    },

    // --- 기계설비 (Mechanical) ---
    {
        id: 'mech-valve-alarm',
        category: 'mech',
        title: '알람 체크 밸브 (Alarm Valve)',
        image: 'assets/alarm_valve.png',
        summary: '습식 스프링클러 설비의 핵심 밸브',
        desc: '배관 내 유수를 감지하여 화재 경보를 발령하고 송수를 제어하는 유수제어밸브입니다.',
        components: ['본체', '클래퍼', '압력스위치', '리타딩챔버']
    },
    {
        id: 'mech-valve-pre',
        category: 'mech',
        title: '준비작동식 밸브 (Pre-action Valve)',
        image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7bc3?auto=format&fit=crop&q=80&w=1000',
        summary: '동파 방지 및 오작동 방지용 밸브',
        desc: '전산실, 주차장 등 동파 우려가 있거나 수손 피해를 최소화해야 하는 곳에 설치합니다.',
        working: '감지기가 작동해야만 밸브가 열려 물이 송수되는 이중 안전 방식입니다.'
    },
    {
        id: 'mech-sprinkler',
        category: 'mech',
        title: '표준형 스프링클러 헤드',
        image: 'assets/sprinkler.png',
        summary: '자동 살수를 통한 화재 진압 장치',
        desc: '설정 온도에서 감열체가 파괴되어 물을 분사하는 종단 설비입니다.',
        specs: { k_factor: '80', temp: '68°C', type: 'Pendent / Upright' }
    },
    {
        id: 'mech-pump',
        category: 'mech',
        title: '소방 주펌프 (Fire Pump)',
        image: 'assets/fire_pump.png',
        summary: '송수를 위한 고압 가압 송수 장치',
        desc: '건물 소화용수를 말단까지 보내기 위한 높은 양정과 유량을 갖춘 가압 펌프입니다.'
    },
    {
        id: 'mech-hydrant-in',
        category: 'mech',
        title: '옥내 소화전 (Indoor Hydrant)',
        image: 'https://images.unsplash.com/photo-1582531608316-e575796c994f?auto=format&fit=crop&q=80&w=1000',
        summary: '강력한 수압으로 직접 화재를 진압하는 함',
        desc: '건물 복도 등에 설치되어 강력한 수압으로 초기 화재를 진압하는 장치입니다.',
        components: ['앵글 밸브', '소방 호스', '관창(Nozzle)', '방수구']
    },
    {
        id: 'mech-hydrant-out',
        category: 'mech',
        title: '옥외 소화전 (Outdoor Hydrant)',
        image: 'https://images.unsplash.com/photo-1524143818310-745679906660?auto=format&fit=crop&q=80&w=1000',
        summary: '건물 외부 소방수 공급용 지상 설비',
        desc: '건물 외부 도로변에 설치되어 소방차에 물을 공급하거나 직접 화재를 진압합니다.',
        specs: { connection: '65mm Dual', material: 'Cast Iron' }
    },
    {
        id: 'mech-tank',
        category: 'mech',
        title: '소방용 수조 (Fire Water Tank)',
        image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1000',
        summary: '소방 전용 용수 저장 탱크',
        desc: '비상시를 대비하여 일정량 이상의 소화 용수를 항상 저장해 두는 시설입니다.',
        specs: { material: 'SMC / Stainless / Steel', capacity: 'Building Required Volume' }
    },

    // --- 피난구조설비 (Evacuation) ---
    {
        id: 'evac-light',
        category: 'evac',
        title: '피난구 유도등 (Exit Sign)',
        image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1000',
        summary: '비상 탈출구 위치 안내 등기구',
        desc: '화재 시 전력이 끊겨도 예비전원으로 20분 이상 밝게 켜져 출구를 안내합니다.'
    },
    {
        id: 'evac-emergency-light',
        category: 'evac',
        title: '비상 조명등 (Emergency Light)',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000',
        summary: '정전 시 실내를 밝히는 보조 조명',
        desc: '복도나 계단에 설치되어 피난 시 필요한 조도를 확보해 줍니다.',
        specs: { duration: '20min / 60min', brightness: '1 Lux minimum' }
    },
    {
        id: 'evac-mask',
        category: 'evac',
        title: '공기호흡기 (SCBA)',
        image: 'https://images.unsplash.com/photo-1513224502586-d1e602410265?auto=format&fit=crop&q=80&w=1000',
        summary: '소방대원용 산소 공급 장치',
        desc: '연기가 가득한 곳에서도 안전하게 호흡할 수 있도록 압축 공기를 공급하는 장비입니다.'
    },
    {
        id: 'evac-ladder',
        category: 'evac',
        title: '피난 사다리 (Escape Ladder)',
        image: 'https://images.unsplash.com/photo-1590486803833-ffc6f68d88e5?auto=format&fit=crop&q=80&w=1000',
        summary: '비상 탈출용 접이식 사다리',
        desc: '화재 시 계단을 이용할 수 없는 상황에서 창문을 통해 대피할 때 사용합니다.'
    },
    {
        id: 'evac-wang-gang',
        category: 'evac',
        title: '완강기 (Descent Control Device)',
        image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=1000',
        summary: '고층 빌딩 하강 대피 기구',
        desc: '사용자의 몸무게에 의해 일정한 속도로 내려올 수 있는 피난 기구입니다.',
        specs: { weight: '25kg ~ 150kg', length: 'Up to 10 Floors' }
    },
    {
        id: 'evac-mat',
        category: 'evac',
        title: '공기 안전매트 (Air Mat)',
        image: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&q=80&w=1000',
        summary: '투신 대피용 대형 에어 쿠션',
        desc: '추락 시 충격을 흡수하여 부상을 방지하는 대형 공기 주입식 매트입니다.',
        specs: { size: '5m x 5m / 7m x 7m', recovery: 'Immediate after impact' }
    },

    // --- 방염류 (Flame Retardant) ---
    {
        id: 'flame-spray',
        category: 'flame',
        title: '침투성 방염액 (Chemical)',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000',
        summary: '목재 및 섬유 화재 확산 방지제',
        desc: '가연물 표면에 도포하여 화재 시 연소를 지연시키고 불길이 번지는 것을 막아주는 약제입니다.'
    },
    {
        id: 'flame-fabric',
        category: 'flame',
        title: '방염 커튼 (Fabric)',
        image: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&q=80&w=1000',
        summary: 'KFI 인증 특수 방염 원단',
        desc: '화재 발생 시 불이 잘 붙지 않고 유독가스 배출이 적은 특수 처리 원단입니다.'
    },
    {
        id: 'flame-wall',
        category: 'flame',
        title: '방염 벽지 (Flame Retardant Wallpaper)',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1000',
        summary: '실내 인테리어용 방염 처리 벽지',
        desc: '종이나 실크 벽지 표면에 방염 처리를 하여 화재 시 불길의 확산을 억제합니다.',
        specs: { type: 'Silk / Paper / Fabric' }
    },
    {
        id: 'flame-wood',
        category: 'flame',
        title: '방염 합판 (Flame Retardant Plywood)',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000',
        summary: '건축 내장재용 방염 가공 목재',
        desc: '제조 과정에서 방염 처리가 된 합판으로 주로 실내 장식물 설치에 사용됩니다.',
        specs: { thickness: '4.8mm ~ 18mm', grade: 'KFI Standard Certified' }
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
            card.style.animationDelay = `${index * 0.02}s`;
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
        detailImg.onerror = () => { detailImg.src = 'https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=1000'; };
        
        document.getElementById('detail-desc').textContent = item.desc || '상세 정보 준비 중입니다.';
        document.getElementById('working-principle').textContent = item.working || '기술 기준에 따라 작동합니다.';
        
        const list = document.getElementById('component-list');
        list.innerHTML = '';
        const comps = item.components || ['KFI 기술 기준 준수'];
        comps.forEach(comp => {
            const li = document.createElement('li');
            li.innerHTML = `<i data-lucide="check-circle-2" style="width:14px; height:14px; color:var(--accent); margin-right:6px; display:inline-block; vertical-align:middle;"></i> ${comp}`;
            list.appendChild(li);
        });

        let infoContent = document.querySelector('.info-content');
        const dynamicSections = infoContent.querySelectorAll('.dynamic-section');
        dynamicSections.forEach(s => s.remove());

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
