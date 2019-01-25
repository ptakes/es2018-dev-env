import { DATA_URL_LIMIT } from '../project.config';

export default (mode = process.env.NODE_ENV) => {
  const options =
    mode === 'production'
      ? {
        limit: DATA_URL_LIMIT,
        name: 'fonts/[name].[ext]'
      }
      : {};

  return {
    module: {
      rules: [
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'url-loader',
              options
            }
          ]
        }
      ]
    }
  };
};
