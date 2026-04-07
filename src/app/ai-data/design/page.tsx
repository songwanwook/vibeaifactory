'use client';

import React, { useEffect, useState } from 'react';
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
import { Search, Plus, Save, Trash2, Loader2 } from "lucide-react";

interface CadCell {
  ProjNo: string;
  CellNo: string;
  CellDataLW: string;
  CellDataFileFolder: string;
  CellDataDateTime: string;
}

export default function DesignInfoPage() {
  const [cells, setCells] = useState<CadCell[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    projNo: '289606',
    blockName: '',
    assyName: ''
  });

  const fetchCells = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.projNo) params.append('projNo', filter.projNo);
      if (filter.blockName) params.append('blockName', filter.blockName);
      if (filter.assyName) params.append('assyName', filter.assyName);

      const res = await fetch(`/api/cad-cells?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCells(data);
      }
    } catch (error) {
      console.error('Failed to fetch cells:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCells();
  }, []);

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
            <h2 className="text-xl font-bold text-white tracking-tight">Cell 도면 및 데이터 관리</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={fetchCells}>검색</Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">신규</Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">저장</Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">삭제</Button>
          </div>
        </div>

        {/* 검색 필터 */}
        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 grid grid-cols-3 gap-x-8">
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">호선번호</Label>
            <Input 
              value={filter.projNo} 
              onChange={(e) => setFilter(prev => ({...prev, projNo: e.target.value}))}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" 
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">블록명</Label>
            <Input 
              value={filter.blockName} 
              onChange={(e) => setFilter(prev => ({...prev, blockName: e.target.value}))}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" 
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">ASSY</Label>
            <Input 
              value={filter.assyName} 
              onChange={(e) => setFilter(prev => ({...prev, assyName: e.target.value}))}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" 
            />
          </div>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col shadow-2xl">
          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              </div>
            ) : (
              <Table className="text-[11px]">
                <TableHeader className="bg-blue-600 sticky top-0 z-10 shadow-md">
                  <TableRow className="border-white/10 hover:bg-blue-600">
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">호선번호 (ProjNo)</TableHead>
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">Cell No</TableHead>
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">데이터 (CellDataLW)</TableHead>
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">데이터경로 (FileFolder)</TableHead>
                    <TableHead className="text-white text-center font-bold h-10">작성일 (DateTime)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cells.length > 0 ? cells.map((cell, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-blue-500/10 transition-colors">
                      <TableCell className="text-center text-white border-r border-white/5">{cell.ProjNo}</TableCell>
                      <TableCell className="text-center text-white font-bold border-r border-white/5">{cell.CellNo}</TableCell>
                      <TableCell className="text-left text-slate-300 border-r border-white/5 truncate max-w-[300px] px-4">{cell.CellDataLW}</TableCell>
                      <TableCell className="text-left text-slate-400 border-r border-white/5 truncate max-w-[300px] px-4 italic">{cell.CellDataFileFolder}</TableCell>
                      <TableCell className="text-center text-slate-300">{cell.CellDataDateTime}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-20 text-slate-500">조회된 데이터가 없습니다.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="bg-slate-800/80 px-4 py-2 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-400">
            <span>Total: <b>{cells.length}</b> records</span>
          </div>
        </div>
      </div>
    </div>
  );
}
