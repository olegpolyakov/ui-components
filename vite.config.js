import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
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
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            // generateScopedName: (name, filename, css) => {
            //     console.log({ name, filename, css });
            //     const file = path.basename(filename, '.css');
            //     // Example: returns a name like "_file_line_name"
            //     return `_${file}_${name}`; 
            // }
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
