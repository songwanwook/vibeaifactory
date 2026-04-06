'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, LineChart, Line
} from 'recharts';
import { Database, FileJson, Share2, Layers } from "lucide-react";

const SCATTER_DATA = [
  { x: 100, y: 200, z: 200, name: 'Raw' },
  { x: 120, y: 100, z: 260, name: 'Processed' },
  { x: 170, y: 300, z: 400, name: 'Training' },
  { x: 140, y: 250, z: 280, name: 'Validation' },
  { x: 150, y: 400, z: 500, name: 'Test' },
  { x: 110, y: 280, z: 200, name: 'Outliers' },
];

const DATA_GROWTH = [
  { name: '1월', unstructured: 400, structured: 240, iot: 240 },
  { name: '2월', unstructured: 520, structured: 260, iot: 310 },
  { name: '3월', unstructured: 680, structured: 310, iot: 420 },
  { name: '4월', unstructured: 800, structured: 340, iot: 550 },
];

export default function DataDashboardPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">대시보드</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">4-4 데이터 대시보드</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center gap-2">
          <Database size={20} className="text-blue-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">AI 학습용 데이터 자산 통계</h2>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '전체 데이터량', value: '45.2 TB', icon: Layers, color: 'text-blue-500' },
            { label: '학습 완료 데이터', value: '8.2 M', icon: FileJson, color: 'text-green-500' },
            { label: '데이터 가용성', value: '99.9%', icon: Share2, color: 'text-accent' },
            { label: '금월 증가량', value: '+1.2 TB', icon: Database, color: 'text-yellow-500' },
          ].map((item, i) => (
            <Card key={i} className="bg-slate-900 border-white/5 shadow-md">
              <CardContent className="p-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">{item.label}</span>
                  <item.icon size={16} className={item.color} />
                </div>
                <h3 className="text-2xl font-bold text-white mt-2">{item.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <Card className="bg-slate-900 border-white/5 h-[400px]">
            <CardHeader className="py-3 px-4 border-b border-white/5">
              <CardTitle className="text-xs font-bold text-slate-300 tracking-widest uppercase">데이터 성장 추이 (MB/s)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DATA_GROWTH}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', fontSize: '10px' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="unstructured" name="비정형" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="structured" name="설계데이터" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="iot" name="센서데이터" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-white/5 h-[400px]">
            <CardHeader className="py-3 px-4 border-b border-white/5">
              <CardTitle className="text-xs font-bold text-slate-300 tracking-widest uppercase">데이터 분포 및 밀도 분석</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis type="number" dataKey="x" name="복잡도" unit="pts" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis type="number" dataKey="y" name="정확도" unit="%" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <ZAxis type="number" dataKey="z" range={[60, 400]} name="용량" unit="GB" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', fontSize: '10px' }} />
                  <Scatter name="Data Nodes" data={SCATTER_DATA} fill="#0ea5e9" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
