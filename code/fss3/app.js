/* ===== 시설 유형 ===== */
const FACILITY_TYPES = [
  { id: 'factory',       label: '공장/창고',       icon: 'factory' },
  { id: 'commercial',    label: '근린생활시설',     icon: 'store' },
  { id: 'residential',   label: '공동주택',         icon: 'home' },
  { id: 'education',     label: '교육시설',         icon: 'graduation-cap' },
  { id: 'medical',       label: '의료/요양시설',    icon: 'hospital' },
  { id: 'accommodation', label: '숙박시설',         icon: 'hotel' },
  { id: 'office',        label: '업무시설',         icon: 'building-2' },
  { id: 'assembly',      label: '문화/종교',       icon: 'users' },
  { id: 'market',        label: '판매/시장',       icon: 'shopping-cart' },
  { id: 'welfare',       label: '노유자시설',       icon: 'heart' },
  { id: 'transport',     label: '운수/지하',       icon: 'train' },
];

/* ===== 공통 체크리스트 ===== */
const CHECKLIST = [
  {
    id: 'extinguisher', icon: 'fire-extinguisher', category: '소화기 비치 및 상태',
    legalRef: '소방시설법 제12조 · NFSC 101',
    details: [
      { text: '설치 위치 적정 여부', level: 'Minor', desc: '보행거리 20m 이내, 통행 지장 없는 위치' },
      { text: '설치 높이 적정 여부', level: 'Minor', desc: '바닥으로부터 1.5m 이하 설치' },
      { text: '압력 게이지 정상 범위', level: 'Major', desc: '지시침이 녹색 범위 내에 있어야 함' },
      { text: '유효기간 경과 여부', level: 'Major', desc: '제조일로부터 10년 초과 시 교체 필요' },
      { text: '소화기 파손/변형/부식', level: 'Critical', desc: '본체 파손, 호스 파손, 안전핀 이탈 등' },
      { text: '점검 스티커 부착 및 기록 확인', level: 'Minor', desc: '최근 점검일, 점검자 기재 여부' },
    ]
  },
  {
    id: 'evacuation', icon: 'door-open', category: '비상구 및 피난 통로',
    legalRef: '건축법 제49조 · NFSC 301',
    details: [
      { text: '비상구 폐쇄·잠금 여부', level: 'Critical', desc: '비상구는 항상 열려 있어야 하며 잠금 금지' },
      { text: '피난 통로 장애물 적치 여부', level: 'Major', desc: '피난 통로 내 물품 적치 금지' },
      { text: '비상구 표지등 정상 점등', level: 'Minor', desc: '유도등 미점등 시 즉시 교체' },
      { text: '피난 통로 폭 확보(1.2m 이상)', level: 'Major', desc: '복도·계단 등 최소 유효폭 유지' },
      { text: '계단 난간 설치 상태 확인', level: 'Minor', desc: '난간 탈락, 파손 여부' },
    ]
  },
  {
    id: 'alarm', icon: 'bell', category: '화재경보기 작동 상태',
    legalRef: '소방시설법 제12조 · NFSC 203',
    details: [
      { text: '수신기 정상 상태 확인', level: 'Critical', desc: '전원 정상, 스위치 정위치, 주경종 연동 확인' },
      { text: '감지기 외관 이상 여부', level: 'Major', desc: '파손, 먼지 과다 축적, 탈락 여부' },
      { text: '경보음 정상 청취 여부', level: 'Major', desc: '경보 발령 시 전 구역 청취 가능 여부' },
      { text: '배선 및 전원 이상 유무', level: 'Critical', desc: '배선 노출, 단선, 수신기 전원 차단 여부' },
      { text: '발신기 외관 및 작동 확인', level: 'Minor', desc: '발신기 파손, 보호판 미부착 여부' },
    ]
  },
  {
    id: 'sprinkler', icon: 'droplets', category: '스프링클러 및 소화전',
    legalRef: '소방시설법 제12조 · NFSC 103',
    details: [
      { text: '스프링클러 헤드 이상 유무', level: 'Critical', desc: '헤드 훼손, 분실, 도색, 이물질 부착 여부' },
      { text: '헤드 주변 60cm 이내 장애물', level: 'Major', desc: '헤드로부터 60cm 이내 장애물 배치 금지' },
      { text: '소화전 밸브 작동 상태', level: 'Major', desc: '밸브 개방 여부, 물 방사 정상 여부' },
      { text: '소화전함 내 호스·관창 비치', level: 'Major', desc: '호스, 관창, 밸브 열기 도구 비치 확인' },
      { text: '압력계 정상 범위 확인', level: 'Major', desc: '방수압력 0.17~0.7MPa 유지 여부' },
    ]
  },
  {
    id: 'emergency_light', icon: 'lightbulb', category: '비상조명등 및 유도등',
    legalRef: '소방시설법 제12조 · NFSC 303',
    details: [
      { text: '비상조명등 정상 점등 확인', level: 'Major', desc: '정전 시 자동 점등, 20분 이상 지속 여부' },
      { text: '피난구 유도등 정상 점등', level: 'Major', desc: '모든 비상구·피난구에 설치 및 점등 여부' },
      { text: '통로 유도등 설치 및 점등', level: 'Minor', desc: '복도·계단에 일정 간격 설치 여부' },
      { text: '배터리 잔존 용량 확인', level: 'Minor', desc: '충전불량 표시등 확인, 배터리 노후 여부' },
    ]
  },
  {
    id: 'evacuation_map', icon: 'map', category: '피난 안내도 및 소방 계획서',
    legalRef: '소방시설법 제22조',
    details: [
      { text: '피난 안내도 최신화 여부(1년 이내)', level: 'Minor', desc: '최근 시설 변경 반영 여부' },
      { text: '피난 안내도 가시성 확보', level: 'Minor', desc: '이용객이 쉽게 볼 수 있는 위치에 부착' },
      { text: '소방안전관리 계획서 비치', level: 'Major', desc: '소방계획서 최신 여부, 비치 여부 확인' },
      { text: '소방훈련 실시 기록(연 2회)', level: 'Major', desc: '연 2회 이상 소방훈련 실시 및 기록 유지' },
    ]
  },
  {
    id: 'electrical', icon: 'zap', category: '전기·가스 설비 이상 유무',
    legalRef: '전기사업법 · 도시가스사업법',
    details: [
      { text: '누전차단기 정상 작동 확인', level: 'Critical', desc: '테스트 버튼으로 동작 확인' },
      { text: '가스 누출 감지기 정상 여부', level: 'Critical', desc: '가스 누출 감지기 정상 작동 여부' },
      { text: '가스 차단 밸브 위치 표시', level: 'Major', desc: '긴급 시 가스 차단 밸브 위치 명확히 표시' },
      { text: '문어발 콘센트 과부하 여부', level: 'Major', desc: '과부하 연결, 피복 손상 전선 사용 금지' },
      { text: '배선 피복 손상 여부', level: 'Critical', desc: '전선 피복 손상, 노출 여부 확인' },
    ]
  },
  {
    id: 'fire_door', icon: 'shield-alert', category: '방화문 및 방화셔터',
    legalRef: '건축법 제64조',
    details: [
      { text: '방화문 자동폐쇄장치 정상', level: 'Major', desc: '도어클로저 정상 작동 여부' },
      { text: '방화문 상시 닫힘 상태 유지', level: 'Critical', desc: '고임목 등으로 열어두는 행위 금지' },
      { text: '방화셔터 작동 상태 확인', level: 'Critical', desc: '강하 장애물 없음, 연동 정상 여부' },
      { text: '방화셔터 하강 구역 표시', level: 'Minor', desc: '셔터 하강 구역에 주차·적치 금지 표시' },
    ]
  },
  {
    id: 'escape_devices', icon: 'move-down', category: '피난기구 점검',
    legalRef: '소방시설법 제12조 · NFSC 301',
    details: [
      { text: '피난기구 설치 위치 표지 부착', level: 'Minor', desc: '설치 위치, 사용법 안내 표지 부착' },
      { text: '완강기 로프·벨트 이상 유무', level: 'Major', desc: '로프 마모, 벨트 파손 여부' },
      { text: '피난 사다리 고정 상태', level: 'Major', desc: '고정 장치 정상, 부식 여부' },
      { text: '피난기구 주변 장애물 유무', level: 'Major', desc: '사용 저해 장애물 없음' },
    ]
  },
  {
    id: 'safety_manager', icon: 'clipboard-list', category: '소방안전관리자 서류',
    legalRef: '소방시설법 제24조',
    details: [
      { text: '소방안전관리자 선임 여부', level: 'Critical', desc: '선임 신고 및 자격 확인' },
      { text: '자체 점검 기록 유지(월 1회)', level: 'Major', desc: '월 1회 자체 점검 기록 작성 및 보존' },
      { text: '소방관서 지적사항 기한 내 이행', level: 'Critical', desc: '관할 소방서 지적사항 이행 여부' },
      { text: '소방설비 유지관리 계약 여부', level: 'Minor', desc: '전문 소방시설관리업체 위탁 계약 여부' },
    ]
  },
  {
    id: 'hazardous', icon: 'triangle-alert', category: '위험물·특수 가연물 관리',
    legalRef: '위험물안전관리법 · 소방시설법 제15조',
    details: [
      { text: '위험물 저장소 허가 수량 이내 보관', level: 'Critical', desc: '위험물 저장소 허가 수량 초과 여부' },
      { text: '특수 가연물 기준 수량 초과 여부', level: 'Major', desc: '솜, 고무류 등 특수 가연물 기준 수량 이내 보관' },
      { text: '위험물 표지·게시판 부착', level: 'Minor', desc: '위험물 종류, 최대 수량 등 표지 부착' },
      { text: '가연성 물질 화기 격리 보관', level: 'Critical', desc: '인화성·가연성 물질 화기와 격리 보관 여부' },
    ]
  },
  {
    id: 'etc', icon: 'file-text', category: '기타 특이사항',
    legalRef: '',
    details: [
      { text: '현장 종합 소견 및 기타 특이사항', level: 'Minor', desc: '위 항목들에 포함되지 않은 추가 내용을 아래 메모란에 상세히 기록해 주세요.' }
    ]
  },
];

