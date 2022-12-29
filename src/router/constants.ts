export const NotFound = {
  path: "/:pathMatch(.*)",
  meta: { hideMenu: true, breadcrumbHidden: true },
  component: () => import("@/views/common/errors/NotFound.vue"),
};

/**
 * 布局视图
 */
export const LAYOUT = () => import("@/components/layout/InAppLayout.vue");

const dynamicViewsModules = import.meta.glob("@/views/**/*.vue");
Object.keys(dynamicViewsModules).forEach((key) => {
  dynamicViewsModules[`@${key.substring("/src".length)}`] =
    dynamicViewsModules[key];
  delete dynamicViewsModules[key];
});
dynamicViewsModules["@/components/layout/InAppLayout.vue"] = LAYOUT;

export const importComponent = (viewPath: string) => {
  return dynamicViewsModules[viewPath];
};
