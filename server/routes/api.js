const express = require('express');
const router = new express.Router();

const API = require('../modules/API');

const getIp = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

router.get('*', (req, res) => {

  API.get(req.path.slice(1), req.query, req.get('authorization'), { 'ip': getIp(req) }, res);

});

router.post('*', (req, res) => {

  API.post(req.path.slice(1), req.body, req.get('authorization'), { 'ip': getIp(req) }, res);

});

router.put('*', (req, res) => {

  API.put(req.path.slice(1), req.body, req.get('authorization'), { 'ip': getIp(req) }, res);

});

router.delete('*', (req, res) => {

  API.remove(req.path.slice(1), req.body, req.get('authorization'), { 'ip': getIp(req) }, res);

});

module.exports = router;
