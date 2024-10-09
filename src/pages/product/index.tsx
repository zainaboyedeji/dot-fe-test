import Filters from "@/components/filters";
import Pagination from "@/components/pagination";
import ProductList from "@/components/product-list";
import { useState } from "react";

const initialProducts = [
    { name: "Men's Casual Shirt", price: 39.99, rating: 4.2, reviews: 200, stock: 75 },
    { name: 'Wireless Earbuds', price: 129.99, rating: 4.3, reviews: 120 },
    { name: 'Smart Home Hub', price: 199.99, rating: 4.6, reviews: 75 },
    { name: 'Smartphone X', price: 999.99, rating: 4.3, reviews: 120 },
    { name: 'Laptop Pro', price: 1499.99, rating: 4.8, reviews: 85 },
  ];
export default function Products() {
    const [products, setProducts] = useState(initialProducts);

    const [currentPage, setCurrentPage] = useState(1);
    const handleFilter = (filters: any) => {
        // Apply filters here
      };
    
      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
  return (
    <div>
      <Filters onFilter={handleFilter} />
      <ProductList products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
