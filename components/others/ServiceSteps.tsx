import Image from "next/image";

const ServiceSteps = () => {
  const steps = [
    {
      imgSrc: "/steps-icons/rupee.png",
      title: "Check Price",
      description: "Choose your device for repair and get the best price.",
    },
    {
      imgSrc: "/steps-icons/calender.png",
      title: "Schedule Service",
      description: "Schedule your repair at a convenient date.",
    },
    {
      imgSrc: "/steps-icons/spannertool.png",
      title: "Diagnosis & Fix",
      description:
        "Identify the issue and get it fixed quickly by our experts.",
    },
    {
      imgSrc: "/steps-icons/handbox.png",
      title: "Delivered to You",
      description:
        "Get your repaired device safely delivered to your doorstep.",
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-2 md:px-6 py-4 md:py-8">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-8">
        How Our Service Works
      </h2>
      <div className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-3 md:gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group flex flex-row md:flex-col items-center md:items-center flex-1 text-left md:text-center bg-white border border-gray-200 shadow-sm md:shadow-md hover:shadow-lg md:hover:shadow-2xl hover:border-blue-300 hover:bg-blue-50 rounded-xl md:rounded-2xl p-3 md:p-7 transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 h-full md:min-h-[260px]"
            tabIndex={0}
          >
            <div className="transition-transform duration-200 group-hover:scale-110 group-active:scale-95 mb-0 md:mb-3 mr-3 md:mr-0 flex-shrink-0 md:w-full md:flex md:justify-center">
              <Image
                src={step.imgSrc}
                alt={step.title}
                width={64}
                height={64}
                className="w-10 h-10 md:w-16 md:h-16 drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col flex-1 justify-center md:justify-between w-full">
              <h3 className="text-base md:text-xl font-semibold mb-1">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-base md:min-h-[48px] md:flex md:items-center md:justify-center">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSteps;
