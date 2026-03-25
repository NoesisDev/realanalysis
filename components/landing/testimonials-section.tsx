import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'

export function TestimonialsSection() {
  return (
    <section className="bg-primary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Trusted by Investors Worldwide
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
            See what our clients say about their experience with Global Invest reports.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-accent" />
                <blockquote className="mt-4 text-primary-foreground leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary-foreground">{testimonial.name}</p>
                    <p className="text-sm text-primary-foreground/70">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
