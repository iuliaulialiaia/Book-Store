const {ServerError} = require('../../errors');

/**
 * @param {string[]} roles ['ADMIN_ROLE', 'USER_ROLE']
 * @returns middleware function - verifica daca rolurile cerute <= rolurile din cerere
 * @throws {ServerError} daca user-ul nu are rolul necesar
 */
function authorizeRoles(...roles) {
	return (req, res, next) => {
		let i;
		for(i = 0; i < roles.length; i++) {
			if (req.state.data.role === roles[i]) {
				return next();
			}
		}
		throw new ServerError('Nu sunteti autorizat sa accesati resursa', 401);
	};
}

module.exports = {
	authorizeRoles
}