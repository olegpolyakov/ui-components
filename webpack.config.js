const path = require('path');
const webpack = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => [
    {
        name: 'lib',
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
            library: {
                type: 'umd',
                name: {
                    commonjs: '@codedojo/react-components'
                }
            },
            globalObject: 'this'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader'
                    }
                },
                {
                    test: /\.(s*)css$/,
                    use: [
                        CssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentHashSalt: Date.now().toString(),
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                    exportLocalsConvention: 'camelCase'
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                },
                {
                    test: /\.svg/,
                    issuer: /\.(s*)css$/,
                    type: 'asset/inline'
                },
                {
                    test: /\.svg$/,
                    issuer: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'react-svg-loader',
                            options: {
                                svgo: {
                                    plugins: [
                                        { removeViewBox: false }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        },
        devtool: argv.mode === 'production' ? 'source-map' : 'eval',
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(argv.mode),
            }),
            new CssExtractPlugin({
                filename: 'index.css'
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve('./src/index.scss')
                    }
                ]
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src/')
            }
        },
        externals: {
            'react': {
                root: 'React',
                commonjs: 'react',
                commonjs2: 'react',
                module: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
                module: 'react-dom'
            }
        }
    },
    {
        name: 'docs',

        entry: './docs/src/index.tsx',

        output: {
            path: path.resolve(__dirname, 'docs'),
            filename: 'index.js'
        },

        devServer: {
            compress: true,
            port: 9000,
            static: {
                directory: path.join(__dirname, 'docs'),
            }
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(s*)css$/,
                    use: [
                        CssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                },
                {
                    test: /\.svg/,
                    type: 'asset/inline'
                },
                {
                    test: /\.md/,
                    type: 'asset/source'
                }
            ]
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                ENV: env
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(argv.mode)
            }),
            new CssExtractPlugin({
                filename: 'index.css'
            }),
            new HtmlWebpackPlugin({
                template: './docs/src/index.html',
                publicPath: env.production ? '/mdc-react/' : ''
            })
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '@': path.resolve(__dirname, 'docs/src/'),
                '@components': path.resolve(__dirname, 'dist/')
            }
        }
    }
];