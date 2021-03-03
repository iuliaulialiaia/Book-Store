const express = require('express');

const UserService = require('./service.js');
const {validateFields} = require('../utils');

const router = express.Router();

// POST role
router.post('/role',
	async (req, res, next) => {
		const {role} = req.body;
		fields = [{value: role, type: 'role'}];
		try {
			validateFields(fields);
			await UserService.addRole(role);
			res.status(201).end();
		} catch(error) {
			next(error);
		}
	}
);

// GET /role
router.get('/role',
	async (req, res, next) => {
		const roles = await UserService.getRoles();
		res.json(roles);
	}
);

// POST /user
router.post('/user',
	async (req, res, next) => {
		const {
			username,
			password,
			role_id
		} = req.body;
		fields = [
			{value: username, type: 'alphanumeric'},
			{value: password, type: 'strong_password'},
			{value: role_id, type: 'int'}
		];
		try {
			validateFields(fields);
			await UserService.addUser(username, password, role_id);
			res.status(201).end();
		} catch(error) {
			next(error);
		}
	}
);

// GET /user
router.get('/user',
	async (req, res, next) => {
		const users = await UserService.getUsers();
		res.json(users);
	}
);

// POST /login
router.post('/login',
	async (req, res, next) => {
		const {
			username,
			password
		} = req.body;
		fields = [
			{value: username, type: 'alphanumeric'},
			{value: password, type: 'ascii'}
		];
		try {
			validateFields(fields);
			const token = await UserService.getUser(username, password);
			res.status(200).json(token);
		} catch(error) {
			next(error);
		}
	}
);

module.exports = {
	UserController: router
}