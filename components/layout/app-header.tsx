'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Logo } from '@/components/brand/logo'
import { Search, Bell, User, Settings, LogOut, Menu } from 'lucide-react'

interface AppHeaderProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export function AppHeader({ onMenuClick, showMenuButton = false }: AppHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock user state - replace with real auth
  const isAuthenticated = false
  const user = { name: 'John Doe', email: 'john@example.com' }

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-card">
      <div className="flex h-full items-center justify-between gap-4 px-4 lg:px-6">
        {/* Left Section: Menu Button + Logo */}
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>
        </div>

        {/* Center Section: Search */}
        <div className="hidden flex-1 max-w-xl mx-4 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search countries, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-muted border-0"
            />
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-secondary text-[10px] font-medium text-secondary-foreground flex items-center justify-center">
                      3
                    </span>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">New report available</span>
                      <span className="text-sm text-muted-foreground">Spain Q4 2025 report is now available</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Portfolio update</span>
                      <span className="text-sm text-muted-foreground">Your portfolio value increased by 2.3%</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-sm font-normal text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
