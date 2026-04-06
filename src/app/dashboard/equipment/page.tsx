'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie
} from 'recharts';
import { Cpu, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

const EQUIPMENT_STATUS_DATA = [
  { name: '로봇 1호기', uptime: 98 },
  { name: '로봇 2호기', uptime: 95 },
  { name: '로봇 3호기', uptime: 72 },
  { name: '로봇 4호기', uptime: 99 },
  { name: '로봇 5호기', uptime: 94 },
  { name: '로봇 6호기', uptime: 88 },
];

const DISTRIBUTION_DATA = [
  { name: '가동', value: 75, color: '#10b981' },
  { name: '대기', value: 15, color: '#0ea5e9' },
  { name: '점검', value: 5, color: '#f59e0b' },
  { name: '장애', value: 5, color: '#ef4444' },
];

export default function EquipmentDashboardPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">대시보드</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">4-3 자동화 장비 가동 정보 현황</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-yellow-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">자동화 장비 가동 및 상태 모니터링</h2>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold py-1 px-3 rounded flex items-center gap-1.5 transition-colors">
            <RefreshCw size={12} /> 새로고침
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-slate-900 border-white/5 h-[450px]">
            <CardHeader className="py-3 px-4 border-b border-white/5">
              <CardTitle className="text-xs font-bold text-slate-300 tracking-widest uppercase">장비별 가동률 현황 (%)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EQUIPMENT_STATUS_DATA} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#ffffff', fontSize: 10, fontWeight: 'bold' }} width={80} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }}
                  />
                  <Bar dataKey="uptime" radius={[0, 4, 4, 0]} barSize={20}>
                    {EQUIPMENT_STATUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.uptime > 80 ? '#10b981' : entry.uptime > 70 ? '#f59e0b' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-rows-2 gap-4">
            <Card className="bg-slate-900 border-white/5">
              <CardHeader className="py-3 px-4 border-b border-white/5">
                <CardTitle className="text-xs font-bold text-slate-300 tracking-widest uppercase">전체 가동 상태 분포</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex items-center gap-8">
                <div className="h-32 w-32 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={DISTRIBUTION_DATA} innerRadius={35} outerRadius={55} paddingAngle={5} dataKey="value">
                        {DISTRIBUTION_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2">
                  {DISTRIBUTION_DATA.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[11px] text-slate-400">{item.name}</span>
                      </div>
                      <span className="text-xs font-bold text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-900 border-white/5 flex flex-col items-center justify-center p-6">
                <CheckCircle2 size={32} className="text-green-500 mb-2 opacity-50" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">정상 가동 중</p>
                <h4 className="text-3xl font-bold text-white mt-1">14 <span className="text-xs font-normal text-slate-500">Units</span></h4>
              </Card>
              <Card className="bg-slate-900 border-white/5 flex flex-col items-center justify-center p-6 border-l-4 border-l-red-500">
                <AlertTriangle size={32} className="text-red-500 mb-2 opacity-50" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">장애 발생</p>
                <h4 className="text-3xl font-bold text-white mt-1">2 <span className="text-xs font-normal text-slate-500">Units</span></h4>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
