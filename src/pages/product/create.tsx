import { createProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/util/utils";
import WebPageTitle from "@/components/webpage-title";

interface Product {
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: number;
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
    rating: 0,
    reviews: 0,
  });

  const [errors, setErrors] = useState<Partial<Product>>({});
  const queryClient = useQueryClient();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price" || name === "stock" || name === "rating") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: parseFloat(value),
      }));
    } else {
      setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateProduct = () => {
    const newErrors: Partial<Product> = {};

    if (!product.name) newErrors.name = "Product name is required";
    if (!product.brand) newErrors.brand = "Brand is required";
    if (!product.category) newErrors.category = "Category is required";
    if (!product.subCategory)
      newErrors.subCategory = "Sub Category is required";
    if (product.price <= 0) newErrors.price = "Price must be greater than 0";
    if (product.rating <= 0) newErrors.rating = "Rating must be greater than 0";
    if (product.reviews <= 0)
      newErrors.reviews = "Reviews must be greater than 0";
    if (!Number.isInteger(product.stock) || product.stock < 0)
      newErrors.stock = "Stock must be a non-negative integer";
    if (!product.description) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        reviews: 0,
        rating: 0,
      });
    },
    onError: (error: any) => {
      notifyError(error.message);
    },
  });

  const handleCreateProduct = () => {
    if (validateProduct()) {
      mutation.mutate(product);
    }
  };

  return (
    <>
      <WebPageTitle title="Create Product | DOT FE TEST" />
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
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
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
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand}</p>
            )}
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
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
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
            {errors.subCategory && (
              <p className="text-red-500 text-sm">{errors.subCategory}</p>
            )}
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
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
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
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
            placeholder="0"
            min="0"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Reviews</label>
          <input
            type="number"
            name="reviews"
            value={product.reviews}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
            placeholder="0"
            min="0"
          />
          {errors.reviews && (
            <p className="text-red-500 text-sm">{errors.reviews}</p>
          )}
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
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
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
          <button
            className="bg-gray-300 px-4 py-2 rounded-full"
            onClick={() => router.push("/product")}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Create Product
          </button>
        </div>
      </div>
    </>
  );
}
