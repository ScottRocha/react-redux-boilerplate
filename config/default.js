// eslint-disable-next-line no-process-env
const env = process.env;

module.exports = {
  'env': env.NODE_ENV,
  'heroku': env.HEROKU,
  'port': env.PORT || '3000',
};
