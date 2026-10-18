import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
const proxy = {
  '/api/products': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: () => '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
  },
};
export default defineConfig({
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
  test: { environment: 'jsdom', setupFiles: './tests/setup.ts' },
});
