import { useIntersection } from '@/hooks/use-intersection'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function FadeIn({ children, className, delay = 0, direction = 'up' }: FadeInProps) {
  const { ref, isIntersecting } = useIntersection()

  const directionClasses = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: '',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-out opacity-0',
        directionClasses[direction],
        isIntersecting && 'opacity-100 translate-y-0 translate-x-0',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
