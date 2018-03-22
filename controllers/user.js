const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../services/config')
const ExtractJwt = require('passport-jwt').ExtractJwt;


exports.getUser = function(req, res, next) {

  let token = ExtractJwt.fromHeader('authorization')
  console.log('token', token);

  const decoded = jwt.decode(req.headers.authorization, config.secret)
  console.log('decoded', decoded);

  // console.log('deconded', decoded)
  User.findById(decoded.sub)
    .then(user => {
      console.log('user', user);
      res.send(user)
    })
    .catch(next);

}

exports.updateUser = function(req, res, next) {

  User.findByIdAndUpdate(req.user.id, req.body, { new: true })
    .then(user => res.send(user))
    .catch(next)

}