/* ===== 시설별 추가 항목 ===== */
const FACILITY_EXTRA = {
  factory: [
    { catId: 'sprinkler',      text: '포소화설비 정상 상태 확인',       level: 'Critical', desc: '포헤드 손상, 약제 유효기간 확인' },
    { catId: 'electrical',     text: '방폭 전기설비 상태 확인',         level: 'Critical', desc: '방폭 등급 유지, 외함 훼손 여부' },
    { catId: 'hazardous',      text: '화학물질 MSDS 비치 여부',         level: 'Major',    desc: 'MSDS 비치, 보호구 지급 여부' },
    { catId: 'hazardous',      text: '지게차 충전구역 화기 관리',        level: 'Major',    desc: '배터리 충전 구역 환기 및 화기 금지' },
  ],
  commercial: [
    { catId: 'extinguisher',   text: '주방 K급 소화기 비치 여부',       level: 'Major',    desc: '주방 내 식용유 화재 대응 K급 소화기 설치' },
    { catId: 'electrical',     text: '주방 후드 필터 청소 기록',         level: 'Major',    desc: '그리스 필터 정기 청소, 화재 예방' },
    { catId: 'electrical',     text: '가스 자동 차단 장치 설치',         level: 'Major',    desc: '영업 종료 후 가스 자동 차단 장치 설치 여부' },
    { catId: 'evacuation',     text: '고객 피난 동선 명확화',            level: 'Minor',    desc: '고객이 쉽게 피난할 수 있는 동선 확보' },
  ],
  residential: [
    { catId: 'escape_devices', text: '세대별 완강기 설치 상태',          level: 'Major',    desc: '3층 이상 세대 완강기 또는 피난 사다리 설치' },
    { catId: 'evacuation',     text: '경량칸막이 앞 장애물 여부',        level: 'Major',    desc: '세대 간 경량칸막이 앞 장애물 적치 금지' },
    { catId: 'extinguisher',   text: '세대별 소화기 비치 현황',          level: 'Major',    desc: '각 세대 내 소화기 1개 이상 비치' },
    { catId: 'alarm',          text: '단독경보형 감지기 설치 여부',       level: 'Minor',    desc: '각 세대 내 단독경보형 감지기 설치 여부' },
  ],
  education: [
    { catId: 'evacuation_map', text: '소방대피훈련 실시 기록(학기 1회)', level: 'Major',    desc: '학기별 1회 이상 대피훈련 실시 및 기록' },
    { catId: 'evacuation_map', text: '학생 대상 소방 안전 교육(연 1회)', level: 'Minor',    desc: '소방 안전 교육 연 1회 이상 실시 여부' },
    { catId: 'evacuation',     text: '교실별 피난 경로 안내 부착',       level: 'Minor',    desc: '각 교실 내 피난 경로 안내문 부착 여부' },
    { catId: 'alarm',          text: '비상방송 시스템 연동 확인',         level: 'Major',    desc: '화재 시 비상방송 자동 연동 여부' },
  ],
  medical: [
    { catId: 'evacuation',     text: '이동 불가 환자 대피 계획 수립',    level: 'Critical', desc: '보행 불가 환자 대피 담당자 및 절차 수립' },
    { catId: 'electrical',     text: '의료용 산소 설비 안전 관리',       level: 'Critical', desc: '산소 공급 설비 주변 화기 금지 및 이격 거리 유지' },
    { catId: 'alarm',          text: '간호사 스테이션 경보 연동 확인',   level: 'Major',    desc: '화재 경보 간호사 스테이션 즉시 수신 여부' },
    { catId: 'fire_door',      text: '방연문 설치 및 작동 상태',         level: 'Major',    desc: '방연문 자동 폐쇄 장치 정상 작동 여부' },
  ],
  accommodation: [
    { catId: 'alarm',          text: '객실별 화재 감지기 작동 확인',     level: 'Critical', desc: '각 객실 연기 감지기 정상 설치 및 작동 여부' },
    { catId: 'evacuation_map', text: '객실 내 피난 안내도 부착',         level: 'Minor',    desc: '투숙객이 쉽게 볼 수 있는 위치에 피난 안내도 부착' },
    { catId: 'sprinkler',      text: '전 구역 스프링클러 설치 확인',     level: 'Major',    desc: '객실 포함 전 구역 스프링클러 헤드 설치 여부' },
    { catId: 'evacuation',     text: '투숙객 비상구 안내 방송 점검',     level: 'Major',    desc: '화재 발생 시 투숙객 안내 방송 시스템 점검' },
  ],
  office: [
    { catId: 'electrical',     text: '서버실 항온·항습 및 소화 설비',   level: 'Major',    desc: '서버실 내 청정 소화 설비 및 온도 관리 여부' },
    { catId: 'evacuation',     text: '재실 인원 대피 계획 수립 여부',   level: 'Minor',    desc: '층별 재실 인원 파악 및 대피 계획 수립' },
    { catId: 'alarm',          text: '층별 발신기 작동 여부 확인',       level: 'Minor',    desc: '각 층 발신기 정상 설치 및 작동 확인' },
  ],
  assembly: [
    { catId: 'evacuation',     text: '무대부 방화막 설치 및 작동 상태',  level: 'Major',    desc: '무대와 객석 사이 방화막 작동 여부' },
    { catId: 'evacuation',     text: '관람석 통로 폭 및 피난 유도선',    level: 'Major',    desc: '좌석 사이 통로 폭 확보 및 바닥 유도선 상태' },
    { catId: 'emergency_light', text: '휴대용 비상조명등 비치 상태',      level: 'Minor',    desc: '어두운 곳에서 사용 가능한 휴대용 조명등 비치' },
  ],
  market: [
    { catId: 'fire_door',      text: '방화셔터 하부 상품 적치 금지',     level: 'Critical', desc: '셔터 하강 라인에 진열대 및 상품 적치 여부' },
    { catId: 'evacuation',     text: '전통시장 내 소방차 진입로 확보',   level: 'Major',    desc: '시장 통로 내 좌판 등으로 인한 진입 장애 유무' },
    { catId: 'extinguisher',   text: '매장별 전용 소화기 비치 현황',     level: 'Major',    desc: '개별 점포 내 소화기 비치 및 상태' },
  ],
  welfare: [
    { catId: 'evacuation',     text: '야간 근무자 피난 보조 계획',       level: 'Critical', desc: '취침 시 화재 발생 대응 피난 보조 인력 편성' },
    { catId: 'escape_devices', text: '피난 미끄럼틀 또는 구조대 상태',   level: 'Major',    desc: '약자를 위한 피난 기구 설치 및 관리 상태' },
    { catId: 'alarm',          text: '시각경보장치 설치 및 작동 여부',   level: 'Major',    desc: '청각 약자를 위한 시각 경보등 점등 여부' },
  ],
  transport: [
    { catId: 'evacuation',     text: '제연 설비 가동 및 풍량 점검',       level: 'Critical', desc: '지하 공간 화재 시 연기 배출 설비 정상 여부' },
    { catId: 'emergency_light', text: '지하 피난 유도선 상태 확인',      level: 'Major',    desc: '바닥 또는 벽면 광원 점등 피난 유도선 상태' },
    { catId: 'alarm',          text: '비상전원 공급 장치 점검',          level: 'Critical', desc: '정전 시 소방 시설 가동을 위한 비상 발전기 상태' },
  ],
};

