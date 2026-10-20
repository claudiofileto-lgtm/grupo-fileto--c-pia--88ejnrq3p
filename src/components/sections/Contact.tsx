import { Phone, MessageCircle } from 'lucide-react'
import { FadeIn } from '../FadeIn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export function Contact() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Mensagem Enviada',
      description: 'Recebemos sua mensagem. Entraremos em contato em breve.',
    })
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contato" className="py-24 md:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn direction="right">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-primary"></div>
                <h2 className="text-primary uppercase tracking-widest text-sm font-semibold">
                  Contato
                </h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                Fale com Nossos Especialistas
              </h3>
              <p className="text-muted-foreground mb-12 max-w-md text-justify">
                Preencha o formulário para agendar uma consulta. Nossa equipe retornará com a máxima
                brevidade e confidencialidade.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="tel:+5511933293331"
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary">
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
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary">
                    <MessageCircle size={18} />
                  </span>
                  WhatsApp
                </a>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground">
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      required
                      className="bg-background border-border focus-visible:ring-primary rounded-none h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground">
                      E-mail Corporativo
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="bg-background border-border focus-visible:ring-primary rounded-none h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-muted-foreground">
                    Assunto
                  </Label>
                  <Input
                    id="subject"
                    required
                    className="bg-background border-border focus-visible:ring-primary rounded-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-muted-foreground">
                    Mensagem
                  </Label>
                  <Textarea
                    id="message"
                    required
                    className="bg-background border-border focus-visible:ring-primary rounded-none min-h-[150px] resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 rounded-none px-10 py-6 text-base tracking-wide"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={200} className="h-full min-h-[400px]">
            <div className="w-full h-full border border-border relative group overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 pointer-events-none"></div>
              <iframe
                title="Localização da sede no Google Maps"
                src="https://maps.google.com/maps?q=Rua+Manoel+Coelho,+676,+Centro,+São+Caetano+do+Sul,+SP&output=embed"
                className="w-full h-full border-0 filter grayscale opacity-70 group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps?q=Rua+Manoel+Coelho,+676,+Centro,+São+Caetano+do+Sul,+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-6 z-20 bg-background/90 backdrop-blur-sm p-6 border border-border hover:border-primary transition-colors block"
              >
                <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                  Sede São Caetano do Sul/SP
                </h4>
                <p className="text-sm text-muted-foreground">
                  Rua Manoel Coelho, nº 676, sala 1508 — Centro — São Caetano do Sul — SP — CEP
                  09510-101
                </p>
                <span className="block mt-2 text-xs text-primary">Ver no Google Maps →</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
