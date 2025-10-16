const { logger } = require("sequelize/lib/utils/logger");
const { AirplaneRepositories } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { ApiError } = require("../utils");
class AirplaneServices extends AirplaneRepositories {
  constructor() {
    super();
  }

  async createAirplane(data) {
    try {
      // console.log("Creating Airplane at Service layer");
      const airplane = await this.create(data);
      return airplane;
    } catch (error) {
      const errorRes = new ApiError(
        "Error in creating Airplane on service layer",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw errorRes;
    }
  }
  async GetAirplane(data) {
    try {
      const response = await this.get(data);
      // console.log("reponse of get in service layer->", response);
      return response;
    } catch (error) {
      const err = new ApiError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw err;
    }
  }
  async GetAllAirplane() {
    try {
      const response = await this.getAll();
      if (!response) {
        throw new ApiError(
          "Data with provided information not found",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } catch (error) {
      const err = new ApiError(
        "Error in getting all the Airplanes",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw err;
    }
  }

  async DeleteAirplane(data) {
    try {
      const response = await this.delete(data);
      // console.log("response in deleting om service->", response);
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
        "Error in deleting the info about Airplane",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw e;
    }
  }
  async updateAirplane(id, data) {
    try {
      const response = await this.update(id, data);
      return response;
    } catch (error) {
      // console.log("error in Update->", error);
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw error;
      }
      throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = { AirplaneServices };
