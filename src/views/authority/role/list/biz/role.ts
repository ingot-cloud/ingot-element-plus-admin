import { Ref, unref, ref } from "vue";
import {
  RolePageItemVo,
  CommonStatus,
  getCommonStatusActionDesc,
} from "@/model";
import { store } from "@/store";
import { Confirm, Message } from "@/utils/message";
import { update, remove } from "@/store/composition/role";
import router from "@/router";

export const loading = ref(false);

export function handleCreate(editDialog: Ref): void {
  const dialog = unref(editDialog);
  dialog.show();
}

export function handleEdit(editDialog: Ref, params: RolePageItemVo): void {
  const dialog = unref(editDialog);
  dialog.show(params);
}

export function handleDelete(
  params: RolePageItemVo,
  callback?: FunctionConstructor
): void {
  Confirm.warning(`是否删除角色(${params.name})`).then(() => {
    loading.value = true;
    remove(store, params.id as string)
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
}

export function handleDisable(
  params: RolePageItemVo,
  callback?: FunctionConstructor
): void {
  const status =
    params.status === CommonStatus.Enable
      ? CommonStatus.Lock
      : CommonStatus.Enable;
  const message = `是否${getCommonStatusActionDesc(status)}角色(${
    params.name
  })`;
  Confirm.warning(message).then(() => {
    loading.value = true;
    update(store, { id: params.id, status })
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
}

export function handleBindCommand(params: {
  type: string;
  data: RolePageItemVo;
}): void {
  const type = params.type;
  const data = params.data;
  const roleId = data.id;

  switch (type) {
    case "user":
      router.push({
        path: `/authority/role/binduser/${roleId}`,
        query: {
          name: data.name,
        },
      });
      break;
  }
}
