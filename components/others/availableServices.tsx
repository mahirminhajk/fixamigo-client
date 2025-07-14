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
    },
    {
      imgSrc: "/icons/laptop.png",
      title: "Repair Laptop",
      description:
        "Expert laptop repair services for hardware and software issues.",
      href: "/repair/laptop",
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-2 md:px-6 py-4 md:py-8">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">
        Available Services
      </h2>
      <div className="flex flex-col md:flex-row md:justify-center md:items-stretch gap-4 md:gap-6 max-w-2xl mx-auto">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="group flex flex-row md:flex-col items-center md:items-center flex-1 text-left md:text-center bg-white border border-gray-200 shadow-sm md:shadow-md hover:shadow-lg md:hover:shadow-xl hover:border-blue-300 hover:bg-blue-50 rounded-lg md:rounded-xl p-3 md:p-6 transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 h-full md:min-h-[180px] max-w-md mx-auto md:mx-0"
            tabIndex={0}
          >
            <div className="transition-transform duration-200 group-hover:scale-110 group-active:scale-95 mb-0 md:mb-3 mr-4 md:mr-0 flex-shrink-0 md:w-full md:flex md:justify-center">
              <Image
                src={service.imgSrc}
                alt={service.title}
                width={64}
                height={64}
                className="w-10 h-10 md:w-16 md:h-16 drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col flex-1 justify-center md:justify-between w-full">
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-sm md:min-h-[40px] md:flex md:items-center md:justify-center leading-relaxed">
                {service.description}
              </p>
              <div className="hidden md:flex justify-center mt-3">
                <span className="text-blue-600 font-medium text-xs group-hover:text-blue-700 transition-colors duration-200">
                  Get Started →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AvailableServices;
