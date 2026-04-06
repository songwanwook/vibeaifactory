'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarRange, Search, Plus, Save } from "lucide-react";

const PLAN_DATA = [
  { vessel: '289606', block: 'B12P', process: '소조', start: '2025-07-10', end: '2025-07-15', priority: '높음', status: '계획확정' },
  { vessel: '289606', block: 'B13S', process: '소조', start: '2025-07-12', end: '2025-07-18', priority: '보통', status: '계획확정' },
  { vessel: '289701', block: 'C05A', process: '중조', start: '2025-07-15', end: '2025-07-25', priority: '긴급', status: '검토중' },
  { vessel: '289802', block: 'D08B', process: '대조', start: '2025-07-20', end: '2025-08-05', priority: '보통', status: '대기' },
];

export default function ExecutionPlanPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-5 공정별 생산 실행 계획 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarRange size={20} className="text-primary" />
            <h2 className="text-xl font-bold text-white tracking-tight">생산 실행 계획 수립</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" /> 계획추가
            </Button>
            <Button size="sm" className="bg-blue-600 h-8 text-xs px-6">
              <Save className="w-3.5 h-3.5 mr-1" /> 계획확정
            </Button>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">계획월</Label>
            <Input type="month" className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="2025-07" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">공정구분</Label>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-32 bg-cyan-400/10 border-cyan-400/30 text-xs text-white">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="so">소조</SelectItem>
                <SelectItem value="jung">중조</SelectItem>
                <SelectItem value="dae">대조</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4 ml-auto">
            <Search className="w-3.5 h-3.5 mr-1" /> 조회
          </Button>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">호선</TableHead>
                <TableHead className="text-white text-center font-bold h-9">블록</TableHead>
                <TableHead className="text-white text-center font-bold h-9">공정</TableHead>
                <TableHead className="text-white text-center font-bold h-9">계획 시작일</TableHead>
                <TableHead className="text-white text-center font-bold h-9">계획 종료일</TableHead>
                <TableHead className="text-white text-center font-bold h-9">우선순위</TableHead>
                <TableHead className="text-white text-center font-bold h-9">진행상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#111827]">
              {PLAN_DATA.map((row, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5">
                  <TableCell className="text-center text-slate-300 border-r border-white/5">{row.vessel}</TableCell>
                  <TableCell className="text-center font-bold text-white border-r border-white/5">{row.block}</TableCell>
                  <TableCell className="text-center text-slate-400 border-r border-white/5">{row.process}</TableCell>
                  <TableCell className="text-center text-slate-300 border-r border-white/5">{row.start}</TableCell>
                  <TableCell className="text-center text-slate-300 border-r border-white/5">{row.end}</TableCell>
                  <TableCell className="text-center border-r border-white/5">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      row.priority === '긴급' ? 'bg-red-500/20 text-red-400' : 
                      row.priority === '높음' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {row.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-blue-400 font-bold">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
