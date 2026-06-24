import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wolontariat.org.pl"),
  title: {
    default: "wolontariat.org.pl",
    template: "%s - wolontariat.org.pl",
  },
  description:
    "Redakcyjny portal o wolontariacie w Polsce. Poradniki dla kandydatów, wolontariuszy i organizacji.",
  openGraph: {
    title: "wolontariat.org.pl",
    description:
      "Ciepły, rzeczowy portal dla osób, które chcą zacząć pomagać i dla organizacji pracujących z wolontariuszami.",
    locale: "pl_PL",
    type: "website",
    siteName: "wolontariat.org.pl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
