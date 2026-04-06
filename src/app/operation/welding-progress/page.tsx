
'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, BarChart, Bar, ComposedChart 
} from 'recharts';

// 게이지 컴포넌트 (Recharts PieChart 이용)
const Gauge = ({ value, label }: { value: number, label: string }) => {
  const data = [
    { value: value, color: '#0ea5e9' },
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

const LINE_DATA = [
  { name: '1', e1: 20, e2: 15, e3: 22, e4: 18 },
  { name: '2', e1: 18, e2: 20, e3: 15, e4: 25 },
  { name: '3', e1: 25, e2: 18, e3: 20, e4: 12 },
  { name: '4', e1: 22, e2: 22, e3: 18, e4: 20 },
  { name: '5', e1: 20, e2: 15, e3: 25, e4: 18 },
  { name: '6', e1: 18, e2: 25, e3: 20, e4: 22 },
];

const MIXED_DATA = Array.from({ length: 10 }, (_, i) => ({
  name: i + 1,
  bar: Math.floor(Math.random() * 100) + 50,
  line: Math.floor(Math.random() * 80) + 20,
}));

export default function WeldingProgressPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      {/* 상단 노란색 상태바 */}
      <div className="bg-[#facc15] px-6 py-1 flex items-center">
        <span className="text-black text-xs font-bold">생산 운영 현황 관리 [6-4 스테이지별 용접 공정 진척도 관리]</span>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <h2 className="text-sm font-bold pl-1">실시간 용접 진척 현황</h2>
        
        {/* 상단 6개 요약 카드 */}
        <div className="grid grid-cols-6 gap-2">
          {[
            { label: '1 Block', sub: '작업 실적', value: '', color: 'bg-purple-800' },
            { label: '8 명', sub: '배원', value: '', color: 'bg-blue-800' },
            { label: '1,208 kg', sub: '용접봉 사용량', value: '', color: 'bg-teal-600' },
            { label: '8 Unit', sub: '가동 장비수', value: '', color: 'bg-yellow-500 text-black' },
            { label: '2:15', sub: '운전시간', value: '', color: 'bg-red-600' },
            { label: '30 %', sub: '운전률', value: '', color: 'bg-orange-600' },
          ].map((card, i) => (
            <div key={i} className={`${card.color} p-2 rounded shadow-inner border border-white/10`}>
              <p className="text-[11px] font-bold">{card.label}</p>
              <p className="text-[9px] opacity-80">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* 중단 3개 영역 */}
        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">정보</div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">2026-03-26 (THU)</h3>
                <p className="text-2xl font-black mt-2">Shop #01</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-slate-500">15:08</p>
                <p className="text-xl font-bold mt-4">2972 F72P0</p>
                <p className="text-lg font-bold mt-8">담당 : 손관욱</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">실시간 장비별 용접 현황</div>
            <div className="flex-1 grid grid-cols-4 gap-2 p-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <Gauge key={n} value={Math.floor(Math.random() * 100)} label={`${n}`} />
              ))}
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">장비별 용접 현황(그래프)</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={LINE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" hide />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} />
                  <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none'}} />
                  <Line type="monotone" dataKey="e1" stroke="#ef4444" dot={{r: 2}} />
                  <Line type="monotone" dataKey="e2" stroke="#eab308" dot={{r: 2}} />
                  <Line type="monotone" dataKey="e3" stroke="#22c55e" dot={{r: 2}} />
                  <Line type="monotone" dataKey="e4" stroke="#a855f7" dot={{r: 2}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* 하단 3개 영역 */}
        <div className="grid grid-cols-3 gap-3 h-[280px]">
          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">용접봉 누적 사용량</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={MIXED_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 10}} />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} />
                  <Bar dataKey="bar" fill="#facc15" barSize={12} />
                  <Line type="monotone" dataKey="line" stroke="#ef4444" dot={{r: 3}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">장비별 용접률</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LINE_DATA} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{fill: '#64748b', fontSize: 10}} width={20} />
                  <Bar dataKey="e1" fill="#ef4444" barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-[#0f172a] border-white/10 flex flex-col">
            <div className="bg-blue-900/50 px-3 py-1 text-[10px] font-bold border-b border-white/5">장비별 누적 용접량</div>
            <div className="flex-1 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LINE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 10}} />
                  <YAxis tick={{fill: '#64748b', fontSize: 10}} />
                  <Bar dataKey="e1" fill="#0ea5e9" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
