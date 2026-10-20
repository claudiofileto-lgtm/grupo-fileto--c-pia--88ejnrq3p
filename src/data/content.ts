export interface PracticeAreaHighlight {
  title: string
  description: string
}

export interface PracticeAreaStat {
  value: string
  label: string
  icon: string
}

export interface PracticeAreaStep {
  number: string
  title: string
  description?: string
}

export interface PracticeAreaMethodSection {
  eyebrow: string
  title: string
  intro?: string
  steps: PracticeAreaStep[]
}

export interface PracticeAreaDetailSection {
  eyebrow: string
  title: string
  body?: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface PracticeArea {
  id: string
  slug: string
  title: string
  icon: string
  description: string
  fullDescription: string
  highlights?: PracticeAreaHighlight[]
  // Rich detail content
  subtitle?: string
  aboutSection?: PracticeAreaDetailSection
  stats?: PracticeAreaStat[]
  method?: PracticeAreaMethodSection
  differentials?: PracticeAreaDetailSection
  scenario?: PracticeAreaDetailSection
  sections?: PracticeAreaDetailSection[]
}

export const practiceAreas: PracticeArea[] = [
  {
    id: '1',
    slug: 'inteligencia-tributaria',
    title: 'Inteligência Tributária',
    icon: 'Landmark',
    description:
      'Parceiro da AG CAPITAL TAXTECH LTDA., a Primeira TaxTech do Brasil, empresa referência em tecnologia tributária desde 2010, que detém Tecnologia Proprietária para identificação de ativos ocultos nos recolhimentos tributários, gerando fluxo de caixa imediato para empresas.',
    fullDescription: '',
    subtitle: 'Especialista na área tributária, o Grupo Fileto é',
    aboutSection: {
      eyebrow: 'Quem somos',
      title: 'A primeira TaxTech do Brasil',
      body: 'O Grupo Fileto mantém parceria legítima e contratual com a empresa referência em tecnologia tributária desde 2010. Uma relação séria e formal que entrega aos nossos clientes melhores resultados e maior segurança. Com mais de 15 anos de mercado, utilizamos tecnologia proprietária para extrair 100% das oportunidades ainda não aproveitadas por empresas do Lucro Real, gerando fluxo de caixa imediato e seguro.',
      bullets: [
        'Somos a primeira TaxTech do Brasil',
        'Há mais de 15 anos gerando fluxo de caixa para empresas de todo o Brasil',
        'Tecnologia pioneira para identificação de ativos ocultos em tributos pagos a maior nos últimos 5 anos',
        'Referência em compliance previdenciário e identificação de ativos ocultos na folha de pagamento',
        'Especialistas em impostos diretos, indiretos e Reforma Tributária',
        'Tecnologia proprietária para extrair 100% das oportunidades ainda não aproveitadas por empresas do Lucro Real',
        'Primeiro verificador tributário do eSocial, SST e Gestão de Riscos a Terceiros',
      ],
    },
    stats: [
      { value: '12.000+', label: 'clientes satisfeitos', icon: 'Users' },
      { value: 'R$8 bi+', label: 'em créditos aproveitados', icon: 'DollarSign' },
      { value: '+14%', label: 'das empresas listadas na B3 atendidas', icon: 'Building2' },
      { value: '+12', label: 'estados de atuação', icon: 'MapPin' },
    ],
    method: {
      eyebrow: 'Método exclusivo',
      title: 'Um método 100% exclusivo fundamentado nas normas da RFB',
      intro:
        'Tecnologia que enxerga e especialistas que interpretam. Um passo a passo fundamentado nas normas da Receita Federal para extrair 100% das oportunidades tributárias — sem estimativas ou amostragem documental.',
      steps: [
        { number: '1', title: 'Documentação inicial e obtenção do NDA' },
        {
          number: '2',
          title: 'Relatório Técnico Inicial (RTI)',
          description: 'Em 10 dias úteis, sem custo.',
        },
        { number: '3', title: 'Início do trabalho hands on' },
        { number: '4', title: 'Envio do relatório consolidado das oportunidades mapeadas' },
        { number: '5', title: 'Regularização dos arquivos e documentos perante à RFB' },
        {
          number: '6',
          title: 'Definição do cronograma de datas para início do aproveitamento',
        },
        {
          number: '7',
          title:
            'Lançamento das compensações na DCTF Web e/ou solicitação de Pedidos de Restituição',
        },
        {
          number: '8',
          title: 'Dossiê Técnico Final',
          description: 'Garantia de 5 anos e Suporte de CND.',
        },
      ],
    },
    differentials: {
      eyebrow: 'Diferenciais',
      title: 'Tecnologia de precisão full service',
      bullets: [
        'Tecnologia de precisão full service',
        'Geração de caixa: resultado financeiro imediato após aprovação do projeto',
        'Compliance: adequação e conformidade à legislação vigente',
        'Relatório Técnico Inicial (RTI), sem custo, em 10 dias úteis',
        'Dominância de todo o ciclo: apuração, monetização e retificação de forma automatizada',
        'Segurança: compliance na FOPAG e sigilo das informações durante todo o trabalho',
        'Remuneração apenas no êxito da operação, sem pró-labore ou antecipação de honorários',
        'Operação segurada',
        'Suporte por 5 anos',
      ],
    },
    scenario: {
      eyebrow: 'Cenário tributário brasileiro',
      title: 'O tamanho da oportunidade no Brasil',
      body: 'O cenário tributário brasileiro revela oportunidades gigantescas de fluxo de caixa ainda não aproveitadas pelas empresas. Fonte: Instituto Brasileiro de Planejamento e Tributação (IBPT) e Qive/Opinion Box.',
      bullets: [
        'Total em tributos: R$ 2,9 trilhões',
        'Compensações tributárias: R$ 275 bilhões (9,5% dos tributos declarados quitados com oportunidades tributárias)',
        'Mais de 60% das empresas ainda não mediram o impacto da Reforma Tributária nos negócios',
        '6.782.002 normas editadas desde a CF/88, sendo 443.236 tributárias',
      ],
    },
  },
  {
    id: '2',
    slug: 'direito-empresarial',
    title: 'Direito Empresarial e Questões Societárias',
    icon: 'Building2',
    description: 'Consultoria para estruturação, fusões, aquisições e governança corporativa.',
    fullDescription:
      'Assessoramos empresas de diversos setores em suas operações diárias e estruturais. Desde a constituição de sociedades, passando por reorganizações societárias (M&A) até a implementação de práticas modernas de governança corporativa.',
    subtitle: 'Especialista em direito empresarial, o Grupo Fileto oferece',
    aboutSection: {
      eyebrow: 'Direito Empresarial',
      title: 'Soluções jurídicas completas para empresas e grupos empresariais',
      body: 'O Direito Empresarial é a espinha dorsal do ambiente de negócios. O Grupo Fileto atua em todas as frentes do direito empresarial — do societário à recuperação de empresas — oferecendo assessoria jurídica estratégica para empresas de todos os portes, desde startups até grandes grupos empresariais, garantindo segurança jurídica, previsibilidade e competitividade.',
      bullets: [
        'Constituição e reorganização de sociedades empresariais (Ltda., S.A., S/S, EIRELI)',
        'Elaboração e revisão de contratos empresariais, comerciais, de prestação de serviços e parcerias',
        'Acordos de sócios, quotistas e acionistas com cláusulas de governança, lock-up, tag along e drag along',
        'Operações de M&A (fusões, aquisições, incorporações, cisões e joint ventures)',
        'Recuperação Judicial e Extrajudicial, Falências e reestruturação de passivos empresariais',
        'Planejamento societário e estruturação de holdings empresariais',
        'Soluções de capital de giro e financiamento para grupos empresariais: investimentos, aquisição de equipamentos, imóveis, ampliação fabril',
        'Dissolução de sociedade e planejamento de sucessão e governança',
      ],
    },
    stats: [
      {
        value: '60%',
        label:
          'das empresas brasileiras fecham em menos de 5 anos por falta de assessoria jurídica adequada',
        icon: 'TrendingDown',
      },
      {
        value: 'R$ 1,2 tri',
        label: 'em crédito empresarial movimentados em operações de M&A no Brasil em 2024',
        icon: 'DollarSign',
      },
      {
        value: '1.400+',
        label:
          'pedidos de Recuperação Judicial no Brasil em 2024 — ambiente exige assessoria especializada',
        icon: 'AlertTriangle',
      },
      {
        value: '100%',
        label: 'de segurança jurídica em todos os contratos e operações estruturadas',
        icon: 'CheckCircle',
      },
    ],
    method: {
      eyebrow: 'Nossa metodologia',
      title: 'Uma abordagem completa do ciclo empresarial',
      intro:
        'Da constituição à expansão, da recuperação à perenidade, assessoramos cada fase da vida empresarial com profundidade técnica e visão estratégica de negócios.',
      steps: [
        {
          number: '1',
          title:
            'Diagnóstico empresarial: análise da estrutura societária, contratos vigentes e passivos',
        },
        {
          number: '2',
          title:
            'Planejamento societário: desenho da estrutura ideal conforme porte, atividade e objetivos',
        },
        {
          number: '3',
          title:
            'Elaboração de contratos e acordos de sócios sob medida, com cláusulas de proteção e governança',
        },
        {
          number: '4',
          title:
            'Due diligence e estruturação de operações de M&A — fusões, aquisições, incorporações',
        },
        {
          number: '5',
          title: 'Assessoria em Recuperação Judicial, Extrajudicial e reestruturação de passivos',
        },
        {
          number: '6',
          title:
            'Captação de recursos: capital de giro, financiamento bancário e operações estruturadas',
        },
        {
          number: '7',
          title:
            'Monitoramento contínuo: compliance societário, atualização contratual e prevenção de litígios',
        },
      ],
    },
    differentials: {
      eyebrow: 'Diferenciais',
      title: 'Por que o Direito Empresarial do Grupo Fileto é diferente',
      bullets: [
        'Atuação completa: do contrato social à recuperação judicial, todas as frentes cobertas',
        'Visão de negócios além do jurídico: entendemos o mercado, o setor e os objetivos do empresário',
        'Soluções de capital de giro e financiamento integradas à assessoria jurídica',
        'Experiência de mais de 30 anos em operações societárias complexas e M&A',
        'Acordos de sócios robustos com cláusulas de proteção, saída e governança',
        'Atuação em Recuperação Judicial com foco na preservação da empresa e dos empregos',
        'Assessoria preventiva: evitar litígios societários antes que eles surjam',
        'Atendimento personalizado para cada porte de empresa, da startup ao grupo consolidado',
      ],
    },
    scenario: {
      eyebrow: 'Cenário brasileiro',
      title: 'O ambiente empresarial no Brasil exige assessoria jurídica especializada',
      body: 'O ambiente de negócios brasileiro é um dos mais complexos do mundo. Carga tributária elevada, burocracia, insegurança jurídica e juros altos tornam a assessoria jurídica empresarial um diferencial competitivo — e não apenas um custo. Dados do IBGE, Serasa Experian e Banco Mundial evidenciam os desafios.',
      bullets: [
        'O Brasil ocupa a 124ª posição no ranking Doing Business do Banco Mundial',
        'Mais de 60% das empresas brasileiras fecham as portas em menos de 5 anos (IBGE)',
        '1.400+ pedidos de Recuperação Judicial em 2024 — maior número desde a Lei 11.101/2005',
        'A taxa Selic elevada torna o capital de giro um dos maiores desafios para grupos empresariais',
        'Conflitos societários estão entre as 3 principais causas de dissolução de empresas no Brasil',
      ],
    },
  },
  {
    id: '3',
    slug: 'financeiro',
    title: 'Financeiro - Home Equity (Crédito com Garantia de Imóveis)',
    icon: 'DollarSign',
    description:
      'Home Equity (Crédito com Garantia de Imóveis) para empresas, empresários, pessoas físicas e condomínios.',
    fullDescription:
      'Atuamos na estruturação e condução de operações de Home Equity — o crédito com garantia de imóvel — para empresas, empresários, pessoas físicas e condomínios. Transformamos o valor imobilizado em imóveis em capital líquido, com taxas competitivas, prazos alongados e condições sob medida, viabilizando investimentos, capital de giro, expansão de negócios, quitação de passivos e projetos das mais diversas naturezas. Cuidamos de toda a esteira jurídica: due diligence do imóvel dado em garantia, constituição e liberação de alienação fiduciária, contratos, cessões, anuências e a interlocução com instituições financeiras, assegurando celeridade e segurança jurídica em todas as etapas.',
    highlights: [
      {
        title: 'O que é Home Equity',
        description:
          'O Home Equity, ou Crédito com Garantia de Imóvel, é uma modalidade de crédito em que o imóvel é oferecido como garantia de pagamento, viabilizando condições mais atrativas — taxas menores, prazos mais longos e limites superiores aos das modalidades tradicionais.',
      },
      {
        title: 'Vantagens',
        description:
          'Acesso a capital a custos reduzidos, prazos de pagamento alongados, manutenção da propriedade do imóvel e liquidez para investimentos, capital de giro, expansão de negócios e reestruturação de dívidas.',
      },
      {
        title: 'Público Atendido',
        description:
          'Empresas, empresários, pessoas físicas e condomínios que buscam captar recursos com lastro imobiliário, com soluções ajustadas ao perfil e à finalidade de cada cliente.',
      },
      {
        title: 'Esteira Jurídica Completa',
        description:
          'Due diligence do imóvel, constituição de alienação fiduciária, contratos, cessões, anuências e interlocução com instituições financeiras, garantindo celeridade e segurança jurídica em todas as etapas.',
      },
    ],
    subtitle:
      'Home Equity: o crédito inteligente com garantia de imóvel — taxas até 12x mais baixas',
    aboutSection: {
      eyebrow: 'Home Equity',
      title: 'Crédito com Garantia de Imóvel — taxas reduzidas e prazos alongados',
      body: 'Em parceria com fintech pioneira e uma das 3 maiores do mercado nacional de Home Equity — com mais de R$ 4 bilhões originados e atuação 100% online em todo o Brasil —, estruturamos operações de crédito com as melhores condições do país, além de produtos complementares como Financiamento Imobiliário (SFI), Crédito para Construção e Crédito para Condomínios.',
      bullets: [
        'Taxas até 12x mais baixas que outras linhas de crédito tradicionais (a partir de 0,79% a.m. + IPCA)',
        'Prazos de até 240 meses (20 anos) com carência para o primeiro pagamento',
        'Mais de um garantidor aceito (garantias próprias ou de terceiros, com possibilidade de múltiplos imóveis por contrato)',
        'Objetivos atendidos (uso livre): capital de giro, investimentos, consolidação de dívidas, abertura de negócio, reformas, construção, viagens ou aquisição de segundo imóvel ou automóvel',
        'Tipos de imóveis aceitos: apartamentos (luxo, novos e antigos), casas (condomínio e rua), salas e lojas comerciais, prédios comerciais, galpões e terrenos em condomínio',
        'LTV de 30% a 60% conforme tipologia: Apto Luxo (até 60%), Apto Novo (até 55%), Apto Antigo/Casa Condomínio (até 50%), Sala/Casa Comercial (até 45%), Loja/Prédio Comercial/Casa Rua (até 40%) e Galpão/Terreno em Condomínio (até 30%)',
        'Operação 100% on-line com atendimento humanizado, consultor dedicado e desembolso rápido com parceria em cartórios de todo o Brasil',
        'Valores de R$ 50 mil a R$ 25 milhões para Pessoa Física, Pessoa Jurídica ou mista, com composição flexível de renda e esteira flex',
      ],
    },
    stats: [
      {
        value: '0,79% a.m.',
        label: 'Taxa a partir',
        icon: 'Percent',
      },
      {
        value: '240 meses',
        label: 'Prazo máximo',
        icon: 'Calendar',
      },
      {
        value: '+1 garantidor',
        label: 'Garantias aceitas',
        icon: 'Users',
      },
      {
        value: 'R$25 Mi',
        label: 'Valor máximo',
        icon: 'CheckCircle',
      },
    ],
    method: {
      eyebrow: 'Nossa metodologia',
      title: 'Jornada ágil e integrada: da proposta à liberação dos recursos',
      intro:
        'Conduzimos a jornada completa do cliente em duas fases estruturadas (Pré-venda e Pós-venda), aliando tecnologia, consultoria dedicada e segurança jurídica em cada etapa.',
      steps: [
        {
          number: '1',
          title: 'Envio de Proposta',
          description:
            'Cadastro inicial da proposta pelo parceiro com checklist de informações e documentos essenciais.',
        },
        {
          number: '2',
          title: 'Estruturação de Operação',
          description:
            'Time de Middle Office realiza o perfilamento e a estruturação sob medida para máxima fluidez e velocidade.',
        },
        {
          number: '3',
          title: 'Análises e Comitê de Pré-Aprovação',
          description:
            'Análise integrada de Crédito, Ativos e Jurídico em comitê especializado, avançando a proposta pré-aprovada.',
        },
        {
          number: '4',
          title: 'Apresentação de Condições',
          description:
            'Consultor dedicado e parceiro apresentam as condições comerciais aprovadas para aceite do cliente.',
        },
        {
          number: '5',
          title: 'Revalidação e Formalização',
          description:
            'Análises de pós-aprovação e emissão do contrato em formato 100% digital, simples e rápido.',
        },
        {
          number: '6',
          title: 'Registro de Alienação Fiduciária',
          description:
            'Registro da alienação fiduciária na matrícula do imóvel em cartório com capilaridade nacional.',
        },
        {
          number: '7',
          title: 'Liberação do Recurso e Fluxo de Pagamento',
          description:
            'Liberação dos recursos na conta do cliente (com quitação de eventuais débitos) e acompanhamento contínuo do fluxo de pagamento.',
        },
      ],
    },
    differentials: {
      eyebrow: 'Diferenciais',
      title: 'Por que contratar Home Equity com o Grupo Fileto',
      bullets: [
        'Operação IQ (Interveniente Quitante): quitação de dívidas de IPTU e condomínio por dentro da própria operação',
        'Mais de uma garantia por contrato e aceitação de garantias de terceiros mediante análise',
        'Sem limite de participantes para composição de renda entre os proponentes',
        'Pré-aprovação sem comprovação de renda através da Esteira Flex',
        'Aceitação de imóvel sem habite-se para viabilização do crédito',
        'Liberação no protocolo até R$ 1 milhão (após 1ª análise) sem averbação concomitante',
        'Operações estruturadas com Terceiro Garantidor (TQ)',
        'Parceria com fintech pioneira no mercado brasileiro, uma das 3 maiores do Brasil e mais de R$ 4 bilhões originados',
      ],
    },
    scenario: {
      eyebrow: 'Cenário brasileiro',
      title: 'Panorama do mercado de Home Equity e Financiamento Imobiliário no Brasil',
      body: 'O crédito com garantia de imóvel (Home Equity) e o Sistema Financeiro Imobiliário (SFI) consolidam-se como as alternativas mais eficientes de alavancagem de capital no Brasil. Em um cenário de taxas bancárias elevadas para crédito sem garantia, transformar patrimônio imobiliário em liquidez destrava negócios com custos substancialmente menores e prazos sustentáveis.',
      bullets: [
        'Taxas até 12 vezes mais baixas do que modalidades tradicionais como cheque especial, cartão e empréstimo pessoal sem garantia',
        'Expansão acelerada das operações via SFI e Home Equity no Brasil, impulsionadas pela digitalização e agilidade de fintechs especializadas',
        'Grande volume de concessões voltado a capital de giro empresarial, investimentos e consolidação de passivos onerosos',
        'Potencial bilionário ainda subutilizado no país, onde a maior parte do patrimônio das famílias e empresas permanece imobilizado',
        'O Grupo Fileto é Parceiro Contratado por uma das principais fintechs de Home Equity do país (pioneira, uma das 3 maiores do Brasil, +R$ 4 bilhões originados, 100% online), atuando com consultoria jurídica especializada na estruturação, análise e formalização das operações de Home Equity e SFI.',
      ],
    },
  },
  {
    id: '4',
    slug: 'direito-tributario',
    title: 'Direito Tributário',
    icon: 'Landmark',
    description: 'Planejamento fiscal e defesa em execuções e autuações fiscais.',
    fullDescription:
      'Oferecemos soluções inteligentes para otimização da carga tributária. Atuamos fortemente no contencioso administrativo e judicial, defendendo os interesses de nossos clientes contra autuações e buscando a recuperação de créditos.',
    subtitle: 'Soluções jurídicas estratégicas e inteligentes para otimização da carga tributária',
    sections: [
      {
        eyebrow: 'Estratégia Fiscal',
        title: 'PLANEJAMENTO TRIBUTÁRIO',
        paragraphs: [
          'O Planejamento Tributário consiste em uma análise minuciosa da estrutura fiscal de uma empresa, visando otimizar sua carga tributária de maneira legal e estratégica. Este serviço inclui a avaliação de diferentes regimes tributários disponíveis, identificação de incentivos fiscais aplicáveis, análise de créditos tributários, e a implementação de práticas que estejam alinhadas com a legislação vigente.',
          'Os principais objetivos são a redução dos custos fiscais, a prevenção de contingências tributárias, a maximização da eficiência operacional, e a garantia de conformidade com as normas legais. Além disso, busca-se proporcionar a empresa uma visão clara das implicações fiscais de suas atividades, permitindo uma gestão financeira mais estratégica e sustentável.',
          'Ao contar com a experiência de um advogado especializado, as empresas podem não apenas cumprir suas obrigações fiscais, mas também explorar oportunidades para otimizar seus recursos financeiros de maneira legal e ética.',
          'Assessoria tributária para adaptação da empresa cliente à Reforma Tributária, com análise dos impactos do novo sistema de tributação sobre o consumo (IBS e CBS), revisão da estrutura fiscal atual e implementação das adequações necessárias para garantir conformidade e competitividade na transição para o novo regime.',
        ],
      },
      {
        eyebrow: 'Negociação Fiscal',
        title: 'TRANSAÇÕES TRIBUTÁRIAS',
        paragraphs: [
          'Negociação fiscal com o objetivo de diminuir os impactos dos débitos fiscais na rotina das empresas que venham a ter alguma pendência fiscal, de forma que o contribuinte consiga pagar ao fisco enquanto continua em atividade. Em vários casos conseguimos adequar esses serviços com o de Recuperação Tributária, trazendo vantagens interessantes com a compensação de débitos e celeridade ao processo.',
        ],
      },
      {
        eyebrow: 'Contencioso Administrativo e Judicial',
        title: 'DEFESAS EM AUTUAÇÃO NAS ÁREAS ADMINISTRATIVA E JUDICIAL',
        paragraphs: [
          'Em casos de eventuais notificações e autuações fiscais a resposta do contribuinte precisa ser rápida e ao mesmo tempo bem fundamentada juridicamente falando, pois em muitos casos as notificações e autuações contêm erros que podem favorecer a defesa do contribuinte. Também pode ser adequado a esse serviço a Revisão Tributária, trazendo à tona Ativos Ocultos que serão aproveitados com a compensação de débitos, ou diretamente para reforçar o fluxo de caixa.',
        ],
      },
      {
        eyebrow: 'Recuperação e Revisão Fiscal',
        title: 'MAPEAMENTO E APROVEITAMENTO DE ATIVOS OCULTOS',
        paragraphs: [
          'Oportunidades para Indústria, Comércio e Serviços nos regimes de tributação do Lucro Real e Lucro Presumido.',
          'Consiste na Revisão dos recolhimentos dos últimos 5 anos, identificação e aproveitamento de valores pagos indevidamente ao Fisco. Serviço realizado com tecnologia avançada, analisando detalhadamente as obrigações fiscais dos últimos 5 anos, baseados na Legislação em vigor, conforme critérios da Receita Federal.',
          'Esse é um trabalho que orientamos a todos os empresários, pois a partir dela, as empresas contarão com a segurança de obter toda a sua operação corrigida, o que quer dizer que no caso de ter recolhido contribuições com valores a menor, poderá corrigi-las antes de uma cobrança futura pelo Fisco, que trará transtorno e custos elevados.',
          'Nesse sentido, o Mapeamento Fiscal é forte aliado do empresário, evitando que venha a sofrer uma autuação futura, além do possível aproveitamento de Créditos Tributários Ocultos',
          'Entre em contato para conhecer as oportunidades do seu mercado de atuação.',
        ],
      },
      {
        eyebrow: 'Auditoria e Compliance',
        title: '"DUE DILIGENCE" TRIBUTÁRIO',
        paragraphs: [
          'Análise detalhada dos aspectos tributários de uma empresa em caso de fusões, cisões, aquisições ou reestruturações com o objetivo de identificar riscos e passivos tributários que possam impactar a decisão de negócios',
        ],
      },
      {
        eyebrow: 'Consultoria Contínua',
        title: 'ASSESSORIA TRIBUTÁRIA',
        bullets: [
          'Estudo de Regimes Tributários: Orientação à empresa na escolha do regime tributário mais adequado às suas características, considerando aspectos como Lucro Real, Lucro Presumido ou Simples Nacional.',
          'Acompanhamento de Mudanças na Legislação: Atualização e monitoramento e análise constantemente das mudanças na legislação tributária para garantir que a empresa esteja ciente e se adapte a novas normas e regulamentações, evitando surpresas e garantindo conformidade.',
          'Gestão de Tributos Indiretos: Envolvem a administração dos tributos incidentes sobre o consumo, como ICMS, IPI, PIS, e COFINS, visando otimizar a carga tributária e garantir o correto cumprimento das obrigações acessórias.',
          'Gestão de Operações Fiscais: Fundamental para garantir que a empresa esteja em conformidade com a legislação tributária vigente, ao mesmo tempo em que busca a eficiência na gestão dos seus tributos.',
          'Elaboração de Pareceres Técnicos: Envolve a produção de documentos técnicos que interpretam e aplicam a legislação tributária a situações específicas, fornecendo embasamento legal para as decisões empresariais.',
        ],
      },
    ],
  },
  {
    id: '5',
    slug: 'planejamento-patrimonial-sucessorio',
    title: 'Planejamento Patrimonial e Sucessório',
    icon: 'Shield',
    description:
      'Estruturação de Holdings Familiares e Empresariais para proteção patrimonial e planejamento sucessório.',
    fullDescription: '',
    subtitle: 'Especialista em direito patrimonial e sucessório, o Grupo Fileto oferece',
    aboutSection: {
      eyebrow: 'Proteção patrimonial',
      title: 'Estruturação de Holdings Familiares e Empresariais',
      body: 'O planejamento patrimonial e sucessório é uma das áreas mais sensíveis e estratégicas do direito empresarial contemporâneo. O Grupo Fileto atua na estruturação de holdings — familiares e empresariais — como instrumento de proteção do patrimônio acumulado ao longo de gerações, otimização fiscal e organização da sucessão, prevenindo conflitos e assegurando a continuidade dos negócios de forma planejada, segura e eficiente.',
      bullets: [
        'Proteção do patrimônio pessoal e empresarial contra riscos e contingências',
        'Planejamento da sucessão hereditária com redução de carga tributária (ITCMD)',
        'Estruturação de holdings patrimoniais, familiares e empresariais',
        'Governança familiar: acordos de sócios, protocolos e regras de convivência',
        'Blindagem patrimonial contra penhoras, bloqueios judiciais e disputas societárias',
        'Reorganização societária com foco em eficiência fiscal e proteção de ativos',
        'Assessoria completa na elaboração de testamentos e doações com reserva de usufruto',
      ],
    },
    stats: [
      {
        value: '70%',
        label: 'das empresas familiares não sobrevivem à 2ª geração',
        icon: 'TrendingDown',
      },
      {
        value: 'Até 8%',
        label: 'de ITCMD (imposto sobre herança) — planejamento reduz essa carga',
        icon: 'Percent',
      },
      {
        value: '3ª+ geração',
        label: 'Empresas com holding sobrevivem por mais gerações',
        icon: 'Shield',
      },
      {
        value: '100%',
        label: 'de segurança jurídica na estruturação societária',
        icon: 'CheckCircle',
      },
    ],
    method: {
      eyebrow: 'Nossa metodologia',
      title: 'Um processo estruturado para proteger o seu legado',
      intro:
        'Da análise patrimonial inicial até a implementação completa da holding, conduzimos cada etapa com rigor técnico, confidencialidade absoluta e visão estratégica de longo prazo.',
      steps: [
        {
          number: '1',
          title:
            'Diagnóstico patrimonial: mapeamento completo de ativos, participações e estrutura societária atual',
        },
        {
          number: '2',
          title:
            'Análise de riscos e vulnerabilidades: identificação de exposições fiscais, societárias e familiares',
        },
        {
          number: '3',
          title:
            'Desenho da estrutura societária ideal: holding patrimonial, familiar ou empresarial conforme o caso',
        },
        {
          number: '4',
          title: 'Elaboração de acordos de sócios, protocolos familiares e regras de governança',
        },
        {
          number: '5',
          title:
            'Implementação jurídica: constituição, integralização de capital e reorganização societária',
        },
        {
          number: '6',
          title: 'Planejamento sucessório: testamentos, doações, usufruto e cláusulas de proteção',
        },
        {
          number: '7',
          title:
            'Monitoramento contínuo e atualização da estrutura conforme mudanças legislativas e familiares',
        },
      ],
    },
    differentials: {
      eyebrow: 'Diferenciais',
      title: 'Por que estruturar uma holding com o Grupo Fileto',
      bullets: [
        'Visão multidisciplinar: atuação integrada das áreas societária, tributária e sucessória',
        'Experiência comprovada de mais de 30 anos em direito empresarial e patrimonial',
        'Atendimento personalizado e confidencial para cada núcleo familiar ou empresarial',
        'Foco em resultados de longo prazo: perpetuidade do patrimônio e harmonia familiar',
        'Blindagem patrimonial completa contra os principais riscos do ambiente de negócios brasileiro',
        'Estruturação de holdings com total conformidade à legislação vigente e às normas da RFB',
        'Redução legal e planejada da carga tributária sobre heranças e doações (ITCMD)',
        'Prevenção de litígios familiares com acordos e protocolos de governança claros e eficazes',
      ],
    },
    scenario: {
      eyebrow: 'Cenário brasileiro',
      title: 'A importância do planejamento patrimonial e sucessório no Brasil',
      body: 'O Brasil tem uma das legislações mais complexas do mundo em matéria tributária e sucessória. Sem planejamento adequado, o patrimônio construído ao longo de uma vida pode ser dilapidado por disputas, tributos e ineficiências. Dados do IBGE, IBPT e IBGC demonstram a relevância desse planejamento.',
      bullets: [
        'Cerca de 90% das empresas brasileiras têm perfil familiar (IBGE)',
        'Apenas 30% das empresas familiares sobrevivem à transição para a segunda geração (IBGC)',
        'ITCMD pode chegar a 8% sobre o valor total dos bens transmitidos, a depender do estado',
        'Disputas societárias e familiares estão entre as principais causas de dissolução de empresas no Brasil',
        'A holding reduz a carga tributária sobre heranças e protege o patrimônio de penhoras e bloqueios',
      ],
    },
  },
  {
    id: '6',
    slug: 'consultoria-gestao-empresarial',
    title: 'Consultoria em Gestão Empresarial para Pequenas e Médias Empresas',
    icon: 'Briefcase',
    description:
      'Soluções estratégicas para pequenas e médias empresas superarem desafios de gestão, aumentarem a lucratividade e acelerarem o crescimento com a metodologia CONSULTING NOW.',
    fullDescription: '',
    subtitle: 'CONSULTING NOW: corresponsáveis pelas implantações — colocamos a mão na massa!',
    aboutSection: {
      eyebrow: 'CONSULTING NOW',
      title: 'Por que os empresários nos procuram',
      body: 'A CONSULTING NOW é referência nacional em consultoria de gestão empresarial, franquia, M&A e soluções sob medida para pequenas e médias empresas. Com a filosofia de 10% Inspiração, 90% Transpiração e 100% Paixão, vamos muito além de simples orientações ou aconselhamentos teóricos: somos corresponsáveis pelas implantações e colocamos a mão na massa ao lado do empresário.',
      bullets: [
        'Recuperação ou melhoria da lucratividade',
        'Aumento das vendas',
        'Redução de custos e despesas operacionais',
        'Reorganização geral de setores ou de toda a empresa',
        'Maximização para Expansão',
        'ERP — implantação e otimização de sistemas de gestão',
        'Recuperação de impostos e eficiência fiscal integrada',
        'Compra e venda de empresas (M&A) e consultoria em franquias',
        'Entre outras soluções personalizadas para o seu negócio',
      ],
    },
    stats: [
      {
        value: '32 anos',
        label: 'consolidados no mercado brasileiro',
        icon: 'Award',
      },
      {
        value: '+90',
        label: 'unidades espalhadas pelo Brasil',
        icon: 'MapPin',
      },
      {
        value: '+700',
        label: 'empresas reestruturadas com sucesso',
        icon: 'Building2',
      },
      {
        value: '100%',
        label: 'paixão e corresponsabilidade na implantação',
        icon: 'CheckCircle',
      },
    ],
    method: {
      eyebrow: 'Método CONSULTING NOW',
      title: 'Corresponsabilidade e implantação prática passo a passo',
      intro:
        'Nosso diferencial é ir muito além do diagnóstico tradicional: nós somos corresponsáveis pelas implantações. Atuamos lado a lado com sua equipe, transformando planos estratégicos em ações práticas e resultados mensuráveis no dia a dia da empresa.',
      steps: [
        {
          number: '1',
          title: 'Diagnóstico e Imersão no Negócio',
          description:
            'Mapeamento completo dos setores, finanças, equipe, processos e gargalos operacionais da empresa.',
        },
        {
          number: '2',
          title: 'Plano de Ação e Metas Claras',
          description:
            'Definição de cronograma, responsáveis, indicadores de desempenho (KPIs) e prioridades imediatas.',
        },
        {
          number: '3',
          title: 'Implantação Prática — Mão na Massa',
          description:
            'Execução conjunta no dia a dia, com corresponsabilidade real pelas mudanças e processos implantados.',
        },
        {
          number: '4',
          title: 'Reorganização e Otimização de Processos',
          description:
            'Ajustes nos setores comercial, financeiro, operacional e ERP para elevar vendas e cortar desperdícios.',
        },
        {
          number: '5',
          title: 'Monitoramento Contínuo e Resultados Mensuráveis',
          description:
            'Acompanhamento constante dos KPIs e evolução da lucratividade, garantindo a perenidade do crescimento.',
        },
      ],
    },
    differentials: {
      eyebrow: 'Diferenciais',
      title: 'Por que a CONSULTING NOW é a parceira ideal para o seu negócio',
      bullets: [
        'Corresponsabilidade na implantação: não ficamos apenas no conselho, colocamos a mão na massa',
        '+700 empresas reestruturadas com sucesso comprovado em diversos segmentos',
        '+90 unidades presentes em todo o Brasil para atendimento ágil e próximo',
        '32 anos consolidados no mercado com sólida bagagem e credibilidade',
        'Metodologia própria testada e aprimorada para pequenas e médias empresas',
        'Visão integrada (gestão + tributário + jurídico) potencializada pela estrutura do Grupo Fileto',
        'Monitoramento contínuo: suporte presente em cada fase da transformação',
        'Resultados mensuráveis: recuperação de lucratividade, aumento de vendas e controle de custos',
      ],
    },
    scenario: {
      eyebrow: 'Atitude e transformação',
      title: 'Coragem para transformar e construir um negócio de sucesso',
      body: '“Para ter um negócio de sucesso, alguém, algum dia, teve que tomar uma atitude de coragem.” — Peter Drucker. Pequenas e médias empresas enfrentam um mercado competitivo e exigente. Superar desafios operacionais, fiscais e estratégicos exige decisão, dedicação diária e a parceria certa para implementar as mudanças necessárias.',
      bullets: [
        'Filosofia de trabalho: 10% Inspiração, 90% Transpiração e 100% Paixão em cada projeto',
        'Produtos especializados: Consultoria de gestão empresarial, Consultoria empresarial franquia, Consultoria M&A e Soluções para PMEs',
        'Foco direto nos pilares vitais do negócio: lucratividade, vendas, despesas, reorganização e expansão',
        'Parceria estratégica de longo prazo para transformar empresas e consolidar sua liderança',
      ],
    },
  },
]

export interface TeamMember {
  id: string
  slug: string
  name: string
  role: string
  image: string
  bio: string
  extendedBio?: string[]
  expertise: string[]
  email: string
  phone?: string
  credentials?: { label: string; value: string }[]
}

import ceoPhoto from '@/assets/whatsapp-image-2026-09-13-at-12.20.46-aff67.jpeg'

export const founderMember: TeamMember = {
  id: '1',
  slug: 'claudio-fileto',
  name: 'Claudio Fileto',
  role: 'CEO - Sócio Fundador',
  image: ceoPhoto,
  bio: 'Advogado desde 1991, especialista em administração empresarial e direito tributário, com mais de 25 anos de sólida atuação em gestão e direção executiva em grandes empresas nacionais e multinacionais. Fundador do GRUPO FILETO.',
  extendedBio: [
    'Advogado inscrito na OAB desde 1991, Claudio Fileto reúne mais de três décadas de sólida trajetória jurídica e executiva, com especializações nas áreas de administração empresarial e direito tributário.',
    'Ao longo de mais de 25 anos ocupando posições de gestão e alta liderança em grandes companhias nacionais e multinacionais, desenvolveu uma visão estratégica 360° sobre negócios, finanças estruturadas, eficiência tributária e governança.',
    'Em janeiro de 2019, fundou o GRUPO FILETO com o propósito de oferecer às empresas e empresários uma advocacia consultiva e estratégica de alto padrão, que alia rigor técnico à geração prática de valor e proteção patrimonial.',
  ],
  expertise: [
    'Gestão Empresarial',
    'Inteligência Tributária',
    'Home Equity',
    'Governança',
    'M&A',
    'Consultoria Empresarial',
    'Planejamento Patrimonial, Societário e Sucessório (Holdings)',
  ],
  email: 'contato@grupofileto.com',
  phone: '+55 (11) 93329-3331',
  credentials: [
    { label: 'Advocacia', value: 'Desde 1991' },
    { label: 'Trajetória Executiva', value: '25+ Anos em Grandes Empresas' },
    { label: 'Fundação', value: 'GRUPO FILETO (2019)' },
    { label: 'Especialização', value: 'Administração Empresarial e Direito Tributário' },
  ],
}

export const teamMembers: TeamMember[] = [founderMember]
