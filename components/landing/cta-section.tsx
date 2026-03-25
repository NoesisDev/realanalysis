import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
          Ready to Make Smarter Investment Decisions?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Join thousands of investors who trust Global Invest for their international real estate research. 
          Start exploring markets today.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
            <Link href="/countries">
              Explore Countries
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link href="/#pricing">
              View Pricing
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