/* ===== 앱 상태 초기값 ===== */
function getDefaultState() {
  return {
    step: -1,
    meta: { 
      facility:'', address:'', inspector:'', position:'', date:'', nextDate:'',
      scale: {
        tags: { area:'', floorsUp:'', floorsDown:'', people:'', special:[] },
        input: { areaM2:0, areaPy:0, floorsUp:1, floorsDown:0, capacity:50 }
      }
    },
    facilityTypes: [],
    checks: {}
  };
}

let state = getDefaultState();

/* ===== 초기화 ===== */
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('meta-date').value = today;
  loadFromStorage();
  renderFacilityGrid();
  initScaleEvents();
  // 초기 로드 시 스텝 이동
  goToStep(state.step);
});

/* ===== 시설 규모 이벤트 초기화 ===== */
function initScaleEvents() {
  const groups = ['area', 'floors-up', 'floors-down', 'people', 'special'];
  groups.forEach(gid => {
    const container = document.getElementById(`tag-${gid}`);
    if(!container) return;
    container.addEventListener('click', (e) => {
      const tag = e.target.closest('.scale-tag');
      if(!tag) return;
      const val = tag.dataset.val;
      const key = gid.replace(/-([a-z])/g, g => g[1].toUpperCase());
      
      if(gid === 'special') {
        if(!Array.isArray(state.meta.scale.tags.special)) state.meta.scale.tags.special = [];
        const idx = state.meta.scale.tags.special.indexOf(val);
        if(idx === -1) state.meta.scale.tags.special.push(val);
        else state.meta.scale.tags.special.splice(idx, 1);
      } else {
        state.meta.scale.tags[key] = val;
      }
      renderScaleTags();
      saveToStorage();
    });
  });

  const areaM2 = document.getElementById('meta-area-m2');
  if(areaM2) {
    areaM2.addEventListener('input', (e) => {
      const m2 = parseFloat(e.target.value) || 0;
      const py = (m2 * 0.3025).toFixed(1);
      document.getElementById('meta-area-py').value = py;
      state.meta.scale.input.areaM2 = m2;
      state.meta.scale.input.areaPy = py;
      saveToStorage();
    });
  }

  ['meta-floors-up', 'meta-floors-down', 'meta-capacity'].forEach(id => {
    const el = document.getElementById(id);
    if(el) {
      el.addEventListener('input', (e) => {
        const key = id.replace('meta-', '').replace(/-([a-z])/g, g => g[1].toUpperCase());
        state.meta.scale.input[key] = parseInt(e.target.value) || 0;
        saveToStorage();
      });
    }
  });
}

