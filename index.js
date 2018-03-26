// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//mongo setup
mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://admin:password@ds123919.mlab.com:23919/heroku_nv3tfzxb', { useMongoClient: true, });
// if (process.env.REDISTOGO_URL) {
// } else {
//   mongoose.connect( 'mongodb://localhost/learnShareDb', { useMongoClient: true, });
// }


// redis client

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//
// app.use((err, req, res, next) => {
//   res.status(422).send({ error: err.message });
// });
// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on:', port);
