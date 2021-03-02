const {query} = require('../data');

// GET /publisher
async function getAll() {
	const sql_query = ' \
		SELECT * FROM publisher \
	';
	return await query(sql_query);
}

// GET /publishers/:id
async function getById(id) {
	const sql_query = ' \
		SELECT * FROM publisher \
		WHERE id = $1 \
	';
	return await query(sql_query, [id]);
}

// POST /publishers
async function add(name) {
	const sql_query = ' \
		INSERT INTO \
		publisher (name) \
		VALUES ($1) \
	';
	await query(sql_query, [name]);
}

// PUT /publishers/:id
async function updateById(id, name) {
	const sql_query = ' \
		UPDATE publisher \
		SET name = $1 \
		WHERE id = $2 \
	';
	await query(sql_query, [name, id]);
}

// DELETE /publishers/:id
async function deleteById(id) {
	const sql_query = ' \
		DELETE FROM publisher \
		WHERE id = $1 \
	';
	await query(sql_query, [id]);
}

module.exports = {
	add,
	getAll,
	getById,
	updateById,
	deleteById
};