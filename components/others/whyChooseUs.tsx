import { Lock, IndianRupee } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div className="p-6 bg-white rounded-[6px] shadow-[6px] max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Why choose us?</h2>

      {/* Pay after service & Data security */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-[6px]">
          <IndianRupee size={20} className="mr-2" />
          <span>Pay after service</span>
        </div>
        <div className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-[6px]">
          <Lock size={20} className="mr-2" />
          <span>Data security</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-4 p-4 bg-blue-100 rounded-[6px] flex justify-between text-center items-center">
        <div className="flex-1">
          <p className="text-blue-600 text-xl font-bold">10K+</p>
          <p className="text-gray-600 text-sm">Products repaired</p>
        </div>

        {/* Vertical Line Divider */}
        <div className="w-px h-10 bg-gray-400"></div>

        <div className="flex-1">
          <p className="text-blue-600 text-xl font-bold">4.5+</p>
          <p className="text-gray-600 text-sm">Rated services</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
