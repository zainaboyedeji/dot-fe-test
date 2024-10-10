import React, { useState, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { updateProduct } from "@/services/api";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  reviews: string;
  rating: string;
  imageUrl: string;
}

export default function EditProduct() {
  const router = useRouter();
  const {
    id,
    name,
    brand,
    category,
    subCategory,
    price,
    stock,
    description,
    reviews,
    rating,
    imageUrl,
  } = router.query;

  const [product, setProduct] = useState<Product>({
    id: Number(id) || 0,
    name: name as string || "",
    brand: brand as string || "",
    category: category as string || "",
    subCategory: subCategory as string || "",
    price: Number(price) || 0,
    stock: Number(stock) || 0,
    description: description as string || "",
    reviews: reviews as string || "",
    rating: rating as string || "",
    imageUrl: imageUrl as string || "",
  });

  const [errors, setErrors] = useState<{ price?: string; stock?: string }>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const validateInputs = () => {
    const newErrors: { price?: string; stock?: string } = {};

    if (product.price <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    if (product.stock < 0 || !Number.isInteger(product.stock)) {
      newErrors.stock = "Stock must be a non-negative integer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (validateInputs()) {
        await updateProduct(product);
      }
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
    onSuccess: () => {
      router.push("/product");
    },
  });

  const handleUpdateProduct = () => {
    mutation.mutate();
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
          {errors.price && <p className="text-red-500">{errors.price}</p>}
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
          {errors.stock && <p className="text-red-500">{errors.stock}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full h-24"
        ></textarea>
      </div>
      <button
        onClick={handleUpdateProduct}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
      >
        Update Product
      </button>
    </div>
  );
}
