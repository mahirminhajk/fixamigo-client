"use client";

import { useRouter } from "next/navigation";
import { FaCircleChevronLeft } from "react-icons/fa6";

export default function Topbar({ title }: Readonly<{ title: string }>) {
  const router = useRouter();

  return (
    <div className="p-4 lg:p-2 max-w-3xl lg:max-w-2xl mx-auto w-full relative">
      <div className="flex items-center justify-center relative">
        {/* Back Button on the Left */}
        <button
          onClick={() => router.back()}
          className="absolute left-0 p-2 flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition duration-300" // Added p-2 for better tap target
          aria-label="Go back"
        >
          <FaCircleChevronLeft className="w-6 h-6" />
        </button>

        {/* Centered Heading */}
        {/* Added px-10 for padding on sides (approx width of button + some space), and truncate */}
        <h1 className="text-xl font-bold text-gray-900 capitalize px-10 truncate">{title}</h1>
      </div>
    </div>
  );
}
