import { PROD_BUILD, SRC_DIR } from './buildConfig';
import AutoPrefixer from 'autoprefixer';
import CssNano from 'cssnano';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PostCssPresetEnv from 'postcss-preset-env';
import PurgecssPlugin from 'purgecss-webpack-plugin';
import glob from 'glob';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars

const ensureArray = config => (config && (Array.isArray(config) ? config : [config])) || [];
const when = (condition, config, negativeConfig) => (condition ? ensureArray(config) : ensureArray(negativeConfig));

const cssRules = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: !PROD_BUILD
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        PostCssPresetEnv,
        AutoPrefixer,
        // eslint-disable-next-line new-cap
        CssNano({
          preset: 'default'
        })
      ],
      sourceMap: !PROD_BUILD
    }
  }
];

const sassRules = [
  {
    loader: 'resolve-url-loader'
  },
  {
    loader: 'sass-loader',
    options: {
      prependData: `$baseUrl: "${PROD_BUILD ? '' : process.env.ACCOLADE_SERVER}";`,
      sassOptions: {
        includePaths: ['node_modules'],
        precision: 8, // Needed for Bootstrap.
        sourceMap: !PROD_BUILD
      }
    }
  }
];

/**
 * @return {webpack.Configuration}
 */
export default extractCss => ({
  module: {
    rules: [
      // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
      // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
      {
        test: /\.css$/i,
        // eslint-disable-next-line sort-keys
        issuer: [{ not: [{ test: /\.html$/i }] }],
        use: extractCss
          ? [
              {
                loader: MiniCssExtractPlugin.loader
              },
              ...cssRules
            ]
          : ['style-loader', ...cssRules]
      },
      {
        test: /\.css$/i,
        // eslint-disable-next-line sort-keys
        issuer: [{ test: /\.html$/i }],
        // CSS required in templates cannot be extracted safely
        // because Aurelia would try to require it again in runtime
        use: cssRules
      },
      {
        test: /\.scss$/,
        // eslint-disable-next-line sort-keys
        issuer: /\.[tj]s$/i,
        use: extractCss
          ? [
              {
                loader: MiniCssExtractPlugin.loader
              },
              ...cssRules,
              ...sassRules
            ]
          : ['style-loader', ...cssRules, ...sassRules]
      },
      {
        test: /\.scss$/,
        // eslint-disable-next-line sort-keys
        issuer: /\.html?$/i,
        use: [...cssRules, ...sassRules]
      }
    ]
  },
  plugins: [
    ...when(
      extractCss,
      new MiniCssExtractPlugin({
        chunkFilename: PROD_BUILD ? '[name].[chunkhash].chunk.css' : '[name].[hash].chunk.css',
        filename: PROD_BUILD ? '[name].[chunkhash].bundle.css' : '[name].[hash].bundle.css',
        ignoreOrder: false // Enable to remove warnings about conflicting order
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${SRC_DIR}/**/*`, { nodir: true })
      })
    )
  ]
});
