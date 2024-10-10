import api from "@/util/api";
import { apiEndpoints } from "@/util/endpoints";

export async function getAllCategories() {
  try {
    const response = await api.get(`${apiEndpoints.products.GET_ALL_CATEGORIES}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts({ queryKey }: { queryKey: [string, number] }) {
  try {
    const [_, page] = queryKey;
    const response = await api.get(`${apiEndpoints.products.GET_ALL_PRODUCTS}`, {
      params: { page },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(id: any) {
  try {
    const response = await api.get(
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
    const response = await api.put(`${apiEndpoints.products.UPDATE_PRODUCT}/${payload.id}`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteRole(id: number) {
  try {
    const response = await api.delete(`${apiEndpoints.products.DELETE_PRODUCT}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
