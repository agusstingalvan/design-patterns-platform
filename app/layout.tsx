import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    "https://agustingalvan.netlify.app"
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Game Design Patterns",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      inLanguage: "es",
      description:
        "Generador de codigo C# parametrizable para patrones de diseno de Unity.",
      author: { "@id": "https://agustingalvan.netlify.app/#person" },
      provider: { "@id": "https://www.unraf.edu.ar/#organization" },
      url: siteUrl.href,
    },
    {
      "@type": "Person",
      "@id": "https://agustingalvan.netlify.app/#person",
      name: "Agustin Galvan",
      url: "https://agustingalvan.netlify.app/",
    },
    {
      "@type": "CollegeOrUniversity",
      "@id": "https://www.unraf.edu.ar/#organization",
      name: "Universidad Nacional de Rafaela",
      alternateName: "UNRaf",
      url: "https://www.unraf.edu.ar/",
      logo: new URL("/unraf-logo.webp", siteUrl).href,
    },
    {
      "@type": "WebSite",
      name: "Game Design Patterns",
      url: siteUrl.href,
      inLanguage: "es",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Game Design Patterns | Patrones para Unity",
    template: "%s | Game Design Patterns",
  },
  description:
    "Generá patrones de diseño personalizables para videojuegos en Unity.",
  keywords: [
    "Unity",
    "C#",
    "patrones de diseno",
    "design patterns",
    "desarrollo de videojuegos",
    "Singleton",
    "Flyweight",
    "State Machine",
  ],
  authors: [{ name: "Agustin Galvan", url: "https://agustingalvan.netlify.app/" }],
  creator: "Agustin Galvan",
  publisher: "Agustin Galvan",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Game Design Patterns",
    title: "Game Design Patterns | Patrones para Unity",
    description: "Genera codigo C# parametrizable para patrones de Unity.",
  },
  twitter: {
    card: "summary",
    title: "Game Design Patterns | Patrones para Unity",
    description: "Genera codigo C# parametrizable para patrones de Unity.",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
