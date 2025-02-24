import Carousel from "@/components/others/carousel";
import ListRepairCategory from "@/components/list/listRepairCategory";
import BrandsList from "@/components/list/brandsList";

const Home = () => {
  return (
    <section>
      <Carousel />
      <ListRepairCategory />
      <BrandsList variant="min" />
    </section>
  );
};

export default Home;
