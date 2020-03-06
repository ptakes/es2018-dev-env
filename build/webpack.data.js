import { BUILD_ENV, PROD_BUILD, SRC_DIR } from './buildConfig';
import { DefinePlugin } from 'webpack';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars, no-duplicate-imports

const ensureArray = config => (config && (Array.isArray(config) ? config : [config])) || [];
const when = (condition, config, negativeConfig) => (condition ? ensureArray(config) : ensureArray(negativeConfig));

/**
 * @return {webpack.Configuration}
 */
export default () => ({
  module: {
    rules: [
      {
        test: /settings\.json$/i,
        use: [{ loader: 'app-settings-loader', options: { env: BUILD_ENV } }]
      },
      {
        test: /\.(csv|tsv)$/,
        // eslint-disable-next-line sort-keys
        include: SRC_DIR,
        use: [
          {
            loader: 'csv-loader',
            options: {
              dynamicTyping: true,
              header: true,
              skipEmptyLines: true
            }
          }
        ]
      },
      {
        test: /\.cson$/,
        // eslint-disable-next-line sort-keys
        include: SRC_DIR,
        loader: 'cson-loader'
      },
      {
        test: /\.json5?$/,
        // eslint-disable-next-line sort-keys
        include: SRC_DIR,
        loader: 'json5-loader'
      },
      {
        test: /\.xml$/,
        // eslint-disable-next-line sort-keys
        include: SRC_DIR,
        use: [
          {
            loader: 'xml-loader',
            options: {
              explicitArray: false,
              explicitRoot: false,
              mergeAttrs: true,
              normalize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...when(
      !PROD_BUILD,
      new DefinePlugin({
        'process.env.ACCOLADE_PASSWORD': JSON.stringify(process.env.ACCOLADE_PASSWORD),
        'process.env.ACCOLADE_SERVER': JSON.stringify(process.env.ACCOLADE_SERVER),
        'process.env.ACCOLADE_USERNAME': JSON.stringify(process.env.ACCOLADE_USERNAME)
      })
    )
  ]
});
