'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { countries } from '@/lib/data'
import {
  FileText,
  Heart,
  Settings,
  LogOut,
  Download,
  Eye,
  Share2,
  Star,
  Clock,
  User,
  CreditCard,
  Bell,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react'

interface UserData {
  email: string
  name: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)

  // Mock purchased reports
  const purchasedReports = countries.slice(0, 3)
  const favorites = countries.slice(2, 5)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link href="/">
              <Logo size="sm" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/reports"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <FileText className="h-5 w-5" />
                  My Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/favorites"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Heart className="h-5 w-5" />
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Section */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </header>

        <div className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p className="mt-1 text-muted-foreground">
              Access your investment reports and saved countries
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono">{purchasedReports.length}</p>
                    <p className="text-sm text-muted-foreground">Reports Purchased</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono">{favorites.length}</p>
                    <p className="text-sm text-muted-foreground">Saved Favorites</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                    <Clock className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono">30</p>
                    <p className="text-sm text-muted-foreground">Days Until Renewal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="reports">
            <TabsList>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                My Reports
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Reports Tab */}
            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Purchased Reports</CardTitle>
                  <CardDescription>
                    Access your investment reports and download documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {purchasedReports.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {purchasedReports.map((country) => (
                        <div
                          key={country.id}
                          className="flex items-center justify-between rounded-lg border border-border p-4"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-3xl">{country.flag}</span>
                            <div>
                              <h3 className="font-semibold">{country.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Purchased Mar 15, 2026
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/reports/${country.slug}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              PDF
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold">No reports yet</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Purchase your first investment report to get started
                      </p>
                      <Button asChild className="mt-4">
                        <Link href="/countries">Browse Countries</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Countries</CardTitle>
                  <CardDescription>
                    Countries you're interested in for future investment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favorites.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {favorites.map((country) => (
                        <Link
                          key={country.id}
                          href={`/countries/${country.slug}`}
                          className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
                        >
                          <span className="text-3xl">{country.flag}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold">{country.name}</h3>
                            <div className="flex items-center gap-1 mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(country.investmentRating)
                                      ? 'fill-accent text-accent'
                                      : 'fill-muted text-muted'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold">No favorites yet</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Save countries you're interested in for quick access
                      </p>
                      <Button asChild className="mt-4">
                        <Link href="/countries">Explore Countries</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Name</label>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Email</label>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <Button variant="outline" className="w-fit">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">No payment methods saved</p>
                    <Button variant="outline" className="mt-4">
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new reports
                        </p>
                      </div>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Price alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about market changes
                        </p>
                      </div>
                      <Badge variant="outline">Disabled</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
