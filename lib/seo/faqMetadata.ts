import type { Metadata } from "next";
import { INFO } from "@/constants";

export function getFaqMetadata(
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || INFO.website
): Metadata {
  const canonical = `${baseUrl.replace(/\/$/, "")}/faq`;
  return {
    title: `Frequently Asked Questions — ${INFO.name}`,
    description: `Find answers to common questions about ${INFO.name}: repairs, pricing, warranty, pickup and delivery, turnaround time, supported brands, and coverage.`,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `Frequently Asked Questions — ${INFO.name}`,
      description: `Common questions about ${INFO.name}: repairs, warranty, brands, turnaround time, data safety, and coverage across Kerala.`,
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
      title: `Frequently Asked Questions — ${INFO.name}`,
      description: `Quick answers about ${INFO.name} repairs, pricing, warranty, data safety, and the service process across Kerala.`,
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
