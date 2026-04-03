"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ControlPanel() {
  return (
    <Card className="bg-[#1a2130] border-none shadow-xl w-64 shrink-0 rounded-none h-full">
      <CardContent className="p-4 space-y-6">
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase">표기 대상</h4>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="order" defaultChecked className="border-yellow-500 data-[state=checked]:bg-yellow-500" />
              <Label htmlFor="order" className="text-sm font-medium">오더</Label>
              <Input placeholder="워크오더 검색" className="h-7 text-xs bg-[#0f172a] border-none" />
            </div>
            
            <div className="flex items-center gap-2">
              <Checkbox id="person" defaultChecked className="border-green-500 data-[state=checked]:bg-green-500" />
              <Label htmlFor="person" className="text-sm font-medium">휴먼</Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-7 text-xs bg-[#0f172a] border-none">
                  <SelectValue placeholder="작업자 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">홍길동</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="robot" defaultChecked className="border-yellow-400 data-[state=checked]:bg-yellow-400" />
              <Label htmlFor="robot" className="text-sm font-medium">로봇</Label>
              <Select defaultValue="6">
                <SelectTrigger className="h-7 text-xs bg-[#0f172a] border-none">
                  <SelectValue placeholder="로봇 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 호기</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/5">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase">업무 구분</h4>
          <RadioGroup defaultValue="production" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="production" id="production" className="border-yellow-400 text-yellow-400" />
              <Label htmlFor="production" className="text-sm">생산</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" className="border-white/20" />
              <Label htmlFor="other" className="text-sm">기타</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-2 pt-6">
          <Button size="sm" variant="secondary" className="bg-white/10 text-white flex-1 text-xs">오늘</Button>
          <Button size="sm" variant="secondary" className="bg-white/10 text-white flex-1 text-xs">일정 추가</Button>
        </div>
      </CardContent>
    </Card>
  )
}
