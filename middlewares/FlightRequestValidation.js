const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils");

const FlightRequestValidation = (req, res, next) => {
  if (!req.body.flightNumber) {
    errorResponse.message = "Flight Number not present";
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.airplaneId) {
    errorResponse.message = "Flight Id not present";
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.arrivalAirportId) {
    errorResponse.message = "Arrival Airport ID not present";
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.departureAirportId) {
    errorResponse.message = "Departure Airport ID not present";
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.airplaneId) {
    errorResponse.message = "Flight Id not present";
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.arrivalTime) {
    errorResponse.message = "Arrival time not present";
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.departureTime) {
    errorResponse.message = "Departure Time not present";
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.price) {
    errorResponse.message = "Price not present";
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.totalSeats) {
    errorResponse.message = "Total Seat not present";
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

module.exports = { FlightRequestValidation };
