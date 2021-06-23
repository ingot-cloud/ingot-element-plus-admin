export const moduleName = "auth";

export enum Mutations {
  setLoginTenant = "setLoginTenant",
  setToken = "setToken",
  setUserInfo = "setUserInfo",
  removeToken = "removeToken",
  removeUserInfo = "removeUserInfo",
}

export enum Getters {
  loginTenant = "loginTenant",
  accessToken = "accessToken",
  refreshToken = "refreshToken",
  existUserInfo = "existUserInfo",
}

export enum Actions {
  updateToken = "updateToken",
  refreshToken = "refreshToken",
  fetchUserInfo = "fetchUserInfo",
  clear = "clear",
}
