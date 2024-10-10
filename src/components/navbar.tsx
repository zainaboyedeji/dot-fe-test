import React from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ isSidebarOpen, toggleSidebar }: NavbarProps) {
  return (
    <div className="flex justify-between items-center mb-5 p-4 bg-gray-100">
  
      <div className="text-lg font-bold">DOT FE TEST APP</div>
      <div>
        <FiShoppingCart className="text-2xl" />
      </div>

      <div className="lg:hidden">
        {isSidebarOpen ? (
          <FiX className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        ) : (
          <FiMenu className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        )}
      </div>
    </div>
  );
}
