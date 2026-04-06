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
import { Zap } from "lucide-react";

const PROGRESS_DATA = [
  { stage: '소조 Stage 1', vessel: '289606', block: 'B12P', totalLength: '450m', weldLength: '420m', progress: '93.3%', status: '진행' },
  { stage: '소조 Stage 2', vessel: '289606', block: 'B13S', totalLength: '320m', weldLength: '320m', progress: '100.0%', status: '완료' },
  { stage: '중조 Stage 1', vessel: '289701', block: 'C05A', totalLength: '850m', weldLength: '120m', progress: '14.1%', status: '진행' },
  { stage: '대조 Stage 1', vessel: '289802', block: 'D08B', totalLength: '1,200m', weldLength: '0m', progress: '0.0%', status: '대기' },
];

export default function WeldingProgressPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 섹션 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-4 스테이지별 용접 공정 진척도 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-yellow-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">스테이지별 용접 진척도 현황</h2>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 text-xs px-6">조회</Button>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">호선</Label>
            <Input className="h-8 w-32 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="289606" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">블록</Label>
            <Input className="h-8 w-32 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" placeholder="블록 입력" />
          </div>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">스테이지명</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">호선번호</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">블록명</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">총 용접장</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">완료 용접장</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">공정진척도</TableHead>
                <TableHead className="text-white text-center font-bold h-9">진행상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#111827]">
              {PROGRESS_DATA.map((row, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5">
                  <TableCell className="text-center font-bold text-white border-r border-white/5">{row.stage}</TableCell>
                  <TableCell className="text-center text-slate-400 border-r border-white/5">{row.vessel}</TableCell>
                  <TableCell className="text-center text-white font-bold border-r border-white/5">{row.block}</TableCell>
                  <TableCell className="text-center text-slate-400 border-r border-white/5">{row.totalLength}</TableCell>
                  <TableCell className="text-center text-blue-400 font-bold border-r border-white/5">{row.weldLength}</TableCell>
                  <TableCell className="text-center border-r border-white/5">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${row.progress === '100.0%' ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{ width: row.progress }} />
                      </div>
                      <span className="font-mono text-white">{row.progress}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.status === '완료' ? 'bg-blue-500/20 text-blue-400' : 
                      row.status === '진행' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-500/20 text-slate-500'
                    }`}>
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
