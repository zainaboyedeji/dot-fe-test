import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Filters from '@/components/filters';
import ProductList from '@/components/product-list';
import Pagination from '@/components/pagination';

const initialProducts = [
  { name: "Men's Casual Shirt", price: 39.99, rating: 4.2, reviews: 200, stock: 75 },
  { name: 'Wireless Earbuds', price: 129.99, rating: 4.3, reviews: 120 },
  { name: 'Smart Home Hub', price: 199.99, rating: 4.6, reviews: 75 },
  { name: 'Smartphone X', price: 999.99, rating: 4.3, reviews: 120 },
  { name: 'Laptop Pro', price: 1499.99, rating: 4.8, reviews: 85 },
];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilter = (filters: any) => {
    // Apply filters here
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Filters onFilter={handleFilter} />
        <ProductList products={products} />
        <Pagination currentPage={currentPage} totalPages={3} onPageChange={handlePageChange} />
      </main>
    </div>
  );
}
