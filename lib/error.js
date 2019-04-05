module.exports = (code, message, original) => {
  const err = new Error(message);
  err.code = code;
  err.original = original;
  err.vitro = true;

  return err;
};
