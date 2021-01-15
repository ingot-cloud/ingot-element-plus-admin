import axios from "axios";
import { NetConfig } from "@/config";
import { onRequestFulfilled, onRequestRejected } from "./interceptor/request";
import {
  onResponseFulfilled,
  onResponseRejected
} from "./interceptor/response";

const instance = axios.create({
  timeout: NetConfig.RequestTimeout
});

instance.interceptors.request.use(onRequestFulfilled, onRequestRejected);
instance.interceptors.response.use(onResponseFulfilled, onResponseRejected);

export default instance;
