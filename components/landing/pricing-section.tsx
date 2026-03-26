import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { pricingTiers } from '@/lib/data'

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Choose the plan that fits your investment research needs. 
            All plans include our 14-day money-back guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`relative flex flex-col ${
                tier.popular 
                  ? 'border-2 border-secondary shadow-lg lg:scale-105' 
                  : 'border-border'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-secondary text-secondary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle className="font-serif text-2xl">{tier.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 text-center">
                <div className="mt-4">
                  <span className="text-4xl font-bold font-mono text-foreground">${tier.price}</span>
                  {tier.id === 'monthly' && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                  {tier.id === 'annual' && (
                    <span className="text-muted-foreground">/year</span>
                  )}
                  {tier.id === 'single' && (
                    <span className="text-muted-foreground">/report</span>
                  )}
                </div>

                <ul className="mt-8 flex flex-col gap-3 text-left">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10">
                        <Check className="h-3 w-3 text-success" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  asChild 
                  className={`w-full ${
                    tier.popular 
                      ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' 
                      : ''
                  }`}
                  variant={tier.popular ? 'default' : 'outline'}
                >
                  <Link href={tier.id === 'free' ? '/auth/signup' : `/checkout?plan=${tier.id}`}>
                    {tier.id === 'free' ? 'Get Started' : tier.id === 'monthly' ? 'Subscribe' : tier.id === 'annual' ? 'Subscribe Now' : 'Purchase'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Trust Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Secure payment processing. Cancel anytime. Questions? Contact us at support@propvest.com
        </p>
      </div>
    </section>
  )
}
