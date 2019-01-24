import developmentConfig from './build/webpack.development';
import productionConfig from './build/webpack.production';

export default (process.env.NODE_ENV !== 'production' ? developmentConfig : productionConfig);
