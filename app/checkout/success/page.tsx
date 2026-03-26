import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/brand/logo'
import { CheckCircle, Download, FileText, ArrowRight, Home } from 'lucide-react'

export const metadata = {
  title: 'Purchase Successful | Propvest',
  description: 'Your report purchase was successful',
}

export default function CheckoutSuccessPage() {
  // In a real app, this would come from the session/query params
  const orderDetails = {
    orderId: 'ORD-2024-001234',
    reportName: 'Spain Full Investment Report',
    country: 'Spain',
    price: 79,
    purchaseDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    email: 'investor@example.com',
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <Link href="/" className="mb-8">
        <Logo size="md" />
      </Link>

      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="font-serif text-2xl text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your report is ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Details */}
          <div className="rounded-lg bg-muted/50 p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Report</span>
              <span className="font-medium">{orderDetails.reportName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-mono font-medium">${orderDetails.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{orderDetails.purchaseDate}</span>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-4">
            <p className="text-sm text-center">
              A confirmation email has been sent to <strong>{orderDetails.email}</strong> with your receipt and download link.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              asChild 
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              size="lg"
            >
              <Link href={`/reports/${orderDetails.country.toLowerCase()}`}>
                <FileText className="mr-2 h-4 w-4" />
                View Your Report
              </Link>
            </Button>

            <Button 
              variant="outline" 
              className="w-full"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>

          {/* Additional Links */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <Button asChild variant="ghost" className="flex-1">
              <Link href="/dashboard">
                <ArrowRight className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild variant="ghost" className="flex-1">
              <Link href="/countries">
                <Home className="mr-2 h-4 w-4" />
                Explore More Countries
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Note */}
      <p className="mt-8 text-center text-sm text-muted-foreground max-w-md">
        Having trouble accessing your report? Contact our support team at{' '}
        <a href="mailto:support@propvest.com" className="text-primary hover:underline">
          support@propvest.com
        </a>
      </p>
    </div>
  )
}
