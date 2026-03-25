import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { countries, getCountryBySlug } from '@/lib/data'
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Printer,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe2,
  Shield,
  Building2,
  Landmark,
  Calculator,
  Clock,
  FileText
} from 'lucide-react'

interface ReportPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return countries.map((country) => ({
    slug: country.slug,
  }))
}

export async function generateMetadata({ params }: ReportPageProps) {
  const { slug } = await params
  const country = getCountryBySlug(slug)
  
  if (!country) {
    return { title: 'Report Not Found' }
  }

  return {
    title: `${country.name} Full Investment Report | Propvest`,
    description: `Complete investment analysis for ${country.name} real estate market.`,
  }
}

export default async function FullReportPage({ params }: ReportPageProps) {
  const { slug } = await params
  const country = getCountryBySlug(slug)

  if (!country) {
    notFound()
  }

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const tableOfContents = [
    { id: 'summary', title: 'Executive Summary' },
    { id: 'metrics', title: 'Key Investment Metrics' },
    { id: 'rental', title: 'Rental Market Analysis' },
    { id: 'tax', title: 'Tax & Legal Framework' },
    { id: 'performance', title: 'Market Performance' },
    { id: 'costs', title: 'Management & Costs' },
    { id: 'scenarios', title: 'Investment Scenarios' },
    { id: 'recommendations', title: 'Recommendations' },
    { id: 'methodology', title: 'Data Sources & Methodology' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Report Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex gap-8">
          {/* Table of Contents - Desktop */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Table of Contents</h3>
              <nav>
                <ul className="flex flex-col gap-2">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Report Content */}
          <main className="flex-1 max-w-4xl">
            {/* Report Cover */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center justify-center">
                <Logo size="md" />
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-4">
                <span className="text-8xl">{country.flag}</span>
              </div>
              
              <h1 className="mt-6 font-serif text-4xl font-bold text-foreground">
                {country.name}
              </h1>
              <h2 className="mt-2 text-xl text-muted-foreground">
                Real Estate Investment Report
              </h2>
              
              <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
                <Badge variant="outline">{country.region}</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {country.investmentCategory}
                </Badge>
                {country.badges.map((badge) => (
                  <Badge key={badge} className="bg-accent/10 text-accent border-accent/20">
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(country.investmentRating)
                        ? 'fill-accent text-accent'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
                <span className="ml-2 font-mono font-semibold">
                  {country.investmentRating.toFixed(1)}/5.0
                </span>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Report Generated: {reportDate}
              </p>
            </div>

            <Separator className="my-8" />

            {/* Executive Summary */}
            <section id="summary" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Executive Summary
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {country.executiveSummary}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-muted/50 p-4 text-center">
                      <p className="text-sm text-muted-foreground">Rental Yield</p>
                      <p className="text-2xl font-bold font-mono text-foreground">{country.rentalYield}%</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4 text-center">
                      <p className="text-sm text-muted-foreground">5Y Growth</p>
                      <p className={`text-2xl font-bold font-mono ${country.capitalAppreciation5Y >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {country.capitalAppreciation5Y >= 0 ? '+' : ''}{country.capitalAppreciation5Y}%
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4 text-center">
                      <p className="text-sm text-muted-foreground">Investment Rating</p>
                      <p className="text-2xl font-bold font-mono text-primary">{country.investmentRating}/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Key Investment Metrics */}
            <section id="metrics" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Key Investment Metrics
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-4">Return Metrics</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average Rental Yield</span>
                          <span className="font-mono font-semibold">{country.rentalYield}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Capital Appreciation (5Y)</span>
                          <span className={`font-mono font-semibold ${country.capitalAppreciation5Y >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {country.capitalAppreciation5Y >= 0 ? '+' : ''}{country.capitalAppreciation5Y}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price-to-Rent Ratio</span>
                          <span className="font-mono font-semibold">{country.priceToRentRatio}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Cost Metrics</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transaction Costs</span>
                          <span className="font-mono font-semibold">{country.transactionCosts}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Property Tax Rate</span>
                          <span className="font-mono font-semibold">{country.propertyTaxRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rental Income Tax</span>
                          <span className="font-mono font-semibold">{country.rentalIncomeTax}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Rental Market Analysis */}
            <section id="rental" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                Rental Market Analysis
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    The rental market in {country.name} shows {country.rentalYield > 4 ? 'strong' : 'moderate'} yields 
                    with {country.mortgageAvailability.toLowerCase()} mortgage availability for investors. 
                    Foreign ownership restrictions are {country.foreignOwnershipRestrictions.toLowerCase()}, 
                    making this market {country.foreignOwnershipRestrictions === 'None' || country.foreignOwnershipRestrictions === 'Low' ? 'accessible' : 'challenging'} for international investors.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border p-4">
                      <h4 className="font-semibold mb-3">Rental Yields by Property Type</h4>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Apartments</span>
                          <span className="font-mono">{(country.rentalYield * 1.1).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Houses</span>
                          <span className="font-mono">{(country.rentalYield * 0.9).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Commercial</span>
                          <span className="font-mono">{(country.rentalYield * 1.3).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <h4 className="font-semibold mb-3">Market Access</h4>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mortgage Availability</span>
                          <Badge variant="secondary">{country.mortgageAvailability}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Foreign Ownership</span>
                          <Badge variant="secondary">{country.foreignOwnershipRestrictions}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Tax & Legal Framework */}
            <section id="tax" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Landmark className="h-6 w-6 text-primary" />
                Tax & Legal Framework
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-4">Transaction Costs Breakdown</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stamp Duty</span>
                          <span className="font-mono">{(country.transactionCosts * 0.5).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Legal Fees</span>
                          <span className="font-mono">{(country.transactionCosts * 0.3).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Registration & Other</span>
                          <span className="font-mono">{(country.transactionCosts * 0.2).toFixed(1)}%</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total Transaction Costs</span>
                          <span className="font-mono text-primary">{country.transactionCosts}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Ongoing Tax Obligations</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Property Tax (Annual)</span>
                          <span className="font-mono">{country.propertyTaxRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rental Income Tax (Non-Resident)</span>
                          <span className="font-mono">{country.rentalIncomeTax}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Capital Gains Tax (Est.)</span>
                          <span className="font-mono">{Math.round(country.rentalIncomeTax * 0.8)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Market Performance */}
            <section id="performance" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Market Performance
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center">
                      <Globe2 className="h-8 w-8 mx-auto text-primary mb-2" />
                      <p className="text-2xl font-bold font-mono">{country.gdpGrowth}%</p>
                      <p className="text-sm text-muted-foreground">GDP Growth</p>
                    </div>
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 mx-auto text-accent mb-2" />
                      <p className="text-2xl font-bold font-mono">{country.inflationRate}%</p>
                      <p className="text-sm text-muted-foreground">Inflation Rate</p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-8 w-8 mx-auto text-success mb-2" />
                      <p className="text-2xl font-bold font-mono">{(country.currencyStability * 100).toFixed(0)}%</p>
                      <p className="text-sm text-muted-foreground">Currency Stability</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
                      <p className="text-2xl font-bold font-mono">{country.populationGrowth}%</p>
                      <p className="text-sm text-muted-foreground">Population Growth</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Management Costs */}
            <section id="costs" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calculator className="h-6 w-6 text-primary" />
                Management & Operating Costs
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="max-w-md">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Management Fees</span>
                        <span className="font-mono">{country.managementFees}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maintenance Costs</span>
                        <span className="font-mono">{country.maintenanceCosts}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Insurance Costs</span>
                        <span className="font-mono">{country.insuranceCosts}%</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Operating Costs</span>
                        <span className="font-mono text-primary">
                          {(country.managementFees + country.maintenanceCosts + country.insuranceCosts).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      * Costs shown as percentage of annual rental income
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Recommendations */}
            <section id="recommendations" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                Investment Recommendations
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      Based on our comprehensive analysis, {country.name} presents a{' '}
                      <strong className="text-foreground">{country.investmentCategory.toLowerCase()}</strong> investment 
                      opportunity with an overall rating of <strong className="text-foreground">{country.investmentRating}/5</strong>.
                    </p>
                    <h4 className="font-semibold text-foreground mt-6 mb-3">Key Strengths:</h4>
                    <ul className="flex flex-col gap-2 text-muted-foreground">
                      {country.rentalYield > 4 && <li>Above-average rental yields ({country.rentalYield}%)</li>}
                      {country.capitalAppreciation5Y > 3 && <li>Strong capital appreciation history</li>}
                      {country.propertyTaxRate < 0.5 && <li>Low property tax burden</li>}
                      {country.foreignOwnershipRestrictions === 'None' && <li>No restrictions on foreign ownership</li>}
                      {country.currencyStability > 0.85 && <li>Stable currency environment</li>}
                    </ul>
                    <h4 className="font-semibold text-foreground mt-6 mb-3">Considerations:</h4>
                    <ul className="flex flex-col gap-2 text-muted-foreground">
                      {country.transactionCosts > 7 && <li>Higher transaction costs may impact short-term returns</li>}
                      {country.rentalIncomeTax > 25 && <li>Higher rental income tax rates for non-residents</li>}
                      {country.foreignOwnershipRestrictions === 'High' && <li>Significant restrictions on foreign property ownership</li>}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Methodology */}
            <section id="methodology" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Data Sources & Methodology
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed">
                    This report aggregates data from official government statistics, central banks, 
                    international organizations (IMF, World Bank, OECD), reputable property indices, 
                    and on-the-ground research partners. All data is verified through multiple sources 
                    and updated quarterly.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge variant="outline">IMF</Badge>
                    <Badge variant="outline">World Bank</Badge>
                    <Badge variant="outline">OECD</Badge>
                    <Badge variant="outline">National Statistics</Badge>
                    <Badge variant="outline">Central Bank Data</Badge>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Footer */}
            <Separator className="my-8" />
            <div className="text-center text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} Global Invest. All rights reserved.
              </p>
              <p className="mt-2">
                This report is for informational purposes only and does not constitute investment advice.
                Always consult with qualified financial advisors before making investment decisions.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
