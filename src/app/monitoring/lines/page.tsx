'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Search, Monitor } from "lucide-react";

const SUMMARY_DATA = [
  { id: '평균', rate: 69.2, arc: 56.1, length: 13.3, time: '1:34' },
  { id: 'MD1', rate: 61.6, arc: 55.4, length: 19.1, time: '2:03' },
  { id: 'MD2', rate: 86.9, arc: 53.5, length: 12.8, time: '1:52' },
  { id: 'MD3', rate: 64.1, arc: 66.1, length: 20.3, time: '2:01' },
  { id: 'MD4', rate: 64.2, arc: 49.5, length: 1.1, time: '0:18' },
];

const CHART_DATA = [
  { name: '4', md1: 71.8, md2: 0, md3: 0, md4: 0, md1_time: 4.54, md3_time: 4.8, md3_op: 6.36 },
  { name: '5', md1: 58.1, md2: 0, md3: 0, md4: 0, md1_time: 1.26, md1_op: 2.38 },
  { name: '6', md1: 67.4, md2: 0, md3: 0, md4: 64.7, md1_time: 2.28, md4_time: 1.15, md4_op: 2.21 },
  { name: '7', md1: 56.4, md2: 92.8, md3: 49.1, md4: 0, md1_time: 3.43, md2_time: 5.54, md3_time: 1.53, md1_op: 6.22, md2_op: 6.15, md3_op: 3.47 },
  { name: '8', md1: 62.1, md2: 78.5, md3: 62.2, md4: 0, md1_time: 2.2, md2_time: 3.32, md3_time: 3.25, md1_op: 4.17, md2_op: 4.45, md3_op: 5.39 },
];

const COLORS = {
  md1: '#0ea5e9',
  md2: '#ef4444',
  md3: '#a3e635',
  md4: '#a855f7',
};

export default function LineMonitoringPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      {/* 상단 브레드크럼 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 상세 모니터링</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">[5-1 선각 공정 라인별 모니터링]</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {/* 필터 바 */}
        <div className="bg-[#1e293b] p-4 rounded-lg space-y-4 shadow-xl border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Monitor size={18} className="text-blue-400" />
            <h2 className="text-lg font-bold">공장 라인별 로봇 모니터링</h2>
          </div>
          
          <div className="grid grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] gap-4 items-center">
            <Label className="text-xs shrink-0">작업일자</Label>
            <Input type="date" className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="2025-04-17" />
            
            <Label className="text-xs shrink-0">작업호선</Label>
            <Input className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white uppercase" defaultValue="ALL" />
            
            <Label className="text-xs shrink-0">공장</Label>
            <Input className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="용연공장" />

            <div className="flex items-center gap-4">
              <RadioGroup defaultValue="daily" className="flex items-center gap-3">
                {['일별', '주별', '월별', '년별'].map((label, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <RadioGroupItem value={label} id={`r-${idx}`} className="border-white/20" />
                    <Label htmlFor={`r-${idx}`} className="text-[11px] cursor-pointer">{label}</Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="flex items-center gap-3 ml-4">
                <div className="flex items-center gap-1.5">
                  <Checkbox id="sojo" className="border-white/20" />
                  <Label htmlFor="sojo" className="text-[11px]">소조</Label>
                </div>
                <div className="flex items-center gap-1.5">
                  <Checkbox id="jungjo" className="border-white/20" />
                  <Label htmlFor="jungjo" className="text-[11px]">중조</Label>
                </div>
              </div>
              
              <Button size="sm" className="bg-slate-700 hover:bg-slate-600 h-8 px-6 ml-2">
                <Search size={14} className="mr-2" /> 검색
              </Button>
            </div>
          </div>
        </div>

        {/* 메인 대시보드 그리드 */}
        <div className="grid grid-cols-[450px_1fr] gap-4">
          {/* 좌측 요약 테이블 */}
          <div className="flex flex-col space-y-4">
            <div className="bg-[#1e293b] border border-white/10 rounded-lg overflow-hidden flex flex-col h-[400px]">
              <div className="bg-[#334155] px-4 py-2 flex justify-between items-center">
                <span className="text-sm font-bold">용연공장</span>
                <div className="flex bg-[#0f172a] p-1 rounded gap-1">
                  {['일간', '주간', '월간'].map(t => (
                    <button key={t} className={`text-[10px] px-2 py-0.5 rounded ${t === '일간' ? 'bg-blue-600' : ''}`}>{t}</button>
                  ))}
                </div>
              </div>
              <Table className="text-[11px]">
                <TableHeader className="bg-blue-900/50">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white text-center font-bold h-9">구분</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">가동률(%)</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">아크율(%)</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">용접장(m)</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">가동시간</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-[#111827]">
                  {SUMMARY_DATA.map((row, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-center font-bold text-white border-r border-white/5">{row.id}</TableCell>
                      <TableCell className="text-center text-blue-400 border-r border-white/5">{row.rate}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{row.arc}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{row.length}</TableCell>
                      <TableCell className="text-center text-slate-400">{row.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* 하단 왼쪽 차트: 가동시간 */}
            <div className="bg-[#1e293b] border border-white/10 rounded-lg p-4 h-[350px]">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">가동시간(시:분)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', fontSize: '10px' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} />
                  <Bar dataKey="md1_time" name="MD1" fill={COLORS.md1} barSize={8} />
                  <Bar dataKey="md2_time" name="MD2" fill={COLORS.md2} barSize={8} />
                  <Bar dataKey="md3_time" name="MD3" fill={COLORS.md3} barSize={8} />
                  <Bar dataKey="md4_time" name="MD4" fill={COLORS.md4} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 우측 차트 그룹 */}
          <div className="flex flex-col gap-4">
            {/* 상단 오른쪽 차트: 가동률 */}
            <div className="bg-[#1e293b] border border-white/10 rounded-lg p-4 h-[400px]">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">가동률(%)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', fontSize: '10px' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} />
                  <Bar dataKey="md1" name="MD1" fill={COLORS.md1} barSize={12} label={{ position: 'top', fill: '#94a3b8', fontSize: 9 }} />
                  <Bar dataKey="md2" name="MD2" fill={COLORS.md2} barSize={12} label={{ position: 'top', fill: '#94a3b8', fontSize: 9 }} />
                  <Bar dataKey="md3" name="MD3" fill={COLORS.md3} barSize={12} label={{ position: 'top', fill: '#94a3b8', fontSize: 9 }} />
                  <Bar dataKey="md4" name="MD4" fill={COLORS.md4} barSize={12} label={{ position: 'top', fill: '#94a3b8', fontSize: 9 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 하단 오른쪽 차트: 운영시간 */}
            <div className="bg-[#1e293b] border border-white/10 rounded-lg p-4 h-[350px]">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">운영시간(시:분)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', fontSize: '10px' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} />
                  <Bar dataKey="md1_op" name="MD1" fill={COLORS.md1} barSize={10} />
                  <Bar dataKey="md2_op" name="MD2" fill={COLORS.md2} barSize={10} />
                  <Bar dataKey="md3_op" name="MD3" fill={COLORS.md3} barSize={10} />
                  <Bar dataKey="md4_op" name="MD4" fill={COLORS.md4} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
