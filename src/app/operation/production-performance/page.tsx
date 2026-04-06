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
import { Factory } from "lucide-react";

const PRODUCTION_DATA = [
  { process: '소조', target: 500, actual: 485, rate: '97.0%', defective: 2, worker: '홍길동' },
  { process: '중조', target: 300, actual: 210, rate: '70.0%', defective: 5, worker: '김철수' },
  { process: '대조', target: 100, actual: 85, rate: '85.0%', defective: 1, worker: '이영희' },
  { process: '선행의장', target: 150, actual: 142, rate: '94.6%', defective: 0, worker: '박지성' },
];

export default function ProductionPerformancePage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 섹션 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-3 공정별 생산 실적 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Factory size={20} className="text-green-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">공정별 생산 실적 통계</h2>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 text-xs px-6">엑셀 저장</Button>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">작업일자</Label>
            <Input type="date" className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="2025-07-09" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">호선번호</Label>
            <Input className="h-8 w-32 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" placeholder="호선 입력" />
          </div>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">공정명</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">계획수량</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">실적수량</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">목표달성률</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">불량수량</TableHead>
                <TableHead className="text-white text-center font-bold h-9">공정담당자</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#111827]">
              {PRODUCTION_DATA.map((row, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5">
                  <TableCell className="text-center font-bold text-white border-r border-white/5">{row.process}</TableCell>
                  <TableCell className="text-center text-slate-400 border-r border-white/5">{row.target}</TableCell>
                  <TableCell className="text-center text-white font-bold border-r border-white/5">{row.actual}</TableCell>
                  <TableCell className="text-center border-r border-white/5">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: row.rate }} />
                      </div>
                      <span className="text-slate-300">{row.rate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-red-400 border-r border-white/5">{row.defective}</TableCell>
                  <TableCell className="text-center text-slate-400">{row.worker}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
