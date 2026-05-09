// SSU_NP2 - Technical Handbook Data (Synchronized with data_basic.xlsx & data.json)
const equipmentData = [
    { id: '001', category: 'mech', title: '독립배관방식', summary: '가스계 소화설비의 구역별 독립 설치 방식', desc: '하나의 건물이 여러 개의 방호구역으로 나뉘어 있을 때, 각 구역을 담당하는 소화약제 저장 용기와 배관을 각 구역별로 완전히 분리하여 독립적으로 설치하는 방식입니다.', components: ['저장용기', '독립배관', '분사헤드'], mechanism: '각 방호구역마다 전용 소화 설비를 배치하여 신뢰성을 높임', specs: {'설치방식': '구역별 독립'}, law: 'NFPC 101' },
    { id: '002', category: 'mech', title: '압력배출장치', summary: '가스 방출 시 과압 방지 시설', desc: '소화약제가 방출될 때 발생하는 과압이 건축 구조물을 파손시키는 것을 방지하기 위해, 초과 압력을 안전하게 외부로 내보내는 장치입니다.', components: ['플랩댐퍼', '배출구'], mechanism: '일정 압력 이상에서 자동으로 개방되어 압력 해소', specs: {'용도': '가스계 소화설비'}, law: 'NFPC 101' },
    { id: '004', category: 'alarm', title: '가스누설경보기', summary: '가연성 가스 및 CO 누설 감지', desc: '가연성 가스(LNG, LPG 등) 또는 일산화탄소(CO)가 누설되는 것을 탐지하여 음향과 표시등으로 경보해주는 장치입니다.', components: ['센서', '경보부', '표시등'], mechanism: '가스 농도 변화를 전기적 신호로 변환하여 감지', specs: {'대상가스': 'LNG, LPG, CO'}, law: 'KFI 형식승인' },
    { id: '006', category: 'mech', title: '가압송수장치', summary: '소방시설의 핵심 송수 시스템', desc: '소방시설에서 물을 필요한 압력과 유량으로 이송하여 화재를 진압하는 데 사용하는 핵심 장치입니다. 주로 소화 펌프와 그 부속 설비를 일컫습니다.', components: ['주펌프', '충압펌프', '제어반'], mechanism: '원심력을 이용한 유체 가압 및 이송', specs: {'유형': '펌프 방식, 고가수조 방식 등'}, law: 'NFPC 102/103' },
    { id: '009', category: 'alarm', title: '감시제어반', summary: '소방시설 통합 감시 및 제어 장치', desc: '소방시설의 작동 상태를 한곳에서 통합적으로 감시하고, 화재 발생 시 각종 설비를 수동 또는 자동으로 제어하는 핵심 장치입니다.', components: ['CPU', '표시창', '제어 스위치'], mechanism: '화재 신호 수신 및 설비 연동 로직 수행', specs: {'기능': '통합 감시, 연동 제어'}, law: 'NFPC 203' },
    { id: '010', category: 'mech', title: '감압밸브', summary: '배관 내 과압 조절 밸브', desc: '배관 내 유체의 높은 1차 압력을 사용 목적에 맞는 낮은 2차 압력으로 자동으로 조절하여 유지시켜 주는 밸브입니다.', components: ['다이아프램', '조절 스프링'], mechanism: '스프링 하중과 유체 압력의 균형으로 압력 조절', specs: {'유형': '직동식, 파일럿식'}, law: 'NFPC 102' },
    { id: '011', category: 'ext', title: '강화액 소화약제', summary: '동결 방지 및 소화 성능 강화 액체', desc: '물에 탄산칼륨 등 무기염류를 첨가하여 만든 소화약제로, 낮은 온도에서도 얼지 않고 소화 성능이 뛰어납니다.', components: ['탄산칼륨 수용액'], mechanism: '냉각 효과 및 화학적 촉매 억제', specs: {'특징': '부동성, 우수한 소화력'}, law: 'KFI 형식승인' },
    { id: '012', category: 'evac', title: '거실제연설비', summary: '실내 연기 확산 방지 및 배출 설비', desc: '화재 시 발생하는 연기가 거실로 확산되는 것을 막아 피난로를 확보하고 소방대원의 활동을 돕는 설비입니다.', components: ['배출풍도', '유입풍도', '제연휀'], mechanism: '연기 강제 배출 및 신선 외기 공급', specs: {'목적': '인명 안전 확보'}, law: 'NFPC 401' },
    { id: '019', category: 'alarm', title: '경계구역', summary: '화재 위치 파악을 위한 구획 단위', desc: '화재 발생 시 위치를 정확히 특정할 수 있도록 법적으로 나누어 놓은 최소 구획 단위입니다.', components: ['구획 구역'], mechanism: '수신기에서 각 구역별 화재 신호 표시', specs: {'기준': '600m² 이하, 한 변 50m 이하'}, law: 'NFPC 203' },
    { id: '021', category: 'ext', title: '고정포 방출설비', summary: '위험물 탱크용 고정식 포 소화설비', desc: '화재 시 포 수용액을 배관을 통해 방출구로 방사하여 유류 화재를 진압하는 설비입니다.', components: ['포탱크', '혼합장치', '방출구'], mechanism: '유류 표면을 포(거품)로 덮어 질식 소화', specs: {'유형': 'I, II, III, IV, 특형'}, law: 'NFPC 105' },
    { id: '024', category: 'alarm', title: '공기 흡입형 감지기', summary: '초미세 연기 입자 조기 감지', desc: '공기를 능동적으로 흡입하여 레이저 센서로 분석함으로써 화재를 극초기에 감지하는 고감도 감지기입니다.', components: ['흡입 파이프', '중앙 분석부'], mechanism: '레이저 산란 방식 분석', specs: {'특징': '초고감도, 오작동 저감'}, law: 'KFI 형식승인' },
    { id: '026', category: 'alarm', title: '광전식 감지기', summary: '빛의 산란을 이용한 연기 감지', desc: '연기 입자가 빛을 산란시키는 현상을 이용하여 화재를 감지하는 장치입니다.', components: ['광원', '수광부'], mechanism: '산란광에 의한 기전력 발생 감지', specs: {'유형': '스포트형, 분리형'}, law: 'NFPC 203' },
    { id: '032', category: 'mech', title: '기동용 수압개폐장치', summary: '펌프 자동 기동용 압력 감지기', desc: '배관 내 압력 변화를 감지하여 소화 펌프를 자동으로 기동하거나 정지시키는 장치입니다.', components: ['압력챔버', '압력스위치'], mechanism: '설정 압력 저하 시 접점 작동', specs: {'용량': '100L'}, law: 'NFPC 기준' },
    { id: '035', category: 'flame', title: '내진/면진/제진', summary: '지진 대응 소방 시설 보호 기술', desc: '지진 발생 시 소방 시설의 구조적 안정성을 유지하기 위한 기술 전략입니다.', components: ['버팀대', '댐퍼', '면진장치'], mechanism: '지진 에너지 저항, 차단 또는 흡수', specs: {'기준': '소방시설 내진설계기준'}, law: '소방청 고시' },
    { id: '039', category: 'alarm', title: '누전경보기', summary: '전기 누설 감지 및 경보', desc: '전기 설비의 누전 현상을 조기에 탐지하여 감전 및 화재를 예방하는 시설입니다.', components: ['변류기', '수신부'], mechanism: '영상 변류기를 이용한 지락 전류 검출', specs: {'유형': '1급, 2급'}, law: 'NFPC 205' },
    { id: '045', category: 'alarm', title: '단독경보형감지기', summary: '주택용 독립형 화재 경보기', desc: '자체적으로 화재를 감지하고 경보음을 내어 거주자에게 알리는 장치입니다.', components: ['감지부', '배터리', '부저'], mechanism: '연기/열 감지 시 즉시 경보 발령', specs: {'특징': '배터리 구동, 간편 설치'}, law: '소방시설법' },
    { id: '054', category: 'mech', title: '드렌처헤드', summary: '연소 확산 방지용 수막 형성 헤드', desc: '화재 시 물을 분사하여 수막을 형성함으로써 화재의 확산을 차단하는 헤드입니다.', components: ['프레임', '노즐'], mechanism: '개구부 주위에 수막(Water Curtain) 형성', specs: {'용도': '방화구획 보조'}, law: 'NFPC 103' },
    { id: '055', category: 'mech', title: '라지드롭형 헤드', summary: '대형 물방울 생성 특수 헤드', desc: '표준형보다 크고 무거운 물방울을 생성하여 화재 성장 속도가 빠른 곳에 적합한 헤드입니다.', components: ['대구경 오리피스'], mechanism: '강력한 관통력으로 화점 도달 성능 향상', specs: {'특징': '높은 K-Factor'}, law: 'KFI 형식승인' },
    { id: '058', category: 'mech', title: '릴리프/안전밸브', summary: '시스템 과압 방지 안전 장치', desc: '내부 압력이 설정치를 초과할 때 이를 방출하여 설비 파손을 막는 밸브입니다.', components: ['밸브시트', '스프링'], mechanism: '설정 압력에서 밸브 자동 개방', specs: {'용도': '펌프 체절운전 보호 등'}, law: 'NFPC 기준' },
    { id: '061', category: 'evac', title: '무선통신보조설비', summary: '소방대원용 무전기 난청 해소 설비', desc: '지하 등 전파가 잘 닿지 않는 곳에서 소방대원의 무선 통신을 돕는 설비입니다.', components: ['누설동축케이블', '안테나'], mechanism: '전파 중계 및 증폭', specs: {'대상': '지하층, 고층건물'}, law: 'NFPC 505' },
    { id: '064', category: 'mech', title: '물분무헤드', summary: '미세 물방울 분사 소화 헤드', desc: '물을 미세한 입자로 분사하여 냉각 및 질식 효과를 극대화하는 헤드입니다.', components: ['분무 노즐'], mechanism: '미세 입자의 표면적 확대로 기화열 흡수', specs: {'용도': '유류탱크, 변전실'}, law: 'NFPC 104' },
    { id: '066', category: 'ext', title: '미분무소화설비', summary: '초미세 물안개 소화 시스템', desc: '물을 초미세 입자로 분무하여 적은 수량으로 화재를 제압하는 첨단 설비입니다.', components: ['고압펌프', '미분무헤드'], mechanism: '질식, 냉각 및 산소 차단', specs: {'장점': '수손 피해 최소화'}, law: 'NFPC 104A' },
    { id: '075', category: 'flame', title: '방염물품', summary: '연소 확산 지연 처리 물품', desc: '쉽게 타지 않도록 처리된 커튼, 벽지 등 초기 화재 확산을 막는 물품입니다.', components: ['방염 처리 자재'], mechanism: '자기 소화성 및 탄화막 형성', specs: {'기준': 'KFI 방염 성능 기준'}, law: '소방시설법' },
    { id: '081', category: 'flame', title: '방화댐퍼', summary: '덕트 관통부 화재 확산 방지 장치', desc: '덕트 내부를 통해 불꽃이나 연기가 번지는 것을 차단하는 장치입니다.', components: ['댐퍼날개', '퓨즈/모터'], mechanism: '열/연기 감지 시 자동 폐쇄', specs: {'재질': '철재'}, law: '건축법' },
    { id: '082', category: 'flame', title: '방화문', summary: '구획 간 화재 전파 차단문', desc: '일정 시간 동안 화염과 연기를 견디며 대피로를 보호하는 문입니다.', components: ['문틀', '문짝', '도어클로저'], mechanism: '내화 구조에 의한 열 차단', specs: {'등급': '방화(60분+), 방화(60분)'}, law: '건축법' },
    { id: '083', category: 'flame', title: '방화셔터', summary: '대형 개구부용 자동 차단 셔터', desc: '방화문 설치가 곤란한 넓은 통로에 설치하여 화재 시 자동으로 하강합니다.', components: ['스크린', '권양기'], mechanism: '연기/열 감지기 연동 하강', specs: {'유형': '일체형, 분리형'}, law: '건축법' },
    { id: '086', category: 'evac', title: '배연설비 (배연창)', summary: '연기 배출용 자동 개폐창', desc: '화재 시 창문을 자동으로 열어 실내 연기를 밖으로 배출하는 설비입니다.', components: ['개폐구동장치', '창문'], mechanism: '수신기 신호 연동 개방', specs: {'용도': '연기 질식 방지'}, law: '건축법' },
    { id: '093', category: 'ext', title: '분말소화약제', summary: '고성능 화학 분말 소화제', desc: '미세한 화학 분말로 화재를 급격히 진압하는 약제입니다.', components: ['제1인산암모늄 등'], mechanism: '화학적 부촉매 효과 및 질식', specs: {'유형': 'ABC분말 등'}, law: 'KFI 형식승인' },
    { id: '095', category: 'alarm', title: '불꽃감지기', summary: '화염 파장 직접 감지기', desc: '불꽃에서 나오는 특정 파장의 빛을 감지하여 즉시 반응하는 장치입니다.', components: ['UV/IR 센서'], mechanism: '자외선/적외선 파장 분석', specs: {'장점': '빠른 응답성'}, law: 'KFI 형식승인' },
    { id: '102', category: 'alarm', title: '비상방송설비', summary: '피난 안내 음성 통보 설비', desc: '화재 사실을 음성으로 안내하여 안전한 대피를 유도하는 설비입니다.', components: ['앰프', '스피커'], mechanism: '화재 신호 수신 시 방송 송출', specs: {'기능': '우선경보방식 등'}, law: 'NFPC 202' },
    { id: '103', category: 'evac', title: '비상용승강기', summary: '소방관 구조 활동용 엘리베이터', desc: '화재 시 소방대원이 원활하게 작전할 수 있도록 설계된 전용 승강기입니다.', components: ['승강기카', '비상전원'], mechanism: '비상 운전 모드 작동', specs: {'특징': '내화 구조, 방수 성능'}, law: '건축법' },
    { id: '105', category: 'evac', title: '비상조명등', summary: '정전 시 대피로 조명 설비', desc: '정전 시에도 피난 통로를 밝혀 대피를 돕는 조명 장치입니다.', components: ['조명등', '축전지'], mechanism: '상용전원 차단 시 배터리 점등', specs: {'유지시간': '20분 이상'}, law: 'NFPC 304' },
    { id: '106', category: 'flame', title: '비상콘센트', summary: '소방관용 전력 공급 장치', desc: '소방대원이 화재 진압 장비의 전원을 쓰기 위해 설치하는 콘센트입니다.', components: ['접지형 콘센트'], mechanism: '안정적인 전력 공급', specs: {'전압': '단상 220V'}, law: 'NFPC 502' },
    { id: '113', category: 'mech', title: '성능시험배관', summary: '펌프 성능 측정용 배관', desc: '소방 펌프의 유량과 압력이 기준에 맞는지 테스트하기 위한 배관입니다.', components: ['유량계', '개폐밸브'], mechanism: '실제 토출량 측정 및 점검', specs: {'용도': '펌프 성능 관리'}, law: 'NFPC 기준' },
    { id: '122', category: 'flame', title: '소방용품 (형식승인)', summary: '법정 소방 제품 인증 제도', desc: '국민의 생명과 직결된 소방 제품이 일정 성능을 갖췄는지 인증하는 제도입니다.', components: ['인증 필증'], mechanism: '엄격한 품질 및 성능 테스트', specs: {'관리기관': 'KFI'}, law: '소방시설법' },
    { id: '131', category: 'alarm', title: '수신기 (P형/R형)', summary: '소방 시스템 통합 제어반', desc: '감지기 신호를 받아 설비를 제어하는 시스템의 두뇌입니다.', components: ['제어부', '표시부'], mechanism: '입력 신호 분석 및 출력 연동', specs: {'유형': 'P형, R형, GR형'}, law: 'NFPC 203' },
    { id: '136', category: 'alarm', title: '수동조작함 (SVP)', summary: '가스계 소화설비 수동 기동 장치', desc: '가스계 소화설비 구역에 설치하여 사람이 직접 기동할 수 있게 하는 함입니다.', components: ['기동 스위치', '비상 정지'], mechanism: '수동 조작 시 솔레노이드 작동', specs: {'용도': '가스계 설비 연동'}, law: 'NFPC 101' },
    { id: '137', category: 'mech', title: '스프링클러 헤드', summary: '자동 화재 진압 살수구', desc: '열을 감지하여 자동으로 물을 살수하는 스프링클러의 핵심부입니다.', components: ['디플렉터', '감열체'], mechanism: '열에 의한 개방 및 비산 살수', specs: {'유형': '상향형, 하향형, 측벽형'}, law: 'KFI 형식승인' },
    { id: '141', category: 'mech', title: '신축배관 (헤드 자바라)', summary: '유연한 스프링클러 연결 배관', desc: '천장 마감에 맞춰 헤드의 위치를 쉽게 조절할 수 있는 유연한 관입니다.', components: ['스테인리스 주름관'], mechanism: '진동 흡수 및 시공 편의성 제공', specs: {'재질': 'SUS'}, law: 'KFI 성능인증' },
    { id: '143', category: 'alarm', title: '아날로그 감지기', summary: '화재 데이터 연속 전송 감지기', desc: '단순 On/Off 신호가 아닌 온도/연기 농도값을 실시간 전송하는 지능형 감지기입니다.', components: ['정밀 센서', '통신칩'], mechanism: '농도 변화 추이 분석 및 판단', specs: {'장점': '오작동 방지, 위치 파악'}, law: 'KFI 형식승인' },
    { id: '147', category: 'mech', title: '에스커쳔 (헤드왕)', summary: '헤드 설치부 천장 마감재', desc: '스프링클러 헤드 설치 시 천장의 구멍을 깔끔하게 가려주는 커버입니다.', components: ['마감 원판'], mechanism: '심미적 마감 및 틈새 차단', specs: {'유형': '고정식, 신축식'}, law: '건축/소방 규격' },
    { id: '159', category: 'mech', title: '옥내소화전', summary: '건물 내 초기 진압 설비', desc: '관계인이 호스를 전개하여 직접 화재를 끌 수 있는 설비입니다.', components: ['호스', '관창', '앵글밸브'], mechanism: '수압에 의한 물 방사', specs: {'방수량': '130L/min 이상'}, law: 'NFPC 102' },
    { id: '160', category: 'mech', title: '옥외소화전', summary: '건물 외부 대형 진압 설비', desc: '건물 밖에서 소방대원이 대형 화재를 진압할 때 사용하는 설비입니다.', components: ['소화전 본체', '호스박스'], mechanism: '상수도 직결 또는 펌프 송수', specs: {'방수량': '350L/min 이상'}, law: 'NFPC 109' }
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
            card.style.animationDelay = `${index * 0.02}s`;
            
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
                    <span class="view-btn">상세 사양 <i data-lucide="arrow-right" style="width:12px; height:12px;"></i></span>
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

    renderCards();
});
