import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permite usar 'expect' sem importar em todo arquivo
    environment: 'node', // Como é backend, ambiente node
  },
});