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
import { Zap, Search } from "lucide-react";

const PROGRESS_DATA = [
  { stage: '소조 Stage 1', vessel: '289606', block: 'B12P', totalLength: '450m', weldLength: '420m', progress: '93.3%', status: '진행' },
  { stage: '소조 Stage 2', vessel: '289606', block: 'B13S', totalLength: '320m', weldLength: '320m', progress: '100.0%', status: '완료' },
  { stage: '중조 Stage 1', vessel: '289701', block: 'C05A', totalLength: '850m', weldLength: '120m', progress: '14.1%', status: '진행' },
  { stage: '대조 Stage 1', vessel: '289802', block: 'D08B', totalLength: '1,200m', weldLength: '0m', progress: '0.0%', status: '대기' },
];

export default function WeldingProgressPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#f8fafc]">
      <div className="bg-[#facc15] px-6 py-2">
        <span className="text-sm font-bold text-black">생산 운영 현황 관리 [6-4 스테이지별 용접 공정 진척도 관리]</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-slate-200 rounded">
              <Zap size={20} className="text-yellow-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">스테이지별 용접 진척도 현황</h2>
          </div>
          <Button size="sm" className="bg-[#334155] hover:bg-slate-700 h-8 text-xs px-6">조회</Button>
        </div>

        <div className="bg-cyan-50 border border-cyan-100 rounded p-3 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-700 shrink-0">호선</Label>
            <Input className="h-8 w-32 bg-cyan-400/20 border-cyan-400/40 text-xs" defaultValue="289606" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-700 shrink-0">블록</Label>
            <Input className="h-8 w-32 bg-cyan-400/20 border-cyan-400/40 text-xs" placeholder="블록 입력" />
          </div>
        </div>

        <div className="flex-1 border border-blue-100 rounded overflow-hidden bg-white shadow-sm">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600">
              <TableRow className="hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">스테이지명</TableHead>
                <TableHead className="text-white text-center font-bold h-9">호선번호</TableHead>
                <TableHead className="text-white text-center font-bold h-9">블록명</TableHead>
                <TableHead className="text-white text-center font-bold h-9">총 용접장</TableHead>
                <TableHead className="text-white text-center font-bold h-9">완료 용접장</TableHead>
                <TableHead className="text-white text-center font-bold h-9">공정진척도</TableHead>
                <TableHead className="text-white text-center font-bold h-9">진행상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROGRESS_DATA.map((row, i) => (
                <TableRow key={i} className="border-slate-100 hover:bg-blue-50">
                  <TableCell className="text-center font-bold text-slate-800">{row.stage}</TableCell>
                  <TableCell className="text-center text-slate-600">{row.vessel}</TableCell>
                  <TableCell className="text-center text-slate-700 font-bold">{row.block}</TableCell>
                  <TableCell className="text-center text-slate-600">{row.totalLength}</TableCell>
                  <TableCell className="text-center text-blue-600 font-bold">{row.weldLength}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${row.progress === '100.0%' ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{ width: row.progress }} />
                      </div>
                      <span className="font-mono">{row.progress}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.status === '완료' ? 'bg-blue-100 text-blue-700' : 
                      row.status === '진행' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'
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
