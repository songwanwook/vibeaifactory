'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Search, FileSpreadsheet } from "lucide-react";

const CHART_DATA = [
  { name: '1월', load: 7500, capa: 6000 },
  { name: '2월', load: 10000, capa: 10200 },
  { name: '3월', load: 10500, capa: 10800 },
  { name: '4월', load: 12000, capa: 10000 },
  { name: '5월', load: 10200, capa: 8500 },
  { name: '6월', load: 10500, capa: 8000 },
  { name: '7월', load: 1200, capa: 11500 },
  { name: '8월', load: 6000, capa: 6200 },
  { name: '9월', load: 10800, capa: 9200 },
  { name: '10월', load: 8200, capa: 7000 },
  { name: '11월', load: 9800, capa: 8800 },
  { name: '12월', load: 11000, capa: 9500 },
];

const TABLE_ROWS = [
  { group: '부하(A)', label: '수량', unit: 'EA', values: [88, 123, 111, 140, 136, 116, 136, 74, 153, 90, 123, 136, 1417] },
  { group: '부하(A)', label: '중량', unit: 'TON', values: [7537, 9903, 9941, 12035, 9969, 10332, 9683, 5918, 10660, 7306, 9722, 10833, 113839] },
  { group: 'CAPA(B)', label: '수량', unit: 'EA', values: [79, 145, 120, 125, 95, 158, 86, 130, 82, 117, 123, 120, 1383] },
  { group: 'CAPA(B)', label: '중량', unit: 'TON', values: [5858, 9976, 10230, 9825, 8411, 8056, 11347, 6156, 9128, 6759, 8685, 9373, 103804] },
  { group: '차이(C-A,B)', label: '수량', unit: 'EA', values: [3, -22, -9, 11, 11, 24, -32, -12, 20, 5, 6, 19, 26] },
  { group: '차이(C-A,B)', label: '중량', unit: 'TON', values: [1629, -23, -282, 2296, 1543, 2276, -1644, -541, 1555, 547, 1027, 1430, 9753] },
  { group: '%(MB)', label: '수량', unit: '%', values: [112, 156, 141, 178, 183, 150, 173, 94, 151, 115, 156, 176, 149] },
  { group: '%(MB)', label: '중량', unit: '%', values: [129, 169, 170, 206, 170, 176, 186, 96, 112, 125, 196, 165, 158] },
];

export default function ProductionLoadPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0b1120] text-white">
      {/* 상단 브레드크럼 */}
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2 bg-[#0f172a]">
        <span className="text-[11px] font-medium text-white/50">생산 운영 현황 관리</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">6-6 공정별 생산 부하 관리</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {/* 필터 바 */}
        <div className="bg-[#1e293b] p-4 rounded-lg space-y-4 border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet size={18} className="text-yellow-500" />
              <h2 className="text-lg font-bold">공정별 생산 부하 관리</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Checkbox id="sojo" className="border-white/20" />
                  <Label htmlFor="sojo" className="text-[11px]">소조</Label>
                </div>
                <div className="flex items-center gap-1.5">
                  <Checkbox id="jungjo" className="border-white/20" />
                  <Label htmlFor="jungjo" className="text-[11px]">중조</Label>
                </div>
              </div>
              <Button size="sm" className="bg-slate-700 hover:bg-slate-600 h-8 px-6">검색</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] gap-4 items-center">
            <Label className="text-xs shrink-0">작업일자</Label>
            <Input type="date" className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white" defaultValue="2025-04-17" />
            
            <Label className="text-xs shrink-0">작업호선</Label>
            <Input className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white uppercase" defaultValue="ALL" />
            
            <Label className="text-xs shrink-0">장비번호</Label>
            <Input className="h-8 bg-cyan-400/10 border-cyan-400/30 text-xs text-white uppercase" defaultValue="ALL" />

            <RadioGroup defaultValue="monthly" className="flex items-center gap-3">
              {['일별', '주별', '월별', '년별'].map((label, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <RadioGroupItem value={label === '월별' ? 'monthly' : label} id={`r-${idx}`} className="border-white/20" />
                  <Label htmlFor={`r-${idx}`} className="text-[11px] cursor-pointer">{label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* 대형 차트 영역 */}
        <div className="bg-[#0f172a] border border-white/10 rounded-lg p-6 h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={CHART_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 14000]} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '4px', fontSize: '12px' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
              <Bar dataKey="load" name="부하 (A)" fill="#dc2626" barSize={40} radius={[2, 2, 0, 0]} />
              <Line type="monotone" dataKey="capa" name="CAPA (B)" stroke="#ffffff" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* 상세 데이터 그리드 테이블 */}
        <div className="border border-white/10 rounded-lg overflow-hidden bg-[#0f172a]">
          <Table className="text-[10px] border-collapse">
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600 border-white/10">
                <TableHead colSpan={3} className="text-white text-center font-bold h-8 border-r border-white/10">구분</TableHead>
                {[...Array(12)].map((_, i) => (
                  <TableHead key={i} className="text-white text-center font-bold h-8 border-r border-white/10">{i + 1}</TableHead>
                ))}
                <TableHead className="text-white text-center font-bold h-8">계</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TABLE_ROWS.map((row, i) => (
                <TableRow key={i} className="border-white/10 hover:bg-white/5 h-8">
                  {row.label === '수량' && (
                    <TableCell rowSpan={2} className="bg-blue-900/40 text-white font-bold text-center border-r border-white/10 w-24">
                      {row.group}
                    </TableCell>
                  )}
                  <TableCell className="bg-blue-900/20 text-slate-300 text-center border-r border-white/10 w-16">{row.label}</TableCell>
                  <TableCell className="bg-blue-900/20 text-blue-400 font-bold text-center border-r border-white/10 w-12">{row.unit}</TableCell>
                  {row.values.map((val, idx) => (
                    <TableCell 
                      key={idx} 
                      className={`text-center border-r border-white/10 last:border-r-0 ${
                        idx === 12 ? 'font-bold text-white bg-blue-900/20' : 
                        val < 0 ? 'text-red-400' : 'text-slate-300'
                      }`}
                    >
                      {val.toLocaleString()}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
