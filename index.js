// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost/learnShareDb', { useMongoClient: true, });

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
