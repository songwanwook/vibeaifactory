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
import { Layers, Search, RefreshCw } from "lucide-react";

const WIP_DATA = [
  { process: '부재 절단', input: 1200, output: 1150, wip: 50, avgLeadTime: '2.5h' },
  { process: '소조 Stage', input: 1150, output: 1080, wip: 70, avgLeadTime: '8.2h' },
  { process: '중조 Stage', input: 1080, output: 1000, wip: 80, avgLeadTime: '15.4h' },
  { process: '대조 Stage', input: 1000, output: 950, wip: 50, avgLeadTime: '24.1h' },
  { process: '선행의장', input: 950, output: 920, wip: 30, avgLeadTime: '12.0h' },
];

export default function WipManagementPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-7 공정별 배치 및 재공 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={20} className="text-yellow-500" />
            <h2 className="text-xl font-bold text-white tracking-tight">공정별 재공(WIP) 현황 모니터링</h2>
          </div>
          <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs">
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> 실시간 갱신
          </Button>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">기준시점</Label>
            <Input type="datetime-local" className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="2025-07-09T14:00" />
          </div>
          <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4 ml-auto">
            <Search className="w-3.5 h-3.5 mr-1" /> 조회
          </Button>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">공정명</TableHead>
                <TableHead className="text-white text-center font-bold h-9">누적 투입량</TableHead>
                <TableHead className="text-white text-center font-bold h-9">누적 산출량</TableHead>
                <TableHead className="text-white text-center font-bold h-9">현재 재공수량</TableHead>
                <TableHead className="text-white text-center font-bold h-9">평균 체류시간</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#111827]">
              {WIP_DATA.map((row, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5">
                  <TableCell className="text-center font-bold text-white border-r border-white/5">{row.process}</TableCell>
                  <TableCell className="text-center text-slate-400 border-r border-white/5">{row.input}</TableCell>
                  <TableCell className="text-center text-slate-400 border-r border-white/5">{row.output}</TableCell>
                  <TableCell className="text-center font-bold text-accent border-r border-white/5">{row.wip}</TableCell>
                  <TableCell className="text-center text-slate-500 font-mono">{row.avgLeadTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
