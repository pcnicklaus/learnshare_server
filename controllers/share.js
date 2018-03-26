const Share = require('../models/share');
const jwt = require('jwt-simple');
const config = require('../services/config')
const mongoose = require('mongoose')
const redis = require('redis');

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);
} else {
  var redis = require("redis").createClient();
}

redis.on('ready',function() {
 console.log("Redis is ready");
});

redis.on('error',function(error) {
 console.log("Error in Redis", error);
});

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

  redisClient.get("shares", async (error, result) => {
    if(result) {
      result = await JSON.parse(result);
      res.send(result);
    }
    else {
      Share.find()
        .then(async dbShares => {
          let sharesss = JSON.stringify(dbShares)
          await redisClient.setex("shares", 360, sharesss);
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
