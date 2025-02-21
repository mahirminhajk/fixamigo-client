import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
    <section className="flex flex-col items-center p-6">
      <Card className="w-full max-w-md text-center shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {deviceData.name}
          </CardTitle>
          <p className="text-gray-500">By {deviceData.company}</p>
        </CardHeader>
        <CardContent>
          {deviceData.images.length > 0 ? (
            <div className="relative w-full h-64">
              <Image
                src={deviceData.images[0]}
                alt={deviceData.name}
                layout="fill"
                className="rounded-lg"
              />
            </div>
          ) : (
            <Skeleton className="w-full h-64 rounded-lg" />
          )}
          <p className="mt-4 text-gray-600">Slug: {deviceData.slug}</p>
        </CardContent>
      </Card>
    </section>
  );
}
