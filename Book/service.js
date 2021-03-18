const {query} = require('../data');

// GET /books
async function getAll() {
	const sql_query = ' \
		SELECT \
		concat(a.first_name, \' \', a.last_name) as \"Autor\", \
		b.name as \"Carte\", \
		p.name as \"Editura\", \
		pb.price as \"Pret\" \
		FROM author a, book b, publisher p, publisher_book pb\
		WHERE a.id = b.author_id \
		AND p.id = pb.publisher_id \
		AND b.id = pb.book_id \
	';
	return await query(sql_query);
}

// GET /books/:id
async function getById(id) {
	const sql_query = ' \
		SELECT \
		concat(a.first_name, \' \', a.last_name) as \"Autor\", \
		b.name as \"Nume\", \
		p.name as \"Editura\", \
		pb.price as \"Pret\" \
		FROM author a, book b, publisher p, publisher_book pb \
		WHERE a.id = b.author_id \
		AND b.id = $1 \
		AND p.id = pb.publisher_id \
		AND b.id = pb.book_id \
	';
	return await query(sql_query, [id]);
}

// POST /books
async function add(name, author_id) {
	const sql_query = ' \
		INSERT INTO \
		book (name, author_id) \
		VALUES ($1, $2) \
	';
	await query(sql_query, [name, author_id]);
}

// PUT /books/:id
async function updateById(id, name, author_id) {
	const sql_query = ' \
		UPDATE book \
		SET name = $1, author_id = $2 \
		WHERE id = $3 \
	';
	await query(sql_query, [name, author_id, id]);
}

// DELETE /books/:id
async function deleteById(id) {
	const sql_query = ' \
		DELETE FROM book \
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