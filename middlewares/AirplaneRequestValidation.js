const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils");

const AirplaneRequestValidation = (req, res, next) => {
  if (!req.body.modelNumber) {
    errorResponse.message = "Model Number not provided"
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

module.exports = { AirplaneRequestValidation };
