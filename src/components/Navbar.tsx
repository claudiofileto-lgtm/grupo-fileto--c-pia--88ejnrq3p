import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import logoHorizontal from '@/assets/logolatgf2douradoantescov-sf-bfed0.png'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('inicio')
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      if (isHome) {
        const sections = ['inicio', 'escritorio', 'areas', 'lideranca', 'contato']
        const scrollPosition = window.scrollY + 140

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId)
          if (el) {
            const top = el.offsetTop
            const height = el.offsetHeight
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // Fecha o menu mobile com tecla ESC e devolve o foco ao botão
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        toggleButtonRef.current?.focus()
      }
    }

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const targetId = hash.replace('#', '')
    setActiveSection(targetId)

    if (isHome) {
      const targetElement = document.querySelector(hash)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
        // Atualiza o foco no elemento de destino para acessibilidade
        if (targetElement instanceof HTMLElement) {
          if (!targetElement.hasAttribute('tabindex')) {
            targetElement.setAttribute('tabindex', '-1')
          }
          targetElement.focus({ preventScroll: true })
        }
      }
    } else {
      navigate(`/${hash}`)
      setTimeout(() => {
        const targetElement = document.querySelector(hash)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
          if (targetElement instanceof HTMLElement) {
            if (!targetElement.hasAttribute('tabindex')) {
              targetElement.setAttribute('tabindex', '-1')
            }
            targetElement.focus({ preventScroll: true })
          }
        }
      }, 100)
    }
  }

  const navLinks = [
    { name: 'Início', href: '#inicio', id: 'inicio' },
    { name: 'O Escritório', href: '#escritorio', id: 'escritorio' },
    { name: 'Áreas de Atuação', href: '#areas', id: 'areas' },
    { name: 'CEO - Sócio Fundador', href: '#lideranca', id: 'lideranca' },
    { name: 'Contato', href: '#contato', id: 'contato' },
  ]

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent py-0',
        isScrolled || !isHome
          ? 'bg-background/95 backdrop-blur-md border-border shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center py-0">
        <Link
          to="/"
          className="flex items-center group flex-shrink-0 py-1 sm:py-1.5 pl-1 sm:pl-2 md:pl-3 rounded focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Grupo Fileto - Ir para a página inicial"
        >
          <img
            src={logoHorizontal}
            alt="Grupo Fileto — Consultoria Jurídica, Tributária, Empresarial e Financeira"
            className="h-16 sm:h-[72px] md:h-[88px] w-auto max-w-[245px] sm:max-w-[290px] md:max-w-[335px] object-contain transition-transform duration-300 group-hover:scale-105 block mix-blend-screen"
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden sm:flex items-center gap-4 lg:gap-6 mr-1 md:mr-2"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => {
            const isCurrent = isHome && activeSection === link.id
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'text-sm font-medium transition-colors relative group py-1 whitespace-nowrap rounded focus-visible:ring-2 focus-visible:ring-primary',
                  isCurrent
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-primary',
                )}
              >
                {link.name}
                <span
                  className={cn(
                    'absolute -bottom-1 left-1/2 h-[1px] bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0',
                    isCurrent ? 'w-full left-0' : 'w-0',
                  )}
                />
              </a>
            )
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          ref={toggleButtonRef}
          type="button"
          className="sm:hidden text-foreground p-2 rounded focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        >
          {mobileMenuOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          ref={mobileNavRef}
          aria-label="Menu de navegação mobile"
          className="sm:hidden absolute top-full left-0 w-full bg-background border-b border-border py-4 px-4 flex flex-col gap-2 shadow-xl animate-fade-in-down"
        >
          {navLinks.map((link) => {
            const isCurrent = isHome && activeSection === link.id
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'text-lg font-medium py-2 px-2 rounded transition-colors focus-visible:ring-2 focus-visible:ring-primary',
                  isCurrent
                    ? 'text-primary font-semibold bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-card',
                )}
              >
                {link.name}
              </a>
            )
          })}
        </nav>
      )}
    </header>
  )
}
