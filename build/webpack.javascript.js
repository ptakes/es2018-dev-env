import { PROD_BUILD, PROJ_DIR } from './buildConfig';
import path from 'path';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars

/**
 * @return {webpack.Configuration}
 */
export default () => ({
  module: {
    rules: [
      {
        test: /\.js$/i,
        // eslint-disable-next-line sort-keys
        exclude: path.join(PROJ_DIR, 'node_modules'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }]
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs: { proposals: true, version: 3 },
                    loose: true,
                    modules: false, // Let Webpack handle the imports.
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    chunkFilename: PROD_BUILD ? '[name].[chunkhash].chunk.js' : '[name].[hash].chunk.js',
    filename: PROD_BUILD ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
    sourceMapFilename: PROD_BUILD ? '[name].[chunkhash].bundle.map' : '[name].[hash].bundle.map'
  }
});
