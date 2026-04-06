'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip
} from 'recharts';
import { Activity, ShieldCheck, Target, Zap } from "lucide-react";

const KPI_RADAR_DATA = [
  { subject: '가동률', A: 120, B: 110, fullMark: 150 },
  { subject: '생산성', A: 98, B: 130, fullMark: 150 },
  { subject: '품질률', A: 86, B: 130, fullMark: 150 },
  { subject: '에너지 효율', A: 99, B: 100, fullMark: 150 },
  { subject: '안전지수', A: 85, B: 90, fullMark: 150 },
];

const OEE_DATA = [
  { name: '가동시간', value: 85, color: '#0ea5e9' },
  { name: '비가동시간', value: 15, color: 'rgba(255,255,255,0.05)' },
];

export default function KpiDashboardPage() {
  return (
    <div className="flex flex-col h-full -m-6 bg-[#0f172a]">
      <div className="px-6 py-2 border-b border-white/5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-white/50">대시보드</span>
        <span className="text-[11px] text-white/30">&gt;</span>
        <span className="text-[11px] font-medium text-white/90">4-2 리소스 및 KPI 현황 정보</span>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-accent" />
          <h2 className="text-xl font-bold text-white tracking-tight">주요 성과 지표 (KPI) 리포트</h2>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '설비종합효율(OEE)', value: '84.2%', icon: Target, trend: '+1.5%', color: 'text-blue-400' },
            { label: '에너지 절감액', value: '₩2.4M', icon: Zap, trend: '-8%', color: 'text-yellow-400' },
            { label: '품질 지수', value: '98.8', icon: ShieldCheck, trend: '+0.2%', color: 'text-green-400' },
            { label: '시스템 부하', value: '42%', icon: Activity, trend: 'Normal', color: 'text-slate-400' },
          ].map((kpi, i) => (
            <Card key={i} className="bg-slate-900 border-white/5">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{kpi.label}</p>
                  <h3 className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</h3>
                  <p className="text-[10px] text-slate-400 mt-1">{kpi.trend}</p>
                </div>
                <kpi.icon size={28} className={kpi.color} opacity={0.3} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <Card className="bg-slate-900 border-white/5 h-[400px]">
            <CardHeader className="py-3 px-4 border-b border-white/5">
              <CardTitle className="text-xs font-bold text-slate-300 tracking-widest uppercase">설비 종합 효율 (OEE)</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <div className="relative h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={OEE_DATA} innerRadius={60} outerRadius={80} paddingAngle={0} dataKey="value">
                      {OEE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">85%</span>
                  <span className="text-[10px] text-slate-500">가동성</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 w-full px-8 pb-12">
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 font-bold">성능 효율</p>
                  <p className="text-lg font-bold text-white">92.4%</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 font-bold">품질 지수</p>
                  <p className="text-lg font-bold text-white">99.1%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-white/5 h-[400px]">
            <CardHeader className="py-3 px-4 border-b border-white/5">
              <CardTitle className="text-xs font-bold text-slate-300 tracking-widest uppercase">종합 리소스 분석 (Radar)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={KPI_RADAR_DATA}>
                  <PolarGrid stroke="#1f2937" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="현재" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
                  <Radar name="목표" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: 'white', fontSize: '10px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
