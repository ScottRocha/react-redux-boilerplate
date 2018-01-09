const Axios = require("axios");
const config = require("config");

const sendRequest = (method, path, token, data = null, client = null) => {

  let type = method === "get" ? "params" : "data";
  let headers = {
    "api_key": config.api.key,
    "clientIp": client.ip,
  };

  if (token) {

    headers.authorization = token;

  }

  return Axios({
    "url": config.api.url + path,
    method,
    headers,
    [type]: data,
  });

};

class API {

  static get(path, data, token, client) {

    return sendRequest("get", path, token, data, client);

  }

  static post(path, data, token, client) {

    return sendRequest("post", path, token, data, client);

  }

  static put(path, data, token, client) {

    return sendRequest("put", path, token, data, client);

  }

  static remove(path, data, token, client) {

    return sendRequest("delete", path, token, data, client);

  }

}

module.exports = API;
