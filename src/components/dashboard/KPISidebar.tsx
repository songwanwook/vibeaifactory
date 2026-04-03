"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PRECEDING_PROCESS_STATUS, WELDING_JOB_STATUS, ROBOT_STATUS_GRID, WELDING_ROBOT_KPI } from "@/lib/mock-data"
import { TrendingDown, TrendingUp } from "lucide-react"

export function KPISidebar() {
  return (
    <div className="w-[420px] bg-[#0f172a] shrink-0 p-4 space-y-6 overflow-y-auto border-l border-white/5">
      {/* 1. 선행 공정 현황 */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <h3 className="text-xs font-bold text-white">선행 공정 현황</h3>
          <span className="text-[10px] text-yellow-400">실적: 01.17~01.23 / 예상: 01.24~01.30</span>
        </div>
        <Table className="border border-white/10 text-[10px]">
          <TableHeader className="bg-blue-600 hover:bg-blue-600">
            <TableRow className="border-white/10 h-7">
              <TableHead rowSpan={2} className="text-white text-center border-r border-white/10 p-0">구분</TableHead>
              <TableHead colSpan={3} className="text-white text-center border-r border-white/10 p-0">공정률(%)</TableHead>
              <TableHead colSpan={3} className="text-white text-center p-0">미처리 수량[EA]</TableHead>
            </TableRow>
            <TableRow className="border-white/10 h-7 bg-blue-500">
              <TableHead className="text-white text-center border-r border-white/10 p-0 w-10">실적</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0 w-10">예상</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0 w-10">증감</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0 w-10">실적</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0 w-10">예상</TableHead>
              <TableHead className="text-white text-center p-0 w-10">증감</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#1e293b]">
            {PRECEDING_PROCESS_STATUS.map((row, i) => (
              <TableRow key={i} className="border-white/10 h-7 hover:bg-white/5">
                <TableCell className="text-center border-r border-white/10 p-0 bg-blue-700/50 text-white font-bold">{row.name}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.actual}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.expected}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">
                  <div className="flex items-center justify-center gap-0.5">
                    {row.diff > 0 ? <TrendingUp size={10} className="text-blue-400" /> : <TrendingDown size={10} className="text-red-400" />}
                    <span className={row.diff > 0 ? "text-blue-400" : "text-red-400"}>{Math.abs(row.diff)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center border-r border-white/10 p-0 bg-yellow-500/20">{row.unhandled}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0 bg-yellow-500/20">{row.unhandledExpected}</TableCell>
                <TableCell className="text-center p-0 bg-yellow-500/20 font-bold">{row.unhandledDiff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 2. 금일 용접 작업 현황 */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <h3 className="text-xs font-bold text-white">금일 용접 작업 현황</h3>
          <span className="text-[10px] text-yellow-400">기준: 2025.01.24</span>
        </div>
        <Table className="border border-white/10 text-[10px]">
          <TableHeader className="bg-blue-600">
            <TableRow className="border-white/10 h-7">
              <TableHead className="text-white text-center border-r border-white/10 p-0">공정</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">계획</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">실적</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">진척률</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">불량</TableHead>
              <TableHead className="text-white text-center p-0">불량률</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#1e293b]">
            {WELDING_JOB_STATUS.map((row, i) => (
              <TableRow key={i} className="border-white/10 h-7 hover:bg-white/5">
                <TableCell className="text-center border-r border-white/10 p-0 bg-blue-700/50 text-white font-bold">{row.process}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.plan}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.actual}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.progress}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.defect}</TableCell>
                <TableCell className="text-center p-0">{row.defectRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 3. 로봇 현황 */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <h3 className="text-xs font-bold text-white">로봇 현황</h3>
          <span className="text-[10px] text-yellow-400">기준: 2025.01.24</span>
        </div>
        <Table className="border border-white/10 text-[10px]">
          <TableHeader className="bg-blue-600">
            <TableRow className="border-white/10 h-7">
              <TableHead className="text-white text-center border-r border-white/10 p-0">구분</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">수량</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">가동</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">대기</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">불가</TableHead>
              <TableHead className="text-white text-center p-0">가동률</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#1e293b]">
            {ROBOT_STATUS_GRID.map((row, i) => (
              <TableRow key={i} className="border-white/10 h-7 hover:bg-white/5">
                <TableCell className="text-center border-r border-white/10 p-0 bg-blue-700/50 text-white font-bold">{row.type}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.count}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.operating}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.standby}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.unavailable}</TableCell>
                <TableCell className="text-center p-0 font-bold">{row.rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 4. 용접 로봇 KPI */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-white">용접 로봇 KPI</h3>
        <Table className="border border-white/10 text-[10px]">
          <TableHeader className="bg-blue-600">
            <TableRow className="border-white/10 h-7">
              <TableHead className="text-white text-center border-r border-white/10 p-0">구분</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">RB3</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">UR20</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">UR3</TableHead>
              <TableHead className="text-white text-center border-r border-white/10 p-0">기타</TableHead>
              <TableHead className="text-white text-center p-0">평균</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#1e293b]">
            {WELDING_ROBOT_KPI.map((row, i) => (
              <TableRow key={i} className="border-white/10 h-7 hover:bg-white/5">
                <TableCell className="text-center border-r border-white/10 p-0 bg-blue-700/50 text-white font-bold">{row.category}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.rb3}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.ur20}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.ur3}</TableCell>
                <TableCell className="text-center border-r border-white/10 p-0">{row.other}</TableCell>
                <TableCell className="text-center p-0 font-bold">{row.avg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
