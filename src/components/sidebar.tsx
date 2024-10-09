import React from 'react';

const categories = [
  { name: 'Electronics', subcategories: ['Smartphones', 'Laptops', 'Accessories'] },
  { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] },
  { name: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Kitchen'] },
];

export default function Sidebar() {
  return (
    <aside className="w-64 p-6 bg-gray-100">
      <ul>
        {categories.map((category) => (
          <li key={category.name} className="mb-6">
            <h3 className="font-bold text-red-500">{category.name}</h3>
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
