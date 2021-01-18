import { reactive, ref, Ref, unref } from "vue";
import { login } from "@/core/api/auth";

const formModel = reactive({
  username: "",
  password: ""
});

const rules = ref({
  username: [{ required: true, message: "请输入会员名称", trigger: "blur" }],
  password: [{ required: true, message: "请输入登录密码", trigger: "blur" }]
});

const loading = ref(false);

const handleLogin = (formRef: Ref) => {
  const form = unref(formRef);
  form.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      login({ ...formModel }).then(response => {
        loading.value = false;
      });
    }
  });
};

export default {
  loading,
  formModel,
  rules,
  handleLogin
};
