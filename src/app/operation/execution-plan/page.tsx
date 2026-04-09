'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarRange, Search, Plus, Save, Loader2, RotateCcw } from "lucide-react";

interface PlanData {
  vessel: string;
  block: string;
  process: string;
  start: string;
  end: string;
  priority: string;
  status: string;
}

export default function ExecutionPlanPage() {
  const [data, setData] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllDates, setShowAllDates] = useState(false);
  const [filters, setFilters] = useState({
    month: '2025-06',
    process: 'all'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const queryParams = {
        ...filters,
        month: showAllDates ? '' : filters.month
      };
      const params = new URLSearchParams(queryParams);
      const res = await fetch(`/api/operation/execution-plan?${params.toString()}`);
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
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-5 공정별 생산 실행 계획 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarRange size={20} className="text-primary" />
            <h2 className="text-xl font-bold text-white tracking-tight">생산 실행 계획 수립</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white h-8 text-xs" onClick={fetchData}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> 새로고침
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" /> 계획추가
            </Button>
            <Button size="sm" className="bg-blue-600 h-8 text-xs px-6">
              <Save className="w-3.5 h-3.5 mr-1" /> 계획확정
            </Button>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">계획월</Label>
            <Input 
              type="month" 
              className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white disabled:opacity-50" 
              value={filters.month}
              onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
              disabled={showAllDates}
            />
            <div className="flex items-center gap-2 ml-2 shrink-0">
              <Checkbox 
                id="all-dates" 
                checked={showAllDates}
                onCheckedChange={(checked) => setShowAllDates(!!checked)}
                className="border-slate-500"
              />
              <label htmlFor="all-dates" className="text-[11px] text-slate-400 cursor-pointer select-none whitespace-nowrap">전체 일자</label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs font-bold text-slate-300 shrink-0">공정구분</Label>
            <Select 
              value={filters.process}
              onValueChange={(value) => setFilters(prev => ({ ...prev, process: value }))}
            >
              <SelectTrigger className="h-8 w-32 bg-cyan-400/10 border-cyan-400/30 text-xs text-white">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="so">소조</SelectItem>
                <SelectItem value="jung">중조</SelectItem>
                <SelectItem value="dae">대조</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4 ml-auto" onClick={fetchData}>
            <Search className="w-3.5 h-3.5 mr-1" /> 조회
          </Button>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : (
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-600 sticky top-0 z-10">
                <TableRow className="border-white/10 hover:bg-blue-600">
                  <TableHead className="text-white text-center font-bold h-9">호선</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">블록</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">공정</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">계획 시작일</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">계획 종료일</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">우선순위</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">진행상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-[#111827]">
                {data.length > 0 ? (
                  data.map((row, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{row.vessel}</TableCell>
                      <TableCell className="text-center font-bold text-white border-r border-white/5">{row.block}</TableCell>
                      <TableCell className="text-center text-slate-400 border-r border-white/5">{row.process}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{row.start}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{row.end}</TableCell>
                      <TableCell className="text-center border-r border-white/5">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          row.priority === '긴급' ? 'bg-red-500/20 text-red-400' : 
                          row.priority === '높음' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-500/20 text-slate-400'
                        }`}>
                          {row.priority}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          row.status === '완료' ? 'bg-green-500/20 text-green-400' : 
                          row.status === '진행중' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                        }`}>
                          {row.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                      데이터가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
