const Share = require('../models/share');
const jwt = require('jwt-simple');
const config = require('../services/config')
const mongoose = require('mongoose')
const redisClient = require('redis');
const redisClient = redis.createClient({host : 'localhost', port : 6379});

redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function(error) {
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
