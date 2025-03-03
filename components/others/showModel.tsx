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
      <div className="flex flex-col items-center p-4">
        <div className="rounded-xl  flex flex-col items-center">
          <div className="w-56 h-56 flex items-center justify-center">
            <Image
              src={deviceData.images[0]}
              alt={deviceData.name}
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
    </div>
  );
}

export default ShowModel;
