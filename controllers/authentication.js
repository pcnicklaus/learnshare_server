const jwt = require('jwt-simple');
const User = require('../models/user');
const Act = require('../models/act');
const config = require('../services/config');
// || config.secret
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret  );
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  console.log('req.user yoooooooo', req.user);

  Act.find({ "user": req.user._id })
    .then(acts => {

      console.log('acts', acts)

      res.send({
        acts: acts,
        user: req.user.id,
        token: tokenForUser(req.user)
      })
    })
    .catch(next);
  // Act.find({user: req.user._id})
  //   .then(acts => res.send({ acts: acts, user: req.user.id, token: tokenForUser(req.user) }))
  //   .catch(next);

  // res.send({ user: req.user.id, token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password,
      name
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the user was created
      res.json({ user: user.id, token: tokenForUser(user) });
    });
  });
}
