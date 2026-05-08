
document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('svg-host');
  const modal = document.getElementById('info-modal');
  const mTitle = document.getElementById('modal-title');
  const mDesc = document.getElementById('modal-desc');
  const mLaw = document.getElementById('modal-law');
  const mSearch = document.getElementById('modal-search');
  document.getElementById('close-modal-btn').onclick = () => modal.style.display = 'none';
  modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

  function showModal(name, desc, law, calcIds) {
    mTitle.textContent = name;
    mDesc.textContent = desc;
    mLaw.textContent = law;
    mSearch.href = 'https://www.google.com/search?q=' + encodeURIComponent('소방 ' + name + ' NFSC');
    const calcSection  = document.getElementById('calc-section');
    const calcCardsRow = document.getElementById('calc-cards-row');
    const inlinePanel  = document.getElementById('inline-calc-panel');
    if (inlinePanel) { inlinePanel.innerHTML = ''; inlinePanel.classList.remove('open'); }
    if (calcIds && calcIds.length && calcSection && calcCardsRow) {
      calcCardsRow.innerHTML = calcIds.map(cid => {
        const c = CALCS[cid]; if (!c) return '';
        return `<div class="calc-card" onclick="openInlineCalc('${cid}',this)">
          <div class="calc-card-label">${c.label}</div>
          <div class="calc-card-formula">${c.formula}</div>
          <button class="calc-card-btn">계산하기 →</button>
        </div>`;
      }).join('');
      calcSection.style.display = '';
    } else if (calcSection) {
      calcSection.style.display = 'none';
    }
    modal.style.display = 'flex';
    if (window.lucide) lucide.createIcons();
  }

  window.openInlineCalc = function(cid, cardEl) {
    const c = CALCS[cid]; if (!c) return;
    document.querySelectorAll('.calc-card').forEach(el => el.classList.remove('active'));
    if (cardEl) cardEl.classList.add('active');
    const panel = document.getElementById('inline-calc-panel');
    panel.innerHTML = `
      <div class="inline-calc-title">${c.label}</div>
      <div class="inline-calc-formula">${c.formula}</div>
      <div class="inline-calc-inputs">${c.inputs.map(inp =>
        `<div class="inline-input-row">
          <label>${inp.label}</label>
          <input type="number" id="ic_${inp.id}" value="${inp.val}" step="any" oninput="runInlineCalc('${cid}')">
        </div>`).join('')}
      </div>
      <div class="inline-calc-result">
        <span class="inline-result-label">결과</span>
        <span id="inline-result-val">—</span>
        <span class="inline-unit">${c.unit}</span>
      </div>`;
    panel.classList.add('open');
    window.runInlineCalc(cid);
  };

  window.runInlineCalc = function(cid) {
    const c = CALCS[cid]; if (!c) return;
    const v = {};
    c.inputs.forEach(inp => { v[inp.id] = parseFloat(document.getElementById('ic_' + inp.id)?.value) || 0; });
    try {
      const r = c.fn(v);
      const el = document.getElementById('inline-result-val');
      if (el) el.textContent = isNaN(r) ? 'Error' : r.toLocaleString(undefined, { maximumFractionDigits: 3 });
    } catch(e) {
      const el = document.getElementById('inline-result-val');
      if (el) el.textContent = 'Error';
    }
  };

  // P&ID Symbol helpers
  function gate(x, y, r) { // Gate valve symbol
    r = r||5;
    return `<path d="M${x-r} ${y-r} L${x+r} ${y+r} M${x-r} ${y+r} L${x+r} ${y-r} Z" fill="#0d1f35" stroke="#38bdf8" stroke-width="1.8"/>
    <rect x="${x-1}" y="${y-r-6}" width="2" height="6" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1"/>
    <path d="M${x-5} ${y-r-6} H${x+5}" stroke="#38bdf8" stroke-width="2"/>`;
  }
  function check(x, y) { // Check valve
    return `<path d="M${x-10} ${y} L${x+10} ${y} M${x} ${y-10} L${x+10} ${y} L${x} ${y+10}" fill="none" stroke="#38bdf8" stroke-width="1.8"/>`;
  }
  function pump(x, y) {
    return `<circle cx="${x}" cy="${y}" r="18" fill="#0d1f35" stroke="#38bdf8" stroke-width="2"/>
    <rect x="${x-28}" y="${y-10}" width="24" height="20" rx="2" fill="#0d1f35" stroke="#38bdf8" stroke-width="1.5"/>
    <path d="M${x-26} ${y-6} H${x-6} M${x-26} ${y} H${x-6} M${x-26} ${y+6} H${x-6}" stroke="#38bdf8" stroke-width="1" opacity=".5"/>
    <path d="M${x+8.5} ${y-4} L${x+13.5} ${y+4} M${x+8.5} ${y+4} L${x+13.5} ${y-4}" stroke="#38bdf8" stroke-width="1.8"/>`;
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

  // ── 계산식 정의 ──────────────────────────────────────────
  const CALCS = {
    kfactor:          { label:'K-factor 방수량', formula:'Q = K × √P', unit:'L/min',
      inputs:[{id:'kf',label:'K-factor (L/min/bar⁰·⁵)',val:80},{id:'pbar',label:'방수압력 (bar)',val:1.0}],
      fn: v => v.kf * Math.sqrt(v.pbar) },
    pumphead:         { label:'전양정 (H)', formula:'H = h_f + h_m + Δz', unit:'m',
      inputs:[{id:'hf',label:'마찰손실 수두 h_f (m)',val:20},{id:'hm',label:'부차적 손실 h_m (m)',val:5},{id:'dz',label:'높이 차이 Δz (m)',val:15}],
      fn: v => v.hf + v.hm + v.dz },
    motor_power:      { label:'펌프 모터 동력 (P)', formula:'P = γQH / (102 × η)', unit:'kW',
      inputs:[{id:'pp_q',label:'유량 Q (m³/min)',val:1.6},{id:'pp_h',label:'전양정 H (m)',val:100},{id:'pp_eta',label:'효율 η',val:0.65}],
      fn: v => { const Qms=v.pp_q/60; return (9800*Qms*v.pp_h)/(102*v.pp_eta*9.81); } },
    hydrant_water:    { label:'소화전 수원량 (V)', formula:'V = Q × N × t / 1000', unit:'m³',
      inputs:[{id:'hw_q',label:'방수량 Q (L/min)',val:130},{id:'hw_n',label:'동시 소화전수 N',val:2},{id:'hw_t',label:'방수시간 t (min)',val:20}],
      fn: v => v.hw_q*v.hw_n*v.hw_t/1000 },
    sprinkler_water:  { label:'스프링클러 수원량 (V)', formula:'V = Q × N × t / 1000', unit:'m³',
      inputs:[{id:'sw_q',label:'방수량 Q (L/min)',val:80},{id:'sw_n',label:'동시 헤드수 N',val:10},{id:'sw_t',label:'방수시간 t (min)',val:20}],
      fn: v => v.sw_q*v.sw_n*v.sw_t/1000 },
    co2agent:         { label:'CO₂ 약제량 (W)', formula:'W = V × q × 안전계수', unit:'kg',
      inputs:[{id:'co2_v',label:'방호구역 체적 V (m³)',val:200},{id:'co2_f',label:'포화량계수 q (kg/m³)',val:0.7},{id:'co2_s',label:'안전계수',val:1.2}],
      fn: v => v.co2_v*v.co2_f*v.co2_s },
    detector_count:   { label:'감지기 설치 개수 (N)', formula:'N = ⌈ A_실 / A_감지 ⌉', unit:'개',
      inputs:[{id:'det_area',label:'바닥면적 A (m²)',val:300},{id:'det_cov',label:'감지기 감지면적 (m²)',val:150}],
      fn: v => Math.ceil(v.det_area/Math.max(v.det_cov,1)) },
    discharge_int:    { label:'방사강도 (I)', formula:'I = Q / A', unit:'L/min/m²',
      inputs:[{id:'di_q',label:'방사량 Q (L/min)',val:800},{id:'di_a',label:'방사면적 A (m²)',val:40}],
      fn: v => v.di_q/Math.max(v.di_a,0.01) },
    battery_cap:      { label:'축전지 용량 (C)', formula:'C = (P/V) × (t/60) / η', unit:'Ah',
      inputs:[{id:'bat_p',label:'부하 전력 P (W)',val:50},{id:'bat_t',label:'유지시간 t (min)',val:10},{id:'bat_v',label:'전압 V (V)',val:24},{id:'bat_e',label:'방전효율 η',val:0.8}],
      fn: v => (v.bat_p/v.bat_v)*(v.bat_t/60)/v.bat_e }
  };

  // ── 부품 ID → 계산식 매핑 ────────────────────────────────
  const CALC_MAP = {
    'p-pump':         ['pumphead','motor_power','kfactor'],
    'p-jockey':       ['pumphead','kfactor'],
    'p-tank':         ['hydrant_water','sprinkler_water'],
    'p-av':           ['kfactor'],
    'p-head1':        ['kfactor','sprinkler_water'],
    'p-head1f':       ['kfactor','sprinkler_water'],
    'p-head3f':       ['kfactor','sprinkler_water'],
    'p-prv':          ['kfactor'],
    'p-hydrant':      ['hydrant_water','kfactor'],
    'p-hydrant-2f':   ['hydrant_water','kfactor'],
    'p-hydrant-3f':   ['hydrant_water','kfactor'],
    'p-hydrant-b1':   ['hydrant_water','kfactor'],
    'p-cyl':          ['co2agent'],
    'p-gnozzle':      ['discharge_int'],
    'p-panel':        ['battery_cap','detector_count'],
    'p-det-3f':       ['detector_count'],
    'p-det-1f':       ['detector_count'],
    'p-det-b1':       ['detector_count'],
    'p-det-smoke':    ['detector_count'],
    'p-det-heat':     ['detector_count'],
    'p-bell-alarm-3f':['detector_count'],
    'p-bell-alarm-2f':['detector_count'],
    'p-bell-alarm-1f':['detector_count'],
    'p-bell-alarm-b1':['detector_count'],
    'p-fan':          ['motor_power'],
    'p-fan-1f':       ['motor_power'],
  };

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
    <line x1="80" y1="870" x2="200" y2="870" class="pipe-main" stroke="#00d4ff" opacity=".55"/>
    <!-- 1F branch -->
    <line x1="200" y1="620" x2="700" y2="620" class="pipe-branch" stroke="#00d4ff" opacity=".55" marker-end="url(#arr-water)"/>
    <!-- 2F branch -->
    <line x1="200" y1="390" x2="750" y2="390" class="pipe-branch" stroke="#00d4ff" opacity=".55" marker-end="url(#arr-water)"/>
    <!-- 3F branch -->
    <line x1="200" y1="190" x2="500" y2="190" class="pipe-branch" stroke="#00d4ff" opacity=".55" marker-end="url(#arr-water)"/>
    <!-- Flow animations -->
    <line x1="200" y1="970" x2="200" y2="90" class="flow-anim" stroke="#00d4ff" stroke-dashoffset="0"/>
    <line x1="80" y1="870" x2="200" y2="870" class="flow-anim" stroke="#00d4ff"/>
    <line x1="200" y1="620" x2="700" y2="620" class="flow-anim" stroke="#00d4ff"/>
    <line x1="200" y1="390" x2="750" y2="390" class="flow-anim" stroke="#00d4ff"/>
    <line x1="200" y1="190" x2="500" y2="190" class="flow-anim" stroke="#00d4ff"/>

    <!-- ── 옥내소화전 수계 배관 스텁 연결 ── -->
    <!-- 3F: 분기(y=190) → 소화전(y=108) 수직 스텁 -->
    <line x1="295" y1="108" x2="295" y2="190" stroke="#00d4ff" stroke-width="2" opacity=".55"/>
    <line x1="295" y1="190" x2="295" y2="108" class="flow-anim" stroke="#00d4ff" style="animation-duration:8s;animation-direction:reverse"/>
    <!-- 2F: 분기(y=390) → 소화전(y=445) 수직 스텁 -->
    <line x1="295" y1="390" x2="295" y2="445" stroke="#00d4ff" stroke-width="2" opacity=".55"/>
    <line x1="295" y1="390" x2="295" y2="445" class="flow-anim" stroke="#00d4ff" style="animation-duration:8s;"/>
    <!-- 1F: 분기(y=620) → 소화전(y=590) 수직 스텁 -->
    <line x1="295" y1="590" x2="295" y2="620" stroke="#00d4ff" stroke-width="2" opacity=".55"/>
    <line x1="295" y1="620" x2="295" y2="590" class="flow-anim" stroke="#00d4ff" style="animation-duration:8s;animation-direction:reverse"/>
    <!-- B1: 수직 라이저(x=200) → 소화전(x=380) 수평 스텁 + 수직 연결 -->
    <line x1="200" y1="840" x2="380" y2="840" stroke="#00d4ff" stroke-width="2" opacity=".55"/>
    <line x1="380" y1="810" x2="380" y2="840" stroke="#00d4ff" stroke-width="2" opacity=".55"/>
    <line x1="200" y1="840" x2="380" y2="840" class="flow-anim" stroke="#00d4ff" style="animation-duration:8s;"/>
    <line x1="380" y1="840" x2="380" y2="810" class="flow-anim" stroke="#00d4ff" style="animation-duration:8s;animation-direction:reverse"/>

    <!-- PS 스텁 제거됨 - 발신기가 옥내소화전 옆에 붙어 직접 연결 -->

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

    ${part('p-hydrant','옥내소화전+발신기 (1F)','옥내소화전과 발신기가 함께 설치. 소화전 사용 전 발신기 조작으로 경보 발령.','NFTC 102: 수평거리 25m 이하, 방수압 0.17MPa↑ 방수량 130L/min↑',
      `<rect x="280" y="590" width="30" height="48" rx="3" fill="#080f1e" stroke="#ef4444" stroke-width="2"/>
      <circle cx="295" cy="603" r="8" fill="none" stroke="#ef4444" stroke-width="1.5"/>
      <path d="M295 611 V620" stroke="#ef4444" stroke-width="2"/>
      <rect x="285" y="621" width="20" height="5" fill="#ef4444" rx="1"/>
      <rect x="313" y="592" width="18" height="30" rx="2" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <circle cx="322" cy="602" r="4" fill="#fff"/>
      <circle cx="322" cy="615" r="3.5" fill="#ef4444" stroke="#fff" stroke-width="1"/>` +
      `<text x="306" y="655" class="comp-label">소화전+발신기 (1F)</text>`, 332, 593)}

    ${part('p-hydrant-2f','옥내소화전+발신기 (2F)','옥내소화전과 발신기가 함께 설치. 소화전 사용 전 발신기 조작으로 경보 발령.','NFTC 102: 수평거리 25m 이하, 방수압 0.17MPa↑ 방수량 130L/min↑',
      `<rect x="280" y="445" width="30" height="48" rx="3" fill="#080f1e" stroke="#ef4444" stroke-width="2"/>
      <circle cx="295" cy="458" r="8" fill="none" stroke="#ef4444" stroke-width="1.5"/>
      <path d="M295 466 V475" stroke="#ef4444" stroke-width="2"/>
      <rect x="285" y="476" width="20" height="5" fill="#ef4444" rx="1"/>
      <rect x="313" y="447" width="18" height="30" rx="2" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <circle cx="322" cy="457" r="4" fill="#fff"/>
      <circle cx="322" cy="470" r="3.5" fill="#ef4444" stroke="#fff" stroke-width="1"/>` +
      `<text x="306" y="510" class="comp-label">소화전+발신기 (2F)</text>`, 332, 448)}

    ${part('p-hydrant-3f','옥내소화전+발신기 (3F)','옥내소화전과 발신기가 함께 설치. 소화전 사용 전 발신기 조작으로 경보 발령.','NFTC 102: 수평거리 25m 이하, 방수압 0.17MPa↑ 방수량 130L/min↑',
      `<rect x="280" y="60" width="30" height="48" rx="3" fill="#080f1e" stroke="#ef4444" stroke-width="2"/>
      <circle cx="295" cy="73" r="8" fill="none" stroke="#ef4444" stroke-width="1.5"/>
      <path d="M295 81 V90" stroke="#ef4444" stroke-width="2"/>
      <rect x="285" y="91" width="20" height="5" fill="#ef4444" rx="1"/>
      <rect x="313" y="62" width="18" height="30" rx="2" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <circle cx="322" cy="72" r="4" fill="#fff"/>
      <circle cx="322" cy="85" r="3.5" fill="#ef4444" stroke="#fff" stroke-width="1"/>` +
      `<text x="306" y="125" class="comp-label">소화전+발신기 (3F)</text>`, 332, 63)}

    ${part('p-hydrant-b1','옥내소화전+발신기 (B1)','옥내소화전과 발신기가 함께 설치. 소화전 사용 전 발신기 조작으로 경보 발령.','NFTC 102: 수평거리 25m 이하, 방수압 0.17MPa↑ 방수량 130L/min↑',
      `<rect x="380" y="810" width="30" height="48" rx="3" fill="#080f1e" stroke="#ef4444" stroke-width="2"/>
      <circle cx="395" cy="823" r="8" fill="none" stroke="#ef4444" stroke-width="1.5"/>
      <path d="M395 831 V840" stroke="#ef4444" stroke-width="2"/>
      <rect x="385" y="841" width="20" height="5" fill="#ef4444" rx="1"/>
      <rect x="413" y="812" width="18" height="30" rx="2" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <circle cx="422" cy="822" r="4" fill="#fff"/>
      <circle cx="422" cy="835" r="3.5" fill="#ef4444" stroke="#fff" stroke-width="1"/>` +
      `<text x="400" y="875" class="comp-label">소화전+발신기 (B1)</text>`, 432, 813)}

    ${part('p-head1f','스프링클러 헤드 (1F 폐쇄형)','1층 로비 천장 설치 헤드. 측벽형 적용 가능.','NFTC 103: 측벽형 헤드 수평거리 3.6m 이하',
      head(450,610) + head(530,610) + head(610,610) +
      `<text x="530" y="648" class="comp-label">폐쇄형 헤드 (1F)</text>`, 630, 598)}

    <!-- PRV (moved to y=155, above 3F water branch at y=190) -->
    ${part('p-prv','감압밸브 (PRV)','고층부 배관 과압 방지를 위한 감압장치.','NFTC 102: 방사압 0.1~1.2MPa 범위 유지',
      gate(200,155) + isa(200,130,'PCV','') + `<text x="200" y="185" class="comp-label">PRV</text>`, 220, 130)}

    ${part('p-head3f','스프링클러 헤드 (3F 개방형)','Pre-action 연동 개방형 헤드. 가스계 연동 방출 시 살수.','NFTC 103: Pre-action 설비는 개방형 헤드 적용, 교차회로 감지기와 연동',
      head(300,190) + head(380,190) + head(460,190) +
      `<text x="380" y="226" class="comp-label">개방형 헤드 (3F)</text>`, 480, 178)}
  </g>

  <!-- ========== GAS SYSTEM ========== -->
  <g class="sys-group active" id="g-gas">
    <!-- Gas riser at x=820 to avoid cylinder at x=800 -->
    <line x1="820" y1="450" x2="820" y2="70" class="pipe-main" stroke="#ff6b35" stroke-width="4" marker-end="url(#arr-gas)"/>
    <line x1="820" y1="150" x2="956" y2="150" class="pipe-branch" stroke="#ff6b35" stroke-width="3" marker-end="url(#arr-gas)"/>
    <line x1="820" y1="450" x2="820" y2="70" class="flow-anim" stroke="#ff6b35"/>
    <line x1="820" y1="150" x2="956" y2="150" class="flow-anim" stroke="#ff6b35"/>

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
    <!-- 트렁크: y=895(B1분기 y=880 바로 아래)까지만 → 통합수신기 아래 불필요 연장 제거 -->
    <line x1="500" y1="880" x2="500" y2="60" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9" marker-end="url(#arr-alarm)"/>
    <!-- 3F alarm branch → 방출지연 스위치(x=980) + 소화전+발신기 신호선 -->
    <line x1="500" y1="95" x2="980" y2="95" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <line x1="334" y1="77" x2="500" y2="77" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,4" opacity=".8"/>
    <!-- SV 스트레이 라인 제거됨 -->
    <!-- 2F alarm branches (감지기 끝 트림) + 소화전+발신기 신호선 -->
    <line x1="500" y1="300" x2="645" y2="300" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <line x1="500" y1="360" x2="715" y2="360" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <line x1="334" y1="462" x2="500" y2="462" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,4" opacity=".8"/>
    <!-- 1F alarm branch (감지기 끝 x=775) + 소화전+발신기 신호선 -->
    <line x1="500" y1="600" x2="775" y2="600" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <line x1="334" y1="607" x2="500" y2="607" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,4" opacity=".8"/>
    <!-- B1 alarm branch (감지기 끝 x=695) + 소화전+발신기 신호선 -->
    <line x1="500" y1="880" x2="695" y2="880" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,6" opacity=".9"/>
    <line x1="434" y1="827" x2="500" y2="827" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,4" opacity=".8"/>
    <!-- Glow layer -->
    <line x1="500" y1="880" x2="500" y2="60" stroke="#fbbf24" stroke-width="5" stroke-dasharray="8,6" opacity=".12"/>
    <!-- Animated signal pulse - vertical trunk (y=895→y=60 upward to panel) -->
    <line x1="500" y1="880" x2="500" y2="60" class="flow-anim" stroke="#fbbf24" style="animation-duration:7s;animation-direction:reverse"/>
    <!-- 감지기 분기 flow-anim -->
    <line x1="980" y1="95"  x2="500" y2="95"  class="flow-anim" stroke="#fbbf24" style="animation-duration:5s;animation-direction:reverse"/>
    <line x1="645" y1="300" x2="500" y2="300" class="flow-anim" stroke="#fbbf24" style="animation-duration:5s;animation-direction:reverse"/>
    <line x1="715" y1="360" x2="500" y2="360" class="flow-anim" stroke="#fbbf24" style="animation-duration:5s;animation-direction:reverse"/>
    <line x1="775" y1="600" x2="500" y2="600" class="flow-anim" stroke="#fbbf24" style="animation-duration:5s;animation-direction:reverse"/>
    <line x1="695" y1="880" x2="500" y2="880" class="flow-anim" stroke="#fbbf24" style="animation-duration:5s;animation-direction:reverse"/>
    <!-- 소화전+발신기 신호 flow-anim -->
    <line x1="334" y1="77"  x2="500" y2="77"  class="flow-anim" stroke="#fbbf24" style="animation-duration:4s;animation-direction:reverse"/>
    <line x1="334" y1="462" x2="500" y2="462" class="flow-anim" stroke="#fbbf24" style="animation-duration:4s;animation-direction:reverse"/>
    <line x1="334" y1="607" x2="500" y2="607" class="flow-anim" stroke="#fbbf24" style="animation-duration:4s;animation-direction:reverse"/>
    <line x1="434" y1="827" x2="500" y2="827" class="flow-anim" stroke="#fbbf24" style="animation-duration:4s;animation-direction:reverse"/>

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

    <!-- ── 경보 탭에서도 발신기 표시 (옥내소화전 옆 위치) ── -->
    ${part('p-bell-alarm-3f','발신기 (3F) — 경보 연동','화재 발견 시 수동 조작 → 경보 수신기에 신호 전송.','NFTC 203: 보행거리 25m 이하마다 1개, 함 내 설치, 음량 90dB↑',
      `<rect x="313" y="62" width="18" height="30" rx="2" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <circle cx="322" cy="72" r="4" fill="#fff"/>
      <circle cx="322" cy="85" r="3.5" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <text x="322" y="110" class="comp-label">발신기 (3F)</text>`, 332, 65)}

    ${part('p-bell-alarm-2f','발신기 (2F) — 경보 연동','화재 발견 시 수동 조작 → 경보 수신기에 신호 전송.','NFTC 203: 보행거리 25m 이하마다 1개, 함 내 설치, 음량 90dB↑',
      `<rect x="313" y="447" width="18" height="30" rx="2" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <circle cx="322" cy="457" r="4" fill="#fff"/>
      <circle cx="322" cy="470" r="3.5" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <text x="322" y="495" class="comp-label">발신기 (2F)</text>`, 332, 450)}

    ${part('p-bell-alarm-1f','발신기 (1F) — 경보 연동','화재 발견 시 수동 조작 → 경보 수신기에 신호 전송.','NFTC 203: 보행거리 25m 이하마다 1개, 함 내 설치, 음량 90dB↑',
      `<rect x="313" y="592" width="18" height="30" rx="2" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <circle cx="322" cy="602" r="4" fill="#fff"/>
      <circle cx="322" cy="615" r="3.5" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <text x="322" y="640" class="comp-label">발신기 (1F)</text>`, 332, 595)}

    ${part('p-bell-alarm-b1','발신기 (B1) — 경보 연동','화재 발견 시 수동 조작 → 경보 수신기에 신호 전송.','NFTC 203: 지하층에도 층마다 설치 의무, 음량 90dB↑',
      `<rect x="413" y="812" width="18" height="30" rx="2" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <circle cx="422" cy="822" r="4" fill="#fff"/>
      <circle cx="422" cy="835" r="3.5" fill="#ef4444" stroke="#fff" stroke-width="1"/>
      <text x="422" y="860" class="comp-label">발신기 (B1)</text>`, 432, 815)}

    <!-- ── 경보 탭에서도 방출지연 스위치 표시 (가스계 연동) ── -->
    ${part('p-abort-alarm','방출지연 스위치 — 경보 연동','교차회로 감지 → 수신기 기동 신호 → 지연스위치 조작 시 30초 방출 지연. 비상 대피 시간 확보.','NFTC 107: 방호구역 출입구 부근, 바닥에서 0.8~1.5m 설치',
      `<rect x="980" y="70" width="36" height="50" rx="4" fill="#080f1e" stroke="#fbbf24" stroke-width="1.5"/>
      <circle cx="998" cy="90" r="8" fill="#ef4444"/>
      <text x="998" y="138" class="comp-label">지연스위치</text>`, 1012, 75)}
  </g>

  <!-- ========== SMOKE / EVAC SYSTEM ========== -->
  <g class="sys-group active" id="g-smoke">
    <!-- Upward duct: 2F fan → 3F stairway -->
    <line x1="60" y1="370" x2="60" y2="80" class="pipe-main" stroke="#34d399" stroke-width="5" marker-end="url(#arr-smoke)"/>
    <!-- 2F branch (extended to x=750) -->
    <line x1="60" y1="370" x2="750" y2="370" class="pipe-branch" stroke="#34d399" stroke-width="3" marker-end="url(#arr-smoke)"/>
    <!-- Downward duct: 2F → 1F -->
    <line x1="60" y1="500" x2="60" y2="720" class="pipe-main" stroke="#34d399" stroke-width="4" marker-end="url(#arr-smoke)"/>
    <!-- 1F branch (extended to x=750) -->
    <line x1="60" y1="630" x2="750" y2="630" class="pipe-branch" stroke="#34d399" stroke-width="3" marker-end="url(#arr-smoke)"/>
    <!-- Flow animations -->
    <line x1="60" y1="370" x2="60" y2="80" class="flow-anim" stroke="#34d399"/>
    <line x1="60" y1="370" x2="750" y2="370" class="flow-anim" stroke="#34d399"/>
    <line x1="60" y1="500" x2="60" y2="720" class="flow-anim" stroke="#34d399"/>
    <line x1="60" y1="630" x2="750" y2="630" class="flow-anim" stroke="#34d399"/>

    ${part('p-fan','제연송풍기 (2F 급기)','비상계단 급기 가압. 방연풍속 0.7m/s 이상 확보.','NFTC 501: 급기량 설계 계산, 차압 40~60Pa 유지',
      fan(60,350) + `<text x="60" y="395" class="comp-label">급기팬 (2F)</text>`, 85, 335)}

    ${part('p-fan-1f','제연팬 (1F 배기)','1F 연기 강제 배출용 배기팬.','NFTC 501: 배출량 1시간 기준 5회 이상, 배기구 외부 방향',
      fan(60,700) + `<text x="60" y="745" class="comp-label">배기팬 (1F)</text>`, 85, 685)}

    ${part('p-damper','방화댐퍼 (FD) 2F','화재 시 72°C 퓨즈 용융 → 자동 폐쇄.','NFTC 501: 덕트 관통부마다 설치, 성능인증제품',
      damper(500,370) + isa(500,338,'FD','') + `<text x="500" y="420" class="comp-label">방화댐퍼 (2F)</text>`, 522, 343)}

    ${part('p-vd','배기댐퍼 (VD) 2F','연기 배출구. 제연구역 천장 설치.','NFTC 501: 배출량 1시간 기준 5회 이상',
      damper(680,370) + isa(680,338,'VD','') + `<text x="680" y="420" class="comp-label">배기댐퍼 (2F)</text>`, 702, 343)}

    ${part('p-damper-1f','방화댐퍼 (FD) 1F','화재 시 72°C 퓨즈 용융 → 자동 폐쇄.','NFTC 501: 덕트 관통부마다 설치, 성능인증제품',
      damper(500,630) + isa(500,598,'FD','') + `<text x="500" y="680" class="comp-label">방화댐퍼 (1F)</text>`, 522, 603)}

    ${part('p-vd-1f','배기댐퍼 (VD) 1F','연기 배출구. 제연구역 천장 설치.','NFTC 501: 배출량 1시간 기준 5회 이상',
      damper(680,630) + isa(680,598,'VD','') + `<text x="680" y="680" class="comp-label">배기댐퍼 (1F)</text>`, 702, 603)}

    ${part('p-sign-3f','피난유도등 (3F)','상시 점등. 비상전원 20분 이상 확보.','NFTC 301: 구부러진 모퉁이 및 보행거리 20m마다 설치',
      `<rect x="700" y="90" width="70" height="28" rx="5" fill="#080f1e" stroke="#22c55e" stroke-width="2"/>
      <path d="M710 91 L710 118 M710 104 H745" stroke="#22c55e" stroke-width="2.5"/>
      <path d="M735 97 L748 104 L735 111 Z" fill="#22c55e"/>
      <text x="735" y="135" class="comp-label">피난유도등 (3F)</text>`, 768, 93)}

    ${part('p-sign','피난유도등 (2F)','상시 점등. 비상전원 20분 이상 확보.','NFTC 301: 구부러진 모퉁이 및 보행거리 20m마다 설치',
      `<rect x="700" y="355" width="70" height="28" rx="5" fill="#080f1e" stroke="#22c55e" stroke-width="2"/>
      <path d="M710 356 L710 383 M710 369 H745" stroke="#22c55e" stroke-width="2.5"/>
      <path d="M735 362 L748 369 L735 376 Z" fill="#22c55e"/>
      <text x="735" y="400" class="comp-label">피난유도등 (2F)</text>`, 768, 358)}

    ${part('p-sign-1f','피난유도등 (1F)','상시 점등. 비상전원 20분 이상 확보.','NFTC 301: 구부러진 모퉁이 및 보행거리 20m마다 설치',
      `<rect x="700" y="545" width="70" height="28" rx="5" fill="#080f1e" stroke="#22c55e" stroke-width="2"/>
      <path d="M710 546 L710 573 M710 559 H745" stroke="#22c55e" stroke-width="2.5"/>
      <path d="M735 552 L748 559 L735 566 Z" fill="#22c55e"/>
      <text x="735" y="590" class="comp-label">피난유도등 (1F)</text>`, 768, 548)}

    ${part('p-sign-b1','피난유도등 (B1)','상시 점등. 비상전원 20분 이상 확보.','NFTC 301: 구부러진 모퉁이 및 보행거리 20m마다 설치',
      `<rect x="700" y="785" width="70" height="28" rx="5" fill="#080f1e" stroke="#22c55e" stroke-width="2"/>
      <path d="M710 786 L710 813 M710 799 H745" stroke="#22c55e" stroke-width="2.5"/>
      <path d="M735 792 L748 799 L735 806 Z" fill="#22c55e"/>
      <text x="735" y="830" class="comp-label">피난유도등 (B1)</text>`, 768, 788)}

    ${part('p-esc','비상계단 가압구역 (3F)','제연팬 → 급기덕트 → 비상계단 가압.','NFTC 501: 계단실 차압 40Pa↑, 방연풍속 확보',
      `<rect x="42" y="155" width="30" height="100" rx="4" fill="rgba(52,211,153,.07)" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="80" y="195" fill="#34d399" font-size="10" font-weight="700" font-family="monospace">비상계단</text>
      <text x="80" y="210" fill="#34d399" font-size="10" font-weight="700" font-family="monospace">가압(3F)</text>`, 75, 165)}

    ${part('p-esc-2f','비상계단 가압구역 (2F)','제연팬 → 급기덕트 → 비상계단 가압.','NFTC 501: 계단실 차압 40Pa↑, 방연풍속 확보',
      `<rect x="42" y="268" width="30" height="90" rx="4" fill="rgba(52,211,153,.07)" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="80" y="305" fill="#34d399" font-size="10" font-weight="700" font-family="monospace">비상계단</text>
      <text x="80" y="320" fill="#34d399" font-size="10" font-weight="700" font-family="monospace">가압(2F)</text>`, 75, 278)}

    ${part('p-esc-1f','비상계단 가압구역 (1F)','제연팬 → 급기덕트 → 비상계단 가압.','NFTC 501: 계단실 차압 40Pa↑, 방연풍속 확보',
      `<rect x="42" y="510" width="30" height="90" rx="4" fill="rgba(52,211,153,.07)" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="80" y="547" fill="#34d399" font-size="10" font-weight="700" font-family="monospace">비상계단</text>
      <text x="80" y="562" fill="#34d399" font-size="10" font-weight="700" font-family="monospace">가압(1F)</text>`, 75, 520)}
  </g>

  <!-- P&ID Standard Watermark -->
  <text x="500" y="1045" fill="rgba(255,255,255,0.85)" font-size="13" font-weight="700" font-family="'Pretendard Variable','Pretendard',sans-serif" text-anchor="middle">국제 표준 P&amp;ID 기호 적용 (ISA-5.1 / NFPA 170)</text>

</svg>`;

  host.innerHTML = SVG;

  // 계산식 있는 부품에 has-calc 클래스 부착 → 앰버색 plus 아이콘
  Object.keys(CALC_MAP).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('has-calc');
  });
  // Attach click handlers
  document.querySelectorAll('.part').forEach(el => {
    el.addEventListener('click', () => {
      showModal(el.dataset.name, el.dataset.desc, el.dataset.law, CALC_MAP[el.id] || []);
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
