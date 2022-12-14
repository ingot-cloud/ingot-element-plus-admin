import type { Router, RouteParams } from "vue-router";
import { useRouter } from "vue-router";
import { unref } from "vue";
import { PageNameEnum, RedirectType, RedirectField } from "@/enums/pageEnums";

export const getRedirectParams = (
  type: RedirectType,
  path: string,
  routeParams: RouteParams = {}
) => {
  routeParams[RedirectField.TYPE] = type;
  routeParams["path"] = path;
  return routeParams;
};

export const doRedirect = () => {
  const { currentRoute, replace } = useRouter();

  const { params, query } = unref(currentRoute);
  const path = params["path"];
  const redirectType = params[RedirectField.TYPE] || RedirectType.PATH;

  Reflect.deleteProperty(params, RedirectField.TYPE);
  Reflect.deleteProperty(params, "path");

  return new Promise<void>((resolve, reject) => {
    const _path = Array.isArray(path) ? path.join("/") : path;
    switch (redirectType) {
      case RedirectType.NAME:
        replace({
          name: _path,
          query,
          params,
        });
        resolve();
        break;
      case RedirectType.PATH:
        replace({
          path: _path.startsWith("/") ? _path : "/" + _path,
          query,
        });
        resolve();
        break;
      default:
        reject();
        break;
    }
  });
};

export const useRefreshPage = (router?: Router) => {
  const { replace, currentRoute } = router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function refreshPage(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === PageNameEnum.REDIRECT) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params[RedirectField.TYPE] = RedirectType.NAME;
        params["path"] = String(name);
      } else {
        params[RedirectField.TYPE] = RedirectType.PATH;
        params["path"] = fullPath;
      }
      replace({ name: PageNameEnum.REDIRECT, params, query }).then(() =>
        resolve(true)
      );
    });
  }
  return refreshPage;
};
