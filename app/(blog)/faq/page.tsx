import Script from "next/script";
import { faqs, INFO } from "@/constants";
import { getFaqMetadata, getFaqStructuredData } from "@/lib/seo/faqMetadata";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = getFaqMetadata();

export default function FAQPage() {
  const structuredData = getFaqStructuredData(undefined, faqs);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#D2691E] leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-gray-700">
          Quick answers about repairs, pricing, warranty, pickup & delivery, and
          more at {INFO.name}.
        </p>
      </header>

      <section id="faq" className="mb-10">
        <Accordion type="single" collapsible>
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <div className="mt-10 text-sm text-gray-600">
        Still have questions? Email us at{" "}
        <a className="text-[#D2691E] underline" href={INFO.emailLink()}>
          {INFO.email}
        </a>{" "}
        or WhatsApp{" "}
        <a
          className="text-[#D2691E] underline"
          href={INFO.waLink("Hello, I have a question about repairs.")}
        >
          {INFO.phoneLabel}
        </a>
        .
      </div>

      <Script id="faq-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  );
}
