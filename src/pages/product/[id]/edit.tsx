import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/services/api";
import { notifyError, notifySuccess } from "@/util/utils";
import { FaArrowLeft } from "react-icons/fa6";
import WebPageTitle from "@/components/webpage-title";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  reviews: number;
  rating: number;
  imageUrl: string;
}

export default function EditProduct() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [errors, setErrors] = useState<Partial<Product>>({});

  useEffect(() => {
    const storedProduct = localStorage.getItem("editProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev!,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));

    // Clear specific error when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateInputs = () => {
    const newErrors: Partial<Product> = {};
    if (!product?.name) newErrors.name = "Product name is required";
    if (!product?.brand) newErrors.brand = "Brand is required";
    if (!product?.category) newErrors.category = "Category is required";
    if (!product?.subCategory)
      newErrors.subCategory = "Sub category is required";
    if (product?.price !== undefined && product.price <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    if (product?.reviews !== undefined && product.reviews <= 0) {
      newErrors.reviews = "Reviews must be a positive number";
    }
    if (product?.rating !== undefined && product.rating <= 0) {
      newErrors.rating = "Rating must be a  number";
    }
    if (
      product?.stock !== undefined &&
      (product.stock < 0 || !Number.isInteger(product.stock))
    ) {
      newErrors.stock = "Stock must be a non-negative integer";
    }

    if (!product?.description)
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (validateInputs() && product) {
        await updateProduct(product);
      }
    },
    onError: (error) => {
      notifyError(error.message);
    },
    onSuccess: () => {
      notifySuccess("Product Edited Successfully");
      router.push("/product");
    },
  });

  const handleUpdateProduct = () => {
    mutation.mutate();
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <WebPageTitle title="Edit Product | DOT FE TEST" />

      <div
        className="flex cursor-pointer"
        onClick={() => router.push("/product")}
      >
        <FaArrowLeft className="mr-2 mt-1" />
        Back to products
      </div>
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
            {errors.name && <p className="text-red-500">{errors.name}</p>}
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
            {errors.brand && <p className="text-red-500">{errors.brand}</p>}
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
            {errors.category && (
              <p className="text-red-500">{errors.category}</p>
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
            />
            {errors.subCategory && (
              <p className="text-red-500">{errors.subCategory}</p>
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
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Reviews</label>
            <input
              type="number"
              name="reviews"
              value={product.reviews}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
            {errors.reviews && <p className="text-red-500">{errors.reviews}</p>}
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
          <label className="block text-sm font-bold mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
          {errors.rating && <p className="text-red-500">{errors.rating}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full h-32"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleUpdateProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Update Product
          </button>
        </div>
      </div>
    </>
  );
}
