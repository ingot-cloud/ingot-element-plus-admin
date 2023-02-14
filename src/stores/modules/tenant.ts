import type { Option, Page, SysTenant, R } from "@/models";
import {
  TenantOptionsAPI,
  TenantPageAPI,
  TenantCreateAPI,
  TenantUpdateAPI,
  TenantRemoveAPI,
} from "@/api/basic/tenant";
import { useAppStore } from "@/stores/modules/app";

export const useTenantStore = defineStore("tenant", () => {
  const appStore = useAppStore();
  const tenantOptions = ref<Array<Option>>([]);
  const needUpdate = ref(false);

  const globalTenant = ref<string>(appStore.getTenant);
  const getGlobalTenant = computed(() => globalTenant.value);

  /**
   * 修改全局tenant
   */
  const changeGlobalTenant = (tenant?: string) => {
    if (!tenant) {
      tenant = appStore.getTenant;
    }
    globalTenant.value = tenant;
  };

  /**
   * 重置为默认值
   */
  const resetGlobalTenant = () => {
    globalTenant.value = appStore.getTenant;
  };

  /**
   * 修改更新标识
   */
  const changeUpdateFlag = (flag: boolean) => {
    needUpdate.value = flag;
  };

  const fetchOptions = () => {
    return new Promise<Array<Option>>((resolve, reject) => {
      if (!needUpdate.value && tenantOptions.value.length !== 0) {
        resolve(tenantOptions.value);
        return;
      }

      TenantOptionsAPI()
        .then((response) => {
          tenantOptions.value = response.data;
          needUpdate.value = false;
          resolve(response.data);
        })
        .catch(() => {
          reject();
        });
    });
  };

  const fetchTenantPage = (page: Page, condition?: SysTenant) => {
    return new Promise<R<Page<SysTenant>>>((resolve, reject) => {
      TenantPageAPI(page, condition)
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const createTenant = (params: SysTenant) => {
    return new Promise<void>((resolve, reject) => {
      TenantCreateAPI(params)
        .then(() => {
          needUpdate.value = true;
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  const updateTenant = (params: SysTenant) => {
    return new Promise<void>((resolve, reject) => {
      TenantUpdateAPI(params)
        .then(() => {
          needUpdate.value = true;
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  const removeTenant = (id: string) => {
    return new Promise<void>((resolve, reject) => {
      TenantRemoveAPI(id)
        .then(() => {
          needUpdate.value = true;
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  return {
    tenantOptions,
    getGlobalTenant,
    needUpdate,
    changeGlobalTenant,
    resetGlobalTenant,
    changeUpdateFlag,
    fetchOptions,
    fetchTenantPage,
    createTenant,
    updateTenant,
    removeTenant,
  };
});
