'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, TrendingUp, BarChart3 } from "lucide-react";

const DATA_BY_RANGE = {
  day: [
    { name: '08시', plan: 50, actual: 48, rate: 96 },
    { name: '10시', plan: 50, actual: 52, rate: 104 },
    { name: '12시', plan: 50, actual: 45, rate: 90 },
    { name: '14시', plan: 50, actual: 55, rate: 110 },
    { name: '16시', plan: 50, actual: 51, rate: 102 },
    { name: '18시', plan: 50, actual: 49, rate: 98 },
  ],
  week: [
    { name: '월', plan: 400, actual: 380, rate: 95 },
    { name: '화', plan: 400, actual: 420, rate: 105 },
    { name: '수', plan: 400, actual: 390, rate: 97 },
    { name: '목', plan: 400, actual: 450, rate: 112 },
    { name: '금', plan: 400, actual: 410, rate: 102 },
    { name: '토', plan: 200, actual: 180, rate: 90 },
    { name: '일', plan: 0, actual: 0, rate: 0 },
  ],
  month: [
    { name: '1주', plan: 2200, actual: 2150, rate: 97.7 },
    { name: '2주', plan: 2200, actual: 2280, rate: 103.6 },
    { name: '3주', plan: 2200, actual: 2190, rate: 99.5 },
    { name: '4주', plan: 2200, actual: 2310, rate: 105 },
  ],
  year: [
    { name: '1월', plan: 8800, actual: 8600, rate: 97.7 },
    { name: '2월', plan: 8800, actual: 8950, rate: 101.7 },
    { name: '3월', plan: 8800, actual: 9100, rate: 103.4 },
    { name: '4월', plan: 8800, actual: 8700, rate: 98.8 },
    { name: '5월', plan: 8800, actual: 9200, rate: 104.5 },
  ]
};

export default function ProductionDashboardPage() {
  const [range, setRange] = useState('day');

  const productionData = useMemo(() => DATA_BY_RANGE[range as keyof typeof DATA_BY_RANGE] || DATA_BY_RANGE.day, [range]);

  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">대시보드</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">4-1 공정별 생산 현황 정보</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Factory size={20} className="text-primary" />
            <h2 className="text-xl font-bold text-white tracking-tight">생산 실적 분석 대시보드</h2>
          </div>
          <Tabs value={range} onValueChange={setRange} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800">
              <TabsTrigger value="day">일간</TabsTrigger>
              <TabsTrigger value="week">주간</TabsTrigger>
              <TabsTrigger value="month">월간</TabsTrigger>
              <TabsTrigger value="year">연간</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: `${range === 'day' ? '금일' : range === 'week' ? '금주' : range === 'month' ? '금월' : '금년'} 생산 목표`, value: range === 'day' ? '400 EA' : range === 'week' ? '2,200 EA' : '9,000 EA', sub: '전기 대비 100%', color: 'text-white' },
            { label: `${range === 'day' ? '금일' : range === 'week' ? '금주' : range === 'month' ? '금월' : '금년'} 생산 실적`, value: range === 'day' ? '412 EA' : range === 'week' ? '2,310 EA' : '9,250 EA', sub: '달성률 103%', color: 'text-accent' },
            { label: '누적 생산량', value: '12,540 EA', sub: '전체 누적', color: 'text-blue-400' },
            { label: '평균 가동률', value: '94.2%', sub: '목표 대비 +2%', color: 'text-green-400' },
          ].map((stat, i) => (
            <Card key={i} className="bg-slate-900 border-white/5 shadow-lg">
              <CardContent className="p-4">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-baseline justify-between mt-1">
                  <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
                  <span className="text-[10px] text-slate-400">{stat.sub}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-slate-900 border-white/5 shadow-xl">
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b border-white/5">
              <CardTitle className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <BarChart3 size={14} className="text-primary" /> 생산 계획 대비 실적 ({range === 'day' ? '일간' : range === 'week' ? '주간' : range === 'month' ? '월간' : '연간'})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '10px' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  <Bar dataKey="plan" name="계획" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="실적" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-white/5 shadow-xl">
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b border-white/5">
              <CardTitle className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={14} className="text-accent" /> 생산 달성률 추이
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productionData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }} />
                  <Area type="monotone" dataKey="rate" name="달성률(%)" stroke="#10b981" fillOpacity={1} fill="url(#colorRate)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
