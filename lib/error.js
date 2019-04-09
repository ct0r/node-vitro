module.exports = (status, message, original) => {
  const err = new Error(message);
  err.status = status;
  err.original = original;

  return err;
};
