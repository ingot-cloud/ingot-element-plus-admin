import { AxiosResponse, AxiosError } from "axios";
import { IngotResponse } from "@/model";

export const onResponseFulfilled = (response: AxiosResponse<IngotResponse>) => {
  console.log("onResponseFulfilled", response);
  return Promise.reject(response);
};

export const onResponseRejected = (error: AxiosError<IngotResponse>) => {
  console.log("onResponseRejected", error.message, error.response?.data.code);
  return Promise.reject(error);
};
