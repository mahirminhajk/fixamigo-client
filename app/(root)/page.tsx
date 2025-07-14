import Carousel from "@/components/others/carousel";
import ListRepairCategory from "@/components/list/listRepairCategory";
import BrandsList from "@/components/list/brandsList";
import ServiceSteps from "@/components/others/ServiceSteps";
import AvailableServices from "@/components/others/availableServices";

const Home = () => {
  return (
    <section>
      <Carousel />
      <ListRepairCategory />
      <AvailableServices />
      <BrandsList variant="min" />
      <ServiceSteps />
    </section>
  );
};

export default Home;
