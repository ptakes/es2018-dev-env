import { APP_DIR, DEBUG_MODE } from '../project.config';

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
                    debug: DEBUG_MODE,
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
