"use client"

import React, { useState, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Info, Calendar as CalendarIcon, Clock, User, Cpu, Tag, Briefcase, Loader2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  format, 
  addMonths, 
  subMonths, 
  addDays,
  subDays,
  addHours,
  subHours,
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  isWithinInterval,
  parseISO,
  differenceInDays,
  setHours,
  setMinutes,
  startOfHour
} from "date-fns"
import { ko } from "date-fns/locale"

interface ProductionCalendarProps {
  filterType: 'all' | 'production' | 'other';
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  onAddEventSuccess: () => void;
}

// 시간 옵션 생성 (00:00 ~ 23:30, 30분 단위)
const TIME_OPTIONS = Array.from({ length: 48 }).map((_, i) => {
  const hour = Math.floor(i / 2).toString().padStart(2, '0');
  const minute = (i % 2 === 0 ? '00' : '30');
  return `${hour}:${minute}`;
});

export const ProductionCalendar = forwardRef<any, ProductionCalendarProps>(
  ({ filterType, currentDate, setCurrentDate, isAddDialogOpen, setIsAddDialogOpen, onAddEventSuccess }, ref) => {
    const [viewType, setViewType] = useState<'monthly' | 'weekly' | 'daily'>('monthly');
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    
    // 일정 추가 관련 상태
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // 초기 시간 설정 (내일 오전 9시 기본)
    const initialStart = startOfHour(addHours(new Date(), 1));
    const initialEnd = addHours(initialStart, 1);

    const [formData, setFormData] = useState({
      title: '',
      startDate: format(initialStart, "yyyy-MM-dd"),
      startTime: format(initialStart, "HH:mm"),
      endDate: format(initialEnd, "yyyy-MM-dd"),
      endTime: format(initialEnd, "HH:mm"),
      ev_type: 'HUMAN',
      category: '업무',
      color: '#2e86de',
      memo: ''
    });

    // DB에서 일정 데이터 페칭
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/schedule-events');
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((ev: any) => ({
            ...ev,
            start: typeof ev.start === 'string' ? ev.start : format(new Date(ev.start), "yyyy-MM-dd HH:mm:ss"),
            end: typeof ev.end === 'string' ? ev.end : format(new Date(ev.end), "yyyy-MM-dd HH:mm:ss")
          }));
          setEvents(formattedData);
        }
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    // 외부에서 호출 가능하도록 노출
    useImperativeHandle(ref, () => ({
      refresh: fetchEvents
    }));

    useEffect(() => {
      fetchEvents();
    }, []);

    const resetFormData = () => {
      const resetStart = startOfHour(addHours(new Date(), 1));
      const resetEnd = addHours(resetStart, 1);
      setFormData({
        title: '',
        startDate: format(resetStart, "yyyy-MM-dd"),
        startTime: format(resetStart, "HH:mm"),
        endDate: format(resetEnd, "yyyy-MM-dd"),
        endTime: format(resetEnd, "HH:mm"),
        ev_type: 'HUMAN',
        category: '업무',
        color: '#2e86de',
        memo: ''
      });
      setIsEditMode(false);
    };

    const handleInputChange = (field: string, value: string) => {
      setFormData(prev => {
        let newData = { ...prev, [field]: value };
        
        // 날짜와 시간을 조합하여 Date 객체 생성 유틸리티
        const getFullDate = (dateStr: string, timeStr: string) => {
          const [y, m, d] = dateStr.split('-').map(Number);
          const [hh, mm] = timeStr.split(':').map(Number);
          return new Date(y, m - 1, d, hh, mm);
        };

        // 시작 일시 변경 시 종료 일시 자동 조정
        if (field === 'startDate' || field === 'startTime') {
          const startFull = getFullDate(newData.startDate, newData.startTime);
          const endFull = getFullDate(newData.endDate, newData.endTime);
          
          if (endFull <= startFull) {
            const newEndFull = addHours(startFull, 1);
            newData.endDate = format(newEndFull, "yyyy-MM-dd");
            newData.endTime = format(newEndFull, "HH:mm");
          }
        }

        // 종료 일시 변경 시 시작 일시 체크 (역전 방지)
        if (field === 'endDate' || field === 'endTime') {
          const startFull = getFullDate(newData.startDate, newData.startTime);
          const endFull = getFullDate(newData.endDate, newData.endTime);
          
          if (endFull <= startFull) {
            const newStartFull = subHours(endFull, 1);
            newData.startDate = format(newStartFull, "yyyy-MM-dd");
            newData.startTime = format(newStartFull, "HH:mm");
          }
        }
        
        // ev_type 변경 시 자동 색상 변경 및 카테고리 처리
        if (field === 'ev_type') {
          if (value === 'ROBOT') {
            newData.color = '#8e44ad';
            newData.category = '';
          } else {
            newData.color = '#2e86de'; // 기본 생산색상
            newData.category = '업무';
          }
        }
        
        // 색상 변경에 따른 업무 구분 처리 (임의)
        if (field === 'color') {
          if (value === '#8e44ad') newData.ev_type = 'ROBOT';
          else newData.ev_type = 'HUMAN';
        }

        return newData;
      });
    };

    const handleAddEvent = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        const [sy, sm, sd] = formData.startDate.split('-').map(Number);
        const [sh, smin] = formData.startTime.split(':').map(Number);
        const [ey, em, ed] = formData.endDate.split('-').map(Number);
        const [eh, emin] = formData.endTime.split(':').map(Number);
        
        const startDt = new Date(sy, sm - 1, sd, sh, smin);
        const endDt = new Date(ey, em - 1, ed, eh, emin);

        const submitData: any = {
          title: formData.title,
          start: format(startDt, "yyyy-MM-dd HH:mm:ss"),
          end: format(endDt, "yyyy-MM-dd HH:mm:ss"),
          ev_type: formData.ev_type,
          category: formData.category,
          color: formData.color,
          memo: formData.memo
        };

        if (isEditMode && selectedEvent) {
          submitData.id = selectedEvent.id;
          const response = await fetch('/api/schedule-events', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitData)
          });
          if (response.ok) {
            setIsAddDialogOpen(false);
            resetFormData();
            fetchEvents();
            onAddEventSuccess();
          }
        } else {
          const response = await fetch('/api/schedule-events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitData)
          });
          if (response.ok) {
            setIsAddDialogOpen(false);
            resetFormData();
            fetchEvents();
            onAddEventSuccess();
          }
        }
      } catch (error) {
        console.error('Failed to process event:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleDeleteEvent = async () => {
      if (!selectedEvent || !confirm('이 일정을 삭제하시겠습니까?')) return;
      
      try {
        const response = await fetch(`/api/schedule-events?id=${selectedEvent.id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setSelectedEvent(null);
          fetchEvents();
          onAddEventSuccess();
        }
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    };

    const openEditDialog = () => {
      if (!selectedEvent) return;
      
      const start = parseISO(selectedEvent.start);
      const end = parseISO(selectedEvent.end);
      
      setFormData({
        title: selectedEvent.title,
        startDate: format(start, "yyyy-MM-dd"),
        startTime: format(start, "HH:mm"),
        endDate: format(end, "yyyy-MM-dd"),
        endTime: format(end, "HH:mm"),
        ev_type: selectedEvent.ev_type,
        category: selectedEvent.category || '업무',
        color: selectedEvent.color || '#2e86de',
        memo: selectedEvent.memo || ''
      });
      
      setIsEditMode(true);
      setSelectedEvent(null);
      setIsAddDialogOpen(true);
    };

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
      if (filterType === 'all') return events;
      return events.filter(event => getWorkClassification(event.color) === filterType);
    }, [filterType, events]);

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
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" onClick={next}>
                <ChevronRight size={16} />
              </Button>
            </div>
            <CardTitle className="text-xl font-bold text-sky-400">
              {format(currentDate, getFormatString(), { locale: ko })}
            </CardTitle>
          </div>
          
          <div className="flex items-center gap-3">
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
            "grid h-full bg-[#334155] overflow-y-auto relative",
            viewType === 'monthly' ? "grid-cols-7 grid-rows-5" : 
            viewType === 'weekly' ? "grid-cols-7" : "grid-cols-1"
          )}>
            {loading && (
              <div className="absolute inset-0 bg-[#334155]/50 z-50 flex items-center justify-center backdrop-blur-[1px]">
                <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
              </div>
            )}

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
                  viewType === 'monthly' ? "min-h-[100px]" : "min-h-[300px]",
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
                            "h-6 text-[11px] px-2 flex items-center text-white shadow-sm relative cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all",
                            viewType === 'monthly' || viewType === 'weekly' ? (
                              cn(
                                isStart ? "ml-1 rounded-l-sm" : "-ml-[1px] border-l-0 rounded-l-none",
                                isEnd ? "mr-1 rounded-r-sm" : "-mr-[1px] border-r-0 rounded-r-none",
                                showTitle ? "z-20" : "z-10",
                                isEnd ? "overflow-hidden" : "overflow-visible"
                              )
                            ) : "mx-1 rounded-sm z-10 overflow-hidden"
                          )}
                          style={{ backgroundColor: event.color }}
                          title={event.title}
                        >
                          {showTitle && (
                            <span className={cn(
                              "truncate pointer-events-none z-30 block w-full",
                              viewType === 'daily' ? "" : "whitespace-nowrap"
                            )}>
                              {event.title}
                              {viewType === 'daily' && !event.all_day && ` [${format(start, "HH:mm")} - ${format(end, "HH:mm")}]`}
                            </span>
                          )}
                          {!isStart && !showTitle && (viewType === 'monthly' || viewType === 'weekly') && <span className="sr-only">(계속)</span>}
                          {!isStart && !showTitle && viewType === 'daily' && <span className="text-[9px] opacity-70 ml-1 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">(계속)</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>

        {/* 일정 추가 다이얼로그 */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
            <form onSubmit={handleAddEvent}>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-sky-400 flex items-center gap-2">
                  <Plus className="w-5 h-5" /> 새 일정 추가
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  중앙 달력에 표시될 새로운 일정을 등록합니다.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs font-bold text-slate-400 uppercase">일정 제목</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-[#0f172a] border-white/10 text-white h-9" 
                    placeholder="제목을 입력하세요"
                    required
                  />
                </div>

                {/* 시작 일시 선택 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400 uppercase">시작 날짜</Label>
                    <Input 
                      type="date" 
                      value={formData.startDate} 
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="h-9 bg-[#0f172a] border-white/10 text-xs text-white [color-scheme:dark]" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400 uppercase">시작 시간</Label>
                    <Select 
                      value={formData.startTime} 
                      onValueChange={(val) => handleInputChange('startTime', val)}
                    >
                      <SelectTrigger className="bg-[#0f172a] border-white/10 text-white h-9">
                        <Clock className="mr-2 h-4 w-4 text-emerald-400" />
                        <SelectValue placeholder="시간 선택" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] border-white/10 text-white max-h-60">
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={`start-${time}`} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 종료 일시 선택 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400 uppercase">종료 날짜</Label>
                    <Input 
                      type="date" 
                      value={formData.endDate} 
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="h-9 bg-[#0f172a] border-white/10 text-xs text-white [color-scheme:dark]" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400 uppercase">종료 시간</Label>
                    <Select 
                      value={formData.endTime} 
                      onValueChange={(val) => handleInputChange('endTime', val)}
                    >
                      <SelectTrigger className="bg-[#0f172a] border-white/10 text-white h-9">
                        <Clock className="mr-2 h-4 w-4 text-rose-400" />
                        <SelectValue placeholder="시간 선택" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] border-white/10 text-white max-h-60">
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={`end-${time}`} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ev_type" className="text-xs font-bold text-slate-400 uppercase">작업 주체</Label>
                    <Select 
                      value={formData.ev_type} 
                      onValueChange={(val) => handleInputChange('ev_type', val)}
                    >
                      <SelectTrigger className="bg-[#0f172a] border-white/10 text-white h-9">
                        <SelectValue placeholder="주체 선택" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] border-white/10 text-white">
                        <SelectItem value="HUMAN">인력 작업</SelectItem>
                        <SelectItem value="ROBOT">로봇 작업</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-xs font-bold text-slate-400 uppercase">카테고리</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(val) => handleInputChange('category', val)}
                      disabled={formData.ev_type === 'ROBOT'}
                    >
                      <SelectTrigger className="bg-[#0f172a] border-white/10 text-white h-9">
                        <SelectValue placeholder="카테고리" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] border-white/10 text-white">
                        <SelectItem value="업무">업무</SelectItem>
                        <SelectItem value="개인">개인</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color" className="text-xs font-bold text-slate-400 uppercase">업무 구분 (색상)</Label>
                  <Select 
                    value={formData.color} 
                    onValueChange={(val) => handleInputChange('color', val)}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-white/10 text-white h-9">
                      <SelectValue placeholder="구분 선택" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e293b] border-white/10 text-white">
                      <SelectItem value="#2e86de"><span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#2e86de]" /> 생산</span></SelectItem>
                      <SelectItem value="#27ae60"><span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#27ae60]" /> 기타</span></SelectItem>
                      <SelectItem value="#8e44ad"><span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#8e44ad]" /> 로봇</span></SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memo" className="text-xs font-bold text-slate-400 uppercase">상세 내용 (메모)</Label>
                  <Textarea 
                    id="memo" 
                    value={formData.memo} 
                    onChange={(e) => handleInputChange('memo', e.target.value)}
                    className="bg-[#0f172a] border-white/10 text-white min-h-[80px]" 
                    placeholder="추가 메모 사항을 입력하세요"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="text-slate-400 hover:bg-white/5"
                >
                  취소
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-sky-600 hover:bg-sky-500 text-white px-8"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : '등록 완료'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* 상세 보기 다이얼로그 */}
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

                  {selectedEvent.memo && (
                    <div className="flex items-start gap-3 border-t border-white/5 pt-3">
                      <Info className="w-4 h-4 text-slate-400 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">상세 내용</p>
                        <p className="text-sm text-slate-300">{selectedEvent.memo}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteEvent}
                    className="h-9 px-4 text-xs bg-rose-600 hover:bg-rose-700"
                  >
                    삭제
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      onClick={openEditDialog}
                      className="h-9 px-4 text-xs bg-amber-600 hover:bg-amber-700 text-white border-none"
                    >
                      수정
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => setSelectedEvent(null)} 
                      className="h-9 px-4 text-xs bg-slate-700 hover:bg-slate-600 text-white border-none"
                    >
                      닫기
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Card>
    )
  }
)

ProductionCalendar.displayName = 'ProductionCalendar'
