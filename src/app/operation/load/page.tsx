
'use client';

import React from 'react';
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

const CHART_DATA = Array.from({ length: 8 }, (_, i) => ({
  name: `Line ${i+1}`,
  val: Math.floor(Math.random() * 100),
  target: 80
}));

export default function ProductionLoadPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      <div className="bg-[#facc15] px-6 py-1 flex items-center">
        <span className="text-black text-xs font-bold">생산 운영 현황 관리 [6-6 공정별 생산 부하 관리]</span>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <h2 className="text-sm font-bold pl-1">실시간 공정 부하 현황</h2>
        
        <div className="grid grid-cols-6 gap-2">
          {[
            { label: 'A Line', sub: '현재 부하', value: '92%', color: 'bg-purple-800' },
            { label: 'B Line', sub: '현재 부하', value: '75%', color: 'bg-blue-800' },
            { label: 'C Line', sub: '현재 부하', value: '45%', color: 'bg-teal-600' },
            { label: '가동률', sub: '평균', value: '82%', color: 'bg-yellow-500 text-black' },
            { label: '대기시간', sub: '총합', value: '12h', color: 'bg-red-600' },
            { label: '병목지점', sub: '2개소', value: '', color: 'bg-orange-600' },
          ].map((card, i) => (
            <div key={i} className={`${card.color} p-2 rounded border border-white/10`}>
              <p className="text-[11px] font-bold">{card.label}</p>
              <p className="text-[9px] opacity-80">{card.sub} {card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">부하 요약</div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">Current Shift</h3>
                <p className="text-2xl font-black mt-2 text-blue-400">Normal Operation</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-slate-500">Day Shift</p>
                <p className="text-xl font-bold mt-4">Capacity: 480m/h</p>
                <p className="text-lg font-bold mt-8">관리자 : 김철수</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">공정별 실시간 부하율</div>
            <div className="flex-1 grid grid-cols-4 gap-2 p-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <Gauge key={n} value={Math.floor(Math.random() * 40) + 60} label={`Stage ${n}`} />
              ))}
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">라인별 부하 추이</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} />
                  <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} dot={{r: 3}} />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">할당 시간 분포</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} />
                  <Bar dataKey="val" fill="#3b82f6" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">스테이지별 가용성</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{fill: '#64748b', fontSize: 10}} width={40} />
                  <Bar dataKey="val" fill="#8b5cf6" barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">예상 부하 집중도</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} />
                  <Bar dataKey="val" fill="#f97316" barSize={15} />
                  <Line type="step" dataKey="target" stroke="#ffffff" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
