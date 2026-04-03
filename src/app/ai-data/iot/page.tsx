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
import { Search, Plus, Save, Trash2, Cpu } from "lucide-react";

const IOT_DATA = [
  { id: 'S-101', type: '온도', value: '24.5°C', status: '정상', time: '2025-03-26 14:10:05', location: '용접 1라인' },
  { id: 'S-102', type: '습도', value: '45%', status: '정상', time: '2025-03-26 14:10:10', location: '용접 1라인' },
  { id: 'S-201', type: '전압', value: '220V', status: '정상', time: '2025-03-26 14:09:55', location: '용접 2라인' },
  { id: 'S-202', type: '전류', value: '150A', status: '주의', time: '2025-03-26 14:10:20', location: '용접 2라인' },
  { id: 'S-301', type: '진동', value: '0.02g', status: '정상', time: '2025-03-26 14:08:30', location: '조립 라인' },
];

export default function IotDataPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">인공지능 데이터 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">3-2 자동화 및 IOT 데이터 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-primary" />
            <h2 className="text-xl font-bold text-white tracking-tight">IOT 센서 데이터 현황</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4">조회</Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4">내보내기</Button>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 grid grid-cols-3 gap-x-8">
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">센서 ID</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" placeholder="ID 입력" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">라인구분</Label>
            <Input className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" placeholder="라인 선택" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">기간</Label>
            <Input type="date" className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" />
          </div>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">센서 ID</TableHead>
                <TableHead className="text-white text-center font-bold h-9">데이터 유형</TableHead>
                <TableHead className="text-white text-center font-bold h-9">현재값</TableHead>
                <TableHead className="text-white text-center font-bold h-9">상태</TableHead>
                <TableHead className="text-white text-center font-bold h-9">수집시간</TableHead>
                <TableHead className="text-white text-center font-bold h-9">설치위치</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {IOT_DATA.map((item, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-blue-500/20">
                  <TableCell className="text-center text-white font-mono">{item.id}</TableCell>
                  <TableCell className="text-center text-slate-300">{item.type}</TableCell>
                  <TableCell className="text-center text-primary font-bold">{item.value}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      item.status === '정상' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-slate-400">{item.time}</TableCell>
                  <TableCell className="text-center text-slate-300">{item.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}