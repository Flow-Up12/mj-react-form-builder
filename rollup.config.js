import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';

export default defineConfig([
  {
    input: './dist/tmp_types/index.d.ts',
    output: [{ file: './dist/types/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]);