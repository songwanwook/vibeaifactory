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
import { ClipboardList, Search } from "lucide-react";

const ORDER_DATA = [
  { robotId: '6호기', date: '2025-06-13', orderNo: '843206_734266765_12', vessel: '843206', block: 'B13P', manager: '323187', content: '-', counts: '734266765', status: 'Y', endDate: '2025-08-18' },
  { robotId: '1호기', date: '2025-06-20', orderNo: '843206_734266766_1', vessel: '843206', block: 'B13S', manager: '342465', content: '-', counts: '734266766', status: 'Y', endDate: '2025-08-25' },
  { robotId: '7호기', date: '2025-07-01', orderNo: '843206_734266767_6', vessel: '843206', block: 'B14P', manager: '834235', content: '-', counts: '734266767', status: 'N', endDate: '2025-09-03' },
  { robotId: '4호기', date: '2025-07-09', orderNo: '843206_734266771_3', vessel: '843206', block: 'B12C', manager: '824435', content: '-', counts: '734266771', status: 'N', endDate: '2025-08-20' },
];

export default function RobotWorkOrderPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#f8fafc]">
      {/* 상단 노란색 브레드크럼 섹션 (이미지 재현) */}
      <div className="bg-[#facc15] px-6 py-2">
        <span className="text-sm font-bold text-black">생산 운영 현황 관리 [6-1 자동화 장비 작업 배원 관리]</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        {/* 타이틀 및 검색 바 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-slate-200 rounded">
              <ClipboardList size={20} className="text-slate-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">로봇 작업오더 현황</h2>
          </div>
          <Button size="sm" className="bg-[#334155] hover:bg-slate-700 h-8 text-xs px-6">검색</Button>
        </div>

        {/* 필터 바 (이미지의 민트색 스타일 재현) */}
        <div className="bg-cyan-50 border border-cyan-100 rounded p-3 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-700 shrink-0">오더일자</Label>
            <div className="flex items-center gap-1">
              <Input type="date" className="h-8 w-36 bg-cyan-400/20 border-cyan-400/40 text-xs" defaultValue="2025-07-09" />
              <span className="text-xs">~</span>
              <Input type="date" className="h-8 w-36 bg-cyan-400/20 border-cyan-400/40 text-xs" defaultValue="2025-07-09" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-700 shrink-0">장비번호</Label>
            <Input className="h-8 w-32 bg-cyan-400/20 border-cyan-400/40 text-xs text-center font-bold" defaultValue="4호기" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-700 shrink-0">완료여부</Label>
            <Select defaultValue="N">
              <SelectTrigger className="h-8 w-24 bg-cyan-400/20 border-cyan-400/40 text-xs font-bold">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">전체</SelectItem>
                <SelectItem value="Y">Y</SelectItem>
                <SelectItem value="N">N</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 데이터 테이블 */}
        <div className="flex-1 border border-blue-100 rounded overflow-hidden bg-white flex flex-col shadow-sm">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600">
              <TableRow className="hover:bg-blue-600 border-blue-500">
                <TableHead className="text-white text-center font-bold h-9 border-r border-blue-400/50">장비번호</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-blue-400/50">오더일자</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-blue-400/50">오더번호</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-blue-400/50">작업호선</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-blue-400/50">작업블럭</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-blue-400/50">작업담당</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-blue-400/50">작업내용</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-blue-400/50">실적횟수</TableHead>
                <TableHead className="text-white text-center font-bold h-9 border-r border-blue-400/50">완료여부</TableHead>
                <TableHead className="text-white text-center font-bold h-9">완료날짜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDER_DATA.map((row, i) => (
                <TableRow key={i} className={`border-slate-100 hover:bg-blue-50 cursor-pointer ${i % 2 === 1 ? 'bg-blue-50/30' : ''}`}>
                  <TableCell className="text-center font-bold text-slate-800 border-r border-slate-100">{row.robotId}</TableCell>
                  <TableCell className="text-center text-slate-600 border-r border-slate-100">{row.date}</TableCell>
                  <TableCell className="text-center font-mono text-slate-700 border-r border-slate-100">{row.orderNo}</TableCell>
                  <TableCell className="text-center text-slate-700 border-r border-slate-100">{row.vessel}</TableCell>
                  <TableCell className="text-center font-bold text-slate-800 border-r border-slate-100">{row.block}</TableCell>
                  <TableCell className="text-center text-slate-600 border-r border-slate-100">{row.manager}</TableCell>
                  <TableCell className="text-center text-slate-400 border-r border-slate-100">{row.content}</TableCell>
                  <TableCell className="text-center text-slate-600 border-r border-slate-100">{row.counts}</TableCell>
                  <TableCell className="text-center border-r border-slate-100">
                    <span className={row.status === 'Y' ? 'text-blue-600 font-bold' : 'text-red-500 font-bold'}>{row.status}</span>
                  </TableCell>
                  <TableCell className="text-center text-slate-500">{row.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 페이지네이션 (이미지 스타일) */}
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-teal-600 flex items-center justify-center text-[10px] text-white rounded">1</div>
        </div>
      </div>
    </div>
  );
}
