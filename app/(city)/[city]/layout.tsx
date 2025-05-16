import Navbar from "@/components/core/navbar";
import { supportCities } from "@/constants";
import { ReactNode } from "react";

async function Layout({
  children,
  params,
}: Readonly<{ children?: ReactNode; params: Promise<{ city: string }> }>) {
  const { city } = await params;
  const cityData = supportCities.find((c) => c.slug === city);

  return (
    <>
      <Navbar city={cityData?.name} />
      <main>{children}</main>
    </>
  );
}

export default Layout;
