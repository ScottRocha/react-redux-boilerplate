/* eslint-disable no-process-env */
module.exports = process.env.NODE_ENV === 'production' ? require('./webpack.production') : require('./webpack.development');
