import { Confirm, Message } from "@/utils/message";
import { CommonStatus, getCommonStatusActionDesc } from "@/models/enums";
import type { SysTenant, Page, PageChangeParams } from "@/models";
import { useTenantStore } from "@/stores/modules/tenant";

export const useTenantOps = () => {
  const tenantStore = useTenantStore();
  const loading = ref(false);
  const condition = reactive<SysTenant>({});
  const pageInfo = reactive<Page<SysTenant>>({
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
    tenantStore.fetchTenantPage(pageParams, condition).then((response) => {
      pageInfo.records = response.data.records;
      pageInfo.total = Number(response.data.total);
    });
  };

  const handleDelete = (params: SysTenant, callback?: () => void): void => {
    Confirm.warning(`是否删除租户(${params.name})`).then(() => {
      loading.value = true;
      tenantStore
        .removeTenant(params.id as string)
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

  const handleDisable = (params: SysTenant, callback?: () => void): void => {
    const status =
      params.status === CommonStatus.Enable
        ? CommonStatus.Lock
        : CommonStatus.Enable;
    const message = `是否${getCommonStatusActionDesc(status)}租户(${
      params.name
    })`;
    Confirm.warning(message).then(() => {
      loading.value = true;
      tenantStore
        .updateTenant({ id: params.id, status })
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

  return {
    loading,
    condition,
    pageInfo,
    fetchData,
    handleDelete,
    handleDisable,
  };
};
