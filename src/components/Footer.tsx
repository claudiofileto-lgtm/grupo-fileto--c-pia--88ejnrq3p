import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Linkedin } from 'lucide-react'
import logoHorizontal from '@/assets/logolatgf2douradoantescov-sf-bfed0.png'

export function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Rodapé do site"
      className="bg-gray-900 border-t border-gray-800 pt-0 sm:pt-0 pb-6 text-gray-300"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* 1. Logo GRUPO FILETO centralizado no topo */}
        <div className="flex justify-center items-center py-2 sm:py-3 mb-1">
          <Link
            to="/"
            className="flex items-center group transition-transform duration-300 group-hover:scale-105 rounded focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Grupo Fileto - Ir para a página inicial"
          >
            <img
              src={logoHorizontal}
              alt="Grupo Fileto — Consultoria Jurídica, Tributária, Empresarial e Financeira"
              className="h-28 sm:h-32 md:h-36 lg:h-40 w-auto max-w-[340px] sm:max-w-[400px] md:max-w-[460px] object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105 block mix-blend-screen"
            />
          </Link>
        </div>

        {/* 2. Abaixo do logo, os 4 blocos lado a lado na mesma linha horizontal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-2 items-start">
          {/* Bloco 1: Sobre */}
          <div>
            <h2 className="font-serif text-base md:text-lg font-semibold mb-2.5 text-white">
              Sobre
            </h2>
            <p className="text-gray-300 hover:text-primary transition-colors text-xs sm:text-sm leading-relaxed text-justify">
              Expertise estratégica nas áreas jurídica, tributária, empresarial e financeira a
              serviço dos interesses corporativos e pessoais mais complexos e desafiadores.
            </p>
          </div>

          {/* Bloco 2: Endereço */}
          <div>
            <h2 className="font-serif text-base md:text-lg font-semibold mb-2.5 text-white">
              Endereço
            </h2>
            <div className="flex gap-2.5 text-xs sm:text-sm text-gray-300">
              <MapPin className="text-primary shrink-0 mt-0.5" size={17} aria-hidden="true" />
              <a
                href="https://www.google.com/maps?q=Rua+Manoel+Coelho,+676,+Centro,+São+Caetano+do+Sul,+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors leading-relaxed focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label="Localização no Google Maps: Rua Manoel Coelho, nº 676, sala 1508, Centro, São Caetano do Sul, SP (abre em nova aba)"
              >
                Rua Manoel Coelho, nº 676, sala 1508 — Centro — São Caetano do Sul — SP — CEP
                09510-101
              </a>
            </div>
          </div>

          {/* Bloco 3: Contato */}
          <div>
            <h2 className="font-serif text-base md:text-lg font-semibold mb-2.5 text-white">
              Contato
            </h2>
            <ul
              className="space-y-2 text-xs sm:text-sm text-gray-300"
              aria-label="Canais de contato"
            >
              <li className="flex gap-2.5 items-center hover:text-primary transition-colors">
                <Phone className="text-primary shrink-0" size={17} aria-hidden="true" />
                <a
                  href="tel:+5511933293331"
                  className="focus-visible:ring-2 focus-visible:ring-primary rounded"
                  aria-label="Ligar para o telefone +55 (11) 93329-3331"
                >
                  +55 (11) 93329-3331
                </a>
              </li>
              <li className="flex gap-2.5 items-center hover:text-primary transition-colors">
                <Mail className="text-primary shrink-0" size={17} aria-hidden="true" />
                <a
                  href="mailto:contato@grupofileto.com"
                  className="break-all focus-visible:ring-2 focus-visible:ring-primary rounded"
                  aria-label="Enviar e-mail para contato@grupofileto.com"
                >
                  contato@grupofileto.com
                </a>
              </li>
            </ul>
          </div>

          {/* Bloco 4: Redes Sociais */}
          <div>
            <h2 className="font-serif text-base md:text-lg font-semibold mb-2.5 text-white">
              Redes Sociais
            </h2>
            <div className="flex gap-3" aria-label="Links para redes sociais">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar a página do Grupo Fileto no LinkedIn (abre em nova aba)"
                className="w-9 h-9 rounded-full border border-gray-700 bg-gray-800/60 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-all focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Linkedin size={17} aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar o perfil do Grupo Fileto no Instagram (abre em nova aba)"
                className="w-9 h-9 rounded-full border border-gray-700 bg-gray-800/60 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-all focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Instagram size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* 4. Copyright mantido abaixo de tudo */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-300">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} GRUPO FILETO. Todos os direitos reservados.
          </p>
          <p className="text-center sm:text-right">
            Design sofisticado e desenvolvimento por Skip.
          </p>
        </div>
      </div>
    </footer>
  )
}
