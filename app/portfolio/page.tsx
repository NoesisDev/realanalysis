'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  Plus, 
  Pencil, 
  Trash2, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  Building2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react'
import { 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

// Sample portfolio data
const initialProperties = [
  {
    id: '1',
    name: 'Barcelona Apartment',
    country: 'Spain',
    purchasePrice: 280000,
    annualRent: 18000,
    appreciationRate: 4.5,
    holdingPeriod: 10,
  },
  {
    id: '2',
    name: 'Lisbon Studio',
    country: 'Portugal',
    purchasePrice: 180000,
    annualRent: 12000,
    appreciationRate: 5.2,
    holdingPeriod: 8,
  },
  {
    id: '3',
    name: 'Dubai Marina Flat',
    country: 'UAE',
    purchasePrice: 450000,
    annualRent: 32000,
    appreciationRate: 3.8,
    holdingPeriod: 7,
  },
]

const countries = ['Spain', 'Portugal', 'UAE', 'Thailand', 'Mexico', 'Greece', 'Japan', 'Colombia']

const COLORS = ['#1a365d', '#d4af37', '#0891b2', '#059669', '#7c3aed', '#dc2626']

interface Property {
  id: string
  name: string
  country: string
  purchasePrice: number
  annualRent: number
  appreciationRate: number
  holdingPeriod: number
}

export default function PortfolioPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    purchasePrice: '',
    annualRent: '',
    appreciationRate: '',
    holdingPeriod: '',
  })

  // Calculate portfolio metrics
  const totalInvestment = properties.reduce((sum, p) => sum + p.purchasePrice, 0)
  const totalAnnualRent = properties.reduce((sum, p) => sum + p.annualRent, 0)
  const avgROI = properties.length > 0 
    ? properties.reduce((sum, p) => sum + (p.annualRent / p.purchasePrice) * 100, 0) / properties.length 
    : 0

  // Pie chart data - investment by country
  const countryDistribution = properties.reduce((acc, p) => {
    acc[p.country] = (acc[p.country] || 0) + p.purchasePrice
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(countryDistribution).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / totalInvestment) * 100).toFixed(1)
  }))

  // Line chart data - portfolio growth projection
  const growthData = Array.from({ length: 11 }, (_, year) => {
    const bestCase = totalInvestment * Math.pow(1.08, year) + totalAnnualRent * year
    const avgCase = totalInvestment * Math.pow(1.05, year) + totalAnnualRent * year
    const worstCase = totalInvestment * Math.pow(1.02, year) + totalAnnualRent * year
    return {
      year,
      'Best Case': Math.round(bestCase),
      'Average': Math.round(avgCase),
      'Worst Case': Math.round(worstCase),
    }
  })

  const handleAddProperty = () => {
    if (!formData.name || !formData.country || !formData.purchasePrice) return

    const newProperty: Property = {
      id: Date.now().toString(),
      name: formData.name,
      country: formData.country,
      purchasePrice: Number(formData.purchasePrice),
      annualRent: Number(formData.annualRent),
      appreciationRate: Number(formData.appreciationRate),
      holdingPeriod: Number(formData.holdingPeriod),
    }

    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? { ...newProperty, id: editingProperty.id } : p))
      setEditingProperty(null)
    } else {
      setProperties([...properties, newProperty])
    }

    setFormData({
      name: '',
      country: '',
      purchasePrice: '',
      annualRent: '',
      appreciationRate: '',
      holdingPeriod: '',
    })
    setIsAddModalOpen(false)
  }

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property)
    setFormData({
      name: property.name,
      country: property.country,
      purchasePrice: property.purchasePrice.toString(),
      annualRent: property.annualRent.toString(),
      appreciationRate: property.appreciationRate.toString(),
      holdingPeriod: property.holdingPeriod.toString(),
    })
    setIsAddModalOpen(true)
  }

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id))
  }

  const calculateExpectedReturn = (property: Property) => {
    const annualReturn = property.annualRent + (property.purchasePrice * property.appreciationRate / 100)
    return annualReturn
  }

  const calculateROI = (property: Property) => {
    return (property.annualRent / property.purchasePrice) * 100
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
              My Portfolio
            </h1>
            <p className="mt-2 text-primary-foreground/80">
              Manage and analyze your real estate investment portfolio
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Portfolio Summary */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Investment</p>
                    <p className="text-2xl font-bold font-mono">${totalInvestment.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-secondary/10 p-3">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Rental Income</p>
                    <p className="text-2xl font-bold font-mono">${totalAnnualRent.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-accent/10 p-3">
                    <Percent className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average ROI</p>
                    <p className="text-2xl font-bold font-mono">{avgROI.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Properties</p>
                    <p className="text-2xl font-bold font-mono">{properties.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Pie Chart - Distribution by Country */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-secondary" />
                  Investment Distribution
                </CardTitle>
                <CardDescription>Portfolio allocation by country</CardDescription>
              </CardHeader>
              <CardContent>
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Investment']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                    Add properties to see distribution
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Line Chart - Growth Projection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-secondary" />
                  Portfolio Growth Projection
                </CardTitle>
                <CardDescription>10-year value projection scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'bottom', offset: -5 }} />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                      label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="Best Case" stroke="#059669" strokeWidth={2} />
                    <Line type="monotone" dataKey="Average" stroke="#d4af37" strokeWidth={2} />
                    <Line type="monotone" dataKey="Worst Case" stroke="#dc2626" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Properties Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Properties</CardTitle>
                <CardDescription>Manage your investment properties</CardDescription>
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Property
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
                    <DialogDescription>
                      Enter the details of your investment property
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Property Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Barcelona Apartment"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
                        <Input
                          id="purchasePrice"
                          type="number"
                          value={formData.purchasePrice}
                          onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                          placeholder="280000"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="annualRent">Annual Rent ($)</Label>
                        <Input
                          id="annualRent"
                          type="number"
                          value={formData.annualRent}
                          onChange={(e) => setFormData({ ...formData, annualRent: e.target.value })}
                          placeholder="18000"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="appreciationRate">Appreciation Rate (%)</Label>
                        <Input
                          id="appreciationRate"
                          type="number"
                          step="0.1"
                          value={formData.appreciationRate}
                          onChange={(e) => setFormData({ ...formData, appreciationRate: e.target.value })}
                          placeholder="4.5"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="holdingPeriod">Holding Period (years)</Label>
                        <Input
                          id="holdingPeriod"
                          type="number"
                          value={formData.holdingPeriod}
                          onChange={(e) => setFormData({ ...formData, holdingPeriod: e.target.value })}
                          placeholder="10"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setIsAddModalOpen(false)
                      setEditingProperty(null)
                      setFormData({
                        name: '',
                        country: '',
                        purchasePrice: '',
                        annualRent: '',
                        appreciationRate: '',
                        holdingPeriod: '',
                      })
                    }}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddProperty}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      {editingProperty ? 'Save Changes' : 'Add Property'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {properties.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property Name</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead className="text-right">Purchase Price</TableHead>
                      <TableHead className="text-right">Annual Rent</TableHead>
                      <TableHead className="text-right">Expected Return</TableHead>
                      <TableHead className="text-right">ROI</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.name}</TableCell>
                        <TableCell>{property.country}</TableCell>
                        <TableCell className="text-right font-mono">
                          ${property.purchasePrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ${property.annualRent.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ${Math.round(calculateExpectedReturn(property)).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono text-accent">
                          {calculateROI(property).toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditProperty(property)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Building2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-semibold text-lg">No properties yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your portfolio by adding your first property
                  </p>
                  <Button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Property
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scenario Comparison */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
              <CardDescription>Compare different portfolio scenarios over 10 years</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scenario</TableHead>
                    <TableHead className="text-right">Total Investment</TableHead>
                    <TableHead className="text-right">10-Year Value</TableHead>
                    <TableHead className="text-right">Total Return</TableHead>
                    <TableHead className="text-right">Annual ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Best Case (8% growth)</TableCell>
                    <TableCell className="text-right font-mono">${totalInvestment.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-green-600">
                      ${Math.round(totalInvestment * Math.pow(1.08, 10) + totalAnnualRent * 10).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-green-600">
                      ${Math.round((totalInvestment * Math.pow(1.08, 10) + totalAnnualRent * 10) - totalInvestment).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-green-600">8.0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Average Case (5% growth)</TableCell>
                    <TableCell className="text-right font-mono">${totalInvestment.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-secondary">
                      ${Math.round(totalInvestment * Math.pow(1.05, 10) + totalAnnualRent * 10).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-secondary">
                      ${Math.round((totalInvestment * Math.pow(1.05, 10) + totalAnnualRent * 10) - totalInvestment).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-secondary">5.0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Worst Case (2% growth)</TableCell>
                    <TableCell className="text-right font-mono">${totalInvestment.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-red-600">
                      ${Math.round(totalInvestment * Math.pow(1.02, 10) + totalAnnualRent * 10).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-red-600">
                      ${Math.round((totalInvestment * Math.pow(1.02, 10) + totalAnnualRent * 10) - totalInvestment).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-red-600">2.0%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Want to explore more investment opportunities?
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/countries">
                Browse Countries
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
