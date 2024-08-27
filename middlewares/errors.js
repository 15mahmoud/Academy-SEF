const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHanlder = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
};

module.exports = {
  notFound,
  errorHanlder,
};







// const notFound = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// const errorHanlder = (err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

//   // Handle Mongoose specific errors
//   if (err.name === "CastError" || err.name === "ValidationError") {
//     res.status(400).json({
//       message: err.message,
//       fields: err.errors, // For ValidationErrors, you may want to send the error details.
//     });
//   } else if (err.name === "MongoError") {
//     res.status(500).json({
//       message: "A database error occurred",
//       error: err.message,
//     });
//   } else {
//     res.status(statusCode).json({
//       message: err.message,
//     });
//   }

//   console.error(err); // Log error for internal tracking
// };

// module.exports = {
//   notFound,
//   errorHanlder,
// };
