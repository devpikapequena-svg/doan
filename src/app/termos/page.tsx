'use client'

import { useRouter } from 'next/navigation';

export default function TermsOfUsePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <div className="px-4 py-6 md:py-14 max-w-[800px] mx-auto">
        <div className="bg-[#69d13b] text-white p-4 rounded-t-2xl">
          <h1 className="text-3xl font-extrabold">Termos de Uso</h1>
          <p className="text-sm">Última atualização: Dezembro de 2024</p>
        </div>

        {/* Section 1: Aceitação dos Termos */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">1. Aceitação dos Termos</h2>
          <p className="mt-2 text-black/70">
            Ao acessar e utilizar esta plataforma de arrecadação, você concorda com estes Termos de Uso. Se não concordar, por favor, não utilize nossos serviços.
          </p>
        </div>

        {/* Section 2: Descrição do Serviço */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">2. Descrição do Serviço</h2>
          <p className="mt-2 text-black/70">
            Esta plataforma oferece um meio para arrecadação de contribuições financeiras destinadas a apoiar o tratamento e cuidados da Manuela. Atuamos como intermediários entre doadores e beneficiários.
          </p>
        </div>

        {/* Section 3: Elegibilidade */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">3. Elegibilidade</h2>
          <p className="mt-2 text-black/70">
            Para fazer uma contribuição, você deve:
          </p>
          <ul className="list-disc list-inside mt-4 text-black/70">
            <li>Ter pelo menos 18 anos de idade</li>
            <li>Ter capacidade legal para celebrar contratos</li>
            <li>Fornecer informações verdadeiras e precisas</li>
            <li>Não estar proibido por lei de utilizar nossos serviços</li>
          </ul>
        </div>

        {/* Section 4: Contribuições */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">4. Contribuições</h2>
          <p className="mt-2 text-black/70">As contribuições são voluntárias e consideradas doações. Não há obrigação de reembolso, exceto em casos de erro comprovado no processamento.</p>
        </div>

        {/* Section 5: Uso Aceitável */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">5. Uso Aceitável</h2>
          <p className="mt-2 text-black/70">
            Você concorda em NÃO:
          </p>
          <ul className="list-disc list-inside mt-4 text-black/70">
            <li>Usar a plataforma para atividades ilegais ou fraudulentas</li>
            <li>Fazer contribuições com cartões ou meios de pagamento não autorizados</li>
            <li>Tentar acessar áreas restritas da plataforma</li>
            <li>Interferir no funcionamento normal do serviço</li>
            <li>Usar bots, scripts ou ferramentas automatizadas</li>
            <li>Coletar informações de outros usuários sem consentimento</li>
          </ul>
        </div>

        {/* Section 6: Propriedade Intelectual */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">6. Propriedade Intelectual</h2>
          <p className="mt-2 text-black/70">
            Todo o conteúdo desta plataforma, incluindo textos, imagens, logotipos e design, é protegido por direitos autorais e outras leis de propriedade intelectual. O uso não autorizado é proibido.
          </p>
        </div>

        {/* Section 7: Transparência e Prestação de Contas */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">7. Transparência e Prestação de Contas</h2>
          <p className="mt-2 text-black/70">
            Nos comprometemos a manter transparência sobre o uso dos recursos arrecadados e a fornecer atualizações periódicas sobre o progresso do caso.
          </p>
        </div>

        {/* Section 8: Limitação de Responsabilidade */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">8. Limitação de Responsabilidade</h2>
          <p className="mt-2 text-black/70">
            Esta plataforma é fornecida "como está". Não garantimos:
          </p>
          <ul className="list-disc list-inside mt-4 text-black/70">
            <li>Disponibilidade interrupta do serviço</li>
            <li>Ausência de erros ou vírus</li>
            <li>Resultados específicos do tratamento (decisões médicas são independentes)</li>
          </ul>
        </div>

        {/* Section 9: Cancelamento e Reembolso */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">9. Cancelamento e Reembolso</h2>
          <p className="mt-2 text-black/70">
            Devido à natureza da doação das contribuições, não oferecemos reembolsos, exceto em casos de erro comprovado no processamento do pagamento.
          </p>
        </div>

        {/* Section 10: Modificações nos Termos */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">10. Modificações nos Termos</h2>
          <p className="mt-2 text-black/70">
            Reservamos o direito de modificar estes termos a qualquer momento. Mudanças significativas serão notificadas através do site. O uso continuado após alterações constitui aceitação dos novos termos.
          </p>
        </div>

        {/* Section 11: Lei Aplicável e Jurisdição */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">11. Lei Aplicável e Jurisdição</h2>
          <p className="mt-2 text-black/70">
            Estes termos são regidos pelas leis da República Federativa do Brasil. Eventuais disputas serão resolvidas nos tribunais brasileiros competentes.
          </p>
        </div>

        {/* Section 12: Contato */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">12. Contato</h2>
          <p className="mt-2 text-black/70">
            Para dúvidas sobre estes termos, entre em contato através da nossa <a href="/contato" className="text-[#69d13b]">página de contato</a>.
          </p>
        </div>

        {/* Section 13: Disposições Gerais */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">13. Disposições Gerais</h2>
          <p className="mt-2 text-black/70">
            Se qualquer parte destes termos for considerada inválida, as demais disposições permanecerão em vigor. Nenhuma renúncia a qualquer termo será considerada como renúncia contínua.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => router.push('/')}
            className="h-12 px-6 rounded-xl bg-[#69d13b] text-white font-semibold shadow-md hover:brightness-95 active:brightness-90"
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    </div>
  )
}
