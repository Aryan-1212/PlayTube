import React from "react";
import { Outlet } from "react-router-dom";
import { Header, HeaderLeft } from "./Pages";

function Layout() {
  return (
    <>
      <div className="flex flex-1 flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 bg-[#001b29] text-white">
          <section className="p-4 border-t border-r w-60">
            <HeaderLeft />
          </section>
          <main className="p-4 w-full border-t">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
