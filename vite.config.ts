import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import { createHtmlPlugin } from "vite-plugin-html";
import postcssNesting from "postcss-nesting";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Unocss from "unocss/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
  const getViteEnv = (target: string) => {
    return loadEnv(mode, process.cwd())[target];
  };
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            //将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
            title: getViteEnv("VITE_APP_TITLE"),
          },
        },
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        dirs: ["./src/components"],
        dts: true,
        vueTemplate: true,
        resolvers: [ElementPlusResolver()],
      }),
      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            alias: {
              // park: 'icon-park',
            },
            customCollections: ["icons"],
          }),
        ],
      }),
      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
        compiler: "vue3",
        defaultClass: "inline",
      }),
      // https://github.com/unocss/unocss
      Unocss(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      postcss: {
        plugins: [postcssNesting],
      },
    },
    server: {
      port: 5173,
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        // input: {
        //   entry: resolve(__dirname, "index.html"),
        //   // login: resolve(__dirname, "src/views/login/index.html"),
        // },
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
