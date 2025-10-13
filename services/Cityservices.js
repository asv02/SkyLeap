const { logger } = require("sequelize/lib/utils/logger");
const { CityRepositories } = require("../repositories/CityRepositories");
const {ApiError} = require('../utils');


const { StatusCodes } = require("http-status-codes");

class Cityservice extends CityRepositories {
  constructor() {
    super();
  }

  async createCity(data) {
    try {
      console.log("Creating City at Service layer");
      const city = await this.create(data);
      return city;
    } catch (error) {
      const errorRes = new ApiError(
        "Error in creating Airplane on service layer",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw errorRes;
    }
  }
  async getCity(id) {
    try {
      const response = await this.get(id);
      console.log("reponse of get in service layer->", response);
      return response;
    } catch (error) {
      const err = new ApiError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw err;
    }
  }
  async getAllCity() {
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
        "Error in getting all the Cities",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw err;
    }
  }
  async deleteCity(id) {
    try {
      const response = await this.delete(id);
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
        "Error in deleting the info about Airplane",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw e;
    }
  }
  async updateCity(id, data) {
    try {
      const response = await this.update(id, data);
      return response;
    } catch (error) {
      console.log("error in Update->", error);
      if (error.statusCode === StatusCodes.NOT_FOUND) {
        throw error;
      }
      throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = { Cityservice };
