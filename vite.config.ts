// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/sdk.tsx',
      name: 'PaymentSDK',
      fileName: (format) => `payment-sdk.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'post-robot'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'post-robot': 'postRobot',
        },
      },
    },
  },
});
