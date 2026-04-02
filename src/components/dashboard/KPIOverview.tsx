"use client"

import { Card, CardContent } from "@/components/ui/card"
import { KPIS } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function KPIOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {KPIS.map((kpi, i) => (
        <Card key={i} className="glass-panel border-none shadow-lg group hover:scale-[1.02] transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
              <div className={`
                p-1.5 rounded-full 
                ${kpi.trend.includes('+') ? 'bg-accent/10 text-accent' : kpi.trend.includes('-') ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}
              `}>
                {kpi.trend.includes('+') ? <TrendingUp size={14} /> : kpi.trend.includes('-') ? <TrendingDown size={14} /> : <Minus size={14} />}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight text-foreground">{kpi.value}</h3>
              <span className={`text-xs font-semibold ${kpi.trend.includes('+') ? 'text-accent' : kpi.trend.includes('-') ? 'text-destructive' : 'text-muted-foreground'}`}>
                {kpi.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}