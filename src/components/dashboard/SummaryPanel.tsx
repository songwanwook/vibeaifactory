"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ROBOTS } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"

export function SummaryPanel() {
  return (
    <div className="w-full lg:w-[350px] space-y-6">
      <Card className="glass-panel border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Live System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">System Load</span>
              <span className="font-medium text-accent">72%</span>
            </div>
            <Progress value={72} className="h-2 bg-secondary" />
          </div>
          
          <Separator className="bg-white/5" />
          
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Robot Status Grid</h4>
            <div className="grid grid-cols-5 gap-2">
              {ROBOTS.map((robot) => (
                <div 
                  key={robot.id} 
                  className={`
                    aspect-square rounded-md border border-white/5 flex items-center justify-center
                    ${robot.status === 'OPERATING' ? 'bg-accent/20 border-accent/30' : 
                      robot.status === 'STANDBY' ? 'bg-primary/20 border-primary/30' : 'bg-destructive/20 border-destructive/30'}
                  `}
                  title={`${robot.name}: ${robot.status}`}
                >
                  <div className={`w-2 h-2 rounded-full ${robot.status === 'OPERATING' ? 'bg-accent' : robot.status === 'STANDBY' ? 'bg-primary' : 'bg-destructive'}`} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {[
                { time: '2 mins ago', msg: 'WR-004 Offline: Maintenance required', level: 'high' },
                { time: '15 mins ago', msg: 'Production target met for Batch A', level: 'low' },
                { time: '1 hour ago', msg: 'Voltage deviation detected in Sector 3', level: 'medium' },
                { time: '3 hours ago', msg: 'Scheduled maintenance: WR-002', level: 'low' },
              ].map((alert, i) => (
                <div key={i} className="group relative pl-4 border-l-2 border-primary/20 hover:border-accent transition-colors">
                  <span className="text-[10px] text-muted-foreground block mb-1">{alert.time}</span>
                  <p className="text-sm text-foreground/90 leading-tight">{alert.msg}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}