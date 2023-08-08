import Http from "@/net";
import type { R, OSSResult } from "@/models";
import type { UploadRequestParams } from "@/components/upload";

/**
 * 上传文件
 */
export function UploadAPI(params: UploadRequestParams): Promise<R<OSSResult>> {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("fileName", params.fileName);
  formData.append("bucketName", "ingot");
  return Http.post<OSSResult>("/api/pms/v1/oss", formData);
}
