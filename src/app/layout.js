import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ReportWidget from "@/components/widgets/ReportWidget";
// import DonationModal from '@/components/donationModal/DonationModal'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'RetroScore | Juega Clásicos Online y Domina el Ranking',
  description: 'La plataforma definitiva para amantes de lo retro en Argentina. Juega juegos clásicos de NES, SNES y más, sube tu récord y compite por el primer puesto en nuestro ranking global.',
  keywords: 'juegos retro, emulador online, ranking de videojuegos, snes online, nes online, juegos clásicos gratis, competir online retro',
  authors: [{ name: 'Joel' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'RetroScore - ¿Sos el mejor en los clásicos?',
    description: 'Jugá, subí tu captura y demostrá que sos el Rey de los 8 y 16 bits. ¡Entrá al ranking de RetroScore!',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'RetroScore Argentina',
    images: [
      {
        url: '/imgs/banner.png',
        width: 1200,
        height: 630,
        alt: 'RetroScore - Competencia de Juegos Retro',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'RetroScore | El Podio de los Gamers Retro',
    description: '¿Tenés lo que hace falta para estar en el Top 1? Competí en RetroScore.',
    images: ['/imgs/banner.png'],
  },
}

export const viewport = {
  themeColor: '#ffcc00', 
  width: 'device-width',
  initialScale: 1,
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Navbar /> 
          <main> 
            {children}
            <ReportWidget />
          </main>
        <Footer />
        {/* <DonationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={confirmDonation} 
        /> */}
      </body>
      <GoogleAnalytics gaId="G-KSB13RR93N" />
    </html>
  );
}
