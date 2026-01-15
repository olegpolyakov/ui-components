import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy as copy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        react(),
        copy({
            targets: [
                {
                    src: 'src/styles',
                    dest: '.'
                }
            ]
        })
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'KantanUI',
            fileName: 'index',
            cssFileName: 'index'
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    },
    css: {
        modules: {
            scopeBehaviour: 'local',
            localsConvention: 'dashes',
            generateScopedName: (name, filename) => {
                const file = path.basename(filename, '.module.scss');
            
                if (file === 'classes') {
                    return `kui-${name}`;
                } else if (name === 'root') {
                    return `kui-${file}`;
                } else {
                    return `kui-${file}-${name}`;
                }
            }
        },
        preprocessorOptions: {
            scss: {
                loadPaths: [path.resolve(__dirname, 'src/styles')]
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
});
