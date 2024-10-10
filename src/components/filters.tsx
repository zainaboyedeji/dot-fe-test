import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "./button";

interface FiltersProps {
  onFilter: (filters: {
    search: string;
    minPrice: number;
    maxPrice: number;
    order: string;
  }) => void;
}

export default function Filters({ onFilter }: FiltersProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [order, setOrder] = useState("asc");

  const handleFilter = () => {
    onFilter({ search, minPrice, maxPrice, order });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between p-4 bg-white shadow-md mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded-md w-full sm:w-auto"
      />

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border p-2 rounded-md w-full sm:w-auto"
          min={0}
          max={maxPrice}
        />
        <span className="hidden sm:inline">to</span>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border p-2 rounded-md w-full sm:w-auto"
          min={minPrice}
        />
      </div>

      <select
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        className="border p-2 rounded-md w-full sm:w-auto"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <Button onClick={handleFilter}> Filter</Button>

      <Button onClick={() => router.push(`/product/create`)}>
        Create New Product
      </Button>
    </div>
  );
}
