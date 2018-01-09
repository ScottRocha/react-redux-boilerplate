const express = require("express");
const router = new express.Router();

const jwt = require("jsonwebtoken");

router.get("/verify", (req, res) => {

  jwt.verify(req.get("authorization"), require("config").token.key, (err, decoded) => {

    if (!err && decoded.exp >= Math.floor(Date.now() / 1000)) {

      res.status(200).json(decoded);

    } else {

      res.status(400).json({
        "message": err.message,
        "result": err.error,
      });

    }

  });

});


module.exports = router;
