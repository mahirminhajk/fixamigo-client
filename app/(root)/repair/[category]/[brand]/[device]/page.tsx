import Image from "next/image";

// Interface
interface Device {
  _id: string;
  name: string;
  slug: string;
  company: string;
  images: string[];
}

// Fetch function
const getData = async (deviceSlug: string) => {
  try {
    const res = await fetch(`${process.env.API_URL}/device/s/${deviceSlug}`);
    if (!res.ok) throw new Error("Failed to fetch data");

    return (await res.json()).data;
  } catch (error) {
    console.error("Error fetching models:", error);
    return null;
  }
};

// Page Component
export default async function Page({
  params,
}: {
  params: Promise<{ device: string }>;
}) {
  const { device } = await params;
  const deviceData: Device | null = await getData(device);

  if (!deviceData) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-red-500">Device not found</p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex justify-center">
        <div className="flex flex-col items-center p-4">
          <div className="rounded-xl  flex flex-col items-center">
            <Image
              src={deviceData.images[0]}
              alt={deviceData.name}
              width={320}
              height={320}
              className="object-contain mb-2"
            />
            <p className="text-lg font-bold">{deviceData.name}</p>
            <span className="mt-2 px-3 py-1 border border-black rounded-[6px] text-xs font-semibold">
              {deviceData.company}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
