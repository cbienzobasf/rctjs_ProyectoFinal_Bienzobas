import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' 
    ? '/rctjs_preEntrega1_Bienzobas/'  // URL base para producción (GitHub Pages)
    : '/',  // URL base para desarrollo local
  envDir: './'
}));
