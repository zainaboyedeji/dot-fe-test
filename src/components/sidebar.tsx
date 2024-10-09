// Sidebar.tsx
import React from 'react';

const categories = [
  { name: 'Products', subcategories: ['Smartphones', 'Laptops', 'Accessories'] },
  { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] },
  { name: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Kitchen'] },
];

interface SidebarProps {
  setSelectedComponent: (component: string) => void;
}

export default function Sidebar({ setSelectedComponent }: SidebarProps) {
  return (
    <aside className="w-64 p-6 bg-gray-100">
      <ul>
        {categories.map((category) => (
          <li key={category.name} className="mb-6">
            <h3
              className="font-bold text-red-500 cursor-pointer"
              onClick={() => setSelectedComponent(category.name)}
            >
              {category.name}
            </h3>
            <ul>
              {category.subcategories.map((subcategory) => (
                <li key={subcategory} className="pl-4 text-sm text-gray-600">
                  {subcategory}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
