module.exports = function errorHandler(error, req, res, next) {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
      route: req.originalUrl
    }
  });
};