import Link from 'next/link'
import { Globe, Mail } from 'lucide-react'
import { Logo } from '@/components/brand/logo'

const footerLinks = {
  platform: [
    { name: 'Explore Countries', href: '/countries' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Compare Markets', href: '/countries?compare=true' },
  ],
  resources: [
    { name: 'Investment Guide', href: '/resources/guide' },
    { name: 'Market Reports', href: '/resources/reports' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Blog', href: '/blog' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo size="sm" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Professional real estate investment reports for international markets. Make informed decisions with data-driven insights.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span>contact@propvest.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-secondary" />
                <span>www.propvest.com</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-foreground">Platform</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Propvest. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Investment reports are for informational purposes only. Always consult with qualified advisors.
          </p>
        </div>
      </div>
    </footer>
  )
}
