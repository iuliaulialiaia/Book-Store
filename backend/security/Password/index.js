const bcryptjs = require('bcryptjs');

/**
 * @param {string} plainPassword
 * @returns {string} hashedPassword
 */
async function hash(plainPassword) {
	const salt = await bcryptjs.genSalt(5);
	return await bcryptjs.hash(plainPassword, salt);
}

/**
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {boolean}
 */
async function compare(plainPassword, hashedPassword) {
	return await bcryptjs.compare(plainPassword, hashedPassword);
}

module.exports = {
	hash,
	compare
};