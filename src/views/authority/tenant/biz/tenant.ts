import { SysTenant } from "@/model";
import { Ref, unref } from "vue";

export function handleCreate(dialogRef: Ref): void {
  const dialog = unref(dialogRef);
  dialog.show();
}

export function handleEdit(dialogRef: Ref, params: SysTenant): void {
  const dialog = unref(dialogRef);
  dialog.show(params);
}

export function handleDelete(params: SysTenant): void {
  //
}

export function handleDisable(params: SysTenant): void {
  //
}
