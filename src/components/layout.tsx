import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [selectedComponent, setSelectedComponent] = useState("Products");

  return (
    <div className="flex">
      <Sidebar setSelectedComponent={setSelectedComponent} />
      <main className="flex-1 p-6 bg-gray-50">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
