import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { IngotResponse } from "@/core/model";
import StatusCode from "@/core/net/statusCode";

/**
 * 未知响应实体
 */
const UnknownResponse: AxiosResponse<IngotResponse> = {
  data: {
    code: StatusCode.Unknown,
    message: "网络异常，请稍后重试",
    data: {},
    headers: {}
  },
  status: Number(StatusCode.Unknown),
  statusText: "网络异常，请稍后重试",
  headers: {},
  config: {}
};

/**
 * 业务失败公共处理器
 * @param config
 * @param response
 */
const bizResponseFailureHandler = (
  config: AxiosRequestConfig,
  response = UnknownResponse
): Promise<AxiosResponse<IngotResponse>> => {
  const data = response.data;
  const notTriggerBizFailureHandler = config.notTriggerBizFailureHandler;
  if (notTriggerBizFailureHandler) {
    return Promise.reject(response);
  }
  ElMessage({
    showClose: true,
    message: data.message,
    type: "warning"
  });
  // todo 业务逻辑
  return Promise.reject(response);
};

/**
 * 响应完成拦截器
 * @param response
 */
export const onResponseFulfilled = (response: AxiosResponse<IngotResponse>) => {
  const data = response.data;
  if (data.code === StatusCode.OK) {
    return response;
  }
  return bizResponseFailureHandler(response.config, response);
};

/**
 * 响应拒绝拦截器
 * @param error
 */
export const onResponseRejected = (error: AxiosError<IngotResponse>) => {
  return bizResponseFailureHandler(error.config, error.response);
};
