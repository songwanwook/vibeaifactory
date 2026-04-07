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
import { Download, Save, Trash2, Plus, Search, Loader2, RotateCcw } from "lucide-react";

interface User {
  employeeNumber: string;
  userName: string;
  companyName: string;
  departName: string | null;
  sectionName: string | null;
  teamName: string | null;
  className: string | null;
  hireDate: string | null;
  position: string | null;
  jobGrade: string | null;
  email: string;
  phoneNumber: string;
  accessLevel: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/users', window.location.origin);
      if (selectedCompany !== 'all') {
        url.searchParams.append('company', selectedCompany);
      }
      if (searchTerm) {
        url.searchParams.append('search', searchTerm);
      }
      
      const response = await fetch(url.toString());
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleReset = () => {
    setSelectedCompany('all');
    setSearchTerm('');
    // fetchUsers will be called by the useEffect if we add dependencies, 
    // but here we can just call it directly after state update if we want.
    // However, since state update is async, better to fetch with initial values.
  };

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 영역 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">기준정보관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">1-2 사용자관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col">
        {/* 헤더 및 버튼 영역 */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">사용자관리 (DB 연동)</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={fetchUsers}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> 새로고침
            </Button>
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
            <Label className="text-xs text-slate-300 w-16 shrink-0">회사명</Label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="h-8 w-48 bg-slate-900 border-white/10 text-xs text-white">
                <SelectValue placeholder="회사 선택" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectItem value="all">전체 (All)</SelectItem>
                <SelectItem value="HD현대미포">HD현대미포</SelectItem>
                <SelectItem value="에이스이앤티">에이스이앤티</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <Label className="text-xs text-slate-300 w-16 shrink-0">사용자명</Label>
            <div className="relative flex-1">
              <Input 
                className="h-8 bg-slate-900 border-white/10 text-xs pr-8 text-white" 
                placeholder="성명 또는 사번 검색..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchUsers()}
              />
              <Search className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 text-xs px-6" onClick={fetchUsers}>조회</Button>
          <Button size="sm" variant="ghost" className="h-8 text-xs text-slate-400 hover:text-white" onClick={handleReset}>초기화</Button>
        </div>

        {/* 사용자 목록 테이블 */}
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
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10 w-12">No</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">사번</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">성명</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">회사명</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">부서명</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">직급</TableHead>
                    <TableHead className="text-white text-center font-bold h-9 border-r border-white/10">권한</TableHead>
                    <TableHead className="text-white text-center font-bold h-9">이메일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user, i) => (
                      <TableRow key={user.employeeNumber} className="border-white/5 hover:bg-blue-500/20 cursor-pointer">
                        <TableCell className="text-center text-slate-400 border-r border-white/5">{i + 1}</TableCell>
                        <TableCell className="text-center text-white font-bold border-r border-white/5">{user.employeeNumber}</TableCell>
                        <TableCell className="text-center text-white border-r border-white/5">{user.userName}</TableCell>
                        <TableCell className="text-center text-slate-300 border-r border-white/5">{user.companyName}</TableCell>
                        <TableCell className="text-center text-slate-300 border-r border-white/5">{user.departName || '-'}</TableCell>
                        <TableCell className="text-center text-slate-300 border-r border-white/5">{user.jobGrade || '-'}</TableCell>
                        <TableCell className="text-center border-r border-white/5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            user.accessLevel === 'Admin' ? 'bg-red-500/20 text-red-400' : 
                            user.accessLevel === 'Level3' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {user.accessLevel}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-slate-300">{user.email || '-'}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-slate-500 h-20">데이터가 없습니다.</TableCell>
                    </TableRow>
                  )}
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
