import SupportRequestForm from "../../../components/SupportRequestForm";
import {
  MessageCircle,
  Search,
  Smartphone,
  Wrench,
  HelpCircle,
} from "lucide-react";
import { Metadata } from "next";
import { INFO } from "@/constants";

// SEO Metadata
export const metadata: Metadata = {
  title:
    "Support Request - Fixamigo | Request New Brands, Devices & Custom Services",
  description:
    "Submit support requests to Fixamigo for new device brands, custom repair services, or general assistance. Our expert team responds within 24 hours to help with your mobile repair needs in Kerala.",
  keywords: [
    "Fixamigo support",
    "mobile repair request",
    "device brand request",
    "custom repair service",
    "mobile phone support Kerala",
    "repair service request",
    "technical support",
    "device repair assistance",
    "mobile service center support",
  ],
  openGraph: {
    title: "Support Request - Fixamigo Mobile Repair Services",
    description:
      "Need help with your mobile repair? Submit a support request to Fixamigo. Request new brands, devices, or custom services. Expert assistance available.",
    type: "website",
    url: `${INFO.website}/support-request`,
    siteName: INFO.name,
    images: [
      {
        url: "/logos/logo.png",
        width: 800,
        height: 600,
        alt: "Fixamigo Support - Mobile Repair Service Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Request - Fixamigo Mobile Repair Services",
    description:
      "Submit support requests for mobile repair services. Request new brands, devices, or get custom assistance from Fixamigo experts in Kerala.",
    images: ["/logos/logo.png"],
  },
  alternates: {
    canonical: `${INFO.website}/support-request`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Define content for different support request types
const getContentForType = (type: string) => {
  switch (type) {
    case "brand":
      return {
        icon: <Search className="w-12 h-12 text-[#D2691E]" />,
        title: "Request a New Brand",
        subtitle: "Can't find your device brand? Let us know!",
        description:
          "We're constantly expanding our device database. If you can't find your brand in our listings, submit a request and we'll add it to our system.",
        benefits: [
          "Fast brand addition to our database",
          "Notification when your brand becomes available",
          "Priority support for your device requests",
        ],
      };
    case "device":
      return {
        icon: <Smartphone className="w-12 h-12 text-[#D2691E]" />,
        title: "Request a New Device",
        subtitle: "Need a device that's not in our catalog?",
        description:
          "Help us expand our repair services by requesting your specific device model. We'll work to add support for your device and notify you when it's available.",
        benefits: [
          "Device-specific repair options",
          "Accurate pricing for your model",
          "Expert technician assignment",
        ],
      };
    case "service":
      return {
        icon: <Wrench className="w-12 h-12 text-[#D2691E]" />,
        title: "Request a Custom Service",
        subtitle: "Need a specialized repair service?",
        description:
          "Our expert technicians can handle unique repair requests. Tell us what you need, and we'll provide a custom solution for your device.",
        benefits: [
          "Specialized repair expertise",
          "Custom service pricing",
          "Direct technician consultation",
        ],
      };
    case "can-not-find":
      return {
        icon: <HelpCircle className="w-12 h-12 text-[#D2691E]" />,
        title: "Need Help Finding Something?",
        subtitle: "We're here to help you get the right service",
        description:
          "Can't find what you're looking for? Our support team will help you locate the right repair category or service for your device.",
        benefits: [
          "Personalized service recommendations",
          "Expert guidance on repair options",
          "Direct assistance from our support team",
        ],
      };
    case "feedback":
      return {
        icon: <MessageCircle className="w-12 h-12 text-[#D2691E]" />,
        title: "Share Your Feedback",
        subtitle: "Help us improve our service",
        description:
          "We value your opinion! Share your experience, suggestions, or any feedback about our repair services. Your input helps us serve you better.",
        benefits: [
          "Help improve our services for everyone",
          "Get recognition for valuable suggestions",
          "Direct communication with our team",
        ],
      };
    case "support":
      return {
        icon: <MessageCircle className="w-12 h-12 text-[#D2691E]" />,
        title: "General Support Request",
        subtitle: "We're here to help with any questions or concerns",
        description:
          "Submit any general support request, feedback, or questions you have. Our team will review your request and get back to you with the assistance you need.",
        benefits: [
          "Quick response from our support team",
          "Comprehensive assistance with any issues",
          "Personalized solutions for your needs",
        ],
      };
    default:
      return {
        icon: <MessageCircle className="w-12 h-12 text-[#D2691E]" />,
        title: "Support Request",
        subtitle: "We're here to help",
        description:
          "Submit your request and our team will get back to you as soon as possible.",
        benefits: [
          "Quick response time",
          "Expert assistance",
          "Personalized solutions",
        ],
      };
  }
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Determine request type and initial value from URL
  const type = (await searchParams).type ?? "support";
  const value = (await searchParams).value ?? "";
  const content = getContentForType(type);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#D2691E]/10 to-[#121212]/10 rounded-2xl flex items-center justify-center shadow-lg">
            {content.icon}
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {content.title}
        </h1>
        <p className="text-lg text-[#D2691E] font-medium mb-4">
          {content.subtitle}
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {content.description}
        </p>
      </div>

      {/* Main Content Container */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
            <SupportRequestForm type={type} value={value} />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#121212] to-[#D2691E] rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">
              What You&apos;ll Get
            </h3>
            <ul className="space-y-3">
              {content.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-white/80 text-center">
                Need immediate help?
              </p>
              <p className="text-sm font-medium text-center mt-1">
                Our support team responds within 24 hours
              </p>
            </div>
          </div>

          {/* Additional Help Section */}
          <div className="mt-6 bg-gray-50 rounded-2xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Other Ways to Get Help
            </h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#D2691E]" />
                <span>Browse our repair categories</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#D2691E]" />
                <span>Check our FAQ section</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#D2691E]" />
                <span>Search for your device directly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
