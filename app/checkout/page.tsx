'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Logo } from '@/components/brand/logo'
import { pricingTiers, countries } from '@/lib/data'
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  Shield,
  FileText,
  Download,
  Clock
} from 'lucide-react'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get('plan')
  const countrySlug = searchParams.get('country')

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    promoCode: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Determine what's being purchased
  const selectedPlan = planId ? pricingTiers.find(t => t.id === planId) : null
  const selectedCountry = countrySlug ? countries.find(c => c.slug === countrySlug) : null
  
  const orderItem = selectedPlan 
    ? { name: selectedPlan.name, price: selectedPlan.price, type: 'plan' as const }
    : selectedCountry 
    ? { name: `${selectedCountry.name} Investment Report`, price: 79, type: 'report' as const }
    : { name: 'Single Report', price: 79, type: 'report' as const }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Format card number
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19)
    }
    
    // Format expiry
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)
    }
    
    // Format CVC
    if (e.target.name === 'cvc') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }

    setFormData(prev => ({
      ...prev,
      [e.target.name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsProcessing(false)
    // Redirect to success page
    router.push('/checkout/success')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
        <Link
          href={countrySlug ? `/countries/${countrySlug}` : '/countries'}
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Payment Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Enter your information to complete the purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Contact Information */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-semibold">Contact Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Card Information */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Card Information
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Promo Code */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="promoCode">Promo Code (Optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="promoCode"
                        name="promoCode"
                        placeholder="Enter code"
                        value={formData.promoCode}
                        onChange={handleChange}
                      />
                      <Button type="button" variant="outline">
                        Apply
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Spinner className="mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Purchase - ${orderItem.price}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{orderItem.name}</p>
                    {selectedCountry && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        {selectedCountry.flag} {selectedCountry.region}
                      </p>
                    )}
                  </div>
                  <p className="font-mono font-semibold">${orderItem.price}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">${orderItem.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-mono">$0.00</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="font-mono">${orderItem.price}</span>
                </div>

                {/* Included Features */}
                <div className="mt-4 rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium mb-3">Included with your purchase:</p>
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-success" />
                      Full investment analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-success" />
                      PDF & Excel download
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-success" />
                      30-day data updates
                    </li>
                  </ul>
                </div>

                {/* Trust Badges */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-success" />
                    14-day money-back guarantee
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 text-success" />
                    SSL encrypted payment
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
