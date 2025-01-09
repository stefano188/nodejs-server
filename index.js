
const express = require('express');

const helmet = require('helmet');
const morgan = require('morgan');

const chatbot = require('./chatbot');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(helmet());

app.use('/api/chatbot', chatbot);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


