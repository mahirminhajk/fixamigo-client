import ListSpareParts from "@/components/list/listSpareParts";
import ShowModel from "@/components/others/showModel";
import WhyChooseUs from "@/components/others/whyChooseUs";
import { IDevice } from "@/types/device";
import ModelCart from "../others/modelCart";

interface DeviceDetailsContentProps {
  deviceData: IDevice;
}

export default function DeviceDetailsContent({
  deviceData,
}: DeviceDetailsContentProps) {
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
