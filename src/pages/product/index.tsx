import Filters from "@/components/filters";
import Pagination from "@/components/pagination";
import ProductList from "@/components/product-list";
import CardSkeleton from "@/components/card-skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllProducts } from "@/services/api";
import WebPageTitle from "@/components/webpage-title";

export default function Products() {
  const [filter, setFilter] = useState({minPrice:0,maxPrice:6000,order:"",search:""});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPage] = useState<number>(1);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "products",
      currentPage,
      filter.minPrice,
      filter.maxPrice,
      filter.order,
      filter.search,
    ],
    queryFn: getAllProducts,
  });

  const products = data?.products || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <WebPageTitle title="Products | DOT FE TEST" />
      <div>
        <Filters onFilter={setFilter} />
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
