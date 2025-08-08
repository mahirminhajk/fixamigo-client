import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const tahoma = localFont({
  src: [
    {
      path: "../public/fonts/Tahoma.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Tahoma-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title:
    "FixAmigo - Mobile Phone Repair Services in Kerala | 24/7 Doorstep Service",
  description:
    "Professional mobile phone repair services across Kerala. Expert technicians, genuine parts, doorstep service. iPhone, Samsung, OnePlus repairs with warranty.",
  keywords:
    "mobile repair Kerala, phone repair doorstep, iPhone repair, Samsung repair, OnePlus repair, smartphone repair service",
  metadataBase: new URL("https://fixamigo.com"),
  alternates: {
    canonical: "https://fixamigo.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fixamigo.com",
    siteName: "FixAmigo",
    title: "FixAmigo - Mobile Phone Repair Services in Kerala",
    description:
      "Professional mobile phone repair services across Kerala. Expert technicians, genuine parts, doorstep service.",
    images: [
      {
        url: "/logos/logo.png",
        width: 800,
        height: 600,
        alt: "FixAmigo Mobile Repair Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FixAmigo - Mobile Phone Repair Services in Kerala",
    description:
      "Professional mobile phone repair services across Kerala. Expert technicians, genuine parts, doorstep service.",
    images: ["/logos/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  other: {
    "google-site-verification": "VGa8ZI1Xv3dCNJBd9PjcGJNnmQQz9wTNZCVSMQ3QKOk",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={`${tahoma.className} antialiased`}>
        {children}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3163056550133556"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
