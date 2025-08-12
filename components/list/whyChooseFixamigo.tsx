"use client";

import { FC } from "react";
import Image from "next/image";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "/icons/service.png",
    title: "Skilled Technicians",
    description:
      "Certified, trained experts handling Apple, Samsung, Xiaomi & more.",
  },
  {
    icon: "/icons/motherboard.png",
    title: "Genuine-Quality Parts",
    description:
      "We use high-grade screens & components tested to OEM standards.",
  },
  {
    icon: "/steps-icons/calender.png",
    title: "Same-Day Repairs",
    description: "Same-day service available for most screen replacements.",
  },
  {
    icon: "/steps-icons/handbox.png",
    title: "Pickup & Delivery",
    description: "Free door-to-door service across Malappuram & Kottakkal.",
  },
  {
    icon: "/steps-icons/rupee.png",
    title: "Transparent Pricing",
    description: "Fixed service rates per brand & model—no hidden charges.",
  },
];

const WhyChooseFixamigo: FC = () => {
  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-[#D2691E]">
        Why Choose fixamigo
      </h2>

      <div className="grid gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl shadow-sm"
          >
            <div className="flex-shrink-0">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseFixamigo;
