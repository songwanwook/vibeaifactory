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
    <Card className="bg-[#1a2130] border-none shadow-xl w-64 shrink-0 rounded-none h-full border-r border-white/5">
      <CardContent className="p-4 space-y-6">
        <div className="space-y-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">표기 대상 설정</h4>
          
          <div className="space-y-5">
            {/* 오더 섹션 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="order" defaultChecked className="border-yellow-500 data-[state=checked]:bg-yellow-500" />
                <Label htmlFor="order" className="text-sm font-bold text-white">오더 (Order)</Label>
              </div>
              <Input 
                placeholder="워크오더 검색..." 
                className="h-8 text-xs bg-[#0f172a] border-white/10 focus-visible:ring-yellow-500" 
              />
            </div>
            
            {/* 휴먼 섹션 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="person" defaultChecked className="border-green-500 data-[state=checked]:bg-green-500" />
                <Label htmlFor="person" className="text-sm font-bold text-white">휴먼 (Human)</Label>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="h-8 text-xs bg-[#0f172a] border-white/10">
                  <SelectValue placeholder="작업자 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">홍길동 (작업 1팀)</SelectItem>
                  <SelectItem value="kim">김철수 (작업 2팀)</SelectItem>
                  <SelectItem value="lee">이영희 (품질팀)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 로봇 섹션 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="robot" defaultChecked className="border-yellow-400 data-[state=checked]:bg-yellow-400" />
                <Label htmlFor="robot" className="text-sm font-bold text-white">로봇 (Robot)</Label>
              </div>
              <Select defaultValue="6">
                <SelectTrigger className="h-8 text-xs bg-[#0f172a] border-white/10">
                  <SelectValue placeholder="로봇 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">Weld Robot 6호기</SelectItem>
                  <SelectItem value="7">Weld Robot 7호기</SelectItem>
                  <SelectItem value="8">Weld Robot 8호기</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">업무 구분</h4>
          <RadioGroup defaultValue="production" className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="production" id="production" className="border-yellow-400 text-yellow-400" />
              <Label htmlFor="production" className="text-sm text-white/90">생산 공정 (Production)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" className="border-white/20" />
              <Label htmlFor="other" className="text-sm text-white/90">기타/유지보수</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-2 pt-6">
          <div className="flex gap-2">
            <Button variant="secondary" className="bg-white/10 text-white flex-1 text-xs h-9 hover:bg-white/20">오늘</Button>
            <Button variant="secondary" className="bg-white/10 text-white flex-1 text-xs h-9 hover:bg-white/20">일정추가</Button>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-9">필터 적용</Button>
        </div>
      </CardContent>
    </Card>
  )
}
