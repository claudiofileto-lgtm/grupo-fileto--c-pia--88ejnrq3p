import { ReactNode, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

/**
 * Repertório de transições variadas para as páginas do Grupo Fileto.
 * Cobre as 6 direções e estilos solicitados:
 * - 'fade-up': de baixo para cima (sobe)
 * - 'fade-down': de cima para baixo (desce)
 * - 'slide-left': da direita para a esquerda (entra pela direita)
 * - 'slide-right': da esquerda para a direita (entra pela esquerda)
 * - 'zoom-in': ampliação suave (zoom)
 * - 'elevate': perspectiva tridimensional elegante (3D)
 */
export type PageTransitionEffect =
  | 'fade-up'
  | 'fade-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'elevate'

export const ALL_PAGE_EFFECTS: readonly PageTransitionEffect[] = [
  'fade-up',
  'fade-down',
  'slide-left',
  'slide-right',
  'zoom-in',
  'elevate',
] as const

const EFFECT_CLASSES: Record<PageTransitionEffect, string> = {
  'fade-up': 'animate-page-fade-up',
  'fade-down': 'animate-page-fade-down',
  'slide-left': 'animate-page-slide-from-right',
  'slide-right': 'animate-page-slide-from-left',
  'zoom-in': 'animate-page-zoom-in',
  elevate: 'animate-page-elevate',
}

/**
 * Sorteia um efeito aleatório da lista garantindo variação perceptível:
 * evita repetir o mesmo efeito imediatamente anterior.
 */
export function pickVariedEffect(previous?: PageTransitionEffect): PageTransitionEffect {
  const candidates = ALL_PAGE_EFFECTS.filter((e) => e !== previous)
  const pool = candidates.length > 0 ? candidates : ALL_PAGE_EFFECTS
  const randomIndex = Math.floor(Math.random() * pool.length)
  return pool[randomIndex]
}

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

/**
 * Wrapper de transição de página dinâmico e variado a cada navegação.
 * A cada troca de rota (inclusive ao voltar para uma página já visitada),
 * gera uma nova chave única (pathname + navCount) e sorteia um novo efeito
 * de direção (de baixo para cima, de cima para baixo, esq->dir, dir->esq, zoom, 3d),
 * garantindo que a animação SEMPRE reexecute de maneira perceptível e fluida.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const location = useLocation()

  // Sorteia o efeito inicial da primeira carga
  const [currentEffect, setCurrentEffect] = useState<PageTransitionEffect>(() => pickVariedEffect())
  // Contador incremental de navegações para garantir unicidade da key
  const [navCount, setNavCount] = useState<number>(0)

  // Guarda o último pathname e efeito para detectar navegações e evitar repetições
  const prevPathnameRef = useRef<string>(location.pathname)
  const lastEffectRef = useRef<PageTransitionEffect>(currentEffect)

  useEffect(() => {
    // Quando o pathname muda (navegação para qualquer página, inclusive re-visita)
    if (location.pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = location.pathname

      // Sorteia novo efeito evitando o imediatamente anterior
      const nextEffect = pickVariedEffect(lastEffectRef.current)
      lastEffectRef.current = nextEffect

      setCurrentEffect(nextEffect)
      setNavCount((prev) => prev + 1)

      // Rola a janela ao topo suavemente se não for navegação por âncora hash
      if (!location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
    }
  }, [location.pathname, location.hash])

  const animationClass = EFFECT_CLASSES[currentEffect] || EFFECT_CLASSES['fade-up']
  const transitionKey = `${location.pathname}-${navCount}`

  return (
    <div
      key={transitionKey}
      className={cn('w-full flex-grow flex flex-col', animationClass, className)}
    >
      {children}
    </div>
  )
}
