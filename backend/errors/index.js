class ServerError extends Error {
	constructor(message, httpStatus) {
		super(message);
		this.name = this.constructor.name;
		this.httpStatus = this.constructor.httpStatus;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = {
	ServerError
};