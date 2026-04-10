'use client';

import React, { useEffect, useState } from 'react';
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
import { ClipboardList, Loader2, RotateCcw } from "lucide-react";

interface WorkOrder {
  prodActId: string;
  orderDate: string;
  projNo: string;
  blockName: string;
  assyName: string;
  prodActNo: string;
  robotNo: string;
  employeeNumber: string;
  workDetail: string;
  finishStatus: string;
  workNum: string;
  startDateTime: string;
  finishDateTime: string;
}

export default function RobotWorkOrderPage() {
  const [data, setData] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateStart: '',
    dateEnd: '',
    robotNo: 'ALL',
    finishStatus: 'ALL'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters);
      const res = await fetch(`/api/operation/allocation?${params.toString()}`);
      const result = await res.json();
      if (Array.isArray(result)) {
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 섹션 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-1 자동화 장비 작업 배원 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        {/* 타이틀 및 검색 바 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList size={20} className="text-accent" />
            <h2 className="text-xl font-bold text-white tracking-tight">로봇 작업오더 현황</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white h-8 text-xs" onClick={fetchData}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> 새로고침
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 text-xs px-6" onClick={fetchData}>조회</Button>
          </div>
        </div>

        {/* 필터 바 (다크 모드 최적화) */}
        <div className="bg-slate-900 border border-white/10 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">오더일자</Label>
            <div className="flex items-center gap-1">
              <Input 
                type="date" 
                className="h-8 w-36 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" 
                value={filters.dateStart}
                onChange={(e) => setFilters(prev => ({ ...prev, dateStart: e.target.value }))}
              />
              <span className="text-xs text-slate-500">~</span>
              <Input 
                type="date" 
                className="h-8 w-36 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" 
                value={filters.dateEnd}
                onChange={(e) => setFilters(prev => ({ ...prev, dateEnd: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">장비번호</Label>
            <Input 
              className="h-8 w-32 bg-cyan-400/10 border-cyan-400/30 text-xs text-center font-bold text-white" 
              value={filters.robotNo}
              onChange={(e) => setFilters(prev => ({ ...prev, robotNo: e.target.value }))}
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">완료여부</Label>
            <Select 
              value={filters.finishStatus}
              onValueChange={(value) => setFilters(prev => ({ ...prev, finishStatus: value }))}
            >
              <SelectTrigger className="h-8 w-24 bg-cyan-400/10 border-cyan-400/30 text-xs font-bold text-white">
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

        {/* 데이터 테이블 (다크 테마) */}
        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col shadow-2xl">
          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            ) : (
              <Table className="text-[11px]">
                <TableHeader className="bg-blue-700 sticky top-0 z-10">
                  <TableRow className="border-white/10 hover:bg-blue-700">
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">장비번호</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">오더일자</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">오더번호</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">작업호선</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">작업블럭</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">작업담당</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">작업내용</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">Activity No</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">완료여부</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">종료예정일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-[#0f172a]">
                  {data.length > 0 ? (
                    data.map((row) => (
                      <TableRow key={row.prodActId} className="border-white/5 hover:bg-white/5 cursor-pointer">
                        <TableCell className="text-center font-bold text-white border-r border-white/5">{row.robotNo}</TableCell>
                        <TableCell className="text-center text-slate-400 border-r border-white/5">{row.orderDate}</TableCell>
                        <TableCell className="text-center font-mono text-slate-300 border-r border-white/5 text-[10px]">{row.prodActId}</TableCell>
                        <TableCell className="text-center text-slate-300 border-r border-white/5">{row.projNo}</TableCell>
                        <TableCell className="text-center font-bold text-white border-r border-white/5">{row.blockName}</TableCell>
                        <TableCell className="text-center text-slate-400 border-r border-white/5">{row.employeeNumber}</TableCell>
                        <TableCell className="text-center text-slate-500 border-r border-white/5">{row.workDetail}</TableCell>
                        <TableCell className="text-center text-slate-300 border-r border-white/5">{row.prodActNo}</TableCell>
                        <TableCell className="text-center border-r border-white/5">
                          <span className={row.finishStatus === 'Y' ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'}>{row.finishStatus}</span>
                        </TableCell>
                        <TableCell className="text-center text-slate-500">{row.finishDateTime}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="h-32 text-center text-slate-500">
                        데이터가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-blue-600 flex items-center justify-center text-[10px] text-white rounded">1</div>
        </div>
      </div>
    </div>
  );
}
