const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils");

const FlightRequestValidation = (req, res, next) => {
  if (!req.body.flightNumber) {
    errorResponse.message = "Flight Number not present";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.airplaneId) {
    errorResponse.message = "Flight Id not present";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.arrivalAirportId) {
    errorResponse.message = "Arrival Airport ID not present";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.departureAirportId) {
    errorResponse.message = "Departure Airport ID not present";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.airplaneId) {
    errorResponse.message = "Flight Id not present";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.arrivalTime) {
    errorResponse.message = "Arrival time not present";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.departureTime) {
    errorResponse.message = "Departure Time not present";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.price) {
    errorResponse.message = "Price not present";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.totalSeats) {
    errorResponse.message = "Total Seat not present";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

const FlighUpdateRequestValidate = (req, res, next) => {
  console.log(req.body.desc);
  console.log(req.body.seats);
  if (!req.body.seats) {
    errorResponse.message = "Seats not present in request";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  if (req.body.desc === undefined) {
    errorResponse.message = "desc not present in request";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};

module.exports = { FlightRequestValidation, FlighUpdateRequestValidate };
