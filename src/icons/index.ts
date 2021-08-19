const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
const iconsMap = requireAll(req);

export const icons = iconsMap.map((i: any) => {
  return i.default.id.substring("icon-".length);
});
