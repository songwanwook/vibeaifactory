export const ROBOTS = [
  {
    id: 'WR-001',
    name: 'Apollo Weld-7',
    status: 'OPERATING',
    efficiency: 94.5,
    lastMaintenance: '2023-11-15',
    specifications: '6-Axis, 2.5m Reach',
    energyConsumption: 450,
    uptime: '142h',
  },
  {
    id: 'WR-002',
    name: 'Titan Weld-X',
    status: 'OPERATING',
    efficiency: 89.2,
    lastMaintenance: '2023-12-01',
    specifications: '6-Axis, 3.0m Reach',
    energyConsumption: 510,
    uptime: '98h',
  },
  {
    id: 'WR-003',
    name: 'Vulcan Pro',
    status: 'STANDBY',
    efficiency: 91.0,
    lastMaintenance: '2023-11-20',
    specifications: 'Dual-Arm Precision',
    energyConsumption: 120,
    uptime: '210h',
  },
  {
    id: 'WR-004',
    name: 'Zephyr Mini',
    status: 'UNAVAILABLE',
    efficiency: 0,
    lastMaintenance: '2024-01-05',
    specifications: 'Compact 4-Axis',
    energyConsumption: 0,
    uptime: '45h',
  },
  {
    id: 'WR-005',
    name: 'Atlas Heavy',
    status: 'OPERATING',
    efficiency: 96.8,
    lastMaintenance: '2023-10-10',
    specifications: 'High Payload 6-Axis',
    energyConsumption: 680,
    uptime: '315h',
  }
];

export const KPIS = [
  { label: 'Overall Efficiency', value: '92.4%', trend: '+2.1%', status: 'optimal' },
  { label: 'Active Robots', value: '4 / 5', trend: 'Steady', status: 'warning' },
  { label: 'Production Rate', value: '1,240 p/h', trend: '+12%', status: 'optimal' },
  { label: 'Defect Rate', value: '0.8%', trend: '-0.3%', status: 'optimal' },
];

