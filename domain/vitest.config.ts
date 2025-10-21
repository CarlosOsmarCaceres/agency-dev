// Archivo: domain/vitest.config.ts

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Esta es la línea clave que soluciona el problema
    exclude: ['node_modules', 'dist'],
  },
});