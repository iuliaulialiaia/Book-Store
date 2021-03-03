const validator = require('validator');

const {ServerError} = require('../errors');

const roles = ['ADMIN_ROLE', 'USER_ROLE'];

/**
 * @param {Object[]} fields
 * @param {int|string} Object[].value - valoarea pe care o verific
 * @param {string} Object[].type - tipul pe care trebuie sa il aiba valoarea
 * @throws {ServerError} - daca `fields` sunt invalide
 */
function validateFields(fields) {
	for (let fieldName in fields) {
		const fieldValue = fields[fieldName].value + '';
		const fieldType = fields[fieldName].type;

		if (!fieldValue) {
			throw new ServerError(`Lipseste campul ${fieldName}`, process.env.STATUS_USER_ERROR);
		}

		switch(fieldType) {
			case 'ascii':
				if(!validator.isAscii(fieldValue)) {
					throw new ServerError(`Campul ${fieldValue} trebuie sa contina doar caractere ascii.`, process.env.STATUS_USER_ERROR);
				}
				break;
			case 'alpha':
				if(!validator.isAlpha(fieldValue)) {
					throw new ServerError(`Campul ${fieldValue} trebuie sa contina doar litere.`, process.env.STATUS_USER_ERROR);
				}
				break;
			case 'alphanumeric':
				if(!validator.isAlphanumeric(fieldValue)) {
					throw new ServerError(`Campul ${fieldValue} trebuie sa fie alfanumeric.`, process.env.STATUS_USER_ERROR);
				}
				break;
			case 'int':
				if(!validator.isInt(fieldValue)) {
					throw new ServerError(`Campul ${fieldValue} trebuie sa fie un numar intreg.`, process.env.STATUS_USER_ERROR);
				}
				break;
			case 'jwt':
				if(!validator.isJWT(fieldValue)) {
					throw new ServerError(`Campul ${fieldValue} trebuie sa fie un string JWT.`, process.env.STATUS_USER_ERROR);
				}
				break;
			case 'role':
				if(roles.indexOf(fieldValue) === -1) {
					throw new ServerError(`Campul ${fieldValue} trebuie sa fie un rol.`, process.env.STATUS_USER_ERROR);
				}
				break;
			case 'strong_password':
				if(!validator.isStrongPassword(fieldValue)) {
					throw new ServerError(`Parola ${fieldValue} nu este puternica.`, process.env.STATUS_USER_ERROR);
				}
				break;
			}
	}
}

module.exports = {
	validateFields
};