export default () => ({
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
});
