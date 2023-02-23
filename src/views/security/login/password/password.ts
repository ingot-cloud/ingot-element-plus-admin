import type { Ref } from "vue";
import type { Router } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import { useTabsStore } from "@/stores/modules/tabs";
import { AES } from "@/utils/encrypt";

const formModel = reactive({
  username: "",
  password: "",
});

const rules = ref({
  username: [{ required: true, message: "请输入登录名称", trigger: "blur" }],
  password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
});

const loading = ref(false);

/**
 * 密码登录逻辑
 * @param formRef
 */
const handleLogin = (formRef: Ref, router: Router): void => {
  const form = unref(formRef);
  form.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      const loginParams = AES({
        data: { ...formModel },
        keys: ["password"],
      });
      useAuthStore()
        .login(loginParams)
        .then(() => {
          useTabsStore().closeAllTabs("/");
          router.replace({
            path: "/",
          });

          loading.value = false;
          form.resetFields();
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
};

export default {
  loading,
  formModel,
  rules,
  handleLogin,
};
