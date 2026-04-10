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
import { Search, Plus, Save, Loader2, History, Wrench } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Breakdown {
  BreakdnNo: string;
  RobotNo: string;
  BreakdnDate: string;
  BreakdnReason: string | null;
  BreakdnDesc: string;
  EmployeeNumber: string;
}

interface Repair {
  RepairNo: string;
  BreakdnNo: string;
  RobotNo: string;
  RepairDateTime: string;
  RepairPart: string;
  RepairCost: string | null;
  RepairDesc: string | null;
}

export default function MalfunctionHistoryPage() {
  const [activeTab, setActiveTab] = useState("breakdown");
  const [breakdowns, setBreakdowns] = useState<Breakdown[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);
  const [robots, setRobots] = useState<{ RobotNo: string }[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  const [filter, setFilter] = useState({
    robotNo: 'all',
    startDate: '',
    endDate: ''
  });

  const [breakdownForm, setBreakdownForm] = useState({
    BreakdnNo: '',
    RobotNo: '',
    BreakdnDate: '',
    BreakdnReason: '',
    BreakdnDesc: '',
    EmployeeNumber: ''
  });

  const [repairForm, setRepairForm] = useState({
    RepairNo: '',
    BreakdnNo: '',
    RobotNo: '',
    RepairDateTime: '',
    RepairPart: '',
    RepairCost: '',
    RepairDesc: ''
  });

  const fetchRobots = async () => {
    try {
      const res = await fetch('/api/robots');
      const data = await res.json();
      if (Array.isArray(data)) setRobots(data);
    } catch (error) {
      console.error('Failed to fetch robots:', error);
    }
  };

  const fetchBreakdowns = async (currentFilter = filter) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (currentFilter.robotNo && currentFilter.robotNo !== 'all') params.append('robotNo', currentFilter.robotNo);
      if (currentFilter.startDate) params.append('startDate', currentFilter.startDate);
      if (currentFilter.endDate) params.append('endDate', currentFilter.endDate);

      const res = await fetch(`/api/maintenance/breakdowns?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json();
      
      if (Array.isArray(data)) {
        const normalized = data.map(item => {
          let cleanDate = item.BreakdnDate;
          if (cleanDate && typeof cleanDate === 'string') {
            cleanDate = cleanDate.split('T')[0].split(' ')[0];
          }
          return {
            ...item,
            BreakdnDate: cleanDate
          };
        });
        setBreakdowns(normalized);
      }
    } catch (error) {
      console.error('Failed to fetch breakdowns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/maintenance/repairs', { cache: 'no-store' });
      const data = await res.json();
      
      if (Array.isArray(data)) {
        const normalized = data.map(item => {
          let cleanDate = item.RepairDateTime;
          if (cleanDate && typeof cleanDate === 'string') {
            cleanDate = cleanDate.split('T')[0].split(' ')[0];
          }
          return {
            ...item,
            RepairDateTime: cleanDate
          };
        });
        setRepairs(normalized);
      }
    } catch (error) {
      console.error('Failed to fetch repairs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    fetchRobots();
    fetchBreakdowns({ robotNo: 'all', startDate: '', endDate: '' });
    fetchRepairs();
  }, []);

  const handleBreakdownInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBreakdownForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRepairInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRepairForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNewBreakdown = async () => {
    const requiredFields = ['BreakdnNo', 'RobotNo', 'BreakdnDate', 'BreakdnDesc', 'EmployeeNumber'];
    if (!requiredFields.every(f => breakdownForm[f as keyof typeof breakdownForm]?.trim())) {
      alert('항목을 모두 입력해 주세요.'); return;
    }
    try {
      const res = await fetch('/api/maintenance/breakdowns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(breakdownForm)
      });
      if (res.ok) {
        alert('등록되었습니다.');
        setBreakdownForm({ BreakdnNo: '', RobotNo: '', BreakdnDate: '', BreakdnReason: '', BreakdnDesc: '', EmployeeNumber: '' });
        fetchBreakdowns();
      } else {
        const err = await res.json();
        alert(err.error || '등록 실패');
      }
    } catch (error) { console.error(error); }
  };

  const handleSaveBreakdown = async () => {
    const requiredFields = ['BreakdnNo', 'RobotNo', 'BreakdnDate', 'BreakdnDesc', 'EmployeeNumber'];
    if (!requiredFields.every(f => breakdownForm[f as keyof typeof breakdownForm]?.trim())) {
      alert('항목을 모두 입력해 주세요.'); return;
    }
    try {
      const res = await fetch('/api/maintenance/breakdowns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(breakdownForm)
      });
      if (res.ok) { alert('수정되었습니다.'); fetchBreakdowns(); }
    } catch (error) { console.error(error); }
  };

  const handleNewRepair = async () => {
    const requiredFields = ['RepairNo', 'BreakdnNo', 'RobotNo', 'RepairDateTime', 'RepairPart'];
    if (!requiredFields.every(f => repairForm[f as keyof typeof repairForm]?.trim())) {
      alert('항목을 모두 입력해 주세요.'); return;
    }
    try {
      const res = await fetch('/api/maintenance/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(repairForm)
      });
      if (res.ok) {
        alert('등록되었습니다.');
        setRepairForm({ RepairNo: '', BreakdnNo: '', RobotNo: '', RepairDateTime: '', RepairPart: '', RepairCost: '', RepairDesc: '' });
        fetchRepairs();
      } else {
        const err = await res.json();
        alert(err.error || '등록 실패');
      }
    } catch (error) { console.error(error); }
  };

  const handleSaveRepair = async () => {
    const requiredFields = ['RepairNo', 'BreakdnNo', 'RobotNo', 'RepairDateTime', 'RepairPart'];
    if (!requiredFields.every(f => repairForm[f as keyof typeof repairForm]?.trim())) {
      alert('항목을 모두 입력해 주세요.'); return;
    }
    try {
      const res = await fetch('/api/maintenance/repairs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(repairForm)
      });
      if (res.ok) { alert('수정되었습니다.'); fetchRepairs(); }
      else {
        const err = await res.json();
        alert(err.error || '수정 실패');
      }
    } catch (error) { console.error(error); }
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* breadcrumb */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-medium text-white/50">자동화 장비 자산 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">2-2 고장/수리이력 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <TabsList className="bg-slate-800 border border-white/10 p-1 h-10">
              <TabsTrigger value="breakdown" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs gap-2 px-6 h-8">
                <History size={14} /> 고장 이력 관리
              </TabsTrigger>
              <TabsTrigger value="repair" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-xs gap-2 px-6 h-8">
                <Wrench size={14} /> 수리 이력 관리
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={() => activeTab === 'breakdown' ? fetchBreakdowns() : fetchRepairs()}>
                <Search className="w-3.5 h-3.5 mr-1" /> 검색
              </Button>
              <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={() => activeTab === 'breakdown' ? handleNewBreakdown() : handleNewRepair()}>
                <Plus className="w-3.5 h-3.5 mr-1" /> 신규
              </Button>
              <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={() => activeTab === 'breakdown' ? handleSaveBreakdown() : handleSaveRepair()}>
                <Save className="w-3.5 h-3.5 mr-1" /> 저장
              </Button>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <TabsContent value="breakdown" className="h-full flex flex-col space-y-4 m-0 overflow-hidden data-[state=inactive]:hidden">
              <div className="grid grid-cols-2 gap-4 shrink-0">
                <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 space-y-3">
                  <h3 className="text-xs font-bold text-blue-400 mb-2">고장 이력 입력/수정</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">고장번호</Label><Input name="BreakdnNo" value={breakdownForm.BreakdnNo} onChange={handleBreakdownInputChange} className="h-8 bg-slate-900 border-white/10 text-xs" /></div>
                    <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">로봇번호</Label>
                      <Select value={breakdownForm.RobotNo} onValueChange={(val) => setBreakdownForm(p => ({...p, RobotNo: val}))}><SelectTrigger className="h-8 bg-slate-900 border-white/10 text-xs"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent>{robots.map(r => <SelectItem key={r.RobotNo} value={r.RobotNo}>{r.RobotNo}</SelectItem>)}</SelectContent></Select>
                    </div>
                    <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">고장일자</Label><Input name="BreakdnDate" type="date" value={breakdownForm.BreakdnDate} onChange={handleBreakdownInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white [color-scheme:dark]" /></div>
                    <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">사번</Label><Input name="EmployeeNumber" value={breakdownForm.EmployeeNumber} onChange={handleBreakdownInputChange} className="h-8 bg-slate-900 border-white/10 text-xs" /></div>
                  </div>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">고장사유</Label><Input name="BreakdnReason" value={breakdownForm.BreakdnReason || ''} onChange={handleBreakdownInputChange} className="h-8 bg-slate-900 border-white/10 text-xs flex-1" /></div>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">고장내용</Label><Input name="BreakdnDesc" value={breakdownForm.BreakdnDesc} onChange={handleBreakdownInputChange} className="h-8 bg-slate-900 border-white/10 text-xs flex-1" /></div>
                </div>
                <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 space-y-3">
                  <h3 className="text-xs font-bold text-teal-400 mb-2">조회 필터</h3>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">장비번호</Label>
                    <Select value={filter.robotNo} onValueChange={(val) => setFilter(p => ({...p, robotNo: val}))}><SelectTrigger className="h-8 bg-slate-900 border-white/10 text-xs"><SelectValue placeholder="전체" /></SelectTrigger><SelectContent><SelectItem value="all">전체</SelectItem>{robots.map(r => <SelectItem key={r.RobotNo} value={r.RobotNo}>{r.RobotNo}</SelectItem>)}</SelectContent></Select>
                  </div>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">기간(시작)</Label><Input type="date" value={filter.startDate} onChange={(e) => setFilter(p => ({...p, startDate: e.target.value}))} className="h-8 bg-slate-900 border-white/10 text-xs text-white [color-scheme:dark] flex-1" /></div>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">기간(종료)</Label><Input type="date" value={filter.endDate} onChange={(e) => setFilter(p => ({...p, endDate: e.target.value}))} className="h-8 bg-slate-900 border-white/10 text-xs text-white [color-scheme:dark] flex-1" /></div>
                </div>
              </div>

              <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col min-h-0 shadow-2xl">
                <div className="flex-1 overflow-auto">
                  <div className="min-w-full inline-block align-middle">
                    <Table className="text-[11px]">
                      <TableHeader className="bg-blue-600/90 sticky top-0 z-10 backdrop-blur-sm">
                        <TableRow className="border-white/10 hover:bg-transparent">
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 w-20">고장번호</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 w-24">장비번호</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 w-32">고장일자</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 min-w-[150px]">고장사유</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 min-w-[200px]">고장내용</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 w-24">사번</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {breakdowns.length > 0 ? breakdowns.map((item, idx) => (
                          <TableRow 
                            key={`${item.BreakdnNo}-${idx}`} 
                            className="border-white/5 hover:bg-blue-500/20 cursor-pointer h-10 transition-colors group" 
                            onClick={() => setBreakdownForm({ BreakdnNo: item.BreakdnNo, RobotNo: item.RobotNo, BreakdnDate: item.BreakdnDate, BreakdnReason: item.BreakdnReason || '', BreakdnDesc: item.BreakdnDesc, EmployeeNumber: item.EmployeeNumber })}
                          >
                            <TableCell className="text-center text-white font-bold border-r border-white/5 py-2">{item.BreakdnNo}</TableCell>
                            <TableCell className="text-center text-slate-300 border-r border-white/5 py-2">{item.RobotNo}</TableCell>
                            <TableCell className="text-center text-slate-300 border-r border-white/5 py-2">{item.BreakdnDate}</TableCell>
                            <TableCell className="text-left text-slate-300 border-r border-white/5 px-3 py-2">{item.BreakdnReason || '-'}</TableCell>
                            <TableCell className="text-left text-slate-300 border-r border-white/5 px-3 py-2">{item.BreakdnDesc}</TableCell>
                            <TableCell className="text-center text-slate-300 py-2">{item.EmployeeNumber}</TableCell>
                          </TableRow>
                        )) : (
                          <TableRow><TableCell colSpan={6} className="text-center py-20 text-slate-500 bg-slate-900/50">조회된 데이터가 없습니다.</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="bg-slate-800/80 px-4 py-2 border-t border-white/5 text-[10px] text-slate-400 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-4">
                    <span>Total: <span className="text-blue-400 font-bold">{breakdowns.length}</span> records</span>
                  </div>
                  {loading && <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="repair" className="h-full flex flex-col space-y-4 m-0 overflow-hidden data-[state=inactive]:hidden">
              <div className="grid grid-cols-2 gap-4 shrink-0">
                <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 space-y-3">
                  <h3 className="text-xs font-bold text-teal-400 mb-2">수리 이력 입력/수정</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-16 shrink-0">수리번호</Label><Input name="RepairNo" value={repairForm.RepairNo} onChange={handleRepairInputChange} className="h-8 bg-slate-900 border-white/10 text-xs flex-1" /></div>
                    <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-16 shrink-0">고장번호</Label><Input name="BreakdnNo" value={repairForm.BreakdnNo} onChange={handleRepairInputChange} className="h-8 bg-slate-900 border-white/10 text-xs flex-1" /></div>
                    <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-16 shrink-0">로봇번호</Label>
                      <Select value={repairForm.RobotNo} onValueChange={(val) => setRepairForm(p => ({...p, RobotNo: val}))}><SelectTrigger className="h-8 bg-slate-900 border-white/10 text-xs flex-1"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent>{robots.map(r => <SelectItem key={r.RobotNo} value={r.RobotNo}>{r.RobotNo}</SelectItem>)}</SelectContent></Select>
                    </div>
                    <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-16 shrink-0">수리일시</Label><Input name="RepairDateTime" type="date" value={repairForm.RepairDateTime} onChange={handleRepairInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white [color-scheme:dark] flex-1" /></div>
                  </div>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-16 shrink-0">수리부품</Label><Input name="RepairPart" value={repairForm.RepairPart} onChange={handleRepairInputChange} className="h-8 bg-slate-900 border-white/10 text-xs flex-1" /></div>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-16 shrink-0">수리내용</Label><Input name="RepairDesc" value={repairForm.RepairDesc || ''} onChange={handleRepairInputChange} className="h-8 bg-slate-900 border-white/10 text-xs flex-1" /></div>
                </div>
                <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 space-y-3">
                  <h3 className="text-xs font-bold text-teal-400 mb-2">조회 필터</h3>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">장비번호</Label>
                    <Select value={filter.robotNo} onValueChange={(val) => setFilter(p => ({...p, robotNo: val}))}><SelectTrigger className="h-8 bg-slate-900 border-white/10 text-xs flex-1"><SelectValue placeholder="전체" /></SelectTrigger><SelectContent><SelectItem value="all">전체</SelectItem>{robots.map(r => <SelectItem key={r.RobotNo} value={r.RobotNo}>{r.RobotNo}</SelectItem>)}</SelectContent></Select>
                  </div>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">기간(시작)</Label><Input type="date" value={filter.startDate} onChange={(e) => setFilter(p => ({...p, startDate: e.target.value}))} className="h-8 bg-slate-900 border-white/10 text-xs text-white [color-scheme:dark] flex-1" /></div>
                  <div className="flex items-center gap-3"><Label className="text-xs text-slate-300 w-20 shrink-0">기간(종료)</Label><Input type="date" value={filter.endDate} onChange={(e) => setFilter(p => ({...p, endDate: e.target.value}))} className="h-8 bg-slate-900 border-white/10 text-xs text-white [color-scheme:dark] flex-1" /></div>
                </div>
              </div>

              <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col min-h-0 shadow-2xl">
                <div className="flex-1 overflow-auto">
                  <div className="min-w-full inline-block align-middle">
                    <Table className="text-[11px] w-full">
                      <TableHeader className="bg-teal-700/90 sticky top-0 z-10 backdrop-blur-sm shadow-md">
                        <TableRow className="border-white/10 hover:bg-transparent">
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 w-20">수리번호</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 w-20">고장번호</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 w-24">장비번호</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 w-32">수리일시</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 min-w-[150px]">수리부품</TableHead>
                          <TableHead className="text-white text-center font-bold h-10 min-w-[200px]">수리내용</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {repairs.length > 0 ? repairs.map((item, idx) => (
                          <TableRow 
                            key={`${item.RepairNo}-${idx}`} 
                            className="border-white/5 hover:bg-teal-500/20 cursor-pointer h-10 transition-colors group" 
                            onClick={() => setRepairForm({ RepairNo: item.RepairNo, BreakdnNo: item.BreakdnNo, RobotNo: item.RobotNo, RepairDateTime: item.RepairDateTime, RepairPart: item.RepairPart, RepairCost: item.RepairCost || '', RepairDesc: item.RepairDesc || '' })}
                          >
                            <TableCell className="text-center text-white font-bold border-r border-white/5 py-2">{item.RepairNo}</TableCell>
                            <TableCell className="text-center text-slate-300 border-r border-white/5 py-2">{item.BreakdnNo}</TableCell>
                            <TableCell className="text-center text-slate-300 border-r border-white/5 py-2">{item.RobotNo}</TableCell>
                            <TableCell className="text-center text-slate-300 border-r border-white/5 py-2">{item.RepairDateTime}</TableCell>
                            <TableCell className="text-left text-slate-300 border-r border-white/5 px-3 py-2">{item.RepairPart}</TableCell>
                            <TableCell className="text-left text-slate-300 px-3 py-2">{item.RepairDesc}</TableCell>
                          </TableRow>
                        )) : (
                          <TableRow><TableCell colSpan={6} className="text-center py-20 text-slate-500 bg-slate-900/50">조회된 데이터가 없습니다.</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="bg-slate-800/80 px-4 py-2 border-t border-white/5 text-[10px] text-slate-400 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-4">
                    <span>Total: <span className="text-teal-400 font-bold">{repairs.length}</span> records</span>
                  </div>
                  {loading && <Loader2 className="w-3 h-3 text-teal-500 animate-spin" />}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
