'use client';

import React, { useEffect, useState } from 'react';
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
import { Download, Save, Trash2, Plus, Search, Loader2, RotateCcw, ChevronRight, List } from "lucide-react";

interface Code {
  codeId: string;
  codeType: string;
  groupName: string;
  groupCode: string;
  codeName: string;
  remarks1: string;
  remarks2: string;
}

interface CodeGroup {
  groupName: string;
  groupCode: string;
  count: number;
}

export default function CodeManagementPage() {
  const [allCodes, setAllCodes] = useState<Code[]>([]);
  const [groups, setGroups] = useState<CodeGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both in parallel
      const [codesRes, groupsRes] = await Promise.all([
        fetch('/api/codes'),
        fetch('/api/codes/groups')
      ]);
      
      const codesData = await codesRes.json();
      const groupsData = await groupsRes.json();

      if (Array.isArray(codesData)) {
        setAllCodes(codesData);
      }
      
      if (Array.isArray(groupsData)) {
        setGroups(groupsData);
        // 기본으로 첫 번째 그룹 선택 (groupCode 기준)
        if (groupsData.length > 0 && !selectedGroup) {
          setSelectedGroup(groupsData[0].groupCode);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCodes = allCodes.filter(code => {
    const matchesGroup = selectedGroup ? code.groupCode === selectedGroup : true;
    const matchesSearch = searchTerm 
      ? code.codeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        code.groupName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesGroup && matchesSearch;
  });

  const selectedGroupData = groups.find(g => g.groupCode === selectedGroup);

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      {/* 상단 브레드크럼 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">기준정보관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">1-1 공통코드관리</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽: 코드 그룹 목록 (Master) */}
        <div className="w-64 border-r border-white/10 bg-slate-900/50 flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <List className="w-4 h-4 text-blue-400" /> 코드 그룹
            </h3>
            <span className="text-[10px] text-slate-500">{groups.length} Groups</span>
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-1">
            {groups.map((group) => (
              <div
                key={group.groupCode}
                onClick={() => setSelectedGroup(group.groupCode)}
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                  selectedGroup === group.groupCode
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium">{group.groupName}</span>
                  <span className={`text-[10px] ${selectedGroup === group.groupCode ? 'text-blue-100' : 'text-slate-600'}`}>
                    {group.groupCode}
                  </span>
                </div>
                {selectedGroup === group.groupCode && <ChevronRight className="w-4 h-4" />}
                {selectedGroup !== group.groupCode && (
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                    {group.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 상세 코드 목록 (Detail) */}
        <div className="flex-1 flex flex-col bg-[#0f172a] p-6 space-y-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {selectedGroupData?.groupName || '코드 관리'} <span className="text-sm font-normal text-slate-500 ml-2">상세 내역</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4" onClick={fetchData}>
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> 새로고침
              </Button>
              <Button size="sm" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white border-none h-8 text-xs px-4">
                <Plus className="w-3.5 h-3.5 mr-1" /> 신규
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 text-xs px-6">
                <Save className="w-3.5 h-3.5 mr-1" /> 전체 저장
              </Button>
            </div>
          </div>

          {/* 필터 및 검색 */}
          <div className="bg-slate-800/40 border border-white/5 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 max-w-sm">
              <div className="relative flex-1">
                <Input 
                  className="h-8 bg-slate-900 border-white/10 text-xs pr-8 text-white focus:ring-blue-500" 
                  placeholder="코드 구분(Name) 또는 비고 검색..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>
            <div className="flex items-center gap-2">
               <Button size="sm" variant="outline" className="h-8 text-xs border-white/10 text-slate-400">
                <Download className="w-3.5 h-3.5 mr-1" /> 엑셀 다운로드
              </Button>
            </div>
          </div>

          {/* 상세 테이블 */}
          <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-slate-900 flex flex-col shadow-2xl">
            <div className="flex-1 overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                </div>
              ) : (
                <Table className="text-[11px]">
                  <TableHeader className="bg-blue-700 sticky top-0 z-10 shadow-md">
                    <TableRow className="border-white/10 hover:bg-blue-700">
                      <TableHead className="text-white text-center font-bold h-10 border-r border-white/10 w-16">ID</TableHead>
                      <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">코드 구분 (Name)</TableHead>
                      <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">비고 1 (Group)</TableHead>
                      <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">그룹 명 (Remarks1)</TableHead>
                      <TableHead className="text-white text-center font-bold h-10 border-r border-white/10">비고 2 (Order)</TableHead>
                      <TableHead className="text-white text-center font-bold h-10 w-20">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCodes.length > 0 ? (
                      filteredCodes.map((code) => (
                        <TableRow key={code.codeId} className="border-white/5 hover:bg-blue-500/10 transition-colors">
                          <TableCell className="text-center text-slate-500 border-r border-white/5">{code.codeId}</TableCell>
                          <TableCell className="text-center text-white font-bold border-r border-white/5 bg-white/5">{code.codeName}</TableCell>
                          <TableCell className="text-center text-slate-300 border-r border-white/5">{code.groupName}</TableCell>
                          <TableCell className="text-center text-slate-300 border-r border-white/5">{code.remarks1}</TableCell>
                          <TableCell className="text-center text-slate-400 border-r border-white/5">{code.remarks2}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-red-400">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-slate-500 h-32">
                          {searchTerm ? '검색 결과가 없습니다.' : '선택된 그룹에 코드가 없습니다.'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
            {/* 하단 요약 정보 */}
            <div className="bg-slate-800/80 px-4 py-2 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-400">
              <span>Total: <b>{filteredCodes.length}</b> items</span>
              <span>Selected Group: <b className="text-blue-400">{selectedGroup}</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
