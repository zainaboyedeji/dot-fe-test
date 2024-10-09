import { useState } from "react";

interface Product {
  name: string;
  price: number;
  rating: number;
  reviews: number;
  stock?: number;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState(products); // For simplicity, reusing the products array
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartDrawer = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (product) => {
    // setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const handleQuantityChange = (index: number, increment: boolean) => {
    const updatedCart = [...cartItems];
    if (increment) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart[index].quantity =
        updatedCart[index].quantity > 1 ? updatedCart[index].quantity - 1 : 1;
    }
    setCartItems(updatedCart);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500">
              ★ {product.rating} ({product.reviews} reviews)
            </p>
            <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-black text-white w-full py-2 rounded-full"
            >
              Add to Cart
            </button>{" "}
          </div>
        ))}
      </div>

      {/* Cart display */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4">
          <button
            onClick={toggleCartDrawer}
            className="text-gray-500 hover:text-black absolute top-4 right-4 text-2xl"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          <p className="text-gray-500 mb-4">
            You have {cartItems?.length} items in your cart.
          </p>
          <ul className="space-y-4">
            {cartItems?.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 ml-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(index, false)}
                    className="w-8 h-8 bg-gray-300 text-gray-700 rounded-lg"
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(index, true)}
                    className="w-8 h-8 bg-gray-300 text-gray-700 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 ml-2"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-xl font-bold text-right">
              Total: ${calculateTotal()?.toFixed(2)}
            </p>
            <button className="mt-4 bg-black text-white w-full py-2 rounded-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
