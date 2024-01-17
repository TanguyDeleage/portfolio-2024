import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// Get the directory name of the current module
const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio-2024/',
  build: {
    assetsDir: 'assets',
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
