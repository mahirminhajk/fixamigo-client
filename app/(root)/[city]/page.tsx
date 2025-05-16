import Carousel from "@/components/others/carousel";
import ListRepairCategory from "@/components/list/listRepairCategory";
import BrandsList from "@/components/list/brandsList";
import { supportCities } from "@/constants";

// Static Generation
export const dynamicParams = false;
export async function generateStaticParams() {
  return supportCities.map((city) => ({
    city: city.slug,
  }));
}

const CityHome = () => {
  return (
    <section>
      <Carousel />
      <ListRepairCategory />
      <BrandsList variant="min" />
    </section>
  );
};

export default CityHome;
