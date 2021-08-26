import { SysTenant, CommonStatus, getCommonStatusActionDesc } from "@/model";
import { Ref, unref, ref } from "vue";
import { store } from "@/store";
import { update, remove } from "@/store/composition/tenant";
import { Confirm, Message } from "@/utils/message";

export const loading = ref(false);

export function handleDelete(params: SysTenant, callback?: () => void): void {
  Confirm.warning(`是否删除租户(${params.name})`).then(() => {
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

export function handleDisable(params: SysTenant, callback?: () => void): void {
  const status =
    params.status === CommonStatus.Enable
      ? CommonStatus.Lock
      : CommonStatus.Enable;
  const message = `是否${getCommonStatusActionDesc(status)}租户(${
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
