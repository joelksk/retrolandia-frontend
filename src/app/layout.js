import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'RetroScore- Tu Paraíso Retro',
    template: '%s | RetroScore'
  },
  description: 'Juega a los mejores clásicos de NES, Sega y SNES y muchas consolas mas, totalmente gratis.',
  keywords: ['retro games', 'emulator online', 'juegos clásicos', 'NES online'],
  authors: [{ name: 'Joel' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
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
          </main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-KSB13RR93N" />
    </html>
  );
}
