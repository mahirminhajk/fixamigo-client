import Image from "next/image";
import Link from "next/link";

const ServiceSteps = () => {
  const steps = [
    {
      imgSrc: "/steps-icons/rupee.png",
      title: "Check Price",
      description: "Choose your device for repair and get the best price.",
      color: "from-[#D2691E] to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-gray-200", // match second card border style
    },
    {
      imgSrc: "/steps-icons/calender.png",
      title: "Schedule Service",
      description: "Schedule your repair at a convenient date.",
      color: "from-[#121212] to-gray-700",
      bgColor: "bg-orange-50", // use inside bg like cards 1 & 3
      borderColor: "border-gray-200",
    },
    {
      imgSrc: "/steps-icons/spannertool.png",
      title: "Diagnosis & Fix",
      description:
        "Identify the issue and get it fixed quickly by our experts.",
      color: "from-[#D2691E] to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-gray-200", // match second card border style
    },
    {
      imgSrc: "/steps-icons/handbox.png",
      title: "Delivered to You",
      description:
        "Get your repaired device safely delivered to your doorstep.",
      color: "from-[#121212] to-gray-700",
      bgColor: "bg-orange-50", // use inside bg like cards 1 & 3
      borderColor: "border-gray-200",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          How Our Service Works
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Simple, transparent process from diagnosis to delivery
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`group relative flex flex-col items-center text-center 
                       bg-white ${step.borderColor} border-2
                       shadow-lg hover:shadow-2xl 
                       rounded-xl md:rounded-2xl p-3 md:p-6 lg:p-8 
                       transition-all duration-300 ease-in-out 
                       hover:scale-105 hover:-translate-y-2
                       focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                       min-h-[200px] md:min-h-[240px] lg:min-h-[280px] overflow-hidden`}
            tabIndex={0}
          >
            {/* Background gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${step.color} 
                             opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl md:rounded-2xl`}
            ></div>

            {/* Step number */}
            <div
              className="absolute top-2 left-2 md:top-4 md:left-4 w-6 h-6 md:w-8 md:h-8 
                             bg-[#121212]
                             rounded-full flex items-center justify-center
                             text-white font-bold text-xs md:text-sm shadow-lg"
            >
              {index + 1}
            </div>

            {/* Icon container */}
            <div
              className={`relative z-10 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-3 md:mb-6 mt-2 md:mt-4
                             ${step.bgColor} 
                             rounded-xl md:rounded-2xl flex items-center justify-center
                             shadow-md group-hover:shadow-lg
                             transform transition-all duration-300 
                             group-hover:scale-110 group-hover:rotate-3
                             border ${step.borderColor}`}
            >
              <Image
                src={step.imgSrc}
                alt={step.title}
                title={step.title}
                width={48}
                height={48}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 drop-shadow-sm
                           transform transition-transform duration-300
                           group-hover:scale-110"
              />

              {/* Shine effect */}
              <div
                className="absolute inset-0 rounded-xl md:rounded-2xl 
                              bg-gradient-to-r from-transparent via-white/30 to-transparent
                              transform -skew-x-12 translate-x-[-100%] 
                              group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
              ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col flex-1 justify-center">
              <h3
                className="text-sm md:text-lg lg:text-xl font-bold mb-2 md:mb-3 text-gray-900 
                             group-hover:text-gray-700 transition-colors duration-300 leading-tight"
              >
                {step.title}
              </h3>
              <p
                className="text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed
                             group-hover:text-gray-700 transition-colors duration-300"
              >
                {step.description}
              </p>
            </div>

            {/* Progress connector for desktop */}
            {index < steps.length - 1 && (
              <div
                className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 
                              bg-gradient-to-r from-gray-300 to-gray-200 
                              transform -translate-y-1/2 z-0"
              >
                <div
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 
                                w-2 h-2 bg-gray-400 rounded-full"
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center mt-8 md:mt-12">
        <div className="relative inline-block">
          {/* Animated background */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#D2691E] via-[#121212] to-[#D2691E] 
                          rounded-2xl blur-sm opacity-75 animate-pulse"
          ></div>

          <Link
            href="/repair/mobile-phone"
            className="relative inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 
                       bg-gradient-to-r from-[#D2691E] via-[#121212] to-[#D2691E] 
                       hover:from-[#121212] hover:via-[#D2691E] hover:to-[#121212]
                       text-white font-bold rounded-2xl
                       shadow-xl hover:shadow-2xl
                       transform transition-all duration-300
                       hover:scale-105 hover:-translate-y-1
                       focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                       text-sm md:text-base
                       before:absolute before:inset-0 before:bg-gradient-to-r 
                       before:from-white/20 before:to-transparent before:rounded-2xl
                       before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
          >
            <div className="flex items-center gap-3 relative z-10">
              <span>Start Your Repair Journey</span>
              <svg
                className="w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-300 group-hover:translate-x-1"
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
          </Link>
        </div>
        <p className="text-xs md:text-sm text-gray-500 mt-4">
          Quick, reliable, and hassle-free device repairs
        </p>
      </div>
    </section>
  );
};

export default ServiceSteps;
