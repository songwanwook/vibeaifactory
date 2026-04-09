"use client"

import React, { useState, useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DAILY_DATA = [
  { time: '08:00', rate: 85, target: 90 },
  { time: '10:00', rate: 92, target: 90 },
  { time: '12:00', rate: 88, target: 90 },
  { time: '14:00', rate: 95, target: 90 },
  { time: '16:00', rate: 94, target: 90 },
  { time: '18:00', rate: 90, target: 90 },
];

const WEEKLY_DATA = [
  { time: 'Mon', rate: 82, target: 85 },
  { time: 'Tue', rate: 88, target: 85 },
  { time: 'Wed', rate: 91, target: 85 },
  { time: 'Thu', rate: 89, target: 85 },
  { time: 'Fri', rate: 93, target: 85 },
  { time: 'Sat', rate: 85, target: 85 },
];

const MONTHLY_DATA = [
  { time: 'W1', rate: 84, target: 88 },
  { time: 'W2', rate: 89, target: 88 },
  { time: 'W3', rate: 92, target: 88 },
  { time: 'W4', rate: 91, target: 88 },
];

export function ProductionTrends() {
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const data = useMemo(() => {
    switch (viewType) {
      case 'daily': return DAILY_DATA;
      case 'weekly': return WEEKLY_DATA;
      case 'monthly': return MONTHLY_DATA;
      default: return DAILY_DATA;
    }
  }, [viewType]);

  return (
    <Card className="glass-panel border-none shadow-xl h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-base font-semibold text-foreground">Production Rate Trends</CardTitle>
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              Actual Rate
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-muted" />
              Target
            </div>
          </div>
        </div>
        
        <div className="flex items-center bg-[#0f172a] rounded-md p-1 gap-1">
          <Button 
            size="sm" 
            variant="ghost" 
            className={cn("h-7 text-[10px] px-2", viewType === 'daily' ? "text-white bg-blue-600" : "text-muted-foreground")}
            onClick={() => setViewType('daily')}
          >
            일일
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className={cn("h-7 text-[10px] px-2", viewType === 'weekly' ? "text-white bg-blue-600" : "text-muted-foreground")}
            onClick={() => setViewType('weekly')}
          >
            주간
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className={cn("h-7 text-[10px] px-2", viewType === 'monthly' ? "text-white bg-blue-600" : "text-muted-foreground")}
            onClick={() => setViewType('monthly')}
          >
            월간
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[310px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                color: 'white',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="rate" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRate)" 
            />
            <Area 
              type="monotone" 
              dataKey="target" 
              stroke="hsl(var(--muted))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}