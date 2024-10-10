import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/services/api';

const categories = [
  { name: 'Product', subcategories: ['Smartphones', 'Laptops', 'Accessories'] },
  { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] },
  { name: 'Category', subcategories: ['Furniture', 'Decor', 'Kitchen'] },
];

interface SidebarProps {
  setSelectedComponent: (component: string) => void;
}

export default function Sidebar({ setSelectedComponent }: SidebarProps) {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"], 
    queryFn: getAllCategories,
  });


  const handleCategoryClick = (categoryName: string) => {
    setSelectedComponent(categoryName);
    router.push(`/${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <aside className="w-64 p-6 bg-gray-100 h-full lg:h-auto lg:relative">
      <ul>
        {categories.map((category) => (
          <li key={category.name} className="mb-6">
            <h3
              className="font-bold text-red-500 cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
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
