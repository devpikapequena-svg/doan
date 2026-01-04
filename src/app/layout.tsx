'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import './globals.css'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import { PaymentProvider } from '@/context/PaymentContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const TIKTOK_PIXEL_ID = 'D5DDL7RC77UCQLCHJ3KG' // Replace with your actual TikTok Pixel ID

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const isNotFoundPage = pathname === '/_not-found'

  useEffect(() => {
    if (isNotFoundPage) return

    setIsNavigating(true)
    const timer = setTimeout(() => setIsNavigating(false), 500)

    const handleLoad = () => {
      setIsNavigating(false)
      clearTimeout(timer)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      const observer = new MutationObserver(() => {
        if (document.readyState === 'complete') {
          handleLoad()
          observer.disconnect()
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      window.removeEventListener('load', handleLoad)
      clearTimeout(timer)
    }
  }, [pathname, searchParams, isNotFoundPage])

  useEffect(() => {
    if (isNotFoundPage) return
    if (typeof window !== 'undefined' && typeof (window as any).ttq === 'function') {
      ;(window as any).ttq.page()
    }
  }, [pathname, searchParams, isNotFoundPage])

  return (
    <>
      {isNavigating && !isNotFoundPage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
          <div className="loading-spinner" />
        </div>
      )}

      <div
        className={cn(
          'min-h-screen bg-background font-sans antialiased transition-opacity duration-300',
          isNavigating && !isNotFoundPage ? 'opacity-0' : 'opacity-100'
        )}
      >
        {children}
      </div>
    </>
  )
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>Apoio à Manuela</title>
        <meta name="description" content="Apoio à Manuela" />
        <meta name="robots" content="index, follow" />

        {/* ================================
            Utmify Pixel (Google)
        ================================= */}
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`
            window.googlePixelId = "68ffbcb05c70a2f71e7cc3ad";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute(
              "src",
              "https://cdn.utmify.com.br/scripts/pixel/pixel-google.js"
            );
            document.head.appendChild(a);
          `}
        </Script>

        {/* ================================
            Utmify UTMs
        ================================= */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="afterInteractive"
        />

        {/* ================================
            TikTok Pixel
        ================================= */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      </head>

      <body className={cn('font-sans', inter.variable)}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.tiktok.com/tr?id=${TIKTOK_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        <CartProvider>
          <PaymentProvider>
            <Suspense fallback={null}>
              <LayoutContent>{children}</LayoutContent>
            </Suspense>
          </PaymentProvider>
        </CartProvider>
      </body>
    </html>
  )
}
