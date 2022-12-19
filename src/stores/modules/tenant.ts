import type { SimpleTenantVO, Page, SysTenant, R } from "@/models";
import {
  TenantListAPI,
  TenantPageAPI,
  TenantCreateAPI,
  TenantUpdateAPI,
  TenantRemoveAPI,
} from "@/api/basic/tenant";

export const useTenantStore = defineStore("tenant", () => {
  const tenantList = ref<Array<SimpleTenantVO>>([]);
  const needUpdate = ref(false);

  const fetchTenantList = () => {
    return new Promise<Array<SimpleTenantVO>>((resolve, reject) => {
      if (!needUpdate.value && tenantList.value.length !== 0) {
        resolve(tenantList.value);
        return;
      }

      TenantListAPI()
        .then((response) => {
          tenantList.value = response.data;
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
    tenantList,
    fetchTenantList,
    fetchTenantPage,
    createTenant,
    updateTenant,
    removeTenant,
  };
});
