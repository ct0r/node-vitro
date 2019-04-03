const createError = (code, message, original) => {
  const err = new Error(message);
  err.statusCode = code;
  err.originalError = original;

  return err;
};

module.exports = {
  createError
};
