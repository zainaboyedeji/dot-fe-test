import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const [selectedComponent, setSelectedComponent] = useState("Products");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <aside
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gray-100 w-64 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:w-64 lg:block`}
      >
        <Sidebar setSelectedComponent={setSelectedComponent} />
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <main className="flex-1 p-6 bg-gray-50"> 
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {children}
      </main>
    </div>
  );
}
