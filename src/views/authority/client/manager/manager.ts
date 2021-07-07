import { defineComponent, reactive, ref, onMounted } from "vue";
import {
  SysOauthClientDetails,
  getAuthTypeSelectList,
  grantTypeList,
} from "@/model";
import { getOne } from "@/api/authority/client";
import { copyParams } from "@/utils/object";

export default defineComponent({
  props: ["id"],
  setup(props) {
    const editFormRef = ref();
    const editForm = reactive({} as SysOauthClientDetails);
    const rawForm = reactive({} as SysOauthClientDetails);

    const edit = ref(false);

    const handleSaveEdit = () => {
      //
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
