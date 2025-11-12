import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { parse } from 'react-docgen-typescript';

export default defineConfig({
    base: './',
    root: path.resolve(__dirname, 'src'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        sourcemap: true
    },
    plugins: [
        mdx({
            providerImportSource: '@/mdx-components'
        }),
        react(),
        docgen()
    ],
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

function docgen() {
    const options = {
        savePropValueAsString: true,
        shouldExtractValuesFromUnion: true,
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: prop => {
            if (prop.declarations !== undefined && prop.declarations.length > 0) {
                const hasPropAdditionalDescription = prop.declarations.find(declaration => {
                    return !declaration.fileName.includes('node_modules');
                });

                return Boolean(hasPropAdditionalDescription);
            }

            return true;
        }
    };

    return {
        name: 'docgen',
        transform(code, id) {
            if (
                id.includes('node_modules') ||
                !id.endsWith('.tsx') ||
                !id.includes('/kantanui/src/components/')
            ) {
                return null;
            }

            const data = parse(id, options)[0];

            return {
                code: `${code}\n\n${data.displayName}.settings = ${JSON.stringify(data.props)}`
            };
        }
    };
}