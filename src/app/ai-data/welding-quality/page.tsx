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
import { ShieldCheck, Target, AlertTriangle, CheckCircle2 } from "lucide-react";

const QUALITY_DATA = [
  { id: 'W-202503-01', block: 'B12P', joint: 'J-01', score: 98, result: '합격', defect: '-', date: '2025-03-26' },
  { id: 'W-202503-02', block: 'B12P', joint: 'J-02', score: 72, result: '불합격', defect: '언더컷', date: '2025-03-26' },
  { id: 'W-202503-03', block: 'C05A', joint: 'J-15', score: 95, result: '합격', defect: '-', date: '2025-03-25' },
  { id: 'W-202503-04', block: 'C05A', joint: 'J-16', score: 88, result: '합격', defect: '-', date: '2025-03-25' },
];

export default function WeldingQualityPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">인공지능 데이터 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">3-6 용접 품질진단 모델</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-green-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">AI 용접 품질 진단 결과</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs">전수조사 리포트</Button>
            <Button size="sm" className="bg-blue-600 h-8 text-xs">모델 재학습</Button>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 grid grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase">평균 진단 점수</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">92.4</span>
              <span className="text-xs text-green-400">+1.2%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase">금일 진단 수량</p>
            <p className="text-2xl font-bold text-white">1,254건</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase">불량 탐지율</p>
            <p className="text-2xl font-bold text-red-400">0.8%</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase">모델 정확도(mAP)</p>
            <p className="text-2xl font-bold text-primary">0.972</p>
          </div>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">진단 ID</TableHead>
                <TableHead className="text-white text-center font-bold h-9">블록명</TableHead>
                <TableHead className="text-white text-center font-bold h-9">조인트</TableHead>
                <TableHead className="text-white text-center font-bold h-9">신뢰도 점수</TableHead>
                <TableHead className="text-white text-center font-bold h-9">최종 판정</TableHead>
                <TableHead className="text-white text-center font-bold h-9">결함 유형</TableHead>
                <TableHead className="text-white text-center font-bold h-9">일자</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {QUALITY_DATA.map((item, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-blue-500/20">
                  <TableCell className="text-center text-slate-400">{item.id}</TableCell>
                  <TableCell className="text-center text-white font-bold">{item.block}</TableCell>
                  <TableCell className="text-center text-slate-300">{item.joint}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.score > 80 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${item.score}%` }} />
                      </div>
                      <span className="font-mono text-white">{item.score}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.result === '합격' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {item.result === '합격' ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
                      {item.result}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-slate-400">{item.defect}</TableCell>
                  <TableCell className="text-center text-slate-500">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}