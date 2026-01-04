'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

type Supporter = {
  id: string
  name: string
  message: string
  avatar: string
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function parseBRLInput(raw: string) {
  const cleaned = raw.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.').trim()
  const n = Number(cleaned)
  if (!Number.isFinite(n)) return 0
  return n
}

function formatTime(seconds: number) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function Page() {
  const donateRef = useRef<HTMLDivElement | null>(null)

  const campaign = useMemo(() => {
    const goal = 49000
    const raised = 36740
    const createdAt = '01/12'

    const supporters: Supporter[] = [
      {
        id: 's1',
        name: 'Ana Paula',
        message: 'Contribuí para a Manuela, espero que ela consiga fazer a cirurgia logo',
        avatar:
          'https://estandocomvoce.com/img/a13.jpg',
      },
      {
        id: 's2',
        name: 'Roberto Santos',
        message:
          'Se nos juntarmos, conseguimos bater essa meta rapidinho, só cada um fazer sua parte!',
        avatar:
          'https://estandocomvoce.com/img/a6.jpg',
      },
      {
        id: 's3',
        name: 'Juliana Costa',
        message: 'Muita força para a Manuela e sua mãe, vocês são guerreiras',
        avatar:
          'https://estandocomvoce.com/img/a5.jpg',
      },
      {
        id: 's4',
        name: 'Thiago Almeida',
        message: 'Doei o que consegui, espero que tudo dê certo para ela',
        avatar:
          'https://estandocomvoce.com/img/a3.jpg',
      },
    ]

    return { goal, raised, createdAt, supporters }
  }, [])

  const progress = clamp((campaign.raised / campaign.goal) * 100, 0, 100)

  // form
  const presetValues = [30, 45, 75, 100, 140, 200, 300, 500, 1000]
  const minAmount = 30

  const [selected, setSelected] = useState<number | null>(null)
  const [amountRaw, setAmountRaw] = useState('50')
  const [name, setName] = useState('')
  const [anon, setAnon] = useState(false)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)

  const amount = selected ?? parseBRLInput(amountRaw)

  // PIX modal + status
  const [showPixModal, setShowPixModal] = useState(false)
  const [pixData, setPixData] = useState<{ code: string; qrcode_base64: string } | null>(null)
  const [loadingPix, setLoadingPix] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300)

  function scrollToDonate() {
    donateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function pickPreset(v: number) {
    setSelected(v)
    setAmountRaw(String(v))
    setToast(null)
  }

  function toggleAnon(next: boolean) {
    setAnon(next)
    if (next) setName('Doação anônima')
    else setName('')
  }

  // Move useRouter() outside of useEffect
  const router = useRouter();

  // Reinicia o timer ao abrir o modal
  useEffect(() => {
    if (showPixModal) setTimeLeft(300)
  }, [showPixModal])

  useEffect(() => {
    if (!showPixModal) return;

    const extId = localStorage.getItem('external_id');
    if (!extId) return;

    let stopped = false;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/create-payment?externalId=${extId}`);
        const data = await res.json();

        if (data.status === 'PAID' || data.status === 'APPROVED') {
          localStorage.removeItem('external_id');
          setShowPixModal(false);
          setToast({ kind: 'ok', text: 'Pagamento confirmado! Obrigado por apoiar ❤️' });
          router.push('/sucesso');
        } else if (!stopped) {
          setTimeout(checkStatus, 7000);
        }
      } catch (error) {
        console.error("Erro ao verificar o status do pagamento:", error);
        if (!stopped) setTimeout(checkStatus, 10000);
      }
    };

    checkStatus();

    return () => {
      stopped = true;
    };
  }, [showPixModal, router]); // Make sure router is added as a dependency here

  async function generatePix(amountValue: number) {
    setToast(null)

    const finalAmount = amountValue
    if (!finalAmount || finalAmount < minAmount) {
      setToast({ kind: 'err', text: `Valor mínimo: ${formatBRL(minAmount)}` })
      return
    }

    const supporterName = anon ? 'Doação Anônima' : name?.trim() || ''
    if (!anon && supporterName.length < 2) { }

    setLoadingPix(true)
    try {
      const externalId = `don${Date.now()}`

      const payload = {
        name: supporterName || 'Apoiador',
        email: 'anonimo@bem.com.br',
        phone: '9999999999',
        amount: finalAmount,
        items: [
          {
            id: 'don',
            title: 'do',
            unitPrice: finalAmount,
            quantity: 1,
            tangible: false,
          },
        ],
        externalId,
      }

      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setToast({ kind: 'err', text: 'Erro ao gerar PIX. Tente novamente.' })
        return
      }

      if (data.data?.pix) {
        setPixData({
          code: data.data.pix.code,
          qrcode_base64: data.data.pix.qrcode_base64,
        })
        localStorage.setItem('external_id', externalId)
        setShowPixModal(true)
      } else {
        setToast({ kind: 'err', text: 'Resposta inválida ao gerar PIX.' })
      }
    } catch {
      setToast({ kind: 'err', text: 'Erro ao gerar PIX.' })
    } finally {
      setLoadingPix(false)
    }
  }

  async function onSubmit() {
    await generatePix(selected ?? parseBRLInput(amountRaw))
  }


  return (
    <div className="min-h-screen bg-white text-[#111]">
      <div className="px-0 py-0 md:py-14">
        <div className="mx-auto w-full max-w-[980px] rounded-2xl border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
          <TopNav onDonateClick={scrollToDonate} />

          <div className="px-6 md:px-12 py-10 md:py-12">
            <Hero createdAt={campaign.createdAt} onPrimaryClick={scrollToDonate} />

            <ProgressBar raised={campaign.raised} goal={campaign.goal} progress={progress} />

            <div className="mt-10 md:mt-12 space-y-6 text-[15px] leading-7 text-black/70">
              <p>
                A Manuela é uma menina que precisa de ajuda para coisas que, para outras crianças,
                são simples.
              </p>

              <div className="flex justify-center">
                <button
                  onClick={scrollToDonate}
                  className="h-12 px-10 rounded-xl bg-[#69d13b] text-white font-semibold shadow-[0_10px_25px_rgba(105,209,59,0.35)] hover:brightness-95 active:brightness-90"
                >
                  Apoiar Manuela
                </button>
              </div>

              <p>
                Ela tem paralisia cerebral grau três. Isso faz com que os músculos das pernas fiquem
                cada vez mais rígidos.
              </p>

              <p>Os pés começaram a encurtar. E os movimentos estão ficando mais difíceis com o tempo.</p>

              <div className="flex justify-center pt-0">
                <div className="w-full max-w-[520px] bg-white shadow-sm p-4">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-black/[0.03]">
                    <Image
                      alt="Orçamento"
                      src="https://estandocomvoce.com/img/papel.webp"
                      fill
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* texto abaixo do orçamento (igual ao print) */}
            <div className="mt-6 space-y-5 text-[15px] leading-6 text-black/70">
              <p>
                Existe uma cirurgia indicada para soltar esses músculos. É um passo importante para
                melhorar o conforto dela e evitar que essas limitações avancem ainda mais.
              </p>

              <p className="font-semibold text-black/70">O problema é o valor.</p>

              <p>A cirurgia custa caro. Muito mais do que a família consegue pagar sozinha.</p>

              <p>
                Mesmo tentando de tudo, o que foi arrecadado até agora ainda está longe do necessário.
              </p>

              <p>
                Enquanto isso, a rotina segue pesada. Consultas, cuidados diários e a preocupação
                constante de não conseguir fazer a cirurgia no momento certo.
              </p>

              <div className="flex justify-center pt-2">
                <button
                  onClick={scrollToDonate}
                  className="h-12 px-10 rounded-xl bg-[#69d13b] text-white font-semibold shadow-[0_10px_25px_rgba(105,209,59,0.35)] hover:brightness-95 active:brightness-90"
                >
                  Apoiar Manuela
                </button>
              </div>

              <p>
                A mãe não desistiu. Ela continua lutando todos os dias. Mas chegou num ponto em que
                precisa de apoio para seguir.
              </p>

              <p>Essa página reúne pessoas que podem ajudar a Manuela a chegar até essa cirurgia.</p>

              <p>
                Às vezes, o que é pouco para alguém faz muita diferença para quem vive isso todos os dias.
              </p>
            </div>

            {/* Donate section */}
            <div ref={donateRef} className="mt-14 md:mt-16">
              <h2 className="text-center text-[18px] md:text-4xl font-extrabold text-[#111]">
                Selecione um valor para doar
              </h2>

              <div className="mt-6 md:mt-10 mx-auto w-full max-w-[640px] px-1 sm:px-0">
                {/* Presets */}
                <div className="grid grid-cols-2 gap-4 md:gap-5">
                  {presetValues.slice(0, 8).map((v) => (
                    <button
                      key={v}
                      onClick={() => {
                        pickPreset(v)
                        generatePix(v) // ✅ gera Pix + abre modal
                      }}
                      disabled={loadingPix}
                      className={[
                        'h-14 md:h-[72px] rounded-xl font-extrabold text-[16px] md:text-xl',
                        'bg-[#69d13b] text-white shadow-[0_12px_22px_rgba(105,209,59,0.30)]',
                        'hover:brightness-95 active:brightness-90',
                        selected === v ? 'ring-4 ring-[#69d13b]/25' : '',
                        loadingPix ? 'opacity-80 cursor-wait' : '',
                      ].join(' ')}
                    >
                      {formatBRL(v).replace('R$', 'R$')}
                    </button>
                  ))}
                </div>

                {/* Big 1000 */}
                <button
                  onClick={() => {
                    pickPreset(1000)
                    generatePix(1000) // ✅ gera Pix + abre modal
                  }}
                  disabled={loadingPix}
                  className={[
                    'mt-4 w-full h-[72px] md:h-[78px] rounded-2xl font-extrabold text-[18px] md:text-xl',
                    'bg-[#69d13b] text-white shadow-[0_14px_26px_rgba(105,209,59,0.32)]',
                    'hover:brightness-95 active:brightness-90',
                    selected === 1000 ? 'ring-4 ring-[#69d13b]/25' : '',
                    loadingPix ? 'opacity-80 cursor-wait' : '',
                  ].join(' ')}
                >
                  {formatBRL(1000).replace('R$', 'R$')}
                </button>

                {/* Custom amount */}
                <div className="mt-10">
                  <p className="text-center font-semibold text-black/70">Valor personalizado</p>

                  <div className="mt-4 flex justify-center">
                    <div className="w-full max-w-[420px]">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 font-semibold">
                          R$
                        </span>
                        <input
                          value={amountRaw}
                          onChange={(e) => {
                            setSelected(null)
                            setAmountRaw(e.target.value)
                          }}
                          inputMode="decimal"
                          placeholder="50"
                          className="w-full h-12 md:h-14 rounded-lg border border-black/15 pl-12 pr-4 text-[15px] md:text-[16px] outline-none focus:border-black/25"
                        />
                      </div>
                      <p className="mt-2 text-center text-sm text-black/45">
                        Valor mínimo: {formatBRL(minAmount)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name + anon */}
                <div className="mt-8 md:mt-10">
                  <label className="block text-[14px] md:text-[15px] font-semibold text-black/70">
                    Nome
                  </label>

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={anon}
                    placeholder="Digite seu nome"
                    className={[
                      'mt-2 w-full h-12 md:h-14 rounded-lg border border-black/15 px-4 text-[15px] md:text-[16px] outline-none',
                      'focus:border-black/25',
                      anon ? 'bg-black/[0.03] text-black/60 cursor-not-allowed' : 'bg-white',
                    ].join(' ')}
                  />

                  <label className="mt-4 flex items-center gap-3 text-black/70 select-none text-[14px] md:text-[15px]">
                    <input
                      type="checkbox"
                      checked={anon}
                      onChange={(e) => toggleAnon(e.target.checked)}
                      className="h-5 w-5"
                    />
                    Doar anonimamente
                  </label>
                </div>

                {/* Message */}
                <div className="mt-8">
                  <div className="mb-3">
                    <div className="text-[16px] md:text-[18px] font-extrabold text-[#111]">
                      Adicionar mensagem <span className="font-semibold text-black/40">(opcional)</span>
                    </div>
                    <div className="mt-1 text-[13px] md:text-[14px] text-black/55">
                      Adicione uma mensagem de apoio para Manu
                    </div>
                  </div>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem aqui..."
                    className="w-full min-h-[120px] md:min-h-[150px] rounded-lg border border-black/15 p-4 text-[15px] md:text-[16px] outline-none focus:border-black/25 resize-y"
                  />
                </div>

                {/* Submit */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={onSubmit}
                    disabled={submitting || loadingPix}
                    className={[
                      'h-12 md:h-14 w-full md:w-[320px] rounded-xl font-extrabold text-white text-[15px] md:text-[16px]',
                      'bg-[#69d13b] shadow-[0_14px_26px_rgba(105,209,59,0.32)]',
                      'hover:brightness-95 active:brightness-90',
                      submitting || loadingPix ? 'opacity-70 cursor-not-allowed' : '',
                    ].join(' ')}
                  >
                    {loadingPix ? 'Gerando Pix...' : submitting ? 'Processando...' : `Ajudar Agora • ${formatBRL(amount)}`}
                  </button>
                </div>

                {toast && (
                  <div
                    className={[
                      'mt-5 rounded-lg border px-4 py-3 text-sm',
                      toast.kind === 'ok'
                        ? 'border-green-200 bg-green-50 text-green-800'
                        : 'border-red-200 bg-red-50 text-red-800',
                    ].join(' ')}
                  >
                    {toast.text}
                  </div>
                )}
              </div>
            </div>

            {/* Supporters */}
            <div className="mt-16 md:mt-20 border-t border-black/10 pt-10 md:pt-12">
              <div className="mx-auto w-full max-w-[820px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {campaign.supporters.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-xl border border-black/10 bg-white shadow-sm px-6 py-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-black/[0.04]">
                          <Image alt={s.name} src={s.avatar} fill className="object-cover" />
                        </div>
                        <div className="font-extrabold text-black/80">{s.name}</div>
                      </div>
                      <p className="mt-3 text-[14px] leading-6 text-black/60">{s.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>

      {/* === MODAL PIX (igual ao print / inspirado no seu cart) === */}
      {showPixModal && pixData && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-[520px] rounded-2xl overflow-hidden relative shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            {/* header */}
            <div className="h-16 flex items-center justify-center relative border-b border-black/10">
              <div className="relative h-8 w-[150px]">
                <Image
                  alt="Campanhas do Bem"
                  src="https://estandocomvoce.com/img/caaat.png"
                  fill
                  className="object-contain"
                />
              </div>

              <button
                onClick={() => setShowPixModal(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            {/* body */}
            <div className="px-6 md:px-8 py-6">
              <div className="text-center text-[28px] md:text-[34px] font-extrabold text-[#111]">
                {formatBRL(selected ?? amount)}
              </div>

              <div className="mt-5 flex justify-center">
                <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
                  <div className="w-[220px] h-[220px] md:w-[250px] md:h-[250px] flex items-center justify-center">
                    <img
                      src={`data:image/png;base64,${pixData.qrcode_base64}`}
                      alt="QR Code Pix"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-black/10 bg-white">
                <div className="px-4 pt-4 text-center text-[12px] font-semibold tracking-wide text-black/50">
                  CHAVE PIX COPIA E COLA
                </div>

                <div className="px-4 pb-4 pt-3">
                  <div className="rounded-lg border border-black/10 bg-white">
                    <div className="px-3 py-3">
                      <textarea
                        readOnly
                        value={pixData.code}
                        className="w-full h-14 text-[12px] md:text-[13px] leading-5 outline-none resize-none text-black/70"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigator.clipboard.writeText(pixData.code)}
                    className="mt-3 w-full h-12 rounded-xl bg-[#69d13b] text-white font-extrabold shadow-[0_12px_22px_rgba(105,209,59,0.25)] hover:brightness-95 active:brightness-90"
                  >
                    Copiar Chave PIX
                  </button>

                  <div className="mt-4 text-center text-xs text-black/45">
                    Use o QR Code ou copie a chave PIX acima
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TopNav({ onDonateClick }: { onDonateClick: () => void }) {
  return (
    <div className="h-[72px] border-b border-black/10 flex items-center justify-between px-3 md:px-10 bg-white">
      <div className="flex items-center">
        <div className="relative h-10 w-[140px] md:w-[150px]">
          <Image
            alt="Campanhas do Bem"
            src="https://estandocomvoce.com/img/caaat.png"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <button
        onClick={onDonateClick}
        className="h-8 px-3 rounded-full bg-[#ff7a00] text-[10px] text-white font-medium shadow-sm hover:brightness-95 active:brightness-90"
      >
        Vaquinha
      </button>
    </div>
  )
}

function Hero({ createdAt, onPrimaryClick }: { createdAt: string; onPrimaryClick: () => void }) {
  return (
    <div className="text-center">
      <h1 className="text-[20px] md:text-[34px] font-extrabold text-[#111] leading-tight">
        Um novo passo pode trazer mais leveza à rotina
        <br className="hidden md:block" /> da Manuela
      </h1>

      <div className="mt-4 flex justify-center">
        <div className="w-full max-w-[500px] bg-black/[0.03]">
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              alt="Manuela"
              src="https://estandocomvoce.com/img/mazp.webp"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="py-4 text-[12px] text-black/55 space-y-1">
            <div>
              Campanha criada em <span className="font-semibold">{createdAt}</span>
            </div>

            <div>
              Vaquinha criada por{' '}
              <span className="font-semibold text-black/70">Juliana Silva (Mãe da Manu)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-0 flex justify-center">
        <button onClick={onPrimaryClick} className="hidden" aria-hidden="true" />
      </div>
    </div>
  )
}

function ProgressBar({ raised, goal, progress }: { raised: number; goal: number; progress: number }) {
  return (
    <div className="mt-0 md:mt-12">
      <div className="flex items-center justify-center gap-3 text-[13px] md:text-[17px]">
        <span className="text-black/55">Arrecadado</span>
        <span className="font-extrabold text-[#111]">{formatBRL(raised).replace('R$', 'R$')}</span>
        <span className="text-black/25">/</span>
        <span className="text-black/55">Meta</span>
        <span className="font-extrabold text-[#3aa81d]">{formatBRL(goal).replace('R$', 'R$')}</span>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="w-full max-w-[620px] h-3 rounded-full bg-black/10 overflow-hidden">
          <div className="h-full bg-[#69d13b] rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

function Footer() {
  const router = useRouter()

  const navigateToPrivacyPolicy = () => {
    router.push('/privacidade')
  }

  const navigateToTerms = () => {
    router.push('/termos')
  }

  const navigateToContact = () => {
    router.push('/contato')
  }

  return (
    <div className="mt-16 border-t border-black/10 pt-10 pb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <Image
              alt="Logo"
              src="https://estandocomvoce.com/img/caaat.png"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="text-sm font-extrabold text-[#3aa81d]">Campanhas do Bem</div>
        </div>

        <div className="flex items-center gap-7 text-sm text-black/55">
          <button
            onClick={navigateToPrivacyPolicy}
            className="hover:text-black/75"
          >
            Privacidade
          </button>
          <button
            onClick={navigateToTerms}
            className="hover:text-black/75"
          >
            Termos
          </button>
          <button
            onClick={navigateToContact}
            className="hover:text-black/75"
          >
            Contato
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-black/40">
        Juntos pela Manuela — CNPJ: 57.040.945/0001-54
      </div>
    </div>
  )
}
