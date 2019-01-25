import { APP_DIR } from '../project.config';

export default () => ({
  module: {
    rules: [
      {
        test: /\.(csv|tsv)$/,
        include: [APP_DIR], // eslint-disable-line sort-keys
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
        include: [APP_DIR], // eslint-disable-line sort-keys
        loader: 'cson-loader' // eslint-disable-line sort-keys
      },
      {
        test: /\.json5$/,
        include: [APP_DIR], // eslint-disable-line sort-keys
        loader: 'json5-loader' // eslint-disable-line sort-keys
      },
      {
        test: /\.xml$/,
        include: [APP_DIR], // eslint-disable-line sort-keys
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
  }
});
