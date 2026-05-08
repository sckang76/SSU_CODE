// allData is globally available from data.js

document.addEventListener('DOMContentLoaded', () => {
    // ════════════════════════════════════════════
    // DOM References (all declared first to prevent TDZ errors)
    // ════════════════════════════════════════════
    const loginScreen = document.getElementById('login-screen');
    const mainApp     = document.getElementById('main-app');
    const loginBtn    = document.getElementById('login-btn');
    const passwordInput = document.getElementById('password-input');
    const loginError  = document.getElementById('login-error');
    const symbolGrid  = document.getElementById('symbol-grid');

    // ════════════════════════════════════════════
    // State
    // ════════════════════════════════════════════
    let currentSubject  = 'fluid';
    let currentCategory = 'all';

    // ════════════════════════════════════════════
    // Theme Management
    // ════════════════════════════════════════════
    const themeToggleBtn = document.getElementById('theme-toggle');

    function applyTheme(isInitial = false) {
        const savedTheme = localStorage.getItem('theme_v2');
        // Default to 'light' for main app if no saved theme
        const themeToApply = savedTheme || 'light';
        
        if (themeToApply === 'light') {
            document.body.classList.replace('dark-theme', 'light-theme');
            if (themeToggleBtn) themeToggleBtn.checked = true;
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            if (themeToggleBtn) themeToggleBtn.checked = false;
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme_v2', 'light');
            } else {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme_v2', 'dark');
            }
        });
    }

    // Check session
    const accessData = JSON.parse(localStorage.getItem('ssu_access_data') || 'null');
    const now = new Date().getTime();
    const alreadyLoggedIn = accessData && (now - accessData.time < 30 * 60 * 1000); // 30 minutes
    
    if (alreadyLoggedIn) {
        loginScreen.remove();
        mainApp.classList.remove('hidden');
        applyTheme(true);
    }

    const sha256 = async (message) => {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const handleLogin = async () => {
        const inputHash = await sha256(passwordInput.value.toUpperCase());
        const targetHash = '8ee30f72b29d4bf738aed014ce062f32aa181c5fae03e4e250d0dc68bada81fe';
        if (inputHash === targetHash) {
            localStorage.setItem('ssu_access_data', JSON.stringify({ granted: true, time: new Date().getTime() }));
            loginScreen.remove();
            mainApp.classList.remove('hidden');
            applyTheme(); // Switch to default/saved theme after login
            initApp();
        } else {
            loginError.textContent = '잘못된 비밀번호입니다.';
            passwordInput.value = '';
        }
    };

    loginBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });

    // (State variables moved above sessionStorage check — see top of DOMContentLoaded)

    function initApp() {
        renderSubjectTabs();
        renderCategoryTabs();
        renderCards();
        initSearch();
        initCalcModal();
    }

    // ════════════════════════════════════════════
    // Subject Tabs
    // ════════════════════════════════════════════
    function renderSubjectTabs() {
        document.querySelectorAll('.subject-btn[data-subject]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.subject-btn[data-subject]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSubject = btn.dataset.subject;
                currentCategory = 'all';
                renderCategoryTabs();
                renderCards();
            });
        });
    }

    // ════════════════════════════════════════════
    // Category Tabs
    // ════════════════════════════════════════════
    function renderCategoryTabs() {
        const catTabsEl = document.getElementById('category-tabs');
        catTabsEl.innerHTML = '';
        const subjectData = allData.find(s => s.subjectId === currentSubject);
        if (!subjectData) return;

        const allBtn = document.createElement('button');
        allBtn.className = 'tab-btn' + (currentCategory === 'all' ? ' active' : '');
        allBtn.textContent = '전체';
        allBtn.addEventListener('click', () => selectCategory('all', allBtn));
        catTabsEl.appendChild(allBtn);

        subjectData.categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn' + (currentCategory === cat.id ? ' active' : '');
            btn.textContent = cat.name;
            btn.addEventListener('click', () => selectCategory(cat.id, btn));
            catTabsEl.appendChild(btn);
        });
    }

    function selectCategory(catId, clickedBtn) {
        document.querySelectorAll('#category-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        clickedBtn.classList.add('active');
        currentCategory = catId;
        renderCards();
    }

    // ════════════════════════════════════════════
    // Cards  (symbolGrid DOM ref declared at top)
    // ════════════════════════════════════════════
    function renderCards(query = '') {
        const subjectData = allData.find(s => s.subjectId === currentSubject);
        if (!subjectData) return;

        let items = [];
        if (currentCategory === 'all') {
            subjectData.categories.forEach(cat => items = [...items, ...cat.items]);
        } else {
            const cat = subjectData.categories.find(c => c.id === currentCategory);
            if (cat) items = cat.items;
        }

        if (query) {
            const q = query.toLowerCase();
            items = items.filter(item =>
                item.symbol.toLowerCase().includes(q) ||
                item.nameKr.toLowerCase().includes(q) ||
                item.nameEn.toLowerCase().includes(q) ||
                item.desc.toLowerCase().includes(q)
            );
        }

        symbolGrid.innerHTML = '';
        if (items.length === 0) {
            symbolGrid.innerHTML = `<div class="no-results">검색 결과가 없습니다.</div>`;
            return;
        }

        const copyIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        const checkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'symbol-card';
            card.innerHTML = `
                <div class="card-header">
                    <span class="symbol-glyph">${item.symbol} <small class="reading">(${item.reading})</small></span>
                    <div class="header-actions">
                        <span class="unit-tag">${item.unit}</span>
                        <button class="copy-btn" title="복사">${copyIcon}</button>
                    </div>
                </div>
                <div class="card-body">
                    <h3>${item.nameKr}</h3>
                    <div class="name-en">${item.nameEn}</div>
                    <p class="desc">${item.desc}</p>
                </div>
            `;
            const copyBtn = card.querySelector('.copy-btn');
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                copyAsStyledText(item.symbol);
                copyBtn.innerHTML = checkIcon;
                copyBtn.classList.add('success');
                setTimeout(() => { copyBtn.innerHTML = copyIcon; copyBtn.classList.remove('success'); }, 1500);
            });
            symbolGrid.appendChild(card);
        });
    }

    // ════════════════════════════════════════════
    // Search
    // ════════════════════════════════════════════
    function initSearch() {
        document.getElementById('search-input').addEventListener('input', (e) => {
            renderCards(e.target.value.trim());
        });
    }

    // ════════════════════════════════════════════
    // Clipboard
    // ════════════════════════════════════════════
    const copyAsStyledText = (text) => {
        const html = `<span style="font-family: Arial, sans-serif; font-size: 10pt;">${text}</span>`;
        try {
            navigator.clipboard.write([new ClipboardItem({
                'text/html': new Blob([html], { type: 'text/html' }),
                'text/plain': new Blob([text], { type: 'text/plain' })
            })]);
        } catch (e) { navigator.clipboard.writeText(text); }
    };

    // ════════════════════════════════════════════
    // Calculator Modal
    // ════════════════════════════════════════════
    function initCalcModal() {
        const calcModal   = document.getElementById('calc-modal');
        const showCalcBtn = document.getElementById('show-calc');
        const closeBtn    = document.querySelector('.close-btn');
        const calcType    = document.getElementById('calc-type');
        const calcInputsEl = document.getElementById('calc-inputs');
        const calcOutput  = document.getElementById('calc-output');
        const solutionEl  = document.getElementById('calc-solution');
        const contentEl   = document.getElementById('solution-content');

        showCalcBtn.addEventListener('click', () => { calcModal.classList.remove('hidden'); renderCalcInputs(); });
        closeBtn.addEventListener('click', () => calcModal.classList.add('hidden'));
        window.addEventListener('click', (e) => { if (e.target === calcModal) calcModal.classList.add('hidden'); });

        // ── Input Configs ───────────────────────
        const config = {
            re:        [{ id:'rho', label:'밀도 (ρ, kg/m³)', val:1.225 }, { id:'vel', label:'속도 (V, m/s)', val:10 }, { id:'len', label:'특성 길이 (L, m)', val:1 }, { id:'mu', label:'점성계수 (μ, Pa·s)', val:1.789e-5 }],
            ma:        [{ id:'vel', label:'유속 (V, m/s)', val:340 }, { id:'snd', label:'음속 (a, m/s)', val:340 }],
            fr:        [{ id:'vel', label:'속도 (V, m/s)', val:5 }, { id:'len', label:'특성 길이 (L, m)', val:10 }, { id:'grv', label:'중력가속도 (g, m/s²)', val:9.81 }],
            kfactor:   [{ id:'kf', label:'K-factor (L/min/bar⁰·⁵)', val:80 }, { id:'pbar', label:'방수압력 (P, bar)', val:1.0 }],
            hw:        [{ id:'hw_c', label:'Hazen-Williams 계수 (C)', val:120 }, { id:'hw_q', label:'유량 (Q, m³/s)', val:0.005 }, { id:'hw_d', label:'관 직경 (D, m)', val:0.1 }, { id:'hw_l', label:'관 길이 (L, m)', val:100 }],
            bernoulli: [{ id:'rho', label:'밀도 (ρ, kg/m³)', val:1000 }, { id:'p1', label:'지점1 압력 (P₁, Pa)', val:200000 }, { id:'v1', label:'지점1 속도 (V₁, m/s)', val:2 }, { id:'z1', label:'지점1 높이 (z₁, m)', val:10 }, { id:'v2', label:'지점2 속도 (V₂, m/s)', val:4 }, { id:'z2', label:'지점2 높이 (z₂, m)', val:0 }, { id:'grv', label:'중력가속도 (g, m/s²)', val:9.81 }],
            pumphead:  [{ id:'hf', label:'마찰손실 수두 (h_f, m)', val:20 }, { id:'hm', label:'부차적 손실 (h_m, m)', val:5 }, { id:'dz', label:'높이 차이 (Δz, m)', val:15 }],
            npsh:      [{ id:'pa', label:'대기압 절대압 (Pa)', val:101325 }, { id:'pv', label:'증기압 (Pv, Pa)', val:2338 }, { id:'rho', label:'밀도 (ρ, kg/m³)', val:1000 }, { id:'hs', label:'흡입 높이 (h_s, m)', val:4 }, { id:'hfs', label:'흡입측 마찰손실 (m)', val:1 }, { id:'grv', label:'중력가속도 (g)', val:9.81 }],
            watervolume: [{ id:'wv_q', label:'단위 방수량 (Q_d, L/min/개)', val:80 }, { id:'wv_n', label:'동시개방 헤드수 (N)', val:10 }, { id:'wv_t', label:'방수시간 (t, min)', val:20 }],
            pumppower:  [{ id:'pp_gamma', label:'비중량 (γ, N/m³)', val:9800 }, { id:'pp_q', label:'유량 (Q, m³/s)', val:0.008 }, { id:'pp_h', label:'양정 (H, m)', val:80 }, { id:'pp_eta', label:'효율 (η, 0~1)', val:0.7 }],
            co2agent:   [{ id:'co2_v', label:'방호구역 체적 (V, m³)', val:200 }, { id:'co2_factor', label:'CO₂ 포화량계수 (kg/m³)', val:0.7 }, { id:'co2_safety', label:'안전계수 (1.2 권장)', val:1.2 }],
            foamagent:  [{ id:'fa_area', label:'방호면적 (A, m²)', val:100 }, { id:'fa_rate', label:'포 방출률 (I, L/min/m²)', val:6.5 }, { id:'fa_time', label:'방사시간 (t, min)', val:10 }, { id:'fa_conc', label:'포 농도 (C_f, %)', val:3 }],
            dischargeintensity: [{ id:'di_q', label:'유량 (Q, L/min)', val:800 }, { id:'di_a', label:'면적 (A, m²)', val:40 }],
            ohm:       [{ id:'ohm_v', label:'전압 (V, V)', val:24 }, { id:'ohm_i', label:'전류 (I, A)', val:2 }],
            epower:    [{ id:'ep_v', label:'전압 (V, V)', val:220 }, { id:'ep_i', label:'전류 (I, A)', val:5 }, { id:'ep_pf', label:'역률 (cosφ)', val:0.9 }],
            battery:   [{ id:'bat_p', label:'부하 전력 (P, W)', val:50 }, { id:'bat_t', label:'유지시간 (t, min)', val:10 }, { id:'bat_v', label:'축전지 전압 (V)', val:24 }, { id:'bat_eff', label:'방전효율 (η)', val:0.8 }],
            voltdrop:  [{ id:'vd_l', label:'전선 단면거리 (L, m)', val:100 }, { id:'vd_i', label:'전류 (I, A)', val:5 }, { id:'vd_r', label:'전선 저항 (Ω/km)', val:17.8 }],
            nfsc_sprinkler_water: [{ id:'nsw_q', label:'헤드 방수량 (L/min, 기준:80)', val:80 }, { id:'nsw_n', label:'동시개방 헤드수 (N)', val:10 }, { id:'nsw_t', label:'방수시간 (t, min, 기준:20)', val:20 }],
            nfsc_hydrant_water:   [{ id:'nhw_q', label:'소화전 방수량 (L/min, 기준:130)', val:130 }, { id:'nhw_n', label:'동시작동 소화전 수', val:2 }, { id:'nhw_t', label:'방수시간 (t, min, 기준:20)', val:20 }],
            nfsc_detector_count:  [{ id:'nd_area', label:'바닥면적 (m²)', val:300 }, { id:'nd_cover', label:'감지기 1개 감지면적 (m²)', val:150 }],
            nfsc_motor_power:     [{ id:'mp_q', label:'유량 (Q, m³/min)', val:1.6 }, { id:'mp_h', label:'전양정 (H, m)', val:100 }, { id:'mp_eta', label:'종합효율 (η)', val:0.65 }],
            dw:        [{ id:'ff', label:'마찰계수 (f)', val:0.02 }, { id:'len', label:'관 길이 (L, m)', val:100 }, { id:'dia', label:'관 직경 (D, m)', val:0.1 }, { id:'vel', label:'유속 (V, m/s)', val:2 }, { id:'grv', label:'중력가속도 (g)', val:9.81 }],
            ld:        [{ id:'rho', label:'밀도 (ρ, kg/m³)', val:1.225 }, { id:'vel', label:'속도 (V, m/s)', val:50 }, { id:'area', label:'참조 면적 (A, m²)', val:20 }, { id:'coeff', label:'힘 계수 (C)', val:0.5 }],
            isentro:   [{ id:'mach', label:'마하 수 (M)', val:2.0 }, { id:'gamma', label:'비열비 (γ)', val:1.4 }],
            hydro:     [{ id:'rho', label:'밀도 (ρ, kg/m³)', val:1000 }, { id:'h', label:'깊이 (h, m)', val:10 }, { id:'grv', label:'중력가속도 (g)', val:9.81 }]
        };

        function renderCalcInputs() {
            const type = calcType.value;
            calcInputsEl.innerHTML = '';
            solutionEl.classList.add('hidden');
            if (!config[type]) return;
            config[type].forEach(inp => {
                const div = document.createElement('div');
                div.className = 'input-row';
                div.innerHTML = `<label for="${inp.id}">${inp.label}</label><input type="number" id="${inp.id}" value="${inp.val}" step="any">`;
                calcInputsEl.appendChild(div);
            });
            calcInputsEl.querySelectorAll('input').forEach(i => i.addEventListener('input', calculate));
            calculate();
        }

        // ── Calculate + Solution ─────────────────
        function calculate() {
            const type = calcType.value;
            let result = 0, unit = '', steps = [];
            const v  = (id) => parseFloat(document.getElementById(id)?.value) || 0;
            const vs = (id, safe = 1e-10) => parseFloat(document.getElementById(id)?.value) || safe;
            const f  = (n, d = 4) => isNaN(n) ? 'Error' : Number(n).toLocaleString(undefined, { maximumFractionDigits: d });

            if (type === 're') {
                const rho=vs('rho'), vel=v('vel'), len=v('len'), mu=vs('mu');
                result = (rho * vel * len) / mu;
                steps = [
                    { label:'공식', cls:'formula', text:'Re = ρ × V × L / μ' },
                    { label:'대입', cls:'sub',     text:`Re = ${f(rho)} × ${f(vel)} × ${f(len)} / ${f(mu)}` },
                    { label:'결과', cls:'result',  text:`Re = ${f(result)}` }
                ];
            } else if (type === 'ma') {
                const vel=v('vel'), snd=vs('snd');
                result = vel / snd;
                steps = [
                    { label:'공식', cls:'formula', text:'Ma = V / a' },
                    { label:'대입', cls:'sub',     text:`Ma = ${f(vel)} / ${f(snd)}` },
                    { label:'결과', cls:'result',  text:`Ma = ${f(result)}` }
                ];
            } else if (type === 'fr') {
                const vel=v('vel'), len=vs('len'), g=vs('grv',9.81);
                result = vel / Math.sqrt(g * len);
                steps = [
                    { label:'공식', cls:'formula', text:'Fr = V / √(g × L)' },
                    { label:'대입', cls:'sub',     text:`Fr = ${f(vel)} / √(${f(g)} × ${f(len)})` },
                    { label:'계산', cls:'calc',    text:`√(gL) = √${f(g*len)} = ${f(Math.sqrt(g*len))}` },
                    { label:'결과', cls:'result',  text:`Fr = ${f(result)}` }
                ];
            } else if (type === 'kfactor') {
                const kf=v('kf'), p=Math.max(v('pbar'),0);
                result = kf * Math.sqrt(p); unit = ' L/min';
                steps = [
                    { label:'공식', cls:'formula', text:'Q = K × √P' },
                    { label:'대입', cls:'sub',     text:`Q = ${f(kf)} × √${f(p)}` },
                    { label:'계산', cls:'calc',    text:`√P = ${f(Math.sqrt(p))}` },
                    { label:'결과', cls:'result',  text:`Q = ${f(result)} L/min` }
                ];
            } else if (type === 'hw') {
                const c=vs('hw_c'), q=v('hw_q'), d=vs('hw_d'), l=v('hw_l');
                result = (10.67 * l * Math.pow(q,1.852)) / (Math.pow(c,1.852) * Math.pow(d,4.87)); unit = ' m';
                steps = [
                    { label:'공식', cls:'formula', text:'h_f = 10.67 × L × Q^1.852 / (C^1.852 × D^4.87)' },
                    { label:'대입', cls:'sub',     text:`h_f = 10.67 × ${f(l)} × ${f(q)}^1.852 / (${f(c)}^1.852 × ${f(d)}^4.87)` },
                    { label:'계산', cls:'calc',    text:`분자 = ${f(10.67*l*Math.pow(q,1.852))}\n분모 = ${f(Math.pow(c,1.852)*Math.pow(d,4.87))}` },
                    { label:'결과', cls:'result',  text:`h_f = ${f(result)} m` }
                ];
            } else if (type === 'bernoulli') {
                const rho=vs('rho',1000), p1=v('p1'), v1=v('v1'), z1=v('z1'), v2=v('v2'), z2=v('z2'), g=vs('grv',9.81);
                const termZ = rho*g*(z1-z2), termV = 0.5*rho*(v1**2-v2**2);
                result = p1 + termZ + termV; unit = ' Pa';
                steps = [
                    { label:'공식', cls:'formula', text:'P₂ = P₁ + ρg(z₁-z₂) + ½ρ(V₁²-V₂²)' },
                    { label:'대입', cls:'sub',     text:`P₂ = ${f(p1)} + ${f(rho)}×${f(g)}×(${f(z1)}-${f(z2)}) + ½×${f(rho)}×(${f(v1)}²-${f(v2)}²)` },
                    { label:'계산', cls:'calc',    text:`위치수두항 = ${f(termZ)} Pa\n동압항 = ${f(termV)} Pa` },
                    { label:'결과', cls:'result',  text:`P₂ = ${f(result)} Pa` }
                ];
            } else if (type === 'pumphead') {
                const hf=v('hf'), hm=v('hm'), dz=v('dz');
                result = hf + hm + dz; unit = ' m';
                steps = [
                    { label:'공식', cls:'formula', text:'H = h_f + h_m + Δz' },
                    { label:'대입', cls:'sub',     text:`H = ${f(hf)} + ${f(hm)} + ${f(dz)}` },
                    { label:'결과', cls:'result',  text:`H = ${f(result)} m (총양정)` }
                ];
            } else if (type === 'npsh') {
                const pa=v('pa'), pv=v('pv'), rho=vs('rho',1000), hs=v('hs'), hfs=v('hfs'), g=vs('grv',9.81);
                const term1=(pa-pv)/(rho*g);
                result = term1 - hs - hfs; unit = ' m';
                steps = [
                    { label:'공식', cls:'formula', text:'NPSHa = (Pa-Pv)/(ρg) - h_s - h_fs' },
                    { label:'대입', cls:'sub',     text:`NPSHa = (${f(pa)}-${f(pv)})/(${f(rho)}×${f(g)}) - ${f(hs)} - ${f(hfs)}` },
                    { label:'계산', cls:'calc',    text:`(Pa-Pv)/(ρg) = ${f(term1)} m` },
                    { label:'결과', cls:'result',  text:`NPSHa = ${f(result)} m` }
                ];
            } else if (type === 'watervolume') {
                const q=v('wv_q'), n=v('wv_n'), t=v('wv_t');
                result = q * n * t; unit = ' L';
                steps = [
                    { label:'공식', cls:'formula', text:'Q_total = Q_d × N × t' },
                    { label:'대입', cls:'sub',     text:`Q_total = ${f(q)} L/min × ${f(n)}개 × ${f(t)}min` },
                    { label:'결과', cls:'result',  text:`Q_total = ${f(result)} L` }
                ];
            } else if (type === 'pumppower') {
                const gamma=v('pp_gamma'), q=v('pp_q'), h=v('pp_h'), eta=vs('pp_eta',0.01);
                result = (gamma * q * h) / (102 * eta * 9.81); unit = ' kW';
                steps = [
                    { label:'공식', cls:'formula', text:'P = γ × Q × H / (102 × η)  [kW]' },
                    { label:'대입', cls:'sub',     text:`P = ${f(gamma)} × ${f(q)} × ${f(h)} / (102 × ${f(eta)})` },
                    { label:'계산', cls:'calc',    text:`분자 = ${f(gamma*q*h)}\n분모 = ${f(102*eta*9.81)}` },
                    { label:'결과', cls:'result',  text:`P = ${f(result)} kW` }
                ];
            } else if (type === 'co2agent') {
                const vol=v('co2_v'), factor=v('co2_factor'), sf=v('co2_safety');
                result = vol * factor * sf; unit = ' kg';
                steps = [
                    { label:'공식', cls:'formula', text:'W = V × q × 안전계수' },
                    { label:'대입', cls:'sub',     text:`W = ${f(vol)} m³ × ${f(factor)} kg/m³ × ${f(sf)}` },
                    { label:'결과', cls:'result',  text:`W = ${f(result)} kg (CO₂ 약제량)` }
                ];
            } else if (type === 'foamagent') {
                const area=v('fa_area'), rate=v('fa_rate'), time=v('fa_time'), conc=v('fa_conc');
                const solution = area * rate * time;
                result = solution * (conc / 100); unit = ' L';
                steps = [
                    { label:'공식', cls:'formula', text:'W_agent = A × I × t × (C_f / 100)' },
                    { label:'계산', cls:'calc',    text:`포 수용액 = ${f(area)} × ${f(rate)} × ${f(time)} = ${f(solution)} L` },
                    { label:'대입', cls:'sub',     text:`약제량 = ${f(solution)} × (${f(conc)}/100)` },
                    { label:'결과', cls:'result',  text:`W_agent = ${f(result)} L` }
                ];
            } else if (type === 'dischargeintensity') {
                const q=v('di_q'), a=vs('di_a');
                result = q / a; unit = ' L/min/m²';
                steps = [
                    { label:'공식', cls:'formula', text:'I = Q / A' },
                    { label:'대입', cls:'sub',     text:`I = ${f(q)} / ${f(a)}` },
                    { label:'결과', cls:'result',  text:`I = ${f(result)} L/min/m²` }
                ];
            } else if (type === 'ohm') {
                const vv=vs('ohm_v'), ii=vs('ohm_i');
                result = vv / ii; unit = ' Ω';
                steps = [
                    { label:'공식', cls:'formula', text:'R = V / I  (옴의 법칙)' },
                    { label:'대입', cls:'sub',     text:`R = ${f(vv)} V / ${f(ii)} A` },
                    { label:'결과', cls:'result',  text:`R = ${f(result)} Ω` }
                ];
            } else if (type === 'epower') {
                const vv=v('ep_v'), ii=v('ep_i'), pf=v('ep_pf');
                result = vv * ii * pf; unit = ' W';
                steps = [
                    { label:'공식', cls:'formula', text:'P = V × I × cosφ  (유효전력)' },
                    { label:'대입', cls:'sub',     text:`P = ${f(vv)} × ${f(ii)} × ${f(pf)}` },
                    { label:'결과', cls:'result',  text:`P = ${f(result)} W` }
                ];
            } else if (type === 'battery') {
                const p=v('bat_p'), t=v('bat_t'), bv=vs('bat_v'), eff=vs('bat_eff',0.01);
                result = (p / bv) * (t / 60) / eff; unit = ' Ah';
                steps = [
                    { label:'공식', cls:'formula', text:'C = (P/V) × (t/60) / η  [Ah]' },
                    { label:'대입', cls:'sub',     text:`C = (${f(p)}/${f(bv)}) × (${f(t)}/60) / ${f(eff)}` },
                    { label:'계산', cls:'calc',    text:`전류 = ${f(p/bv)} A, 시간 = ${f(t/60,4)} h` },
                    { label:'결과', cls:'result',  text:`C = ${f(result)} Ah` }
                ];
            } else if (type === 'voltdrop') {
                const l=v('vd_l'), ii=v('vd_i'), r=v('vd_r');
                result = (2 * l * r * ii) / 1000000; unit = ' V';
                steps = [
                    { label:'공식', cls:'formula', text:'e = 2 × L(m) × R(Ω/km) × I / 10⁶' },
                    { label:'대입', cls:'sub',     text:`e = 2 × ${f(l)} × ${f(r)} × ${f(ii)} / 10⁶` },
                    { label:'결과', cls:'result',  text:`e = ${f(result)} V` }
                ];
            } else if (type === 'nfsc_sprinkler_water') {
                const q=v('nsw_q'), n=v('nsw_n'), t=v('nsw_t');
                result = (q * n * t) / 1000; unit = ' m³';
                steps = [
                    { label:'기준', cls:'formula', text:'NFSC 103 — 스프링클러설비' },
                    { label:'공식', cls:'formula', text:'V = Q × N × t / 1000  [m³]' },
                    { label:'대입', cls:'sub',     text:`V = ${f(q)} L/min × ${f(n)}개 × ${f(t)}min / 1000` },
                    { label:'결과', cls:'result',  text:`V = ${f(result)} m³` }
                ];
            } else if (type === 'nfsc_hydrant_water') {
                const q=v('nhw_q'), n=v('nhw_n'), t=v('nhw_t');
                result = (q * n * t) / 1000; unit = ' m³';
                steps = [
                    { label:'기준', cls:'formula', text:'NFSC 102 — 옥내소화전설비' },
                    { label:'공식', cls:'formula', text:'V = Q × N × t / 1000  [m³]' },
                    { label:'대입', cls:'sub',     text:`V = ${f(q)} L/min × ${f(n)}개 × ${f(t)}min / 1000` },
                    { label:'결과', cls:'result',  text:`V = ${f(result)} m³` }
                ];
            } else if (type === 'nfsc_detector_count') {
                const area=v('nd_area'), cover=vs('nd_cover');
                result = Math.ceil(area / cover); unit = ' 개';
                steps = [
                    { label:'기준', cls:'formula', text:'NFSC 203 — 자동화재탐지설비' },
                    { label:'공식', cls:'formula', text:'N = ⌈ A_실 / A_감지 ⌉  (올림)' },
                    { label:'대입', cls:'sub',     text:`N = ⌈ ${f(area)} / ${f(cover)} ⌉` },
                    { label:'계산', cls:'calc',    text:`${f(area)} ÷ ${f(cover)} = ${f(area/cover)} → 올림` },
                    { label:'결과', cls:'result',  text:`N = ${result} 개` }
                ];
            } else if (type === 'nfsc_motor_power') {
                const q=v('mp_q'), h=v('mp_h'), eta=vs('mp_eta',0.01);
                const Qms = q / 60;
                result = (9800 * Qms * h) / (102 * eta * 9.81); unit = ' kW';
                steps = [
                    { label:'공식', cls:'formula', text:'P = γQH / (102 × η)  [Q: m³/s]' },
                    { label:'대입', cls:'sub',     text:`Q = ${f(q)} m³/min ÷ 60 = ${f(Qms)} m³/s\nP = 9800 × ${f(Qms)} × ${f(h)} / (102 × ${f(eta)} × 9.81)` },
                    { label:'계산', cls:'calc',    text:`분자 = ${f(9800*Qms*h)}\n분모 = ${f(102*eta*9.81)}` },
                    { label:'결과', cls:'result',  text:`P = ${f(result)} kW` }
                ];
            } else if (type === 'dw') {
                const ff=v('ff'), len=v('len'), dia=vs('dia'), vel=v('vel'), g=vs('grv',9.81);
                result = ff * (len/dia) * (vel**2/(2*g)); unit = ' m';
                steps = [
                    { label:'공식', cls:'formula', text:'h_f = f × (L/D) × (V²/2g)' },
                    { label:'대입', cls:'sub',     text:`h_f = ${f(ff)} × (${f(len)}/${f(dia)}) × (${f(vel)}²/(2×${f(g)}))` },
                    { label:'계산', cls:'calc',    text:`L/D = ${f(len/dia)},  V²/2g = ${f(vel**2/(2*g))}` },
                    { label:'결과', cls:'result',  text:`h_f = ${f(result)} m` }
                ];
            } else if (type === 'ld') {
                const rho=v('rho'), vel=v('vel'), area=v('area'), coeff=v('coeff');
                result = 0.5 * rho * vel**2 * area * coeff; unit = ' N';
                steps = [
                    { label:'공식', cls:'formula', text:'F = ½ρV²AC' },
                    { label:'대입', cls:'sub',     text:`F = ½ × ${f(rho)} × ${f(vel)}² × ${f(area)} × ${f(coeff)}` },
                    { label:'결과', cls:'result',  text:`F = ${f(result)} N` }
                ];
            } else if (type === 'isentro') {
                const m=v('mach'), gamma=v('gamma');
                result = 1 + ((gamma-1)/2) * m**2;
                steps = [
                    { label:'공식', cls:'formula', text:'T₀/T = 1 + (γ-1)/2 × M²' },
                    { label:'대입', cls:'sub',     text:`T₀/T = 1 + (${f(gamma)}-1)/2 × ${f(m)}²` },
                    { label:'결과', cls:'result',  text:`T₀/T = ${f(result)}` }
                ];
            } else if (type === 'hydro') {
                const rho=v('rho'), h=v('h'), g=vs('grv',9.81);
                result = rho * g * h; unit = ' Pa';
                steps = [
                    { label:'공식', cls:'formula', text:'P = ρ × g × h' },
                    { label:'대입', cls:'sub',     text:`P = ${f(rho)} × ${f(g)} × ${f(h)}` },
                    { label:'결과', cls:'result',  text:`P = ${f(result)} Pa` }
                ];
            }

            calcOutput.textContent = (isNaN(result) ? 'Error' : result.toLocaleString(undefined, { maximumFractionDigits: 4 })) + unit;

            if (steps.length > 0) {
                contentEl.innerHTML = steps.map(s => `
                    <div class="solution-step">
                        <span class="step-label ${s.cls}">${s.label}</span>
                        <span class="step-text">${s.text.replace(/\n/g, '<br>')}</span>
                    </div>`).join('');
                solutionEl.classList.remove('hidden');
            } else {
                solutionEl.classList.add('hidden');
            }
        }

        calcType.addEventListener('change', renderCalcInputs);
    }

    // ════════════════════════════════════════════
    // Boot: All declarations are done — now safe to call initApp()
    // ════════════════════════════════════════════
    if (alreadyLoggedIn) {
        initApp();
    }
});
