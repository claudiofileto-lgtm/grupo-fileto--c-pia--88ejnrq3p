import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import logoHorizontal from '@/assets/logolatgf2douradoantescov-sf-bfed0.png'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (isHome) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/${hash}`)
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'O Escritório', href: '#escritorio' },
    { name: 'Áreas de Atuação', href: '#areas' },
    { name: 'CEO - Sócio Fundador', href: '#lideranca' },
    { name: 'Contato', href: '#contato' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent py-0',
        isScrolled || !isHome
          ? 'bg-background/95 backdrop-blur-md border-border'
          : 'bg-transparent',
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center py-0">
        <Link
          to="/"
          className="flex items-center group flex-shrink-0 py-1 sm:py-1.5 pl-1 sm:pl-2 md:pl-3"
          aria-label="Grupo Fileto - Ir para o início"
        >
          <img
            src={logoHorizontal}
            alt="Grupo Fileto"
            className="h-16 sm:h-[72px] md:h-[88px] w-auto max-w-[245px] sm:max-w-[290px] md:max-w-[335px] object-contain transition-transform duration-300 group-hover:scale-105 block mix-blend-screen"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-4 lg:gap-6 mr-1 md:mr-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group py-1 whitespace-nowrap"
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-background border-b border-border py-4 px-4 flex flex-col gap-4 shadow-xl animate-fade-in-down">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-medium text-foreground hover:text-primary py-2"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
