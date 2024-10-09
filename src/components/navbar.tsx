import React from "react";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="flex justify-between mb-5">
      <div>DOT FE TEST APP</div>
      <div>
        <FiShoppingCart />
      </div>
    </div>
  );
}
