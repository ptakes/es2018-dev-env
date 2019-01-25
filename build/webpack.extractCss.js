import { APP_DIR } from '../project.config';
import AutoPrefixer from 'autoprefixer';
import CssNano from 'cssnano';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PureCssPlugin from 'purgecss-webpack-plugin';
import glob from 'glob';

export default () => ({
  module: {
    rules: [
      {
        test: /\.s?css$/,
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
              plugins: () => [
                AutoPrefixer,
                CssNano({
                  preset: 'default'
                })
              ],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              precision: 8, // Needed for Bootstrap.
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new PureCssPlugin({
      paths: glob.sync(`${APP_DIR}/**/*`, { nodir: true })
    })
  ]
});
