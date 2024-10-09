import api from "@/util/api";
import { apiEndpoints } from "@/util/endpoints";

export async function getAllProducts({queryKey}) {
    try {
        const [_, page] = queryKey;
        const response = await api.get(
        `${apiEndpoints.products.GET_ALL_PRODUCTS}`,
        { params:{page} }
      );
      console.log(page,"limit")
      return response;
    } catch (error) {
      throw error;
    }
  }