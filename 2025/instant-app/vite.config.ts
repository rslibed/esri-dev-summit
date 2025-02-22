import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

import packageJSON from "./package.json";

const CALCITE_VERSION_NUM = JSON.stringify(
  sanitizeVersionNum(packageJSON.dependencies["@esri/calcite-components"])
);

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",

      supported: {
        bigint: true,
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
  base: "./",
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1500,
    target: ["esnext"],
  },
  server: {
    open: true,
    port: 3001,
    host: "localhost",
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd().replace("instant-app", ""))],
    },
  },
  define: {
    __CALCITE_VERSION_NUM__: CALCITE_VERSION_NUM,
  },
});

function sanitizeVersionNum(versionNum: string): string {
  versionNum = versionNum.replace("^", "");
  versionNum = versionNum.replace("~", "");
  return versionNum;
}
