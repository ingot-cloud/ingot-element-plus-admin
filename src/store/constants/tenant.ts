export const moduleName = "tenant";

export enum Mutations {
  setRecords = "setRecords",
  openUpdateFlag = "openUpdateFlag",
}

export enum Getters {
  records = "records",
}

export enum Actions {
  fetchData = "fetchData",
  create = "create",
  remove = "remove",
  update = "update",
}
