import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CountryCard } from '@/components/country/country-card'
import { getFeaturedCountries } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

export function FeaturedCountries() {
  const featuredCountries = getFeaturedCountries()

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Featured Investment Markets
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Explore top-performing real estate markets with our detailed investment profiles. 
            Each country is analyzed across 50+ data points.
          </p>
        </div>

        {/* Country Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCountries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="px-8">
            <Link href="/countries">
              View All Countries
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
