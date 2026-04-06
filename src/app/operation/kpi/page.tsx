
'use client';

import React from 'react';
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
      <div className="relative w-24 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={25}
              outerRadius={40}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-0 left-0 right-0 text-center text-[10px] font-bold text-white">
          {value}%
        </div>
      </div>
      <span className="text-[10px] text-slate-400 mt-1">{label}</span>
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
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      <div className="bg-[#facc15] px-6 py-1 flex items-center">
        <span className="text-black text-xs font-bold">생산 운영 현황 관리 [6-8 사업장 KPI 지수 관리]</span>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <h2 className="text-sm font-bold pl-1">종합 KPI 성과 현황</h2>
        
        <div className="grid grid-cols-6 gap-2">
          {[
            { label: 'OEE', sub: '종합 효율', value: '84.2%', color: 'bg-purple-800' },
            { label: '불량률', sub: '품질 지표', value: '0.8%', color: 'bg-blue-800' },
            { label: '에너지', sub: '절감액', value: '₩2.4M', color: 'bg-teal-600' },
            { label: '무재해', sub: '달성일', value: '215일', color: 'bg-yellow-500 text-black' },
            { label: '공정률', sub: '준수율', value: '97%', color: 'bg-red-600' },
            { label: '생산성', sub: '인당', value: '11.8m/h', color: 'bg-orange-600' },
          ].map((card, i) => (
            <div key={i} className={`${card.color} p-2 rounded border border-white/10`}>
              <p className="text-[11px] font-bold">{card.label}</p>
              <p className="text-[9px] opacity-80">{card.sub}: {card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">성과 요약</div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">2025 KPI Master</h3>
                <p className="text-2xl font-black mt-2 text-yellow-400">Top Performance</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-slate-500">Q1 Result</p>
                <p className="text-xl font-bold mt-4">Target Achieved: 104%</p>
                <p className="text-lg font-bold mt-8">사업장 : 울산 공장</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">부문별 KPI 게이지</div>
            <div className="flex-1 grid grid-cols-4 gap-2 p-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <Gauge key={n} value={Math.floor(Math.random() * 30) + 70} label={`Metric ${n}`} />
              ))}
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">종합 리소스 레이더</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 10}} />
                  <Radar name="Actual" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">월별 성과 추이</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={RADAR_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="subject" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} />
                  <Bar dataKey="A" fill="#8b5cf6" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">목표 대비 달성률</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={RADAR_DATA} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="subject" type="category" tick={{fill: '#64748b', fontSize: 10}} width={60} />
                  <Bar dataKey="A" fill="#10b981" barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">누적 성과 분석</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RADAR_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="subject" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} />
                  <Line type="monotone" dataKey="A" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
