import Axios from "axios";
import { CustomHttpError } from "./errors/CustomHttpError";
import env from "@/config/env";

const { baseUrl } = env;

const api = Axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
  },
});
api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (!err.response) {
      return Promise.reject(
        new CustomHttpError(
          "Error occured while sending the request, please check your internet settings",
          {
            statusCode: 0,
            responseText:
              "Error occured while sending the request, please check your internet settings",
          }
        )
      );
    }


    if (err.response.data?.error) {
      return Promise.reject(
        new CustomHttpError(err.response.data.error, {
          statusCode: err.response.status,
          responseText: err.response.data.error,
          payload: err.response.data.payload,
          responseCode: err.response.data.responseCode,
        })
      );
    }

    return Promise.reject(
      new CustomHttpError("Error occured while sending the request", {
        statusCode: err.response.status,
        responseText: "Error occured while sending the request",
      })
    );
  }
);

export default api;
