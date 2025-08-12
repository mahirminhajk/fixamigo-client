"use client";

import { FC } from "react";
import Image from "next/image";

interface Step {
  icon: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: "/steps-icons/rupee.png",
    title: "1.Check Price",
    description: "Choose your device for repair and get the best price.",
  },
  {
    icon: "/steps-icons/calender.png",
    title: "2.Schedule Service",
    description: "Schedule your repair at a convenient date.",
  },
  {
    icon: "/steps-icons/spannertool.png",
    title: "3.Diagnosis & Fix",
    description: "Identify the issue and get it fixed quickly by our experts.",
  },
  {
    icon: "/steps-icons/handbox.png",
    title: "4.Delivered to You",
    description: "Get your repaired device safely delivered to your doorstep.",
  },
];

const OurProcess: FC = () => {
  return (
    <section className="max-w-4xl mx-auto ">
      <h2 className="text-2xl font-bold mb-2 text-[#D2691E]">Our Process</h2>
      <p className="text-gray-700 mb-8">
        At fixamigo, we’ve made the repair process simple and hassle-free:
      </p>

      <div className="grid gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Image
                src={step.icon}
                alt={step.title}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
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
