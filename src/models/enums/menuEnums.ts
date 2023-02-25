import { newTagText } from "../common";

export enum MenuType {
  Directory = "0",
  Menu = "1",
  Button = "9",
}
export const MenuTypeEnumExtArray = toEnumExtArray(MenuType, [
  newTagText("目录", "success"),
  newTagText("菜单", "warning"),
  newTagText("按钮", "danger"),
]);
export const useMenuTypeEnum = useEnum(MenuTypeEnumExtArray);
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
