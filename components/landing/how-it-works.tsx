import { Search, Eye, Download } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Browse Markets',
    description: 'Explore our comprehensive database of international real estate markets. Filter by region, yield, or investment type to find your ideal opportunities.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Preview & Compare',
    description: 'Access free country profiles with key metrics. Compare multiple markets side-by-side to identify the best fit for your investment strategy.',
    icon: Eye,
  },
  {
    number: '03',
    title: 'Purchase & Download',
    description: 'Get instant access to full investment reports with detailed analysis, tax breakdowns, and actionable insights. Download in PDF or Excel format.',
    icon: Download,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Get from research to investment decision in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-0.5 w-full -translate-x-1/2 bg-gradient-to-r from-primary/50 to-accent/50 lg:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold shadow">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-8 font-serif text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
