import request from "@/core/net";
import { UserPageItemVo, Page, UserDto } from "@/model";

/**
 * 用户分页信息
 */
export function page(page: Page, condition?: UserDto) {
  return request.get<Page<UserPageItemVo>>({
    url: "/api/pms/v1/user/page",
    params: {
      ...page,
      ...condition
    }
  });
}
