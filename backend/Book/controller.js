const express = require('express');

const BookService = require('./service.js');
const {extractRole} = require('../security/JWT');
const {authorizeRoles} = require('../security/Role');
const {validateFields} = require('../utils');
const {ServerError} = require('../errors');

const router = express.Router();

// GET /book
router.get('/', extractRole, authorizeRoles('ADMIN_ROLE', 'USER_ROLE'),
	async (req, res, next) => {
		try {
			const books = await BookService.getAll();
			res.json(books);
		} catch(err) {
			// pasez eroarea la handler-ul de erori declarat ca middleware in start.js
			next(err);
		}
	}
);

// GET /book/:id
router.get('/:id', extractRole, authorizeRoles('ADMIN_ROLE', 'USER_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		try {
			fields = [{value: id, type: 'int'}];
			validateFields(fields);
			const book = await BookService.getById(parseInt(id));
			res.json(book);
		} catch(err) {
			next(err);
		}
	}
);

// POST /book
// corpul cererii {name, author_id}
router.post('/', extractRole, authorizeRoles('ADMIN_ROLE'),
	async (req, res, next) => {
		const {name, author_id} = req.body;
		try {
			const fields = [
				{value: name, type: 'ascii'},
				{value: author_id, type: 'int'}
			];
			validateFields(fields);
			await BookService.add(name, parseInt(author_id));
			res.status(200).end();
		} catch(err) {
			next(err);
		}
	}
);

// PUT /book/:id
// corpul cererii este {name, author_id}
router.put('/:id', extractRole, authorizeRoles('ADMIN_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		const {name, author_id} = req.body;
		try {
			fields = [
				{value: id, type: 'int'},
				{value: name, type: 'ascii'},
				{value: author_id, type: 'int'}
			];
			validateFields(fields);
			await BookService.updateById(parseInt(id), name, parseInt(author_id));
			res.status(200).end();
		} catch(err) {
			next(err);
		}
	}
);

// DELETE /book/:id
router.delete('/:id', extractRole, authorizeRoles('ADMIN_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		try {
			fields = [{value: id, type: 'int'}];
			validateFields(fields);
			await BookService.deleteById(id);
			res.status(204).end();
		} catch(err) {
			next(err);
		}
	}
);

module.exports = {
	BookController: router
};