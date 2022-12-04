export interface Command {
  action: "router" | "logout" | "tenant";
  params: string;
}

export interface MenuItem {
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
