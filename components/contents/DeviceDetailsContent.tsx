import ListSpareParts from "@/components/list/listSpareParts";
import ShowModel from "@/components/others/showModel";
import WhyChooseUs from "@/components/others/whyChooseUs";
import OtherPhones from "@/components/others/otherPhones";
import { IDevice } from "@/types/device";
import ModelCart from "../others/modelCart";

interface DeviceDetailsContentProps {
  deviceData: IDevice;
}

export default function DeviceDetailsContent({
  deviceData,
}: DeviceDetailsContentProps) {
  return (
    <section className="max-w-7xl mx-auto px-4">
      {/* Mobile Layout (unchanged) */}
      <div className="lg:hidden">
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
      </div>{" "}
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Device Info and Spare Parts (3/4 width) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Device Info Section */}
            <ShowModel
              deviceData={{
                name: deviceData.name,
                company: deviceData.company,
                images: deviceData.images,
              }}
            />

            {/* Spare Parts Section */}
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

            {/* Model Cart */}
            <ModelCart />
          </div>

          {/* Right Column - Other Phones (1/4 width) */}
          <div className="lg:col-span-1">
            <OtherPhones
              currentDevice={{
                company: deviceData.company,
                slug: deviceData.slug,
              }}
            />
          </div>
        </div>

        {/* Why Choose Us Section - Bottom */}
        <div className="mt-12 flex justify-center">
          <WhyChooseUs />
        </div>
      </div>
    </section>
  );
}
