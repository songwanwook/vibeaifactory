'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Loader2, Image as ImageIcon, AlertTriangle, MapPin, Calendar, User, Info } from "lucide-react";

interface AbnPict {
  ErrNum: number;
  ErrDate: string;
  ProjNo: string;
  BlockName: string;
  RobotNo: string;
  ErrInfo: string;
  LocationMM: number;
  LocationX: number;
  LocationY: number;
  Action: string;
}

export default function UnstructuredDataPage() {
  const [data, setData] = useState<AbnPict[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AbnPict | null>(null);
  
  const [filter, setFilter] = useState({
    projNo: '',
    blockName: '',
    robotNo: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.projNo) params.append('projNo', filter.projNo);
      if (filter.blockName) params.append('blockName', filter.blockName);
      if (filter.robotNo) params.append('robotNo', filter.robotNo);

      const res = await fetch(`/api/abn-picts?${params.toString()}`);
      const result = await res.json();
      if (Array.isArray(result)) {
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch abn picts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDetail = (item: AbnPict) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">인공지능 데이터 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">3-4 비정형 데이터(용접불량 이미지) 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">비정형 데이터 관리 <span className="text-sm font-normal text-slate-500 ml-2">용접 불량 이미지 분석</span></h2>
          <div className="flex items-center gap-2">
             <span className="text-[11px] text-slate-400 mr-2">Total: <b className="text-blue-400">{data.length}</b> images</span>
          </div>
        </div>

        {/* 검색 필터 */}
        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 grid grid-cols-4 gap-4 items-end">
          <div className="space-y-1.5">
            <Label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider ml-1">호선번호</Label>
            <Input 
              value={filter.projNo} 
              onChange={(e) => setFilter(prev => ({...prev, projNo: e.target.value}))}
              className="h-8 bg-slate-900 border-white/10 text-xs text-white" 
              placeholder="예: 843206"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider ml-1">블록명</Label>
            <Input 
              value={filter.blockName} 
              onChange={(e) => setFilter(prev => ({...prev, blockName: e.target.value}))}
              className="h-8 bg-slate-900 border-white/10 text-xs text-white" 
              placeholder="예: B13P"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider ml-1">로봇번호</Label>
            <Input 
              value={filter.robotNo} 
              onChange={(e) => setFilter(prev => ({...prev, robotNo: e.target.value}))}
              className="h-8 bg-slate-900 border-white/10 text-xs text-white" 
              placeholder="예: 1호기"
            />
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 text-xs font-bold" onClick={fetchData}>
            <Search className="w-3.5 h-3.5 mr-1.5" /> 조회 및 분석
          </Button>
        </div>

        {/* 이미지 그리드 영역 */}
        <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {data.map((item) => (
                <div 
                  key={item.ErrNum} 
                  className="group bg-slate-900 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300"
                  onClick={() => handleOpenDetail(item)}
                >
                  {/* 이미지 썸네일 (Placeholder) */}
                  <div className="aspect-[4/3] bg-slate-800 relative flex items-center justify-center overflow-hidden">
                    {/* 실제 이미지가 없으므로 스타일링된 플레이스홀더 사용 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                    <ImageIcon className="w-10 h-10 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* 오버레이 정보 */}
                    <div className="absolute top-2 right-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        item.Action === '완료' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {item.Action}
                      </span>
                    </div>
                    
                    {/* 하단 에러 텍스트 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-[10px] text-white font-medium truncate">{item.ErrInfo}</p>
                    </div>
                  </div>
                  
                  {/* 카드 정보 */}
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-blue-400">#ERR-{item.ErrNum}</span>
                      <span className="text-[10px] text-slate-500">{item.ErrDate}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-white">
                        <span className="text-slate-500 w-12 shrink-0">호선/블록</span>
                        <span>{item.ProjNo} / {item.BlockName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-white">
                        <span className="text-slate-500 w-12 shrink-0">로봇번호</span>
                        <span className="text-teal-400 font-medium">{item.RobotNo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && data.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-2">
              <AlertTriangle className="w-10 h-10 text-slate-700" />
              <p className="text-sm">조회된 불량 데이터가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 상세 정보 모달 */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-950 border border-white/10 text-white max-w-3xl overflow-hidden p-0 gap-0">
          <div className="grid grid-cols-[1fr_300px] h-[500px]">
            {/* 왼쪽: 이미지 확대 영역 */}
            <div className="bg-black flex flex-col">
              <div className="flex-1 relative flex items-center justify-center bg-[#050505]">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                   <div className="w-full h-full border-[0.5px] border-white/5 grid grid-cols-8 grid-rows-8" />
                </div>
                <div className="z-10 flex flex-col items-center">
                  <AlertTriangle className="w-16 h-16 text-red-500/50 mb-4" />
                  <p className="text-xs text-slate-500 font-mono tracking-widest">WELDING DEFECT CAPTURE</p>
                </div>
                
                {/* 좌표 오버레이 가이드 */}
                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-teal-500 flex gap-4">
                  <span>X: {selectedItem?.LocationX}</span>
                  <span>Y: {selectedItem?.LocationY}</span>
                  <span>POS: {selectedItem?.LocationMM}mm</span>
                </div>
              </div>
              <div className="h-12 bg-slate-900 border-t border-white/5 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-300">
                  <ImageIcon size={14} className="text-blue-400" />
                  용접비드 이미지 분석 결과
                </div>
                <span className="text-[10px] text-slate-500 italic">Analysis confidence: 98.2%</span>
              </div>
            </div>

            {/* 오른쪽: 상세 정보 텍스트 */}
            <div className="p-6 border-l border-white/10 flex flex-col space-y-6">
              <DialogHeader className="space-y-4 text-left">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg w-fit">
                  <AlertTriangle size={16} className="text-red-400" />
                  <span className="text-sm font-bold text-red-400">결함 감지됨</span>
                </div>
                
                <DialogTitle className="text-lg font-bold text-white leading-tight">
                  {selectedItem?.ErrInfo}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  용접 불량 상세 정보 및 분석 결과 화면입니다.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar size={14} className="text-slate-500 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">발생 일시</p>
                      <p className="text-sm text-slate-300">{selectedItem?.ErrDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="text-slate-500 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">호선 / 블록</p>
                      <p className="text-sm text-slate-300">{selectedItem?.ProjNo} / {selectedItem?.BlockName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User size={14} className="text-slate-500 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">담당 로봇</p>
                      <p className="text-sm text-teal-400 font-bold">{selectedItem?.RobotNo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info size={14} className="text-slate-500 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">조치 상태</p>
                      <span className={`text-[11px] px-2 py-0.5 rounded-md font-bold mt-1 inline-block ${
                        selectedItem?.Action === '완료' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedItem?.Action}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-10" onClick={() => setIsModalOpen(false)}>
                  확인 완료
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
