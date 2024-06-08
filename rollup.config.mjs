import { readFileSync } from "node:fs";
import { builtinModules } from "node:module";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import { dts } from "rollup-plugin-dts";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

const input = {
  index: "src/index.ts",
  esbuild: "src/plugins/esbuild.ts",
  rollup: "src/plugins/rollup.ts",
  rspack: "src/plugins/rspack.ts",
  vite: "src/plugins/vite.ts",
  webpack: "src/plugins/webpack.ts",
};

export default defineConfig([
  {
    input,
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      ...builtinModules,
      ...builtinModules.map((m) => `node:${m}`),
    ],
    output: [
      {
        format: "cjs",
        dir: "dist",
        entryFileNames: "[name].js",
        exports: "named",
        sourcemap: true,
      },
      {
        format: "es",
        dir: "dist",
        entryFileNames: "[name].cjs",
        sourcemap: true,
      },
    ],
    plugins: [typescript()],
  },
  {
    input,
    output: {
      format: "es",
      dir: "dist",
      entryFileNames: "[name].d.ts",
    },
    plugins: [dts()],
  },
]);
