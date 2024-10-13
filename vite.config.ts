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
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'PaymentSDK',
      fileName: (format) => `payment-sdk.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // We're no longer treating React as external
      external: [],
      output: {
        globals: {
          // This is no longer needed, but we'll keep it for now
          PaymentSDK: 'PaymentSDK',
        },
      },
    },
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
