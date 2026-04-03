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
import { Database, FolderOpen, Tag, Download, Filter } from "lucide-react";

const DATASET_DATA = [
  { id: 'DS-2025-A', name: 'CO2 용접 비드 영상 세트', count: '12,500', size: '45GB', version: 'v1.2', date: '2025-02-10' },
  { id: 'DS-2025-B', name: '알루미늄 용접 파형 데이터', count: '55,000', size: '12GB', version: 'v2.0', date: '2025-03-01' },
  { id: 'DS-2025-C', name: '로봇 암 충돌 로그 데이터셋', count: '3,200', size: '2.5GB', version: 'v0.8', date: '2025-03-15' },
  { id: 'DS-2024-Z', name: '블록 형상 CAD-Image 매칭', count: '8,400', size: '156GB', version: 'v3.1', date: '2024-12-20' },
];

export default function WeldingDatasetPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">인공지능 데이터 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">3-8 용접장 데이터셋 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={20} className="text-primary" />
            <h2 className="text-xl font-bold text-white tracking-tight">AI 학습용 마스터 데이터셋</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4">데이터 정제</Button>
            <Button size="sm" className="bg-blue-600 h-8 text-xs">신규 데이터셋 생성</Button>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3 flex-1">
            <Label className="text-xs text-slate-300 w-20 shrink-0">데이터셋 명</Label>
            <Input className="h-8 bg-slate-900 border-white/10 text-xs" placeholder="키워드 검색..." />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-12">버전</Label>
            <Input className="h-8 bg-slate-900 border-white/10 text-xs w-24" placeholder="v1.0" />
          </div>
          <Button size="sm" className="bg-slate-700 h-8 text-xs px-6"><Filter className="w-3 h-3 mr-1" /> 필터</Button>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">ID</TableHead>
                <TableHead className="text-white text-center font-bold h-9">데이터셋 명칭</TableHead>
                <TableHead className="text-white text-center font-bold h-9">샘플 수</TableHead>
                <TableHead className="text-white text-center font-bold h-9">용량</TableHead>
                <TableHead className="text-white text-center font-bold h-9">버전</TableHead>
                <TableHead className="text-white text-center font-bold h-9">최종 업데이트</TableHead>
                <TableHead className="text-white text-center font-bold h-9">다운로드</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DATASET_DATA.map((item, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-blue-500/20">
                  <TableCell className="text-center text-slate-400 font-mono">{item.id}</TableCell>
                  <TableCell className="text-left text-white px-4">
                    <div className="flex items-center gap-2">
                      <FolderOpen size={14} className="text-yellow-500" />
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-primary font-bold">{item.count}</TableCell>
                  <TableCell className="text-center text-slate-300">{item.size}</TableCell>
                  <TableCell className="text-center">
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 border border-white/5">{item.version}</span>
                  </TableCell>
                  <TableCell className="text-center text-slate-500">{item.date}</TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" variant="ghost" className="h-7 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                      <Download size={14} />
                    </Button>
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