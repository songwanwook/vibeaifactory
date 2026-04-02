"use client"

import * as React from "react"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CALENDAR_EVENTS } from "@/lib/mock-data"
import { format } from "date-fns"
import { Plus, Filter, Users, CalendarDays, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center px-6 border-b border-white/5">
          <SidebarTrigger className="mr-4" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Production Schedule</h2>
        </header>
        
        <main className="p-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Interactive Calendar</h1>
                <p className="text-muted-foreground mt-1">Plan and coordinate welding tasks and system maintenance.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2 bg-secondary border-white/5">
                  <Filter size={16} /> Filter
                </Button>
                <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus size={16} /> New Schedule
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <Card className="lg:col-span-5 glass-panel border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="text-primary" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-0 pb-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-none"
                    classNames={{
                      day_selected: "bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent/20 text-accent font-bold",
                    }}
                  />
                </CardContent>
              </Card>

              <div className="lg:col-span-7 space-y-6">
                <Card className="glass-panel border-none shadow-xl h-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Schedule for {date ? format(date, 'MMMM d, yyyy') : 'Selected Day'}</CardTitle>
                    <Badge variant="outline" className="border-white/10">{CALENDAR_EVENTS.length} Events</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {CALENDAR_EVENTS.map((event, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-secondary/40 rounded-xl border border-white/5 group hover:bg-secondary/60 transition-colors">
                          <div className={`
                            p-3 rounded-lg 
                            ${event.type === 'production' ? 'bg-primary/15 text-primary' : 
                              event.type === 'maintenance' ? 'bg-destructive/15 text-destructive' : 'bg-accent/15 text-accent'}
                          `}>
                            {event.type === 'production' ? <Package size={20} /> : 
                             event.type === 'maintenance' ? <Users size={20} /> : <Users size={20} />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-semibold text-lg">{event.title}</h4>
                              <span className="text-xs text-muted-foreground">08:00 AM - 04:00 PM</span>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-[10px] uppercase border-white/10">{event.type}</Badge>
                              <Badge variant="outline" className="text-[10px] uppercase border-white/10">Active Shift</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                      {CALENDAR_EVENTS.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <p>No events scheduled for this day.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}