"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ROBOTS } from "@/lib/mock-data"
import { Cpu, Zap, Tool, Clock, ShieldCheck } from "lucide-react"

export default function RobotsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center px-6 border-b border-white/5">
          <SidebarTrigger className="mr-4" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Robot Monitoring</h2>
        </header>
        
        <main className="p-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Robot Asset Fleet</h1>
                <p className="text-muted-foreground mt-1 text-lg">Manage and monitor real-time welding robot performance.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg border border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="text-sm font-medium">3 Active</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg border border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
                  <span className="text-sm font-medium">1 Critical</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {ROBOTS.map((robot) => (
                <Card key={robot.id} className="glass-panel border-none shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${robot.status === 'OPERATING' ? 'bg-accent/10' : 'bg-muted'}`}>
                        <Cpu className={`w-6 h-6 ${robot.status === 'OPERATING' ? 'text-accent' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">{robot.name}</CardTitle>
                        <span className="text-xs font-medium text-muted-foreground">{robot.id}</span>
                      </div>
                    </div>
                    <Badge className={`
                      ${robot.status === 'OPERATING' ? 'bg-accent/20 text-accent' : 
                        robot.status === 'STANDBY' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}
                    `}>
                      {robot.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-secondary/30 p-3 rounded-lg border border-white/5">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Zap size={14} />
                          <span className="text-[10px] font-semibold uppercase tracking-wider">Efficiency</span>
                        </div>
                        <p className="text-lg font-bold text-accent">{robot.efficiency}%</p>
                      </div>
                      <div className="bg-secondary/30 p-3 rounded-lg border border-white/5">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Clock size={14} />
                          <span className="text-[10px] font-semibold uppercase tracking-wider">Uptime</span>
                        </div>
                        <p className="text-lg font-bold">{robot.uptime}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Tool size={14} /> Last Maintenance
                        </span>
                        <span className="font-medium">{robot.lastMaintenance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <ShieldCheck size={14} /> Specifications
                        </span>
                        <span className="font-medium text-right text-xs max-w-[150px]">{robot.specifications}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}