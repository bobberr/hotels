const errorHandler = (err, req, res, next) => {
  res.send({ error: err });
};

module.exports = errorHandler;
