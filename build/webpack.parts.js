import { appDir, appName, buildDir, rootDir } from './config';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WatchIgnorePlugin } from 'webpack';
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

export function common({ title } = {}) {
  return merge([
    {
      plugins: [
        new HtmlWebpackPlugin({
          title: title || appName
        })
      ],
      target: 'web'
    },
    loadJavaScript()
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
                      debug: false,
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
