'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Monitor, RefreshCw, ShieldCheck, Wifi, Thermometer, Battery } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

const ROBOT_STATS = [
  { subject: '정밀도', A: 95, fullMark: 100 },
  { subject: '속도', A: 88, fullMark: 100 },
  { subject: '토크', A: 92, fullMark: 100 },
  { subject: '안정성', A: 99, fullMark: 100 },
  { subject: '효율', A: 85, fullMark: 100 },
];

const LOG_DATA = [
  { time: '14:20:05', robot: 'WR-01', event: '경로 최적화 완료', type: 'INFO' },
  { time: '14:18:32', robot: 'WR-04', event: '통신 노이즈 감지', type: 'WARN' },
  { time: '14:15:10', robot: 'WR-01', event: '작업 오더 수신 (B12P)', type: 'INFO' },
  { time: '14:10:00', robot: 'WR-02', event: '냉각 시스템 가동', type: 'INFO' },
  { time: '13:55:45', robot: 'WR-04', event: '비상 정지 해제', type: 'INFO' },
];

type JointData = {
  id: number;
  angle: string;
  velocity: string;
  torque: string;
  errorCode: string;
};

export default function RobotsMonitoringPage() {
  const [joints, setJoints] = useState<JointData[]>([]);

  useEffect(() => {
    // Client-side only data generation to avoid hydration mismatch
    const generatedJoints = [1, 2, 3, 4, 5, 6].map((j) => ({
      id: j,
      angle: `${(Math.random() * 180).toFixed(2)}°`,
      velocity: '0.85 rad/s',
      torque: (Math.random() * 50).toFixed(1),
      errorCode: '0x00 (Normal)',
    }));
    setJoints(generatedJoints);
  }, []);

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 상세 모니터링</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">5-4 로봇 모니터링 시스템</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor size={20} className="text-accent" />
            <h2 className="text-xl font-bold">로봇 정밀 진단 시스템</h2>
          </div>
          <Button size="sm" className="bg-blue-600 h-8 text-xs">
            <RefreshCw size={14} className="mr-2" /> 시스템 재진단
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#1e293b] border border-white/10 rounded-lg p-6 flex flex-col items-center justify-center space-y-4 h-[350px]">
            <div className="relative w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={ROBOT_STATS}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar name="WR-01" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-bold text-white">종합 헬스 인덱스</h4>
              <p className="text-2xl font-black text-green-400">92.8 <span className="text-xs font-normal text-slate-500">Pts</span></p>
            </div>
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-lg p-6 grid grid-cols-2 gap-4 h-[350px]">
            {[
              { label: '네트워크 상태', value: 'Excellent', icon: Wifi, color: 'text-blue-400' },
              { label: '구동부 온도', value: '42.5°C', icon: Thermometer, color: 'text-orange-400' },
              { label: '배터리/전원', value: '98%', icon: Battery, color: 'text-green-400' },
              { label: '보안 무결성', value: 'Verified', icon: ShieldCheck, color: 'text-accent' },
            ].map((item, i) => (
              <div key={i} className="bg-[#0f172a] rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2 border border-white/5">
                <item.icon size={24} className={item.color} />
                <p className="text-[10px] text-slate-500 font-bold uppercase">{item.label}</p>
                <p className="text-sm font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-lg overflow-hidden flex flex-col h-[350px]">
            <div className="bg-[#334155] px-4 py-2">
              <span className="text-xs font-bold uppercase tracking-widest">실시간 운영 로그</span>
            </div>
            <div className="flex-1 overflow-auto bg-[#111827]">
              <Table className="text-[10px]">
                <TableBody>
                  {LOG_DATA.map((log, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-white/5 h-10">
                      <TableCell className="font-mono text-slate-500">{log.time}</TableCell>
                      <TableCell className="font-bold text-blue-400">{log.robot}</TableCell>
                      <TableCell className="text-slate-300">{log.event}</TableCell>
                      <TableCell>
                        <span className={log.type === 'WARN' ? 'text-red-400' : 'text-slate-500'}>
                          {log.type}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] border border-white/10 rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-4 py-1.5 flex items-center justify-between">
            <span className="text-xs font-bold">로봇 관절별 데이터 스트리밍 (J1-J6)</span>
            <div className="flex items-center gap-4 text-[10px]">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Normal</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Warning</div>
            </div>
          </div>
          <Table className="text-[11px]">
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white text-center">Axis</TableHead>
                <TableHead className="text-white text-center">Current Angle</TableHead>
                <TableHead className="text-white text-center">Velocity</TableHead>
                <TableHead className="text-white text-center">Torque (Nm)</TableHead>
                <TableHead className="text-white text-center">Error Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#111827]">
              {joints.length > 0 ? (
                joints.map((joint) => (
                  <TableRow key={joint.id} className="border-white/5">
                    <TableCell className="text-center font-bold text-slate-400">Joint {joint.id}</TableCell>
                    <TableCell className="text-center text-white">{joint.angle}</TableCell>
                    <TableCell className="text-center text-accent">{joint.velocity}</TableCell>
                    <TableCell className="text-center text-white">{joint.torque}</TableCell>
                    <TableCell className="text-center text-slate-500">{joint.errorCode}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-slate-500 italic">
                    데이터 로딩 중...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}