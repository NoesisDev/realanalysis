import Image from 'next/image'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'light'
}

const sizes = {
  sm: { icon: 32, text: 'text-lg' },
  md: { icon: 40, text: 'text-xl' },
  lg: { icon: 56, text: 'text-2xl' },
}

export function Logo({ className = '', showText = true, size = 'md', variant = 'default' }: LogoProps) {
  const { icon, text } = sizes[size]
  const textColor = variant === 'light' ? 'text-white' : 'text-primary'
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Propvest"
        width={icon}
        height={icon}
        className="shrink-0"
        style={{ width: icon, height: 'auto' }}
        priority
      />
      
      {showText && (
        <span className={`font-serif font-bold tracking-tight ${text} ${textColor}`}>
          Propvest
        </span>
      )}
    </div>
  )
}

export function LogoMark({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Propvest"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: 'auto' }}
    />
  )
}
