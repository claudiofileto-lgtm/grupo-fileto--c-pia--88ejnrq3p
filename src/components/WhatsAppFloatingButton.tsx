import { MessageCircle } from 'lucide-react'
import { BRAND_GOLD } from '@/analyze-logo-temp'

export function WhatsAppFloatingButton() {
  const phoneNumber = '5511933293331'
  const message = 'Olá, gostaria de agendar uma consulta.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group"
    >
      {/* Tooltip / Label ao lado */}
      <div
        className="pointer-events-none hidden sm:inline-flex items-center bg-card/95 backdrop-blur-sm text-primary border border-border px-3 py-1.5 rounded-full text-xs font-medium shadow-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        role="tooltip"
      >
        <span>Fale conosco</span>
      </div>

      {/* Botão flutuante circular - tom escuro representativo do dourado escovado da logomarca */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        style={{ backgroundColor: BRAND_GOLD.buttonDark }}
        className="w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl hover:brightness-105 transition-all duration-300 hover:scale-110 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8942] focus-visible:ring-offset-2"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white/20" strokeWidth={2} />
      </a>
    </aside>
  )
}
