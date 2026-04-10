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
import { Save, Trash2, Plus, Search, Loader2, RotateCcw } from "lucide-react";

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
  email: string | null;
  phoneNumber: string | null;
  accessLevel: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const initialFormState: Partial<User> = {
    employeeNumber: '',
    userName: '',
    companyName: 'HD현대미포',
    departName: '',
    jobGrade: '',
    accessLevel: 'Level1',
    email: '',
    phoneNumber: ''
  };

  const [userForm, setUserForm] = useState<Partial<User>>(initialFormState);

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
    setIsClient(true);
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setSelectedCompany('all');
    setSearchTerm('');
    handleNewUser();
  };

  const handleNewUser = () => {
    setUserForm(initialFormState);
    setIsEditMode(false);
  };

  const handleSaveUser = async () => {
    if (!userForm.employeeNumber || !userForm.userName) {
      alert('사번과 성명은 필수 입력 항목입니다.');
      return;
    }

    // 신규 등록 시에는 POST, 수정 시에는 PUT 사용
    // isEditMode 상태로 결정하거나, users 목록에 이미 존재하는지 체크
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        if (!isEditMode) handleNewUser(); // 등록 후 폼 초기화
        fetchUsers();
      } else {
        alert(result.error || '저장 실패');
      }
    } catch (error) {
      console.error('Failed to save user:', error);
      alert('서버 통신 오류가 발생했습니다.');
    }
  };

  const handleDeleteUser = async () => {
    if (!userForm.employeeNumber) {
      alert('삭제할 사용자를 선택해 주세요.');
      return;
    }

    if (!confirm(`사번 ${userForm.employeeNumber} (${userForm.userName}) 사용자를 정말로 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`/api/users?employeeNumber=${userForm.employeeNumber}`, {
        method: 'DELETE'
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        handleNewUser();
        fetchUsers();
      } else {
        alert(result.error || '삭제 실패');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('서버 통신 오류가 발생했습니다.');
    }
  };

  const handleRowClick = (user: User) => {
    setUserForm({
      ...user,
      departName: user.departName || '',
      jobGrade: user.jobGrade || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || ''
    });
    setIsEditMode(true);
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-medium text-white/50">기준정보관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">1-2 사용자관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-hidden flex flex-col min-h-0">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white tracking-tight">사용자관리</h2>
            {isEditMode && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">수정 모드</span>}
            {!isEditMode && userForm.employeeNumber && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">신규 작성 중</span>}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={fetchUsers}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> 새로고침
            </Button>
            <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={handleNewUser}>
              <Plus className="w-3.5 h-3.5 mr-1" /> 신규
            </Button>
            <Button size="sm" variant="secondary" className="bg-blue-600 hover:bg-blue-500 text-white border-none h-8 text-xs px-4" onClick={handleSaveUser}>
              <Save className="w-3.5 h-3.5 mr-1" /> 저장
            </Button>
            <Button size="sm" variant="secondary" className="bg-red-900/40 hover:bg-red-800 text-red-200 border border-red-500/30 h-8 text-xs px-4" onClick={handleDeleteUser}>
              <Trash2 className="w-3.5 h-3.5 mr-1" /> 삭제
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 shrink-0">
          <div className="bg-slate-800/40 border border-white/5 rounded-lg p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-blue-400">사용자 정보 입력/수정</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-slate-300">회사필터</Label>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger className="h-7 w-32 bg-slate-900 border-white/10 text-[11px] text-white">
                      <SelectValue placeholder="회사 선택" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="HD현대미포">HD현대미포</SelectItem>
                      <SelectItem value="에이스이앤티">에이스이앤티</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative w-48">
                  <Input 
                    className="h-7 bg-slate-900 border-white/10 text-[11px] pr-8 text-white" 
                    placeholder="사용자명/사번 검색..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchUsers()}
                  />
                  <Search className="absolute right-2 top-1.5 w-3.5 h-3.5 text-slate-500" />
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 text-[11px] px-4" onClick={fetchUsers}>조회</Button>
                <Button size="sm" variant="ghost" className="h-7 text-[11px] text-slate-400 px-2" onClick={handleReset}>초기화</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-slate-400 flex items-center gap-1">사번 (ID) <span className="text-red-500">*</span></Label>
                <Input name="employeeNumber" value={userForm.employeeNumber} onChange={handleInputChange} disabled={isEditMode} className={`h-8 bg-slate-900 border-white/10 text-xs text-white ${isEditMode ? 'opacity-50' : ''}`} placeholder="사번 입력" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-slate-400 flex items-center gap-1">성명 <span className="text-red-500">*</span></Label>
                <Input name="userName" value={userForm.userName} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="이름 입력" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-slate-400">회사명</Label>
                <Select value={userForm.companyName} onValueChange={(val) => setUserForm(p => ({...p, companyName: val}))}>
                  <SelectTrigger className="h-8 bg-slate-900 border-white/10 text-xs text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HD현대미포">HD현대미포</SelectItem>
                    <SelectItem value="에이스이앤티">에이스이앤티</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-slate-400">부서명</Label>
                <Input name="departName" value={userForm.departName || ''} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="부서 입력" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-slate-400">직급</Label>
                <Input name="jobGrade" value={userForm.jobGrade || ''} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="직급 입력" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-slate-400">권한레벨</Label>
                <Select value={userForm.accessLevel} onValueChange={(val) => setUserForm(p => ({...p, accessLevel: val}))}>
                  <SelectTrigger className="h-8 bg-slate-900 border-white/10 text-xs text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Level1">Level1</SelectItem>
                    <SelectItem value="Level2">Level2</SelectItem>
                    <SelectItem value="Level3">Level3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-slate-400">이메일</Label>
                <Input name="email" value={userForm.email || ''} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="email@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-slate-400">연락처</Label>
                <Input name="phoneNumber" value={userForm.phoneNumber || ''} onChange={handleInputChange} className="h-8 bg-slate-900 border-white/10 text-xs text-white" placeholder="010-0000-0000" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col min-h-0 shadow-2xl">
          <div className="flex-1 overflow-auto">
            <div className="min-w-full inline-block align-middle">
              <Table className="text-[11px]">
                <TableHeader className="bg-blue-600/90 sticky top-0 z-10 backdrop-blur-sm">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 w-12">No</TableHead>
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">사번</TableHead>
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">성명</TableHead>
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">회사명</TableHead>
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">부서명</TableHead>
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">직급</TableHead>
                    <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">권한</TableHead>
                    <TableHead className="text-white text-center font-bold h-10">이메일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={8} className="h-24 text-center"><Loader2 className="w-6 h-6 text-blue-500 animate-spin mx-auto" /></TableCell></TableRow>
                  ) : users.length > 0 ? (
                    users.map((user, i) => (
                      <TableRow 
                        key={user.employeeNumber} 
                        className={`border-white/5 hover:bg-blue-500/20 cursor-pointer h-10 transition-colors ${userForm.employeeNumber === user.employeeNumber ? 'bg-blue-500/30' : ''}`}
                        onClick={() => handleRowClick(user)}
                      >
                        <TableCell className="text-center text-slate-400 border-r border-white/5 py-2">{i + 1}</TableCell>
                        <TableCell className="text-center text-white font-bold border-r border-white/5 py-2">{user.employeeNumber}</TableCell>
                        <TableCell className="text-center text-white border-r border-white/5 py-2">{user.userName}</TableCell>
                        <TableCell className="text-center text-slate-300 border-r border-white/5 py-2">{user.companyName}</TableCell>
                        <TableCell className="text-center text-slate-300 border-r border-white/5 py-2">{user.departName || '-'}</TableCell>
                        <TableCell className="text-center text-slate-300 border-r border-white/5 py-2">{user.jobGrade || '-'}</TableCell>
                        <TableCell className="text-center border-r border-white/5 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            user.accessLevel === 'Admin' ? 'bg-red-500/20 text-red-400' : 
                            user.accessLevel === 'Level3' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {user.accessLevel}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-slate-300 py-2">{user.email || '-'}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-20 text-slate-500 bg-slate-900/50">조회된 데이터가 없습니다.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="bg-slate-800/80 px-4 py-2 border-t border-white/5 text-[10px] text-slate-400 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <span>Total: <span className="text-blue-400 font-bold">{users.length}</span> users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
