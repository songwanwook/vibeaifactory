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
  { id: 1, title: '연차보고서 작성', start: 3, end: 7, color: 'bg-blue-500' },
  { id: 2, title: 'Transguard 프로젝트', start: 5, end: 5, color: 'bg-indigo-500' },
  { id: 3, title: '연차보고서 수정', start: 9, end: 13, color: 'bg-sky-500' },
  { id: 4, title: '1차년도 종료', start: 31, end: 31, color: 'bg-blue-400' },
  { id: 5, title: '2차년도 시작', start: 31, end: 31, color: 'bg-indigo-400' },
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
