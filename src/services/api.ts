import api from "@/util/api";
import { apiEndpoints } from "@/util/endpoints";
import { Product } from "@/models/product";

type CreateProductPayload = Omit<Product, "id">;

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
  queryKey: [string, number, number, number, string, string];
}) {
  try {
    const [_, page, minPrice, maxPrice, order, search] = queryKey;
    const response = await api.get(
      `${apiEndpoints.products.GET_ALL_PRODUCTS}`,
      {
        params: { page, minPrice, maxPrice, order, search },
      }
    );
    return response as unknown as {
      products: Product[];
      totalPages: number;
      currentPage: number;
      totalProducts: number;
    };
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

export async function createProduct(payload: CreateProductPayload) {
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

export async function updateProduct(payload: Product) {
  try {
    const response = await api.patch(
      `${apiEndpoints.products.UPDATE_PRODUCT}/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
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
