import type { Metadata, Viewport } from "next";
import { Nunito, Righteous } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "./components/Header";
import Loader, { loaderBootScript } from "./components/Loader";
import Stalker from "./components/Stalker";

const display = Righteous({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Nunito({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const description =
  "Portfolio of Aman Kumar Singh: software engineer working across full-stack web, applied AI and competitive programming.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} · Software Engineer`,
  description,
  openGraph: { title: site.name, description, url: site.url, siteName: site.name, type: "website" },
  twitter: { card: "summary", title: site.name, description },
};

export const viewport: Viewport = { themeColor: "#f7f5f1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderBootScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.loader{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        <Loader />
        <Header />
        {children}
        <Stalker />
      </body>
    </html>
  );
}
