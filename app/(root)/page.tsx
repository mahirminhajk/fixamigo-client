import Carousel from "@/components/others/carousel";
import ListRepairCategory from "@/components/list/listRepairCategory";
import BrandsList from "@/components/list/brandsList";
import ServiceSteps from "@/components/others/ServiceSteps";

const Home = () => {
  return (
    <section>
      <Carousel />
      <ListRepairCategory />
      <BrandsList variant="min" />
      <ServiceSteps />
    </section>
  );
};

export default Home;
