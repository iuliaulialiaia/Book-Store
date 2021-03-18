const jwt = require('jsonwebtoken');

const {ServerError} = require('../../errors');
const {validateFields} = require('../../utils');

const options = {
	issuer: process.env.JWT_ISSUER,
	subject: process.env.JWT_SUBJECT,
	audience: process.env.JWT_AUDIENCE
};

// token = {header cu optiuni}.{data}.{semnatura cu cheie secreta}

/**
 * Creaza un token in functie de data/payload
 * @param {Object} data - {id, role}
 * @returns {string} token
 */
function createToken(data) {
	return jwt.sign(data, process.env.JWT_SECRET_KEY, options);
}

// extrage token din header
// valideaza token
// extrage data/payload din token
function extractRole(req, res, next) {
	if (!req.headers.authorization) {
		const error = new ServerError('Cerere fara header de autorizare', 403);
		return next(error);
	}
	// se separa dupa " " deoarece este de forma: Bearer 1wqeiquqwe0871238712qwe
	const token = req.headers.authorization.split(" ")[1];

	fields = [{value: token, type: 'jwt'}];
	try {
		validateFields(fields);
		const data = jwt.verify(token, process.env.JWT_SECRET_KEY, options);
		req.state = {data};
		next();
	} catch(error) {
		console.trace(error);
		next(error);
	}
}

module.exports = {
	createToken,
	extractRole
};