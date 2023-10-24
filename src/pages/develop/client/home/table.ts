import type { TableHeaderRecord } from "@/components/table";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "序号",
    type: "index",
    align: "center",
    width: "80",
  },
  {
    label: "AppID",
    prop: "clientId",
  },
  {
    label: "App名称",
    prop: "clientName",
  },
  {
    label: "认证方式",
    prop: "clientAuthenticationMethods",
    width: "100",
    hide: true,
  },
  {
    label: "重定向URI",
    prop: "redirectUris",
    width: "100",
    hide: true,
  },
  {
    label: "访问范围",
    prop: "scopes",
    width: "150",
    hide: true,
  },
  {
    label: "Required PKCE",
    prop: "requireProofKey",
    transform: (v: boolean) => (v ? "是" : "否"),
  },
  {
    label: "授权同意",
    prop: "requireAuthorizationConsent",
    hide: true,
    transform: (v: boolean) => (v ? "是" : "否"),
  },
  {
    label: "Token存活时间(秒)",
    prop: "accessTokenTimeToLive",
  },
  {
    label: "重复使用刷新Token",
    prop: "reuseRefreshTokens",
    hide: true,
    transform: (v: boolean) => (v ? "是" : "否"),
  },
  {
    label: "刷新Token存活时间(秒)",
    prop: "refreshTokenTimeToLive",
    hide: true,
  },
  {
    label: "认证类型",
    prop: "tokenAuthType",
    width: "100",
  },
  {
    label: "状态",
    prop: "status",
    align: "center",
    width: "80",
  },
  {
    label: "创建时间",
    prop: "clientIdIssuedAt",
    hide: true,
    width: "180",
  },
  {
    label: "操作",
    width: "210",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];
