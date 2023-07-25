import { useAuthStore } from "@/stores/modules/auth";
import { useTabsStore } from "@/stores/modules/tabs";
import Router from "@/router";

const formModel = reactive({
  username: "",
  password: "",
  code: "",
});

const loading = ref(false);

const go = useGo(Router);

const init = () => {
  loading.value = false;
  formModel.username = "";
  formModel.password = "";
  formModel.code = "";
};

/**
 * 密码登录逻辑
 * @param formRef
 */
const handleLogin = (): void => {
  loading.value = true;
  useAuthStore()
    .login(formModel)
    .then(() => {
      useTabsStore().closeAllTabs("/");
      go(
        {
          path: "/",
        },
        true
      );
    })
    .catch(() => {
      loading.value = false;
    });
};

export default {
  loading,
  formModel,
  init,
  handleLogin,
};
