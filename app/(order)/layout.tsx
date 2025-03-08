"use client";
import { ReactNode } from "react";

function Layout({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export default Layout;
