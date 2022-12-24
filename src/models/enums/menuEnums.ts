import type { ElTagType, Option } from "../common";

export enum MenuType {
  Directory = "0",
  Menu = "1",
  Button = "9",
}

export const MenuTypeOptions: Array<Option<string>> = [
  { label: getMenuTypeDesc(MenuType.Directory), value: MenuType.Directory },
  { label: getMenuTypeDesc(MenuType.Menu), value: MenuType.Menu },
  { label: getMenuTypeDesc(MenuType.Button), value: MenuType.Button },
];

export function getMenuTypeIcon(type: MenuType): string {
  switch (type) {
    case MenuType.Directory:
      return "octicon:file-directory-16";
    case MenuType.Menu:
      return "material-symbols:menu";
    case MenuType.Button:
      return "mdi:button-outline";
  }
}

export function getMenuTypeDesc(type: MenuType): string {
  switch (type) {
    case MenuType.Directory:
      return "目录";
    case MenuType.Menu:
      return "菜单";
    case MenuType.Button:
      return "按钮";
  }
}

export function getMenuTypeTag(type: MenuType): ElTagType {
  switch (type) {
    case MenuType.Directory:
      return "success";
    case MenuType.Menu:
      return "warning";
    case MenuType.Button:
      return "danger";
  }
}
