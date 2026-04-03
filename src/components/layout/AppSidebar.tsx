"use client"

import * as React from "react"
import { 
  LayoutDashboard, 
  Settings2, 
  Cpu, 
  BrainCircuit, 
  Activity, 
  ClipboardList, 
  ChevronRight,
  ChevronDown
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const navItems = [
  {
    title: "기준정보 관리",
    icon: Settings2,
    children: [
      { name: "1-1. 공통코드 관리", path: "/standard/codes" },
      { name: "1-2. 사용자 관리", path: "/standard/users" },
    ],
  },
  {
    title: "자동화 장비 자산 관리",
    icon: Cpu,
    children: [
      { name: "2-1. 자동화 장비 자산 관리", path: "/assets/inventory" },
      { name: "2-2. 자동화 장비 유지 보수 이력 관리", path: "/assets/maintenance" },
    ],
  },
  {
    title: "인공지능 데이터 관리",
    icon: BrainCircuit,
    children: [
      { name: "3-1. 공정별 설계 정보 관리", path: "/ai-data/design" },
      { name: "3-2. 자동화 및 IOT 데이터 관리", path: "/ai-data/iot" },
      { name: "3-3. 영상 데이터 관리", path: "/ai-data/video" },
      { name: "3-4. 비정형 데이터 관리", path: "/ai-data/unstructured" },
      { name: "3-5. 상황인지 모델 데이터", path: "/ai-data/context" },
      { name: "3-6. 용접 품질진단 모델", path: "/ai-data/welding-quality" },
      { name: "3-7. 협동로봇 모션제어 모델", path: "/ai-data/robot-motion" },
      { name: "3-8. 용접장 데이터셋", path: "/ai-data/welding-dataset" },
    ],
  },
  {
    title: "대시보드",
    icon: LayoutDashboard,
    children: [
      { name: "4-1. 공정별 생산 현황 정보(일/주/월/연)", path: "/dashboard/production" },
      { name: "4-2. 리소스 및 KPI 현황 정보", path: "/dashboard/kpi" },
      { name: "4-3. 자동화 장비 가동 정보 현황", path: "/dashboard/equipment" },
      { name: "4-4. 데이터 대시보드", path: "/dashboard/data" },
      { name: "4-5. 시뮬레이션 분석", path: "/dashboard/simulation" },
    ],
  },
  {
    title: "생산 상세 모니터링",
    icon: Activity,
    children: [
      { name: "5-1. 선각 공장 라인별 모니터링", path: "/monitoring/lines" },
      { name: "5-2. 블록별 상세 공정 모니터링", path: "/monitoring/blocks" },
      { name: "5-3. 자동화 장비 가동 정보 모니터링", path: "/monitoring/equipment" },
      { name: "5-4. 로봇 모니터링 시스템", path: "/monitoring/robots" },
    ],
  },
  {
    title: "생산 운영 현황 관리",
    icon: ClipboardList,
    children: [
      { name: "6-1. 자동화 장비 작업 배원 관리", path: "/operation/allocation" },
      { name: "6-2. 자동화 장비 가동 실적 관리", path: "/operation/performance" },
      { name: "6-3. 공정별 생산 실적 관리", path: "/operation/production-performance" },
      { name: "6-4. 스테이지별 용접 공정 진척도 관리", path: "/operation/welding-progress" },
      { name: "6-5. 공정별 생산 실행 계획 관리", path: "/operation/execution-plan" },
      { name: "6-6. 공정별 생산 부하 관리", path: "/operation/load" },
      { name: "6-7. 공정별 배치 및 재공 관리", path: "/operation/wip" },
      { name: "6-8. 사업장 KPI 지수 관리", path: "/operation/kpi" },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <Link href="/" className="flex items-center gap-3 group/logo outline-none transition-opacity hover:opacity-80">
          <div className="p-2 rounded-lg bg-primary/20 transition-colors group-hover/logo:bg-primary/30">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">WeldSense AI</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Enterprise Dashboard</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 mb-2">Manufacturing Operations</SidebarGroupLabel>
          <SidebarMenu className="px-4">
            {navItems.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.children.some(child => pathname.startsWith(child.path))}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-semibold text-sm">{item.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.path}>
                          <SidebarMenuSubButton asChild isActive={pathname === child.path}>
                            <Link href={child.path}>
                              <span className="text-xs">{child.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border">
        <p className="text-[10px] text-center text-muted-foreground">© 2026 WeldSense AI v2.4.0</p>
      </SidebarFooter>
    </Sidebar>
  )
}