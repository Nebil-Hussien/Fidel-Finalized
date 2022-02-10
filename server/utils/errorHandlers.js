module.exports = {
  errorHandler: (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  },
  catchHandler: (error, next, message) => {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    if (message) error = message;
    next(error);
  },
};
