import { repairCategory } from "@/constants";
import {
  Smartphone,
  PlugZap,
  BatteryFull,
  Camera,
  Volume2,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

const iconMap: Record<string, JSX.Element> = {
  display: <Smartphone size={30} className="text-white" />,
  ports: <PlugZap size={30} className="text-white" />,
  battery: <BatteryFull size={30} className="text-white" />,
  camera: <Camera size={30} className="text-white" />,
  speaker: <Volume2 size={30} className="text-white" />,
  "mobile-phone": <MoreHorizontal size={30} className="text-white" />,
};

const ListRepairCategory = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <p className="text-gray-600 text-base md:text-lg mb-3">
          Got a broken device? Let us fix it for you!
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Choose Your Repair Category
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Select the component that needs repair and get instant quotes for
          parts and services
        </p>
      </div>

      {/* Enhanced Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 place-items-center max-w-4xl">
          {repairCategory.map((category, index) => (
            <Link
              href={`/repair/${category.slug}`}
              key={index}
              className="group relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 
                         flex flex-col items-center justify-center
                         bg-gradient-to-br from-[#121212] via-gray-800 to-black
                         hover:from-[#D2691E] hover:via-orange-600 hover:to-orange-800
                         rounded-2xl md:rounded-3xl text-white 
                         shadow-lg hover:shadow-xl
                         transition-all duration-200 ease-in-out 
                         hover:scale-105
                         focus:outline-none focus:ring-4 focus:ring-[#D2691E]/50
                         border border-gray-700 hover:border-[#D2691E]
                         cursor-pointer"
            >
              {/* Icon */}
              <div className="mb-1 pointer-events-none">
                {iconMap[category.slug] || (
                  <MoreHorizontal
                    size={24}
                    className="md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                  />
                )}
              </div>

              {/* Category name */}
              <span
                className="text-xs md:text-sm font-medium 
                           text-center leading-tight px-1 
                           group-hover:text-orange-100 transition-colors duration-200
                           pointer-events-none"
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Can&apos;t find what you&apos;re looking for?
          <Link
            href="/support-request?type=can-not-find"
            className="text-blue-600 hover:text-blue-700 font-medium ml-1"
          >
            Contact support
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ListRepairCategory;