export const CALENDAR_EVENTS = [
  { id: 1, title: '라인2 정기점검', start: '2025-08-28 09:00:00', end: '2025-08-28 11:00:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 2, title: '[25059] 4021-E32P, 1~5, 이몽룡[5]', start: '2025-08-25 09:00:00', end: '2025-08-27 18:00:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 3, title: '연차', start: '2025-08-25 00:00:00', end: '2025-08-26 00:00:00', all_day: true, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
  { id: 4, title: '[25038] 4201-B22S, 1~15, 이몽룡[1]', start: '2025-09-10 09:30:00', end: '2025-09-12 18:30:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 5, title: '[6] 4021-B22S, 1~15', start: '2025-09-16 09:00:00', end: '2025-09-19 19:00:00', all_day: false, category: null, color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 6, title: '[6] 40210-E21P, 11~27', start: '2025-09-08 10:00:00', end: '2025-09-10 19:00:00', all_day: false, category: null, color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 7, title: '[25047] 4021-E31S, 6~15, 홍길동[6]', start: '2025-09-11 09:30:00', end: '2025-09-12 18:30:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 8, title: '[25061] 4021-E42S, 1~15, 미정[2]', start: '2025-09-29 10:00:00', end: '2025-10-01 18:10:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 9, title: '추석연휴', start: '2025-10-02 00:44:00', end: '2025-10-10 00:00:00', all_day: false, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
  { id: 10, title: '[25044] 4201-B12P, 1~19, 홍길동[6]', start: '2025-09-08 09:30:00', end: '2025-09-08 18:30:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 11, title: '[25059] 4021-E32P, 1~25, 이몽룡[6]', start: '2025-11-10 14:00:00', end: '2025-11-12 15:30:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 12, title: '[25036] 4201-B22S, 1~15, 홍길동[6]', start: '2025-11-10 08:00:00', end: '2025-11-12 18:00:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 13, title: '[25057] 4021-E31P, 8~32, 홍길동[1]', start: '2025-11-17 09:30:00', end: '2025-11-20 17:50:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 14, title: '[25053] 4201-E21P, 6~15, 이몽룡[1]', start: '2025-11-19 09:00:00', end: '2025-11-21 18:00:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 15, title: '[6] 8620-B12P, 1~19', start: '2025-09-01 10:00:00', end: '2025-09-04 18:00:00', all_day: false, category: '', color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 16, title: '[6] 4021-E31S, 6~15', start: '2025-09-11 08:00:00', end: '2025-09-12 18:30:00', all_day: false, category: '', color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 17, title: '[6호기] 고장 수리', start: '2025-09-05 10:00:00', end: '2025-09-06 21:00:00', all_day: false, category: '', color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 18, title: '[6] 40210-E21P. 11~27', start: '2025-09-08 09:00:00', end: '2025-09-10 18:00:00', all_day: true, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 19, title: '[6] 4021-E31S6~15', start: '2025-09-15 09:00:00', end: '2025-09-15 18:00:00', all_day: true, category: '', color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 20, title: '[25048] 4201-E21P, 1~15, 홍길동[2]', start: '2025-09-22 10:25:00', end: '2025-09-26 18:25:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 21, title: '오더 일정 작성', start: '2025-09-01 08:00:00', end: '2025-09-03 18:00:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 22, title: '[25061] 4021-E42S', start: '2025-11-17 07:30:00', end: '2025-11-19 19:30:00', all_day: false, category: '', color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 24, title: '용접로봇 점검', start: '2025-08-11 08:30:00', end: '2025-08-14 18:30:00', all_day: false, category: null, color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 25, title: 'dd', start: '2025-10-19 20:41:00', end: '2025-10-21 20:41:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 27, title: '연구본부 출장', start: '2025-09-22 09:00:00', end: '2025-09-26 18:00:00', all_day: false, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
  { id: 28, title: '[1] 842506-B12P 작업', start: '2025-11-03 09:00:00', end: '2025-11-07 18:00:00', all_day: false, category: '', color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 29, title: '박미진 대리 오후반차', start: '2025-11-07 13:00:00', end: '2025-11-07 18:00:00', all_day: false, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
  { id: 30, title: '인수인계 회의', start: '2025-10-31 14:00:00', end: '2025-10-31 15:00:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 31, title: '마킹기 동작 확인', start: '2025-11-03 09:00:00', end: '2025-11-06 18:00:00', all_day: true, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 32, title: 'R4 용접로봇 고장', start: '2025-11-03 09:00:00', end: '2025-11-06 18:00:00', all_day: false, category: '', color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 33, title: 'R4 용접로봇 수선', start: '2025-11-07 09:00:00', end: '2025-11-07 09:00:00', all_day: true, category: '', color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 34, title: '풍력사업부 출장', start: '2025-11-10 09:00:00', end: '2025-11-12 18:00:00', all_day: false, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
  { id: 35, title: '부산 발표', start: '2025-10-27 11:00:00', end: '2025-10-27 15:00:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 36, title: '신규 로봇 도입', start: '2025-11-24 09:00:00', end: '2025-11-25 18:00:00', all_day: true, category: '', color: '#8e44ad', ev_type: 'ROBOT' },
  { id: 39, title: '정명훈 대리 파견', start: '2025-12-08 11:00:00', end: '2025-12-08 18:00:00', all_day: true, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 40, title: '상하이 전시회 출장', start: '2025-12-03 09:00:00', end: '2025-12-06 18:00:00', all_day: false, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
  { id: 42, title: '손관욱 사원 연차', start: '2025-12-01 09:00:00', end: '2025-12-01 18:00:00', all_day: true, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
  { id: 44, title: '신인 인턴 입사', start: '2026-01-02 09:00:00', end: '2026-01-02 18:00:00', all_day: false, category: '업무', color: '#2e86de', ev_type: 'HUMAN' },
  { id: 46, title: '연구본부 XiRobot 방문', start: '2026-01-25 09:00:00', end: '2026-01-27 18:00:00', all_day: false, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
  { id: 47, title: '설 연휴', start: '2026-02-16 09:00:00', end: '2026-02-19 18:00:00', all_day: false, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
  { id: 48, title: '대체공휴일', start: '2026-03-02 00:00:00', end: '2026-03-02 23:59:00', all_day: true, category: '개인', color: '#27ae60', ev_type: 'HUMAN' },
];

export const PRECEDING_PROCESS_STATUS = [
  { name: '조립', actual: 272, expected: 575, diff: -303, unhandled: 2, unhandledExpected: 2, unhandledDiff: 0 },
  { name: '선행의장', actual: 108, expected: 78, diff: 30, unhandled: 4, unhandledExpected: 7, unhandledDiff: '75%' },
  { name: '1차PE', actual: 111, expected: 20, diff: 91, unhandled: '-', unhandledExpected: 5, unhandledDiff: '-' },
  { name: '선행도장', actual: 160, expected: 200, diff: -40, unhandled: 2, unhandledExpected: 1, unhandledDiff: '50%' },
];

export const WELDING_JOB_STATUS = [
  { process: '소조', plan: 134, actual: 222, progress: '98.5%', defect: 2, defectRate: '0.2%' },
  { process: '중조', plan: 75, actual: 50, progress: '66.7%', defect: 1, defectRate: '2.0%' },
];

export const ROBOT_STATUS_GRID = [
  { type: 'RB3', count: 4, operating: 4, standby: 0, unavailable: 0, rate: '76%' },
  { type: 'UR20', count: 1, operating: 0, standby: 1, unavailable: 0, rate: '76%' },
  { type: 'UR3', count: 4, operating: 2, standby: 1, unavailable: 1, rate: '76%' },
];

export const WELDING_ROBOT_KPI = [
  { category: '제어율', rb3: '85%', ur20: '80%', ur3: '90%', other: '-', avg: '85%' },
  { category: '생산성', rb3: '10%', ur20: '15%', ur3: '30%', other: '-', avg: '20%' },
  { category: '정확도', rb3: '92%', ur20: '95%', ur3: '98%', other: '-', avg: '95%' },
];
