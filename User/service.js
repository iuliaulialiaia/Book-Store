const {query} = require('../data');
const {createToken} = require('../security/JWT');
const {hash, compare} = require('../security/Password');
const {ServerError} = require('../errors');

async function addRole(role) {
	const sql_query = 'INSERT INTO role (role) VALUES ($1)';
	await query(sql_query, [role]);
}

async function getRoles() {
	const sql_query = 'SELECT * FROM role';
	return await query(sql_query);
}

async function getUsers() {
	const sql_query = 'SELECT * FROM users';
	return await query(sql_query);
}

async function addUser(username, plainPassword, role_id) {
	const hashedPassword = await hash(plainPassword);
	const sql_query = ' \
		INSERT INTO \
		users (username, password, role_id) \
		VALUES ($1, $2, $3) \
	';
	await query(sql_query, [username, hashedPassword, role_id]);
}

/**
 * @param {string} username
 * @param {string} password - plain password
 * @returns {string} token
 * @throws {ServerError} daca user-ul nu exista sau daca parola e incorecta
 */
async function getUser(username, password) {
	const sql_query = ' \
		SELECT u.id, u.password, r.role \
		FROM users u, role r \
		WHERE r.id = u.role_id \
		AND u.username = $1 \
	';
	const users = await query(sql_query, [username]);
	if (users.length === 0 ) {
		throw new ServerError(`User-ul cu username-ul ${username} nu exista in sistem.`, 400);
	}
	const user = users[0];

	const matched = await compare(password, user.password);
	if(!matched) {
		throw new ServerError(`Parola incorecta.`, 400);
	}

	const data = {
		id: user.id,
		role: user.role
	};
	const token = createToken(data);
	return token;
}

module.exports = {
	addRole,
	getRoles,
	addUser,
	getUser,
	getUsers
}