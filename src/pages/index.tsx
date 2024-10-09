import { useState } from "react";
import { FaBars } from "react-icons/fa";
import EditProduct from "@/components/editProduct"; // Import the EditProduct component
import CreateProduct from "@/components/createProduct"; // Import the CreateProduct component

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
  const [currentView, setCurrentView] = useState("products"); // Track current view
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortBy, setSortBy] = useState('Price');
  const [order, setOrder] = useState('Ascending');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const switchView = (view: string) => {
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
              <div>
                <h2 className="text-2xl font-bold mb-4">All Products</h2>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex space-x-4 items-center">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="border rounded-lg p-2 w-full"
                  />
                  <div className="flex items-center space-x-2">
                    <span>Price Range:</span>
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      className="border rounded-lg p-2 w-20"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      className="border rounded-lg p-2 w-20"
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg p-2"
                  >
                    <option value="Price">Price</option>
                    <option value="Rating">Rating</option>
                  </select>
                  <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="border rounded-lg p-2"
                  >
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                  </select>
                </div>

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
                      <button className="mt-4 bg-black text-white w-full py-2 rounded-full">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6 flex-col lg:flex-row space-y-4 lg:space-y-0">
                  <button className="px-4 py-2 bg-gray-300 rounded-full">
                    Previous
                  </button>
                  <span>Page 1</span>
                  <button className="px-4 py-2 bg-gray-300 rounded-full">
                    Next
                  </button>
                  <select className="border rounded-lg p-2">
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                  </select>
                </div>
              </div>{" "}
            </div>
          ) : currentView === "edit" ? (
            <EditProduct /> // Show EditProduct component
          ) : (
            <CreateProduct /> // Show CreateProduct component
          )}
        </main>
      </div>
    </div>
  );
}
