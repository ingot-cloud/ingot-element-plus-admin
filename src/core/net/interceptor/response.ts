import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { IngotResponse } from "@/core/model";
import StatusCode from "@/core/net/statusCode";
import { handlLogout } from "@/core/security/auth";
import { store } from "@/store";
import request from "@/core/net";

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
  // 如果响应结构非{ code, message, data }结构，而是字符串，那么为网络异常，response复制unknown
  if (typeof response.data === "string") {
    console.debug("response.data结构异常", response);
    response = UnknownResponse;
  }
  const data = response.data;
  const notTriggerBizFailureHandler = config.notTriggerBizFailureHandler;
  if (notTriggerBizFailureHandler) {
    return Promise.reject(response);
  }

  const code = data.code;
  switch (code) {
    case StatusCode.TokenInvalid:
      if (config.refreshTokenAndRetry) {
        return Promise.reject(response);
      }
      return new Promise((resolve, reject) => {
        store
          .dispatch("refreshToken")
          .then(userToken => {
            // 刷新成功重试刚才的请求，替换token重新请求
            // 避免再次请求失败，刷新token后的重试不走失效逻辑
            const newConfig = Object.assign({}, config);
            newConfig.refreshTokenAndRetry = true;
            newConfig.headers[
              "Authorization"
            ] = `Bearer ${userToken.accessToken}`;

            return request.rawRequest(newConfig);
          })
          .then(temp => {
            resolve(temp);
          })
          .catch(() => {
            // 刷新失败退出登录
            handlLogout();
            ElMessage({
              showClose: true,
              message: data.message,
              type: "warning"
            });
            reject(response);
          });
      });
    case StatusCode.TokenSignBack:
      ElMessageBox.confirm(
        "您已被签退，可以取消继续留在该页面，或者重新登录",
        "提示",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        handlLogout();
      });
      break;
    default:
      ElMessage({
        showClose: true,
        message: data.message,
        type: "warning"
      });
      break;
  }

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