function renderScaleTags() {
  if(!state.meta.scale || !state.meta.scale.tags) return;
  const tags = state.meta.scale.tags;
  const groups = {
    area: tags.area,
    'floors-up': tags.floorsUp,
    'floors-down': tags.floorsDown,
    people: tags.people,
    special: tags.special
  };

  Object.entries(groups).forEach(([gid, activeVal]) => {
    const container = document.getElementById(`tag-${gid}`);
    if(!container) return;
    container.querySelectorAll('.scale-tag').forEach(tag => {
      const val = tag.dataset.val;
      const isActive = Array.isArray(activeVal) ? activeVal.includes(val) : activeVal === val;
      tag.classList.toggle('active', !!isActive);
    });
  });
}

/* ===== localStorage ===== */
function saveToStorage() {
  try { localStorage.setItem('fss3_state', JSON.stringify(state)); } catch(e) {}
}
function loadFromStorage() {
  try {
    const saved = localStorage.getItem('fss3_state');
    if (!saved) return;
    const s = JSON.parse(saved);
    
    // 데이터 구조 보정 (Migration)
    state = Object.assign(getDefaultState(), s);
    if(!state.meta.scale) state.meta.scale = getDefaultState().meta.scale;
    if(!state.meta.scale.tags) state.meta.scale.tags = getDefaultState().meta.scale.tags;
    if(!state.meta.scale.input) state.meta.scale.input = getDefaultState().meta.scale.input;
    if(!state.checks) state.checks = {};

    const m = state.meta;
    if (m.facility)  document.getElementById('meta-facility').value  = m.facility;
    if (m.address)   document.getElementById('meta-address').value   = m.address;
    if (m.inspector) document.getElementById('meta-inspector').value = m.inspector;
    if (m.position)  document.getElementById('meta-position').value  = m.position;
    if (m.date)      document.getElementById('meta-date').value      = m.date;
    if (m.nextDate)  document.getElementById('meta-next-date').value = m.nextDate;

    renderScaleTags();
    const i = m.scale.input;
    if(document.getElementById('meta-area-m2')) document.getElementById('meta-area-m2').value = i.areaM2 || '';
    if(document.getElementById('meta-area-py')) document.getElementById('meta-area-py').value = i.areaPy || '';
    if(document.getElementById('meta-floors-up')) document.getElementById('meta-floors-up').value = i.floorsUp || '';
    if(document.getElementById('meta-floors-down')) document.getElementById('meta-floors-down').value = i.floorsDown || '';
    if(document.getElementById('meta-capacity')) document.getElementById('meta-capacity').value = i.capacity || '';
  } catch(e) {
    console.error("Load failed", e);
  }
}

