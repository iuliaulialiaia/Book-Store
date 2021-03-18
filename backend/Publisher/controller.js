const express = require('express');

const PublisherService = require('./service.js');
const {extractRole} = require('../security/JWT');
const {authorizeRoles} = require('../security/Role');
const {validateFields} = require('../utils');
const {ServerError} = require('../errors');

const router = express.Router();

// GET /publisher
router.get('/', extractRole, authorizeRoles('ADMIN_ROLE', 'USER_ROLE'),
	async (req, res, next) => {
		try {
			const publishers = await PublisherService.getAll();
			res.json(publishers);
		} catch(err) {
			// pasez eroarea la handler-ul de erori declarat ca middleware in start.js
			next(err);
		}
	}
);

// GET /publisher/:id
router.get('/:id', extractRole, authorizeRoles('ADMIN_ROLE', 'USER_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		try {
			fields = [{value: id, type: 'int'}];
			validateFields(fields);
			const publisher = await PublisherService.getById(parseInt(id));
			res.json(publisher);
		} catch(err) {
			next(err);
		}
	}
);

// POST /publisher
// corpul cererii {name}
router.post('/', extractRole, authorizeRoles('ADMIN_ROLE'),
	async (req, res, next) => {
		const {name} = req.body;
		try {
			const fields = [{value: name, type: 'alpha'}];
			validateFields(fields);
			await PublisherService.add(name);
			res.status(parseInt(process.env.STATUS_OK)).end();
		} catch(err) {
			next(err);
		}
	}
);

// PUT /publisher/:id
// corpul cererii este {name}
router.put('/:id', extractRole, authorizeRoles('ADMIN_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		const {name} = req.body;
		try {
			fields = [
				{value: id, type: 'int'},
				{value: name, type: 'alpha'}
			];
			validateFields(fields);
			await PublisherService.updateById(parseInt(id), name);
			res.status(parseInt(process.env.STATUS_OK)).end();
		} catch(err) {
			next(err);
		}
	}
);

// DELETE /publisher/:id
router.delete('/:id', extractRole, authorizeRoles('ADMIN_ROLE'),
	async (req, res, next) => {
		const {id} = req.params;
		try {
			fields = [{value: id, type: 'int'}];
			validateFields(fields);
			await PublisherService.deleteById(id);
			res.status(parseInt(process.env.STATUS_CREATED)).end();
		} catch(err) {
			next(err);
		}
	}
);

module.exports = {
	PublisherController: router
};