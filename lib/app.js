const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/songs', require('./controllers/songs'));
app.use('/cats', require('./controllers/cats'));
app.use('/teachers', require('./controllers/teachers'));
app.use('/guitar-pedals', require('./controllers/guitar_pedals'));
app.use('/cities', require('./controllers/cities'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
