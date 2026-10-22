import { useParams, Link } from 'react-router-dom'
import { useEffect, Fragment } from 'react'
import { practiceAreas } from '@/data/content'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  ChevronRight,
  Scale,
  Building2,
  Briefcase,
  Landmark,
  DollarSign,
  Users,
  MapPin,
  ShieldCheck,
  Check,
  CheckCircle,
  FileText,
  Lock,
  Award,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Percent,
  Shield,
  Calendar,
  MessageCircle,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Scale,
  Building2,
  Briefcase,
  Landmark,
  DollarSign,
  Users,
  MapPin,
  ShieldCheck,
  Check,
  CheckCircle,
  FileText,
  Lock,
  Award,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Percent,
  Shield,
  Calendar,
}

const HIGHLIGHT_PHRASE = 'Primeira TaxTech do Brasil'

// Renders the subtitle in gold (text-primary, inherited from the <p>) but
// isolates the TaxTech highlight phrase in white, per the area detail design.
function renderSubtitle(text: string) {
  const parts = text.split(HIGHLIGHT_PHRASE)
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <span className="text-white">{HIGHLIGHT_PHRASE}</span>}
    </Fragment>
  ))
}

export default function AreaDetail() {
  const { slug } = useParams()
  const area = practiceAreas.find((a) => a.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-primary mb-4">Área não encontrada</h1>
          <Link to="/#areas" className="text-muted-foreground hover:text-white underline">
            Voltar para o início
          </Link>
        </div>
      </div>
    )
  }

  const Icon = iconMap[area.icon] || Scale

  const isRich = !!(
    area.subtitle ||
    area.aboutSection ||
    area.stats ||
    area.method ||
    area.differentials ||
    area.scenario ||
    (area.sections && area.sections.length > 0)
  )

  return (
    <div className="pt-24 pb-32 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn>
          <Link
            to="/#areas"
            aria-label="Voltar para a seção Áreas de Atuação na página inicial"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-12 focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Voltar para Áreas de Atuação
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <FadeIn delay={100}>
              <div className="flex items-center gap-6 mb-8">
                <div
                  className="w-20 h-20 bg-card border border-border flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Icon className="w-10 h-10 text-primary" strokeWidth={1} />
                </div>
                <h1
                  className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight"
                  tabIndex={-1}
                >
                  {area.title}
                </h1>
              </div>

              {isRich ? (
                <div className="max-w-none">
                  {area.subtitle && (
                    <p className="text-lg md:text-xl font-serif text-primary mb-8 leading-snug text-justify">
                      {renderSubtitle(area.subtitle)}
                    </p>
                  )}
                  <div className="w-12 h-[1px] bg-primary mb-8"></div>
                  <p
                    className="text-xl text-white font-medium mb-8 [&_strong]:font-semibold text-justify"
                    dangerouslySetInnerHTML={{ __html: area.description }}
                  />
                  {area.fullDescription && (
                    <p
                      className="text-muted-foreground leading-relaxed text-lg text-justify"
                      dangerouslySetInnerHTML={{ __html: area.fullDescription }}
                    />
                  )}
                  {area.highlights && area.highlights.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 not-prose">
                      {area.highlights.map((h, i) => (
                        <div key={i} className="bg-card border border-border p-6">
                          <h4 className="font-serif text-xl text-white mb-3">{h.title}</h4>
                          <p className="text-muted-foreground leading-relaxed text-sm text-justify">
                            {h.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-justify">
                  <p className="text-xl text-white font-medium mb-8 text-justify">
                    {area.description}
                  </p>
                  <div className="w-12 h-[1px] bg-primary mb-8"></div>
                  <p className="text-justify">{area.fullDescription}</p>
                  {area.highlights && area.highlights.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 mb-12 not-prose">
                      {area.highlights.map((h, i) => (
                        <div key={i} className="bg-card border border-border p-6">
                          <h4 className="font-serif text-xl text-white mb-3">{h.title}</h4>
                          <p className="text-muted-foreground leading-relaxed text-sm text-justify">
                            {h.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-justify">
                    Nossa abordagem é pautada na análise meticulosa de cada cenário, identificando
                    riscos e oportunidades para desenvolver estratégias jurídicas e administrativas
                    sob medida. Compreendemos que as questões atinentes ao{' '}
                    <strong>{area.title.toLowerCase()}</strong> exigem não apenas conhecimento
                    técnico profundo, mas também sensibilidade para os impactos nos negócios e na
                    vida de nossos clientes.
                  </p>
                </div>
              )}
            </FadeIn>

            {isRich && (
              <div className="mt-20 space-y-24">
                {/* Seções genéricas/customizadas */}
                {area.sections && area.sections.length > 0 && (
                  <>
                    {area.sections.map((sec, secIdx) => (
                      <FadeIn key={secIdx}>
                        <SectionHeader eyebrow={sec.eyebrow} title={sec.title} />
                        {sec.body && (
                          <p className="text-muted-foreground leading-relaxed text-lg mb-6 text-justify">
                            {sec.body}
                          </p>
                        )}
                        {sec.paragraphs && sec.paragraphs.length > 0 && (
                          <div className="space-y-4 mb-6">
                            {sec.paragraphs.map((p, pIdx) => (
                              <p
                                key={pIdx}
                                className="text-muted-foreground leading-relaxed text-lg text-justify"
                              >
                                {p}
                              </p>
                            ))}
                          </div>
                        )}
                        {sec.bullets && sec.bullets.length > 0 && (
                          <div className="space-y-4 pt-2">
                            {sec.bullets.map((b, bIdx) => {
                              // Se o bullet tiver o padrão "Título: Descrição", destacamos o título em negrito sutil
                              const colonIndex = b.indexOf(':')
                              const hasPrefix = colonIndex > 0 && colonIndex < 45
                              const titlePart = hasPrefix ? b.slice(0, colonIndex + 1) : null
                              const restPart = hasPrefix ? b.slice(colonIndex + 1) : b

                              return (
                                <div
                                  key={bIdx}
                                  className="bg-card border border-border p-6 flex items-start gap-4 hover:border-primary/50 transition-colors"
                                >
                                  <Check
                                    className="w-5 h-5 text-primary shrink-0 mt-1"
                                    strokeWidth={2}
                                  />
                                  <p className="text-foreground/90 leading-relaxed text-justify">
                                    {titlePart && (
                                      <strong className="text-white font-semibold">
                                        {titlePart}{' '}
                                      </strong>
                                    )}
                                    {restPart}
                                  </p>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </FadeIn>
                    ))}
                  </>
                )}

                {/* Quem somos */}
                {area.aboutSection && (
                  <FadeIn>
                    <SectionHeader
                      eyebrow={area.aboutSection.eyebrow}
                      title={area.aboutSection.title}
                    />
                    {area.aboutSection.body && (
                      <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mb-8 text-justify">
                        {area.aboutSection.body}
                      </p>
                    )}
                    {area.aboutSection.paragraphs && area.aboutSection.paragraphs.length > 0 && (
                      <div className="space-y-4 mb-8">
                        {area.aboutSection.paragraphs.map((p, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-muted-foreground leading-relaxed text-lg max-w-3xl text-justify"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                    {area.aboutSection.bullets && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                        {area.aboutSection.bullets.map((b, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Check
                              className="w-5 h-5 text-primary shrink-0 mt-0.5"
                              strokeWidth={2}
                            />
                            <span className="text-foreground/90 leading-relaxed text-justify">
                              {b}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </FadeIn>
                )}

                {/* Números */}
                {area.stats && area.stats.length > 0 && (
                  <FadeIn>
                    <SectionHeader eyebrow="Números" title="Resultados que geram caixa" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {area.stats.map((s, i) => {
                        const StatIcon = iconMap[s.icon] || Award
                        return (
                          <div
                            key={i}
                            className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-colors"
                          >
                            <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center">
                              <StatIcon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                            </div>
                            <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                              {s.value}
                            </div>
                            <div className="text-sm text-muted-foreground leading-snug">
                              {s.label}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </FadeIn>
                )}

                {/* Método exclusivo */}
                {area.method && (
                  <FadeIn>
                    <SectionHeader eyebrow={area.method.eyebrow} title={area.method.title} />
                    {area.method.intro && (
                      <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mb-10 text-justify">
                        {area.method.intro}
                      </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {area.method.steps.map((step, i) => (
                        <div
                          key={i}
                          className="bg-card border border-border p-8 flex gap-5 hover:border-primary/50 transition-colors"
                        >
                          <div className="shrink-0 w-12 h-12 border border-primary/50 flex items-center justify-center">
                            <span className="font-serif text-primary text-xl">{step.number}</span>
                          </div>
                          <div>
                            <h4 className="font-serif text-lg text-white mb-1">{step.title}</h4>
                            {step.description && (
                              <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                                {step.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                )}

                {/* Diferenciais */}
                {area.differentials && (
                  <FadeIn>
                    <SectionHeader
                      eyebrow={area.differentials.eyebrow}
                      title={area.differentials.title}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {area.differentials.bullets?.map((b, i) => {
                        const icons = [ShieldCheck, TrendingUp, Check, FileText, Award, Lock]
                        const DiffIcon = icons[i % icons.length]
                        return (
                          <div
                            key={i}
                            className="bg-card border border-border p-8 hover:border-primary/50 transition-colors"
                          >
                            <DiffIcon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
                            <p className="text-foreground/90 leading-relaxed text-justify">{b}</p>
                          </div>
                        )
                      })}
                    </div>
                  </FadeIn>
                )}

                {/* Cenário tributário brasileiro */}
                {area.scenario && (
                  <FadeIn>
                    <SectionHeader eyebrow={area.scenario.eyebrow} title={area.scenario.title} />
                    {area.scenario.body && (
                      <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mb-10 text-justify">
                        {area.scenario.body}
                      </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {area.scenario.bullets?.map((b, i) => {
                        const isPhilosophy = b.toLowerCase().startsWith('filosofia de trabalho:')
                        if (isPhilosophy) {
                          const philosophyItems = [
                            { percent: '10%', label: 'Inspiração' },
                            { percent: '90%', label: 'Transpiração' },
                            { percent: '100%', label: 'Paixão' },
                          ]

                          return (
                            <div
                              key={i}
                              className="md:col-span-2 bg-card border border-border p-8 hover:border-primary/50 transition-colors"
                            >
                              <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-6 bg-primary" />
                                <span className="text-primary uppercase tracking-widest text-xs font-semibold">
                                  Filosofia de trabalho
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                                {philosophyItems.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className={`flex flex-col items-center justify-center text-center p-4 ${
                                      idx === 0
                                        ? 'pt-0 sm:pt-4 sm:pl-0'
                                        : idx === philosophyItems.length - 1
                                          ? 'pb-0 sm:pb-4 sm:pr-0'
                                          : ''
                                    }`}
                                  >
                                    <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-2">
                                      {item.percent}
                                    </span>
                                    <span className="text-sm md:text-base text-foreground/90 font-medium uppercase tracking-wider">
                                      {item.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        }

                        const icons = [DollarSign, TrendingUp, AlertIcon, FileText]
                        const ScenarioIcon = icons[i % icons.length]
                        return (
                          <div
                            key={i}
                            className="bg-card border border-border p-8 flex items-start gap-5 hover:border-primary/50 transition-colors"
                          >
                            <ScenarioIcon
                              className="w-8 h-8 text-primary shrink-0 mt-0.5"
                              strokeWidth={1.5}
                            />
                            <p className="text-foreground/90 leading-relaxed text-lg text-justify">
                              {b}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </FadeIn>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <FadeIn direction="left" delay={200}>
              <div className="bg-card border border-border p-8 sticky top-32">
                <h3 className="font-serif text-2xl font-semibold mb-6">Outras Áreas</h3>
                <ul className="space-y-4 mb-10">
                  {practiceAreas
                    .filter((a) => a.id !== area.id)
                    .map((a) => (
                      <li key={a.id}>
                        <Link
                          to={`/areas/${a.slug}`}
                          aria-label={`Ver área de atuação: ${a.title}`}
                          className="flex items-center justify-between text-muted-foreground hover:text-primary group transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
                        >
                          <span>{a.title}</span>
                          <ChevronRight
                            className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                </ul>

                <div className="bg-background p-6 border border-border text-center">
                  <h4 className="font-serif text-lg text-white mb-2">Precisa de Assessoria?</h4>
                  <p className="text-sm text-muted-foreground mb-6">
                    Agende uma reunião com nossos especialistas em {area.title}.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-primary text-black font-semibold hover:bg-primary/90 rounded-none flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <a
                      href={`https://wa.me/5511933293331?text=${encodeURIComponent(
                        `Olá, gostaria de informações sobre ${area.title}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Falar pelo WhatsApp sobre ${area.title} (abre em nova janela)`}
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Fale pelo WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-[1px] w-8 bg-primary"></div>
        <span className="text-primary uppercase tracking-widest text-xs font-semibold">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{title}</h2>
    </div>
  )
}

// Small inline alert icon (no direct Lucide "alert" import needed beyond what's imported)
function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
