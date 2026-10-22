import { FadeIn } from '../FadeIn'
import { founderMember } from '@/data/content'
import {
  Mail,
  Phone,
  Award,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'

export function Team() {
  return (
    <section
      id="lideranca"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      aria-labelledby="leadership-heading"
    >
      {/* Background Decorative Gold Radiance */}
      <div
        className="absolute top-1/3 left-10 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-primary/[0.05] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-12 bg-primary" aria-hidden="true"></div>
              <span className="text-primary uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold">
                Liderança & Visão Estratégica
              </span>
            </div>
            <h2
              id="leadership-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight"
            >
              CEO - Sócio Fundador
            </h2>
            <p className="text-muted-foreground mt-4 text-base md:text-lg leading-relaxed font-light text-justify">
              Liderança pautada em mais de 30 anos de prática jurídica e executiva, integrando
              conhecimento técnico aprofundado, visão de negócios e soluções de alta precisão.
            </p>
          </FadeIn>
        </div>

        {/* Founder Showcase Card */}
        <div className="relative rounded-2xl bg-gradient-to-b from-card/90 via-card/70 to-card/95 border border-primary/20 backdrop-blur-md p-6 sm:p-10 md:p-14 lg:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Elegant gold corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Founder Portrait Column - Rectangular format, subtle gold borders, warm nude background */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <FadeIn delay={100} className="w-full mb-6">
                <div className="border-l-2 border-primary pl-4 py-1">
                  <p className="text-foreground font-serif text-base sm:text-lg font-medium leading-relaxed italic text-justify">
                    &ldquo;Aliamos mais de 25 anos de experiência em gestão corporativa em mercados
                    altamente competitivos e atuação jurídica a uma visão de negócios pragmática.
                    Transformamos desafios complexos em liquidez, segurança e valor tangível.&rdquo;
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="relative flex flex-col items-center w-full max-w-[320px] sm:max-w-sm mx-auto">
                  {/* Outer Gold Ambient Glow Halo */}
                  <div className="absolute -inset-4 sm:-inset-6 rounded-2xl bg-primary/15 blur-2xl opacity-75 pointer-events-none" />
                  {/* Rectangular Outer Gold Frame */}
                  <div className="relative p-1.5 sm:p-2 rounded-2xl bg-gradient-to-b from-primary/70 via-primary/30 to-primary/70 shadow-[0_15px_40px_rgba(197,161,89,0.25)] w-full">
                    {/* Inner Gold Inset Frame */}
                    <div className="p-1 rounded-xl bg-background/80 border border-primary/40">
                      {/* Rectangular Photo Container with Nude Background */}
                      <div
                        className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-lg overflow-hidden flex items-end justify-center shadow-inner"
                        style={{ backgroundColor: '#f5f0eb' }}
                      >
                        {/* Direct Rectangular Image */}
                        <img
                          src={founderMember.image}
                          alt={founderMember.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105 select-none"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Floating Gold Pill Badge - Advogado desde 1991 */}
                  <div className="mt-[-16px] relative z-20 bg-background/95 border border-primary/80 px-5 py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.6)] flex items-center gap-2.5 backdrop-blur-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">
                      Advogado desde 1991
                    </span>
                  </div>
                  {/* Founder Name & Title beneath image */}
                  <div className="mt-6 text-center">
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                      {founderMember.name}
                    </h3>
                    <p className="text-primary font-semibold tracking-wider text-sm sm:text-base uppercase mt-1">
                      {founderMember.role}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1 font-medium">
                      GRUPO FILETO
                    </p>
                  </div>{' '}
                </div>
              </FadeIn>
            </div>

            {/* Founder Bio & Credentials Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <FadeIn direction="left" delay={200}>
                {/* Introduction Paragraph */}
                <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 text-justify">
                  <p className="text-foreground/90 font-normal leading-relaxed text-justify">
                    Com sólida formação jurídica e especializações em administração empresarial e
                    direito tributário, Claudio Fileto lidera o Grupo Fileto com o compromisso de
                    entregar valor estratégico tangível aos negócios de seus clientes.
                  </p>
                  <p className="text-justify">
                    Acumula mais de 25 anos de vivência em funções de gestão e direção executiva em
                    grandes companhias nacionais e multinacionais, o que confere uma compreensão
                    pragmática e diferenciada dos desafios corporativos, fiscais e de liquidez
                    enfrentados por empresários.
                  </p>
                  <p className="text-justify">
                    Fundou a Fileto Expertise em janeiro de 2019, estruturando parcerias de alto
                    impacto como a AG Capital TaxTech e operações avançadas de Home Equity, unindo
                    segurança jurídica, tecnologia de ponta e celeridade nos resultados.
                  </p>
                </div>
                {/* Key Pillars / Expertise Tags */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                    <h4 className="text-xs uppercase tracking-widest text-primary font-semibold">
                      Áreas de Especialidade & Atuação
                    </h4>
                  </div>
                  <ul
                    className="flex flex-wrap gap-2 list-none p-0"
                    aria-label="Especialidades de atuação de Claudio Fileto"
                  >
                    {founderMember.expertise.map((item, idx) => (
                      <li
                        key={idx}
                        className="inline-flex items-center text-xs sm:text-sm px-3.5 py-1.5 rounded-md bg-primary/10 border border-primary/30 text-foreground font-medium hover:border-primary/60 transition-colors"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-primary mr-2 shrink-0"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/80">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40 border border-border/60">
                    <div className="p-2.5 rounded-md bg-primary/15 border border-primary/30 text-primary shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                        OAB
                      </p>
                      <p className="text-sm font-bold text-foreground">Advogado desde 1991</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40 border border-border/60">
                    <div className="p-2.5 rounded-md bg-primary/15 border border-primary/30 text-primary shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                        Gestão
                      </p>
                      <p className="text-sm font-bold text-foreground">25+ Anos Executivo</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40 border border-border/60">
                    <div className="p-2.5 rounded-md bg-primary/15 border border-primary/30 text-primary shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                        Fundação
                      </p>
                      <p className="text-sm font-bold text-foreground">Fileto Expertise (2019)</p>
                    </div>
                  </div>
                </div>
                {/* Contact Actions */}
                <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold text-sm rounded-md hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Entrar em Contato
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href="mailto:contato@grupofileto.com"
                    aria-label="Enviar e-mail para contato@grupofileto.com"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-card/80 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 text-sm rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                    contato@grupofileto.com
                  </a>
                  <a
                    href="tel:+5511933293331"
                    aria-label="Ligar para +55 (11) 93329-3331"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-card/80 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 text-sm rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                    +55 (11) 93329-3331
                  </a>
                </div>{' '}
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
