import React from "react";
import { Outlet } from "react-router-dom";
import { Header, HeaderLeft } from "./Pages";

function Layout() {
  return (
    <>
      <div className="flex flex-1 flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 bg-[#1c1c21] text-white">
          <section className="p-4 border-t border-r border-t-gray-600 border-r-gray-600 w-60">
            <HeaderLeft />
          </section>
          <main className="p-4 w-full border-t border-t-gray-600 h-[calc(100vh-56px)] overflow-y-scroll scrollbar-hide">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
