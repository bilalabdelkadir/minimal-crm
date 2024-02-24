import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// Use __dirname directly for the root alias
const root = path.resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()], // Correct plugin import
  resolve: {
    alias: {
      '@': root,
      '@components': '@/components',
      '@pages': '@/pages',
      '@router': '@/router',
      '@store': '@/store',
      '@utils': '@/utils',
      '@styles': '@/styles',
      '@assets': '@/assets',
      '@types': '@/types',
      '@hooks': '@/hooks',
    },
  },
});
