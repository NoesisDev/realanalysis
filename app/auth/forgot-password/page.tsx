'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Logo } from '@/components/brand/logo'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Validate email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <Link href="/" className="mb-8">
        <Logo size="md" />
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">Reset Your Password</CardTitle>
          <CardDescription>
            {isSubmitted 
              ? 'Check your email for reset instructions'
              : 'Enter your email address and we\'ll send you a reset link'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Sent!</h3>
              <p className="text-muted-foreground mb-6">
                We've sent password reset instructions to <strong>{email}</strong>. 
                Please check your inbox and follow the link to reset your password.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:underline"
                >
                  try again
                </button>
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center">
                <Link 
                  href="/auth/login" 
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Need help? Contact us at support@propvest.com
      </p>
    </div>
  )
}
