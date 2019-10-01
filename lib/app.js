const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/memes', require('./routes/memes'));

app.use(require('./middleware/not-found'));

app.use(require('./middleware/error'));
module.exports = app;
