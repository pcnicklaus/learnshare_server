const Share = require('../models/share');
const jwt = require('jwt-simple');
const config = require('../services/config')
const mongoose = require('mongoose')
const redis = require('redis');
const url = require('url');
let client;

if (process.env.REDISTOGO_URL) {
  const redisURL  = url.parse(process.env.REDISTOGO_URL);
  client    = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  client.auth(redisURL.auth.split(":")[1]);

} else {
  client = require("redis").createClient();
}


exports.create = function(req, res, next) {

  console.log('req.body', req.body)

  Share.create(req.body)
    .then(share => {

      console.log("\nact created \n", share)

      Share.find()
        .then(shares => {
          console.log('shares \n', shares)
          res.send(shares)
        })
        .catch(next);
      }
    )
    .catch(next);

}

exports.index = function(req, res, next) {

  client.get("shares", async (error, result) => {
    if(result) {
      result = await JSON.parse(result);
      res.send(result);
    }
    else {
      Share.find()
        .then(async dbShares => {
          let sharesss = JSON.stringify(dbShares)
          await client.setex("shares", 360, sharesss);
          res.send(dbShares);
        })
        .catch(next);
    }
  })
}

exports.search = function(req, res, next) {
  console.log('req', req.params);

  Share.find({ $text: { $search: req.params.query } })
    .then(shares => {
      console.log('shares', shares)
      res.send(shares)
    })
    .catch(next);
}
