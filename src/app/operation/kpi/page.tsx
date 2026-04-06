'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

// 용접 작업 진행률 데이터
const WELDING_PROGRESS_DATA = [
  { name: '1ST', value: 1.5 },
  { name: '1NES', value: 1.2 },
  { name: '2TU', value: 1.0 },
  { name: '2ND', value: 3.5 },
  { name: 'CHK', value: 1.8 },
  { name: 'NES', value: 1.5 },
  { name: 'FOK', value: 7.5 },
  { name: 'FKCS', value: 1.2 },
  { name: 'ITU', value: 2.2 },
  { name: 'bf', value: 3.0 },
];

// 완료 지연 예상 현황 데이터
const DELAY_EXPECTED_DATA = [
  { name: '1일', value: 2.5 },
  { name: '2일', value: 2.5 },
  { name: '3일 이상', value: 0 },
];

// 호선별 공정 준수율 / 진도율 데이터
const VESSEL_COMPLIANCE_DATA = [
  { name: '2B01', 조립: 98, 선행의장: 95, PE: 78, 선별도장: 82 },
  { name: '2B02', 조립: 100, 선행의장: 92, PE: 85, 선별도장: 100 },
  { name: '2B03', 조립: 100, 선행의장: 100, PE: 88, 선별도장: 100 },
  { name: '2B04', 조립: 100, 선행의장: 95, PE: 90, 선별도장: 88 },
  { name: '2B05', 조립: 100, 선행의장: 100, PE: 100, 선별도장: 100 },
  { name: '2B06', 조립: 100, 선행의장: 0, PE: 0, 선별도장: 0 },
  { name: '2B07', 조립: 98, 선행의장: 90, PE: 75, 선별도장: 100 },
];

export default function BusinessKpiPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      {/* 상단 브레드크럼 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-8 사업장 KPI 지수 관리</span>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <h2 className="text-xl font-bold pl-1 text-white">사업장 KPI 지수 관리</h2>
        
        {/* 상단 3분할 레이아웃 */}
        <div className="grid grid-cols-3 gap-4 h-[350px]">
          {/* 1. 금일 블록 입출고 현황 */}
          <Card className="bg-[#1e293b]/50 border-white/10 flex flex-col overflow-hidden">
            <div className="bg-[#0f172a] px-4 py-2 text-sm font-bold text-center border-b border-white/10">금일 블록 입출고 현황</div>
            <div className="flex-1 p-6 flex items-center">
              <div className="w-1/3 text-center border-r border-white/5">
                <p className="text-lg font-bold text-white mb-2">용연 공장</p>
                <p className="text-[10px] text-slate-400 mb-1">총 블록 개수</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-6xl font-black text-cyan-400">17</span>
                  <span className="text-sm text-slate-400">개</span>
                </div>
              </div>
              <div className="w-2/3 pl-6 space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-300">옥내/외 적자 블록</span>
                  <span className="font-bold text-cyan-300">옥내 17/옥외 00개</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-300">공장 입고 블록</span>
                  <span className="font-bold text-green-400">계약 00/실적 00개</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-300">공장 출고 블록</span>
                  <span className="font-bold text-red-400">계약 00/실적 00개</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-300">옥내 적재율</span>
                  <span className="font-bold text-yellow-400">100%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">선공정 지연블록</span>
                  <span className="font-bold text-blue-400">2일:02/3일:01개</span>
                </div>
              </div>
            </div>
          </Card>

          {/* 2. 용접 작업 진행률 */}
          <Card className="bg-[#1e293b]/50 border-white/10 flex flex-col overflow-hidden">
            <div className="bg-[#0f172a] px-4 py-2 text-sm font-bold text-center border-b border-white/10">용접 작업 진행률</div>
            <div className="flex-1 p-4 flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WELDING_PROGRESS_DATA}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis hide />
                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', fontSize: '10px'}} />
                    <Bar dataKey="value" fill="#00d1ff" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] bg-[#0f172a] p-3 rounded border border-white/5">
                <div className="space-y-1">
                  <p className="text-slate-500 font-bold">구분</p>
                  <p className="text-white">태양</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 font-bold">보유블록</p>
                  <p className="text-white">12em</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 font-bold">도장면적</p>
                  <p className="text-white">14964m²</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 font-bold">보호작업 진행률</p>
                  <p className="text-cyan-400 font-bold">51%</p>
                </div>
              </div>
            </div>
          </Card>

          {/* 3. 완료 지연 예상현황 */}
          <Card className="bg-[#1e293b]/50 border-white/10 flex flex-col overflow-hidden">
            <div className="bg-[#0f172a] px-4 py-2 text-sm font-bold text-center border-b border-white/10">완료 지연 예상현황</div>
            <div className="flex-1 p-4 flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DELAY_EXPECTED_DATA} margin={{ left: 20, right: 20 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis hide />
                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', fontSize: '10px'}} />
                    <Bar dataKey="value" fill="#00d1ff" radius={[2, 2, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] bg-[#0f172a] p-3 rounded border border-white/5">
                <div className="space-y-1">
                  <p className="text-slate-500 font-bold">구분</p>
                  <p className="text-white">태양</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 font-bold">보유블록</p>
                  <p className="text-white">12em</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 font-bold">지연블록</p>
                  <p className="text-white">4em / 0em</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 font-bold">도장작업 지연</p>
                  <p className="text-red-400 font-bold">0%</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 하단 대형 차트: 호선별 공정준수율 / 진도율 */}
        <Card className="bg-[#1e293b]/50 border-white/10 flex flex-col overflow-hidden h-[450px]">
          <div className="bg-[#0f172a] px-4 py-3 text-base font-bold text-center border-b border-white/10 relative">
            호선별 공정준수율 / 진도율
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-4 text-[10px]">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#3b82f6]" /> 조립</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#22c55e]" /> 선행의장</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#eab308]" /> PE</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#ef4444]" /> 선별도장</div>
            </div>
          </div>
          <div className="flex-1 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VESSEL_COMPLIANCE_DATA} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 14, fontWeight: 'bold'}} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} unit="%" />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px'}} />
                <Bar dataKey="조립" fill="#3b82f6" barSize={35} />
                <Bar dataKey="선행의장" fill="#22c55e" barSize={35} />
                <Bar dataKey="PE" fill="#eab308" barSize={35} />
                <Bar dataKey="선별도장" fill="#ef4444" barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
