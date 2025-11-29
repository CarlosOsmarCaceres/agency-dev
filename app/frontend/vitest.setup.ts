import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Limpia el DOM virtual después de cada test para que no se mezclen resultados
afterEach(() => {
  cleanup();
});