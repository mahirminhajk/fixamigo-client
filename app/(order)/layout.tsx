"use client";
import { ReactNode } from "react";
import MinimalHeader from "@/components/core/MinimalHeader";

function Layout({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <>
      <MinimalHeader />
      <main className="min-h-screen bg-gray-50">{children}</main>
    </>
  );
}

export default Layout;
