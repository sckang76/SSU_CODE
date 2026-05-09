const equipmentData = [
    // --- 1. 소화기구류 (Extinguishers) ---
    { id: 'EXT-01', category: 'ext', title: 'ABC 분말 소화기', summary: '가장 널리 사용되는 범용 소화기', desc: 'A(일반), B(유류), C(전기) 화재에 모두 사용 가능한 소화기로, 제1인산암모늄 분말을 약제로 사용합니다.', components: ['용기', '지시압력계', '안전핀', '호스'], mechanism: '가압된 질소가스로 약제를 방출하여 질식 및 부촉매 소화', specs: {'약제': '제1인산암모늄', '충전압': '0.7~0.98MPa'}, law: 'NFPC 101' },
    { id: 'EXT-02', category: 'ext', title: 'CO2 소화기', summary: '잔여물이 남지 않는 고압 가스 소화기', desc: '전산실, 통신실 등 수손 피해가 우려되는 곳에 사용합니다.', components: ['고압용기', '방출혼', '안전밸브'], mechanism: '이산화탄소의 질식 및 냉각 효과', specs: {'약제': '액화 이산화탄소', '충전압': '5.9MPa'}, law: 'NFPC 101' },
    { id: 'EXT-03', category: 'ext', title: '주거용 주방자동소화장치', summary: '가정용 주방 화재 자동 진압 장치', desc: '아파트 주방 후드에 설치되어 가스 누출 감지, 차단 및 소화를 자동으로 수행합니다.', components: ['수신부', '감지부', '차단장치', '약제용기'], mechanism: '열 감지 시 가스 차단 및 약제 자동 방출', specs: {'설치대상': '아파트, 오피스텔 주방'}, law: '소방시설법' },
    { id: 'EXT-04', category: 'ext', title: '자동확산 소화기', summary: '보일러실 등 소규모 공간 자동 소화', desc: '화재 열을 감지하여 자동으로 약제를 살포하는 무인 소화 장치입니다.', components: ['용기', '감열헤드', '확산반사판'], mechanism: '열에 의한 유리벌브 파손 시 약제 방출', specs: {'작동온도': '72도'}, law: 'KFI 인증' },
    { id: 'EXT-05', category: 'ext', title: '캐비닛형 자동소화장치', summary: '전산실용 패키지형 소화 시스템', desc: '별도의 배관 공사 없이 캐비닛 안에 약제와 제어부가 포함된 형태입니다.', components: ['캐비닛', '감지기', '약제용기', '방출구'], mechanism: '교차회로 방식 감지 후 가스 방출', specs: {'약제': '청정소화약제 등'}, law: 'NFPC 101' },
    { id: 'EXT-06', category: 'ext', title: '에어로졸식 소화용구', summary: '스프레이 방식의 간편 소화 도구', desc: '소규모 화재 초기에 간편하게 뿌려서 사용하는 에어로졸 형태의 소화기구입니다.', components: ['에어로졸 캔', '노즐'], mechanism: '미세 분말 또는 액상 약제 살포', specs: {'형식': '에어로졸'}, law: '간이소화용구 기준' },
    { id: 'EXT-07', category: 'ext', title: '고체 에어로졸 자동소화장치', summary: '고체 화합물 연소로 소화 성분 생성', desc: '전기 판넬 내부 등에 설치되어 고체 화합물이 연소하며 미세 입자를 생성하여 소화합니다.', components: ['에어로졸 발생기', '감지부'], mechanism: '화학적 소화 입자에 의한 라디칼 차단', specs: {'용도': '배전반, 제어반'}, law: 'KFI 성능인증' },

    // --- 2. 경보설비류 (Alarm) ---
    { id: 'ALM-01', category: 'alarm', title: 'P형 수신기', summary: '범용 화재 신호 중앙 제어반', desc: '감지기의 접점 신호를 직접 수신하여 화재 발생을 알리고 설비를 제어합니다.', components: ['표시등', '음향장치', '예비전원'], mechanism: '회로별 전압 변화 감지', specs: {'회로수': '5, 10, 20회로 등'}, law: 'NFPC 203' },
    { id: 'ALM-02', category: 'alarm', title: 'R형 수신기', summary: '디지털 통신 방식 지능형 제어반', desc: '중계기를 통해 통신 신호로 화재 정보를 주고받으며, 대규모 건물에 적합합니다.', components: ['CPU', 'LCD패널', '통신모듈'], mechanism: '디지털 주소(Address) 방식 데이터 통신', specs: {'통신규격': 'RS-485 등'}, law: 'NFPC 203' },
    { id: 'ALM-03', category: 'alarm', title: '차동식 스포트형 감지기', summary: '급격한 온도 상승 감지', desc: '사무실, 거실 등에 설치되며 주위 온도가 일정 비율 이상 상승할 때 작동합니다.', components: ['다이어프램', '접점', '리크구멍'], mechanism: '공기 팽창에 의한 접점 폐쇄', specs: {'종류': '1종, 2종'}, law: 'KFI 형식승인' },
    { id: 'ALM-04', category: 'alarm', title: '정온식 스포트형 감지기', summary: '일정 온도 도달 시 감지', desc: '주방, 보일러실 등 평소 온도가 높은 곳에 설치되어 설정 온도에서 작동합니다.', components: ['바이메탈', '감열소자'], mechanism: '금속 팽창 또는 열에 의한 접점 작동', specs: {'작동온도': '60~150도'}, law: 'KFI 형식승인' },
    { id: 'ALM-05', category: 'alarm', title: '광전식 스포트형 감지기', summary: '연기 입자에 의한 빛의 산란 감지', desc: '복도, 계단 등에 설치되어 화재 초기 발생하는 연기를 감지합니다.', components: ['광전소자', '챔버'], mechanism: '빛의 산란 현상 이용', specs: {'방식': '산란광 방식'}, law: 'NFPC 203' },
    { id: 'ALM-06', category: 'alarm', title: '불꽃 감지기', summary: '화염의 자외선/적외선 파장 감지', desc: '층고가 높거나 초기 화재가 급격한 장소에 설치합니다.', components: ['UV/IR 센서', '렌즈'], mechanism: '불꽃 고유의 파장 분석', specs: {'감지거리': '15~50m'}, law: 'KFI 형식승인' },
    { id: 'ALM-07', category: 'alarm', title: '단독경보형 감지기', summary: '자체 경보음이 내장된 독립형 감지기', desc: '수신기 연결 없이 배터리로 작동하며 주택용 소방시설로 의무 설치됩니다.', components: ['센서', '부저', '배터리'], mechanism: '연기 감지 시 즉시 경보음 발생', specs: {'전원': '10년 리튬배터리'}, law: '소방시설법' },
    { id: 'ALM-08', category: 'alarm', title: '가스누설 경보기', summary: 'LPG/LNG 누설 감지 및 경보', desc: '가스 누출을 조기에 감지하여 폭발 사고를 예방합니다.', components: ['반도체 센서', '경보부'], mechanism: '가스 분자 접촉 시 전기 저항 변화 감지', specs: {'설치위치': '천장(LNG), 바닥(LPG)'}, law: 'KFI 형식승인' },
    { id: 'ALM-09', category: 'alarm', title: '시각 경보장치', summary: '청각장애인용 섬광 경보 장치', desc: '화재 시 경종 소리를 듣지 못하는 분들을 위해 강력한 빛(스트로브)으로 알립니다.', components: ['제논램프/LED', '제어회로'], mechanism: '고전압 방전에 의한 섬광 발생', specs: {'광도': '15~177cd'}, law: 'NFPC 203' },
    { id: 'ALM-10', category: 'alarm', title: '누전 경보기', summary: '누설 전류 감지 및 화재 예방', desc: '전기 회로의 누전을 감지하여 화재나 감전 사고를 방지합니다.', components: ['변류기(ZCT)', '수신부'], mechanism: '영상 변류기를 통한 지락 전류 검출', specs: {'경보전류': '200~500mA'}, law: 'NFPC 205' },

    // --- 3. 소방기계류 (Mechanical) ---
    { id: 'MCH-01', category: 'mech', title: '알람 체크 밸브', summary: '습식 스프링클러 유수 검지 장치', desc: '물이 흐르면 클래퍼가 열리고 압력스위치가 화재 신호를 보냅니다.', components: ['밸브체', '압력스위치', '리타딩챔버'], mechanism: '유수에 의한 클래퍼 개방 및 스위치 작동', specs: {'사용압력': '1.0~1.6MPa'}, law: 'NFPC 103' },
    { id: 'MCH-02', category: 'mech', title: '프리액션 밸브', summary: '준비작동식 스프링클러 제어 밸브', desc: '평소 2차측 배관이 비어있어 동파 위험이 있는 곳에 사용합니다.', components: ['다이아프램', '솔레노이드밸브'], mechanism: '감지기 연동 시 밸브 개방 후 송수', specs: {'작동방식': '전기식/기계식'}, law: 'NFPC 103' },
    { id: 'MCH-03', category: 'mech', title: '스프링클러 헤드 (표준)', summary: '가장 일반적인 화재 진압 살수구', desc: '72도 등 특정 온도에서 감열부가 파괴되며 물을 뿌립니다.', components: ['프레임', '디플렉터', '유리벌브'], mechanism: '열에 의한 유리벌브 파손 및 살수', specs: {'K-Factor': '80'}, law: 'KFI 형식승인' },
    { id: 'MCH-04', category: 'mech', title: '소방 펌프 (주펌프)', summary: '시스템 전체 가압 송수 장치', desc: '화재 시 필요한 유량과 압력을 배관으로 공급하는 핵심 장비입니다.', components: ['임펠러', '모터', '제어반'], mechanism: '원심력에 의한 물의 가압 이송', specs: {'토출량': '80~2400 LPM'}, law: 'NFPC 102/103' },
    { id: 'MCH-05', category: 'mech', title: '기동용 수압개폐장치', summary: '펌프 자동 기동을 위한 압력 감지기', desc: '압력 챔버를 통해 배관 내 압력 변화를 안정적으로 측정합니다.', components: ['압력탱크', '압력스위치', '안전밸브'], mechanism: '압력 저하 시 접점 폐쇄로 펌프 기동', specs: {'용량': '100L'}, law: 'NFPC 기준' },
    { id: 'MCH-06', category: 'mech', title: '소방 호스 및 관창', summary: '소화전용 방수 기구', desc: '옥내/외 소화전에서 물을 끌어와 화점에 직접 방수하는 도구입니다.', components: ['호스', '관창(노즐)', '결합금속구'], mechanism: '수압에 의한 물의 유도 및 방사', specs: {'직경': '40mm/65mm'}, law: 'KFI 형식승인' },
    { id: 'MCH-07', category: 'mech', title: '옥내 소화전함', summary: '소화전 기구를 보호하고 보관하는 함', desc: '호스, 관창, 밸브 등을 수납하며 발신기가 부착됩니다.', components: ['철제함', '표시등', '발신기'], mechanism: '화재 시 문을 열어 호스 전개 사용', specs: {'재질': '강판 또는 스테인리스'}, law: 'NFPC 102' },
    { id: 'MCH-08', category: 'mech', title: '소방용 선택 밸브', summary: '가스계 소화설비 구역 선택 밸브', desc: '여러 방호구역 중 화재가 발생한 구역으로만 가스를 보냅니다.', components: ['밸브본체', '피스톤/실린더'], mechanism: '기동가스 압력에 의한 강제 개방', specs: {'형식': '플랜지/나사형'}, law: 'KFI 형식승인' },
    { id: 'MCH-09', category: 'mech', title: '분기 배관 (확관형)', summary: '배관 용접 없이 가지관을 추출하는 공법', desc: '주배관에서 직접 구멍을 뚫고 확관하여 가지관을 연결합니다.', components: ['주배관', '확관부'], mechanism: '소성 가공을 통한 기밀성 확보', specs: {'종류': '확관형, 비확관형'}, law: 'KFI 성능인증' },
    { id: 'MCH-10', category: 'mech', title: '소방용 합성수지배관 (CPVC)', summary: '부식에 강한 플라스틱 소방 배관', desc: '내식성이 뛰어나고 시공이 간편하여 스프링클러 배관 등에 사용됩니다.', components: ['파이프', '이음관'], mechanism: '접착제 또는 나사 이음', specs: {'내열성': '높음'}, law: 'KFI 성능인증' },

    // --- 4. 피난구조류 (Evacuation) ---
    { id: 'EVC-01', category: 'evac', title: '피난구 유도등', summary: '출입구 위치를 알리는 상시 점등등', desc: '녹색 바탕에 사람 모양 도안으로 비상구 위치를 표시합니다.', components: ['LED', '배터리', '도안판'], mechanism: '정전 시 예비전원 자동 전환 점등', specs: {'크기': '대/중/소형'}, law: 'NFPC 303' },
    { id: 'EVC-02', category: 'evac', title: '통로 유도등', summary: '복도나 계단 바닥/벽면 안내등', desc: '피난 방향을 지시하는 화살표가 포함된 유도등입니다.', components: ['LED', '케이스'], mechanism: '피난로를 따라 연속적으로 배치', specs: {'형태': '벽부형, 바닥매립형'}, law: 'NFPC 303' },
    { id: 'EVC-03', category: 'evac', title: '완강기 (다인용/1인용)', summary: '수직 피난용 하강 기구', desc: '사용자의 무게에 의해 일정한 속도로 내려오게 하는 기구입니다.', components: ['조절기', '로프', '벨트'], mechanism: '원심 브레이크에 의한 정속 하강', specs: {'하강속도': '0.16~1.5m/s'}, law: 'KFI 형식승인' },
    { id: 'EVC-04', category: 'evac', title: '구조대 (경사식/수직식)', summary: '포대 형태의 피난 기구', desc: '포대 안으로 들어가서 미끄러져 내려오는 대피 시설입니다.', components: ['포대', '틀', '하부고정장치'], mechanism: '마찰력을 이용한 하강 속도 조절', specs: {'형식': '경사식, 수직식'}, law: 'KFI 형식승인' },
    { id: 'EVC-05', category: 'evac', title: '공기 호흡기', summary: '화재 연기 속 호흡 보조 장비', desc: '소방관 또는 피난자가 유독가스 차단을 위해 사용합니다.', components: ['공기용기', '면체', '등지게'], mechanism: '압축 공기 공급 및 양압 유지', specs: {'사용시간': '45분/60분'}, law: 'KFI 형식승인' },
    { id: 'EVC-06', category: 'evac', title: '비상 조명등', summary: '정전 시 실내를 밝히는 조명', desc: '화재나 정전 시 바닥면 조도를 확보하여 피난을 돕습니다.', components: ['램프', '배터리', '충전부'], mechanism: '전원 차단 시 자동 점등', specs: {'조도': '1lx 이상'}, law: 'NFPC 304' },
    { id: 'EVC-07', category: 'evac', title: '피난 사다리', summary: '접이식 또는 고정식 대피 사다리', desc: '아파트 발코니 등에 설치되어 아래층으로 대피할 때 사용합니다.', components: ['사다리 본체', '고정장치'], mechanism: '하부 개방 시 사다리 전개', specs: {'재질': '알루미늄/강철'}, law: 'KFI 형식승인' },
    { id: 'EVC-08', category: 'evac', title: '공기 안전 매트', summary: '낙하 인명 구조용 에어매트', desc: '고층에서 뛰어내리는 인명을 안전하게 받기 위한 대형 매트입니다.', components: ['매트 본체', '송풍기'], mechanism: '공기압에 의한 충격 흡수', specs: {'용도': '공동주택 필수비치'}, law: 'KFI 성능인증' },
    { id: 'EVC-09', category: 'evac', title: '객석 유도등', summary: '영화관 등 어두운 객석 안내', desc: '어두운 객석 통로 바닥에 설치되어 피난로를 표시합니다.', components: ['LED', '매립형 케이스'], mechanism: '저휘도 또는 점멸 방식 안내', specs: {'설치위치': '통로 바닥'}, law: 'NFPC 303' },
    { id: 'EVC-10', category: 'evac', title: '축광 유도표지', summary: '빛을 모았다가 어둠 속에서 발광', desc: '전원 없이 빛을 축적하여 야광 형태로 방향을 안내합니다.', components: ['축광 시트', '도안'], mechanism: '에너지 축적 후 가시광선 방출', specs: {'발광시간': '60분 이상'}, law: 'NFPC 303' },

    // --- 5. 방염 및 기타 (Flame/Others) ---
    { id: 'OTH-01', category: 'flame', title: '방염 물품 (커튼/카페트)', summary: '연소 확산 방지 특수 물품', desc: '쉽게 불에 타지 않도록 처리된 인테리어 물품입니다.', components: ['방염섬유', '방염액'], mechanism: '탄화막 형성에 의한 산소 차단', specs: {'인증': '방염필증 부착'}, law: '소방시설법' },
    { id: 'OTH-02', category: 'flame', title: '방열복/방화복', summary: '고열 및 불꽃 차단 의복', desc: '소방관이 화재 현장에 진입할 때 착용하는 보호 장구입니다.', components: ['겉감', '중간층', '안감'], mechanism: '열전도 차단 및 수분 증발 억제', specs: {'성능': 'KFI 인증'}, law: '소방장비 기준' },
    { id: 'OTH-03', category: 'flame', title: '흔들림 방지 버팀대', summary: '배관 내진 설계용 고정 장치', desc: '지진 발생 시 소방 배관의 흔들림과 파손을 막습니다.', components: ['지지대', '클램프', '앵커'], mechanism: '지진 하중의 구조체 전달 및 분산', specs: {'방향': '횡방향, 종방향'}, law: '내진설계기준' },
    { id: 'OTH-04', category: 'flame', title: '비상 콘센트 설비', summary: '소방관용 전원 공급 장치', desc: '소방대원이 화재 진압 장비의 전원을 연결하기 위해 사용합니다.', components: ['콘센트', '전용함', '차단기'], mechanism: '비상전원 수전 및 전력 공급', specs: {'전압': '단상 220V'}, law: 'NFPC 502' },
    { id: 'OTH-05', category: 'flame', title: '자동 차압 급기 댐퍼', summary: '제연 구역 압력 조절 장치', desc: '연기 침입 방지를 위해 부속실 압력을 자동으로 조절합니다.', components: ['댐퍼 날개', '액추에이터', '압력센서'], mechanism: '설정 차압 유지를 위한 개도 제어', specs: {'차압기준': '40~60Pa'}, law: 'NFPC 401' },
    { id: 'OTH-06', category: 'flame', title: '비상문 자동개폐장치', summary: '화재 시 옥상문 자동 개방', desc: '평소엔 방범을 위해 닫혀있다가 화재 시엔 자동으로 열립니다.', components: ['제어부', '잠금장치', '해제버튼'], mechanism: '수신기 신호 수신 시 잠금 해제', specs: {'용도': '옥상문, 비상구'}, law: '소방시설법' },
    { id: 'OTH-07', category: 'flame', title: '자동 폐쇄 장치', summary: '화재 시 방화문 자동 닫힘', desc: '평상시 열려있는 방화문을 화재 감지 시 자동으로 닫아줍니다.', components: ['암', '제어부', '복구버튼'], mechanism: '전기적 해제에 의한 기계적 폐쇄', specs: {'형식': '도어클로저 일체형 등'}, law: 'KFI 성능인증' },
    { id: 'OTH-08', category: 'flame', title: '방화문/방화셔터', summary: '연소 및 연기 확산 차단벽', desc: '화재 구획을 나누어 불길이 번지는 것을 일정 시간 막아줍니다.', components: ['철제문', '방화스크린'], mechanism: '내화 구조에 의한 열/불꽃 차단', specs: {'성능': '60분+/60분'}, law: '건축법' },
    { id: 'OTH-09', category: 'flame', title: '소방용 밸브 (OS&Y)', summary: '개폐 확인형 게이트 밸브', desc: '밸브의 열림/닫힘 상태를 멀리서도 확인할 수 있는 밸브입니다.', components: ['핸들', '나사축(Stem)'], mechanism: '축의 돌출 여부로 개폐 상태 식별', specs: {'형식': '바깥나사형'}, law: 'KFI 형식승인' },
    { id: 'OTH-10', category: 'flame', title: '과압 배출구 (플랩댐퍼)', summary: '가스 방출 시 실내 과압 방지', desc: '가스 소화약제 방출 시 실내 압력이 너무 높아지는 것을 막습니다.', components: ['날개', '추/스프링'], mechanism: '일정 압력 이상에서 자동 개방', specs: {'용도': '가스계 소화설비'}, law: 'NFPC 101' }
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
            card.style.animationDelay = `${index * 0.03}s`; // Faster animation for many items
            
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
