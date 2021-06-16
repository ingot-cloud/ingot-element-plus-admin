export const moduleName = "auth";

export enum Mutations {
  setToken = "setToken",
  setUserInfo = "setUserInfo",
  removeToken = "removeToken",
  removeUserInfo = "removeUserInfo"
}

export enum Getters {
  accessToken = "accessToken",
  refreshToken = "refreshToken",
  existUserInfo = "existUserInfo"
}

export enum Actions {
  updateToken = "updateToken",
  refreshToken = "refreshToken",
  fetchUserInfo = "fetchUserInfo",
  clear = "clear"
}
