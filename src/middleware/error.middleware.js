exports.errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err.name === "SequelizeUniqueConstraintError") {
      statusCode = 400;
      message = "Email already exists.";
    } else if (err.name === "SequelizeValidationError") {
      statusCode = 400;
      message = err.errors[0].message;
    }

    res.status(statusCode).json({ message });
}