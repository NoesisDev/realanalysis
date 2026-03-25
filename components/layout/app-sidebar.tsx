'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  LayoutDashboard,
  Globe,
  Briefcase,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
} from 'lucide-react'

interface AppSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Countries',
    href: '/countries',
    icon: Globe,
    children: [
      { title: 'USA', href: '/countries/usa', flag: '🇺🇸' },
      { title: 'Spain', href: '/countries/spain', flag: '🇪🇸' },
      { title: 'Italy', href: '/countries/italy', flag: '🇮🇹' },
      { title: 'UK', href: '/countries/uk', flag: '🇬🇧' },
      { title: 'UAE', href: '/countries/uae', flag: '🇦🇪' },
    ],
  },
  {
    title: 'Portfolio',
    href: '/portfolio',
    icon: Briefcase,
  },
  {
    title: 'Saved Reports',
    href: '/reports',
    icon: FileText,
  },
]

const bottomNavItems = [
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Help & Resources',
    href: '/help',
    icon: HelpCircle,
  },
]

export function AppSidebar({ isOpen, onToggle }: AppSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Countries'])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out',
          isOpen ? 'w-[280px]' : 'w-[60px]'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Toggle Button */}
          <div className="flex justify-end p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {isOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-2">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.title}>
                  {item.children ? (
                    <>
                      {isOpen ? (
                        <button
                          onClick={() => toggleExpanded(item.title)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            isActive(item.href)
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                              : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span className="flex-1 text-left">{item.title}</span>
                          <ChevronRight
                            className={cn(
                              'h-4 w-4 transition-transform',
                              expandedItems.includes(item.title) && 'rotate-90'
                            )}
                          />
                        </button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                'flex items-center justify-center rounded-lg p-2.5 transition-colors',
                                isActive(item.href)
                                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                              )}
                            >
                              <item.icon className="h-5 w-5" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      )}

                      {/* Children */}
                      {isOpen && expandedItems.includes(item.title) && (
                        <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-sidebar-border pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                                pathname === child.href
                                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                  : 'text-sidebar-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                              )}
                            >
                              <span>{child.flag}</span>
                              <span>{child.title}</span>
                            </Link>
                          ))}
                          <Link
                            href="/countries"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                          >
                            <Flag className="h-4 w-4" />
                            <span>View All</span>
                          </Link>
                        </div>
                      )}
                    </>
                  ) : isOpen ? (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-center rounded-lg p-2.5 transition-colors',
                            isActive(item.href)
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                              : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* Bottom Navigation */}
          <div className="border-t border-sidebar-border p-2">
            <nav className="flex flex-col gap-1">
              {bottomNavItems.map((item) =>
                isOpen ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center justify-center rounded-lg p-2.5 transition-colors',
                          isActive(item.href)
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                )
              )}
            </nav>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
