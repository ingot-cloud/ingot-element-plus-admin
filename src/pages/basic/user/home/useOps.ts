import type { PageChangeParams, SysUser } from "@/models";
import { UserPageAPI, UpdateUserAPI, RemoveUserAPI } from "@/api/basic/user";
import router from "@/router";

export const useOps = () => {
  const paging = usePaging(transformPageAPI(UserPageAPI));
  const confirmStatus = useConfirmStatus(
    transformUpdateAPI(UpdateUserAPI),
    paging.exec
  );
  const confirmDelete = useConfirmDelete(
    transformDeleteAPI(RemoveUserAPI),
    paging.exec
  );

  /**
   * 重置过滤条件
   */
  const resetFilter = () => {
    paging.condition.phone = undefined;
    paging.condition.email = undefined;
    paging.condition.nickname = undefined;
    fetchUserData();
  };

  /**
   * 获取用户数据
   */
  const fetchUserData = (params?: PageChangeParams): void => {
    paging.exec(params);
  };

  /**
   * 编辑用户
   */
  const handleDetailUser = (params: SysUser): void => {
    router.push({
      path: `/basic/user/details/${params.id}`,
    });
  };

  /**
   * 删除用户
   */
  const handleDeleteUser = (params: SysUser): void => {
    confirmDelete.exec(params.id!, `是否删除用户(${params.username})`);
  };

  /**
   * 禁用、启用
   */
  const handleDisableUser = (params: SysUser): void => {
    confirmStatus.exec(params.id!, params.status!, `用户(${params.username})`);
  };

  return {
    loading: paging.loading,
    condition: paging.condition,
    pageInfo: paging.pageInfo,
    resetFilter,
    fetchUserData,
    handleDetailUser,
    handleDeleteUser,
    handleDisableUser,
  };
};
