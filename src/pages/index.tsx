// index.tsx
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Products from "@/pages/product";

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState("Electronics");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Products":
        return (
          <>
            <Products />
          </>
        );
      case "Clothing":
        return <div>Clothing page</div>;
      case "Home & Garden":
        return <div>Home & Garden page</div>;
      default:
        return <div>Select a category</div>;
    }
  };

  return (
    <div className="flex">
      <Sidebar setSelectedComponent={setSelectedComponent} />
      <main className="flex-1 p-6 bg-gray-50">{renderComponent()}</main>
    </div>
  );
}
