'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PrivacyPolicyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <div className="px-4 py-6 md:py-14 max-w-[800px] mx-auto">
        <div className="bg-[#69d13b] text-white p-4 rounded-t-2xl">
          <h1 className="text-3xl font-extrabold">Política de Privacidade</h1>
          <p className="text-sm">Última atualização: Dezembro de 2024</p>
        </div>

        {/* Section 1: Informações que Coletamos */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">1. Informações que Coletamos</h2>
          <p className="mt-2 text-black/70">
            Coletamos apenas as informações essenciais para processar sua contribuição:
          </p>
          <ul className="list-disc list-inside mt-4 text-black/70">
            <li>Nome (opcional, se você escolher não doar anonimamente)</li>
            <li>Valor da doação</li>
            <li>Informações de pagamento processadas através do gateway de pagamento</li>
            <li>Mensagem de apoio (opcional)</li>
            <li>Dados técnicos básicos (endereço IP, navegador) para segurança e prevenção de fraudes</li>
          </ul>
        </div>

        {/* Section 2: Como Usamos suas Informações */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">2. Como Usamos suas Informações</h2>
          <p className="mt-2 text-black/70">
            Utilizamos suas informações exclusivamente para:
          </p>
          <ul className="list-disc list-inside mt-4 text-black/70">
            <li>Processar sua contribuição</li>
            <li>Enviar confirmação de pagamento</li>
            <li>Exibir seu nome e mensagem na página (se você consentir)</li>
            <li>Cumprir obrigações legais e fiscais</li>
            <li>Prevenir fraudes e garantir a segurança da plataforma</li>
          </ul>
        </div>

        {/* Section 3: Compartilhamento de Informações */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">3. Compartilhamento de Informações</h2>
          <p className="mt-2 text-black/70">
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
          </p>
          <ul className="list-disc list-inside mt-4 text-black/70">
            <li>Processadores de pagamento necessários para concluir sua transação</li>
            <li>Quando exigido por lei ou ordem judicial</li>
            <li>Para proteger nossos direitos legais ou prevenir atividades ilegais</li>
          </ul>
        </div>

        {/* Section 4: Segurança dos Dados */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">4. Segurança dos Dados</h2>
          <p className="mt-2 text-black/70">
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>
        </div>

        {/* Section 5: Seus Direitos */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">5. Seus Direitos</h2>
          <p className="mt-2 text-black/70">
            Você tem o direito de:
          </p>
          <ul className="list-disc list-inside mt-4 text-black/70">
            <li>Acessar suas informações pessoais</li>
            <li>Solicitar correção de dados incorretos</li>
            <li>Solicitar exclusão de seus dados (quando aplicável)</li>
            <li>Retirar seu consentimento a qualquer momento</li>
            <li>Reclamar junto à autoridade de proteção de dados</li>
          </ul>
        </div>

        {/* Section 6: Retenção de Dados */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">6. Retenção de Dados</h2>
          <p className="mt-2 text-black/70">
            Mantemos suas informações apenas pelo tempo necessário para cumprir as finalidades descritas nesta política e conforme exigido pela legislação brasileira.
          </p>
        </div>

        {/* Section 7: Cookies e Tecnologias Similares */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">7. Cookies e Tecnologias Similares</h2>
          <p className="mt-2 text-black/70">
            Utilizamos cookies essenciais para o funcionamento do site e cookies de análise para melhorar a experiência do usuário. Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
          </p>
        </div>

        {/* Section 8: Alterações nesta Política */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">8. Alterações nesta Política</h2>
          <p className="mt-2 text-black/70">
            Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através do site.
          </p>
        </div>

        {/* Section 9: Contato */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">9. Contato</h2>
          <p className="mt-2 text-black/70">
            Para questões sobre privacidade ou exercer seus direitos, entre em contato através da nossa <a href="/contato" className="text-[#69d13b]">página de contato</a>.
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
