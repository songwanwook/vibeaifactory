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
import { Brain, Activity, ShieldAlert, Users } from "lucide-react";

const CONTEXT_DATA = [
  { id: 'CX-001', event: '작업자 접근 감지', priority: 'HIGH', status: '차단됨', time: '14:05:22', model: 'Safety-v2' },
  { id: 'CX-002', event: '이상 고열 발생', priority: 'CRITICAL', status: '알람발송', time: '13:58:10', model: 'Thermal-v1' },
  { id: 'CX-003', event: '조도 부족', priority: 'LOW', status: '조정권고', time: '13:45:00', model: 'Context-v3' },
  { id: 'CX-004', event: '용접 흄 농도 상승', priority: 'MEDIUM', status: '환기작동', time: '13:30:15', model: 'Gas-v2' },
];

export default function ContextModelPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">인공지능 데이터 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">3-5 상황인지 모델 데이터</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={20} className="text-accent" />
            <h2 className="text-xl font-bold text-white tracking-tight">상황인지 AI 분석 로그</h2>
          </div>
          <Button size="sm" className="bg-blue-600 h-8 text-xs">모델 대시보드</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '활동 모델', value: '12개', icon: Brain, color: 'text-blue-400' },
            { label: '금일 탐지', value: '458건', icon: Activity, color: 'text-green-400' },
            { label: '위험 경보', value: '3건', icon: ShieldAlert, color: 'text-red-400' },
            { label: '감지 인원', value: '24명', icon: Users, color: 'text-yellow-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-white/5 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{stat.label}</p>
                <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <stat.icon className={stat.color} size={24} />
            </div>
          ))}
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900">
          <Table className="text-[11px]">
            <TableHeader className="bg-blue-600 sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-blue-600">
                <TableHead className="text-white text-center font-bold h-9">이벤트 ID</TableHead>
                <TableHead className="text-white text-center font-bold h-9">탐지 상황</TableHead>
                <TableHead className="text-white text-center font-bold h-9">중요도</TableHead>
                <TableHead className="text-white text-center font-bold h-9">조치 상태</TableHead>
                <TableHead className="text-white text-center font-bold h-9">발생 시간</TableHead>
                <TableHead className="text-white text-center font-bold h-9">분석 모델</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CONTEXT_DATA.map((item, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-blue-500/20">
                  <TableCell className="text-center text-slate-400">{item.id}</TableCell>
                  <TableCell className="text-left text-white px-4 font-medium">{item.event}</TableCell>
                  <TableCell className="text-center font-bold">
                    <span className={
                      item.priority === 'CRITICAL' ? 'text-red-500' : 
                      item.priority === 'HIGH' ? 'text-orange-400' : 'text-slate-400'
                    }>{item.priority}</span>
                  </TableCell>
                  <TableCell className="text-center text-slate-300">{item.status}</TableCell>
                  <TableCell className="text-center text-slate-400 font-mono">{item.time}</TableCell>
                  <TableCell className="text-center text-accent">{item.model}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}