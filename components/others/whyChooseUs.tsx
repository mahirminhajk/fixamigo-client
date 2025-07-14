import { Lock, IndianRupee, Shield, Clock } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div className="p-6 bg-white rounded-[6px] shadow-sm max-w-md mx-auto lg:max-w-4xl lg:shadow-md">
      <h2 className="text-lg lg:text-2xl font-semibold mb-4 lg:mb-8 text-center lg:text-left">
        Why choose us?
      </h2>

      {/* Mobile Layout - Original 2x2 grid */}
      <div className="lg:hidden">
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

      {/* Desktop Layout - Enhanced with more features */}
      <div className="hidden lg:block">
        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <IndianRupee size={32} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Pay After Service
            </h3>
            <p className="text-sm text-gray-600">
              No upfront payment required. Pay only after your device is
              repaired
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock size={32} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
            <p className="text-sm text-gray-600">
              Your personal data is completely safe and secure with us
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield size={32} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Warranty</h3>
            <p className="text-sm text-gray-600">
              30-day warranty on select repairs and spare parts
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={32} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Service</h3>
            <p className="text-sm text-gray-600">
              Fast and reliable repair services with free pickup
            </p>
          </div>
        </div>

        {/* Stats Section - Enhanced for desktop */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-[12px] p-6">
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-blue-600 text-3xl font-bold mb-1">10K+</p>
              <p className="text-gray-700 text-sm font-medium">
                Products repaired
              </p>
            </div>
            <div>
              <p className="text-blue-600 text-3xl font-bold mb-1">4.5+</p>
              <p className="text-gray-700 text-sm font-medium">
                Rated services
              </p>
            </div>
            <div>
              <p className="text-blue-600 text-3xl font-bold mb-1">24/7</p>
              <p className="text-gray-700 text-sm font-medium">
                Customer support
              </p>
            </div>
            <div>
              <p className="text-blue-600 text-3xl font-bold mb-1">99%</p>
              <p className="text-gray-700 text-sm font-medium">Success rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
