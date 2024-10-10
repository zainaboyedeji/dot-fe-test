import { createProduct } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/util/utils";
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
  price: Yup.number()
    .min(0, "Price must be greater than or equal to 0")
    .required(),
  stock: Yup.number()
    .integer()
    .min(0, "Stock must be a non-negative integer")
    .required(),
  description: Yup.string().required("Description is required"),
  imageUrl: Yup.string()
    .url("Image URL must be a valid URL")
    .required("Image URL is required"),
  rating: Yup.number()
    .min(0, "Rating must be greater than or equal to 0")
    .required(),
  reviews: Yup.number()
    .min(0, "Reviews must be greater than or equal to 0")
    .required(),
});

export default function CreateProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifySuccess("Product Created Successfully");
      router.push("/");
    },
    onError: (error: any) => {
      notifyError(error.message);
    },
  });

  const handleCreateProduct = (values: Product) => {
    mutation.mutate(values);
  };

  return (
    <>
      <WebPageTitle title="Create Product | DOT FE TEST" />
      <div className="p-4 bg-white rounded-lg shadow-md w-full lg:w-2/3 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
        <Formik
          initialValues={{
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
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateProduct}
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
                  placeholder="Product Name"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Brand</label>
                <Field
                  type="text"
                  name="brand"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Brand"
                />
                <ErrorMessage
                  name="brand"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Category</label>
                <Field
                  type="text"
                  name="category"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Category"
                />
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-red-500 text-sm"
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
                  placeholder="Sub Category"
                />
                <ErrorMessage
                  name="subCategory"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Price</label>
                <Field
                  type="number"
                  name="price"
                  className="border rounded-lg p-2 w-full"
                  placeholder="0"
                  min="0"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Stock</label>
                <Field
                  type="number"
                  name="stock"
                  className="border rounded-lg p-2 w-full"
                  placeholder="0"
                  min="0"
                />
                <ErrorMessage
                  name="stock"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Rating</label>
                <Field
                  type="number"
                  name="rating"
                  className="border rounded-lg p-2 w-full"
                  placeholder="0"
                  min="0"
                />
                <ErrorMessage
                  name="rating"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Reviews</label>
                <Field
                  type="number"
                  name="reviews"
                  className="border rounded-lg p-2 w-full"
                  placeholder="0"
                  min="0"
                />
                <ErrorMessage
                  name="reviews"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="border rounded-lg p-2 w-full"
                  placeholder="Description"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm"
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
                  placeholder="Image URL"
                />
                <ErrorMessage
                  name="imageUrl"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <Button onClick={() => router.push("/product")}> Cancel</Button>
                <Button disabled={isSubmitting}> Create Product</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
