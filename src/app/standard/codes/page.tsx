'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Save, Trash2, Plus } from "lucide-react";

const CODE_GROUPS = [
  { name: '시스템접근코드', count: 4 },
  { name: '부서코드', count: 7 },
  { name: '용접재료', count: 4 },
  { name: '고장코드', count: 4 },
  { name: '부품코드', count: 11 },
  { name: '직책코드', count: 6 },
  { name: '직급코드', count: 14 },
  { name: '로봇번호', count: 9 },
];

const CODES = [
  { id: '1', name: 'ADMIN', note1: 'RW', note2: '1', usage: '공통' },
  { id: '2', name: 'LEVEL1', note1: 'RW', note2: '2', usage: '공통' },
  { id: '3', name: 'LEVEL2', note1: 'R', note2: '3', usage: '공통' },
  { id: '4', name: 'LEVEL3', note1: 'W', note2: '4', usage: '공통' },
];

export default function CommonCodePage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 영역 (노란색 제거) */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">기준정보관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">1-1 공통코드관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        {/* 헤더 및 버튼 영역 */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">공통코드관리</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Plus className="w-3.5 h-3.5 mr-1" /> 신규
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Save className="w-3.5 h-3.5 mr-1" /> 저장
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> 삭제
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Download className="w-3.5 h-3.5 mr-1" /> 다운로드
            </Button>
          </div>
        </div>

        {/* 상세 입력 폼 */}
        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 grid grid-cols-4 gap-y-4 gap-x-8">
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">그룹코드</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs focus-visible:ring-cyan-500" defaultValue="AccessLevel" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">그룹명</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="시스템접근코드" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">코드</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="1" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">코드명</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="ADMIN" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">비고1</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="RW" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">비고2</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="1" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">사용유무</Label>
            <div className="flex items-center gap-2">
              <Checkbox id="usage" defaultChecked className="border-cyan-400 data-[state=checked]:bg-cyan-500" />
              <label htmlFor="usage" className="text-xs text-white">YES</label>
            </div>
          </div>
        </div>

        {/* 하단 테이블 영역 */}
        <div className="flex-1 grid grid-cols-[350px_1fr] gap-4 overflow-hidden">
          {/* 좌측: 코드 그룹 목록 */}
          <div className="flex flex-col border border-white/10 rounded-lg overflow-hidden bg-slate-900">
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-600 sticky top-0 z-10">
                <TableRow className="border-white/10 hover:bg-blue-600">
                  <TableHead className="text-white text-center font-bold h-9">그룹명</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">하위개수</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CODE_GROUPS.map((group, i) => (
                  <TableRow key={i} className={`border-white/5 hover:bg-blue-500/20 cursor-pointer ${i === 0 ? 'bg-blue-500/10' : ''}`}>
                    <TableCell className="text-center font-bold text-white">{group.name}</TableCell>
                    <TableCell className="text-center text-slate-300">{group.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-auto bg-slate-800 p-2 flex justify-center">
              <div className="w-6 h-6 bg-teal-600 flex items-center justify-center text-[10px] text-white rounded">1</div>
            </div>
          </div>

          {/* 우측: 상세 코드 목록 */}
          <div className="flex flex-col border border-white/10 rounded-lg overflow-hidden bg-slate-900">
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-600 sticky top-0 z-10">
                <TableRow className="border-white/10 hover:bg-blue-600">
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">코드</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">코드명</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">비고1</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">비고2</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">사용유무</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CODES.map((item, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-blue-500/20 cursor-pointer">
                    <TableCell className="text-center text-white border-r border-white/5">{item.id}</TableCell>
                    <TableCell className="text-center text-white font-bold border-r border-white/5">{item.name}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{item.note1}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{item.note2}</TableCell>
                    <TableCell className="text-center text-slate-300">{item.usage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-auto bg-slate-800 p-2 flex justify-center">
              <div className="w-6 h-6 bg-teal-600 flex items-center justify-center text-[10px] text-white rounded">1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}