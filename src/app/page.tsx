"use client"

import React, { useState } from 'react'
import { ControlPanel } from "@/components/dashboard/ControlPanel"
import { ProductionCalendar } from "@/components/dashboard/ProductionCalendar"
import { KPISidebar } from "@/components/dashboard/KPISidebar"

export default function DashboardPage() {
  const [filterType, setFilterType] = useState<'all' | 'production' | 'other'>('all');

  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <div className="mb-4 px-2">
        <h2 className="text-2xl font-bold text-white mb-1">[ 용접 로봇 AI 운영 및 생산 관리 시스템 ]</h2>
        <p className="text-sm text-muted-foreground">2026.03.26 Thursday 14:15</p>
      </div>

      {/* Main Dashboard Content Area */}
      <div className="flex-1 flex overflow-hidden border border-white/10 shadow-2xl rounded-lg">
        {/* Left: Control Panel (Already completed/Submenu concept) */}
        <ControlPanel filterType={filterType} onFilterChange={setFilterType} />
        
        {/* Center: Calendar (Requested) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#2d3748]">
          <ProductionCalendar filterType={filterType} />
          
          {/* Footer Copyright */}
          <footer className="py-4 text-center border-t border-white/5 bg-[#1a2130]">
            <p className="text-xs text-muted-foreground/60 tracking-wider font-light">
              Copyright © 2025 ACE E&T All rights reserved.
            </p>
          </footer>
        </div>
        
        {/* Right: KPI Sidebar (Requested) */}
        <KPISidebar />
      </div>
    </div>
  )
}
