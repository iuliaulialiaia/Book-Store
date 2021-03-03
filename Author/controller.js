const express = require('express');

const AuthorService = require('./service.js');
const {extractRole} = require('../security/JWT');
const {authorizeRoles} = require('../security/Role');
const {validateFields} = require('../utils');
const {ServerError} = require('../errors');

const router = express.Router();

// GET /author
router.get('/', extractRole, authorizeRoles('ADMIN_ROLE', 'USER_ROLE'),
	async (req, res, next) => {
		try {
			const authors = await AuthorService.getAll();
			res.json(authors);
		} catch(err) {
			// pasez eroarea la handler-ul de erori declarat ca middleware in start.js
			next(err);
		}
	}
);

// GET /author/:id
router.get('/:id', extractRole, authorizeRoles('ADMIN_ROLE', 'USER_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		try {
			fields = [{value: id, type: 'int'}];
			validateFields(fields);
			const author = await AuthorService.getById(parseInt(id));
			res.json(author);
		} catch(err) {
			next(err);
		}
	}
);

// GET /author/:id/books
router.get('/:id/books', extractRole, authorizeRoles('ADMIN_ROLE', 'USER_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		try {
			fields = [{value: id, type: 'int'}];
			validateFields(fields);
			const books = await AuthorService.getBooksByAuthorId(parseInt(id));
			res.json(books);
		} catch(err) {
			next(err);
		}
	}
);

// POST /author
// corpul cererii {first_name, last_name}
router.post('/', extractRole, authorizeRoles('ADMIN_ROLE'),
	async (req, res, next) => {
		const {first_name, last_name} = req.body;
		try {
			const fields = [
				{value: first_name, type: 'alpha'},
				{value: last_name, type: 'alpha'}
			];
			validateFields(fields);
			await AuthorService.add(first_name, last_name);
			res.status(parseInt(process.env.STATUS_OK)).end();
		} catch(err) {
			next(err);
		}
	}
);

// PUT /author/:id
// corpul cererii este {first_name, last_name}
router.put('/:id', extractRole, authorizeRoles('ADMIN_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		const {first_name, last_name} = req.body;
		try {
			fields = [
				{value: id, type: 'int'},
				{value: first_name, type: 'alpha'},
				{value: last_name, type: 'alpha'}
			];
			validateFields(fields);
			await AuthorService.updateById(parseInt(id), first_name, last_name);
			res.status(parseInt(process.env.STATUS_OK)).end();
		} catch(err) {
			next(err);
		}
	}
);

// DELETE /author/:id
router.delete('/:id', extractRole, authorizeRoles('ADMIN_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		try {
			fields = [{value: id, type: 'int'}];
			validateFields(fields);
			await AuthorService.deleteById(id);
			res.status(parseInt(process.env.STATUS_CREATED)).end();
		} catch(err) {
			next(err);
		}
	}
);

module.exports = {
	AuthorController: router
};