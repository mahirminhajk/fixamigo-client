import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import { ReactNode } from "react";

function Layout({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
