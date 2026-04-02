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

export const CHART_DATA = [
  { time: '08:00', rate: 1100, target: 1150 },
  { time: '09:00', rate: 1150, target: 1150 },
  { time: '10:00', rate: 1080, target: 1150 },
  { time: '11:00', rate: 1210, target: 1150 },
  { time: '12:00', rate: 1190, target: 1150 },
  { time: '13:00', rate: 1240, target: 1150 },
  { time: '14:00', rate: 1260, target: 1150 },
  { time: '15:00', rate: 1220, target: 1150 },
];

export const CALENDAR_EVENTS = [
  { date: new Date(), title: 'Batch Alpha-9 Welding', type: 'production' },
  { date: new Date(new Date().setDate(new Date().getDate() + 1)), title: 'WR-004 Calibration', type: 'maintenance' },
  { date: new Date(new Date().setDate(new Date().getDate() - 1)), title: 'Shift B Review', type: 'personnel' },
];

export const REALTIME_PRODUCTION_DATA = [
  { timestamp: "2024-02-15T10:00:00Z", productionRate: 105, defectRate: 1.2, robotEfficiency: 94, energyConsumption: 490 },
  { timestamp: "2024-02-15T10:15:00Z", productionRate: 108, defectRate: 1.1, robotEfficiency: 95, energyConsumption: 505 },
  { timestamp: "2024-02-15T10:30:00Z", productionRate: 92, defectRate: 3.5, robotEfficiency: 82, energyConsumption: 550 },
  { timestamp: "2024-02-15T10:45:00Z", productionRate: 88, defectRate: 4.2, robotEfficiency: 78, energyConsumption: 580 },
];

export const HISTORICAL_PRODUCTION_DATA = [
  { timestamp: "2024-02-14T10:00:00Z", productionRate: 102, defectRate: 1.5, robotEfficiency: 92, energyConsumption: 495 },
  { timestamp: "2024-02-14T10:30:00Z", productionRate: 104, defectRate: 1.4, robotEfficiency: 93, energyConsumption: 498 },
];

export const EXPECTED_METRICS = {
  productionRateMin: 95,
  productionRateMax: 115,
  defectRateMax: 2.5,
  robotEfficiencyMin: 88
};