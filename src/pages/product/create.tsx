import { createProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/util/utils";

interface Product {
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
}

export default function CreateProduct() {
  const router = useRouter();

  const [product, setProduct] = useState<Product>({
    name: "",
    brand: "",
    category: "",
    subCategory: "",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
  });

  const queryClient = useQueryClient();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price" || name === "stock") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: parseFloat(value),
      }));
    } else {
      setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    }
  };

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifySuccess("Product Created Successfully");
      router.push("/");
      setProduct({
        name: "",
        brand: "",
        category: "",
        subCategory: "",
        price: 0,
        stock: 0,
        description: "",
        imageUrl: "",
      });
    },
    onError: (error: unknown) => {
      notifyError(error.message);
    },
  });

  const handleCreateProduct = () => {
    const isValid =
      product.name &&
      product.brand &&
      product.category &&
      product.subCategory &&
      product.price > 0 &&
      Number.isInteger(product.stock) &&
      product.stock >= 0 &&
      product.description;

    if (!isValid) {
      console.error("Product data is invalid:", product);
      return;
    }

    mutation.mutate(product);
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
            min="0"
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
            min="0"
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
