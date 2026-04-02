"use client"

import * as React from "react"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { detectProductionAnomaly, type ProductionAnomalyDetectionOutput } from "@/ai/flows/ai-production-anomaly-detection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Loader2, AlertTriangle, CheckCircle, Info, Lightbulb } from "lucide-react"
import { REALTIME_PRODUCTION_DATA, HISTORICAL_PRODUCTION_DATA, EXPECTED_METRICS } from "@/lib/mock-data"

export default function AIPage() {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [result, setResult] = React.useState<ProductionAnomalyDetectionOutput | null>(null)

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true)
    try {
      const output = await detectProductionAnomaly({
        realtimeProductionData: JSON.stringify(REALTIME_PRODUCTION_DATA),
        historicalProductionData: JSON.stringify(HISTORICAL_PRODUCTION_DATA),
        expectedPerformanceMetrics: JSON.stringify(EXPECTED_METRICS)
      })
      setResult(output)
    } catch (error) {
      console.error("AI Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center px-6 border-b border-white/5">
          <SidebarTrigger className="mr-4" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Insight Engine</h2>
        </header>
        
        <main className="p-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                  WeldSense Anomaly Engine
                </h1>
                <p className="text-muted-foreground text-lg">Harness AI to predict bottlenecks and identify operational deviations.</p>
              </div>
              <Button 
                onClick={handleRunAnalysis} 
                disabled={isAnalyzing}
                className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 font-semibold rounded-xl"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Systems...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="mr-2 h-5 w-5" />
                    Run Anomaly Analysis
                  </>
                )}
              </Button>
            </div>

            {!result && !isAnalyzing && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-panel border-dashed border-white/10 bg-transparent text-center p-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Info className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Real-time Analysis</h3>
                  <p className="text-sm text-muted-foreground">Scans incoming sensor data for immediate production rate drops.</p>
                </Card>
                <Card className="glass-panel border-dashed border-white/10 bg-transparent text-center p-8">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Predictive Logic</h3>
                  <p className="text-sm text-muted-foreground">Uses historical patterns to forecast potential robot maintenance needs.</p>
                </Card>
                <Card className="glass-panel border-dashed border-white/10 bg-transparent text-center p-8">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="text-white/40" />
                  </div>
                  <h3 className="font-semibold mb-2">Deviation Alerts</h3>
                  <p className="text-sm text-muted-foreground">Compares current KPIs against expected performance baselines.</p>
                </Card>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                  <Loader2 className="w-20 h-20 text-primary animate-spin relative" />
                </div>
                <p className="mt-8 text-xl font-medium text-muted-foreground">AI is processing production data streams...</p>
              </div>
            )}

            {result && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                <Card className={`border-none shadow-2xl ${result.anomaliesDetected ? 'bg-destructive/10' : 'bg-accent/5'}`}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    {result.anomaliesDetected ? (
                      <div className="p-3 bg-destructive/20 rounded-full">
                        <AlertTriangle className="text-destructive h-8 w-8" />
                      </div>
                    ) : (
                      <div className="p-3 bg-accent/20 rounded-full">
                        <CheckCircle className="text-accent h-8 w-8" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-2xl">
                        {result.anomaliesDetected ? 'Anomalies Detected' : 'Systems Optimal'}
                      </CardTitle>
                      <CardDescription>
                        Analysis completed on {new Date().toLocaleTimeString()}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg leading-relaxed text-foreground/90">{result.anomalyDescription}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                      <div className="space-y-4">
                        <h4 className="flex items-center gap-2 font-bold text-accent">
                          <BrainCircuit size={18} /> Predicted Bottlenecks
                        </h4>
                        <ul className="space-y-2">
                          {result.predictedBottlenecks.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" /> {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="flex items-center gap-2 font-bold text-destructive">
                          <AlertTriangle size={18} /> Observed Deviations
                        </h4>
                        <ul className="space-y-2">
                          {result.deviations.map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" /> {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="glass-panel border-none shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">Actionable Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {result.insightsAndRecommendations.map((rec, i) => (
                          <li key={i} className="p-4 bg-secondary/30 rounded-lg border border-white/5 text-sm">
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="glass-panel border-none shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">Suggested Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {result.suggestedAlerts.map((alert, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-white/5">
                            <span className="text-sm font-medium">{alert.message}</span>
                            <Badge className={`
                              ${alert.severity === 'CRITICAL' ? 'bg-destructive text-white' : 
                                alert.severity === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-primary text-white'}
                            `}>
                              {alert.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}