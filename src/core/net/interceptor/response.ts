import { AxiosResponse } from "axios";

export const onResponseFulfilled = (response: AxiosResponse) => {
  return response;
};

export const onResponseRejected = (error: unknown) => {
  return Promise.reject(error);
};
