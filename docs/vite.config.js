import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

export default defineConfig({
    base: './',
    root: path.resolve(__dirname, 'src'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        sourcemap: true
    },
    plugins: [mdx(), react()],
    css: {
        modules: {
            localsConvention: 'dashes',
            generateScopedName: '[name]__[local]___[hash:base64:5]'
        },
        preprocessorOptions: {
            scss: {
                loadPaths: [path.resolve(__dirname, '../src/styles')]
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, '../src')
        }
    },
    server: {
        open: true
    }
});
