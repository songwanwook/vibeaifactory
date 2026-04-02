"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { KPIOverview } from "@/components/dashboard/KPIOverview"
import { ProductionTrends } from "@/components/dashboard/ProductionTrends"
import { SummaryPanel } from "@/components/dashboard/SummaryPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ROBOTS } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="h-6 w-px bg-white/10" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Operational Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-accent">System Online</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto space-y-8">
            <KPIOverview />
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-8">
                <ProductionTrends />
                
                <div className="glass-panel rounded-xl overflow-hidden border-none shadow-xl">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-semibold">Robot Fleet Summary</h3>
                    <Badge variant="outline" className="border-white/10">Real-time update</Badge>
                  </div>
                  <Table>
                    <TableHeader className="bg-secondary/50">
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead>Robot ID</TableHead>
                        <TableHead>Efficiency</TableHead>
                        <TableHead>Uptime</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ROBOTS.map((robot) => (
                        <TableRow key={robot.id} className="border-white/5 hover:bg-white/5 transition-colors">
                          <TableCell className="font-medium text-primary">{robot.id}</TableCell>
                          <TableCell>{robot.efficiency}%</TableCell>
                          <TableCell className="text-muted-foreground">{robot.uptime}</TableCell>
                          <TableCell>
                            <Badge className={`
                              ${robot.status === 'OPERATING' ? 'bg-accent/20 text-accent border-accent/20' : 
                                robot.status === 'STANDBY' ? 'bg-primary/20 text-primary border-primary/20' : 'bg-destructive/20 text-destructive border-destructive/20'}
                            `}>
                              {robot.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <SummaryPanel />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}