import React, { useState, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/services/api";
import { useRouter } from "next/router";

interface Product {
  id: number;
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
  const router = useRouter();
  const { id } = router.query;
  const parsedId = typeof id === "string" ? Number(id) : undefined;
  const [product, setProduct] = useState<Product>({
    id: parsedId ?? 0,
    name: "Men's Casual Shirt",
    brand: "FashionCo",
    category: "Clothing",
    subCategory: "Men",
    price: 39.99,
    stock: 75,
    description: "Comfortable and stylish casual shirt for men.",
    material: "Cotton",
    fit: "Regular",
    sizes: ["S", "M", "L", "XL"],
    care: "Machine Washable",
  });

  const [errors, setErrors] = useState<{ price?: string; stock?: string }>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const newValue =
      name === "price" || name === "stock" ? Number(value) : value;

    setProduct((prevProduct) => ({ ...prevProduct, [name]: newValue }));
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
      console.log("Product updated successfully!");
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
          className="border rounded-lg p-2 w-full"
        />
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
