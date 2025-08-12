import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { INFO } from "@/constants";
import { getBlogMetadata, getBlogStructuredData } from "@/lib/seo/blogMetadata";

export const metadata: Metadata = getBlogMetadata();

export default function BlogIndexPage() {
  const structuredData = getBlogStructuredData();

  const topics = [
    {
      title: "Repair Guides",
      desc: "Step-by-step fixes, what to expect, and how we repair.",
      href: "/blog",
    },
    {
      title: "Care & Maintenance",
      desc: "Keep your phone and laptop fast, safe, and healthy.",
      href: "/blog",
    },
    {
      title: "Updates & Announcements",
      desc: "New services, offers, and company updates.",
      href: "/blog",
    },
  ];

  return (
    <section className="w-full">
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="beforeInteractive"
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg">
            {INFO.name} Blog
          </h1>
          <p className="mt-4 text-center text-gray-200 text-lg md:text-xl font-medium">
            {INFO.tagline2} — tips, guides, and updates from our team
          </p>
        </div>
      </div>

      {/* Empty state + Topics */}
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-8 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-[#D2691E]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14M7 7h10M7 11h10M7 15h6"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mt-4">
            Articles are coming soon
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            We’re setting up helpful content for mobile and laptop care, repair
            guides, and updates from {INFO.name}. Stay tuned — or follow us for
            the latest.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={INFO.instagram}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D2691E] text-white font-semibold shadow hover:bg-[#121212] transition"
            >
              Follow on Instagram
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href={INFO.waLink("Hi, I’d like updates about new blog posts.")}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#D2691E] text-[#121212] font-semibold hover:bg-orange-50 transition"
            >
              Get updates on WhatsApp
            </a>
          </div>
        </div>

        {/* Suggested Topics */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {topics.map((t) => (
            <article
              key={t.title}
              className="group bg-white border-2 border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl transition"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {t.title}
              </h3>
              <p className="text-gray-600 mt-2">{t.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-[#D2691E] font-semibold">
                <span>Coming soon</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </article>
          ))}
        </div>

        {/* Help CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-700">
            Need help right now? Visit our{" "}
            <Link
              href="/support"
              className="underline font-semibold hover:opacity-80"
            >
              Support
            </Link>{" "}
            page or{" "}
            <a
              href={INFO.phoneLink()}
              className="underline font-semibold hover:opacity-80"
            >
              call us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
