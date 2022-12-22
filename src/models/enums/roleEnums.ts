import type { Option } from "../common";

export enum RoleType {
  System = "0",
  Custom = "9",
}

export const getRoleTypeText = (type: RoleType): string => {
  switch (type) {
    case RoleType.System:
      return "系统默认";
    case RoleType.Custom:
      return "自定义";
  }
};

export const RoleTypeOptions: Array<Option<string>> = [
  { label: getRoleTypeText(RoleType.System), value: RoleType.System },
  { label: getRoleTypeText(RoleType.Custom), value: RoleType.Custom },
];
