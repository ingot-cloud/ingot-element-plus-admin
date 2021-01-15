import axios from "axios";
import { NetConfig } from "@/config";

const instance = axios.create({
  timeout: NetConfig.RequestTimeout
});

export default instance;
