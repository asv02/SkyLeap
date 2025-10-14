const { logger } = require("sequelize/lib/utils/logger");
const { FlightRepositories } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { ApiError } = require("../utils");
class FlightServices extends FlightRepositories {
  constructor() {
    super();
  }

  async createFlight(data) {
    try {
      console.log("Creating Flight at Service layer");
      const Flight = await this.create(data);
      return Flight;
    } catch (error) {
      let errorRes = new ApiError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );

      if (error.name === "SequelizeForeignKeyConstraintError") {
        errorRes = new ApiError(
          error.detail,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      throw errorRes;
    }
  }

  async getallFlights(query)
  {
      try {
        const reponse = await this.getAllFlights(query);
      } catch (error) {
        
      }
  }

  async DeleteFlight(data) {
    try {
      const response = await this.delete(data);
      console.log("response in deleting om service->", response);
      if (!response) {
        throw new ApiError(
          "Data with provided id not found",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } catch (error) {
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw error;
      }

      const e = new ApiError(
        "Error in deleting the info about Flight",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw e;
    }
  }
}

module.exports = { FlightServices };
