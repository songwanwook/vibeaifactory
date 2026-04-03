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
import { Activity, Settings, RefreshCw, AlertCircle } from "lucide-react";

const MOTION_DATA = [
  { robot: 'RB3-01', axis: 'J1-J6', speed: '95%', torque: '42Nm', status: '최적화', date: '2025-03-26 14:00' },
  { robot: 'RB3-02', axis: 'J1-J6', speed: '88%', torque: '38Nm', status: '정상', date: '2025-03-26 13:55' },
  { robot: 'UR20-01', axis: 'J1-J6', speed: '100%', torque: '55Nm', status: '최적화', date: '2025-03-26 14:05' },
  { robot: 'UR3-04', axis: 'J1-J6', speed: '75%', torque: '12Nm', status: '보정필요', date: '2025-03-26 13:30' },
];

export default function RobotMotionPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">인공지능 데이터 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">3-7 협동로봇 모션제어 모델</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-yellow-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">로봇 모션 제어 최적화 데이터</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 text-white h-8 text-xs">실시간 모션 뷰어</Button>
            <Button size="sm" className="bg-blue-600 h-8 text-xs"><RefreshCw className="mr-1 h-3 w-3" /> 파라미터 업데이트</Button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
            <div className="bg-slate-800 px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">모션 제어 로그</span>
              <span className="text-[10px] text-green-400">Connected</span>
            </div>
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-600 sticky top-0 z-10">
                <TableRow className="border-white/10 hover:bg-blue-600">
                  <TableHead className="text-white text-center font-bold h-9">로봇ID</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">가동속도</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">최대토크</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOTION_DATA.map((item, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-blue-500/20">
                    <TableCell className="text-center text-white font-bold">{item.robot}</TableCell>
                    <TableCell className="text-center text-slate-300">{item.speed}</TableCell>
                    <TableCell className="text-center text-slate-300">{item.torque}</TableCell>
                    <TableCell className="text-center">
                      <span className={item.status === '최적화' ? 'text-blue-400' : item.status === '보정필요' ? 'text-yellow-400' : 'text-slate-400'}>
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-lg p-6 flex flex-col justify-center items-center space-y-4">
            <div className="relative w-48 h-48 rounded-full border-4 border-slate-800 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <div className="text-center">
                <p className="text-3xl font-bold text-white">94%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">제어 정밀도</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 w-full">
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">경로 오차율</p>
                <p className="text-lg font-bold text-green-400">0.05mm</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">충돌 회피율</p>
                <p className="text-lg font-bold text-blue-400">100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}