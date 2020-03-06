import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { PROD_BUILD } from './buildConfig';
import TerserJSPlugin from 'terser-webpack-plugin';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars

/**
 * @return {webpack.Configuration}
 */
export default () => ({
  optimization: {
    minimize: PROD_BUILD,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    moduleIds: 'hashed',
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        default: false,

        // This is the HTTP/1.1 optimised cacheGroup configuration
        vendors: {
          enforce: true,
          minSize: 30000,
          name: 'vendors',
          priority: 19,
          test: /[\\/]node_modules[\\/]/
        },
        vendorsAsync: {
          chunks: 'async',
          minSize: 10000,
          name: 'vendors.async',
          priority: 9,
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/
        },
        // eslint-disable-next-line sort-keys
        commonsAsync: {
          chunks: 'async',
          minChunks: 2,
          minSize: 10000,
          name: 'commons.async',
          priority: 0,
          reuseExistingChunk: true
        }
      },
      chunks: 'initial',
      // @ts-ignore
      hidePathInfo: true,
      maxSize: 200000
    }
  }
});
