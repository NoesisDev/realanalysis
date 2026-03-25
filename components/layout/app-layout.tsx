'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AppHeader } from './app-header'
import { AppSidebar } from './app-sidebar'
import { Sheet, SheetContent } from '@/components/ui/sheet'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader 
        onMenuClick={() => setMobileSidebarOpen(true)} 
        showMenuButton 
      />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0 bg-sidebar">
          <AppSidebar isOpen={true} onToggle={() => {}} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main
        className={cn(
          'min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out pt-4 px-4 pb-8 lg:px-6',
          sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[60px]'
        )}
      >
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}
