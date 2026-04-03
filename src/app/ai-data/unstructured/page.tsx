'use client';

import React, { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Plus, FileText, ExternalLink, Download } from "lucide-react";

const UNSTRUCTURED_DATA = [
  { id: 'DOC-001', title: '용접 표준 절차서(WPS)', type: 'PDF', size: '2.4MB', date: '2025-01-10', author: '강감찬' },
  { id: 'DOC-002', title: '로봇 암 경로 최적화 로그', type: 'TXT', size: '1.1MB', date: '2025-01-12', author: '김유신' },
  { id: 'DOC-003', title: '열변형 시뮬레이션 결과 리포트', type: 'DOCX', size: '4.5MB', date: '2025-01-15', author: '을지문덕' },
  { id: 'DOC-004', title: 'AI 모델 학습용 용접 파형 데이터', type: 'CSV', size: '15.8MB', date: '2025-01-18', author: '이순신', hasModal: true },
  { id: 'DOC-005', title: '장비 유지보수 매뉴얼 v2.0', type: 'PDF', size: '8.2MB', date: '2025-01-20', author: '장보고' },
];

export default function UnstructuredDataPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const handleOpenModal = (item: any) => {
    setSelectedData(item);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">인공지능 데이터 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">3-4 비정형 데이터 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">비정형 데이터 관리</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4">
              <Plus className="w-3.5 h-3.5 mr-1" /> 업로드
            </Button>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <Label className="text-xs text-slate-300 w-16 shrink-0">데이터 검색</Label>
            <div className="relative flex-1">
              <Input className="h-8 bg-slate-900 border-white/10 text-xs pr-8" placeholder="제목 또는 작성자 검색..." />
              <Search className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>
          <Button size="sm" className="bg-blue-600 h-8 text-xs px-6">조회</Button>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">ID</TableHead>
                <TableHead className="text-white text-center font-bold h-9">제목</TableHead>
                <TableHead className="text-white text-center font-bold h-9">유형</TableHead>
                <TableHead className="text-white text-center font-bold h-9">용량</TableHead>
                <TableHead className="text-white text-center font-bold h-9">작성일</TableHead>
                <TableHead className="text-white text-center font-bold h-9">작성자</TableHead>
                <TableHead className="text-white text-center font-bold h-9">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {UNSTRUCTURED_DATA.map((item, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-blue-500/20">
                  <TableCell className="text-center text-slate-400">{item.id}</TableCell>
                  <TableCell className="text-left text-white font-medium pl-4">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-blue-400" />
                      {item.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-slate-300">{item.type}</TableCell>
                  <TableCell className="text-center text-slate-300">{item.size}</TableCell>
                  <TableCell className="text-center text-slate-300">{item.date}</TableCell>
                  <TableCell className="text-center text-slate-300">{item.author}</TableCell>
                  <TableCell className="text-center">
                    {item.hasModal ? (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-[10px] text-accent hover:text-accent hover:bg-accent/10"
                        onClick={() => handleOpenModal(item)}
                      >
                        <ExternalLink size={12} className="mr-1" /> 상세보기
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="h-7 text-[10px] text-slate-400">
                        <Download size={12} className="mr-1" /> 다운로드
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 상세 보기 모달 (3-4 요구사항) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="text-blue-400" />
              데이터 상세 정보
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedData?.title}에 대한 AI 분석 및 원천 데이터 정보입니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">데이터 ID</p>
              <p className="text-sm font-mono text-blue-300">{selectedData?.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">포맷 / 용량</p>
              <p className="text-sm">{selectedData?.type} / {selectedData?.size}</p>
            </div>
            <div className="col-span-2 space-y-1">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">분석 요약</p>
              <div className="bg-slate-800 p-3 rounded text-xs text-slate-300 leading-relaxed border border-white/5">
                해당 CSV 데이터는 2025년 1월 18일 용접 자동화 라인 6호기에서 수집된 파형 데이터입니다. 
                AI 모델 학습을 위해 전처리가 완료되었으며, 주요 특징점으로 전압 변동성(Voltage Variance) 수치가 포함되어 있습니다.
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="bg-slate-700 text-white hover:bg-slate-600">닫기</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">분석 리포트 다운로드</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
