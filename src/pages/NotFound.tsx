/* 404 Page - Displays when a user attempts to access a non-existent route - translate to the language of the user */
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background px-4 py-20">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-foreground font-serif mb-2">Página não encontrada</p>
        <p className="text-sm text-muted-foreground mb-8">
          O conteúdo que você procura não está disponível ou foi movido.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-2.5 bg-primary text-black font-semibold text-sm rounded hover:bg-primary/90 transition-colors"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  )
}

export default NotFound
