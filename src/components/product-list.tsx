import React from "react";
import { useRouter } from "next/router";
import { useCart } from "@/context/cart-context";
import { FiX } from "react-icons/fi";

interface Product {
  name: string;
  id: number;
  price: number;
  rating: number;
  reviews: number;
  stock?: number;
  quantity?: number;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const router = useRouter();
  const {
    cartItems,
    isCartOpen,
    toggleCartDrawer,
    handleQuantityChange,
    removeFromCart,
    calculateTotal,
    addToCart,
  } = useCart();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div onClick={() => router.push(`/product/${product.id}`)}>
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                ★ {product.rating} ({product.reviews} reviews)
              </p>
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-black text-white w-full py-2 rounded-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4">
          {/* Close Cart Drawer Button */}
          <button
            onClick={toggleCartDrawer}
            className="text-gray-500 hover:text-black absolute top-4 right-4 text-2xl"
          >
            <FiX />
          </button>

          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <>
              <p className="text-gray-500 mb-4">
                You have {cartItems.length} items in your cart.
              </p>
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 ml-4">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Decrease quantity */}
                      <button
                        onClick={() => handleQuantityChange(index, false)}
                        className="w-8 h-8 bg-gray-300 text-gray-700 rounded-lg"
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      {/* Increase quantity */}
                      <button
                        onClick={() => handleQuantityChange(index, true)}
                        className="w-8 h-8 bg-gray-300 text-gray-700 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                    {/* Remove from cart */}
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 ml-2"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>

              {/* Cart Total */}
              <div className="mt-6">
                <p className="text-xl font-bold text-right">
                  Total: ${calculateTotal().toFixed(2)}
                </p>
                <button className="mt-4 bg-black text-white w-full py-2 rounded-full">
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}
