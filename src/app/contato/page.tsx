'use client'

import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <div className="px-4 py-6 md:py-14 max-w-[800px] mx-auto">
        <div className="bg-[#69d13b] text-white p-4 rounded-t-2xl">
          <h1 className="text-3xl font-extrabold">Contato</h1>
        </div>

        {/* Contact Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Suporte</h2>
          <div className="mt-4">
            <h3 className="font-medium">Email</h3>
            <p className="mt-2 text-black/70">
              <strong>Suporte geral:</strong> contato@campdobem
            </p>
            <p className="mt-2 text-black/70">
              <strong>Dúvidas sobre doações:</strong> doacoes@campdobem
            </p>
            <p className="mt-2 text-black/70">
              <strong>Questões de privacidade:</strong> privacidade@campdobem
            </p>
            <p className="mt-2 text-black/70">Tempo de resposta: até 48 horas úteis</p>
          </div>

          <div className="mt-6 bg-yellow-100 p-4 rounded-xl">
            <p className="text-black/70">
              <strong>Importante:</strong> Para questões sobre pagamentos, tenha em mãos o número da transação ou comprovante. Não compartilhe senhas ou dados bancários completos por e-mail ou redes sociais.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Perguntas Frequentes</h2>

          <div className="mt-4">
            <h3 className="font-medium">Como posso acompanhar o uso das doações?</h3>
            <p className="mt-2 text-black/70">
              Publicamos atualizações regulares na página principal e nas redes sociais sobre o andamento do tratamento e uso dos recursos.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-medium">Posso fazer uma doação anônima?</h3>
            <p className="mt-2 text-black/70">
              Sim! Ao fazer sua contribuição, basta marcar a opção "Doar anonimamente" e seu nome não será exibido publicamente.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-medium">Minha doação não foi confirmada. O que fazer?</h3>
            <p className="mt-2 text-black/70">
              Entre em contato pelo email doacoes@campdobem com o comprovante de pagamento. Verificaremos e resolveremos o problema em até 24 horas úteis.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-medium">Posso contribuir de outras formas além de dinheiro?</h3>
            <p className="mt-2 text-black/70">
              Entre em contato conosco pelo e-mail ou redes sociais para discutir outras formas de apoio. Toda ajuda é bem-vinda!
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-medium">Como reportar um problema técnico?</h3>
            <p className="mt-2 text-black/70">
              Envie um email para contato@campdobem descrevendo o problema, incluindo prints de tela se possível.
            </p>
          </div>
        </div>

        {/* Legal Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Informações Legais</h2>
          <p className="mt-2 text-black/70">
            Para dúvidas sobre nossos termos de uso e políticas, consulte:
          </p>
          <div className="flex flex-col mt-4">
            <button
              onClick={() => router.push('/privacidade')}
              className="text-[#69d13b] hover:text-[#4a9d1b] text-lg"
            >
              Política de Privacidade
            </button>
            <button
              onClick={() => router.push('/termos')}
              className="text-[#69d13b] hover:text-[#4a9d1b] text-lg mt-2"
            >
              Termos de Uso
            </button>
          </div>
        </div>

        {/* Back Button */}
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
