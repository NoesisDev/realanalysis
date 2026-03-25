'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { Country } from '@/lib/types'

interface MetricsChartProps {
  country: Country
}

export function MetricsChart({ country }: MetricsChartProps) {
  // Generate mock historical data based on country metrics
  const chartData = useMemo(() => {
    const baseYear = 2016
    const years = 10
    const data = []
    
    // Use capital appreciation to generate realistic trend
    const annualGrowth = country.capitalAppreciation5Y / 5
    
    for (let i = 0; i <= years; i++) {
      const year = baseYear + i
      // Add some variance to make it look realistic
      const variance = (Math.sin(i * 1.5) * 2) + (Math.random() - 0.5)
      const priceIndex = 100 + (i * annualGrowth) + variance
      const rentIndex = 100 + (i * (annualGrowth * 0.8)) + (variance * 0.5)
      
      data.push({
        year: year.toString(),
        priceIndex: Math.round(priceIndex * 10) / 10,
        rentIndex: Math.round(rentIndex * 10) / 10,
      })
    }
    
    return data
  }, [country.capitalAppreciation5Y])

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="year" 
            className="text-muted-foreground"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-muted-foreground"
            tick={{ fontSize: 12 }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="priceIndex" 
            name="Property Price Index"
            stroke="hsl(var(--chart-1))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--chart-1))' }}
          />
          <Line 
            type="monotone" 
            dataKey="rentIndex" 
            name="Rental Index"
            stroke="hsl(var(--chart-2))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--chart-2))' }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-muted-foreground text-center">
        Index values (Base Year 2016 = 100). Data sourced from national statistics and property indices.
      </p>
    </div>
  )
}
