import developmentConfig from './build/webpack.development';
import productionConfig from './build/webpack.prododuction';

export default (process.env.NODE_ENV !== 'production' ? developmentConfig : productionConfig);
