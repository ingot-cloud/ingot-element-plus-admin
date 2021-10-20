export const tableHeaders = [
  {
    label: "序号",
    type: "index",
    align: "center",
    width: "50",
  },
  {
    label: "客户端ID",
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
  },
  {
    label: "访问范围",
    prop: "scopes",
    width: "150",
  },
  {
    label: "需要提供验证密钥质询和验证器(授权码流程)",
    prop: "requireProofKey",
    hide: true,
  },
  {
    label: "需要授权同意(授权码流程)",
    prop: "requireAuthorizationConsent",
    hide: true,
  },
  {
    label: "AccessToken存活时间(秒)",
    prop: "accessTokenTimeToLive",
  },
  {
    label: "是否重复使用刷新Token",
    prop: "reuseRefreshTokens",
  },
  {
    label: "刷新Token存活时间(秒)",
    prop: "refreshTokenTimeToLive",
  },
  {
    label: "Token认证方式",
    prop: "tokenAuthenticationMethod",
  },
  {
    label: "状态",
    prop: "status",
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
