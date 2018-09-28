exports.ExpressError = class ExpressError extends Error {
	constructor(message, code) {
		super(message);
		this.name = "ExpressError";
		this.errorCode = code;
	}
}