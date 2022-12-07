export interface Command {
  action: "router" | "logout" | "user";
  params: string;
}

export interface MenuItem {
  divided: boolean;
  command: Command;
  icon: string;
  title: string;
}

export const menuList: Array<MenuItem> = [
  {
    divided: false,
    command: { action: "user", params: "" },
    icon: "ep-user",
    title: "个人信息",
  },
  {
    divided: false,
    command: { action: "router", params: "" },
    icon: "ep-edit",
    title: "修改密码",
  },
  {
    divided: true,
    command: { action: "logout", params: "" },
    icon: "ep-switch-button",
    title: "退出登录",
  },
];
