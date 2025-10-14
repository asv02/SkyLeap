const { StatusCodes } = require("http-status-codes");
const { AirportServices } = require("../services");
const { ApiError, successResponse, errorResponse } = require("../utils");

class AirportController {
  constructor() {
    this.AirportService = new AirportServices();
    this.handleCreateAirport = this.handleCreateAirport.bind(this);

    this.handleDeleteAirport = this.handleDeleteAirport.bind(this);

    this.handleGetAirport = this.handleGetAirport.bind(this);

    this.handleGetAllAirport = this.handleGetAllAirport.bind(this);

    this.handleUpdateAirport = this.handleUpdateAirport.bind(this);
  }

  async handleGetAirport(req, res) {
    try {
      const id = req?.params?.id;
      const response = await this.AirportService.getairport(id);
      successResponse.message = "Airport Found";
      successResponse.data = response;
      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      throw new ApiError(error.message, error.statusCode);
    }
  }

  async handleGetAllAirport(req, res) {
    try {
      const response = await this.AirportService.getallairport();
      successResponse.message = "All Airport Found";
      successResponse.data = response;
      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      throw new ApiError(error.message, error.statusCode);
    }
  }
  async handleCreateAirport(req, res) {
    try {
      const data = {
        name: req?.body?.name,
        airportCode: req?.body?.airportCode,
        address: req?.body?.address,
        cityId: parseInt(req?.body?.cityId),
      };

      const response = await this.AirportService.createairport(data);
      successResponse.message = "Airport Created";
      successResponse.data = response;
      res.status(StatusCodes.CREATED).json(successResponse);
    } catch (error) {
      errorResponse.message = error.message;
      errorResponse.error = error;
      res.status(error.statusCode).json(errorResponse);
    }
  }
  async handleDeleteAirport(req, res) {
    try {
      const id = req?.params?.id;
      const response = await this.AirportService.deleteairport(id);
      successResponse.message = "Airport Deleted";
      successResponse.data = response;
      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      throw new ApiError(error.message, error.statusCode);
    }
  }
  async handleUpdateAirport(req, res) {
    try {
      const id = req?.params?.id;
      const data = req?.body;
      const response = await this.AirportService.updateairport(id, data);
      successResponse.message = "Airport Updated";
      successResponse.data = response;
      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      throw new ApiError(error.message, error.statusCode);
    }
  }
}

module.exports = { AirportController };
