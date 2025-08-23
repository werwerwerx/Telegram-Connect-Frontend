import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteSingleFile from "vite-plugin-single-spa";
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    tailwindcss(), 
    tsconfigPaths(), 
    viteSingleFile({
      type: 'root',
    }), 
    viteCompression()
  ],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3006,
  },
  preview: {
    port: 3006,
  },
  appType: 'spa',
});
