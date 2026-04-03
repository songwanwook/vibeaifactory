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
import { Search, Plus, Save, Trash2, Download, AlertCircle } from "lucide-react";

const HISTORY = [
  { id: '1', robotId: '10호기', robotName: '10호기', type: '고장', content: '모터 과부하 발생', action: '모터 교체 및 윤활유 보충', date: '2025-01-15', status: '조치완료', worker: '홍길동' },
  { id: '2', robotId: '1호기', robotName: '1호기', type: '정기점검', content: '센서 감도 정밀 점검', action: '정밀 교정 및 청소', date: '2025-01-10', status: '조치완료', worker: '김철수' },
  { id: '3', robotId: '6호기', robotName: '6호기', type: '고장', content: '통신 에러 빈발', action: '케이블 점검 및 펌웨어 업데이트', date: '2025-01-20', status: '진행중', worker: '이영희' },
  { id: '4', robotId: '3호기', robotName: '3호기', type: '정기점검', content: '소음 발생', action: '베어링 교체 예정', date: '2025-01-22', status: '대기', worker: '관리자' },
];

export default function MalfunctionHistoryPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">자동화 장비 자산 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">2-2 고장/수리이력 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        {/* 헤더 및 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white tracking-tight">고장/수리이력 관리</h2>
            <div className="flex items-center gap-1.5 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
              <AlertCircle size={14} className="text-red-400" />
              <span className="text-[11px] text-red-400 font-medium">실시간 고장 접수 2건</span>
            </div>
          </div>
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
              <Download className="w-3.5 h-3.5 mr-1" /> 리포트
            </Button>
          </div>
        </div>

        {/* 검색 필터 */}
        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 grid grid-cols-4 gap-y-4 gap-x-8">
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">장비번호</Label>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 bg-slate-900 border-white/10 text-xs">
                <SelectValue placeholder="장비 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="10">10호기</SelectItem>
                <SelectItem value="1">1호기</SelectItem>
                <SelectItem value="6">6호기</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">구분</Label>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 bg-slate-900 border-white/10 text-xs">
                <SelectValue placeholder="구분 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="error">고장</SelectItem>
                <SelectItem value="check">정기점검</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">상태</Label>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 bg-slate-900 border-white/10 text-xs">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="done">조치완료</SelectItem>
                <SelectItem value="ing">진행중</SelectItem>
                <SelectItem value="ready">대기</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">기간</Label>
            <Input type="month" className="h-8 bg-slate-900 border-white/10 text-xs" defaultValue="2025-01" />
          </div>
        </div>

        {/* 이력 테이블 */}
        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <div className="flex-1 overflow-auto">
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-600 sticky top-0 z-10">
                <TableRow className="border-white/10 hover:bg-blue-600">
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10 w-16">No</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">장비번호</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">구분</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">고장/점검 내용</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">수리/조치 내용</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">일자</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">작업자</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {HISTORY.map((item, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-blue-500/20 cursor-pointer">
                    <TableCell className="text-center text-slate-400 border-r border-white/5">{i + 1}</TableCell>
                    <TableCell className="text-center text-white font-bold border-r border-white/5">{item.robotId}</TableCell>
                    <TableCell className="text-center border-r border-white/5">
                      <span className={item.type === '고장' ? 'text-red-400' : 'text-blue-400'}>{item.type}</span>
                    </TableCell>
                    <TableCell className="text-left text-slate-300 border-r border-white/5 px-4">{item.content}</TableCell>
                    <TableCell className="text-left text-slate-300 border-r border-white/5 px-4">{item.action}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{item.date}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{item.worker}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        item.status === '조치완료' ? 'bg-green-500/20 text-green-400' :
                        item.status === '진행중' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
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
