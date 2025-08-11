import Image from "next/image";
import Link from "next/link";

const AvailableServices = () => {
  const services = [
    {
      imgSrc: "/icons/phone.png",
      title: "Repair Mobile",
      description:
        "Professional mobile phone repair services for all brands and models.",
      href: "/repair/mobile-phone",
      gradient: "from-[#121212] to-[#121212]", // default black
      hoverGradient: "hover:from-[#D2691E] hover:to-[#121212]", // orange on hover
      overlayGradient: "from-[#D2691E] to-[#121212]", // hover-only overlays
    },
    {
      imgSrc: "/icons/laptop.png",
      title: "Repair Laptop",
      description:
        "Expert laptop repair services for hardware and software issues.",
      href: "/repair/laptop",
      gradient: "from-[#121212] to-[#121212]", // default black
      hoverGradient: "hover:from-[#D2691E] hover:to-[#121212]", // orange on hover
      overlayGradient: "from-[#D2691E] to-[#121212]", // hover-only overlays
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Our Repair Services
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Professional repair services for all your devices with expert
          technicians and quality parts
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-center md:items-stretch gap-4 md:gap-6 max-w-3xl mx-auto">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="group relative flex flex-col items-center text-center 
                       bg-white border border-gray-200 
                       shadow-lg hover:shadow-2xl 
                       rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 
                       transition-all duration-300 ease-in-out 
                       hover:scale-105 hover:-translate-y-2
                       focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                       flex-1 min-h-[220px] md:min-h-[280px] overflow-hidden"
            title={service.title}
          >
            {/* Background gradient overlay - shows brand orange on hover only */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                service.overlayGradient ?? service.gradient
              } 
                             opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl md:rounded-2xl`}
            ></div>

            {/* Icon container with enhanced styling */}
            <div
              className={`relative z-10 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4 md:mb-6
                             bg-gradient-to-br ${service.gradient} ${service.hoverGradient}
                             rounded-xl md:rounded-2xl flex items-center justify-center
                             shadow-lg group-hover:shadow-xl
                             transform transition-all duration-300 
                             group-hover:scale-110 group-hover:rotate-3`}
            >
              <Image
                src={service.imgSrc}
                alt={service.title}
                title={service.title}
                width={48}
                height={48}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 filter brightness-0 invert drop-shadow-sm"
              />

              {/* Shine effect on icon */}
              <div
                className="absolute inset-0 rounded-xl md:rounded-2xl 
                              bg-gradient-to-r from-transparent via-white/30 to-transparent
                              transform -skew-x-12 translate-x-[-100%] 
                              group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
              ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col flex-1 justify-between">
              <div>
                <h3
                  className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-gray-900 
                               group-hover:text-gray-700 transition-colors duration-300 leading-tight"
                >
                  {service.title}
                </h3>
                <p
                  className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6
                               group-hover:text-gray-700 transition-colors duration-300"
                >
                  {service.description}
                </p>
              </div>

              {/* Call to action button */}
              <div className="flex justify-center">
                <div
                  className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 
                                 bg-gradient-to-r ${service.gradient} ${service.hoverGradient}
                                 text-white font-semibold rounded-lg md:rounded-xl text-sm md:text-base
                                 shadow-md group-hover:shadow-lg
                                 transform transition-all duration-300
                                 group-hover:scale-105`}
                >
                  <span>Get Started</span>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-300 
                                  group-hover:translate-x-1"
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
              </div>
            </div>

            {/* Border gradient effect - visible on hover */}
            <div
              className={`absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br ${
                service.overlayGradient ?? service.gradient
              } 
                             opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
            ></div>
          </Link>
        ))}
      </div>

      {/* Additional info */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Need help choosing?
          <Link
            href="/support-request?type=can-not-find"
            className="text-blue-600 hover:text-blue-700 font-medium ml-1"
            title="Talk to our experts"
          >
            Talk to our experts
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AvailableServices;
