const Axios = require("axios");
const config = require("config");

const sendRequest = (method, path, token, data = null, client = null, res = null) => {

  let type = method === "get" ? "params" : "data";
  let headers = {
    "api_key": config.api.key,
    "clientIp": client.ip,
  };

  if (token) {

    headers.authorization = token;

  }

  if (data && type === "params") {

    Object.keys(data).forEach((key) => {

      if (data[key].constructor === Array
        && !isNaN(data[key][0])) {

        data[key] = "[" + data[key].toString() + "]";

      }

    });

  }

  const request = Axios({
    "url": config.api.url + path,
    "timeout": 10000,
    method,
    headers,
    [type]: data,
  });

  if (res) {

    request.then((response) => {

      res.status(200).json(response.data);

    }).catch((error) => {

      if (error.response) {

        res.status(400).json({
          "message": error.response.data.message,
          "code": error.response.data.code,
          "results": error.response.data.results,
        });

      } else {

        res.status(400).json({
          "message": error.errno,
          "code": error.code,
          "results": [],
        });

      }

    });

  } else {

    return request;

  }

};

class API {

  static get(path, data, token, client, res) {

    return sendRequest("get", path, token, data, client, res);

  }

  static post(path, data, token, client, res) {

    return sendRequest("post", path, token, data, client, res);

  }

  static put(path, data, token, client, res) {

    return sendRequest("put", path, token, data, client, res);

  }

  static remove(path, data, token, client, res) {

    return sendRequest("delete", path, token, data, client, res);

  }

}

module.exports = API;
