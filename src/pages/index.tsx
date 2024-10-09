import { useState } from "react";
import { FaBars } from "react-icons/fa";
import EditProduct from "@/components/editProduct";
import CreateProduct from "@/components/createProduct";

const categories = [
  { name: 'Electronics', subcategories: ['Smartphones', 'Laptops', 'Accessories'] },
  { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] },
  { name: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Kitchen'] },
];

const products = [
  { name: "Men's Casual Shirt", price: 39.99, rating: 4.2, reviews: 200 },
  { name: 'Wireless Earbuds', price: 129.99, rating: 4.3, reviews: 120 },
  { name: 'Smart Home Hub', price: 199.99, rating: 4.6, reviews: 75 },
  { name: 'Smartphone X', price: 999.99, rating: 4.3, reviews: 120 },
  { name: 'Laptop Pro', price: 1499.99, rating: 4.8, reviews: 85 },
];

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("products");
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortBy, setSortBy] = useState('Price');
  const [order, setOrder] = useState('Ascending');
  const [cartItems, setCartItems] = useState(products);
  const [isCartOpen, setIsCartOpen] = useState(true); // Set true for display

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle cart drawer visibility
  const toggleCartDrawer = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Handle quantity change
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

  // Handle item removal
  const removeFromCart = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  // Calculate total cost
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]); // Add item to the cart
    setIsCartOpen(true); // Open cart drawer
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Test App</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden flex items-center justify-center bg-black text-white p-2 rounded-full"
          >
            <FaBars />
          </button>
          {/* Cart Icon */}
          <button onClick={toggleCartDrawer} className="relative">
            <span className="material-icons">shopping_cart</span>
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } lg:block w-64 bg-gray-100 p-4 fixed inset-y-0 z-10 lg:relative lg:inset-auto lg:w-64 lg:bg-gray-100`}
        >
          <h2 className="font-bold mb-4">Categories</h2>
          <ul>
            <li className="mb-2" onClick={() => switchView("products")}>
              <h3 className="text-red-500 font-bold">Products</h3>
            </li>
            <li className="mb-2" onClick={() => switchView("edit")}>
              <h3 className="text-red-500 font-bold">Edit Product</h3>
            </li>
            <li className="mb-2" onClick={() => switchView("create")}>
              <h3 className="text-red-500 font-bold">Create Product</h3>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-64">
          {currentView === "products" ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">All Products</h2>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      ★ {product.rating} ({product.reviews} reviews)
                    </p>
                    <p className="text-xl font-bold">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 bg-black text-white w-full py-2 rounded-full"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : currentView === "edit" ? (
            <EditProduct />
          ) : (
            <CreateProduct />
          )}
        </main>
      </div>
      <>
      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="p-4">
          {/* Close Button */}
          <button
            onClick={toggleCartDrawer}
            className="text-gray-500 hover:text-black absolute top-4 right-4 text-2xl"
          >
            &times;
          </button>

          {/* Cart Header */}
          <h2 className="text-xl font-bold mb-4">
            Shopping Cart
          </h2>
          <p className="text-gray-500 mb-4">
            You have {cartItems.length} items in your cart.
          </p>

          {/* Cart Items */}
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                {/* Item Image Placeholder */}
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>

                <div className="flex-1 ml-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(index, false)}
                    className="w-8 h-8 bg-gray-300 text-gray-700 rounded-lg"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(index, true)}
                    className="w-8 h-8 bg-gray-300 text-gray-700 rounded-lg"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 ml-2"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="mt-6">
            <p className="text-xl font-bold text-right">
              Total: ${calculateTotal().toFixed(2)}
            </p>

            {/* Checkout Button */}
            <button className="mt-4 bg-black text-white w-full py-2 rounded-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
    </div>
  );
}
