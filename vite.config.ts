import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import path from 'path';


export default defineConfig({
  plugins: [
    react(),
    Pages()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});




// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// // import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // plugins: [react(), tailwindcss()],

// });
