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
import { BarChart3, Search } from "lucide-react";

const LOAD_DATA = [
  { process: '용접 1라인', capacity: 480, allocated: 450, load: 93.7, status: '과부하' },
  { process: '용접 2라인', capacity: 480, allocated: 320, load: 66.6, status: '정상' },
  { process: '조립 Stage A', capacity: 240, allocated: 180, load: 75.0, status: '정상' },
  { process: '조립 Stage B', capacity: 240, allocated: 220, load: 91.6, status: '주의' },
  { process: '도장 라인', capacity: 600, allocated: 120, load: 20.0, status: '여유' },
];

export default function ProductionLoadPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-6 공정별 생산 부하 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-accent" />
            <h2 className="text-xl font-bold text-white tracking-tight">공정별 생산 부하 분석</h2>
          </div>
          <Button size="sm" className="bg-blue-600 h-8 text-xs px-6">부하 재계산</Button>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">기준일자</Label>
            <Input type="date" className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="2025-07-09" />
          </div>
          <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4 ml-auto">
            <Search className="w-3.5 h-3.5 mr-1" /> 조회
          </Button>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">공정/라인명</TableHead>
                <TableHead className="text-white text-center font-bold h-9">가용 시간(Min)</TableHead>
                <TableHead className="text-white text-center font-bold h-9">할당 시간(Min)</TableHead>
                <TableHead className="text-white text-center font-bold h-9 w-64">부하율 추이</TableHead>
                <TableHead className="text-white text-center font-bold h-9">부하상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#111827]">
              {LOAD_DATA.map((row, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5">
                  <TableCell className="text-center font-bold text-white border-r border-white/5">{row.process}</TableCell>
                  <TableCell className="text-center text-slate-400 border-r border-white/5">{row.capacity}</TableCell>
                  <TableCell className="text-center text-slate-300 border-r border-white/5">{row.allocated}</TableCell>
                  <TableCell className="px-6 border-r border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${
                          row.load > 90 ? 'bg-red-500' : row.load > 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`} style={{ width: `${row.load}%` }} />
                      </div>
                      <span className="font-mono text-white text-[10px] w-10 text-right">{row.load}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    <span className={
                      row.status === '과부하' ? 'text-red-400' : 
                      row.status === '주의' ? 'text-yellow-400' : 
                      row.status === '여유' ? 'text-blue-400' : 'text-green-400'
                    }>{row.status}</span>
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
