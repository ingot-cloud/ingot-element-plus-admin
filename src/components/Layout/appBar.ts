import { handlLogout } from "@/store/composition/auth";
import { ref, unref } from "vue";

interface Command {
  action: "router" | "logout" | "tenant";
  params: string;
}

interface MenuItem {
  divided: boolean;
  command: Command;
  title: string;
}

export const menuList: Array<MenuItem> = [
  {
    divided: false,
    command: { action: "tenant", params: "" },
    title: "切换租户",
  },
  {
    divided: true,
    command: { action: "router", params: "" },
    title: "修改密码",
  },
  {
    divided: true,
    command: { action: "logout", params: "" },
    title: "退出登录",
  },
];

export const tenantDialogRef = ref();

export function handleMenuCommand(command: Command): void {
  switch (command.action) {
    case "logout":
      handlLogout();
      break;
    case "tenant":
      // eslint-disable-next-line no-case-declarations
      const dialog = unref(tenantDialogRef);
      dialog.show();
      break;
  }
}
