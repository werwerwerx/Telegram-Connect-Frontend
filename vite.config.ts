import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(), 
    tsconfigPaths(), 
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
