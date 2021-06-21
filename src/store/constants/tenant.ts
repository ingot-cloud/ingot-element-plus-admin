export const moduleName = "tenant";

export enum Mutations {
  setSimpleRecords = "setSimpleRecords",
  setRecords = "setRecords",
  openUpdateFlag = "openUpdateFlag",
}

export enum Getters {
  simpleRecords = "simpleRecords",
  records = "records",
}

export enum Actions {
  fetchSimpleList = "fetchSimpleList",
  fetchData = "fetchData",
  create = "create",
  remove = "remove",
  update = "update",
}
