'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, BarChart, Bar, ComposedChart 
} from 'recharts';

const Gauge = ({ value, label }: { value: number, label: string }) => {
  const data = [
    { value: value, color: '#10b981' },
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

export default function ProductionLoadPage() {
  const [mounted, setMounted] = useState(false);
  const [gaugeValues, setGaugeValues] = useState<number[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    setGaugeValues([1, 2, 3, 4, 5, 6, 7, 8].map(() => Math.floor(Math.random() * 40) + 60));
    setChartData(Array.from({ length: 8 }, (_, i) => ({
      name: `Line ${i+1}`,
      val: Math.floor(Math.random() * 100),
      target: 80
    })));
  }, []);

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      {/* Dark Breadcrumb (Yellow Banner Removed) */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-6 공정별 생산 부하 관리</span>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <h2 className="text-sm font-bold pl-1 text-accent">실시간 공정 부하 모니터링 (Photo #2 Layout)</h2>
        
        {/* Top 6 Color Summary Cards */}
        <div className="grid grid-cols-6 gap-2">
          {[
            { label: 'A Line', sub: '현재 부하', value: '92%', color: 'bg-purple-800' },
            { label: 'B Line', sub: '현재 부하', value: '75%', color: 'bg-blue-800' },
            { label: 'C Line', sub: '현재 부하', value: '45%', color: 'bg-teal-600' },
            { label: '가동률', sub: '평균 가동', value: '82%', color: 'bg-yellow-600 text-white' },
            { label: '대기시간', sub: '총 대기', value: '12h', color: 'bg-red-600' },
            { label: '병목현상', sub: '2개 라인', value: 'Bottleneck', color: 'bg-orange-600' },
          ].map((card, i) => (
            <div key={i} className={`${card.color} p-3 rounded border border-white/10 shadow-lg`}>
              <p className="text-[11px] font-bold uppercase">{card.label}</p>
              <p className="text-[10px] opacity-80 mt-1">{card.sub}: {card.value}</p>
            </div>
          ))}
        </div>

        {/* 2 Rows of 3 Cards each (Grid of 6) */}
        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5 flex justify-between items-center">
              <span>부하 분석 요약</span>
              <span className="text-blue-400">Live</span>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Current Shift Status</h3>
                <p className="text-2xl font-black mt-2 text-blue-400">High Demand</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-slate-700 opacity-50 italic">Day-Shift</p>
                <p className="text-sm font-bold mt-4 text-slate-300">Target Efficiency: 95%</p>
                <p className="text-xs font-medium text-slate-500">Operation Manager: 김철수</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">실시간 라인 부하율 (Gauges)</div>
            <div className="flex-1 grid grid-cols-4 gap-2 p-2 place-content-center">
              {mounted ? (
                gaugeValues.map((val, i) => (
                  <Gauge key={i} value={val} label={`L-${i + 1}`} />
                ))
              ) : (
                <div className="col-span-4 flex items-center justify-center text-slate-500 text-xs">Loading...</div>
              )}
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">시간별 부하 변동 추이</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', fontSize: '10px'}} />
                  <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} dot={{r: 2}} />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" dot={false} strokeWidth={1} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">작업 할당 시간 분포</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 9}} axisLine={false} />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} axisLine={false} tickLine={false} />
                  <Bar dataKey="val" fill="#3b82f6" barSize={15} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">공정별 가용성 분석</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{fill: '#64748b', fontSize: 9}} width={45} axisLine={false} />
                  <Bar dataKey="val" fill="#8b5cf6" barSize={10} radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col shadow-xl">
            <div className="bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold border-b border-white/5">예상 부하 집중 위험도</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} axisLine={false} />
                  <Bar dataKey="val" fill="#f97316" barSize={15} radius={[2, 2, 0, 0]} />
                  <Line type="step" dataKey="target" stroke="#ffffff" strokeWidth={1} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
