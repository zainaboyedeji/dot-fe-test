import React, { useState, ChangeEvent } from 'react';

interface Product {
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  material: string;
  fit: string;
  sizes: string[];
  care: string;
}

export default function EditProduct() {
  const [product, setProduct] = useState<Product>({
    name: "Men's Casual Shirt",
    brand: "FashionCo",
    category: "Clothing",
    subCategory: "Men",
    price: 39.99,
    stock: 75,
    description: 'Comfortable and stylish casual shirt for men.',
    material: 'Cotton',
    fit: 'Regular',
    sizes: ['S', 'M', 'L', 'XL'],
    care: 'Machine Washable',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSizeChange = (index: number, newSize: string) => {
    const newSizes = [...product.sizes];
    newSizes[index] = newSize;
    setProduct((prevProduct) => ({ ...prevProduct, sizes: newSizes }));
  };

  const handleUpdateProduct = () => {
    // Update product logic here
    console.log('Product updated:', product);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full lg:w-2/3 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Sub Category</label>
          <input
            type="text"
            name="subCategory"
            value={product.subCategory}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-sm font-bold mb-2">Material</label>
            <input
              type="text"
              name="material"
              value={product.material}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Fit</label>
            <input
              type="text"
              name="fit"
              value={product.fit}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Care</label>
            <input
              type="text"
              name="care"
              value={product.care}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleUpdateProduct}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Update Product
      </button>
    </div>
  );
}
