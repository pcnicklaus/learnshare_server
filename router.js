const ShareCtrl = require('./controllers/share');
// const UserCtrl = require('./controllers/user');

module.exports = function(app) {
  app.get('/', ShareCtrl.index );
  app.post('/share',  ShareCtrl.create);
  app.get('/share/:query', ShareCtrl.search);
  app.get('/sanity', (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });
}



// const Authentication = require('./controllers/authentication');
// const passportService = require('./services/passport');
// const passport = require('passport');
//
// const requireAuth = passport.authenticate('jwt', { session: false });
// const requireSignin = passport.authenticate('local', { session: false });
//
// module.exports = function(app) {
//   app.get('/', requireAuth, function(req, res) {
//     res.send({ message: 'Super secret code is ABC123' });
//   });
//   app.post('/signin', requireSignin, Authentication.signin);
//   app.post('/signup', Authentication.signup);
// }
