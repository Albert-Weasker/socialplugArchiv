import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SocialPlug Evidence Archive | Complaints, Refunds, and Proof",
    template: "%s | SocialPlug Evidence Archive",
  },
  description:
    "A public archive collecting SocialPlug non-delivery claims, refund disputes, order conflicts, and victim evidence so people see the risk before they buy.",
  keywords: [
    "SocialPlug",
    "SocialPlug scam",
    "SocialPlug review",
    "SocialPlug complaints",
    "SocialPlug refund",
    "SocialPlug not delivered",
    "is SocialPlug legit",
    "SocialPlug Trustpilot",
    "SocialPlug chargeback",
    "SocialPlug 退款",
    "SocialPlug 骗局",
    "SocialPlug 曝光",
  ],
  openGraph: {
    title: "SocialPlug Evidence Archive",
    description:
      "A public archive built around SocialPlug complaints, refund disputes, and archived evidence.",
    url: siteUrl,
    siteName: "SocialPlug Evidence Archive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SocialPlug Evidence Archive",
    description:
      "A public archive built around SocialPlug complaints, refund disputes, and archived evidence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TW23N3X97W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TW23N3X97W');
          `}
        </Script>
        <div className="site-frame">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
