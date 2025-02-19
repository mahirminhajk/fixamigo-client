import Navbar from "@/components/core/navbar";
import { ReactNode } from "react";

function Layout({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="pt-[62px]">{children}</main>
    </>
  );
}

export default Layout;
