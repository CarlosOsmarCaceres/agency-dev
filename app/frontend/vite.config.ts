/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
/* import tailwindcss from '@tailwindcss/vite'; */ // Ojo: Si usas Tailwind v3, borra esta línea y el plugin abajo

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(), // ⚠️ COMENTA O BORRA ESTO si volviste a Tailwind v3 como acordamos
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    // 👇 CAMBIO: Ponlo dentro de corchetes []
    setupFiles: ['./vitest.setup.ts'], 
    css: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});