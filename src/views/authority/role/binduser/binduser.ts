import { defineComponent } from "vue";
import { getBindUsers, bindUser } from "@/api/authority/role";
import { tableHeaders } from "./header";
import { Page, SysUser, IngotResponse, RoleBindParams } from "@/model";
import BindView from "./BindView.vue";
import { bindSetup, BindSetupParams } from "@/views/authority/role/common/bind";

export default defineComponent({
  props: ["id"],
  components: {
    BindView,
  },
  setup(props) {
    const params: BindSetupParams<SysUser> = {
      id: props.id,
      tableHeaders,
      singleUnbindMessage(item: SysUser) {
        return `是否解绑用户:${item.username}`;
      },
      batchUnbindMessage: "是否解绑所选用户?",
      fetchData(
        page: Page,
        id: string,
        isBind: boolean,
        condition?: SysUser
      ): Promise<IngotResponse<Page<SysUser>>> {
        return getBindUsers(page, id, isBind, condition);
      },
      unbind(bindParams: RoleBindParams): Promise<IngotResponse<void>> {
        return bindUser(bindParams);
      },
    };
    return bindSetup(params);
  },
});
