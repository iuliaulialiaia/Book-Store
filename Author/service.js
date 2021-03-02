const {query} = require('../data');

async function add(first_name, last_name) {
	const sql_query = ' \
		INSERT INTO \
		author (first_name, last_name) \
		VALUES ($1, $2) \
	';
	await query(sql_query, [first_name, last_name]);
}

async function getAll() {
	const sql_query = ' \
		SELECT * FROM author \
	';
	return await query(sql_query);
}

async function getById(id) {
	const sql_query = ' \
		SELECT * FROM author \
		WHERE id = $1 \
	';
	return await query(sql_query, [id]);
}

async function getBooksByAuthorId(author_id) {
	const sql_query = ' \
	SELECT b.name \
	FROM author a, book b \
	WHERE a.id = b.author_id \
	AND a.id = $1 \
	';
	return await query(sql_query, [author_id]);
}

async function updateById(id, first_name, last_name) {
	const sql_query = ' \
		UPDATE author \
		SET first_name = $1, last_name = $2 \
		WHERE id = $3 \
	';
	await query(sql_query, [first_name, last_name, id]);
}

async function deleteById(id) {
	const sql_query = ' \
		DELETE FROM author \
		WHERE id = $1 \
	';
	await query(sql_query, [id]);
}

module.exports = {
	add,
	getAll,
	getById,
	getBooksByAuthorId,
	updateById,
	deleteById
};