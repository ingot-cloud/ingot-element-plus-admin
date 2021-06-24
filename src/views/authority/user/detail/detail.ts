import { defineComponent, onMounted, ref, reactive, unref } from "vue";
import { userProfile, update } from "@/api/authority/user";
import {
  fetchCacheData as fetchRoleData,
  computedRecords as computedRoleRecords,
} from "@/store/composition/role";
import { fetchDeptTree, computedList } from "@/store/composition/dept";
import { useStore } from "@/store";
import { Message } from "@/utils/message";
import { copyParamsWithKeys } from "@/utils/object";

const rawForm = {
  deptId: null,
  roleIds: [],
  username: null,
  newPassword: null,
  realName: null,
  phone: null,
  email: null,
  status: null,
  createdAt: null,
};

const keys = [
  "deptId",
  "roleIds",
  "username",
  "newPassword",
  "realName",
  "phone",
  "email",
  "status",
  "createdAt",
];

export default defineComponent({
  props: ["id"],
  setup(props) {
    const store = useStore();
    const deptRecords = computedList();
    const roleRecords = computedRoleRecords();
    const editDisabled = ref(true);

    const editFormRef = ref();
    const editForm = reactive(rawForm);
    const loading = ref(false);

    const refreshProfile = () => {
      userProfile(props.id).then((response) => {
        copyParamsWithKeys(response.data, editForm, keys);
      });
    };

    onMounted(() => {
      fetchDeptTree(store);
      fetchRoleData(store);
      refreshProfile();
    });

    return {
      loading,
      editDisabled,
      editFormRef,
      editForm,
      roleRecords,
      deptRecords,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      handleActionButton() {
        if (editDisabled.value) {
          editDisabled.value = false;
          return;
        }
        const form = unref(editFormRef);
        form.validate((valid: boolean) => {
          if (valid) {
            loading.value = true;

            const params = { id: props.id };
            copyParamsWithKeys(editForm, params, keys);

            update(params)
              .then(() => {
                Message.success("操作成功");
                loading.value = false;
                editDisabled.value = true;
                refreshProfile();
              })
              .catch(() => {
                loading.value = false;
              });
          }
        });
      },
    };
  },
});
