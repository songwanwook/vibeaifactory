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
import { Target, TrendingUp, Download } from "lucide-react";

const KPI_LIST = [
  { category: '생산성', metric: '인당 생산성(m/hr)', target: 12.5, actual: 11.8, rate: '94.4%', status: '정상' },
  { category: '품질', metric: '용접 불량률(%)', target: 1.0, actual: 0.8, rate: '125.0%', status: '우수' },
  { category: '원가', metric: '에너지 절감률(%)', target: 5.0, actual: 3.2, rate: '64.0%', status: '주의' },
  { category: '납기', metric: '공정 준수율(%)', target: 98.0, actual: 95.5, rate: '97.4%', status: '정상' },
  { category: '안전', metric: '무재해 달성일(Day)', target: 365, actual: 215, rate: '58.9%', status: '진행중' },
];

export default function BusinessKpiPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-8 사업장 KPI 지수 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target size={20} className="text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">사업장 주요 성과 지표(KPI) 관리</h2>
          </div>
          <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4">
            <Download className="w-3.5 h-3.5 mr-1" /> 리포트 생성
          </Button>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">성과년도</Label>
            <Input type="number" className="h-8 w-24 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="2025" />
          </div>
          <Button size="sm" className="bg-blue-600 h-8 text-xs px-6 ml-auto">조회</Button>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">성과 카테고리</TableHead>
                <TableHead className="text-white text-center font-bold h-9">측정 지표</TableHead>
                <TableHead className="text-white text-center font-bold h-9">목표치</TableHead>
                <TableHead className="text-white text-center font-bold h-9">현재 실적</TableHead>
                <TableHead className="text-white text-center font-bold h-9">달성률</TableHead>
                <TableHead className="text-white text-center font-bold h-9">상태 판정</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#111827]">
              {KPI_LIST.map((row, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5">
                  <TableCell className="text-center font-bold text-white border-r border-white/5">{row.category}</TableCell>
                  <TableCell className="text-left text-slate-300 px-4 border-r border-white/5">{row.metric}</TableCell>
                  <TableCell className="text-center text-slate-400 border-r border-white/5 font-mono">{row.target}</TableCell>
                  <TableCell className="text-center text-white font-bold border-r border-white/5 font-mono">{row.actual}</TableCell>
                  <TableCell className="text-center border-r border-white/5">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-blue-400 font-bold">{row.rate}</span>
                      <TrendingUp size={12} className={parseFloat(row.rate) > 90 ? 'text-green-500' : 'text-slate-500'} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.status === '우수' ? 'bg-green-500/20 text-green-400' : 
                      row.status === '정상' ? 'bg-blue-500/20 text-blue-400' : 
                      row.status === '주의' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-500/20 text-slate-500'
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
