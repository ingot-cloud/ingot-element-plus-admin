import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { getBindClients, bindClient } from "@/api/authority/role";
import { tableHeaders } from "./header";
import {
  Page,
  SysOauthClientDetails,
  IngotResponse,
  RoleBindParams,
} from "@/model";
import BindView from "./BindView.vue";
import { bindSetup, BindSetupParams } from "@/views/authority/role/common/bind";

export default defineComponent({
  props: ["id"],
  components: {
    BindView,
  },
  setup(props) {
    const route = useRoute();
    const params: BindSetupParams<SysOauthClientDetails> = {
      title: `角色：${route.query.name}`,
      id: props.id,
      tableHeaders,
      singleConfirmMessage(item: SysOauthClientDetails) {
        return `是否解绑客户端:${item.clientId}`;
      },
      batchConfirmMessage: "是否解绑所选客户端?",
      fetchData(
        page: Page,
        id: string,
        isBind: boolean,
        condition?: SysOauthClientDetails
      ): Promise<IngotResponse<Page<SysOauthClientDetails>>> {
        return getBindClients(page, id, isBind, condition);
      },
      bind(bindParams: RoleBindParams): Promise<IngotResponse<void>> {
        return bindClient(bindParams);
      },
    };
    return bindSetup(params);
  },
});
