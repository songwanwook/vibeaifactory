'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { LayoutGrid, Search, Filter, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const BLOCK_DATA = [
  { id: 'B12P-01', vessel: '289606', stage: '소조', progress: 85, status: '진행중', robot: 'RB3-01', start: '08:00', end: '-' },
  { id: 'B12P-02', vessel: '289606', stage: '소조', progress: 100, status: '완료', robot: 'RB3-02', start: '07:30', end: '11:20' },
  { id: 'C05A-15', vessel: '289701', stage: '중조', progress: 45, status: '진행중', robot: 'UR20-01', start: '10:00', end: '-' },
  { id: 'C05A-16', vessel: '289701', stage: '중조', progress: 12, status: '대기', robot: 'UR3-04', start: '-', end: '-' },
  { id: 'D08B-04', vessel: '289802', stage: '대조', progress: 0, status: '대기', robot: '-', start: '-', end: '-' },
];

const STAGE_STATS = [
  { name: '소조', count: 12, avg: 78 },
  { name: '중조', count: 8, avg: 42 },
  { name: '대조', count: 4, avg: 15 },
  { name: '선행의장', count: 6, avg: 5 },
];

export default function BlocksMonitoringPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 상세 모니터링</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">5-2 블록별 상세 공정 모니터링</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="bg-[#1e293b] p-4 rounded-lg space-y-4 border border-white/5">
          <div className="flex items-center gap-2">
            <LayoutGrid size={18} className="text-accent" />
            <h2 className="text-lg font-bold">블록별 공정 진척 현황</h2>
          </div>
          <div className="grid grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <Label className="text-[10px] text-slate-400 uppercase font-bold">호선번호</Label>
              <Input className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="289606" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] text-slate-400 uppercase font-bold">블록명</Label>
              <Input className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" placeholder="블록 검색..." />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] text-slate-400 uppercase font-bold">공정단계</Label>
              <Input className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="전체" />
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 h-8 px-6">
              <Search size={14} className="mr-2" /> 조회
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_350px] gap-4 flex-1">
          <div className="bg-[#1e293b] border border-white/10 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-[#334155] px-4 py-2 flex justify-between items-center">
              <span className="text-xs font-bold">실시간 블록 공정 리스트</span>
              <span className="text-[10px] text-slate-400">Total: 30 Blocks</span>
            </div>
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-900/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white text-center font-bold h-9">블록ID</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">호선</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">단계</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 w-40">진척도</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">상태</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">담당로봇</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">시작시간</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-[#111827]">
                {BLOCK_DATA.map((row, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-white/5">
                    <TableCell className="text-center font-bold text-white border-r border-white/5">{row.id}</TableCell>
                    <TableCell className="text-center text-slate-400 border-r border-white/5">{row.vessel}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{row.stage}</TableCell>
                    <TableCell className="px-4 border-r border-white/5">
                      <div className="flex items-center gap-2">
                        <Progress value={row.progress} className="h-1.5 flex-1 bg-slate-800" />
                        <span className="w-8 text-right font-mono text-[10px]">{row.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center border-r border-white/5">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        row.status === '완료' ? 'bg-green-500/20 text-green-400' :
                        row.status === '진행중' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-accent border-r border-white/5">{row.robot}</TableCell>
                    <TableCell className="text-center text-slate-500">{row.start}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1e293b] border border-white/10 rounded-lg p-4 h-[300px]">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">공정별 평균 진척률</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STAGE_STATS} layout="vertical" margin={{ left: -20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} width={60} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', fontSize: '10px' }} />
                  <Bar dataKey="avg" fill="#0ea5e9" barSize={15} radius={[0, 4, 4, 0]}>
                    {STAGE_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.avg > 70 ? '#10b981' : entry.avg > 30 ? '#0ea5e9' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#1e293b] border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center space-y-2">
              <Clock size={32} className="text-blue-400 opacity-50" />
              <p className="text-[10px] text-slate-500 font-bold uppercase">평균 공정 리드타임</p>
              <h4 className="text-2xl font-bold text-white">4.2 <span className="text-xs font-normal text-slate-500">Hours</span></h4>
              <p className="text-[9px] text-green-400">-15% vs Target</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
