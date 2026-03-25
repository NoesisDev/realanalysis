export interface Country {
  id: string
  name: string
  slug: string
  flag: string
  region: Region
  investmentRating: number
  investmentCategory: InvestmentCategory
  rentalYield: number
  capitalAppreciation5Y: number
  priceToRentRatio: number
  transactionCosts: number
  propertyTaxRate: number
  rentalIncomeTax: number
  gdpGrowth: number
  inflationRate: number
  currencyStability: number
  populationGrowth: number
  mortgageAvailability: AvailabilityLevel
  foreignOwnershipRestrictions: RestrictionLevel
  managementFees: number
  maintenanceCosts: number
  insuranceCosts: number
  executiveSummary: string
  badges: Badge[]
}

export type Region = 
  | 'Europe' 
  | 'Asia' 
  | 'Americas' 
  | 'Middle East' 
  | 'Caribbean' 
  | 'Pacific'

export type InvestmentCategory = 
  | 'High Yield' 
  | 'Balanced' 
  | 'Growth' 
  | 'Tax Efficient' 
  | 'Emerging Market'

export type AvailabilityLevel = 'Low' | 'Medium' | 'High'

export type RestrictionLevel = 'None' | 'Low' | 'Moderate' | 'High' | 'Restricted'

export type Badge = 
  | 'Best Rental Yield' 
  | 'Best Growth' 
  | 'Most Tax Efficient' 
  | 'Best for Beginners' 
  | 'Best Overall'

export interface PricingTier {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  avatar: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface User {
  id: string
  name: string
  email: string
  purchasedReports: string[]
  favorites: string[]
}
