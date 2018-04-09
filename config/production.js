// eslint-disable-next-line no-process-env
const env = process.env;

module.exports = {
  "port": env.PORT,
  "api": {
    "url": env.API_URL,
    "key": env.API_KEY,
  },
  "token": {
    "issuer": env.TOKEN_ISSUER,
    "key": env.TOKEN_KEY,
  },
  "nonce": new Buffer(require("uuid/v4")()).toString("base64"),
};
