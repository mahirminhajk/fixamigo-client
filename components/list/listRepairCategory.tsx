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
        <p className="text-gray-600 text-lg mb-3">
          Got a broken device? Let us fix it for you!
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Choose Your Repair Category
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
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
                         bg-gradient-to-br from-gray-900 via-gray-800 to-black
                         hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
                         rounded-2xl md:rounded-3xl text-white 
                         shadow-lg hover:shadow-2xl
                         transform transition-all duration-300 ease-in-out 
                         hover:scale-110 hover:-translate-y-1
                         focus:outline-none focus:ring-4 focus:ring-blue-300
                         border border-gray-700 hover:border-blue-400"
            >
              {/* Gradient overlay for extra depth */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent 
                              rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300"
              ></div>

              {/* Icon */}
              <div
                className="relative z-10 mb-1 transform transition-transform duration-300 
                              group-hover:scale-110"
              >
                {iconMap[category.slug] || (
                  <MoreHorizontal
                    size={24}
                    className="md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                  />
                )}
              </div>

              {/* Category name */}
              <span
                className="relative z-10 text-xs md:text-sm font-medium 
                               text-center leading-tight px-1 
                               group-hover:text-blue-100 transition-colors duration-300"
              >
                {category.name}
              </span>

              {/* Shine effect */}
              <div
                className="absolute inset-0 rounded-2xl md:rounded-3xl 
                              bg-gradient-to-r from-transparent via-white/20 to-transparent
                              transform -skew-x-12 translate-x-[-100%] 
                              group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
              ></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Can&apos;t find what you&apos;re looking for?
          <Link
            href="/support-request"
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
