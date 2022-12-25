import type { AuthorityTreeNode, SysAuthority } from "@/models";
import {
  GetAuthorityTreeAPI,
  CreateAuthorityAPI,
  UpdateAuthorityAPI,
  RemoveAuthorityAPI,
} from "@/api/basic/authority";

export const useAuthorityStore = defineStore("authority", () => {
  const expandedKeys = ref<Array<string>>([]);
  const authorityTree = ref<Array<AuthorityTreeNode>>([]);
  const needUpdate = ref(false);

  const fetchAuthorityTree = () => {
    return new Promise<Array<AuthorityTreeNode>>((resolve, reject) => {
      if (!needUpdate.value && authorityTree.value.length !== 0) {
        resolve(authorityTree.value);
        return;
      }
      GetAuthorityTreeAPI()
        .then((response) => {
          const data = response.data;
          data.forEach((item) => {
            if (item.id) {
              expandedKeys.value.push(item.id);
            }
          });

          needUpdate.value = false;
          authorityTree.value = data.slice();
          resolve(data);
        })
        .catch(() => {
          reject();
        });
    });
  };
  const createAuthority = (params: SysAuthority) => {
    return new Promise<void>((resolve, reject) => {
      CreateAuthorityAPI(params)
        .then(() => {
          needUpdate.value = true;
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };
  const updateAuthority = (params: SysAuthority) => {
    return new Promise<void>((resolve, reject) => {
      UpdateAuthorityAPI(params)
        .then(() => {
          needUpdate.value = true;
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };
  const removeAuthority = (id: string) => {
    return new Promise<void>((resolve, reject) => {
      RemoveAuthorityAPI(id)
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
    expandedKeys,
    authorityTree,
    fetchAuthorityTree,
    createAuthority,
    updateAuthority,
    removeAuthority,
  };
});
