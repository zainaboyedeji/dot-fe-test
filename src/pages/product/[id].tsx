import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getProduct, deleteProduct } from "@/services/api";

interface Product {
  id: number; 
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => {
      if (!id) return Promise.reject("No ID");
      return getProduct(id as string);
    },
    enabled: !!id, 
  });

  const mutation = useMutation({
    mutationFn: () => {
      if (data) {
        return deleteProduct(data.id); 
      }
      return Promise.reject("No product data");
    },
    onSuccess: () => {
      console.log("Product deleted successfully!");
      router.push("/product"); 
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      alert('Failed to delete the product: ' + (error.response?.data?.message || error.message));
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product.</p>;
  if (!data) return <p>No product found.</p>;

  const product: Product = data;

  return (
    <div>
      <a href="/products" className="text-blue-500">
        ← Back to Products
      </a>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex flex-col lg:flex-row">
          <div className="bg-gray-200 w-full lg:w-1/2 h-64 rounded-lg">
            {/* <Image
              src={product.imageUrl} 
              alt="Product Image"
              width={100}
              height={100}
              priority
            /> */}
          </div>
          <div className="flex-1 lg:ml-8 mt-4 lg:mt-0">
            <p className="text-sm text-gray-500">{product.category}</p>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-xl text-green-600 font-bold">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-500">In stock: {product.stock}</p>
            <p className="text-yellow-500 mb-2">
              ★ {product.rating} ({product.reviews} reviews)
            </p>
            <div className="text-gray-600 mb-4">
              <p>Material: Cotton</p>
              <p>Fit: Regular</p>
              <p>Sizes: S, M, L, XL</p>
              <p>Care: Machine Washable</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-black text-white py-2 px-4 rounded-lg">
                Add to Cart
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                Edit Product
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={() => mutation.mutate()}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
