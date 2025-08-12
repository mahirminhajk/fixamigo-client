"use client";

import { FC, ReactElement } from "react";
import {
  FaTools,
  FaCube,
  FaClock,
  FaTruck,
  FaMoneyBillWave,
} from "react-icons/fa";

interface Feature {
  icon: ReactElement;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaTools size={28} className="text-orange-500" />,
    title: "Skilled Technicians",
    description:
      "Certified, trained experts handling Apple, Samsung, Xiaomi & more.",
  },
  {
    icon: <FaCube size={28} className="text-orange-500" />,
    title: "Genuine-Quality Parts",
    description:
      "We use high-grade screens & components tested to OEM standards.",
  },
  {
    icon: <FaClock size={28} className="text-orange-500" />,
    title: "Same-Day Repairs",
    description: "Same-day service available for most screen replacements.",
  },
  {
    icon: <FaTruck size={28} className="text-orange-500" />,
    title: "Pickup & Delivery",
    description: "Free door-to-door service across Malappuram & Kottakkal.",
  },
  {
    icon: <FaMoneyBillWave size={28} className="text-orange-500" />,
    title: "Transparent Pricing",
    description: "Fixed service rates per brand & model—no hidden charges.",
  },
];

const WhyChooseFixamigo: FC = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">Why Choose fixamigo</h2>

      <div className="grid gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl shadow-sm"
          >
            <div className="flex-shrink-0">{feature.icon}</div>
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
