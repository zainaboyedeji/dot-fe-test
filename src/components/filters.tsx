import React, { useState } from "react";
import { useRouter } from "next/router";

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
    <div className="flex justify-between p-4 bg-white shadow-md mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded-md"
      />
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border p-2 rounded-md"
          min={0}
          max={maxPrice}
        />
        <span>to</span>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border p-2 rounded-md"
          min={minPrice}
        />
      </div>
      <select
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button
        onClick={handleFilter}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Filter
      </button>
      <button
        onClick={() => router.push(`/product/create`)}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Create New Product
      </button>
    </div>
  );
}
