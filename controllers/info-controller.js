const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils");

const info = (req, res) => {
  successResponse.message = "Info-Controller API is live";
  return res.status(StatusCodes.OK).json(successResponse);
};

module.exports = {
  info,
};
