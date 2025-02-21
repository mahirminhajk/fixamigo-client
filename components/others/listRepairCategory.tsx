import {
  Smartphone,
  PlugZap,
  BatteryFull,
  Camera,
  Volume2,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

const repairCategory = [
  {
    name: "Display",
    icon: <Smartphone size={30} className="text-white" />,
    slug: "display",
  },
  {
    name: "Ports",
    icon: <PlugZap size={30} className="text-white" />,
    slug: "ports",
  },
  {
    name: "Battery",
    icon: <BatteryFull size={30} className="text-white" />,
    slug: "battery",
  },
  {
    name: "Camera",
    icon: <Camera size={30} className="text-white" />,
    slug: "camera",
  },
  {
    name: "Speaker",
    icon: <Volume2 size={30} className="text-white" />,
    slug: "speaker",
  },
  {
    name: "Others",
    icon: <MoreHorizontal size={30} className="text-white" />,
    slug: "others",
  },
];

const ListRepairCategory = () => {
  return (
    <div className="w-full max-w-5xl mx-auto text-center mt-8 px-4">
      <p className="text-gray-500">
        Got a broken device? Let us fix it for you!
      </p>
      <h2 className="text-2xl font-bold mt-2">
        Click below to get your repair parts
      </h2>

      {/* Responsive Grid */}
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center">
          {repairCategory.map((category, index) => (
            <Link
              href={`/repair/${category.slug}`}
              key={index}
              className="bg-black w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center rounded-full text-white transition-transform transform hover:scale-110"
            >
              {category.icon}
              <span className="mt-1 text-sm md:text-base">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListRepairCategory;
