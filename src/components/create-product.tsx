import React, { useState, ChangeEvent } from 'react';

interface Specification {
  key: string;
  value: string;
}

interface Product {
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  specifications: Specification[];
}

export default function CreateProduct() {
  const [product, setProduct] = useState<Product>({
    name: '',
    brand: '',
    category: '',
    subCategory: '',
    price: 0,
    stock: 0,
    description: '',
    imageUrl: '',
    specifications: [{ key: '', value: '' }],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSpecificationChange = (index: number, field: keyof Specification, value: string) => {
    const newSpecifications = [...product.specifications];
    newSpecifications[index][field] = value;
    setProduct((prevProduct) => ({ ...prevProduct, specifications: newSpecifications }));
  };

  const addSpecification = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      specifications: [...prevProduct.specifications, { key: '', value: '' }],
    }));
  };

  const handleCreateProduct = () => {
    console.log('Product created:', product);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full lg:w-2/3 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
            placeholder="Product Name"
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
            placeholder="Brand"
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
            placeholder="Category"
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
            placeholder="Sub Category"
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
            placeholder="0"
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
            placeholder="0"
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
          placeholder="Description"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full"
          placeholder="Image URL"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Specifications</h3>
        {product.specifications.map((spec, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              value={spec.key}
              onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
              placeholder="Key"
              className="border rounded-lg p-2 w-1/2"
            />
            <input
              type="text"
              value={spec.value}
              onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
              placeholder="Value"
              className="border rounded-lg p-2 w-1/2"
            />
          </div>
        ))}
        <button
          onClick={addSpecification}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Add
        </button>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button className="bg-gray-300 px-4 py-2 rounded-full">Cancel</button>
        <button
          onClick={handleCreateProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Create Product
        </button>
      </div>
    </div>
  );
}
