'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, ComposedChart, Area, Bar
} from 'recharts';
import { BrainCircuit, Play, History, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const SIM_DATA = [
  { name: 'Step 1', actual: 45, sim: 42, error: 3 },
  { name: 'Step 2', actual: 52, sim: 55, error: -3 },
  { name: 'Step 3', actual: 48, sim: 47, error: 1 },
  { name: 'Step 4', actual: 61, sim: 59, error: 2 },
  { name: 'Step 5', actual: 55, sim: 58, error: -3 },
  { name: 'Step 6', actual: 67, sim: 65, error: 2 },
  { name: 'Step 7', actual: 70, sim: 72, error: -2 },
];

export default function SimulationDashboardPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">대시보드</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">4-5 시뮬레이션 분석</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit size={20} className="text-primary" />
            <h2 className="text-xl font-bold text-white tracking-tight">AI 공정 최적화 시뮬레이션</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-800 h-8 text-xs px-4">
              <History size={14} className="mr-2" /> 시나리오 기록
            </Button>
            <Button size="sm" className="bg-blue-600 h-8 text-xs px-4">
              <Play size={14} className="mr-2" /> 시뮬레이션 실행
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-slate-900 border-white/5">
            <CardHeader className="py-2 border-b border-white/5">
              <CardTitle className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">시뮬레이션 정확도</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">97.5%</span>
                <span className="text-xs text-green-400">Stable</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-white/5">
            <CardHeader className="py-2 border-b border-white/5">
              <CardTitle className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">예상 생산성 향상</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-accent">+12.4%</span>
                <span className="text-xs text-slate-500">Based on Sim</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-white/5">
            <CardHeader className="py-2 border-b border-white/5">
              <CardTitle className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">에너지 최적화 목표</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-yellow-500">-5.2%</span>
                <span className="text-xs text-slate-500">Reduction</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900 border-white/5 h-[450px]">
          <CardHeader className="py-3 px-4 border-b border-white/5 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold text-slate-300 tracking-widest uppercase flex items-center gap-2">
              <Settings size={14} /> 실시간 공정 vs 시뮬레이션 결과 비교
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={SIM_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', fontSize: '10px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                <Area type="monotone" dataKey="sim" name="시뮬레이션" fill="#0ea5e9" stroke="#0ea5e9" fillOpacity={0.1} />
                <Line type="monotone" dataKey="actual" name="실제 실적" stroke="#ffffff" strokeWidth={2} dot={{ r: 4 }} />
                <Bar dataKey="error" name="편차" barSize={10} fill="#f43f5e" radius={[2, 2, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
