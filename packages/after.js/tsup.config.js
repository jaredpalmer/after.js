import { defineConfig } from 'tsup';

export default defineConfig((conf) => {
  return {
    entry: ['src/index.tsx'],
    name: 'after',
    sourcemap: true,
    platform: 'browser',
    clean: false,
    format: ['cjs', 'esm'],
  };
});
