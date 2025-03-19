import ListSpareParts from "@/components/list/listSpareParts";
import ModelCart from "@/components/others/modelCart";
import ShowModel from "@/components/others/showModel";
import WhyChooseUs from "@/components/others/whyChooseUs";
import { ISparePart } from "@/types/spareParts";

// Interface
interface Device {
  _id: string;
  name: string;
  slug: string;
  company: string;
  images: string[];
  spareParts: ISparePart[];
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
      <ShowModel
        deviceData={{
          name: deviceData.name,
          company: deviceData.company,
          images: deviceData.images,
        }}
      />
      <ListSpareParts
        spareParts={deviceData.spareParts}
        cartDevice={{
          _id: deviceData._id,
          name: deviceData.name,
          slug: deviceData.slug,
          company: deviceData.company,
          images: deviceData.images,
        }}
      />
      <ModelCart />
      <WhyChooseUs />
    </section>
  );
}
