
'use client';

import React from 'react';
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
import { Download, Save, Trash2, Plus, Search } from "lucide-react";

const USERS = [
  { id: 'admin', name: '관리자', dept: 'IT지원팀', role: '시스템관리자', status: '재직', email: 'admin@example.com' },
  { id: 'hgd01', name: '홍길동', dept: '생산1팀', role: '현장작업자', status: '재직', email: 'hgd@example.com' },
  { id: 'ksu02', name: '김철수', dept: '생산2팀', role: '현장작업자', status: '재직', email: 'ksu@example.com' },
  { id: 'yhi03', name: '이영희', dept: '품질관리팀', role: '검수자', status: '재직', email: 'yhi@example.com' },
];

export default function UserManagementPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 노란색 상단 상태바 */}
      <div className="bg-yellow-500 px-4 py-1.5 flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-900">기준정보관리 [1-2 사용자관리]</span>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-hidden flex flex-col">
        {/* 헤더 및 버튼 영역 */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">사용자관리</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Plus className="w-3.5 h-3.5 mr-1" /> 신규
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Save className="w-3.5 h-3.5 mr-1" /> 저장
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> 삭제
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
              <Download className="w-3.5 h-3.5 mr-1" /> 다운로드
            </Button>
          </div>
        </div>

        {/* 검색 필터 영역 */}
        <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-xs text-slate-300 w-16 shrink-0">부서</Label>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-40 bg-slate-900 border-white/10 text-xs">
                <SelectValue placeholder="부서 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="it">IT지원팀</SelectItem>
                <SelectItem value="p1">생산1팀</SelectItem>
                <SelectItem value="p2">생산2팀</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <Label className="text-xs text-slate-300 w-16 shrink-0">사용자명</Label>
            <div className="relative flex-1">
              <Input className="h-8 bg-slate-900 border-white/10 text-xs pr-8" placeholder="검색어 입력..." />
              <Search className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 text-xs px-6">조회</Button>
        </div>

        {/* 사용자 목록 테이블 */}
        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col">
          <div className="flex-1 overflow-auto">
            <Table className="text-[11px]">
              <TableHeader className="bg-blue-600 sticky top-0 z-10">
                <TableRow className="border-white/10 hover:bg-blue-600">
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10 w-12">No</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">아이디</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">성명</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">부서</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">권한</TableHead>
                  <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">상태</TableHead>
                  <TableHead className="text-white text-center font-bold h-9">이메일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.map((user, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-blue-500/20 cursor-pointer">
                    <TableCell className="text-center text-slate-400 border-r border-white/5">{i + 1}</TableCell>
                    <TableCell className="text-center text-white font-bold border-r border-white/5">{user.id}</TableCell>
                    <TableCell className="text-center text-white border-r border-white/5">{user.name}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{user.dept}</TableCell>
                    <TableCell className="text-center text-slate-300 border-r border-white/5">{user.role}</TableCell>
                    <TableCell className="text-center border-r border-white/5">
                      <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-[10px]">{user.status}</span>
                    </TableCell>
                    <TableCell className="text-center text-slate-300">{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="bg-slate-800 p-2 flex justify-center border-t border-white/5">
            <div className="w-6 h-6 bg-teal-600 flex items-center justify-center text-[10px] text-white rounded">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
