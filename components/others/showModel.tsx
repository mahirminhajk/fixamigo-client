import Image from "next/image";

interface ShowModelProps {
  deviceData: {
    name: string;
    company: string;
    images: string[];
  };
}

function ShowModel({ deviceData }: ShowModelProps) {
  return (
    <div className="flex justify-center">
      {/* Mobile Layout - Original horizontal */}
      <div className="lg:hidden flex flex-col items-center p-4">
        <div className="rounded-xl flex flex-col items-center">
          <div className="w-56 h-56 flex items-center justify-center">
            <Image
              src={deviceData.images[1]}
              alt={deviceData.name}
              title={deviceData.name}
              width={224}
              height={224}
              className="object-cover w-full h-full mb-2"
            />
          </div>
          <p className="text-lg font-bold">{deviceData.name.toUpperCase()}</p>
          <span className="mt-2 px-3 py-1 border border-black rounded-[6px] text-xs font-semibold">
            {deviceData.company.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Desktop Layout - Horizontal layout for top position */}
      <div className="hidden lg:flex lg:items-center lg:gap-8 p-4">
        {/* Image Section */}
        <div className="rounded-xl">
          <div className="w-64 h-64 flex items-center justify-center">
            <Image
              src={deviceData.images[1]}
              alt={deviceData.name}
              title={deviceData.name}
              width={256}
              height={256}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>

        {/* Device Info Section */}
        <div className="flex-1 max-w-md">
          <p className="text-2xl font-bold mb-4">
            {deviceData.name.toUpperCase()}
          </p>
          <span className="inline-block px-4 py-2 border border-black rounded-[6px] text-sm font-semibold mb-6">
            {deviceData.company.toUpperCase()}
          </span>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Genuine spare parts available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Professional repair service
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Warranty on select parts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowModel;
