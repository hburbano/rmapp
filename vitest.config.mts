import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['app/**/*.test.tsx', 'components/**/*.test.tsx'],
    setupFiles: ['test/setup.ts'],
    coverage: {
      reporter: ['text', 'html', 'json'],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './app'),
      '@components': path.resolve(__dirname, './components'),
      '@atoms': path.resolve(__dirname, './atoms'),
      '@hooks': path.resolve(__dirname, './hooks'),
      '@test': path.resolve(__dirname, './test'),
    },
  },
})
