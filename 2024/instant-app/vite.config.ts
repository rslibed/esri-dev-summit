import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "./",
  build: {
    outDir: "build"
  },
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd().replace("react-starter", "")), "../node_modules/@arcgis/core/assets"]
    }
  }
});
