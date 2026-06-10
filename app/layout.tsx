import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tribesolutions.com.br"),
  title: {
    default: "Tribe Solutions — Software sob medida & licitações inteligentes",
    template: "%s · Tribe Solutions",
  },
  description:
    "Da Amazônia para o Brasil. Desenvolvemos sistemas web, apps e plataformas SaaS, e operamos pipeline automatizado de licitações públicas com assinatura ICP-Brasil.",
  keywords: [
    "desenvolvimento de software",
    "software sob medida",
    "licitação pública",
    "FAP",
    "Manaus",
    "Amazonas",
    "SaaS",
    "desenvolvimento web",
    "aplicativo mobile",
    "Tribe Solutions",
  ],
  authors: [{ name: "Tribe Solutions" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://tribesolutions.com.br",
    siteName: "Tribe Solutions",
    title: "Tribe Solutions — Software sob medida & licitações inteligentes",
    description:
      "Sistemas web, apps e plataformas SaaS com rigor técnico de big tech, sem o custo de uma. Base em Manaus, atuação no Brasil todo.",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Tech Tribe Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tribe Solutions",
    description: "Software sob medida & licitações inteligentes",
    images: ["/og-banner.png"],
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
