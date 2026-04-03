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
import { Search, Plus, Save, Trash2, Download } from "lucide-react";

const ASSETS = [
  { id: '10호기', name: '10호기', maker: 'Hyundai Robotics', model: 'HDR20-20', serial: 'HR20201001', weight: '20.0kg', date: '2023-01-02', checkDate: '2025-01-20', period: '6개월' },
  { id: '11호기', name: '11호기', maker: 'Hyundai Robotics', model: 'HDR21-20', serial: 'HR20211001', weight: '21.0kg', date: '2021-02-22', checkDate: '2024-09-20', period: '12개월' },
  { id: '1호기', name: '1호기', maker: 'Universal Robots', model: 'UR3', serial: 'UR3A001001', weight: '10.5kg', date: '2024-07-01', checkDate: '2025-01-01', period: '7개월' },
  { id: '2호기', name: '2호기', maker: 'Universal Robots', model: 'UR3', serial: 'UR3A001002', weight: '10.5kg', date: '2024-07-01', checkDate: '2025-01-01', period: '6개월' },
  { id: '3호기', name: '3호기', maker: 'Universal Robots', model: 'UR3', serial: 'UR3A001003', weight: '10.5kg', date: '2024-07-01', checkDate: '2025-01-01', period: '6개월' },
  { id: '4호기', name: '4호기', maker: 'Universal Robots', model: 'UR3', serial: 'UR3A001004', weight: '10.5kg', date: '2024-08-01', checkDate: '2025-02-01', period: '6개월' },
  { id: '5호기', name: '5호기', maker: 'Universal Robots', model: 'UR3', serial: 'UR3A001005', weight: '10.5kg', date: '2024-08-01', checkDate: '2025-02-01', period: '6개월' },
  { id: '6호기', name: '6호기', maker: 'Universal Robots', model: 'UR3', serial: 'UR3A001006', weight: '10.5kg', date: '2024-08-01', checkDate: '2025-02-01', period: '6개월' },
];

export default function AssetInventoryPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">자동화 장비 자산 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">2-1 자동화 장비 자산 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        {/* 헤더 및 버튼 */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">용접협동 로봇 관리</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Search className="w-3.5 h-3.5 mr-1" /> 검색
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Plus className="w-3.5 h-3.5 mr-1" /> 신규
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Save className="w-3.5 h-3.5 mr-1" /> 저장
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> 삭제
            </Button>
          </div>
        </div>

        {/* 상세 입력 폼 (민트 스타일) */}
        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 grid grid-cols-4 gap-y-4 gap-x-8">
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">장비번호</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="10호기" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">장비명</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="10호기" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">Maker</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="Hyundai Robotics" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">모델명</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="HDR20-20" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">도입일자</Label>
            <Input type="date" className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="2023-01-02" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">점검일자</Label>
            <Input type="date" className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="2025-01-20" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">시리얼 No.</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="HR20201001" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">중량(kg)</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" defaultValue="20.0" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">점검주기</Label>
            <Select defaultValue="6">
              <SelectTrigger className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs">
                <SelectValue placeholder="주기 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1개월</SelectItem>
                <SelectItem value="3">3개월</SelectItem>
                <SelectItem value="6">6개월</SelectItem>
                <SelectItem value="12">12개월</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 테이블 영역 */}
        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <div className="flex-1 overflow-auto">
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-600 sticky top-0 z-10">
                <TableRow className="border-white/10 hover:bg-blue-600">
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">장비번호</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">장비명</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">Maker</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">모델명</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">시리얼 No.</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">중량(kg)</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">도입일자</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">점검일자</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">점검주기</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ASSETS.map((asset, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-blue-500/20 cursor-pointer">
                    <TableCell className="text-center text-white font-bold border-r border-white/5">{asset.id}</TableCell>
                    <TableCell className="text-center text-white border-r border-white/5">{asset.name}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{asset.maker}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{asset.model}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{asset.serial}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{asset.weight}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{asset.date}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{asset.checkDate}</TableCell>
                    <TableCell className="text-center text-slate-300">{asset.period}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="bg-slate-800 p-2 flex justify-center border-t border-white/5">
            <div className="w-6 h-6 bg-teal-600 flex items-center justify-center text-[10px] text-white rounded">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
