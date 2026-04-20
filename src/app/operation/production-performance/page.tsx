'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Factory, Loader2, RotateCcw, Plus, Save, Trash2 } from "lucide-react";

interface ProductionData {
  id: string;
  orderDate: string;
  orderNo: string;
  vessel: string;
  block: string;
  robotNo: string;
  worker: string;
  actual: number;
  status: string;
}

export default function ProductionPerformancePage() {
  const [data, setData] = useState<ProductionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllDates, setShowAllDates] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const initialFormState = {
    orderDate: '',
    orderNo: '',
    vessel: '',
    block: '',
    robotNo: '',
    worker: '',
    actual: 0
  };

  const [form, setForm] = useState(initialFormState);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    date: '2025-06-13',
    orderNo: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const queryParams = {
        ...filters,
        date: showAllDates ? '' : filters.date
      };
      const params = new URLSearchParams(queryParams);
      const res = await fetch(`/api/operation/production-performance?${params.toString()}`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNewOrder = () => {
    setForm(initialFormState);
    setIsEditMode(false);
    setSelectedId(null);
  };

  const handleAddOrder = async () => {
    if (!form.orderDate || !form.orderNo) {
      alert('오더일자와 오더번호는 필수입니다.');
      return;
    }

    try {
      const res = await fetch('/api/operation/production-performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (res.ok) {
        alert('오더가 추가되었습니다.');
        handleNewOrder();
        fetchData();
      } else {
        alert(`추가 실패: ${result.error || '알 수 없는 오류가 발생했습니다.'}`);
      }
    } catch (error) {
      console.error(error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  const handleUpdateOrder = async () => {
    if (!selectedId) {
      alert('수정할 오더를 선택해 주세요.');
      return;
    }

    try {
      const res = await fetch('/api/operation/production-performance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: selectedId })
      });

      const result = await res.json();

      if (res.ok) {
        alert('오더가 수정되었습니다.');
        fetchData();
      } else {
        alert(`수정 실패: ${result.error || '알 수 없는 오류가 발생했습니다.'}`);
      }
    } catch (error) {
      console.error(error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteOrder = async () => {
    if (!selectedId) {
      alert('삭제할 오더를 선택해 주세요.');
      return;
    }

    if (!confirm('정말로 이 오더를 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/operation/production-performance?id=${selectedId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('삭제되었습니다.');
        handleNewOrder();
        fetchData();
      } else {
        alert('삭제 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowClick = (item: ProductionData) => {
    setSelectedId(item.id);
    setForm({
      orderDate: item.orderDate ? String(item.orderDate).split('T')[0] : '',
      orderNo: item.orderNo || '',
      vessel: item.vessel || '',
      block: item.block || '',
      robotNo: item.robotNo || '',
      worker: item.worker || '',
      actual: item.actual || 0
    });
    setIsEditMode(true);
  };

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-3 공정별 생산 실적 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col min-h-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Factory size={20} className="text-green-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">공정별 생산 실적 통계</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white h-8 text-xs" onClick={fetchData}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> 새로고침
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-8 text-xs px-6" onClick={handleAddOrder}>
              <Plus className="w-3.5 h-3.5 mr-1" /> 오더 등록
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 text-xs px-6" onClick={handleUpdateOrder} disabled={!isEditMode}>
              <Save className="w-3.5 h-3.5 mr-1" /> 저장
            </Button>
            <Button size="sm" variant="secondary" className="bg-red-900/40 hover:bg-red-800 text-red-200 border border-red-500/30 h-8 text-xs px-4" onClick={handleDeleteOrder}>
              <Trash2 className="w-3.5 h-3.5 mr-1" /> 삭제
            </Button>
          </div>
        </div>

        {/* 오더 입력 폼 */}
        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 space-y-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-blue-400">오더 정보 입력/수정</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-xs text-slate-300">기간필터</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="date" 
                    className="h-7 bg-slate-900 border-white/10 text-[11px] text-white [color-scheme:dark]" 
                    value={filters.date}
                    onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                    disabled={showAllDates}
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <Checkbox id="all-dates" checked={showAllDates} onCheckedChange={(c) => setShowAllDates(!!c)} />
                    <label htmlFor="all-dates" className="text-[10px] text-slate-400">기간 전체보기</label>
                  </div>
                </div>
              </div>
              <div className="relative w-40">
                <Input 
                  className="h-7 bg-slate-900 border-white/10 text-[11px] text-white" 
                  placeholder="오더번호 검색..." 
                  value={filters.orderNo}
                  onChange={(e) => setFilters(prev => ({ ...prev, orderNo: e.target.value }))}
                />
              </div>
              <Button size="sm" className="bg-blue-600 h-7 text-[11px]" onClick={fetchData}>조회</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-slate-400">오더일자</Label>
              <Input name="orderDate" type="date" value={form.orderDate} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white [color-scheme:dark]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-slate-400">오더번호</Label>
              <Input name="orderNo" value={form.orderNo} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="오더번호 입력" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-slate-400">작업호선</Label>
              <Input name="vessel" value={form.vessel} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="호선번호 입력" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-slate-400">작업블럭</Label>
              <Input name="block" value={form.block} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="블럭명 입력" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-slate-400">장비번호</Label>
              <Input name="robotNo" value={form.robotNo} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="로봇번호 입력" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-slate-400">작업담당</Label>
              <Input name="worker" value={form.worker} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="담당자 사번" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-slate-400">실적횟수</Label>
              <Input name="actual" type="number" value={form.actual} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" />
            </div>
          </div>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col min-h-0 shadow-2xl">
          <div className="flex-1 overflow-auto">
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-600 sticky top-0 z-10 backdrop-blur-sm">
                <TableRow className="border-white/10 hover:bg-blue-600">
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">오더일자</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">오더번호</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">작업호선</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">작업블럭</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">장비번호</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">작업담당</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">실적횟수</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">완료여부</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-[#111827]">
                {loading ? (
                  <TableRow><TableCell colSpan={8} className="h-24 text-center"><Loader2 className="w-6 h-6 text-blue-500 animate-spin mx-auto" /></TableCell></TableRow>
                ) : data.length > 0 ? (
                  data.map((row, i) => (
                    <TableRow 
                      key={i} 
                      className={`border-white/5 hover:bg-blue-500/20 h-10 transition-colors cursor-pointer ${selectedId === row.id ? 'bg-blue-500/30' : ''}`}
                      onClick={() => handleRowClick(row)}
                    >
                      <TableCell className="text-center text-slate-400 border-r border-white/5">{row.orderDate ? String(row.orderDate).split('T')[0] : '-'}</TableCell>
                      <TableCell className="text-center font-bold text-white border-r border-white/5">{row.orderNo}</TableCell>
                      <TableCell className="text-center text-white border-r border-white/5">{row.vessel}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{row.block}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{row.robotNo}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{row.worker}</TableCell>
                      <TableCell className="text-center font-bold text-blue-400 border-r border-white/5">{row.actual}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                          row.status === '완료' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {row.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-slate-500 bg-slate-900/50">데이터가 없습니다.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
