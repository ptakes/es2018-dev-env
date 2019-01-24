import AutoPrefixer from 'autoprefixer';

export default () => ({
  module: {
    rules: [
      {
        test: /\.s?css$/,
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
              precision: 8 // Needed for Bootstrap.
            }
          }
        ]
      }
    ]
  }
});
