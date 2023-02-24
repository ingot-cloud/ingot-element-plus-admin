import type { TableHeaderRecord } from "@/components/table";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "序号",
    type: "index",
    align: "center",
    width: "50",
  },
  {
    label: "客户端ID",
    prop: "clientId",
  },
  {
    label: "客户端名称",
    prop: "clientName",
  },
  {
    label: "认证方式",
    prop: "clientAuthenticationMethods",
    width: "100",
    hide: true,
  },
  {
    label: "授权类型",
    prop: "authorizationGrantTypes",
    width: "180",
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
    label: "需要提供验证密钥质询和验证器(授权码流程)",
    prop: "requireProofKey",
    hide: true,
    transform: (v: boolean) => (v ? "是" : "否"),
  },
  {
    label: "需要授权同意(授权码流程)",
    prop: "requireAuthorizationConsent",
    hide: true,
    transform: (v: boolean) => (v ? "是" : "否"),
  },
  {
    label: "AccessToken存活时间(秒)",
    prop: "accessTokenTimeToLive",
  },
  {
    label: "是否重复使用刷新Token",
    prop: "reuseRefreshTokens",
    transform: (v: boolean) => (v ? "是" : "否"),
  },
  {
    label: "刷新Token存活时间(秒)",
    prop: "refreshTokenTimeToLive",
    hide: true,
  },
  {
    label: "Token认证类型",
    prop: "tokenAuthType",
  },
  {
    label: "状态",
    prop: "status",
    align: "center",
    width: "60",
  },
  {
    label: "创建时间",
    prop: "clientIdIssuedAt",
  },
  {
    label: "操作",
    width: "210",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];
