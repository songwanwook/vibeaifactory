import type {Metadata} from 'next';
import './globals.css';
import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: 'WeldSense AI Dashboard',
  description: 'Industrial AI-powered welding production monitoring and optimization.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent/30 overflow-hidden">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="bg-background flex flex-col h-screen overflow-hidden">
              <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <div className="h-6 w-px bg-white/10" />
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Operational Dashboard</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-medium text-accent">System Online</span>
                  </div>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}