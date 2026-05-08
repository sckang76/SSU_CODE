
document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('svg-host');
  const modal = document.getElementById('info-modal');
  const mTitle = document.getElementById('modal-title');
  const mDesc = document.getElementById('modal-desc');
  const mLaw = document.getElementById('modal-law');
  const mSearch = document.getElementById('modal-search');
  document.getElementById('close-modal-btn').onclick = () => modal.style.display = 'none';
  modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

  function showModal(name, desc, law) {
    mTitle.textContent = name;
    mDesc.textContent = desc;
    mLaw.textContent = law;
    mSearch.href = 'https://www.google.com/search?q=' + encodeURIComponent('소방 ' + name + ' NFSC');
    modal.style.display = 'flex';
    if (window.lucide) lucide.createIcons();
  }

  // P&ID Symbol helpers
  function gate(x, y, r) { // Gate valve symbol
    r = r||10;
    return `<path d="M${x-r} ${y-r} L${x+r} ${y+r} M${x-r} ${y+r} L${x+r} ${y-r} Z" fill="#0d1f35" stroke="#38bdf8" stroke-width="1.8"/>
    <rect x="${x-1.5}" y="${y-r-10}" width="3" height="10" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1"/>
    <path d="M${x-8} ${y-r-10} H${x+8}" stroke="#38bdf8" stroke-width="2"/>`;
  }
  function check(x, y) { // Check valve
    return `<path d="M${x-10} ${y} L${x+10} ${y} M${x} ${y-10} L${x+10} ${y} L${x} ${y+10}" fill="none" stroke="#38bdf8" stroke-width="1.8"/>`;
  }
  function pump(x, y) {
    return `<circle cx="${x}" cy="${y}" r="18" fill="#0d1f35" stroke="#38bdf8" stroke-width="2"/>
    <rect x="${x-28}" y="${y-10}" width="24" height="20" rx="2" fill="#0d1f35" stroke="#38bdf8" stroke-width="1.5"/>
    <path d="M${x-26} ${y-6} H${x-6} M${x-26} ${y} H${x-6} M${x-26} ${y+6} H${x-6}" stroke="#38bdf8" stroke-width="1" opacity=".5"/>
    <path d="M${x+6} ${y-8} L${x+16} ${y+8} M${x+6} ${y+8} L${x+16} ${y-8}" stroke="#38bdf8" stroke-width="1.8"/>`;
  }
  function tank(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#080f1e" stroke="#38bdf8" stroke-width="2"/>
    <path d="M${x} ${y+h*.3} H${x+w} M${x} ${y+h*.6} H${x+w}" stroke="#1e3a5f" stroke-width="1"/>
    <rect x="${x+w-8}" y="${y+4}" width="5" height="${h-8}" rx="2" fill="#0d1f35" stroke="#38bdf8" stroke-width="1"/>`;
  }
  function head(x, y) {
    return `<path d="M${x-10} ${y} L${x+10} ${y} L${x} ${y+18} Z" fill="#080f1e" stroke="#38bdf8" stroke-width="1.8"/>
    <rect x="${x-9}" y="${y+18}" width="18" height="3" fill="#38bdf8"/>
    <rect x="${x-2}" y="${y+5}" width="4" height="10" rx="2" fill="#ef4444"/>`;
  }
  function detector(x, y, col) {
    col = col||'#fbbf24';
    return `<circle cx="${x}" cy="${y}" r="12" fill="#080f1e" stroke="${col}" stroke-width="1.8"/>
    <path d="M${x-6} ${y} H${x+6} M${x} ${y-6} V${y+6}" stroke="${col}" stroke-width="1.2" opacity=".7"/>`;
  }
  function cylinder(x, y) {
    return `<rect x="${x-9}" y="${y-40}" width="18" height="70" rx="9" fill="#080f1e" stroke="#38bdf8" stroke-width="1.8"/>
    <rect x="${x-4}" y="${y-52}" width="8" height="14" fill="#38bdf8" rx="1"/>
    <circle cx="${x}" cy="${y-54}" r="7" fill="none" stroke="#38bdf8" stroke-width="1.5"/>`;
  }
  function panel(x, y) {
    return `<rect x="${x}" y="${y}" width="55" height="75" rx="5" fill="#080f1e" stroke="#38bdf8" stroke-width="2"/>
    <rect x="${x+6}" y="${y+6}" width="43" height="28" fill="#0d1f35" stroke="#1e3a5f" stroke-width="1"/>
    <rect x="${x+8}" y="${y+42}" width="9" height="9" fill="#ef4444" rx="1"/>
    <rect x="${x+23}" y="${y+42}" width="9" height="9" fill="#22c55e" rx="1"/>
    <rect x="${x+38}" y="${y+42}" width="9" height="9" fill="#fbbf24" rx="1"/>
    <path d="M${x+6} ${y+58} H${x+49} M${x+6} ${y+66} H${x+49}" stroke="#1e3a5f" stroke-width="1"/>`;
  }
  function fan(x, y) {
    return `<circle cx="${x}" cy="${y}" r="22" fill="#080f1e" stroke="#34d399" stroke-width="2"/>
    <path d="M${x} ${y-18} Q${x+15} ${y} ${x} ${y+18} Q${x-15} ${y} ${x} ${y-18}" fill="none" stroke="#34d399" stroke-width="1.5"/>
    <circle cx="${x}" cy="${y}" r="4" fill="#34d399"/>`;
  }
  function damper(x, y) {
    return `<rect x="${x-18}" y="${y-18}" width="36" height="36" fill="#080f1e" stroke="#34d399" stroke-width="1.8"/>
    <path d="M${x-14} ${y-10} H${x+14} M${x-14} ${y} H${x+14} M${x-14} ${y+10} H${x+14}" stroke="#34d399" stroke-width="2.5"/>
    <circle cx="${x}" cy="${y}" r="3" fill="#34d399"/>`;
  }
  function isa(x, y, tag, sub) {
    return `<circle cx="${x}" cy="${y}" r="12" class="isa-bubble"/>
    <text x="${x}" y="${y-1}" class="isa-text">${tag}</text>
    <text x="${x}" y="${y+7}" class="isa-text">${sub||''}</text>`;
  }
  function plus(x, y) {
    return `<circle cx="${x}" cy="${y}" r="9" class="plus-ring"/>
    <circle cx="${x}" cy="${y}" r="8" class="plus-bg"/>
    <text x="${x}" y="${y+3.5}" class="plus-sym">+</text>`;
  }
  function part(id, name, desc, law, content, lx, ly) {
    return `<g class="part" id="${id}" data-name="${name}" data-desc="${desc}" data-law="${law}">
      ${content}
      ${plus(lx, ly)}
      </g>`;
  }

  const SVG = `
<svg id="fire-system-svg" viewBox="-100 0 1200 1060" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr-water" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#00d4ff"/>
    </marker>
    <marker id="arr-gas" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#ff6b35"/>
    </marker>
    <marker id="arr-alarm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#fbbf24"/>
    </marker>
    <marker id="arr-smoke" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#34d399"/>
    </marker>
  </defs>

  <!-- Building outline -->
  <rect x="30" y="30" width="1040" height="950" rx="8" fill="none" stroke="#1e3a5f" stroke-width="1.5" stroke-dasharray="8,6"/>
  <!-- Floor dividers -->
  <line x1="30" y1="260" x2="1070" y2="260" stroke="#263c5a" stroke-width="2"/>
  <line x1="30" y1="500" x2="1070" y2="500" stroke="#263c5a" stroke-width="2"/>
  <line x1="30" y1="730" x2="1070" y2="730" stroke="#263c5a" stroke-width="2"/>

  <!-- ============================================ -->
  <!-- LEFT FLOOR LABEL COLUMN (outside building)  -->
  <!-- ============================================ -->

  <!-- Column background -->
  <rect x="-98" y="30" width="110" height="950" rx="6" fill="#080f1e" stroke="#1e3a5f" stroke-width="1.5"/>

  <!-- Column header -->
  <rect x="-98" y="30" width="110" height="30" rx="5" fill="#0d1f35"/>
  <text x="-43" y="50" fill="#4a6080" font-size="9" font-weight="900" font-family="monospace" text-anchor="middle">ZONE</text>

  <!-- Separator line between column and building -->
  <line x1="13" y1="30" x2="13" y2="980" stroke="#263c5a" stroke-width="2"/>

  <!-- 3F Zone label -->
  <rect x="-97" y="61" width="108" height="198" fill="rgba(255,107,53,.15)" rx="3"/>
  <line x1="-97" y1="61" x2="12" y2="61" stroke="#ff6b35" stroke-width="2" opacity=".6"/>
  <text x="-43" y="130" fill="#ff8c5a" font-size="26" font-weight="900" font-family="monospace" text-anchor="middle">3F</text>
  <text x="-43" y="155" fill="#c0785a" font-size="10" font-weight="700" font-family="monospace" text-anchor="middle">Gas /</text>
  <text x="-43" y="170" fill="#c0785a" font-size="10" font-weight="700" font-family="monospace" text-anchor="middle">Pre-action</text>

  <!-- 2F Zone label -->
  <rect x="-97" y="261" width="108" height="238" fill="rgba(0,212,255,.1)" rx="0"/>
  <line x1="-97" y1="261" x2="12" y2="261" stroke="#00d4ff" stroke-width="2" opacity=".6"/>
  <text x="-43" y="365" fill="#38bdf8" font-size="26" font-weight="900" font-family="monospace" text-anchor="middle">2F</text>
  <text x="-43" y="390" fill="#4a7a8a" font-size="10" font-weight="700" font-family="monospace" text-anchor="middle">Wet</text>
  <text x="-43" y="405" fill="#4a7a8a" font-size="10" font-weight="700" font-family="monospace" text-anchor="middle">Sprinkler</text>

  <!-- 1F Zone label -->
  <rect x="-97" y="501" width="108" height="228" fill="rgba(52,211,153,.1)" rx="0"/>
  <line x1="-97" y1="501" x2="12" y2="501" stroke="#34d399" stroke-width="2" opacity=".6"/>
  <text x="-43" y="600" fill="#34d399" font-size="26" font-weight="900" font-family="monospace" text-anchor="middle">1F</text>
  <text x="-43" y="625" fill="#3a7a6a" font-size="10" font-weight="700" font-family="monospace" text-anchor="middle">Hydrant /</text>
  <text x="-43" y="640" fill="#3a7a6a" font-size="10" font-weight="700" font-family="monospace" text-anchor="middle">Sprinkler</text>

  <!-- B1 Zone label -->
  <rect x="-97" y="731" width="108" height="248" fill="rgba(30,64,175,.2)" rx="3"/>
  <line x1="-97" y1="731" x2="12" y2="731" stroke="#3b82f6" stroke-width="2" opacity=".6"/>
  <text x="-43" y="840" fill="#60a5fa" font-size="26" font-weight="900" font-family="monospace" text-anchor="middle">B1</text>
  <text x="-43" y="865" fill="#3a5a9a" font-size="10" font-weight="700" font-family="monospace" text-anchor="middle">Pump /</text>
  <text x="-43" y="880" fill="#3a5a9a" font-size="10" font-weight="700" font-family="monospace" text-anchor="middle">Water</text>

  <!-- ============================================ -->
  <!-- BUILDING DIAGRAM                             -->
  <!-- ============================================ -->
  <!-- Floor zone tints (inside building) -->
  <rect x="31" y="31" width="1038" height="228" fill="rgba(255,107,53,.025)"/>
  <rect x="31" y="261" width="1038" height="238" fill="rgba(0,212,255,.02)"/>
  <rect x="31" y="501" width="1038" height="228" fill="rgba(52,211,153,.02)"/>
  <rect x="31" y="731" width="1038" height="248" fill="rgba(30,64,175,.04)"/>

  <!-- Remove all previous badges - left column handles labels now -->

  <!-- ========== WATER SYSTEM ========== -->
  <g class="sys-group active" id="g-water">
    <!-- Main vertical riser -->
    <line x1="200" y1="970" x2="200" y2="90" class="pipe-main" stroke="#00d4ff" stroke-width="5" marker-end="url(#arr-water)"/>
    <!-- B1 horizontal supply -->
    <line x1="80" y1="870" x2="200" y2="870" class="pipe-main" stroke="#1e3a5f"/>
    <!-- 1F branch -->
    <line x1="200" y1="620" x2="700" y2="620" class="pipe-branch" stroke="#1e3a5f" marker-end="url(#arr-water)"/>
    <!-- 2F branch -->
    <line x1="200" y1="390" x2="750" y2="390" class="pipe-branch" stroke="#1e3a5f" marker-end="url(#arr-water)"/>
    <!-- 3F branch -->
    <line x1="200" y1="190" x2="500" y2="190" class="pipe-branch" stroke="#1e3a5f" marker-end="url(#arr-water)"/>
    <!-- Flow animations -->
    <line x1="200" y1="970" x2="200" y2="90" class="flow-anim" stroke="#00d4ff" stroke-dashoffset="0"/>
    <line x1="80" y1="870" x2="200" y2="870" class="flow-anim" stroke="#00d4ff"/>
    <line x1="200" y1="620" x2="700" y2="620" class="flow-anim" stroke="#00d4ff"/>
    <line x1="200" y1="340" x2="750" y2="340" class="flow-anim" stroke="#00d4ff"/>

    ${part('p-tank','소화수조','지하 소화수조로 유효수량을 상시 확보합니다. 내진 설계 적용.','NFTC 102: 폐쇄형 헤드 기준 N×2.6㎥ 이상',
      tank(50,820,110,95) + `<text x="105" y="940" class="comp-label">소화수조</text>`, 155, 828)}

    ${part('p-pump','주펌프 (Fire Pump)','전동기 구동 원심펌프. 성능시험배관·순환배관 포함.','NFTC 102: 체절운전 시 정격토출압 140% 이하',
      pump(220,880) + `<text x="220" y="920" class="comp-label">주펌프</text>` + isa(260,865,'PS','L'), 240, 865)}

    ${part('p-jockey','기동용 압력챔버','배관 내 압력변동 감지 → 펌프 자동 기동.','NFTC 102: 용적 100L 이상, PS 2개소',
      `<rect x="290" y="830" width="30" height="80" rx="15" fill="#080f1e" stroke="#38bdf8" stroke-width="1.8"/>
      <path d="M290 855 H320 M290 880 H320" stroke="#38bdf8" stroke-width="1" opacity=".5"/>` +
      isa(305,825,'PC','') + `<text x="305" y="928" class="comp-label">압력챔버</text>`, 322, 828)}

    ${part('p-av','알람밸브 (AV)','습식 유수검지장치. 리타딩챔버·경보스위치 포함.','NFTC 103: 유수검지장치는 바닥에서 0.8~1.5m 설치',
      gate(330,390) + check(415,390) + isa(372,365,'FS','AV') +
      `<text x="372" y="420" class="comp-label">알람밸브</text>`, 435, 370)}

    ${part('p-head1','스프링클러 헤드 (2F 폐쇄형)','72°C 감열체 파괴 시 자동 살수. 하향식 표준형.','NFTC 103: 헤드간격 2.3m 이하, 헤드 반경 R 준수',
      head(600,380) + head(680,380) + head(760,380) +
      `<text x="680" y="420" class="comp-label">폐쇄형 헤드 (2F)</text>`, 800, 368)}

    ${part('p-hydrant','옥내소화전 (1F)','로비·복도에 설치된 옥내소화전 함입니다. 호스·관창 포함.','NFTC 102: 수평거리 25m 이하, 방수압 0.17MPa↑ 방수량 130L/min↑',
      `<rect x="280" y="590" width="30" height="48" rx="3" fill="#080f1e" stroke="#ef4444" stroke-width="2"/>
      <circle cx="295" cy="603" r="8" fill="none" stroke="#ef4444" stroke-width="1.5"/>
      <path d="M295 611 V620" stroke="#ef4444" stroke-width="2"/>
      <rect x="285" y="621" width="20" height="5" fill="#ef4444" rx="1"/>` +
      `<text x="295" y="655" class="comp-label">옥내소화전</text>`, 310, 593)}

    ${part('p-head1f','스프링클러 헤드 (1F 폐쇄형)','1층 로비 천장 설치 헤드. 측벽형 적용 가능.','NFTC 103: 측벽형 헤드 수평거리 3.6m 이하',
      head(450,610) + head(530,610) + head(610,610) +
      `<text x="530" y="648" class="comp-label">폐쇄형 헤드 (1F)</text>`, 630, 598)}

    <!-- PRV (moved to y=155, above 3F water branch at y=190) -->
    ${part('p-prv','감압밸브 (PRV)','고층부 배관 과압 방지를 위한 감압장치.','NFTC 102: 방사압 0.1~1.2MPa 범위 유지',
      gate(200,155) + isa(200,130,'PCV','') + `<text x="200" y="185" class="comp-label">PRV</text>`, 220, 130)}
  </g>

  <!-- ========== GAS SYSTEM ========== -->
  <g class="sys-group active" id="g-gas">
    <!-- Gas riser at x=820 to avoid cylinder at x=800 -->
    <line x1="820" y1="450" x2="820" y2="70" class="pipe-main" stroke="#ff6b35" stroke-width="4" marker-end="url(#arr-gas)"/>
    <line x1="850" y1="150" x2="1000" y2="150" class="pipe-branch" stroke="#ff6b35" stroke-width="3" marker-end="url(#arr-gas)"/>
    <line x1="820" y1="450" x2="820" y2="70" class="flow-anim" stroke="#ff6b35"/>
    <line x1="850" y1="150" x2="1000" y2="150" class="flow-anim" stroke="#ff6b35"/>

    ${part('p-cyl','소화약제 저장용기','CO₂ 또는 HFC-227ea 고압 용기. 기동용 가스용기 별도.','NFTC 107: CO₂ 충전비 고압식 1.5 이상',
      cylinder(750,490) + cylinder(790,490) + cylinder(830,490) +
      `<circle cx="865" cy="470" r="10" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>
      <text x="800" y="530" class="comp-label">저장용기</text>`, 860, 455)}

    ${part('p-sv','선택밸브 (SV)','방호구역별 약제 방출 경로 제어.','NFTC 107: 방호구역마다 1개 이상, 명확한 표식',
      gate(820,350) + isa(820,325,'XV','SV') + `<text x="820" y="380" class="comp-label">선택밸브</text>`, 842, 328)}

    ${part('p-gnozzle','가스 방출헤드','약제를 방호구역 내 균일하게 방사.','NFTC 107: 설계농도 95% 이상, 10초 이내 방사',
      `<path d="M950 130 L940 165 M950 130 L960 165 M935 165 H965" stroke="#ff6b35" stroke-width="2.5"/>
      <circle cx="950" cy="128" r="6" fill="#080f1e" stroke="#ff6b35" stroke-width="1.5"/>
      <text x="950" y="185" class="comp-label">방출헤드</text>`, 965, 120)}

    ${part('p-abort','방출지연 스위치','비상 정지 시 30초 방출 지연.','NFTC 107: 방호구역 출입구 부근 설치',
      `<rect x="980" y="70" width="36" height="50" rx="4" fill="#080f1e" stroke="#ff6b35" stroke-width="1.5"/>
      <circle cx="998" cy="90" r="8" fill="#ef4444"/>
      <text x="998" y="138" class="comp-label">지연스위치</text>`, 1012, 75)}
  </g>

  <!-- ========== ALARM SYSTEM ========== -->
  <g class="sys-group active" id="g-alarm">
    <!-- Signal lines: vertical trunk + floor branches -->
    <line x1="500" y1="960" x2="500" y2="60" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9" marker-end="url(#arr-alarm)"/>
    <!-- 3F alarm branch (y=95, top of 3F zone, clear of water branch at y=190) -->
    <line x1="500" y1="95" x2="750" y2="95" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <!-- 2F alarm branches (y=355 and y=435, avoid water pipe at y=390) -->
    <line x1="500" y1="300" x2="750" y2="300" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <line x1="500" y1="360" x2="750" y2="360" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <!-- 1F alarm branch -->
    <line x1="500" y1="600" x2="750" y2="600" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <!-- B1 alarm branch -->
    <line x1="500" y1="880" x2="700" y2="880" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <!-- Glow layer -->
    <line x1="500" y1="960" x2="500" y2="60" stroke="#fbbf24" stroke-width="5" stroke-dasharray="8,6" opacity=".12"/>
    <!-- Animated signal pulse -->
    <line x1="500" y1="960" x2="500" y2="60" class="flow-anim" stroke="#fbbf24" style="animation-duration:7s;animation-direction:reverse"/>

    ${part('p-panel','통합형 수신기 (R형)','디지털 통신 기반 수신기. 구역 표시, 제어, 기록 기능 통합.','NFTC 203: 상시 사람이 근무하는 곳, 바닥에서 0.8~1.5m',
      panel(470,780) + `<text x="497" y="873" class="comp-label">통합수신기</text>`, 520, 785)}

    ${part('p-det-3f','연기감지기 (3F — 이온화식)','가스 방호구역 내 감지기. 교차회로 구성으로 오작동 방지.','NFTC 107: 가스계 방호구역 내 교차회로 감지기 설치 필수',
      detector(600,95,'#fbbf24') + detector(680,95,'#fbbf24') +
      `<text x="640" y="125" class="comp-label">이온화식 (3F)</text>`, 700, 83)}

    ${part('p-det-1f','연기감지기 (1F — 광전식)','로비·현관 연기 감지. 광전식으로 층간 확산 연기 조기 감지.','NFTC 203: 광전식 감지기는 복도·통로에 설치 권장',
      detector(600,600,'#fbbf24') + detector(680,600,'#fbbf24') + detector(760,600,'#fbbf24') +
      `<text x="680" y="632" class="comp-label">광전식 (1F)</text>`, 780, 588)}

    ${part('p-det-b1','열감지기 (B1 — 정온식 특종)','펌프실·기계실 전용 정온식 감지기. 고온 환경에 적합.','NFTC 203: 기계실·보일러실은 정온식 특종 또는 1종 설치',
      detector(600,880,'#ef4444') + detector(680,880,'#ef4444') +
      `<text x="640" y="912" class="comp-label">정온식 특종 (B1)</text>`, 700, 868)}

    ${part('p-det-smoke','연기감지기 (2F — 이온화식)','미세 연기 입자 감지. 2층 사무실 설치.','NFTC 203: 부착높이 4m 이상 시 1종 또는 2종 감지기',
      detector(560,360,'#fbbf24') + detector(630,360,'#fbbf24') + detector(700,360,'#fbbf24') +
      `<text x="630" y="393" class="comp-label">이온화식 (2F)</text>`, 720, 348)}

    ${part('p-det-heat','열감지기 (2F — 차동식)','차동식 열감지기. 온도 급상승 시 동작.','NFTC 203: 일반 사무실 바닥면적 50㎡ 이하마다 1개',
      detector(560,300,'#fbbf24') + detector(630,300,'#fbbf24') +
      `<text x="595" y="330" class="comp-label">차동식 (2F)</text>`, 645, 288)}

    ${part('p-bell','발신기·경종 세트','수동 발신기 + 음향경보기. 층별 설치.','NFTC 203: 보행거리 25m 이하마다 1개, 음량 90dB↑',
      `<rect x="830" y="345" width="36" height="55" rx="3" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>
      <circle cx="848" cy="363" r="8" fill="#fff"/>
      <circle cx="848" cy="385" r="7" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>
      <text x="848" y="418" class="comp-label">발신기</text>`, 860, 352)}
  </g>

  <!-- ========== SMOKE / EVAC SYSTEM ========== -->
  <g class="sys-group active" id="g-smoke">
    <line x1="60" y1="260" x2="60" y2="80" class="pipe-main" stroke="#34d399" stroke-width="5" marker-end="url(#arr-smoke)"/>
    <line x1="60" y1="370" x2="320" y2="370" class="pipe-branch" stroke="#34d399" stroke-width="4" marker-end="url(#arr-smoke)"/>
    <line x1="60" y1="260" x2="60" y2="80" class="flow-anim" stroke="#34d399"/>
    <line x1="60" y1="370" x2="320" y2="370" class="flow-anim" stroke="#34d399"/>

    ${part('p-fan','제연송풍기 (급기)','비상계단 급기 가압. 방연풍속 0.7m/s 이상 확보.','NFTC 501: 급기량 설계 계산, 차압 40~60Pa 유지',
      fan(60,350) + `<text x="60" y="395" class="comp-label">제연팬</text>`, 85, 335)}

    ${part('p-damper','자동폐쇄 방화댐퍼 (FD)','화재 시 72°C 퓨즈 용융 → 자동 폐쇄.','NFTC 501: 덕트 관통부마다 설치, 성능인증제품',
      damper(160,370) + isa(160,338,'FD','') + `<text x="160" y="420" class="comp-label">방화댐퍼</text>`, 182, 343)}

    ${part('p-vd','배기댐퍼 (VD)','연기 배출구. 제연구역 천장 설치.','NFTC 501: 배출량 1시간 기준 5회 이상',
      damper(280,370) + isa(280,338,'VD','') + `<text x="280" y="420" class="comp-label">배기댐퍼</text>`, 302, 343)}

    ${part('p-sign','피난유도등 (통로형)','상시 점등. 비상전원 20분 이상 확보.','NFTC 301: 구부러진 모퉁이 및 보행거리 20m마다 설치',
      `<rect x="320" y="355" width="70" height="28" rx="5" fill="#080f1e" stroke="#22c55e" stroke-width="2"/>
      <path d="M330 356 L330 383 M330 369 H365" stroke="#22c55e" stroke-width="2.5"/>
      <path d="M355 362 L368 369 L355 376 Z" fill="#22c55e"/>
      <text x="355" y="400" class="comp-label">피난유도등</text>`, 388, 358)}

    ${part('p-esc','비상계단 가압구역','제연팬 → 급기덕트 → 비상계단 가압.','NFTC 501: 계단실 차압 40Pa↑, 방연풍속 확보',
      `<rect x="42" y="155" width="30" height="100" rx="4" fill="rgba(52,211,153,.07)" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="80" y="195" fill="#34d399" font-size="10" font-weight="700" font-family="monospace">비상계단</text>
      <text x="80" y="210" fill="#34d399" font-size="10" font-weight="700" font-family="monospace">가압구역</text>`, 75, 165)}
  </g>

  <!-- P&ID Standard Watermark -->
  <text x="500" y="1045" fill="rgba(255,255,255,0.85)" font-size="13" font-weight="700" font-family="'Pretendard Variable','Pretendard',sans-serif" text-anchor="middle">국제 표준 P&amp;ID 기호 적용 (ISA-5.1 / NFPA 170)</text>

</svg>`;

  host.innerHTML = SVG;

  // Attach click handlers
  document.querySelectorAll('.part').forEach(el => {
    el.addEventListener('click', () => {
      showModal(
        el.dataset.name,
        el.dataset.desc,
        el.dataset.law
      );
      if (window.lucide) lucide.createIcons();
    });
  });

  // Tab filter highlight
  const titleMap = {
    all: '건물 통합 소방 계통도 — Full Building P&ID View',
    water: '수계 소화설비 계통 강조 보기',
    gas: '가스계 소화설비 계통 강조 보기',
    alarm: '경보·제어 설비 계통 강조 보기',
    smoke: '제연 및 피난 설비 계통 강조 보기'
  };
  const catMap = { water:'g-water', gas:'g-gas', alarm:'g-alarm', smoke:'g-smoke' };

  document.querySelectorAll('.step-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.step-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const cat = dot.dataset.cat;
      document.getElementById('sys-title').textContent = titleMap[cat] || '';
      const groups = document.querySelectorAll('.sys-group');
      if (cat === 'all') {
        groups.forEach(g => { g.classList.remove('dimmed'); g.classList.add('active'); });
      } else {
        const target = catMap[cat];
        groups.forEach(g => {
          if (g.id === target) { g.classList.remove('dimmed'); g.classList.add('active'); }
          else { g.classList.add('dimmed'); g.classList.remove('active'); }
        });
      }
    });
  });
});
