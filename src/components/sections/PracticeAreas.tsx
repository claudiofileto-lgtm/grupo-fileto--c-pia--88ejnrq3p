import { Link } from 'react-router-dom'
import { FadeIn } from '../FadeIn'
import { practiceAreas } from '@/data/content'
import { Scale, Building2, Briefcase, Landmark, DollarSign, ArrowRight, Shield } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Scale,
  Building2,
  Briefcase,
  Landmark,
  DollarSign,
  Shield,
}

export function PracticeAreas() {
  return (
    <section id="areas" className="py-24 md:py-32 bg-card" aria-labelledby="areas-heading">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-primary" aria-hidden="true"></div>
            <span className="text-primary uppercase tracking-widest text-sm font-semibold">
              Expertise
            </span>
            <div className="h-[1px] w-8 bg-primary" aria-hidden="true"></div>
          </div>
          <h2 id="areas-heading" className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Áreas de Atuação
          </h2>
          <p className="text-muted-foreground text-lg text-justify">
            Oferecemos o que há de melhor no mercado, unindo soluções que vão de encontro aos
            anseios e necessidades de empresas e empresários, combinando conhecimento prático
            profundo, visão de negócios em áreas estratégicas Tributárias, Administrativas e
            Financeiras Inteligentes, com suporte jurídico integral.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {practiceAreas.map((area, index) => {
            const Icon = iconMap[area.icon] || Scale
            return (
              <FadeIn key={area.id} delay={index * 150} className="h-full flex">
                <Link
                  to={`/areas/${area.slug}`}
                  aria-label={`Ver detalhes sobre ${area.title}`}
                  className="group flex flex-col justify-between w-full h-full p-6 md:p-8 border border-border bg-background hover:border-primary/50 hover:bg-card transition-all duration-500 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-0 bg-primary transition-all duration-500 group-hover:h-full"
                    aria-hidden="true"
                  ></div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {area.title}
                      </h3>
                      <div
                        className="p-2.5 rounded-sm bg-primary/10 text-primary border border-primary/20 shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <p
                      className="text-sm md:text-base leading-relaxed text-muted-foreground group-hover:text-foreground/90 transition-colors [&_strong]:font-semibold [&_strong]:text-foreground text-justify"
                      dangerouslySetInnerHTML={{ __html: area.description }}
                    />
                  </div>

                  <div className="pt-6 mt-auto flex items-center justify-between border-t border-border/40">
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-all duration-300">
                      Saiba mais sobre {area.title}
                      <ArrowRight
                        className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
