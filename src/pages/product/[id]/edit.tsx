import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/services/api";
import { notifyError, notifySuccess } from "@/util/utils";
import { FaArrowLeft } from "react-icons/fa6";
import WebPageTitle from "@/components/webpage-title";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/button";

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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub Category is required"),
  price: Yup.number().min(0, "Price must be a positive number").required(),
  stock: Yup.number()
    .integer("Stock must be an integer")
    .min(0, "Stock must be a non-negative integer")
    .required(),
  description: Yup.string().required("Description is required"),
  reviews: Yup.number()
    .min(0, "Reviews must be a non-negative number")
    .required(),
  rating: Yup.number()
    .min(0, "Rating must be a non-negative number")
    .required(),
  imageUrl: Yup.string()
    .url("Image URL must be a valid URL")
    .required("Image URL is required"),
});

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const mutation = useMutation({
    mutationFn: updateProduct,
    onError: (error) => {
      notifyError(error.message);
    },
    onSuccess: () => {
      notifySuccess("Product Edited Successfully");
      router.push("/product");
    },
  });

  const handleUpdateProduct = (values: Product) => {
    mutation.mutate(values);
  };

  const [product, setProduct] = React.useState<Product | null>(null);

  useEffect(() => {
    const storedProduct = localStorage.getItem("editProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

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
        <Formik
          initialValues={product}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProduct}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">
                  Product Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="border rounded-lg p-2 w-full"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Brand</label>
                <Field
                  type="text"
                  name="brand"
                  className="border rounded-lg p-2 w-full"
                />
                <ErrorMessage
                  name="brand"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Category</label>
                <Field
                  type="text"
                  name="category"
                  className="border rounded-lg p-2 w-full"
                />
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  Sub Category
                </label>
                <Field
                  type="text"
                  name="subCategory"
                  className="border rounded-lg p-2 w-full"
                />
                <ErrorMessage
                  name="subCategory"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Price</label>
                <Field
                  type="number"
                  name="price"
                  className="border rounded-lg p-2 w-full"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Reviews</label>
                <Field
                  type="number"
                  name="reviews"
                  className="border rounded-lg p-2 w-full"
                />
                <ErrorMessage
                  name="reviews"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Stock</label>
                <Field
                  type="number"
                  name="stock"
                  className="border rounded-lg p-2 w-full"
                />
                <ErrorMessage
                  name="stock"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Rating</label>
                <Field
                  type="number"
                  name="rating"
                  className="border rounded-lg p-2 w-full"
                />
                <ErrorMessage
                  name="rating"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="border rounded-lg p-2 w-full h-32"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  Image URL
                </label>
                <Field
                  type="text"
                  name="imageUrl"
                  className="border rounded-lg p-2 w-full"
                />
                <ErrorMessage
                  name="imageUrl"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button disabled={isSubmitting}> Update Product</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
