"use client";
import { ReactNode } from "react";
import UserNavbar from "@/components/core/userNavbar";

function Layout({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <>
      <UserNavbar />
      <main className="min-h-screen bg-gray-50">{children}</main>
    </>
  );
}

export default Layout;
