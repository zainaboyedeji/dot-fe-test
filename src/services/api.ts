import api from "@/util/api";
import { apiEndpoints } from "@/util/endpoints";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}
export async function getAllCategories() {
  try {
    const response = await api.get(
      `${apiEndpoints.products.GET_ALL_CATEGORIES}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts({
  queryKey,
}: {
  queryKey: [string, number];
}) {
  try {
    const [_, page] = queryKey;
    const response = await api.get(
      `${apiEndpoints.products.GET_ALL_PRODUCTS}`,
      {
        params: { page },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const response: Product = await api.get(
      `${apiEndpoints.products.GET_PRODUCT}/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createProduct(payload: any) {
  try {
    const response = await api.post(
      `${apiEndpoints.products.CREATE_PRODUCT}`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateProduct(payload: any) {
  try {
    const response = await api.patch(
      `${apiEndpoints.products.UPDATE_PRODUCT}/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Update Product Error:', error.response?.data || error.message);
    throw error; 
  }
}


export async function deleteProduct(id: number) {
  try {
    const response = await api.delete(
      `${apiEndpoints.products.DELETE_PRODUCT}/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
