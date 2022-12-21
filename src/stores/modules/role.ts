import type { SysRole, Page, R, Option } from "@/models";
import {
  RoleOptionsAPI,
  RolePageAPI,
  CreateRoleAPI,
  UpdateRoleAPI,
  RemoveRoleAPI,
} from "@/api/basic/role";

export const useRoleStore = defineStore("role", () => {
  const roleOptions = ref<Array<Option<string>>>([]);
  const needUpdate = ref(false);

  const fetchRoleOptions = () => {
    return new Promise<Array<Option<string>>>((resolve, reject) => {
      if (!needUpdate.value && roleOptions.value.length !== 0) {
        resolve(roleOptions.value);
        return;
      }

      RoleOptionsAPI()
        .then((resposne) => {
          needUpdate.value = false;
          roleOptions.value = resposne.data;
          resolve(resposne.data);
        })
        .then((e) => {
          reject(e);
        });
    });
  };

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
    roleOptions,
    fetchRoleOptions,
    fetchRolePage,
    createRole,
    updateRole,
    removeRole,
  };
});
