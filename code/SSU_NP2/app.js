const equipmentData = [
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
        id: 'sprinkler',
        category: 'head',
        title: '스프링클러 헤드 (Sprinkler Head)',
        image: 'assets/sprinkler.png',
        summary: '열을 감지하여 자동으로 살수하는 종단 장치',
        desc: '화재 열기를 직접 감지하여 설정 온도 이상이 되면 자동으로 개방되어 물을 살수하는 종단 장치입니다.',
        components: ['프레임', '디플렉터 (Deflector)', '감열체 (Glass Bulb)', '오리피스', '캡 (Cap)'],
        working: '화재 시 열에 의해 유리 벌브 내의 특수 액체가 팽창하여 벌브가 파괴됩니다. 지탱하고 있던 캡이 수압에 의해 튕겨져 나가면서 고압의 물이 디플렉터에 부딪혀 우산 모양으로 넓게 분사됩니다.'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
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
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <div class="card-visual">
                    <img src="${item.image}" alt="${item.title}">
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
        document.getElementById('detail-image').src = item.image;
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
        lucide.createIcons(); // Re-init icons in modal
    }

    // Step Nav (Filter) Logic
    stepDots.forEach(dot => {
        dot.addEventListener('click', () => {
            stepDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            renderCards(dot.dataset.filter);
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    document.querySelector('.close-btn').onclick = closeModal;
    document.querySelector('.modal-overlay').onclick = closeModal;

    // ESC key to close modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    renderCards();
});
