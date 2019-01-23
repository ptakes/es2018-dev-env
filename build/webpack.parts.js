import { appDir, buildDir, rootDir } from './config';
import CleanWebpackPlugin from 'clean-webpack-plugin';

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
