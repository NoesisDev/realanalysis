'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import type { Country } from '@/lib/types'

interface InvestmentCalculatorProps {
  country: Country
}

export function InvestmentCalculator({ country }: InvestmentCalculatorProps) {
  const [investmentAmount, setInvestmentAmount] = useState(250000)
  const [holdingPeriod, setHoldingPeriod] = useState(5)
  const [occupancyRate, setOccupancyRate] = useState(90)

  const calculations = useMemo(() => {
    // Annual rental income
    const grossRentalYield = country.rentalYield / 100
    const annualGrossRental = investmentAmount * grossRentalYield * (occupancyRate / 100)
    
    // Operating costs
    const totalOperatingCosts = (country.managementFees + country.maintenanceCosts + country.insuranceCosts) / 100
    const annualOperatingCosts = annualGrossRental * totalOperatingCosts
    const annualPropertyTax = investmentAmount * (country.propertyTaxRate / 100)
    
    // Net rental income
    const annualNetRental = annualGrossRental - annualOperatingCosts - annualPropertyTax
    
    // Tax on rental income
    const rentalIncomeTax = annualNetRental * (country.rentalIncomeTax / 100)
    const annualNetRentalAfterTax = annualNetRental - rentalIncomeTax
    
    // Total rental income over holding period
    const totalRentalIncome = annualNetRentalAfterTax * holdingPeriod
    
    // Capital appreciation
    const annualAppreciation = country.capitalAppreciation5Y / 5 / 100
    const futureValue = investmentAmount * Math.pow(1 + annualAppreciation, holdingPeriod)
    const capitalGain = futureValue - investmentAmount
    
    // Capital gains tax (estimated)
    const capitalGainsTax = capitalGain * (country.rentalIncomeTax * 0.8 / 100)
    const netCapitalGain = capitalGain - capitalGainsTax
    
    // Transaction costs (on exit)
    const exitCosts = futureValue * (country.transactionCosts / 100 / 2) // Assume half on exit
    
    // Total return
    const totalReturn = totalRentalIncome + netCapitalGain - exitCosts
    const totalReturnPercent = (totalReturn / investmentAmount) * 100
    const annualizedReturn = (Math.pow(1 + totalReturn / investmentAmount, 1 / holdingPeriod) - 1) * 100

    return {
      annualGrossRental: Math.round(annualGrossRental),
      annualNetRentalAfterTax: Math.round(annualNetRentalAfterTax),
      totalRentalIncome: Math.round(totalRentalIncome),
      futureValue: Math.round(futureValue),
      capitalGain: Math.round(capitalGain),
      netCapitalGain: Math.round(netCapitalGain),
      totalReturn: Math.round(totalReturn),
      totalReturnPercent: Math.round(totalReturnPercent * 10) / 10,
      annualizedReturn: Math.round(annualizedReturn * 10) / 10,
    }
  }, [investmentAmount, holdingPeriod, occupancyRate, country])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Scenario Calculator</CardTitle>
        <CardDescription>
          Estimate your potential returns based on current market conditions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <div>
              <Label className="text-sm font-medium">
                Investment Amount: {formatCurrency(investmentAmount)}
              </Label>
              <Slider
                value={[investmentAmount]}
                onValueChange={([value]) => setInvestmentAmount(value)}
                min={50000}
                max={2000000}
                step={10000}
                className="mt-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$50K</span>
                <span>$2M</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">
                Holding Period: {holdingPeriod} years
              </Label>
              <Slider
                value={[holdingPeriod]}
                onValueChange={([value]) => setHoldingPeriod(value)}
                min={1}
                max={20}
                step={1}
                className="mt-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 year</span>
                <span>20 years</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">
                Occupancy Rate: {occupancyRate}%
              </Label>
              <Slider
                value={[occupancyRate]}
                onValueChange={([value]) => setOccupancyRate(value)}
                min={50}
                max={100}
                step={5}
                className="mt-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">Projected Returns</h4>
            
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Annual Gross Rental Income</p>
                <p className="text-lg font-mono font-semibold">{formatCurrency(calculations.annualGrossRental)}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Annual Net Rental (After Tax)</p>
                <p className="text-lg font-mono font-semibold">{formatCurrency(calculations.annualNetRentalAfterTax)}</p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Total Rental Income ({holdingPeriod} years)</p>
                <p className="text-lg font-mono font-semibold text-success">{formatCurrency(calculations.totalRentalIncome)}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Property Value at Exit</p>
                <p className="text-lg font-mono font-semibold">{formatCurrency(calculations.futureValue)}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Net Capital Gain (After Tax)</p>
                <p className={`text-lg font-mono font-semibold ${calculations.netCapitalGain >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(calculations.netCapitalGain)}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Total Return</p>
                <p className="text-2xl font-mono font-bold text-primary">
                  {formatCurrency(calculations.totalReturn)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {calculations.totalReturnPercent}% total | {calculations.annualizedReturn}% annualized
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              * Estimates based on current market data. Actual returns may vary. This is not financial advice.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
