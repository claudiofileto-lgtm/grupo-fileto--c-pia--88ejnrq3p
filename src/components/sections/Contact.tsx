import { useState } from 'react'
import { Phone, MessageCircle, CheckCircle2 } from 'lucide-react'
import { FadeIn } from '../FadeIn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export function Contact() {
  const { toast } = useToast()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: 'Mensagem Enviada com Sucesso',
        description: 'Recebemos sua mensagem. Entraremos em contato com a máxima brevidade.',
      })
      form.reset()
    }, 400)
  }

  return (
    <section
      id="contato"
      className="py-24 md:py-32 bg-card relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn direction="right">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-primary" aria-hidden="true"></div>
                <span className="text-primary uppercase tracking-widest text-sm font-semibold">
                  Contato
                </span>
              </div>
              <h2 id="contact-heading" className="text-4xl md:text-5xl font-serif font-bold mb-8">
                Fale com Nossos Especialistas
              </h2>
              <p className="text-muted-foreground mb-12 max-w-md text-justify">
                Preencha o formulário para agendar uma consulta. Nossa equipe retornará com a máxima
                brevidade e confidencialidade.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                aria-label="Opções rápidas de contato"
              >
                <a
                  href="tel:+5511933293331"
                  aria-label="Ligar para +55 (11) 93329-3331"
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
                >
                  <span
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary"
                    aria-hidden="true"
                  >
                    <Phone size={18} />
                  </span>
                  +55 (11) 93329-3331
                </a>
                <a
                  href={`https://wa.me/5511933293331?text=${encodeURIComponent(
                    'Olá, gostaria de agendar uma consulta.',
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Iniciar conversa no WhatsApp (abre em nova aba)"
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
                >
                  <span
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary"
                    aria-hidden="true"
                  >
                    <MessageCircle size={18} />
                  </span>
                  Conversar via WhatsApp
                </a>
              </div>

              {/* Região com aria-live para anunciar o feedback do formulário aos leitores de tela */}
              <div aria-live="polite" className="mb-4">
                {isSubmitted && (
                  <div
                    role="status"
                    className="p-4 mb-4 border border-primary/40 bg-primary/10 rounded flex items-center gap-3 text-foreground text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    <span>
                      Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.
                    </span>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate={false}
                aria-label="Formulário de contato e agendamento"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className="text-muted-foreground flex items-center justify-between"
                    >
                      <span>Nome Completo</span>
                      <span className="text-xs text-primary" aria-hidden="true">
                        *obrigatório
                      </span>
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      aria-required="true"
                      placeholder="Ex.: Claudio Silva"
                      className="bg-background border-border focus-visible:ring-2 focus-visible:ring-primary rounded-none h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className="text-muted-foreground flex items-center justify-between"
                    >
                      <span>E-mail Corporativo</span>
                      <span className="text-xs text-primary" aria-hidden="true">
                        *obrigatório
                      </span>
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      placeholder="nome@empresa.com.br"
                      className="bg-background border-border focus-visible:ring-2 focus-visible:ring-primary rounded-none h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-subject"
                    className="text-muted-foreground flex items-center justify-between"
                  >
                    <span>Assunto</span>
                    <span className="text-xs text-primary" aria-hidden="true">
                      *obrigatório
                    </span>
                  </Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    required
                    aria-required="true"
                    placeholder="Ex.: Consultoria tributária ou planejamento"
                    className="bg-background border-border focus-visible:ring-2 focus-visible:ring-primary rounded-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="text-muted-foreground flex items-center justify-between"
                  >
                    <span>Mensagem</span>
                    <span className="text-xs text-primary" aria-hidden="true">
                      *obrigatório
                    </span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    aria-required="true"
                    placeholder="Descreva detalhadamente a necessidade da sua empresa..."
                    className="bg-background border-border focus-visible:ring-2 focus-visible:ring-primary rounded-none min-h-[150px] resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-primary text-black font-semibold hover:bg-primary/90 rounded-none px-10 py-6 text-base tracking-wide focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={200} className="h-full min-h-[400px]">
            <div className="w-full h-full border border-border relative group overflow-hidden">
              <div
                className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 pointer-events-none"
                aria-hidden="true"
              ></div>
              <iframe
                title="Mapa de localização da sede do Grupo Fileto em São Caetano do Sul"
                src="https://maps.google.com/maps?q=Rua+Manoel+Coelho,+676,+Centro,+São+Caetano+do+Sul,+SP&output=embed"
                className="w-full h-full border-0 filter grayscale opacity-70 group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps?q=Rua+Manoel+Coelho,+676,+Centro,+São+Caetano+do+Sul,+SP"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir localização da Sede São Caetano do Sul no Google Maps em nova aba"
                className="absolute bottom-6 left-6 z-20 bg-background/90 backdrop-blur-sm p-6 border border-border hover:border-primary transition-colors block focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                  Sede São Caetano do Sul/SP
                </h3>
                <p className="text-sm text-muted-foreground">
                  Rua Manoel Coelho, nº 676, sala 1508 — Centro — São Caetano do Sul — SP — CEP
                  09510-101
                </p>
                <span className="block mt-2 text-xs text-primary font-medium" aria-hidden="true">
                  Ver no Google Maps →
                </span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
