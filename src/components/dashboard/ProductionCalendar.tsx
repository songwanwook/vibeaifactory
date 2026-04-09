"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CALENDAR_EVENTS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  isWithinInterval,
  parseISO
} from "date-fns"
import { ko } from "date-fns/locale"

export function ProductionCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date()); 

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
  }, [startDate, endDate]);

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <Card className="flex-1 bg-[#2d3748] border-none rounded-none overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-[#1a202c] py-3 px-6 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" onClick={prevMonth}>
              <ChevronLeft size={16} />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" onClick={nextMonth}>
              <ChevronRight size={16} />
            </Button>
          </div>
          <CardTitle className="text-xl font-bold text-sky-400">
            {format(currentDate, "yyyy년 M월", { locale: ko })}
          </CardTitle>
        </div>
        
        <div className="flex items-center bg-[#0f172a] rounded-md p-1 gap-1">
          <Button size="sm" variant="ghost" className="h-7 text-xs text-white">월간</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground">주간</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground">일일</Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 grid grid-rows-[auto_1fr] overflow-hidden">
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
        
        <div className="grid grid-cols-7 grid-rows-5 h-full bg-[#334155] overflow-y-auto">
          {days.slice(0, 35).map((day, i) => {
            const isSelectedMonth = isSameMonth(day, monthStart);
            
            const dayEvents = CALENDAR_EVENTS.filter(event => {
              const start = parseISO(event.start);
              const end = parseISO(event.end);
              return isWithinInterval(day, { start, end }) || isSameDay(day, start) || isSameDay(day, end);
            });

            return (
              <div key={i} className={cn(
                "border-r border-b border-white/5 p-1 relative group hover:bg-white/5 transition-colors min-h-[100px]",
                !isSelectedMonth ? "bg-[#1e293b] text-muted-foreground" : "text-white"
              )}>
                <span className={cn(
                  "text-xs font-medium ml-1",
                  day.getDay() === 0 && isSelectedMonth ? "text-red-400" : ""
                )}>{format(day, "d")}일</span>
                
                <div className="mt-1 space-y-0.5 overflow-hidden">
                  {dayEvents.map(event => {
                    const start = parseISO(event.start);
                    const end = parseISO(event.end);
                    const isStart = isSameDay(day, start);
                    
                    return (
                      <div 
                        key={event.id}
                        className={cn(
                          "h-4 text-[9px] px-1 flex items-center rounded-sm overflow-hidden truncate text-white",
                          isStart ? "ml-0" : "-ml-2 rounded-l-none",
                          isSameDay(day, end) ? "mr-0" : "-mr-2 rounded-r-none"
                        )}
                        style={{ backgroundColor: event.color }}
                        title={event.title}
                      >
                        {isStart && event.title}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
