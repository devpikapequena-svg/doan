'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SucessoPage() {
  const router = useRouter()

  const handleGoHome = () => {
    // Redireciona o usuário para a página inicial
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white text-[#111] flex flex-col items-center justify-center py-12">
      <div className="max-w-[800px] mx-auto text-center">
        {/* Imagem de Sucesso */}
        <div className="mb-6">
          <Image
            src="https://estandocomvoce.com/img/caaat.png" // Altere a URL para a imagem desejada
            alt="Sucesso"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>

        {/* Mensagem de Sucesso */}
        <h1 className="text-3xl font-extrabold text-[#69d13b]">Pagamento Confirmado!</h1>
        <p className="mt-4 text-lg text-black/70">
          Seu pagamento foi confirmado com sucesso. Obrigado por apoiar a Manuela! 🎉
        </p>

        {/* Detalhes adicionais */}
        <div className="mt-8 space-y-4">
          <p className="text-[16px] md:text-[18px] text-black/60">
            Sua contribuição já foi registrada, e em breve, você receberá um e-mail de confirmação.
          </p>
          <p className="text-[16px] md:text-[18px] text-black/60">
            Caso precise de mais informações, entre em contato com nosso suporte.
          </p>
        </div>

        {/* Botão para voltar à página inicial */}
        <div className="mt-8">
          <button
            onClick={handleGoHome}
            className="h-12 px-6 rounded-xl bg-[#69d13b] text-white font-semibold shadow-md hover:brightness-95 active:brightness-90"
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    </div>
  )
}
