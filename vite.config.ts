import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import { createHtmlPlugin } from "vite-plugin-html";
import postcssNesting from "postcss-nesting";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Unocss from "unocss/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

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
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "ingot-[dir]-[name]",
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ["vue", "vue/macros", "vue-router", "@vueuse/core", "pinia"],
        dirs: ["./src/composables/**"],
        dts: "./auto-imports.d.ts",
        vueTemplate: true,
        resolvers: [ElementPlusResolver()],
      }),
      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: "./components.d.ts",
        dirs: ["./src/components"],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            customCollections: ["ingot"],
          }),
        ],
      }),
      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
        compiler: "vue3",
        defaultClass: "inline",
        customCollections: {
          ingot: FileSystemIconLoader("./src/assets/icons"),
        },
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
      host: "0.0.0.0",
      port: 5173,
      proxy: {
        "/api": {
          target: "http://localhost:8200",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/"),
        },
      },
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
