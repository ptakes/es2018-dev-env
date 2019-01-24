import { APP_DIR, DEBUG } from './config';

export default () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include: `${APP_DIR}/**/*.js`, // eslint-disable-line sort-keys
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: DEBUG,
                    modules: false, // Let Webpack handle the imports.
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
});
