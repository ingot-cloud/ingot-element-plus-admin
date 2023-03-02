import type { RouteLocationPathRaw, RouteLocationNormalized } from "vue-router";

export const keepTenant = (to: RouteLocationPathRaw): RouteLocationPathRaw => {
  if (to.query) {
    Object.assign(to.query, { keepTenant: "1" });
  } else {
    to.query = { keepTenant: "1" };
  }
  return to;
};

export const isKeepTenant = (to: RouteLocationNormalized): boolean => {
  return Boolean(
    to.query && to.query.keepTenant && to.query.keepTenant === "1"
  );
};
