module.exports = function errorHandler(error, req, res, next) {
  // send status code
  res.status(error.status || 500);
  // send error object to client
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
      stack:
        process.env.NODE_ENV === "production"
          ? "Stack not available in production"
          : error.stack,
      type: req.method,
      route: req.originalUrl,
    },
  });
};
