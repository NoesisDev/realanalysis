import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { countries, getCountryBySlug } from '@/lib/data'
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  Percent,
  Building2,
  Landmark,
  BarChart3,
  Calculator,
  Globe2,
  Shield,
  ArrowLeft,
  FileText,
  Download,
  BookOpen,
  ClipboardList,
  ExternalLink,
  Check,
  Info
} from 'lucide-react'
import { MetricsChart } from '@/components/country/metrics-chart'
import { InvestmentCalculator } from '@/components/country/investment-calculator'

interface CountryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return countries.map((country) => ({
    slug: country.slug,
  }))
}

export async function generateMetadata({ params }: CountryPageProps) {
  const { slug } = await params
  const country = getCountryBySlug(slug)
  
  if (!country) {
    return { title: 'Country Not Found' }
  }

  return {
    title: `${country.name} Real Estate Investment Report | Propvest`,
    description: country.executiveSummary,
  }
}

export default async function CountryProfilePage({ params }: CountryPageProps) {
  const { slug } = await params
  const country = getCountryBySlug(slug)

  if (!country) {
    notFound()
  }

  const quickStats = [
    { label: 'Annual Return', value: `${(country.rentalYield + country.capitalAppreciation5Y / 5).toFixed(1)}%`, color: 'text-success' },
    { label: 'Rental Yield', value: `${country.rentalYield}%`, color: 'text-primary' },
    { label: 'Risk Level', value: country.capitalAppreciation5Y > 20 ? 'Medium' : country.capitalAppreciation5Y > 10 ? 'Low' : 'Low-Medium', color: 'text-accent' },
  ]

  const investmentSteps = [
    { step: 1, title: 'Research & Planning', timeline: '2-4 weeks', description: 'Understand the market, identify target areas, and set investment goals.' },
    { step: 2, title: 'Legal Setup', timeline: '1-2 weeks', description: 'Consult with local lawyers, understand regulations, set up necessary accounts.' },
    { step: 3, title: 'Find Property', timeline: '4-8 weeks', description: 'Work with local agents, visit properties, conduct initial due diligence.' },
    { step: 4, title: 'Due Diligence', timeline: '2-3 weeks', description: 'Legal checks, property inspection, title verification, neighborhood analysis.' },
    { step: 5, title: 'Make Offer', timeline: '1-2 weeks', description: 'Negotiate price, agree on terms, sign preliminary contract.' },
    { step: 6, title: 'Financing', timeline: '2-4 weeks', description: 'Arrange mortgage if needed, transfer funds, ensure compliance.' },
    { step: 7, title: 'Close Deal', timeline: '1-2 weeks', description: 'Sign final contract, pay remaining balance, transfer ownership.' },
    { step: 8, title: 'Property Management', timeline: 'Ongoing', description: 'Set up management, find tenants, handle maintenance.' },
  ]

  const resources = [
    { name: 'Local Real Estate Portals', type: 'Website', description: 'Major property listing websites' },
    { name: 'Legal Resources', type: 'Service', description: 'Recommended law firms specializing in real estate' },
    { name: 'Financing Options', type: 'Service', description: 'Banks offering mortgages to foreign investors' },
    { name: 'Property Management', type: 'Service', description: 'Recommended property management companies' },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
            <Link 
              href="/countries" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Countries
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              {/* Left: Country Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <span className="text-6xl">{country.flag}</span>
                  <div>
                    <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                      {country.name}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{country.region}</Badge>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {country.investmentCategory}
                      </Badge>
                      {country.badges.map((badge) => (
                        <Badge 
                          key={badge} 
                          className="bg-secondary/10 text-secondary border-secondary/20"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-6 flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(country.investmentRating)
                          ? 'fill-secondary text-secondary'
                          : i < country.investmentRating
                          ? 'fill-secondary/50 text-secondary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-semibold font-mono">
                    {country.investmentRating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">/ 5.0 Investment Rating</span>
                </div>

                {/* Quick Stats Cards */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-card border border-border p-4 text-center">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    Add to Portfolio
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Right: Sticky Sidebar Card */}
              <Card className="w-full lg:w-80 shrink-0 border-2 border-primary/20 lg:sticky lg:top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Full Investment Report</CardTitle>
                  <CardDescription>
                    Complete analysis with 100+ metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Return</span>
                      <span className="font-mono font-semibold text-success">{(country.rentalYield + country.capitalAppreciation5Y / 5).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rental Yield</span>
                      <span className="font-mono font-semibold">{country.rentalYield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Risk Level</span>
                      <Badge variant="secondary" className="text-xs">Low-Medium</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Health</span>
                      <span className="font-mono font-semibold">{Math.round(country.investmentRating * 20)}/100</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold font-mono text-foreground">$79</span>
                      <span className="text-muted-foreground"> one-time</span>
                    </div>
                    <Link href={`/checkout?country=${country.slug}`}>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        View Full Report
                      </Button>
                    </Link>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Upgrade to see complete analysis
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tab Navigation & Content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto flex-nowrap mb-8 bg-muted/50">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="market" className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4" />
                  Market
                </TabsTrigger>
                <TabsTrigger value="returns" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Returns
                </TabsTrigger>
                <TabsTrigger value="tax" className="flex items-center gap-2">
                  <Landmark className="h-4 w-4" />
                  Tax & Legal
                </TabsTrigger>
                <TabsTrigger value="process" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Investment Process
                </TabsTrigger>
                <TabsTrigger value="calculators" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Calculators
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Resources
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: Overview */}
              <TabsContent value="overview" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Country Overview</CardTitle>
                        <CardDescription>Quick introduction to investing in {country.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {country.executiveSummary}
                        </p>
                        <h4 className="font-semibold text-foreground mb-3">Why Invest Here?</h4>
                        <ul className="flex flex-col gap-2 mb-6">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">Strong rental yields averaging {country.rentalYield}% annually</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{country.foreignOwnershipRestrictions === 'None' ? 'No restrictions on foreign ownership' : `${country.foreignOwnershipRestrictions} foreign ownership restrictions`}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">Stable economy with {country.gdpGrowth}% GDP growth</span>
                          </li>
                        </ul>
                        <h4 className="font-semibold text-foreground mb-3">Quick Facts</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Region</span>
                            <span className="font-medium">{country.region}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Currency</span>
                            <span className="font-medium">{country.currency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Population Growth</span>
                            <span className="font-medium">{country.populationGrowth}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Market Category</span>
                            <span className="font-medium">{country.investmentCategory}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Best For</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-4">
                        <div className="rounded-lg bg-success/10 p-3">
                          <p className="font-semibold text-success text-sm">Rental Income</p>
                          <p className="text-xs text-muted-foreground mt-1">Strong rental yields and tenant demand</p>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-3">
                          <p className="font-semibold text-primary text-sm">Capital Growth</p>
                          <p className="text-xs text-muted-foreground mt-1">{country.capitalAppreciation5Y}% appreciation over 5 years</p>
                        </div>
                        <div className="rounded-lg bg-secondary/10 p-3">
                          <p className="font-semibold text-secondary text-sm">Beginners</p>
                          <p className="text-xs text-muted-foreground mt-1">Accessible market with good support</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 2: Market */}
              <TabsContent value="market" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Economic Indicators</CardTitle>
                      <CardDescription>Key economic metrics for {country.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">GDP Growth</span>
                          <span className="font-mono font-semibold text-success">{country.gdpGrowth}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Inflation Rate</span>
                          <span className="font-mono font-semibold">{country.inflationRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Currency Stability</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-success rounded-full" 
                                style={{ width: `${country.currencyStability * 100}%` }}
                              />
                            </div>
                            <span className="font-mono text-sm">{Math.round(country.currencyStability * 100)}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Population Growth</span>
                          <span className="font-mono font-semibold">{country.populationGrowth}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Real Estate Market</CardTitle>
                      <CardDescription>Property market conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Price Trend (5Y)</span>
                          <span className={`font-mono font-semibold ${country.capitalAppreciation5Y >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {country.capitalAppreciation5Y >= 0 ? '+' : ''}{country.capitalAppreciation5Y}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Price-to-Rent Ratio</span>
                          <span className="font-mono font-semibold">{country.priceToRentRatio}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Mortgage Availability</span>
                          <Badge variant="secondary">{country.mortgageAvailability}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Market Health Score</span>
                          <span className="font-mono font-semibold text-primary">{Math.round(country.investmentRating * 20)}/100</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Price Trends</CardTitle>
                      <CardDescription>Historical property price performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricsChart country={country} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* TAB 3: Returns */}
              <TabsContent value="returns" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Return Metrics</CardTitle>
                      <CardDescription>Investment return breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="rounded-lg bg-muted/50 p-4 text-center">
                          <p className="text-sm text-muted-foreground">Annual Return</p>
                          <p className="text-2xl font-bold font-mono text-success">
                            {(country.rentalYield + country.capitalAppreciation5Y / 5).toFixed(1)}%
                          </p>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-4 text-center">
                          <p className="text-sm text-muted-foreground">5-Year Projection</p>
                          <p className="text-2xl font-bold font-mono text-primary">
                            +{(country.rentalYield * 5 + country.capitalAppreciation5Y).toFixed(0)}%
                          </p>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-4 text-center">
                          <p className="text-sm text-muted-foreground">10-Year Projection</p>
                          <p className="text-2xl font-bold font-mono text-primary">
                            +{(country.rentalYield * 10 + country.capitalAppreciation5Y * 2).toFixed(0)}%
                          </p>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-4 text-center">
                          <p className="text-sm text-muted-foreground">Best Case</p>
                          <p className="text-2xl font-bold font-mono text-secondary">
                            +{((country.rentalYield + country.capitalAppreciation5Y / 5) * 1.3).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <h4 className="font-semibold text-foreground mb-3">Return Breakdown</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Rental Income</span>
                          <span className="font-mono font-semibold">{country.rentalYield}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Capital Appreciation</span>
                          <span className="font-mono font-semibold">{(country.capitalAppreciation5Y / 5).toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Historical Performance</CardTitle>
                      <CardDescription>10-year return history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricsChart country={country} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* TAB 4: Tax & Legal */}
              <TabsContent value="tax" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tax Rates</CardTitle>
                      <CardDescription>Tax obligations for investors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Property Tax (Annual)</span>
                          <span className="font-mono font-semibold">{country.propertyTaxRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Capital Gains Tax</span>
                          <span className="font-mono font-semibold">{Math.round(country.rentalIncomeTax * 0.8)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Rental Income Tax</span>
                          <span className="font-mono font-semibold">{country.rentalIncomeTax}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Transaction Costs</span>
                          <span className="font-mono font-semibold">{country.transactionCosts}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Legal Requirements</CardTitle>
                      <CardDescription>Ownership and regulatory framework</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Foreign Ownership</span>
                          <Badge variant={country.foreignOwnershipRestrictions === 'None' ? 'default' : 'secondary'} 
                                 className={country.foreignOwnershipRestrictions === 'None' ? 'bg-success text-success-foreground' : ''}>
                            {country.foreignOwnershipRestrictions === 'None' ? 'Allowed' : country.foreignOwnershipRestrictions}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Visa Requirements</span>
                          <Badge variant="secondary">Tourist Visa</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Residency Required</span>
                          <Badge variant="secondary">No</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Golden Visa Available</span>
                          <Badge variant="secondary">{country.region === 'Europe' ? 'Yes' : 'Varies'}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Transaction Cost Breakdown</CardTitle>
                      <CardDescription>One-time costs when purchasing property</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-4">
                        <div className="rounded-lg border border-border p-4 text-center">
                          <p className="text-sm text-muted-foreground">Stamp Duty</p>
                          <p className="text-xl font-bold font-mono">{(country.transactionCosts * 0.5).toFixed(1)}%</p>
                        </div>
                        <div className="rounded-lg border border-border p-4 text-center">
                          <p className="text-sm text-muted-foreground">Legal Fees</p>
                          <p className="text-xl font-bold font-mono">{(country.transactionCosts * 0.3).toFixed(1)}%</p>
                        </div>
                        <div className="rounded-lg border border-border p-4 text-center">
                          <p className="text-sm text-muted-foreground">Registration</p>
                          <p className="text-xl font-bold font-mono">{(country.transactionCosts * 0.2).toFixed(1)}%</p>
                        </div>
                        <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 text-center">
                          <p className="text-sm text-primary">Total</p>
                          <p className="text-xl font-bold font-mono text-primary">{country.transactionCosts}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* TAB 5: Investment Process */}
              <TabsContent value="process" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Step-by-Step Investment Guide</CardTitle>
                    <CardDescription>Complete process for investing in {country.name} real estate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      {investmentSteps.map((step, index) => (
                        <div key={step.step} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                              {step.step}
                            </div>
                            {index < investmentSteps.length - 1 && (
                              <div className="w-0.5 flex-1 bg-border mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-foreground">{step.title}</h4>
                              <Badge variant="outline" className="text-xs">{step.timeline}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 rounded-lg bg-muted/50 p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Total Estimated Timeline:</strong> 3-6 months from research to closing
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB 6: Calculators */}
              <TabsContent value="calculators" className="mt-0">
                <InvestmentCalculator country={country} />
              </TabsContent>

              {/* TAB 7: Resources */}
              <TabsContent value="resources" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Resources</CardTitle>
                      <CardDescription>Helpful resources for investing in {country.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        {resources.map((resource) => (
                          <div key={resource.name} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                            <ExternalLink className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground">{resource.name}</p>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                              <Badge variant="outline" className="mt-2 text-xs">{resource.type}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Download Templates</CardTitle>
                      <CardDescription>Helpful documents and checklists</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-3">
                        <Button variant="outline" className="justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          Investment Checklist
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          Legal Document Templates
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          Financial Analysis Template
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          Due Diligence Checklist
                        </Button>
                      </div>
                      <div className="mt-6 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-secondary">Pro Tip:</strong> Download all templates before starting your investment journey to stay organized.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