/* ===== 시설 유형 그리드 렌더링 ===== */
function renderFacilityGrid() {
  const grid = document.getElementById('facility-grid');
  if(!grid) return;
  
  // state.facilityTypes가 배열인지 확인 (방어 코드)
  if(!Array.isArray(state.facilityTypes)) state.facilityTypes = [];

  let html = FACILITY_TYPES.map(f => {
    const isSelected = state.facilityTypes.includes(f.id);
    return `
      <div class="facility-card ${isSelected ? 'selected' : ''}"
           id="fc-${f.id}" onclick="toggleFacility(event, '${f.id}')">
        <span class="facility-card-icon"><i data-lucide="${f.icon}"></i></span>
        <span class="facility-card-label">${f.label}</span>
      </div>
    `;
  }).join('');

  html += `
    <a href="https://fmdic-26b04.web.app/fss/" target="_blank" class="facility-card link-card">
      <span class="facility-card-icon"><i data-lucide="external-link"></i></span>
      <span class="facility-card-label">설치 기준 자가진단</span>
    </a>
  `;

  grid.innerHTML = html;
  lucide.createIcons();
}
function toggleFacility(event, id) {
  // 이벤트 버블링 방지
  if(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  if(!Array.isArray(state.facilityTypes)) state.facilityTypes = [];
  
  const idx = state.facilityTypes.indexOf(id);
  if (idx === -1) state.facilityTypes.push(id);
  else state.facilityTypes.splice(idx, 1);
  
  renderFacilityGrid();
  saveToStorage();
}

/* ===== 메타 → 다음 ===== */
function metaNext() {
  const facility  = document.getElementById('meta-facility').value.trim();
  const inspector = document.getElementById('meta-inspector').value.trim();
  const date      = document.getElementById('meta-date').value;
  if (!facility || !inspector || !date) {
    alert('시설명, 점검자 성명, 점검일은 필수 입력 항목입니다.');
    return;
  }
  state.meta.facility = facility;
  state.meta.inspector = inspector;
  state.meta.date = date;
  state.meta.address = document.getElementById('meta-address').value.trim();
  state.meta.position = document.getElementById('meta-position').value.trim();
  state.meta.nextDate = document.getElementById('meta-next-date').value;
  
  CHECKLIST.forEach(cat => {
    if (!state.checks[cat.id]) state.checks[cat.id] = { common: [], extra: [], comment: '' };
  });
  saveToStorage();
  goToStep(0);
}

/* ===== 스텝 이동 ===== */
function goToStep(idx) {
  state.step = idx;
  saveToStorage();

  if (idx >= 0 && idx < CHECKLIST.length) {
    showSection('checklist');
    renderChecklistStep(idx);
  } else if (idx >= CHECKLIST.length) {
    showSection('result');
    renderResult();
  } else {
    showSection('meta');
  }
  
  updateHeader();
  updateStepNav();
  updateProgressBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSection(name) {
  ['meta','checklist','result'].forEach(n => {
    const el = document.getElementById('section-' + n);
    if(el) {
      el.style.display = n === name ? '' : 'none';
      el.classList.toggle('active', n === name);
    }
  });
  const showNav = name !== 'meta';
  const barWrap = document.getElementById('progress-bar-wrap');
  const stepNav = document.getElementById('step-nav');
  if(barWrap) barWrap.style.display = showNav ? '' : 'none';
  if(stepNav) stepNav.style.display = showNav ? '' : 'none';
}

/* ===== 헤더 메타바 ===== */
function updateHeader() {
  const bar = document.getElementById('header-meta-bar');
  if(!bar) return;
  bar.style.display = state.step >= 0 ? '' : 'none';
  const nameEl = document.getElementById('hdr-facility-name');
  const inspEl = document.getElementById('hdr-inspector');
  const dateEl = document.getElementById('hdr-date');
  if(nameEl) nameEl.textContent = state.meta.facility || '';
  if(inspEl) inspEl.innerHTML = state.meta.inspector ? '<i data-lucide="user" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i>' + state.meta.inspector : '';
  if(dateEl) dateEl.innerHTML = state.meta.date ? '<i data-lucide="calendar" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i>' + state.meta.date : '';
  lucide.createIcons();
}

/* ===== 진행률 바 ===== */
function updateProgressBar() {
  const total = CHECKLIST.length;
  const done  = Math.min(Math.max(0, state.step), total);
  const pct   = Math.round((done / total) * 100);
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if(fill) fill.style.width = pct + '%';
  if(label) label.textContent = state.step >= total ? '점검 완료!' : `${done} / ${total} 완료`;
}

/* ===== 스텝 내비 ===== */
function updateStepNav() {
  const inner = document.getElementById('step-nav-inner');
  if(!inner) return;
  inner.innerHTML = CHECKLIST.map((cat, i) => {
    const chk = state.checks[cat.id] || { common: [], extra: [] };
    const hasIssue = (chk.common.length + (chk.extra || []).length) > 0;
    let cls = 'step-dot';
    if (i === state.step) cls += ' active';
    else if (i < state.step || state.step >= CHECKLIST.length) cls += ' done';
    if (hasIssue) cls += ' has-issue';
    return `<button class="${cls}" onclick="goToStep(${i})" title="${cat.category}">
      <span class="step-num">${hasIssue ? '!' : i+1}</span>
      <span class="step-icon"><i data-lucide="${cat.icon}" style="width:20px;height:20px;"></i></span>
    </button>`;
  }).join('');
  lucide.createIcons();
}

/* ===== 체크리스트 스텝 렌더링 ===== */
function renderChecklistStep(idx) {
  const cat  = CHECKLIST[idx];
  if(!cat) return;
  const chk  = state.checks[cat.id] || { common: [], extra: [], comment: '' };
  
  const iconEl = document.getElementById('checklist-icon');
  const titleEl = document.getElementById('checklist-title');
  const legalEl = document.getElementById('checklist-legal');
  const commEl = document.getElementById('checklist-comment');
  
  if(iconEl) iconEl.innerHTML = `<i data-lucide="${cat.icon}" style="width:32px;height:32px;"></i>`;
  if(titleEl) titleEl.textContent = `${idx + 1}/${CHECKLIST.length}  ${cat.category}`;
  if(legalEl) legalEl.innerHTML = cat.legalRef ? '<i data-lucide="bookmark" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i>' + cat.legalRef : '';
  if(commEl) commEl.value = chk.comment || '';

  const nextBtn = document.getElementById('btn-checklist-next');
  const prevBtn = document.getElementById('btn-checklist-prev');
  
  if(nextBtn) {
    const isLast = idx === CHECKLIST.length - 1;
    nextBtn.innerHTML = isLast ? '결과 보기 <i data-lucide="chevron-right"></i>' : '다음 <i data-lucide="chevron-right"></i>';
  }
  
  if(prevBtn) {
    prevBtn.style.display = ''; 
    prevBtn.innerHTML = idx === 0 ? '<i data-lucide="home" style="width:14px;height:14px;margin-right:4px;"></i> 메인으로' : '<i data-lucide="chevron-left"></i> 이전';
  }

  const list = document.getElementById('checklist-items');
  if(list) {
    if (cat.details.length === 0) {
      list.innerHTML = '<p style="color:var(--text-muted);font-size:.85rem;">이 카테고리는 아래 특이사항 메모란을 활용해 주세요.</p>';
    } else {
      list.innerHTML = cat.details.map((d, i) => renderCheckItem(d, i, chk.common, 'common')).join('');
    }
  }

  const extraItems = getExtraItems(cat.id);
  const cardExtra  = document.getElementById('card-extra');
  const extraList = document.getElementById('checklist-extra-items');
  
  if (cardExtra && extraItems.length > 0) {
    cardExtra.style.display = '';
    const labels = state.facilityTypes
      .map(id => FACILITY_TYPES.find(f => f.id === id))
      .filter(Boolean).map(f => f.label).join(', ');
    const labelEl = document.getElementById('extra-facility-label');
    if(labelEl) labelEl.textContent = labels;
    if(extraList) extraList.innerHTML = extraItems.map((d, i) => renderCheckItem(d, i, chk.extra || [], 'extra')).join('');
  } else if(cardExtra) {
    cardExtra.style.display = 'none';
  }
  lucide.createIcons();
}

function getExtraItems(catId) {
  const result = [];
  if(!Array.isArray(state.facilityTypes)) return result;
  state.facilityTypes.forEach(fid => {
    const items = FACILITY_EXTRA[fid] || [];
    items.filter(x => x.catId === catId).forEach(x => {
      if (!result.find(r => r.text === x.text)) result.push(x);
    });
  });
  return result;
}

function renderCheckItem(d, i, checkedArr, kind) {
  const isChecked = (checkedArr || []).includes(i);
  return `<div class="checklist-item level-${d.level} ${isChecked ? 'checked' : ''}"
               onclick="toggleCheck(${i}, '${kind}')">
    <div class="item-checkbox"><i data-lucide="x" class="item-checkbox-mark" style="width:12px;height:12px;"></i></div>
    <div class="item-body">
      <div class="item-text">${d.text}</div>
      <div class="item-desc">${d.desc}</div>
    </div>
    <span class="level-badge badge-${d.level}">${d.level}</span>
  </div>`;
}

function toggleCheck(idx, kind) {
  const cat  = CHECKLIST[state.step];
  if(!cat) return;
  if(!state.checks[cat.id]) state.checks[cat.id] = { common:[], extra:[], comment:'' };
  const chk  = state.checks[cat.id];
  const arr  = kind === 'extra' ? (chk.extra || (chk.extra=[])) : chk.common;
  const pos  = arr.indexOf(idx);
  if (pos === -1) arr.push(idx);
  else arr.splice(pos, 1);
  saveToStorage();
  renderChecklistStep(state.step);
}

function saveComment() {
  if (state.step < 0 || state.step >= CHECKLIST.length) return;
  const cat = CHECKLIST[state.step];
  if(!state.checks[cat.id]) state.checks[cat.id] = { common:[], extra:[], comment:'' };
  state.checks[cat.id].comment = document.getElementById('checklist-comment').value;
  saveToStorage();
}

function checklistPrev() {
  if (state.step > 0) goToStep(state.step - 1);
  else goToStep(-1);
}
function checklistNext() {
  if (state.step < CHECKLIST.length - 1) goToStep(state.step + 1);
  else goToStep(CHECKLIST.length);
}

/* ===== 결과 화면 ===== */
function renderResult() {
  let totalIssues = 0, crit = 0, major = 0, minor = 0;
  CHECKLIST.forEach(cat => {
    const chk = state.checks[cat.id] || { common:[], extra:[] };
    (chk.common || []).forEach(i => { 
      const d = cat.details[i]; 
      if(d){ 
        totalIssues++; 
        if(d.level==='Critical') crit++; 
        else if(d.level==='Major') major++; 
        else minor++; 
      } 
    });
    const ex = getExtraItems(cat.id);
    (chk.extra || []).forEach(i => { 
      const d = ex[i]; 
      if(d){ 
        totalIssues++; 
        if(d.level==='Critical') crit++; 
        else if(d.level==='Major') major++; 
        else minor++; 
      } 
    });
  });

  const totalPossible = CHECKLIST.reduce((s,c)=>s+(c.details ? c.details.length : 0),0);
  const score = totalPossible > 0 ? Math.max(0, Math.round((1 - totalIssues / Math.max(totalPossible,1)) * 100)) : 100;
  const verdict = score >= 90 ? {cls:'verdict-safe',txt:'양호',icon:'check-circle'} : score >= 70 ? {cls:'verdict-warn',txt:'주의 필요',icon:'alert-triangle'} : {cls:'verdict-danger',txt:'즉시 조치 필요',icon:'alert-circle'};
  const barColor = score >= 90 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444';

  let catCards = CHECKLIST.map((cat,idx) => {
    const chk = state.checks[cat.id] || { common:[], extra:[] };
    const ex  = getExtraItems(cat.id);
    const commonIssues = (chk.common || []).map(i => cat.details[i]).filter(Boolean);
    const extraIssues  = (chk.extra || []).map(i => ex[i]).filter(Boolean);
    const allIssues    = [...commonIssues, ...extraIssues];
    const hasC = allIssues.some(d => d.level==='Critical');
    
    const statusTxt  = allIssues.length === 0 ? `<span style="color:var(--minor)"><i data-lucide="check" style="width:14px;height:14px;display:inline-block;vertical-align:middle;"></i> 이상 없음</span>`
      : hasC ? `<span style="color:var(--critical)"><i data-lucide="alert-circle" style="width:14px;height:14px;display:inline-block;vertical-align:middle;"></i> ${allIssues.length}건 결함</span>`
             : `<span style="color:var(--major)"><i data-lucide="alert-triangle" style="width:14px;height:14px;display:inline-block;vertical-align:middle;"></i> ${allIssues.length}건 결함</span>`;
    
    const issueHtml = allIssues.length === 0
      ? `<div class="result-no-issue"><i data-lucide="check" style="width:14px;height:14px;display:inline-block;vertical-align:middle;"></i> 점검 이상 없음</div>`
      : allIssues.map(d=>`<div class="result-issue-item"><span class="level-badge badge-${d.level}">${d.level}</span><span>${d.text}</span></div>`).join('');
    
    const commentHtml = (chk.comment||'').trim()
      ? `<div class="result-comment"><i data-lucide="message-square" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> ${chk.comment}</div>` : '';
    
    return `<div class="result-cat-card">
      <div class="result-cat-header">
        <div class="result-cat-name"><i data-lucide="${cat.icon}" style="width:18px;height:18px;display:inline-block;vertical-align:middle;margin-right:6px;"></i> ${cat.category}</div>
        <div class="result-cat-status">${statusTxt}</div>
      </div>
      <div class="result-cat-issues">${issueHtml}</div>
      ${commentHtml}
    </div>`;
  }).join('');

  const facilityLabel = state.facilityTypes.length
    ? state.facilityTypes.map(id=>{const f=FACILITY_TYPES.find(x=>x.id===id);return f?f.label:'';}).join(' · ')
    : '미지정';

  // 규모 정보 요약
  const scaleSummary = [];
  if(state.meta.scale) {
    const st = state.meta.scale.tags;
    const si = state.meta.scale.input;
    if(si.areaM2) scaleSummary.push(`연면적: ${si.areaM2}㎡(${si.areaPy}평)`);
    else if(st.area) scaleSummary.push(`연면적 기준: ${st.area}`);
    if(si.floorsUp || si.floorsDown) scaleSummary.push(`층수: 지상 ${si.floorsUp} / 지하 ${si.floorsDown}`);
    if(si.capacity) scaleSummary.push(`수용인원: ${si.capacity}명`);
    if(st.special && st.special.length) scaleSummary.push(`특수조건: ${st.special.join(', ')}`);
  }

  const el = document.getElementById('section-result');
  if(!el) return;
  el.innerHTML = `
    <div class="section-header">
      <div class="section-header-icon"><i data-lucide="bar-chart-3" style="width:32px;height:32px;"></i></div>
      <div>
        <h2 class="section-title">점검 결과 보고서</h2>
        <p class="section-desc">${state.meta.facility} · ${state.meta.inspector} · ${state.meta.date}</p>
      </div>
    </div>
    <div class="score-wrap">
      <div class="score-num" style="color:${barColor}">${score}점</div>
      <div class="score-label">소방 안전 종합 점수</div>
      <div class="score-bar-wrap"><div class="score-bar-fill" style="width:${score}%;background:${barColor}"></div></div>
      <span class="score-verdict ${verdict.cls}"><i data-lucide="${verdict.icon}" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> ${verdict.txt}</span>
      <div style="font-size:.8rem;color:var(--text-muted);margin-top:12px;">시설 유형: ${facilityLabel}</div>
      <div style="font-size:.8rem;color:var(--text-muted);margin-top:4px;">시설 규모: ${scaleSummary.length ? scaleSummary.join(' · ') : '미기재'}</div>
    </div>
    <div class="result-summary-grid">
      <div class="result-stat-card stat-critical" onclick="showIssueDetail('Critical')"><div class="result-stat-num">${crit}</div><div class="result-stat-label">Critical</div></div>
      <div class="result-stat-card stat-major" onclick="showIssueDetail('Major')"><div class="result-stat-num">${major}</div><div class="result-stat-label">Major</div></div>
      <div class="result-stat-card stat-minor" onclick="showIssueDetail('Minor')"><div class="result-stat-num">${minor}</div><div class="result-stat-label">Minor</div></div>
      <div class="result-stat-card stat-total"><div class="result-stat-num">${totalIssues}</div><div class="result-stat-label">총 결함 수</div></div>
    </div>
    <div class="result-category-list">${catCards}</div>
    <div class="result-action-bar">
      <button class="btn btn-secondary" onclick="goToStep(CHECKLIST.length-1)"><i data-lucide="arrow-left"></i> 점검으로 돌아가기</button>
      <button class="btn btn-outline" onclick="window.print()"><i data-lucide="printer"></i> 인쇄</button>
      <button class="btn btn-success" onclick="exportPDF()"><i data-lucide="file-down"></i> PDF 저장</button>
      <button class="btn btn-secondary" onclick="resetAll()" style="color:var(--danger);border-color:var(--danger)"><i data-lucide="rotate-ccw"></i> 새 점검 시작</button>
    </div>`;
  lucide.createIcons();
}

/* ===== PDF 저장 ===== */
async function exportPDF() {
  const btn = document.querySelector('.btn-success');
  if(!btn) return;
  const originalHtml = btn.innerHTML;
  btn.textContent = 'PDF 생성 중...';
  btn.disabled = true;

  try {
    const target = document.getElementById('section-result');
    target.classList.add('pdf-export-mode');
    
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 500));

    const { jsPDF } = window.jspdf;
    
    // 1. 컨텐츠 캡처 (가장 안정적인 scale 2.0)
    const canvas = await html2canvas(target, { 
      scale: 2.0, 
      useCORS: true, 
      backgroundColor: '#ffffff',
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    
    // 2. 가로/세로 비율 및 축소 비율 계산
    const imgWidth_px = canvas.width;
    const imgHeight_px = canvas.height;
    
    // PDF 기본 가로: A4 기준 210mm
    const pdfWidth = 210; 
    
    // 80% 축소 적용 (여백 확보)
    const scaleFactor = 0.8; 
    const finalImgWidth = pdfWidth * scaleFactor;
    const finalImgHeight = (imgHeight_px * finalImgWidth) / imgWidth_px;
    
    // 축소된 이미지의 중앙 정렬을 위한 여백 계산
    const marginX = (pdfWidth - finalImgWidth) / 2;
    const marginY = 15; // 상단 여백 고정
    
    // 전체 PDF 높이 계산 (이미지 높이 + 상하 여백)
    const totalPdfHeight = finalImgHeight + (marginY * 2);

    // 3. 한 장짜리 PDF 생성
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [pdfWidth, totalPdfHeight]
    });

    // 4. 축소 및 중앙 정렬하여 이미지 삽입
    doc.addImage(imgData, 'PNG', marginX, marginY, finalImgWidth, finalImgHeight, undefined, 'NONE');

    const fname = `소방점검보고서_${state.meta.facility || '점검'}_${state.meta.date || ''}.pdf`;
    doc.save(fname);
    
    // 모달창 띄우기
    document.getElementById('modal-alert').style.display = 'flex';

  } catch(e) {
    alert('PDF 생성 중 오류가 발생했습니다: ' + e.message);
    console.error("PDF Export Error:", e);
  } finally {
    document.getElementById('section-result').classList.remove('pdf-export-mode');
    btn.innerHTML = originalHtml;
    btn.disabled = false;
    lucide.createIcons();
  }
}

