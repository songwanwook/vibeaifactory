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
import { Activity, Search } from "lucide-react";

const PERFORMANCE_DATA = [
  { robotId: '6호기', name: 'Weld Robot 6', runTime: '18h 20m', stopTime: '5h 40m', rate: '76.4%', power: '4.2 kWh', defects: '2' },
  { robotId: '1호기', name: 'Weld Robot 1', runTime: '22h 05m', stopTime: '1h 55m', rate: '91.8%', power: '5.1 kWh', defects: '0' },
  { robotId: '7호기', name: 'Weld Robot 7', runTime: '15h 45m', stopTime: '8h 15m', rate: '65.6%', power: '3.8 kWh', defects: '5' },
  { robotId: '4호기', name: 'Weld Robot 4', runTime: '12h 10m', stopTime: '11h 50m', rate: '50.6%', power: '2.9 kWh', defects: '1' },
];

export default function EquipmentPerformancePage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#f8fafc]">
      <div className="bg-[#facc15] px-6 py-2">
        <span className="text-sm font-bold text-black">생산 운영 현황 관리 [6-2 자동화 장비 가동 실적 관리]</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-slate-200 rounded">
              <Activity size={20} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">장비 가동 실적 현황</h2>
          </div>
          <Button size="sm" className="bg-[#334155] hover:bg-slate-700 h-8 text-xs px-6">검색</Button>
        </div>

        <div className="bg-cyan-50 border border-cyan-100 rounded p-3 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-700 shrink-0">조회기간</Label>
            <div className="flex items-center gap-1">
              <Input type="month" className="h-8 bg-cyan-400/20 border-cyan-400/40 text-xs" defaultValue="2025-07" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-700 shrink-0">장비유형</Label>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-32 bg-cyan-400/20 border-cyan-400/40 text-xs font-bold">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="rb">로봇</SelectItem>
                <SelectItem value="vision">비전센서</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 border border-blue-100 rounded overflow-hidden bg-white flex flex-col shadow-sm">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600">
              <TableRow className="hover:bg-blue-600 border-blue-500">
                <TableHead className="text-white text-center font-bold h-9">장비번호</TableHead>
                <TableHead className="text-white text-center font-bold h-9">장비명</TableHead>
                <TableHead className="text-white text-center font-bold h-9">가동시간</TableHead>
                <TableHead className="text-white text-center font-bold h-9">비가동시간</TableHead>
                <TableHead className="text-white text-center font-bold h-9">가동률</TableHead>
                <TableHead className="text-white text-center font-bold h-9">전력소모량</TableHead>
                <TableHead className="text-white text-center font-bold h-9">불량발생</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PERFORMANCE_DATA.map((row, i) => (
                <TableRow key={i} className="border-slate-100 hover:bg-blue-50">
                  <TableCell className="text-center font-bold text-slate-800">{row.robotId}</TableCell>
                  <TableCell className="text-center text-slate-700">{row.name}</TableCell>
                  <TableCell className="text-center text-slate-600">{row.runTime}</TableCell>
                  <TableCell className="text-center text-slate-600">{row.stopTime}</TableCell>
                  <TableCell className="text-center font-bold text-blue-600">{row.rate}</TableCell>
                  <TableCell className="text-center text-slate-600">{row.power}</TableCell>
                  <TableCell className="text-center text-red-500 font-bold">{row.defects}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
