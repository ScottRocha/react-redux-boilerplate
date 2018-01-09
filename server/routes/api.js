const express = require("express");
const router = new express.Router();

const API = require("../modules/API");

router.get("*", (req, res) => {

  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  API.get(req.path.slice(1), req.query, req.get("authorization"), { ip })
    .then((result) => {

      res.status(200).json(result.data);

    }).catch((error) => {

      res.status(400).json({
        "message": error.response.data.message,
        "code": error.response.data.code,
        "results": error.response.data.results,
      });

    });

});


router.post("*", (req, res) => {

  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  API.post(req.path.slice(1), req.body, req.get("authorization"), { ip })
    .then((result) => {

      res.status(200).json(result.data);

    }).catch((error) => {

      res.status(400).json({
        "message": error.response.data.message,
        "code": error.response.data.code,
        "results": error.response.data.results,
      });

    });

});

router.put("*", (req, res) => {

  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  API.put(req.path.slice(1), req.body, req.get("authorization"), { ip })
    .then((result) => {

      res.status(200).json(result.data);

    }).catch((error) => {

      res.status(400).json({
        "message": error.response.data.message,
        "code": error.response.data.code,
        "results": error.response.data.results,
      });

    });

});

router.delete("*", (req, res) => {

  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  API.remove(req.path.slice(1), req.body, req.get("authorization"), { ip })
    .then((result) => {

      res.status(200).json(result.data);

    }).catch((error) => {

      res.status(400).json({
        "message": error.response.data.message,
        "code": error.response.data.code,
        "results": error.response.data.results,
      });

    });

});

module.exports = router;
