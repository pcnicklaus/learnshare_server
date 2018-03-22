const Share = require('../models/share');
const jwt = require('jwt-simple');
const config = require('../services/config')
// const ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose')

// mongoose.Types.ObjectId("<object_id>")


// || config.secret
// a note

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
  console.log('req', req.body)

  Share.find()
    .then(shares => res.send(shares))
    .catch(next);
}
// db.messages.find({$text: {$search: "smart birds who cook"}}, {score: {$meta: "text Score"}}).sort({score:{$meta:"text Score"}})

exports.search = function(req, res, next) {
  console.log('req', req.params);

  Share.find({ $text: { $search: req.params.query } })
    .then(shares => {
      console.log('shares', shares)
      res.send(shares)
    })
    .catch(next);
}
// exports.detail = function(req, res, next) {

//   console.log('req.params', req.params);
//   Act.findById(req.params.id)
//     .then(act => {
//       console.log('\nact\n', act)
//       res.send(act)
//     })
//     .catch(next);

// }

// exports.journal = function(req, res, next) {

//   console.log('hereeeeee in journal', req.params);

//   Act.find({ "user": req.params.id })
//     .then(acts => {
//       console.log('acts', acts)
//       res.send(acts)
//     })
//     .catch(next);

// }
//
// exports.signature = function(req, res, next) {
//
//   console.log('here!, yayay', req.body)
//   Act.findByIdAndUpdate(
//     req.params.id,
//     { $push:
//       { "signatures":
//         {
//           name: req.body.name,
//           email: req.body.email,
//           address: req.body.address,
//           date: Date.now()
//         }
//       }
//     },
//     { safe: true, new : true }
//   )
//   .then(model => res.send(model))
//   .catch(next);
//
// }
