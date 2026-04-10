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
import { Search, Plus, Save, Trash2, Loader2 } from "lucide-react";

interface Robot {
  RobotNo: string;
  RobotName: string;
  Maker: string;
  ModelName: string;
  SerialNo: string;
  Weight: string;
  PurchDate: string;
  InspectDate: string | null;
  MaintPeriod: string | null;
}

export default function AssetInventoryPage() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    RobotNo: '',
    RobotName: '',
    Maker: '',
    ModelName: '',
    SerialNo: '',
    Weight: '',
    PurchDate: '',
    InspectDate: '',
    MaintPeriod: ''
  });

  const fetchRobots = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/robots');
      const data = await res.json();
      if (Array.isArray(data)) {
        setRobots(data);
      }
    } catch (error) {
      console.error('Failed to fetch robots:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRobots();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, MaintPeriod: value }));
  };

  const handleNew = async () => {
    // 점검주기(MaintPeriod)를 제외한 모든 창이 제대로 안 채워져 있으면 항목을 모두 입력하라고 알림
    const requiredFields = [
      'RobotNo', 'RobotName', 'Maker', 'ModelName', 
      'SerialNo', 'Weight', 'PurchDate'
    ];

    const isAllFilled = requiredFields.every(field => formData[field as keyof typeof formData]?.trim() !== '');

    if (!isAllFilled) {
      alert('항목을 모두 입력해 주세요.');
      return;
    }

    try {
      const res = await fetch('/api/robots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // MaintPeriod에 '개월' 접미사 붙여서 저장 (DB 스타일 유지)
          MaintPeriod: formData.MaintPeriod ? `${formData.MaintPeriod}개월` : null
        })
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || '등록 중 오류가 발생했습니다.');
        return;
      }

      alert('성공적으로 등록되었습니다.');
      // 폼 초기화 및 새로고침
      setFormData({
        RobotNo: '',
        RobotName: '',
        Maker: '',
        ModelName: '',
        SerialNo: '',
        Weight: '',
        PurchDate: '',
        InspectDate: '',
        MaintPeriod: ''
      });
      fetchRobots();
    } catch (error) {
      console.error('Failed to register robot:', error);
      alert('등록 중 서버 오류가 발생했습니다.');
    }
  };

  const handleSave = async () => {
    // 필수 항목 체크 (신규와 동일한 기준)
    const requiredFields = [
      'RobotNo', 'RobotName', 'Maker', 'ModelName', 
      'SerialNo', 'Weight', 'PurchDate'
    ];

    const isAllFilled = requiredFields.every(field => formData[field as keyof typeof formData]?.trim() !== '');

    if (!isAllFilled) {
      alert('항목을 모두 입력해 주세요.');
      return;
    }

    try {
      const res = await fetch('/api/robots', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // MaintPeriod 처리 (입력값에 '개월'이 이미 붙어있을 수 있으므로 체크)
          MaintPeriod: formData.MaintPeriod 
            ? (formData.MaintPeriod.toString().includes('개월') ? formData.MaintPeriod : `${formData.MaintPeriod}개월`) 
            : null
        })
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || '수정 중 오류가 발생했습니다.');
        return;
      }

      alert('성공적으로 수정되었습니다.');
      fetchRobots();
    } catch (error) {
      console.error('Failed to update robot:', error);
      alert('수정 중 서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">자동화 장비 자산 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">2-1 자동화 장비 자산 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        {/* 헤더 및 버튼 */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">용접협동 로봇 관리</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={fetchRobots}>
              <Search className="w-3.5 h-3.5 mr-1" /> 검색
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={handleNew}>
              <Plus className="w-3.5 h-3.5 mr-1" /> 신규
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={handleSave}>
              <Save className="w-3.5 h-3.5 mr-1" /> 저장
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> 삭제
            </Button>
          </div>
        </div>

        {/* 상세 입력 폼 (민트 스타일) */}
        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 grid grid-cols-4 gap-y-4 gap-x-8">
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">장비번호</Label>
            <Input 
              name="RobotNo"
              value={formData.RobotNo}
              onChange={handleInputChange}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" 
              placeholder="예: 12호기"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">장비명</Label>
            <Input 
              name="RobotName"
              value={formData.RobotName}
              onChange={handleInputChange}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" 
              placeholder="예: 로봇 12"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">Maker</Label>
            <Input 
              name="Maker"
              value={formData.Maker}
              onChange={handleInputChange}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" 
              placeholder="제조사 입력"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">모델명</Label>
            <Input 
              name="ModelName"
              value={formData.ModelName}
              onChange={handleInputChange}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" 
              placeholder="모델명 입력"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">도입일자</Label>
            <Input 
              name="PurchDate"
              type="date" 
              value={formData.PurchDate}
              onChange={handleInputChange}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs [color-scheme:dark]" 
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">점검일자</Label>
            <Input 
              name="InspectDate"
              type="date" 
              value={formData.InspectDate}
              onChange={handleInputChange}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs [color-scheme:dark]" 
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">시리얼 No.</Label>
            <Input 
              name="SerialNo"
              value={formData.SerialNo}
              onChange={handleInputChange}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" 
              placeholder="시리얼 번호"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">중량(kg)</Label>
            <Input 
              name="Weight"
              value={formData.Weight}
              onChange={handleInputChange}
              className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs" 
              placeholder="예: 15.5kg"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-20 shrink-0">점검주기</Label>
            <Select onValueChange={handleSelectChange} value={formData.MaintPeriod}>
              <SelectTrigger className="h-8 bg-cyan-400/20 border-cyan-400/30 text-cyan-50 text-xs">
                <SelectValue placeholder="주기 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1개월</SelectItem>
                <SelectItem value="3">3개월</SelectItem>
                <SelectItem value="6">6개월</SelectItem>
                <SelectItem value="12">12개월</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 테이블 영역 */}
        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              </div>
            ) : (
              <Table className="text-[11px]">
                <TableHeader className="bg-blue-600 sticky top-0 z-10">
                  <TableRow className="border-white/10 hover:bg-blue-600">
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">장비번호</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">장비명</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">Maker</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">모델명</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">시리얼 No.</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">중량(kg)</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">도입일자</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">점검일자</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">점검주기</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {robots.map((robot, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-blue-500/20 cursor-pointer" onClick={() => {
                      setFormData({
                        RobotNo: robot.RobotNo,
                        RobotName: robot.RobotName,
                        Maker: robot.Maker,
                        ModelName: robot.ModelName,
                        SerialNo: robot.SerialNo,
                        Weight: robot.Weight,
                        PurchDate: robot.PurchDate,
                        InspectDate: robot.InspectDate || '',
                        MaintPeriod: robot.MaintPeriod?.replace('개월', '') || ''
                      });
                    }}>
                      <TableCell className="text-center text-white font-bold border-r border-white/5">{robot.RobotNo}</TableCell>
                      <TableCell className="text-center text-white border-r border-white/5">{robot.RobotName}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{robot.Maker}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{robot.ModelName}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{robot.SerialNo}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{robot.Weight}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{robot.PurchDate}</TableCell>
                      <TableCell className="text-center text-slate-300 border-r border-white/5">{robot.InspectDate}</TableCell>
                      <TableCell className="text-center text-slate-300">{robot.MaintPeriod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="bg-slate-800 p-2 flex justify-center border-t border-white/5">
            <div className="w-6 h-6 bg-teal-600 flex items-center justify-center text-[10px] text-white rounded">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
