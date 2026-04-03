'use client';

import React from 'react';
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
import { Video, Play, Download, Search } from "lucide-react";
import Image from "next/image";

const VIDEO_DATA = [
  { id: 'CAM-01', channel: 'CH 01', name: '용접 6호기 정면', status: '녹화중', size: '1.2GB', date: '2025-03-26' },
  { id: 'CAM-02', channel: 'CH 02', name: '용접 6호기 측면', status: '녹화중', size: '1.1GB', date: '2025-03-26' },
  { id: 'CAM-03', channel: 'CH 03', name: '블록 반입구', status: '대기', size: '850MB', date: '2025-03-26' },
  { id: 'CAM-04', channel: 'CH 04', name: '안전 구역 A', status: '녹화중', size: '2.4GB', date: '2025-03-26' },
];

export default function VideoDataPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">인공지능 데이터 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">3-3 영상 데이터 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video size={20} className="text-primary" />
            <h2 className="text-xl font-bold text-white tracking-tight">CCTV 및 Vision 영상 관리</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs px-4">라이브 뷰</Button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_400px] gap-4 flex-1 overflow-hidden">
          <div className="flex flex-col space-y-4">
            <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 flex items-center gap-4">
              <Label className="text-xs text-slate-300 w-16">채널검색</Label>
              <Input className="h-8 bg-slate-900 border-white/10 text-xs max-w-xs" placeholder="카메라 명칭 입력" />
              <Button size="sm" className="bg-blue-600 h-8 text-xs px-6">검색</Button>
            </div>

            <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900">
              <Table className="text-[11px]">
                <TableHeader className="bg-blue-600 sticky top-0 z-10">
                  <TableRow className="border-white/10 hover:bg-blue-600">
                    <TableHead className="text-white text-center font-bold h-9">ID</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">채널</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">카메라 명칭</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">상태</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">파일용량</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {VIDEO_DATA.map((item, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-blue-500/20 cursor-pointer">
                      <TableCell className="text-center text-slate-400">{item.id}</TableCell>
                      <TableCell className="text-center text-white font-bold">{item.channel}</TableCell>
                      <TableCell className="text-left text-white px-4">{item.name}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                          item.status === '녹화중' ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-slate-300">{item.size}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="ghost" className="h-6 w-6 text-blue-400"><Play size={14} /></Button>
                          <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400"><Download size={14} /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-lg p-4 flex flex-col space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preview (CH 01)</h3>
            <div className="relative aspect-video w-full bg-black rounded-md overflow-hidden border border-white/10">
              <Image 
                src="https://picsum.photos/seed/video1/600/400" 
                alt="Video Preview" 
                fill 
                className="object-cover opacity-80"
                data-ai-hint="industrial surveillance"
              />
              <div className="absolute top-2 left-2 bg-red-600 px-1.5 py-0.5 rounded text-[9px] font-bold text-white flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> REC
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] text-white/70 font-mono bg-black/50 px-2 py-1 rounded">
                2025-03-26 14:15:32
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">카메라 모델</span>
                <span className="text-slate-300">HikVision Pro AI v4</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">해상도</span>
                <span className="text-slate-300">3840 x 2160 (4K)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">저장소 위치</span>
                <span className="text-slate-300">NAS-01 / VOLUME_WELD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}