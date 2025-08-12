import type { Metadata } from "next";
import { INFO } from "@/constants";

export function getFaqMetadata(
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || INFO.website
): Metadata {
  const canonical = `${baseUrl.replace(/\/$/, "")}/faq`;
  return {
    title: `FAQ — ${INFO.name}`,
    description: `Answers to the most common questions about ${INFO.name} repairs, pricing, warranty, pickup & delivery, and more.`,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `FAQ | ${INFO.name}`,
      description: `Common questions about ${INFO.name}: repairs, warranty, brands, turnaround time, data safety and service coverage.`,
      siteName: INFO.name,
      images: [
        {
          url: `${baseUrl}/og-fixamigo.jpg`,
          width: 1200,
          height: 630,
          alt: `${INFO.name} FAQ`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `FAQ | ${INFO.name}`,
      description: `Get quick answers about ${INFO.name} repairs, pricing, warranty and service process.`,
      images: [`${baseUrl}/og-fixamigo.jpg`],
    },
  };
}

export function getFaqStructuredData(
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || INFO.website,
  faqs: { question: string; answer: string }[]
) {
  const canonical = `${baseUrl.replace(/\/$/, "")}/faq`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    url: canonical,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
