import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

console.log('Vite docs config', path.resolve(__dirname, 'docs', 'src'));

export default defineConfig({
    root: path.resolve(__dirname, 'src'),
    base: './',
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        sourcemap: true
        // No need for rollupOptions.input/output unless you have multiple entry points
    },
    plugins: [mdx(), react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
            generateScopedName: '[name]__[local]___[hash:base64:5]'
        },
        preprocessorOptions: {
            scss: {}
        }
    },
    server: {
        open: true
    }
});
