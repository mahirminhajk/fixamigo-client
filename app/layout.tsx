import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <body className={`${tahoma.className} antialiased`}>{children}</body>
    </html>
  );
}
