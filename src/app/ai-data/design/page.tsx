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
import { Search, Plus, Save, Trash2, Upload, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

const DESIGN_DATA = [
  { vessel: '289606', cell: '0', data: '2', path: '2\\', date: '2025-10-14', author: '손관욱' },
  { vessel: '289606', cell: '1', data: '49130,1084,2150,49130,1600,2150$5.5', path: 'Z:\\HMD\\Robot\\Weld\\Dwg\\C289606-B12P...', date: '2025-02-01', author: '손관욱' },
  { vessel: '289606', cell: '2', data: '49130,1884,2150,49130,2400,2150$5.5', path: 'Z:\\HMD\\Robot\\Weld\\Dwg\\C289606-B12P...', date: '2025-02-01', author: '손관욱' },
  { vessel: '289606', cell: '3', data: '49130,2684,2150,49130,3200,2150$5.5', path: 'Z:\\HMD\\Robot\\Weld\\Dwg\\C289606-B12P...', date: '2025-02-01', author: '손관욱' },
  { vessel: '289606', cell: '4', data: '49130,3484,2150,49130,4000,2150$5.5', path: 'Z:\\HMD\\Robot\\Weld\\Dwg\\C289606-B12P...', date: '2025-02-01', author: '손관욱' },
  { vessel: '289606', cell: '5', data: '49130,4284,2150,49130,4800,2150$5.5', path: 'Z:\\HMD\\Robot\\Weld\\Dwg\\C289606-B12P...', date: '2025-02-01', author: '손관욱' },
  { vessel: '289606', cell: '6', data: '49130,5084,2150,49130,5600,2150$5.5', path: 'Z:\\HMD\\Robot\\Weld\\Dwg\\C289606-B12P...', date: '2025-02-01', author: '손관욱' },
];

export default function DesignInfoPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">인공지능 데이터 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">3-1 스테이지별 설계 정보 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        {/* 헤더 및 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center">
              <Plus size={14} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Cell 도면 및 데이터 관리</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">검색</Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">신규</Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">저장</Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">삭제</Button>
          </div>
        </div>

        {/* 검색 필터 (민트 스타일) */}
        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 grid grid-cols-3 gap-x-8">
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">호선번호</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="289606" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">블록명</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">ASSY</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-[1fr_450px] gap-4 overflow-hidden">
          {/* 좌측: 데이터 테이블 */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
            <div className="flex-1 overflow-auto">
              <Table className="text-[11px]">
                <TableHeader className="bg-blue-600 sticky top-0 z-10">
                  <TableRow className="border-white/10 hover:bg-blue-600">
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">호선번호</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">Cell No</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">데이터</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">데이터경로</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">작성일</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">작성자</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DESIGN_DATA.map((row, i) => (
                    <TableRow key={i} className={`border-white/5 hover:bg-blue-500/20 cursor-pointer ${i === 1 ? 'bg-blue-500/10' : ''}`}>
                      <TableCell className="text-center text-white border-r border-white/5">{row.vessel}</TableCell>
                      <TableCell className="text-center text-white font-bold border-r border-white/5">{row.cell}</TableCell>
                      <TableCell className="text-left text-slate-300 border-r border-white/5 truncate max-w-[200px] px-2">{row.data}</TableCell>
                      <TableCell className="text-left text-slate-400 border-r border-white/5 truncate max-w-[200px] px-2 italic">{row.path}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{row.date}</TableCell>
                      <TableCell className="text-center text-slate-300">{row.author}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-slate-800 p-2 border-t border-white/5 flex gap-1">
              <div className="w-6 h-6 bg-teal-600 flex items-center justify-center text-[10px] text-white rounded">1</div>
            </div>
          </div>

          {/* 우측: 도면 정보 및 이미지 */}
          <div className="bg-slate-900/50 border border-white/10 rounded-lg p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Label className="text-xs text-slate-400 w-20">도면 데이터</Label>
                <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" />
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-xs text-slate-400 w-20">도면 경로</Label>
                <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" />
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-xs text-slate-400 w-20">스케일</Label>
                <div className="flex items-center gap-2 flex-1">
                  <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs w-20" defaultValue="100%" />
                  <Button size="icon" variant="ghost" className="h-6 w-6 text-blue-400"><ChevronUp size={14}/></Button>
                  <Button size="icon" variant="ghost" className="h-6 w-6 text-red-400"><ChevronDown size={14}/></Button>
                  <Button size="sm" className="bg-slate-700 h-7 text-[10px] px-3 ml-auto">
                    <Upload size={12} className="mr-1" /> 업로드
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative aspect-square w-full bg-white rounded-md overflow-hidden border border-white/10">
              <Image 
                src="https://picsum.photos/seed/design1/800/800" 
                alt="Technical Drawing" 
                fill 
                className="object-contain"
                data-ai-hint="technical drawing"
              />
              {/* 도면 화살표 표시 (이미지 재현) */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-blue-500/80 p-1 rounded">
                <Search size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
