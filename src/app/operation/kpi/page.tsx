'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';

const Gauge = ({ value, label }: { value: number, label: string }) => {
  const data = [
    { value: value, color: '#f59e0b' },
    { value: 100 - value, color: '#1e293b' }
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-14">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={20}
              outerRadius={35}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-0 left-0 right-0 text-center text-[9px] font-bold text-white">
          {value}%
        </div>
      </div>
      <span className="text-[9px] text-slate-400 mt-1">{label}</span>
    </div>
  );
};

const RADAR_DATA = [
  { subject: 'Productivity', A: 120, fullMark: 150 },
  { subject: 'Quality', A: 98, fullMark: 150 },
  { subject: 'Safety', A: 86, fullMark: 150 },
  { subject: 'Cost', A: 99, fullMark: 150 },
  { subject: 'Delivery', A: 85, fullMark: 150 },
];

export default function BusinessKpiPage() {
  const [mounted, setMounted] = useState(false);
  const [gaugeValues, setGaugeValues] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    setGaugeValues([1, 2, 3, 4, 5, 6, 7, 8].map(() => Math.floor(Math.random() * 30) + 70));
  }, []);

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      {/* Dark Breadcrumb (Yellow Banner Removed) */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-8 사업장 KPI 지수 관리</span>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <h2 className="text-sm font-bold pl-1 text-accent">종합 KPI 성과 리포트 (Photo #3 Layout)</h2>
        
        {/* Top 6 Color Summary Cards */}
        <div className="grid grid-cols-6 gap-2">
          {[
            { label: 'OEE', sub: '종합 효율', value: '84.2%', color: 'bg-purple-800' },
            { label: '불량률', sub: '품질 지수', value: '0.8%', color: 'bg-blue-800' },
            { label: '에너지', sub: '절감 비용', value: '₩2.4M', color: 'bg-teal-600' },
            { label: '안전 지수', sub: '무재해일', value: '215일', color: 'bg-yellow-600 text-white' },
            { label: '공정률', sub: '납기 준수', value: '97%', color: 'bg-red-600' },
            { label: '생산성', sub: '인당 생산', value: '11.8m/h', color: 'bg-orange-600' },
          ].map((card, i) => (
            <div key={i} className={`${card.color} p-3 rounded border border-white/10 shadow-lg`}>
              <p className="text-[11px] font-bold uppercase">{card.label}</p>
              <p className="text-[10px] opacity-80 mt-1">{card.sub}: {card.value}</p>
            </div>
          ))}
        </div>

        {/* Middle Row of 3 Cards */}
        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">성과 달성 요약</div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">2025 KPI Strategic Master</h3>
                <p className="text-2xl font-black mt-2 text-yellow-400 underline decoration-yellow-400/30">Top Efficiency</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-slate-700 opacity-50 uppercase tracking-tighter">Q1 Summary</p>
                <p className="text-sm font-bold mt-4 text-emerald-400">Achievement Rate: 104.2%</p>
                <p className="text-xs font-medium text-slate-500">Target Region: Ulsan Plant #1</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">부문별 KPI 상세 게이지</div>
            <div className="flex-1 grid grid-cols-4 gap-2 p-2 place-content-center">
              {mounted ? (
                gaugeValues.map((val, i) => (
                  <Gauge key={i} value={val} label={`Metric ${i + 1}`} />
                ))
              ) : (
                <div className="col-span-4 flex items-center justify-center text-slate-500 text-xs">Loading...</div>
              )}
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">종합 리소스 밸런스 (Radar)</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={RADAR_DATA}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 10}} />
                  <Radar name="Actual" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Bottom Row of 3 Cards */}
        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">월간 성과 변동 추이</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={RADAR_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="subject" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} axisLine={false} />
                  <Bar dataKey="A" fill="#8b5cf6" barSize={25} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">부문별 목표 대비 달성률</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={RADAR_DATA} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="subject" type="category" tick={{fill: '#64748b', fontSize: 9}} width={65} axisLine={false} />
                  <Bar dataKey="A" fill="#10b981" barSize={12} radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">누적 성과 상관 분석</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RADAR_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="subject" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} axisLine={false} />
                  <Line type="monotone" dataKey="A" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
