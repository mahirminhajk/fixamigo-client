import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

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
  title: "Fixamigo",
  description:
    "Need to repair your mobile phone or laptop? FixAmigo has you covered! We offer hassle-free pickup, expert repair, and secure delivery—bringing your device back to life with full protection guaranteed!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Optional meta tags */}
        <meta name="theme-color" content="#121212" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${tahoma.className} antialiased`}>{children}</body>
    </html>
  );
}
