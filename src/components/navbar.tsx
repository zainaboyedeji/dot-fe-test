import React from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "@/context/cart-context";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ isSidebarOpen, toggleSidebar }: NavbarProps) {
  const { cartItems } = useCart(); // Access cart items from the Cart Context
  const cartItemCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0); // Calculate total item count

  const { toggleCartDrawer } = useCart(); // Function to open the cart drawer

  return (
    <div className="flex justify-between items-center mb-5 p-4 bg-gray-100">
      <div className="text-lg font-bold">DOT FE TEST APP</div>
      
      <div className="relative cursor-pointer" onClick={toggleCartDrawer}>
        <FiShoppingCart className="text-2xl" />
        {cartItemCount > 0 && (
          <span className="absolute top-0 right-0 text-sm bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
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
