import ProductList from "@/components/product-list";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const categories = [
  { name: 'Electronics', subcategories: ['Smartphones', 'Laptops', 'Accessories'] },
  { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] },
  { name: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Kitchen'] },
];

export default function Products() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("products");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const switchView = (view) => {
    setCurrentView(view);
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
          {/* <button onClick={toggleCartDrawer} className="relative">
            <span className="material-icons">shopping_cart</span>
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {cartItems.length}
              </span>
            )}
          </button> */}
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
            <li className="mb-2" onClick={() => switchView("productDetail")}>
              <h3 className="text-red-500 font-bold">Product Detail</h3>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-64">
          {currentView === "products" ? (
            <ProductList />
          ) : (
            <div>


                dddd
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

