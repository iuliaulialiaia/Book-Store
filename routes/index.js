const express = require('express');
const {AuthorController} = require('../Author/controller.js');
const {BookController} = require('../Book/controller.js');
const {PublisherController} = require('../Publisher/controller.js');

const app = express();

app.use('/author', AuthorController);
app.use('/book', BookController);
app.use('/publisher', PublisherController);

module.exports = {
	routes: app
};