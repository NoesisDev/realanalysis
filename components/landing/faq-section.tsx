import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/lib/data'

export function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Find answers to common questions about our reports and platform.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{' '}
            <a href="/contact" className="font-medium text-primary hover:underline">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
