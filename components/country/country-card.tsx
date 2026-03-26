import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, TrendingUp, Percent, ArrowRight } from 'lucide-react'
import type { Country } from '@/lib/types'

interface CountryCardProps {
  country: Country
  showCheckbox?: boolean
  isSelected?: boolean
  onSelect?: (country: Country) => void
}

export function CountryCard({ country, showCheckbox, isSelected, onSelect }: CountryCardProps) {
  return (
    <Card className="group relative flex flex-col transition-all duration-200 hover:shadow-lg hover:border-primary/30">
      {/* Selection Checkbox */}
      {showCheckbox && (
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect?.(country)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            aria-label={`Select ${country.name} for comparison`}
          />
        </div>
      )}

      {/* Badges */}
      {country.badges.length > 0 && (
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          {country.badges.slice(0, 2).map((badge) => (
            <Badge
              key={badge}
              variant="secondary"
              className="bg-accent/10 text-accent border-accent/20 text-xs"
            >
              {badge}
            </Badge>
          ))}
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{country.flag}</span>
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {country.name}
            </h3>
            <Badge variant="outline" className="text-xs font-normal">
              {country.region}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {/* Investment Rating */}
        <div className="mb-4 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(country.investmentRating)
                  ? 'fill-accent text-accent'
                  : i < country.investmentRating
                  ? 'fill-accent/50 text-accent'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium font-mono text-foreground">
            {country.investmentRating.toFixed(1)}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Percent className="h-3.5 w-3.5" />
              <span className="text-xs">Rental Yield</span>
            </div>
            <p className="mt-1 text-lg font-semibold font-mono text-foreground">
              {country.rentalYield.toFixed(1)}%
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-xs">5Y Growth</span>
            </div>
            <p className={`mt-1 text-lg font-semibold font-mono ${
              country.capitalAppreciation5Y >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {country.capitalAppreciation5Y >= 0 ? '+' : ''}{country.capitalAppreciation5Y.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Investment Category */}
        <div className="mt-3">
          <Badge 
            variant="secondary" 
            className="bg-primary/10 text-primary border-primary/20"
          >
            {country.investmentCategory}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
          <Link href={`/countries/${country.slug}`}>
            View Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
