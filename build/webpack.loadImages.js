import { default as ImageminPlugin } from 'imagemin-webpack-plugin';

export default (mode = process.env.NODE_ENV) => {
  const options =
    mode === 'production'
      ? {
        compress: true,
        iesafe: true,
        limit: 15000,
        name: 'images/[name].[ext]'
      }
      : {};

  return {
    module: {
      rules: [
        {
          test: /\.(png|je?pg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options
            }
          ]
        },
        {
          test: /\.svg$/,
          use: {
            loader: 'svg-url-loader',
            options: Object.assign({}, options, {
              encoding: 'base64',
              stripdeclarations: true
            })
          }
        }
      ]
    },
    plugins: [
      new ImageminPlugin(
        Object.assign({}, options, {
          test: /\.(jpe?g|png|gif|svg)$/,
          disable: !(options && options.compress) // eslint-disable-line sort-keys
        })
      )
    ]
  };
};
