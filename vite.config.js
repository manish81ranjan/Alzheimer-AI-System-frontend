// // frontend/vite.config.js
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// /**
//  * Vite Configuration
//  * - React support
//  * - Path alias (@ -> src)
//  * - Optimized for Tailwind + Three.js
//  */

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
//   server: {
//     port: 5173,
//     open: true,
//   },
//   build: {
//     outDir: "dist",
//     sourcemap: false,
//   },
// });


// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite Configuration
 * - React support
 * - Path alias (@ -> src)
 * - Dev proxy to Flask backend
 */

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    port: 5173,
    open: true,

    // 🔥 IMPORTANT: Proxy frontend → backend
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
