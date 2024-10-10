import Filters from "@/components/filters";
import Pagination from "@/components/pagination";
import ProductList from "@/components/product-list";
import CardSkeleton from "@/components/card-skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllProducts } from "@/services/api";
import WebPageTitle from "@/components/webpage-title";

export default function Products() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPage] = useState<number>(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", currentPage, totalPages],
    queryFn: getAllProducts,
  });

  const products = data?.products || [];

  const handleFilter = (filters: any) => {
    // Apply filters here
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <WebPageTitle title="Products | DOT FE TEST" />
      <div>
        <Filters onFilter={handleFilter} />
        {isLoading ? (
          <CardSkeleton />  
        ) : error ? (
          <p>Error loading products</p>
        ) : (
          <ProductList products={products} />
        )}
        <Pagination
          currentPage={data?.currentPage}
          totalPages={data?.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
