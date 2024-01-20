const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const corsConfig = require('./config/cors.config.js');
const errorCatcher = require('./config/error.config.js');
require('./config/db.config.js');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(corsConfig);
app.use('/api', routes);
app.use(errorCatcher);

module.exports = app;
