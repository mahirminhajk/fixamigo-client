import type { Metadata } from "next";
import ProductSearch from "@/components/search/ProductSearch";
import BrandsList from "@/components/list/brandsList";
import Footer from "@/components/core/footer";
import HighlightedBrand from "@/components/HighlightedBrand";
import Navbar from "@/components/core/navbar";
import ServiceSteps from "@/components/others/ServiceSteps";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Lightbulb,
  Settings,
  ArrowLeftRight,
  CreditCard,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kottakkal - free mobile repair | Fixamigo",
  description:
    "Free phone repair in Kodakkal. Pay only for spare parts. Free pickup & delivery. Limited time offer - 7 days only.",
  openGraph: {
    title: "Kottakkal - free mobile repair | Fixamigo",
    description:
      "Free phone repair in Kodakkal. Pay only for spare parts. Free pickup & delivery. Limited time offer - 7 days only.",
  },
};

export default async function FreeRepairCampaignPage() {
  const faqs = [
    {
      question: "ചോദ്യം: ഡയഗ്നോസിസ് ഫീസ് ഉണ്ടോ?",
      answer:
        "ഇല്ല. ഫോൺ ചെക്ക് ചെയ്യുന്നതിനും പ്രോബ്ലം കണ്ടെത്തുന്നതിനും ഒരു രൂപ പോലും അടക്കേണ്ട.",
    },
    {
      question: "ചോദ്യം: റിപ്പെയർ ചാർജ് എത്ര?",
      answer:
        "ലേബർ ഫീസ് ഫ്രീ ആണ്. സ്പെയർ പാർട്സ് വേണമെങ്കിൽ അതിന്റെ വില മാത്രം അടയ്ക്കണം.",
    },
    {
      question: "ചോദ്യം: പിക്കപ്പ്‌ & ഡെലിവറി ചാർജ് ഉണ്ടോ?",
      answer:
        "ഒന്നുമില്ല. വീട്ടിൽ നിന്ന് ഫ്രീ പിക്കപ്പ്, റിപ്പെയർ കഴിഞ്ഞാൽ ഫ്രീ ഡെലിവറി.",
    },
    {
      question: "ചോദ്യം: ഏത് ഫോൺ മോഡലും ചെയ്യുമോ?",
      answer: "മിക്ക ആൻഡ്രോയിഡ്, ഐഫോൺ മോഡലുകൾ എല്ലാം.",
    },
    {
      question: "ചോദ്യം: എത്ര ദിവസത്തിനുള്ളിൽ റിപ്പെയർ കിട്ടും?",
      answer: "പാർട്സ് ലഭ്യത അനുസരിച്ച് സാധാരണ 1–2 ദിവസത്തിനുള്ളിൽ.",
    },
    {
      question: "ചോദ്യം: ഓഫർ എത്ര കാലത്തേക്ക്?",
      answer: "7 ദിവസം മാത്രം. ബുക്കിംഗ് സമയത്ത് തീയതി കണ്ടു ഉറപ്പാക്കണം.",
    },
    {
      question: "ചോദ്യം: പണമടയ്ക്കുന്നത് എങ്ങനെ?",
      answer:
        "റിപ്പെയർ പൂർത്തിയായ ശേഷം, സ്പെയർ പാർട്സ് ചാർജ് മാത്രം – ക്യാഷ്/UPI/കാർഡ് ഒക്കെ ഓകെ.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col pb-16">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-green-50 via-white to-white pt-12 pb-8 md:pt-16 md:pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
            ഇനി കോട്ടക്കൽ – free mobile repair
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
            Repair charges ₹0. Pay only for spare parts. Free pickup & delivery.
          </p>

          {/* CTA Button */}
          <div className="mb-8">
            <Link
              href="/repair/mobile-phone"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4
                         bg-gradient-to-r from-green-600 to-green-700
                         hover:from-green-700 hover:to-green-800
                         text-white font-bold text-base md:text-lg rounded-xl md:rounded-2xl
                         shadow-lg hover:shadow-xl
                         transform transition-all duration-300
                         hover:scale-105 hover:-translate-y-1
                         focus:outline-none focus:ring-4 focus:ring-green-500/50"
            >
              ഇപ്പോള്‍ ബുക്ക് ചെയ്യൂ
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>

          {/* Hero Banner Image */}
          <div className="mt-8 md:mt-10">
            <div className="relative -mx-6 md:mx-auto md:max-w-3xl w-[calc(100%+3rem)] md:w-full aspect-[16/9] rounded-none md:rounded-2xl overflow-hidden shadow-lg ring-0 md:ring-1 md:ring-gray-200">
              <Image
                src="https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner1.webp"
                alt="Free phone diagnosis campaign - Fixamigo"
                title="Free phone diagnosis campaign - Fixamigo"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Details Block */}
      <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="p-6 bg-white rounded-[6px] shadow-sm max-w-md mx-auto lg:max-w-4xl lg:shadow-md">
          <h2 className="text-lg lg:text-2xl font-semibold mb-4 lg:mb-8 text-center lg:text-left">
            ഞങ്ങളുടെ സ്പെഷ്യൽ ഓഫർ
          </h2>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-green-600 text-white p-3 rounded-[6px] text-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-semibold">ഫ്രീ റിപ്പെയർ</p>
                <p className="text-[10px] opacity-90 mt-1">ലേബർ ചാർജ് ഇല്ല</p>
              </div>
              <div className="bg-green-600 text-white p-3 rounded-[6px] text-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ArrowLeftRight className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-semibold">ഫ്രീ പിക്കപ്പ്</p>
                <p className="text-[10px] opacity-90 mt-1">& ഡെലിവറി</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-600 text-white p-3 rounded-[6px] text-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-semibold">pay only for parts</p>
              </div>
              <div className="bg-green-600 text-white p-3 rounded-[6px] text-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-semibold">ഫ്രീ ഡയഗ്നോസിസ്</p>
                <p className="text-[10px] opacity-90 mt-1">no charge</p>
              </div>
            </div>

            {/* Limited Time Notice */}
            <div className="mt-4 p-3 bg-amber-100 rounded-[6px] text-center">
              <div className="flex items-center justify-center mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600 mr-2" />
                <p className="text-amber-800 font-bold text-xs">
                  ഓഫർ 7 ദിവസം മാത്രം
                </p>
              </div>
              <p className="text-amber-700 text-[10px]">
                പെട്ടെന്ന് ബുക്ക് ചെയ്യൂ!
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ഫ്രീ റിപ്പെയർ
                </h3>
                <p className="text-sm text-gray-600">ലേബർ ചാർജ് ഇല്ല</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowLeftRight className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ഫ്രീ പിക്കപ്പ് & ഡെലിവറി
                </h3>
                <p className="text-sm text-gray-600">
                  വീട്ടിൽ നിന്നും വീട്ടിലേക്ക്
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  pay only for parts
                </h3>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ഫ്രീ ഡയഗ്നോസിസ്
                </h3>
                <p className="text-sm text-gray-600">dead phone? no charge</p>
              </div>
            </div>

            {/* Limited Time Notice - Desktop */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-[12px] p-6 text-center">
              <p className="text-amber-800 text-lg font-bold mb-1">
                ⚠️ ഓഫർ 7 ദിവസം മാത്രം
              </p>
              <p className="text-amber-700 text-sm font-medium">
                പെട്ടെന്ന് ബുക്ക് ചെയ്യൂ!
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1">
        <ProductSearch
          heading="Modern Repair. Zero Hassle."
          subheading="Your device gets expert care while you relax. Pickup and delivery are always free."
        />

        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <HighlightedBrand category="mobile-phone" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <BrandsList variant="min" category="mobile-phone" />
        </div>

        {/* Service Steps */}
        <ServiceSteps />

        {/* FAQ Section */}
        <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              പതിവ് ചോദ്യങ്ങൾ
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              നിങ്ങളുടെ സംശയങ്ങൾക്ക് ഉത്തരം
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-[6px] shadow-sm lg:shadow-md">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4 text-sm md:text-base font-medium text-gray-900 hover:text-gray-700 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-gray-600 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Final CTA */}
            <div className="text-center mt-12">
              <Link
                href="/repair/mobile-phone"
                className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4
                           bg-gradient-to-r from-green-600 to-green-700
                           hover:from-green-700 hover:to-green-800
                           text-white font-bold text-base md:text-lg rounded-xl md:rounded-2xl
                           shadow-lg hover:shadow-xl
                           transform transition-all duration-300
                           hover:scale-105 hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-green-500/50"
              >
                ഇപ്പോൾ ബുക്ക് ചെയ്യൂ - ഫ്രീ ഡയഗ്നോസിസ്
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                ⚡ ഇന്നേ ബുക്ക് ചെയ്യൂ - ഓഫർ പെട്ടെന്ന് അവസാനിക്കും
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
