import Script from "next/script";
import type { Metadata } from "next";
import LaptopSupportForm from "@/components/others/LaptopSupportForm";

export const metadata: Metadata = {
  title: "Laptop Repair Services | Battery, Keyboard & More | Fixamigo",
  description:
    "Trusted laptop repair near you: battery replacement, screen repair, keyboard fixes, SSD upgrades, overheating and more. Book a callback and get quick support.",

  keywords: [
    // Primary service keywords
    "laptop repair services",
    "laptop repair near me",
    "laptop service center",
    "laptop repair shop",
    "computer repair services",
    "laptop fixing services",

    // Specific repair keywords
    "laptop battery replacement",
    "laptop screen repair",
    "laptop screen replacement",
    "laptop keyboard repair",
    "laptop keyboard replacement",
    "laptop trackpad repair",
    "laptop charging port repair",
    "laptop power button repair",

    // Technical repair keywords
    "laptop overheating repair",
    "laptop fan repair",
    "laptop fan noise fix",
    "SSD upgrade laptop",
    "laptop hard drive replacement",
    "laptop RAM upgrade",
    "laptop motherboard repair",
    "liquid damage laptop repair",

    // Brand-specific keywords
    "Dell laptop repair",
    "HP laptop repair",
    "Lenovo laptop repair",
    "Acer laptop repair",
    "ASUS laptop repair",
    "MacBook repair",
    "Toshiba laptop repair",
    "Sony laptop repair",

    // Location-based keywords
    "laptop repair India",
    "laptop service India",
    "laptop repair center India",
    "laptop technician near me",
    "laptop repair pickup delivery",

    // Service-specific keywords
    "laptop diagnosis",
    "laptop troubleshooting",
    "laptop virus removal",
    "laptop data recovery",
    "laptop software repair",
    "laptop hardware repair",
    "laptop maintenance",

    // Business keywords
    "Fixamigo laptop repair",
    "professional laptop repair",
    "certified laptop technician",
    "genuine laptop parts",
    "laptop repair warranty",
    "affordable laptop repair",
    "quick laptop repair",
    "expert laptop repair",

    // Problem-specific keywords
    "laptop won't turn on",
    "laptop black screen",
    "laptop slow performance",
    "laptop blue screen",
    "laptop not charging",
    "laptop wifi not working",
    "laptop audio not working",
  ],

  openGraph: {
    title:
      "Laptop Repair Services | Battery, Screen, Keyboard & More | Fixamigo",
    description:
      "Trusted laptop repair near you: battery replacement, screen repair, keyboard fixes, SSD upgrades, overheating and more.",
    type: "website",
    url: "/repair/laptop",
  },
  alternates: { canonical: "/repair/laptop" },
};

const issues = [
  { key: "battery", label: "Battery not charging" },
  { key: "screen", label: "Screen replacement" },
  { key: "keyboard", label: "Keyboard not working" },
  { key: "trackpad", label: "Trackpad issue" },
  { key: "overheating", label: "Overheating" },
  { key: "fan", label: "Fan noise" },
  { key: "ssd", label: "SSD upgrade" },
  { key: "charging", label: "Charging port repair" },
  { key: "liquid", label: "Liquid damage" },
  { key: "power", label: "No power" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Laptop Repair Service",
  provider: {
    "@type": "Organization",
    name: "Fixamigo",
  },
  serviceType: "Laptop repair",
  areaServed: "India",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Laptop repair issues",
    itemListElement: issues.map((i) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: i.label },
    })),
  },
};

export default function LaptopRepairPage() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* JSON-LD */}
      <Script
        id="laptop-repair-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#121212] via-[#D2691E] to-[#121212] text-white px-4 py-2 rounded-full text-sm shadow-lg">
          Fast, Reliable & Expert Laptop Repair
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
          Laptop Repair & Service Near You
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Battery issues, broken screens, overheating or upgrades — we handle it
          all. Tell us your laptop model and issue, and we&apos;ll call you
          back.
        </p>
      </div>

      {/* Issues grid */}
      <div className="mb-10">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 text-center">
          Common Laptop Issues We Fix
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {issues.map((i) => (
            <div
              key={i.key}
              className="group bg-white border-2 border-gray-200 rounded-2xl shadow-lg flex items-center justify-center text-center p-4 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:-translate-y-1 hover:border-[#D2691E] hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100"
            >
              <span className="text-sm font-medium text-gray-800 group-hover:text-[#D2691E]">
                {i.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form + aside */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Tell Us Your Laptop Issue
            </h3>
            <p className="text-gray-600 mb-6">
              Share your laptop brand, pincode and issue. Our team will reach
              out with repair options and an estimate.
            </p>
            <LaptopSupportForm />
          </div>
        </div>
        <aside className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#121212] to-[#D2691E] rounded-2xl p-6 text-white shadow-lg">
            <h4 className="text-lg font-semibold mb-3">Why choose Fixamigo</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-white rounded-full mt-2" />
                Expert technicians for all laptop brands
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-white rounded-full mt-2" />
                Genuine parts and transparent pricing
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-white rounded-full mt-2" />
                Pickup & drop support in select areas
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-white rounded-full mt-2" />
                Quick turnaround and warranty on repairs
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
