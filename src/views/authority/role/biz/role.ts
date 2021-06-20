import { Ref, unref } from "vue";
import { RolePageItemVo } from "@/model";

export function handleCreate(editDialog: Ref): void {
  const dialog = unref(editDialog);
  dialog.show();
}

export function handleEdit(editDialog: Ref, params: RolePageItemVo): void {
  const dialog = unref(editDialog);
  dialog.show();
}

export function handleDelete(params: RolePageItemVo): void {
  console.log(params);
}

export function handleDisable(params: RolePageItemVo): void {
  // handle disable
}
