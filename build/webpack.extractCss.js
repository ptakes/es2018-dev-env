import { APP_DIR } from '../project.config';
import CssNano from 'cssnano';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PostCssPresetEnv from 'postcss-preset-env';
import PurgeCss from '@fullhuman/postcss-purgecss';

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
              ident: 'postcss',
              plugins: () => [
                PostCssPresetEnv,
                CssNano({
                  preset: 'default'
                }),
                PurgeCss({
                  content: [`${APP_DIR}/**/*.html`, `${APP_DIR}/**/*.js`]
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
    })
  ]
});
