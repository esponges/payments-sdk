import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sass from 'sass';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    [dts({ tsconfigPath: './tsconfig.app.json' })],
  ],
  build: {
    // TODO: uncomment this when we want to build the SDK as a library
    // lib: {
    //   entry: path.resolve(__dirname, 'src/main.tsx'),
    //   name: 'PaymentSDK',
    //   fileName: (format) => `payment-sdk.${format}.js`,
    //   formats: ['es', 'umd'],
    // },
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        zoidComponent: path.resolve(__dirname, 'src/zoid-component.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'zoidComponent' ? 'zoid-component.js' : '[name].[hash].js';
        },
      },
    },
    watch: {},
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
