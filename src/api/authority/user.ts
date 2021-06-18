import request from "@/net";
import { UserPageItemVo, Page, UserDto, IngotResponse } from "@/model";

/**
 * 用户分页信息
 */
export function userPage(
  page: Page,
  condition?: UserDto
): Promise<IngotResponse<Page<UserPageItemVo>>> {
  return request.get<Page<UserPageItemVo>>({
    url: "/api/pms/v1/user/page",
    params: {
      ...page,
      ...condition,
    },
  });
}
