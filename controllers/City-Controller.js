const { Cityservice } = require("../services");
const { ApiError } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils");

class CityController {
  constructor() {
    this.CityService = new Cityservice();
    this.createCityHandler = this.createCityHandler.bind(this);
    this.getCityHandler = this.getCityHandler.bind(this);
    this.getAllCityHandler = this.getAllCityHandler.bind(this);
    this.updateCityHandler = this.updateCityHandler.bind(this);
    this.deleteCityHandler = this.deleteCityHandler.bind(this);
  }
  async createCityHandler(req, res) {
    try {
      console.log("req Body->", req?.body);
      const response = await this.CityService.createCity({
        name: req?.body?.name,
      });
      successResponse.message = "City created";
      successResponse.data = response;
      return res.status(StatusCodes.CREATED).json(successResponse);
    } catch (e) {
      console.log(e);
      errorResponse.message = "Error in creating City in Controller";
      errorResponse.error = e;
      return res.status(e.statusCode).json(errorResponse);
    }
  }
  async getAllCityHandler(req, res) {
    try {
      const response = await this.CityService.getAllCity();
      successResponse.message = "All City Fetched";
      successResponse.data = response;
      return res.status(StatusCodes.CREATED).json(successResponse);
    } catch (e) {
      console.log("e->", e);
      errorResponse.message = "Error in Getting all City in Controller";
      errorResponse.error = e;
      return res.status(e.statusCode).json(errorResponse);
    }
  }
  async getCityHandler(req, res) {
    try {
      const _id = parseInt(req?.params?.id);
      const response = await this.CityService.getCity(_id);
      if (!response) {
        throw new ApiError("No any data with this ID", StatusCodes.NOT_FOUND);
      }
      successResponse.message = "City Fetched";
      successResponse.data = response;
      return res.status(StatusCodes.CREATED).json(successResponse);
    } catch (e) {
      console.log("e", e);
      errorResponse.message = e.message;
      errorResponse.error = e;
      return res.status(e.statusCode).json(errorResponse);
    }
  }
  async deleteCityHandler(req, res) {
    try {
      const id = parseInt(req?.params?.id);
      const response = await this.CityService.deleteCity(id);
      successResponse.data = response;
      successResponse.message = "Successfully deleted the City.";
      return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      errorResponse.error = error;
      errorResponse.message = error.message;
      return res.status(error.statusCode).json(errorResponse);
    }
  }
  async updateCityHandler(req, res) {
    try {
      const id = parseInt(req?.params?.id);
      const data = req?.body;
      const response = await this.CityService.updateCity(id, data);
      successResponse.data = response;
      successResponse.message = "Successfully Updated the City.";
      return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      console.log("error->", error);
      errorResponse.error = error;
      errorResponse.message = error.message;
      console.log(typeof error.statusCode);

      return res.status(error.statusCode).json(errorResponse);
    }
  }
}

module.exports = { CityController };
