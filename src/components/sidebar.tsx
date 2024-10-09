// Sidebar.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const sidebarLinks = [
  { href: "/products", title: "Products" },
  { href: "/edit", title: "Edit Product" },
  { href: "/create", title: "Create Product" },
  // Add more links as needed
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="font-bold mb-4">Categories</h2>
      <ul>
        {sidebarLinks.map((link, index) => (
          <li key={index} className="mb-2">
            <Link href={link.href} legacyBehavior>
              <a
                className={`${
                  router.pathname === link.href ? "text-red-500" : "text-black"
                } font-bold`}
              >
                {link.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