/* ===== 모달 제어 ===== */
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function showIssueDetail(level) {
  const modal = document.getElementById('modal-issue-detail');
  const title = document.getElementById('issue-modal-title');
  const list = document.getElementById('issue-modal-list');
  
  title.textContent = `${level} 결함 상세 내역`;
  
  let html = '';
  let count = 0;

  CHECKLIST.forEach(cat => {
    const chk = state.checks[cat.id] || { common: [], extra: [] };
    
    // 공통 항목 필터링
    chk.common.forEach(idx => {
      const d = cat.details[idx];
      if (d && d.level === level) {
        count++;
        html += `
          <div class="issue-modal-item">
            <div class="issue-modal-cat">[${cat.category}]</div>
            <div class="issue-modal-text">${d.text}</div>
          </div>
        `;
      }
    });

    // 시설별 추가 항목 필터링
    const extraItems = getExtraItems(cat.id);
    (chk.extra || []).forEach(idx => {
      const d = extraItems[idx];
      if (d && d.level === level) {
        count++;
        html += `
          <div class="issue-modal-item">
            <div class="issue-modal-cat">[${cat.category} - 추가]</div>
            <div class="issue-modal-text">${d.text}</div>
          </div>
        `;
      }
    });
  });

  if (count === 0) {
    html = '<p style="text-align:center;padding:20px;color:var(--text-muted);">해당 등급의 결함 내역이 없습니다.</p>';
  }

  list.innerHTML = html;
  modal.style.display = 'flex';
}

/* ===== 네비게이션 ===== */
function goToMain() {
  goToStep(-1);
}

function resetAll() {
  document.getElementById('modal-confirm').style.display = 'flex';
}

function executeReset() {
  localStorage.removeItem('fss3_state');
  location.reload();
}
