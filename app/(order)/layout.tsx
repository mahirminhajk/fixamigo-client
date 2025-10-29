"use client";
import { ReactNode } from "react";

function Layout({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <>
      {/* UserNavbar removed for checkout and order pages */}
      <main className="min-h-screen bg-gray-50">{children}</main>
    </>
  );
}

export default Layout;
