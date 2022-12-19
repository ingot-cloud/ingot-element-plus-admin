import type { Ref } from "vue";
import type { Router } from "vue-router";

const formModel = reactive({
  phone: "",
  code: "",
});

const rules = ref({
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
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
    }
  });
};

export default {
  loading,
  formModel,
  rules,
  handleLogin,
};
