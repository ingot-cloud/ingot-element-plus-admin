import { reactive, ref, Ref, unref } from "vue";
import { login } from "@/api/base/auth";
import { Router } from "vue-router";
import { updateToken } from "@/store/composition/auth";

const formModel = reactive({
  username: "",
  password: "",
  tenant: "",
});

const rules = ref({
  username: [{ required: true, message: "请输入会员名称", trigger: "blur" }],
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
      login({ ...formModel })
        .then((response) => {
          updateToken(response.data);
          const params = router.currentRoute.value.query;
          router.replace({
            path: params.redirect ? String(params.redirect) : "/",
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
