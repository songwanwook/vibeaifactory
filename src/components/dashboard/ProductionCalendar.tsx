"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CALENDAR_EVENTS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function ProductionCalendar() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <Card className="flex-1 bg-[#2d3748] border-none rounded-none overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-[#1a202c] py-3 px-6 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10">
              <ChevronLeft size={16} />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10">
              <ChevronRight size={16} />
            </Button>
          </div>
          <CardTitle className="text-xl font-bold text-sky-400">2026년 3월</CardTitle>
        </div>
        
        <div className="flex items-center bg-[#0f172a] rounded-md p-1 gap-1">
          <Button size="sm" variant="ghost" className="h-7 text-xs text-white">월간</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground">주간</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground">일일</Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 grid grid-rows-[auto_1fr]">
        <div className="grid grid-cols-7 border-b border-white/5 bg-blue-600">
          {weekDays.map((day, i) => (
            <div key={day} className={cn(
              "py-2 text-center text-sm font-bold border-r border-white/10 last:border-0",
              i === 0 ? "text-red-300" : i === 6 ? "text-blue-200" : "text-white"
            )}>
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 grid-rows-5 h-full bg-[#334155]">
          {days.map((day, i) => {
            const date = day <= 31 ? day : day - 31;
            const isGray = day > 31;
            
            return (
              <div key={i} className={cn(
                "border-r border-b border-white/5 p-2 relative group hover:bg-white/5 transition-colors",
                isGray ? "bg-[#1e293b] text-muted-foreground" : "text-white"
              )}>
                <span className={cn(
                  "text-sm font-medium",
                  i % 7 === 0 && !isGray ? "text-red-400" : ""
                )}>{date}일</span>
                
                <div className="mt-1 space-y-1">
                  {CALENDAR_EVENTS.filter(e => e.start <= day && e.end >= day).map(event => (
                    <div 
                      key={event.id}
                      className={cn(
                        "h-5 text-[10px] px-1 flex items-center rounded overflow-hidden truncate",
                        event.color,
                        event.start === day ? "ml-0" : "-ml-2 rounded-l-none",
                        event.end === day ? "mr-0" : "-mr-2 rounded-r-none"
                      )}
                    >
                      {event.start === day && event.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
