import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './setupTests.ts',
    includeSource: ['src/**/*.ts'], 
  }
})
