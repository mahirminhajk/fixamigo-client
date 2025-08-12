"use client";

import { FC, ReactElement } from "react";
import { FaRupeeSign, FaCalendarAlt, FaTools, FaTruck } from "react-icons/fa";

interface Step {
  icon: ReactElement;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <FaRupeeSign size={28} className="text-orange-500" />,
    title: "1.Check Price",
    description: "Choose your device for repair and get the best price.",
  },
  {
    icon: <FaCalendarAlt size={28} className="text-orange-500" />,
    title: "2.Schedule Service",
    description: "Schedule your repair at a convenient date.",
  },
  {
    icon: <FaTools size={28} className="text-orange-500" />,
    title: "3.Diagnosis & Fix",
    description: "Identify the issue and get it fixed quickly by our experts.",
  },
  {
    icon: <FaTruck size={28} className="text-orange-500" />,
    title: "4.Delivered to You",
    description: "Get your repaired device safely delivered to your doorstep.",
  },
];

const OurProcess: FC = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">Our Process</h2>
      <p className="text-gray-700 mb-8">
        At fixamigo, we’ve made the repair process simple and hassle-free:
      </p>

      <div className="grid gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0">{step.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-gray-800">
        We Fix All Types of Mobile Phone Issues. No matter the brand or problem,
        our expert technicians provide fast, reliable, and affordable repairs
        for your smartphone.
      </p>
    </section>
  );
};

export default OurProcess;
