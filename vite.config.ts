import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteSingleFile from "vite-plugin-single-spa";

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths(), viteSingleFile()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  appType: 'spa',
});
