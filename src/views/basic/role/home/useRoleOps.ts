import { ref, toRaw, reactive } from "vue";
import type { RolePageItemVO, SysRole, Page, PageChangeParams } from "@/models";
import { CommonStatus, getCommonStatusActionDesc } from "@/models/enums";
import { Confirm, Message } from "@/utils/message";
import router from "@/router";
import { useRoleStore } from "@/stores/modules/role";

export const useRoleOps = () => {
  const roleStore = useRoleStore();
  const loading = ref(false);
  const condition = reactive<SysRole>({});
  const pageInfo = reactive<Page<SysRole>>({
    current: 1,
    size: 20,
    total: 0,
    records: [],
  });

  const fetchData = (params?: PageChangeParams) => {
    if (params) {
      pageInfo[params.type] = params.value;
    }
    const pageParams = toRaw(pageInfo);
    pageParams.total = undefined;
    pageParams.records = undefined;
    roleStore.fetchRolePage(pageParams, condition).then((response) => {
      pageInfo.records = response.data.records;
      pageInfo.total = Number(response.data.total);
    });
  };

  const handleDelete = (
    params: RolePageItemVO,
    callback?: () => void
  ): void => {
    Confirm.warning(`是否删除角色(${params.name})`).then(() => {
      loading.value = true;
      roleStore
        .removeRole(params.id as string)
        .then(() => {
          loading.value = false;
          Message.success("操作成功");
          if (callback) {
            callback();
          }
        })
        .catch(() => {
          loading.value = false;
        });
    });
  };

  const handleDisable = (
    params: RolePageItemVO,
    callback?: () => void
  ): void => {
    const status =
      params.status === CommonStatus.Enable
        ? CommonStatus.Lock
        : CommonStatus.Enable;
    const message = `是否${getCommonStatusActionDesc(status)}角色(${
      params.name
    })`;
    Confirm.warning(message).then(() => {
      loading.value = true;
      roleStore
        .updateRole({ id: params.id, status })
        .then(() => {
          loading.value = false;
          Message.success("操作成功");
          if (callback) {
            callback();
          }
        })
        .catch(() => {
          loading.value = false;
        });
    });
  };

  const handleBindCommand = (params: {
    type: string;
    data: RolePageItemVO;
  }): void => {
    const type = params.type;
    const data = params.data;
    const roleId = data.id;

    router.push({
      path: `/authority/role/${type}/${roleId}`,
      query: {
        name: data.name,
      },
    });
  };

  return {
    loading,
    condition,
    pageInfo,
    fetchData,
    handleDelete,
    handleDisable,
    handleBindCommand,
  };
};
