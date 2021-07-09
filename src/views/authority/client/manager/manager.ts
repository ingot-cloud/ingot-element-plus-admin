import { defineComponent, reactive, ref, onMounted } from "vue";
import {
  SysOauthClientDetails,
  getAuthTypeSelectList,
  grantTypeList,
} from "@/model";
import { getOne, update } from "@/api/authority/client";
import { copyParams, getDiffWithIgnore } from "@/utils/object";
import { Message } from "@/utils/message";

export default defineComponent({
  props: ["id"],
  setup(props) {
    const editFormRef = ref();
    const editForm = reactive({} as SysOauthClientDetails);
    const rawForm = reactive({} as SysOauthClientDetails);

    const edit = ref(false);

    const handleSaveEdit = () => {
      const params = getDiffWithIgnore(rawForm, editForm, ["clientId"]);
      update(params).then(() => {
        Message.success("操作成功");
      });
    };

    const handleCancelEdit = () => {
      edit.value = false;
      copyParams(editForm, rawForm);
    };

    onMounted(() => {
      getOne(props.id).then((response) => {
        copyParams(editForm, response.data);
        copyParams(rawForm, response.data);
      });
    });

    return {
      editFormRef,
      editForm,
      edit,
      getAuthTypeSelectList,
      grantTypeList,
      handleSaveEdit,
      handleCancelEdit,
    };
  },
});
