import { FadeIn } from '../FadeIn'
import { Button } from '@/components/ui/button'
import buildingPhoto from '@/assets/image-125b0.png'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100vh] md:min-h-[125vh] flex items-center pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/*
          Foto do edifício Helbor Offices São Caetano (torre de vidro, espelho d'água e jardins)
          - `w-full` cobrindo 100% da largura de ponta a ponta
          - Corte apenas na altura (topo/base)
          - Foco vertical em ~28-30% do topo
          - Opacidade e gradientes de escurecimento preservados
        */}
        <img
          src={buildingPhoto}
          alt="Edifício Helbor Offices - Sede Grupo Fileto"
          className="absolute inset-0 w-full h-full min-h-full min-w-full object-cover object-[center_28%] opacity-60 pointer-events-none select-none transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-[0rem] text-left">
        <div className="max-w-3xl">
          <FadeIn delay={100}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold">
                GRUPO FILETO
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8 text-foreground">
              Soluções Tributárias, Empresariais e Financeiras&nbsp;Inteligentes
            </h1>
          </FadeIn>

          <FadeIn delay={500}>
            <p className="text-base sm:text-lg md:text-[1.125rem] text-muted-foreground mb-10 max-w-2xl leading-relaxed text-justify hyphens-none">
              Expertise estratégica nas áreas jurídica, tributária, empresarial e financeira a
              serviço dos interesses corporativos e pessoais mais complexos e desafiadores.
            </p>
          </FadeIn>

          <FadeIn delay={700}>
            <Button
              size="lg"
              className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 py-6 text-base tracking-wide transition-all duration-300 shadow-[0_0_0_0_rgba(197,161,89,0)] hover:shadow-glow"
              onClick={() =>
                document.getElementById('escritorio')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Conheça o Escritório
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
