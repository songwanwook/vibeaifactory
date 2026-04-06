'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cpu, Activity, AlertCircle, CheckCircle2, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const RUNTIME_DATA = [
  { time: '08:00', load: 45 },
  { time: '09:00', load: 72 },
  { time: '10:00', load: 88 },
  { time: '11:00', load: 94 },
  { time: '12:00', load: 20 },
  { time: '13:00', load: 65 },
  { time: '14:00', load: 91 },
  { time: '15:00', load: 85 },
];

const EQUIP_LIST = [
  { name: 'Weld Robot 01', type: 'RB3', status: 'Running', load: '92%', temp: '42°C', energy: '450W' },
  { name: 'Weld Robot 02', type: 'RB3', status: 'Running', load: '88%', temp: '38°C', energy: '420W' },
  { name: 'Weld Robot 03', type: 'UR20', status: 'Standby', load: '0%', temp: '25°C', energy: '120W' },
  { name: 'Weld Robot 04', type: 'UR3', status: 'Error', load: '-', temp: '58°C', energy: '0W' },
  { name: 'Weld Robot 05', type: 'UR3', status: 'Running', load: '75%', temp: '45°C', energy: '380W' },
];

export default function EquipmentMonitoringPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 상세 모니터링</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">5-3 자동화 장비 가동 정보 모니터링</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '전체 장비', value: '24', icon: Cpu, color: 'text-blue-400' },
            { label: '가동 중', value: '18', icon: Activity, color: 'text-green-400' },
            { label: '대기 중', value: '4', icon: Zap, color: 'text-yellow-400' },
            { label: '장애 발생', value: '2', icon: AlertCircle, color: 'text-red-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#1e293b] border border-white/5 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <stat.icon className={stat.color} size={28} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_400px] gap-4">
          <div className="bg-[#1e293b] border border-white/10 rounded-lg overflow-hidden flex flex-col h-[450px]">
            <div className="bg-[#334155] px-4 py-2 flex justify-between items-center">
              <span className="text-xs font-bold">장비별 실시간 가동 상세</span>
              <Button size="sm" variant="ghost" className="h-6 text-[10px] text-accent">전체보기</Button>
            </div>
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-900/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white text-center font-bold h-9">장비명</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">타입</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">상태</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">부하율</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">온도</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">소비전력</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-[#111827]">
                {EQUIP_LIST.map((row, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-white/5">
                    <TableCell className="text-left font-bold text-white pl-4 border-r border-white/5">{row.name}</TableCell>
                    <TableCell className="text-center text-slate-400 border-r border-white/5">{row.type}</TableCell>
                    <TableCell className="text-center border-r border-white/5">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${
                          row.status === 'Running' ? 'bg-green-500 animate-pulse' :
                          row.status === 'Error' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <span className="text-[10px]">{row.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-accent border-r border-white/5">{row.load}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{row.temp}</TableCell>
                    <TableCell className="text-center text-slate-400">{row.energy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-[#1e293b] border border-white/10 rounded-lg p-4 flex flex-col h-[450px]">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">실시간 시스템 부하 추이</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RUNTIME_DATA}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', fontSize: '10px' }} />
                <Area type="monotone" dataKey="load" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-[#0f172a] rounded border border-white/5">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">통계 요약</p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex justify-between"><span className="text-slate-400">최대 부하:</span> <span className="text-white">94%</span></div>
                <div className="flex justify-between"><span className="text-slate-400">평균 부하:</span> <span className="text-white">68%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
