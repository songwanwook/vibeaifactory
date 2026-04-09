"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Info, Calendar as CalendarIcon, Clock, User, Cpu, Tag, Briefcase } from "lucide-react"
import { CALENDAR_EVENTS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { 
  format, 
  addMonths, 
  subMonths, 
  addDays,
  subDays,
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  isWithinInterval,
  parseISO,
  differenceInDays
} from "date-fns"
import { ko } from "date-fns/locale"

interface ProductionCalendarProps {
  filterType: 'all' | 'production' | 'other';
}

export function ProductionCalendar({ filterType }: ProductionCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [viewType, setViewType] = useState<'monthly' | 'weekly' | 'daily'>('monthly');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  
  const calendarInterval = useMemo(() => {
    if (viewType === 'monthly') {
      return {
        start: startOfWeek(monthStart),
        end: endOfWeek(monthEnd)
      };
    } else if (viewType === 'weekly') {
      return {
        start: startOfWeek(currentDate),
        end: endOfWeek(currentDate)
      };
    } else {
      return {
        start: currentDate,
        end: currentDate
      };
    }
  }, [currentDate, viewType, monthStart, monthEnd]);

  const days = useMemo(() => {
    return eachDayOfInterval(calendarInterval);
  }, [calendarInterval]);

  // 색상 기반 업무 구분 반환 함수
  const getWorkClassification = (color: string) => {
    if (color === '#2e86de' || color === '#8e44ad') return 'production';
    if (color === '#27ae60') return 'other';
    return 'other';
  };

  // 필터링된 이벤트 리스트
  const filteredEvents = useMemo(() => {
    if (filterType === 'all') return CALENDAR_EVENTS;
    return CALENDAR_EVENTS.filter(event => getWorkClassification(event.color) === filterType);
  }, [filterType]);

  // 슬롯 할당 알고리즘 (필터링된 데이터 기반)
  const eventSlots = useMemo(() => {
    const sortedEvents = [...filteredEvents]
      .filter(event => {
        const start = parseISO(event.start);
        const end = parseISO(event.end);
        return isWithinInterval(start, calendarInterval) || 
               isWithinInterval(end, calendarInterval) ||
               (start < calendarInterval.start && end > calendarInterval.end);
      })
      .sort((a, b) => {
        const startA = parseISO(a.start).getTime();
        const startB = parseISO(b.start).getTime();
        if (startA !== startB) return startA - startB;
        const durA = differenceInDays(parseISO(a.end), parseISO(a.start));
        const durB = differenceInDays(parseISO(b.end), parseISO(b.start));
        return durB - durA;
      });

    const tracks: (any[])[] = [];
    const eventToTrack = new Map<number, number>();

    sortedEvents.forEach(event => {
      const start = parseISO(event.start);
      let trackIndex = tracks.findIndex(track => {
        const lastEvent = track[track.length - 1];
        return parseISO(lastEvent.end) < start && !isSameDay(parseISO(lastEvent.end), start);
      });

      if (trackIndex === -1) {
        trackIndex = tracks.length;
        tracks.push([]);
      }
      
      tracks[trackIndex].push(event);
      eventToTrack.set(event.id, trackIndex);
    });

    return { eventToTrack, maxTracks: tracks.length };
  }, [calendarInterval, filteredEvents]);

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const next = () => {
    if (viewType === 'monthly') setCurrentDate(addMonths(currentDate, 1));
    else if (viewType === 'weekly') setCurrentDate(addDays(currentDate, 7));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const prev = () => {
    if (viewType === 'monthly') setCurrentDate(subMonths(currentDate, 1));
    else if (viewType === 'weekly') setCurrentDate(subDays(currentDate, 7));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getFormatString = () => {
    if (viewType === 'monthly') return "yyyy년 M월";
    if (viewType === 'weekly') {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      if (isSameMonth(start, end)) {
        return `yyyy년 M월 ${format(start, "d")}일 ~ ${format(end, "d")}일`;
      }
      return `yyyy년 M월 ${format(start, "d")}일 ~ M월 ${format(end, "d")}일`;
    }
    return "yyyy년 M월 d일 (EEEE)";
  };

  return (
    <Card className="flex-1 bg-[#2d3748] border-none rounded-none overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-[#1a202c] py-3 px-6 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" onClick={prev}>
              <ChevronLeft size={16} />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 px-3 text-[11px] text-white border-white/10 hover:bg-white/10 bg-transparent"
              onClick={goToToday}
            >
              오늘
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" onClick={next}>
              <ChevronRight size={16} />
            </Button>
          </div>
          <CardTitle className="text-xl font-bold text-sky-400">
            {format(currentDate, getFormatString(), { locale: ko })}
          </CardTitle>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#0f172a] rounded-md p-1 gap-1 border border-white/5">
            <Button 
              size="sm" 
              variant="ghost" 
              className={cn("h-7 text-[10px] px-3", viewType === 'monthly' ? "text-white bg-slate-700" : "text-muted-foreground")}
              onClick={() => setViewType('monthly')}
            >
              월간
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className={cn("h-7 text-[10px] px-3", viewType === 'weekly' ? "text-white bg-slate-700" : "text-muted-foreground")}
              onClick={() => setViewType('weekly')}
            >
              주간
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className={cn("h-7 text-[10px] px-3", viewType === 'daily' ? "text-white bg-slate-700" : "text-muted-foreground")}
              onClick={() => setViewType('daily')}
            >
              일일
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 grid grid-rows-[auto_1fr] overflow-hidden">
        {viewType !== 'daily' && (
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
        )}
        
        <div className={cn(
          "grid h-full bg-[#334155] overflow-y-auto",
          viewType === 'monthly' ? "grid-cols-7 grid-rows-5" : 
          viewType === 'weekly' ? "grid-cols-7" : "grid-cols-1"
        )}>
          {days.map((day, i) => {
            const isSelectedMonth = isSameMonth(day, currentDate);
            const dayEventsBySlot = new Array(eventSlots.maxTracks).fill(null);
            
            filteredEvents.forEach(event => {
              const start = parseISO(event.start);
              const end = parseISO(event.end);
              if (isWithinInterval(day, { start, end }) || isSameDay(day, start) || isSameDay(day, end)) {
                const slot = eventSlots.eventToTrack.get(event.id);
                if (slot !== undefined) {
                  dayEventsBySlot[slot] = event;
                }
              }
            });

            return (
              <div key={i} className={cn(
                "border-r border-b border-white/5 pt-7 pb-1 relative group hover:bg-white/5 transition-colors",
                viewType === 'monthly' ? "min-h-[100px]" : "min-h-[400px]",
                viewType === 'monthly' && !isSelectedMonth ? "bg-[#1e293b] text-muted-foreground" : "text-white"
              )}>
                <span className={cn(
                  "text-[10px] font-bold absolute top-1.5 right-2 z-30",
                  day.getDay() === 0 && (viewType !== 'monthly' || isSelectedMonth) ? "text-red-400" : ""
                )}>
                  {viewType === 'daily' ? format(day, "M월 d일 (EEEE)", { locale: ko }) : `${format(day, "d")}일`}
                </span>
                
                <div className="space-y-1">
                  {dayEventsBySlot.map((event, slotIndex) => {
                    if (!event) return <div key={`empty-${slotIndex}`} className="h-6" />;

                    const start = parseISO(event.start);
                    const end = parseISO(event.end);
                    const isStart = isSameDay(day, start);
                    const isEnd = isSameDay(day, end);
                    const isFirstDayOfWeek = day.getDay() === 0;
                    const showTitle = isStart || isFirstDayOfWeek || i === 0 || (viewType === 'weekly' && i % 7 === 0) || viewType === 'daily';
                    
                    return (
                      <div 
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={cn(
                          "h-6 text-[11px] px-2 flex items-center text-white shadow-sm relative overflow-visible cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all",
                          viewType === 'monthly' ? (
                            cn(
                              isStart ? "ml-1 rounded-l-sm" : "-ml-[1px] border-l-0 rounded-l-none",
                              isEnd ? "mr-1 rounded-r-sm" : "-mr-[1px] border-r-0 rounded-r-none",
                              showTitle ? "z-20" : "z-10"
                            )
                          ) : "mx-1 rounded-sm z-10"
                        )}
                        style={{ backgroundColor: event.color }}
                        title={event.title}
                      >
                        {showTitle && (
                          <span className="whitespace-nowrap absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none z-30">
                            {event.title}
                            {viewType === 'daily' && !event.all_day && ` [${format(start, "HH:mm")} - ${format(end, "HH:mm")}]`}
                          </span>
                        )}
                        {!isStart && !showTitle && viewType !== 'monthly' && <span className="text-[9px] opacity-70 ml-1 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">(계속)</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-sky-400 flex items-center gap-2">
              <Info className="w-5 h-5" /> 상세 일정 정보
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              선택한 생산 일정의 세부 사항입니다.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4 py-4">
              <div className="bg-[#0f172a] p-4 rounded-lg border border-white/5 space-y-3">
                <div className="flex items-start gap-3">
                  <Tag className="w-4 h-4 text-sky-400 mt-1" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">일정 제목</p>
                    <p className="text-sm font-medium">{selectedEvent.title}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-4 h-4 text-emerald-400 mt-1" />
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">시작 일시</p>
                      <p className="text-sm">{format(parseISO(selectedEvent.start), "yyyy-MM-dd HH:mm")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-rose-400 mt-1" />
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">종료 일시</p>
                      <p className="text-sm">{format(parseISO(selectedEvent.end), "yyyy-MM-dd HH:mm")}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    {selectedEvent.ev_type === 'ROBOT' ? <Cpu className="w-4 h-4 text-purple-400 mt-1" /> : <User className="w-4 h-4 text-blue-400 mt-1" />}
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">작업 주체</p>
                      <p className="text-sm">{selectedEvent.ev_type === 'ROBOT' ? '로봇 작업' : '인력 작업'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-4 h-4 text-amber-400 mt-1" />
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">업무 구분</p>
                      <p className="text-sm font-bold text-white">
                        {getWorkClassification(selectedEvent.color) === 'production' ? '생산' : '기타'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="secondary" onClick={() => setSelectedEvent(null)} className="h-9 px-6 text-xs bg-slate-700 hover:bg-slate-600 text-white border-none">
                  닫기
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
