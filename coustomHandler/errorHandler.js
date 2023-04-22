class coustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode <= 500 ? "fail" : "error";
    this.isOprational = true;
    Error.captureStackTrace(this, this.statusCode);
  }
}
module.exports = coustomError;
