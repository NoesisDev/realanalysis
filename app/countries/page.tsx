'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CountryCard } from '@/components/country/country-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { countries } from '@/lib/data'
import type { Country, Region } from '@/lib/types'
import { Search, SlidersHorizontal, LayoutGrid, List, X, GitCompare } from 'lucide-react'

const regions: Region[] = ['Europe', 'Asia', 'Americas', 'Middle East', 'Caribbean', 'Pacific']

type SortOption = 'rating' | 'yield' | 'growth' | 'name'

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([])
  const [yieldRange, setYieldRange] = useState([0, 12])
  const [growthRange, setGrowthRange] = useState([-5, 15])
  const [sortBy, setSortBy] = useState<SortOption>('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedForComparison, setSelectedForComparison] = useState<Country[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredCountries = useMemo(() => {
    let filtered = [...countries]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.region.toLowerCase().includes(query)
      )
    }

    // Region filter
    if (selectedRegions.length > 0) {
      filtered = filtered.filter((c) => selectedRegions.includes(c.region))
    }

    // Yield range filter
    filtered = filtered.filter(
      (c) => c.rentalYield >= yieldRange[0] && c.rentalYield <= yieldRange[1]
    )

    // Growth range filter
    filtered = filtered.filter(
      (c) => c.capitalAppreciation5Y >= growthRange[0] && c.capitalAppreciation5Y <= growthRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.investmentRating - a.investmentRating)
        break
      case 'yield':
        filtered.sort((a, b) => b.rentalYield - a.rentalYield)
        break
      case 'growth':
        filtered.sort((a, b) => b.capitalAppreciation5Y - a.capitalAppreciation5Y)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  }, [searchQuery, selectedRegions, yieldRange, growthRange, sortBy])

  const handleRegionToggle = (region: Region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    )
  }

  const handleSelectForComparison = (country: Country) => {
    setSelectedForComparison((prev) => {
      if (prev.find((c) => c.id === country.id)) {
        return prev.filter((c) => c.id !== country.id)
      }
      if (prev.length >= 4) {
        return prev
      }
      return [...prev, country]
    })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedRegions([])
    setYieldRange([0, 12])
    setGrowthRange([-5, 15])
  }

  const hasActiveFilters = searchQuery || selectedRegions.length > 0 || yieldRange[0] > 0 || yieldRange[1] < 12 || growthRange[0] > -5 || growthRange[1] < 15

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Region Filter */}
      <div>
        <Label className="text-sm font-semibold text-foreground">Region</Label>
        <div className="mt-3 flex flex-col gap-2">
          {regions.map((region) => (
            <div key={region} className="flex items-center gap-2">
              <Checkbox
                id={region}
                checked={selectedRegions.includes(region)}
                onCheckedChange={() => handleRegionToggle(region)}
              />
              <Label htmlFor={region} className="text-sm font-normal cursor-pointer">
                {region}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Yield Filter */}
      <div>
        <Label className="text-sm font-semibold text-foreground">
          Rental Yield: {yieldRange[0]}% - {yieldRange[1]}%
        </Label>
        <Slider
          value={yieldRange}
          onValueChange={setYieldRange}
          min={0}
          max={12}
          step={0.5}
          className="mt-3"
        />
      </div>

      {/* Capital Growth Filter */}
      <div>
        <Label className="text-sm font-semibold text-foreground">
          5Y Growth: {growthRange[0]}% - {growthRange[1]}%
        </Label>
        <Slider
          value={growthRange}
          onValueChange={setGrowthRange}
          min={-5}
          max={15}
          step={0.5}
          className="mt-3"
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Explore Investment Markets
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Browse and compare real estate investment opportunities across {countries.length} countries.
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                <h2 className="font-semibold text-foreground mb-4">Filters</h2>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Controls Bar */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search countries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filters Button */}
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="sm">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                        {hasActiveFilters && (
                          <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                            Active
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="yield">Rental Yield</SelectItem>
                      <SelectItem value="growth">5Y Growth</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center gap-1 border border-border rounded-md p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="h-8 w-8 p-0"
                    >
                      <LayoutGrid className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                      <span className="sr-only">List view</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <p className="mb-4 text-sm text-muted-foreground">
                Showing {filteredCountries.length} of {countries.length} countries
              </p>

              {/* Country Grid/List */}
              {filteredCountries.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'sm:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredCountries.map((country) => (
                    <CountryCard
                      key={country.id}
                      country={country}
                      showCheckbox
                      isSelected={selectedForComparison.some((c) => c.id === country.id)}
                      onSelect={handleSelectForComparison}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-lg font-medium text-foreground">No countries found</p>
                  <p className="mt-1 text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Bar */}
        {selectedForComparison.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card shadow-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">
                  {selectedForComparison.length} selected for comparison
                </span>
                <div className="hidden sm:flex items-center gap-2">
                  {selectedForComparison.map((country) => (
                    <Badge 
                      key={country.id} 
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {country.flag} {country.name}
                      <button
                        onClick={() => handleSelectForComparison(country)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedForComparison([])}
                >
                  Clear
                </Button>
                <Button size="sm" disabled={selectedForComparison.length < 2}>
                  <GitCompare className="mr-2 h-4 w-4" />
                  Compare ({selectedForComparison.length}/4)
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
