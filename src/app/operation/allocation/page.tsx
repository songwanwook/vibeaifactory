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
import { ClipboardList, Loader2, RotateCcw, Edit2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

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

  const handleEditClick = (order: WorkOrder) => {
    setSelectedOrder({ ...order });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm('정말로 이 작업오더를 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/operation/allocation?id=${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (res.ok) {
        toast({ title: "성공", description: result.message });
        fetchData();
      } else {
        toast({ title: "오류", description: result.error, variant: "destructive" });
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      toast({ title: "오류", description: "삭제 중 오류가 발생했습니다.", variant: "destructive" });
    }
  };

  const handleUpdate = async () => {
    if (!selectedOrder) return;

    try {
      const res = await fetch('/api/operation/allocation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedOrder),
      });
      const result = await res.json();
      if (res.ok) {
        toast({ title: "성공", description: result.message });
        setIsEditDialogOpen(false);
        fetchData();
      } else {
        toast({ title: "오류", description: result.error, variant: "destructive" });
      }
    } catch (error) {
      console.error('Failed to update:', error);
      toast({ title: "오류", description: "수정 중 오류가 발생했습니다.", variant: "destructive" });
    }
  };

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
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">종료예정일</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">관리</TableHead>
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
                        <TableCell className="text-center text-slate-500 border-r border-white/5">{row.finishDateTime}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button size="icon" variant="ghost" className="h-6 w-6 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" onClick={() => handleEditClick(row)}>
                              <Edit2 size={12} />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-400/10" onClick={() => handleDeleteClick(row.prodActId)}>
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} className="h-32 text-center text-slate-500">
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

      {/* 수정 다이얼로그 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>작업오더 수정</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-xs">오더일자</Label>
                <Input 
                  type="date"
                  className="col-span-3 h-8 bg-slate-800 border-white/10 text-xs" 
                  value={selectedOrder.orderDate}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, orderDate: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-xs">로봇번호</Label>
                <Input 
                  className="col-span-3 h-8 bg-slate-800 border-white/10 text-xs" 
                  value={selectedOrder.robotNo}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, robotNo: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-xs">호선번호</Label>
                <Input 
                  className="col-span-3 h-8 bg-slate-800 border-white/10 text-xs" 
                  value={selectedOrder.projNo}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, projNo: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-xs">실적횟수</Label>
                <Input 
                  type="number"
                  className="col-span-3 h-8 bg-slate-800 border-white/10 text-xs" 
                  value={selectedOrder.workNum}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, workNum: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-xs">블럭명</Label>
                <Input 
                  className="col-span-3 h-8 bg-slate-800 border-white/10 text-xs" 
                  value={selectedOrder.blockName}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, blockName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-xs">담당자 사번</Label>
                <Input 
                  className="col-span-3 h-8 bg-slate-800 border-white/10 text-xs" 
                  value={selectedOrder.employeeNumber}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, employeeNumber: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" className="h-8 text-xs hover:bg-white/5" onClick={() => setIsEditDialogOpen(false)}>취소</Button>
            <Button className="h-8 text-xs bg-blue-600 hover:bg-blue-700" onClick={handleUpdate}>수정 완료</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
