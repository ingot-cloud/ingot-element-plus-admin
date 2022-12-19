import type { SysRole, Page, R } from "@/models";
import {
  RolePageAPI,
  CreateRoleAPI,
  UpdateRoleAPI,
  RemoveRoleAPI,
} from "@/api/basic/role";

export const useRoleStore = defineStore("role", () => {
  const needUpdate = ref(false);

  const fetchRolePage = (page: Page, condition?: SysRole) => {
    return new Promise<R<Page<SysRole>>>((resolve, reject) => {
      RolePageAPI(page, condition)
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const createRole = (params: SysRole) => {
    return new Promise<void>((resolve, reject) => {
      CreateRoleAPI(params)
        .then(() => {
          needUpdate.value = true;
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  const updateRole = (params: SysRole) => {
    return new Promise<void>((resolve, reject) => {
      UpdateRoleAPI(params)
        .then(() => {
          needUpdate.value = true;
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  const removeRole = (id: string) => {
    return new Promise<void>((resolve, reject) => {
      RemoveRoleAPI(id)
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
    fetchRolePage,
    createRole,
    updateRole,
    removeRole,
  };
});
