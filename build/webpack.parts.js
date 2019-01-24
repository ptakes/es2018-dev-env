import { EnvironmentPlugin, WatchIgnorePlugin } from 'webpack';
import { appDir, appName, buildDir, debugMode, rootDir } from './config';
import AutoPrefixer from 'autoprefixer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PureCssPlugin from 'purgecss-webpack-plugin';
import glob from 'glob';
import merge from 'webpack-merge';
import path from 'path';

export function clean({ paths, exclude } = {}) {
  return {
    plugins: [
      new CleanWebpackPlugin(paths || [buildDir], {
        exclude,
        root: rootDir,
        verbose: false
      })
    ]
  };
}

export function common({ mode, devtool, favicon, template, title } = {}) {
  return merge([
    {
      devtool: devtool || (mode === 'production' ? 'source-map' : 'inline-source-map'),
      entry: {
        index: [path.join(rootDir, 'src/app'), path.join(rootDir, 'src/index')]
      },
      mode: mode || 'development',
      output: {
        filename: '[name].js',
        path: mode === 'production' ? buildDir : appDir,
        publicPath: '/'
      },
      plugins: [
        new EnvironmentPlugin(['NODE_ENV']),
        new HtmlWebpackPlugin({
          favicon: favicon || `${appDir}/favicon.ico`,
          filename: 'index.html',
          inject: true,
          template: template || `${appDir}/index.html`,
          title: title || appName
        })
      ],
      target: 'web'
    }
  ]);
}

export function devServer({ host, port } = {}) {
  return {
    devServer: {
      host: host || 'localhost',
      open: true,
      overlay: true,
      port: port || 3000,
      stats: 'errors-only',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    plugins: [new WatchIgnorePlugin([buildDir, path.join(rootDir, 'build'), path.join(rootDir, 'node_modules')])]
  };
}

export function extractCss({ include, exclude, paths } = {}) {
  return {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          include, // eslint-disable-line sort-keys
          exclude, // eslint-disable-line sort-keys
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [AutoPrefixer],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                precision: 8,
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new PureCssPlugin({
        paths: paths || glob.sync(`${appDir}/**/*`, { nodir: true })
      })
    ]
  };
}

export function loadCss({ include, exclude } = {}) {
  return {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          include, // eslint-disable-line sort-keys
          exclude, // eslint-disable-line sort-keys
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [AutoPrefixer]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                precision: 8
              }
            }
          ]
        }
      ]
    }
  };
}

export function loadJavaScript({ include, exclude } = {}) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: include || `${appDir}/**/*.js`, // eslint-disable-line sort-keys
          exclude, // eslint-disable-line sort-keys
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      debug: debugMode,
                      modules: false,
                      useBuiltIns: 'usage'
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    }
  };
}

export function optimize() {
  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            enforce: true,
            name: 'vendor',
            test: /node_modules/
          }
        }
      }
    }
  };
}
