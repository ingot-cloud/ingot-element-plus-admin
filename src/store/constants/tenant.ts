export const moduleName = "tenant";

export enum Mutations {
  setGlobalTenant = "setGlobalTenant",
  setSimpleRecords = "setSimpleRecords",
  setRecords = "setRecords",
  openUpdateFlag = "openUpdateFlag",
}

export enum Getters {
  globalTenant = "globalTenant",
  simpleRecords = "simpleRecords",
  records = "records",
}

export enum Actions {
  clearGlobalTenant = "clearGlobalTenant",
  fetchSimpleList = "fetchSimpleList",
  fetchData = "fetchData",
  create = "create",
  remove = "remove",
  update = "update",
}
