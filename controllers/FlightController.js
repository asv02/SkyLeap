const { StatusCodes } = require("http-status-codes");
const { FlightServices } = require("../services");
const { ApiError, successResponse, errorResponse } = require("../utils");
const { compareTime } = require("../utils");

class FlightController {
  constructor() {
    this.FlightServices = new FlightServices();
    this.handleCreateFlight = this.handleCreateFlight.bind(this);
    this.handleGetFlight = this.handleGetFlight.bind(this);
    this.handleAFlight = this.handleAFlight.bind(this);
    this.handleupdateFlightSeats = this.handleupdateFlightSeats.bind(this);
  }

  async handleCreateFlight(req, res) {
    try {
      const data = {
        flightNumber: req?.body?.flightNumber,
        airplaneId: parseInt(req?.body?.airplaneId),
        departureAirportId: req?.body?.departureAirportId,
        arrivalAirportId: req?.body?.arrivalAirportId,
        arrivalTime: req?.body?.arrivalTime,
        departureTime: req?.body?.departureTime,
        price: parseInt(req?.body?.price),
        boardingGate: req?.body?.boardingGate,
        totalSeats: parseInt(parseInt(req?.body?.totalSeats)),
      };

      if (!compareTime(data.departureTime, data.arrivalTime)) {
        throw new ApiError("Check the timeings", StatusCodes.BAD_REQUEST);
      }

      const response = await this.FlightServices.createFlight(data);
      successResponse.message = "Flight Created";
      successResponse.data = response;
      res.status(StatusCodes.CREATED).json(successResponse);
    } catch (error) {
      errorResponse.message = error.message;
      errorResponse.error = error;
      res.status(error.statusCode).json(errorResponse);
    }
  }

  async handleGetFlight(req, res) {
    const query = req?.query; //{}
    try {
      const response = await this.FlightServices.getallFlights(query);
      successResponse.message = "Flight";
      successResponse.data = response;
      res.status(StatusCodes.CREATED).json(successResponse);
    } catch (error) {
      errorResponse.message = error.message;
      errorResponse.error = error;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }

  async handleAFlight(req, res) {
    try {
      const id = req?.params?.id;
      const response = await this.FlightServices.getFlight(id);
      successResponse.message = "Flight Fetched";
      successResponse.data = response;
      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      throw new ApiError(error.message, error.statusCode);
    }
  }

  async handleupdateFlightSeats(req, res) {
    try {
      // console.log('Updating seats in  flight......')
      const id = req?.params?.id;
      const seats = parseInt(req?.body?.seats);
      const desc = req?.body?.desc;
      const response = await this.FlightServices.updateFlightSeats(
        id,
        seats,
        desc
      );
      successResponse.message = "Flight Fetched";
      successResponse.data = response;
      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      throw new ApiError(error.message, error.statusCode);
    }
  }
}

module.exports = { FlightController };
