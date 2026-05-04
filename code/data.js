const allData = [
  // =============================================
  // 💧 유체역학 (Fluid Mechanics)
  // =============================================
  {
    subjectId: 'fluid',
    subjectName: '유체역학',
    icon: '💧',
    categories: [
      {
        id: 'properties', name: '기본 물성치',
        items: [
          { symbol: "ρ", reading: "Rho", nameKr: "밀도", nameEn: "Density", unit: "kg/m³", desc: "단위 체적당 질량" },
          { symbol: "γ", reading: "Gamma", nameKr: "비중량", nameEn: "Specific Weight", unit: "N/m³", desc: "단위 체적당 무게 (ρg)" },
          { symbol: "μ", reading: "Mu", nameKr: "점성계수", nameEn: "Dynamic Viscosity", unit: "Pa·s", desc: "유체의 흐름에 대한 저항" },
          { symbol: "ν", reading: "Nu", nameKr: "동점성계수", nameEn: "Kinematic Viscosity", unit: "m²/s", desc: "점성계수를 밀도로 나눈 값 (μ/ρ)" },
          { symbol: "σ", reading: "Sigma", nameKr: "표면장력", nameEn: "Surface Tension", unit: "N/m", desc: "액체 표면을 최소화하려는 힘" },
          { symbol: "K", reading: "K", nameKr: "체적탄성계수", nameEn: "Bulk Modulus", unit: "Pa", desc: "압력 변화에 따른 체적 변화의 저항" },
          { symbol: "SG", reading: "SG", nameKr: "비중", nameEn: "Specific Gravity", unit: "-", desc: "표준 물질(물)에 대한 밀도 비" },
          { symbol: "β", reading: "Beta", nameKr: "체적팽창계수", nameEn: "Thermal Expansion Coefficient", unit: "1/K", desc: "온도 변화에 따른 부피 팽창 비율" },
          { symbol: "R", reading: "R", nameKr: "기체 상수", nameEn: "Gas Constant", unit: "J/kg·K", desc: "특정 기체의 상태 방정식에 사용되는 상수" },
          { symbol: "κ", reading: "Kappa", nameKr: "비열비", nameEn: "Ratio of Specific Heats", unit: "-", desc: "정압비열과 정적비열의 비 (c_p/c_v)" },
          { symbol: "g", reading: "g", nameKr: "중력가속도", nameEn: "Gravitational Acceleration", unit: "m/s²", desc: "지구 표면 중력 가속도 (9.81 m/s²)" }
        ]
      },
      {
        id: 'flow', name: '유동 변수',
        items: [
          { symbol: "P", reading: "P", nameKr: "압력", nameEn: "Pressure", unit: "Pa", desc: "단위 면적당 수직으로 작용하는 힘" },
          { symbol: "V", reading: "V", nameKr: "속도", nameEn: "Velocity", unit: "m/s", desc: "단위 시간당 변위" },
          { symbol: "Q", reading: "Q", nameKr: "체적유량", nameEn: "Volumetric Flow Rate", unit: "m³/s", desc: "단위 시간당 흐르는 체적" },
          { symbol: "ṁ", reading: "m-dot", nameKr: "질량유량", nameEn: "Mass Flow Rate", unit: "kg/s", desc: "단위 시간당 흐르는 질량" },
          { symbol: "L", reading: "L", nameKr: "관 길이", nameEn: "Pipe Length", unit: "m", desc: "배관의 길이. 마찰손실 계산에 사용" },
          { symbol: "A", reading: "A", nameKr: "단면적", nameEn: "Cross-sectional Area", unit: "m²", desc: "유체가 흐르는 단면의 넓이" },
          { symbol: "z", reading: "z", nameKr: "위치수두", nameEn: "Elevation Head", unit: "m", desc: "기준면으로부터의 높이. 베르누이 방정식의 위치에너지 항" },
          { symbol: "ω", reading: "Omega", nameKr: "각속도", nameEn: "Angular Velocity", unit: "rad/s", desc: "단위 시간당 회전각" },
          { symbol: "ψ", reading: "Psi", nameKr: "유선함수", nameEn: "Stream Function", unit: "m²/s", desc: "2차원 비압축성 유동의 가시화" }
        ]
      },
      {
        id: 'heat', name: '열/에너지',
        items: [
          { symbol: "T", reading: "T", nameKr: "온도", nameEn: "Temperature", unit: "K, °C", desc: "물체의 차갑고 뜨거운 정도" },
          { symbol: "h", reading: "h", nameKr: "엔탈피", nameEn: "Enthalpy", unit: "J/kg", desc: "내부 에너지와 유동 일의 합 (u+Pv)" },
          { symbol: "s", reading: "s", nameKr: "엔트로피", nameEn: "Entropy", unit: "J/kg·K", desc: "시스템의 무질서도 또는 에너지 가용성 지표" },
          { symbol: "k_th", reading: "k", nameKr: "열전도율", nameEn: "Thermal Conductivity", unit: "W/m·K", desc: "열이 전달되는 효율" },
          { symbol: "c_p", reading: "c_p", nameKr: "정압비열", nameEn: "Specific Heat (Const. P)", unit: "J/kg·K", desc: "압력이 일정할 때의 비열" },
          { symbol: "α", reading: "Alpha", nameKr: "열확산율", nameEn: "Thermal Diffusivity", unit: "m²/s", desc: "열이 퍼져나가는 속도 (k/ρc_p)" },
          { symbol: "h_c", reading: "h_c", nameKr: "대류열전달계수", nameEn: "Heat Transfer Coefficient", unit: "W/m²·K", desc: "유체와 고체 표면 사이의 열전달 효율" }
        ]
      },
      {
        id: 'geometry', name: '기하/마찰',
        items: [
          { symbol: "D", reading: "D", nameKr: "직경", nameEn: "Diameter", unit: "m", desc: "관 또는 물체의 지름" },
          { symbol: "D_h", reading: "D_h", nameKr: "수력 직경", nameEn: "Hydraulic Diameter", unit: "m", desc: "비원형 관의 특성 길이 (4A/P)" },
          { symbol: "ε", reading: "Epsilon", nameKr: "거칠기", nameEn: "Roughness", unit: "m", desc: "관 내벽의 물리적 거칠기 정도" },
          { symbol: "f", reading: "f", nameKr: "마찰계수", nameEn: "Friction Factor", unit: "-", desc: "관 내 유동의 마찰 손실 계수 (Darcy-Weisbach)" },
          { symbol: "C", reading: "C", nameKr: "하젠-윌리엄스 계수", nameEn: "Hazen-Williams Coefficient", unit: "-", desc: "배관 재질에 따른 마찰손실 계수 (강관: 120, 주철: 100)" },
          { symbol: "K_L", reading: "K_L", nameKr: "부차적 손실 계수", nameEn: "Minor Loss Coefficient", unit: "-", desc: "엘보, 밸브 등 배관 부속품에 의한 에너지 손실 계수" },
          { symbol: "ΔP", reading: "Delta P", nameKr: "압력 강하", nameEn: "Pressure Drop", unit: "Pa", desc: "유동 경로를 따라 발생하는 압력 손실" },
          { symbol: "h_f", reading: "h_f", nameKr: "마찰손실 수두", nameEn: "Friction Head Loss", unit: "m", desc: "관 마찰에 의한 수두 손실 (Darcy-Weisbach: f·L/D·V²/2g)" },
          { symbol: "h_l", reading: "h_l", nameKr: "총 수두손실", nameEn: "Total Head Loss", unit: "m", desc: "마찰 손실 수두와 부차 손실 수두의 합" },
          { symbol: "H", reading: "H", nameKr: "전양정", nameEn: "Total Head / Pump Head", unit: "m", desc: "펌프가 유체에 공급하는 총 수두" },
          { symbol: "η", reading: "Eta", nameKr: "펌프 효율", nameEn: "Pump Efficiency", unit: "%", desc: "펌프 입력 동력 대비 실제 유체 전달 동력 비율" },
          { symbol: "NPSH", reading: "NPSH", nameKr: "유효흡입수두", nameEn: "Net Positive Suction Head", unit: "m", desc: "공동현상 방지를 위한 흡입측 압력 수두 (NPSHa ≥ NPSHr)" },
          { symbol: "N", reading: "N", nameKr: "회전수", nameEn: "Rotational Speed", unit: "rpm", desc: "펌프 임펠러의 분당 회전수" },
          { symbol: "N_s", reading: "N_s", nameKr: "비속도", nameEn: "Specific Speed", unit: "-", desc: "펌프 형식 선정을 위한 무차원 수 (N√Q / H^(3/4))" }
        ]
      },
      {
        id: 'dimensionless', name: '무차원 수',
        items: [
          { symbol: "Re", reading: "Reynolds Number", nameKr: "레이놀즈 수", nameEn: "Reynolds Number", unit: "-", desc: "관성력/점성력 (ρvL/μ). 층류(Re<2300), 난류(Re>4000)" },
          { symbol: "Ma", reading: "Mach Number", nameKr: "마하 수", nameEn: "Mach Number", unit: "-", desc: "유속/음속 (v/a)" },
          { symbol: "Fr", reading: "Froude Number", nameKr: "프루드 수", nameEn: "Froude Number", unit: "-", desc: "관성력/중력 (v/√(gL))" },
          { symbol: "Pr", reading: "Prandtl Number", nameKr: "프란틀 수", nameEn: "Prandtl Number", unit: "-", desc: "운동량 확산/열 확산 (μc_p/k)" },
          { symbol: "Nu", reading: "Nusselt Number", nameKr: "누셀 수", nameEn: "Nusselt Number", unit: "-", desc: "대류 열전달/전도 열전달 (hL/k)" },
          { symbol: "We", reading: "Weber Number", nameKr: "웨버 수", nameEn: "Weber Number", unit: "-", desc: "관성력/표면장력" },
          { symbol: "Eu", reading: "Euler Number", nameKr: "오일러 수", nameEn: "Euler Number", unit: "-", desc: "압력/관성력" },
          { symbol: "St", reading: "Strouhal Number", nameKr: "스트로할 수", nameEn: "Strouhal Number", unit: "-", desc: "진동 관성력/대류 관성력 (fL/v)" }
        ]
      }
    ]
  },

  // =============================================
  // 🔥 소방기계 (Fire Mechanical Engineering)
  // =============================================
  {
    subjectId: 'firemech',
    subjectName: '소방기계',
    icon: '🔥',
    categories: [
      {
        id: 'fm_design', name: '소방기계공학',
        items: [
          { symbol: "Q_d", reading: "Q_d", nameKr: "설계유량", nameEn: "Design Flow Rate", unit: "L/min", desc: "소화설비별 NFSC 기준 최소 방수량. 스프링클러: 80 L/min, 옥내소화전: 130 L/min" },
          { symbol: "H_d", reading: "H_d", nameKr: "설계양정", nameEn: "Design Head", unit: "m", desc: "소방펌프 선정 시 필요한 최소 압력수두 (마찰손실 + 고도차 + 방수압 포함)" },
          { symbol: "P_d", reading: "P_d", nameKr: "설계압력", nameEn: "Design Pressure", unit: "MPa", desc: "소화배관 설계 기준 압력. 스프링클러 최소 방수압: 0.1 MPa" },
          { symbol: "K_f", reading: "K-factor", nameKr: "스프링클러 유량계수", nameEn: "Sprinkler K-factor", unit: "L/min/bar⁰·⁵", desc: "Q = K√P. 표준형 헤드: K=80, 대용량: K=115, K=161" },
          { symbol: "RTI", reading: "RTI", nameKr: "감응시간지수", nameEn: "Response Time Index", unit: "(m·s)⁰·⁵", desc: "스프링클러 헤드의 열 감도 지수. RTI ≤ 50: 빠른 반응, ≤ 80: 특수 반응" },
          { symbol: "A_s", reading: "A_s", nameKr: "살수면적", nameEn: "Sprinkler Coverage Area", unit: "m²", desc: "스프링클러 헤드 1개의 보호 면적. 표준형: 최대 20m²" },
          { symbol: "N_h", reading: "N_h", nameKr: "동시개방 헤드수", nameEn: "Number of Heads (Simultaneous)", unit: "개", desc: "설계 기준 동시에 방수되는 최소 헤드 수" },
          { symbol: "d_o", reading: "d_o", nameKr: "오리피스 직경", nameEn: "Orifice Diameter", unit: "mm", desc: "스프링클러 헤드의 물 방출구 직경. 표준형: 12.7mm" },
          { symbol: "P_min", reading: "P_min", nameKr: "최소 방수압", nameEn: "Minimum Discharge Pressure", unit: "MPa", desc: "각 헤드에서 요구되는 최소 작동 압력. 스프링클러: 0.1 MPa, 옥내소화전: 0.17 MPa" },
          { symbol: "Q_r", reading: "Q_r", nameKr: "수원 방수량", nameEn: "Required Water Flow", unit: "m³", desc: "소화에 필요한 총 수원량 (Q_d × N_h × t)" },
          { symbol: "V_w", reading: "V_w", nameKr: "수조용량", nameEn: "Water Tank Volume", unit: "m³", desc: "소화수조 또는 옥상수조의 유효 저수량" },
          { symbol: "t_d", reading: "t_d", nameKr: "방수시간", nameEn: "Discharge Duration", unit: "min", desc: "NFSC 기준 소화설비 최소 방수 지속 시간. 스프링클러: 20분" }
        ]
      },
      {
        id: 'fm_facility', name: '소방기계시설론',
        items: [
          { symbol: "L_eq", reading: "L_eq", nameKr: "등가길이", nameEn: "Equivalent Length", unit: "m", desc: "엘보·밸브 등 부속품의 마찰손실을 직관 길이로 환산한 값" },
          { symbol: "E_r", reading: "E_r", nameKr: "팽창비", nameEn: "Expansion Ratio", unit: "-", desc: "포소화약제가 물과 혼합 시 팽창되는 배율. 저팽창: 20배 미만, 고팽창: 80배 이상" },
          { symbol: "C_f", reading: "C_f", nameKr: "포 농도", nameEn: "Foam Concentration", unit: "%", desc: "포소화약제의 혼합 농도 (물 대비 약제 비율). 일반형: 3%, 수성막포: 3~6%" },
          { symbol: "ṁ_a", reading: "m-dot_a", nameKr: "약제 방출률", nameEn: "Agent Discharge Rate", unit: "kg/min", desc: "이산화탄소·할론·분말 등 가스 소화약제의 방출 속도" },
          { symbol: "W_a", reading: "W_a", nameKr: "소화약제량", nameEn: "Agent Quantity", unit: "kg", desc: "소화에 필요한 총 소화약제의 질량" },
          { symbol: "C_CO2", reading: "C_CO2", nameKr: "CO₂ 설계농도", nameEn: "CO₂ Design Concentration", unit: "%", desc: "이산화탄소 소화설비 기준 소화 농도. 일반가연물: 34%, 전기화재: 50%" },
          { symbol: "Q_co2", reading: "Q_co2", nameKr: "CO₂ 방출량", nameEn: "CO₂ Discharge Amount", unit: "kg", desc: "방호구역 용적에 따른 최소 이산화탄소 약제 필요량" },
          { symbol: "V_r", reading: "V_r", nameKr: "방호구역 체적", nameEn: "Protected Zone Volume", unit: "m³", desc: "가스 소화설비 설계 시 기준이 되는 방호구역의 내부 체적" },
          { symbol: "S_p", reading: "S_p", nameKr: "포 방출률", nameEn: "Foam Solution Rate", unit: "L/min/m²", desc: "단위 면적당 포 수용액 방출 속도" },
          { symbol: "I_f", reading: "I_f", nameKr: "방수강도", nameEn: "Water Discharge Intensity", unit: "L/min/m²", desc: "물분무설비 단위 면적당 방수량. 일반급: 10 L/min/m²" }
        ]
      }
    ]
  },

  // =============================================
  // ⚡ 소방전기 (Fire Electrical Engineering)
  // =============================================
  {
    subjectId: 'fireelec',
    subjectName: '소방전기',
    icon: '⚡',
    categories: [
      {
        id: 'fe_basic', name: '기초 전기',
        items: [
          { symbol: "V", reading: "Volt", nameKr: "전압", nameEn: "Voltage", unit: "V", desc: "두 점 사이의 전위차. 옴의 법칙: V = IR" },
          { symbol: "I", reading: "Ampere", nameKr: "전류", nameEn: "Current", unit: "A", desc: "단위 시간당 이동하는 전하량 (I = V/R)" },
          { symbol: "R_e", reading: "Resistance", nameKr: "저항", nameEn: "Resistance", unit: "Ω", desc: "전류 흐름에 대한 방해 정도 (R = V/I). 소방 배선 저항 계산에 사용" },
          { symbol: "P_e", reading: "Power", nameKr: "전력", nameEn: "Electric Power", unit: "W", desc: "단위 시간당 전기 에너지 소비량 (P = VI = I²R). 소방 설비 전력 산정" },
          { symbol: "W_e", reading: "Energy", nameKr: "전기 에너지", nameEn: "Electric Energy", unit: "Wh", desc: "전력과 시간의 곱 (W = P × t). 비상전원 용량 계산에 사용" },
          { symbol: "Z", reading: "Impedance", nameKr: "임피던스", nameEn: "Impedance", unit: "Ω", desc: "교류 회로에서의 전체 저항 (Z = √(R² + X²))" },
          { symbol: "f_hz", reading: "Frequency", nameKr: "주파수", nameEn: "Frequency", unit: "Hz", desc: "교류 전원의 초당 파형 반복 횟수. 국내: 60Hz" },
          { symbol: "cos φ", reading: "cos phi", nameKr: "역률", nameEn: "Power Factor", unit: "-", desc: "유효전력/피상전력. 역률 개선으로 전기 손실 최소화" },
          { symbol: "S", reading: "S", nameKr: "피상전력", nameEn: "Apparent Power", unit: "VA", desc: "전압과 전류의 곱 (S = VI). 소방 설비 변압기·발전기 용량 선정 기준" },
          { symbol: "C_e", reading: "Capacitance", nameKr: "커패시턴스", nameEn: "Capacitance", unit: "F", desc: "전하를 저장하는 능력. 소방 회로 필터 및 서지 보호에 활용" },
          { symbol: "τ", reading: "Tau", nameKr: "시정수", nameEn: "Time Constant", unit: "s", desc: "RC 또는 RL 회로의 응답 속도 (τ = RC). 화재 감지 회로 지연 특성 분석" }
        ]
      },
      {
        id: 'fe_detection', name: '감지/경보 설비',
        items: [
          { symbol: "HRR", reading: "HRR", nameKr: "열방출률", nameEn: "Heat Release Rate", unit: "kW", desc: "화재에서 단위 시간당 방출되는 열에너지. 화재 성장 특성 분석의 핵심 변수" },
          { symbol: "α_t", reading: "alpha_t", nameKr: "화재성장률", nameEn: "Fire Growth Rate", unit: "kW/s²", desc: "t² 화재 모델에서 HRR 증가 속도 (Q = α·t²). 느린: 0.003, 중간: 0.012, 빠른: 0.047" },
          { symbol: "RTI_d", reading: "RTI_d", nameKr: "감지기 RTI", nameEn: "Detector Response Time Index", unit: "(m·s)⁰·⁵", desc: "열감지기의 열 응답 특성 지수. 작을수록 빠른 감지" },
          { symbol: "T_a", reading: "T_a", nameKr: "주위 온도", nameEn: "Ambient Temperature", unit: "°C", desc: "감지기 설치 공간의 평상시 온도. 감지기 선택 기준에 직접 영향" },
          { symbol: "T_set", reading: "T_set", nameKr: "작동 설정온도", nameEn: "Set Temperature", unit: "°C", desc: "열감지기 작동 기준 온도. 1종: 60~75°C, 2종: 56~63°C" },
          { symbol: "d_s", reading: "d_s", nameKr: "감지기 설치간격", nameEn: "Detector Spacing", unit: "m", desc: "NFSC 기준 감지기 간 최대 설치 거리. 차동식: 9m(1종), 11m(2종)" },
          { symbol: "A_d", reading: "A_d", nameKr: "감지기 감지면적", nameEn: "Detector Coverage Area", unit: "m²", desc: "감지기 1개가 담당하는 최대 수평 면적" },
          { symbol: "n_d", reading: "n_d", nameKr: "감지기 설치수", nameEn: "Number of Detectors", unit: "개", desc: "방호구역 면적 ÷ 감지면적으로 산정하는 최소 감지기 수" },
          { symbol: "I_loop", reading: "I_loop", nameKr: "루프 전류", nameEn: "Loop Current", unit: "mA", desc: "P형 수신기 감지기 회로의 정상 감시 전류. 단선시 0mA, 단락시 과전류" },
          { symbol: "V_batt", reading: "V_batt", nameKr: "비상전원 전압", nameEn: "Emergency Power Voltage", unit: "V", desc: "화재수신기 비상전원 (축전지) 전압. 주로 24V DC 사용" },
          { symbol: "t_batt", reading: "t_batt", nameKr: "비상전원 유지시간", nameEn: "Emergency Power Duration", unit: "min", desc: "상용전원 차단 시 축전지에 의한 최소 감시 유지 시간. NFSC: 10분 이상" }
        ]
      }
    ]
  },

  // =============================================
  // 📋 NFSC (국가화재안전기준)
  // =============================================
  {
    subjectId: 'nfsc',
    subjectName: 'NFSC',
    icon: '📋',
    categories: [
      {
        id: 'nfsc_sprinkler', name: '스프링클러',
        items: [
          { symbol: "Q ≥ 80", reading: "Q_min", nameKr: "최소 방수량", nameEn: "Minimum Discharge (Sprinkler)", unit: "L/min", desc: "NFSC 103. 스프링클러 헤드 1개당 최소 방수량 기준" },
          { symbol: "P ≥ 0.1", reading: "P_min", nameKr: "최소 방수압", nameEn: "Minimum Discharge Pressure", unit: "MPa", desc: "NFSC 103. 각 헤드에서 보장되어야 하는 최소 방수 압력" },
          { symbol: "P ≤ 1.2", reading: "P_max", nameKr: "최대 방수압", nameEn: "Maximum Discharge Pressure", unit: "MPa", desc: "NFSC 103. 헤드 파손 방지를 위한 최대 허용 압력" },
          { symbol: "t ≥ 20", reading: "t_min", nameKr: "방수시간", nameEn: "Minimum Discharge Time", unit: "min", desc: "NFSC 103. 스프링클러설비 최소 연속 방수 시간" },
          { symbol: "A_s ≤ 20", reading: "A_s_max", nameKr: "헤드 보호면적", nameEn: "Max Coverage Area/Head", unit: "m²/개", desc: "NFSC 103. 표준형 스프링클러 헤드 1개당 최대 살수 보호면적" },
          { symbol: "S ≤ 3.6", reading: "S_max", nameKr: "헤드 최대수평거리", nameEn: "Max Horizontal Spacing", unit: "m", desc: "NFSC 103. 스프링클러 헤드 간 최대 수평 거리 (정사각형 배치 기준)" },
          { symbol: "h ≤ 0.3", reading: "h_max", nameKr: "헤드-천장 간격", nameEn: "Head-to-Ceiling Gap", unit: "m", desc: "NFSC 103. 스프링클러 헤드와 천장 사이의 최대 설치 간격" }
        ]
      },
      {
        id: 'nfsc_hydrant', name: '소화전',
        items: [
          { symbol: "Q ≥ 130", reading: "Q_hydrant", nameKr: "옥내소화전 방수량", nameEn: "Inside Hydrant Flow Rate", unit: "L/min", desc: "NFSC 102. 옥내소화전 노즐 1개당 최소 방수량" },
          { symbol: "P ≥ 0.17", reading: "P_hydrant", nameKr: "옥내소화전 방수압", nameEn: "Inside Hydrant Pressure", unit: "MPa", desc: "NFSC 102. 옥내소화전 노즐 최소 방수압 (노즐 선단 기준)" },
          { symbol: "Q ≥ 350", reading: "Q_outside", nameKr: "옥외소화전 방수량", nameEn: "Outside Hydrant Flow Rate", unit: "L/min", desc: "NFSC 109. 옥외소화전 1개당 최소 방수량" },
          { symbol: "P ≥ 0.25", reading: "P_outside", nameKr: "옥외소화전 방수압", nameEn: "Outside Hydrant Pressure", unit: "MPa", desc: "NFSC 109. 옥외소화전 노즐 최소 방수압" },
          { symbol: "L ≤ 25", reading: "L_hose", nameKr: "호스 최대길이", nameEn: "Max Hose Length", unit: "m", desc: "NFSC 102. 옥내소화전 연결 호스 1롤당 최대 길이" },
          { symbol: "N ≥ 2", reading: "N_hydrant", nameKr: "동시 작동 소화전 수", nameEn: "Simultaneous Hydrants", unit: "개", desc: "NFSC 102. 설계 기준 동시에 작동하는 최소 소화전 수 (5층 이상 건물)" }
        ]
      },
      {
        id: 'nfsc_pump', name: '소방펌프',
        items: [
          { symbol: "H_total", reading: "H_total", nameKr: "펌프 전양정", nameEn: "Total Pump Head", unit: "m", desc: "h_f(배관마찰) + h_m(부차손실) + Δz(높이차) + h_d(방수압 환산수두)의 합" },
          { symbol: "Q_pump", reading: "Q_pump", nameKr: "펌프 정격유량", nameEn: "Pump Rated Flow", unit: "L/min", desc: "NFSC 기준 충족을 위한 소방펌프의 최소 필요 토출량" },
          { symbol: "P_pump", reading: "P_pump", nameKr: "펌프 정격양정", nameEn: "Pump Rated Head", unit: "MPa", desc: "소방펌프의 정격 토출 압력. 전양정(m)을 압력(MPa)로 환산: H/102" },
          { symbol: "NPSHr", reading: "NPSHr", nameKr: "필요흡입수두", nameEn: "Required NPSH", unit: "m", desc: "공동현상 방지를 위해 펌프가 요구하는 최소 유효흡입수두" },
          { symbol: "NPSHa", reading: "NPSHa", nameKr: "유효흡입수두", nameEn: "Available NPSH", unit: "m", desc: "실제 흡입 배관 조건에서 확보되는 유효흡입수두 (NPSHa ≥ NPSHr 조건 필수)" },
          { symbol: "η_pump", reading: "eta_pump", nameKr: "펌프 효율", nameEn: "Pump Efficiency", unit: "%", desc: "소방펌프 전동기 효율. 설계 시 펌프축동력 산정에 사용" },
          { symbol: "P_motor", reading: "P_motor", nameKr: "전동기 출력", nameEn: "Motor Output", unit: "kW", desc: "소방펌프 구동 전동기 필요 출력 = γQH / (102η)" }
        ]
      },
      {
        id: 'nfsc_alarm', name: '경보/감지',
        items: [
          { symbol: "t_alarm ≤ 30", reading: "t_alarm", nameKr: "경보 응답시간", nameEn: "Alarm Response Time", unit: "s", desc: "NFSC 203. 화재 감지기 작동부터 수신기 경보까지 허용 최대 시간" },
          { symbol: "N_det", reading: "N_det", nameKr: "감지기 설치수", nameEn: "Number of Detectors Required", unit: "개", desc: "방호면적 ÷ 1개 감지면적으로 계산. 천장 높이·구조에 따라 달라짐" },
          { symbol: "A_det ≤ 150", reading: "A_det", nameKr: "차동식 감지면적(1종)", nameEn: "Differential (Class 1) Coverage", unit: "m²", desc: "NFSC 203. 차동식 스포트형 1종 감지기 1개당 최대 감지 면적" },
          { symbol: "H_det ≤ 4", reading: "H_det", nameKr: "감지기 최소 설치고", nameEn: "Min. Detector Installation Height", unit: "m 미만", desc: "감지기 종류별 설치 가능 최대 천장 높이. 이온화 연기: 20m 이하" },
          { symbol: "V_bat ≥ 24", reading: "V_bat", nameKr: "수신기 비상전원", nameEn: "Receiver Emergency Voltage", unit: "V", desc: "NFSC 203. P형·R형 수신기 비상전원 전압 기준. 통상 24V DC 축전지" },
          { symbol: "t_bat ≥ 10", reading: "t_bat", nameKr: "비상전원 유지시간", nameEn: "Emergency Power Duration", unit: "min", desc: "NFSC 203. 상용전원 차단 시 정상 감시 상태 유지 최소 시간" }
        ]
      }
    ]
  }
];
