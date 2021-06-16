// moduleName.ts 或 moduleName/index.ts

const files = require.context(".", true, /\.ts$/);
const modules: any = {};

files.keys().forEach(key => {
  if (key === "./index.ts") return;
  const path = key.replace(/(\.\/|\.ts)/g, "");
  const [moduleName, isDir] = path.split("/");

  if (!isDir || isDir === "index") {
    const module = files(key);
    modules[module.moduleName || moduleName] = module.default;
  }
});

export default modules;
