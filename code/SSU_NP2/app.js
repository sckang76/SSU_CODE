const equipmentData = [
    // --- 밸브류 (Valve) ---
    {
        id: 'alarm-valve',
        category: 'valve',
        title: '알람 체크 밸브 (Alarm Check Valve)',
        image: 'assets/alarm_valve.png',
        summary: '습식 스프링클러 설비의 유수 검지 장치',
        desc: '습식 스프링클러 설비의 핵심 구성 요소로, 화재 발생 시 물의 흐름을 검지하고 경보를 발령하는 역할을 합니다. 신뢰성이 높고 구조가 비교적 간단하여 가장 널리 사용됩니다.',
        components: ['클래퍼 (Clapper)', '시트 (Seat)', '압력스위치', '리타딩 챔버', '드레인 밸브', '시험 밸브'],
        working: '헤드가 열려 2차측 압력이 낮아지면, 1차측 가압수가 클래퍼를 밀어 올리며 유입됩니다. 이때 클래퍼 하단의 구멍을 통해 리타딩 챔버로 물이 들어가 압력스위치를 작동시켜 수신기에 화재 신호를 보냅니다.'
    },
    {
        id: 'preaction-valve',
        category: 'valve',
        title: '준비작동식 밸브 (Pre-action Valve)',
        image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7bc3?auto=format&fit=crop&q=80&w=1000', // Placeholder for Preaction
        summary: '이중 안전 장치를 갖춘 유수 검지 장치',
        desc: '동파 우려가 있거나 수손 피해가 우려되는 장소(전산실, 도서관 등)에 설치됩니다. 감지기와 헤드 개방이 모두 필요하거나 감지기 우선 작동 방식으로 운영됩니다.',
        components: ['솔레노이드 밸브', '수동 기동 밸브', '다이어프램', '압력 게이지', '슈퍼비조리 판넬(SVP)'],
        working: '교차회로 방식의 감지기가 작동하면 솔레노이드 밸브가 개방되어 챔버 내 압력이 배출됩니다. 이로 인해 다이어프램이 열리며 1차측 가압수가 2차측 배관으로 유입되어 헤드 직전까지 도달합니다.'
    },
    {
        id: 'deluge-valve',
        category: 'valve',
        title: '일제개방 밸브 (Deluge Valve)',
        image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1000',
        summary: '개방형 헤드 설비에 사용되는 대량 방수 밸브',
        desc: '무대부, 특수 가연물 저장소 등 대규모 화재 확산이 우려되는 곳에 설치됩니다. 폐쇄형 헤드가 아닌 개방형 헤드를 사용합니다.',
        components: ['가압 개방 장치', '외부 바이패스 라인', '드레인 밸브', '긴급 해제 장치'],
        working: '화재 감지기 신호 또는 수동 기동에 의해 밸브가 열리면, 배관에 연결된 모든 개방형 헤드에서 동시에 소화수가 쏟아져 나와 일제히 소화를 수행합니다.'
    },

    // --- 펌프류 (Pump) ---
    {
        id: 'fire-pump',
        category: 'pump',
        title: '소방 주펌프 (Main Fire Pump)',
        image: 'assets/fire_pump.png',
        summary: '소방 시스템의 수압과 유량을 공급하는 심장',
        desc: '건물 전체 소방 시설에 필요한 압력과 유량을 공급하는 심장 역할을 하는 설비입니다. 주로 전동기 구동 방식의 원심 펌프가 사용됩니다.',
        components: ['임펠러', '케이싱', '전동기 (Motor)', '커플링', '제어반 (MCC)', '체크 밸브', '릴리프 밸브'],
        working: '기동용 수압개폐장치(압력챔버)의 압력 저하를 감지하여 제어반에서 전동기를 기동시킵니다. 임펠러의 회전력을 이용하여 수원을 가압하고 배관을 통해 말단 설비까지 물을 송수합니다.'
    },
    {
        id: 'jockey-pump',
        category: 'pump',
        title: '충압 펌프 (Jockey Pump)',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000',
        summary: '배관 내 압력을 상시 유지하는 보조 펌프',
        desc: '배관의 미세한 누수 등으로 인한 압력 저하 시 주펌프의 잦은 기동을 방지하기 위해 설치하는 소용량 펌프입니다.',
        components: ['소용량 모터', '다단 원심 펌프', '압력 스위치 연결부'],
        working: '배관 압력이 설정된 하한치까지 떨어지면 먼저 기동하여 압력을 보충합니다. 주펌프보다 기동 압력을 높게 설정하여 평상시 압력 유지는 충압펌프가 담당하게 합니다.'
    },

    // --- 경보설비 (Alarm) ---
    {
        id: 'fire-panel',
        category: 'alarm',
        title: 'P형/R형 수신기 (Fire Alarm Control Panel)',
        image: 'assets/fire_panel.png',
        summary: '전체 시스템의 상태를 감시하고 제어하는 두뇌',
        desc: '감지기나 발신기로부터 화재 신호를 수신하여 경보를 발령하고, 소화 설비(펌프, 댐퍼 등)를 자동으로 기동시키는 중앙 제어 장치입니다.',
        components: ['CPU/메인보드', '표시부 (LCD)', '조작 스위치', '예비전원 (배터리)', '중계기 통신 라인'],
        working: '감지기 작동 시 고유 주소(R형) 또는 구역(P형)을 확인하여 화재 발생 위치를 표시합니다. 동시에 연동된 사이렌을 울리고, 연동 제어를 수행합니다.'
    },
    {
        id: 'detector',
        category: 'alarm',
        title: '광전식 연기감지기 (Photoelectric Smoke Detector)',
        image: 'assets/detector.png',
        summary: '연기 입자를 감지하여 화재 초기 신호 발생',
        desc: '암실 내의 적외선 발광부와 수광부를 이용하여, 연기 입자에 의한 산란광을 감지하는 방식의 화재 감지기입니다.',
        components: ['산란실 (Chamber)', '발광 다이오드', '수광 소자', '차폐망', '작동 표시등 (LED)'],
        working: '연기가 감지기 내부의 암실로 유입되면, 발광부의 빛이 연기 입자에 부딪혀 산란됩니다. 이 산란된 빛이 수광 소자에 도달하여 화재 신호를 전송합니다.'
    },
    {
        id: 'heat-detector',
        category: 'alarm',
        title: '정온식 감지기 (Fixed Temp Detector)',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
        summary: '일정 온도 이상 시 작동하는 열감지기',
        desc: '주방, 보일러실 등 평상시 온도 변화가 큰 장소에 설치하며, 주위 온도가 설정된 온도 이상이 되었을 때 신호를 보냅니다.',
        components: ['바이메탈', '반도체 소자', '외함'],
        working: '내부의 바이메탈이 열에 의해 팽창하여 접점이 붙거나, 반도체 소자의 저항값이 변하는 것을 감지하여 화재 신호를 발생시킵니다.'
    },
    {
        id: 'call-point',
        category: 'alarm',
        title: '화재 발신기 (Manual Call Point)',
        image: 'assets/call_point.png',
        summary: '사람이 수동으로 화재를 알리는 장치',
        desc: '화재를 발견한 사람이 수동으로 버튼을 눌러 수신기에 화재 신호를 보낼 때 사용되는 장치입니다.',
        components: ['누름 버튼', '응답 램프', '전화 잭', '보호판'],
        working: '보호판을 누르고 내부의 스위치를 작동시키면 즉시 수신기에 화재 신호가 전달됩니다. 수신기의 응답 신호가 오면 램프가 점등됩니다.'
    },

    // --- 헤드/기타 (Head/Etc) ---
    {
        id: 'sprinkler',
        category: 'head',
        title: '스프링클러 헤드 (Sprinkler Head)',
        image: 'assets/sprinkler.png',
        summary: '열을 감지하여 자동으로 살수하는 종단 장치',
        desc: '화재 열기를 직접 감지하여 설정 온도 이상이 되면 자동으로 개방되어 물을 살수하는 종단 장치입니다.',
        components: ['프레임', '디플렉터 (Deflector)', '감열체 (Glass Bulb)', '오리피스', '캡 (Cap)'],
        working: '화재 시 열에 의해 유리 벌브 내의 액체가 팽창하여 벌브가 파괴됩니다. 캡이 튕겨져 나가면서 물이 디플렉터에 부딪혀 넓게 분사됩니다.'
    },
    {
        id: 'fire-damper',
        category: 'head',
        title: '방화 댐퍼 (Fire Damper)',
        image: 'https://images.unsplash.com/photo-1590486803833-ffc6f68d88e5?auto=format&fit=crop&q=80&w=1000',
        summary: '덕트를 통한 화재 확산 방지 장치',
        desc: '건물의 방화구획을 관통하는 덕트에 설치되어 화재 시 연기와 불꽃의 확산을 차단합니다.',
        components: ['댐퍼 날개', '퓨즈/모터 구동부', '프레임', '복귀 레버'],
        working: '연기 감지기 신호 또는 고온에 의한 퓨즈 용단 시 날개가 닫혀 덕트를 폐쇄합니다. 이를 통해 다른 구역으로의 화재 전이를 방지합니다.'
    },
    {
        id: 'exit-sign',
        category: 'head',
        title: '피난구 유도등 (Exit Sign)',
        image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1000',
        summary: '비상 시 피난 방향을 안내하는 등기구',
        desc: '정전 시에도 예비전원으로 점등되어 피난구의 위치나 피난 방향을 안내하는 안전 시설입니다.',
        components: ['LED 패널', '상시/비상 전원 회로', '예비전원 배터리', '도광판'],
        working: '평상시에는 상용 전원으로 점등되며 배터리를 충전합니다. 화재로 인해 정전이 발생하면 내장된 배터리로 자동 전환되어 20분(또는 60분) 이상 점등을 유지합니다.'
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
                </div>
                <div class="card-body">
                    <span class="card-tag">${item.category}</span>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-summary">${item.summary}</p>
                </div>
            `;
            card.onclick = () => showModal(item);
            grid.appendChild(card);
        });
    }

    function showModal(item) {
        document.getElementById('modal-title').textContent = item.title;
        const detailImg = document.getElementById('detail-image');
        detailImg.src = item.image;
        detailImg.onerror = () => { detailImg.src = 'https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=1000'; };
        
        document.getElementById('detail-desc').textContent = item.desc;
        document.getElementById('working-principle').textContent = item.working;
        
        const list = document.getElementById('component-list');
        list.innerHTML = '';
        item.components.forEach(comp => {
            const li = document.createElement('li');
            li.textContent = comp;
            list.appendChild(li);
        });

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
