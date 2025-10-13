const { logger } = require("sequelize/lib/utils/logger");
const { AirplaneServices } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils");

class AirplaneController {
  constructor() {
    this.Airplaneservices = new AirplaneServices();
    this.createAirplaneHandler = this.createAirplaneHandler.bind(this);
    this.getAirplaneHandler = this.getAirplaneHandler.bind(this);
    this.getAllAirplaneHandler = this.getAllAirplaneHandler.bind(this);
    this.deleteAirplaneHandler = this.deleteAirplaneHandler.bind(this);
    this.updateAirplaneHandler = this.updateAirplaneHandler.bind(this);
  }

  async createAirplaneHandler(req, res) {
    try {
      console.log("req Body->", req?.body);
      const response = await this.Airplaneservices.createAirplane({
        modelNumber: req.body.modelNumber,
        capacity: parseInt(req.body.capacity),
      });
      successResponse.message = "Airplane created";
      successResponse.data = response;
      return res.status(StatusCodes.CREATED).json(successResponse);
    } catch (e) {
      console.log(e);
      errorResponse.message = "Error in creating airplane in Controller";
      errorResponse.error = e;
      return res.status(e.statusCode).json(errorResponse);
    }
  }

  async getAllAirplaneHandler(req, res) {
    try {
      const response = await this.Airplaneservices.GetAllAirplane();
      successResponse.message = "All Airplane Fetched";
      successResponse.data = response;
      return res.status(StatusCodes.CREATED).json(successResponse);
    } catch (e) {
      console.log("e->", e);
      errorResponse.message = "Error in Getting all airplane in Controller";
      errorResponse.error = e;
      return res.status(e.statusCode).json(errorResponse);
    }
  }

  async getAirplaneHandler(req, res) {
    try {
      const _id = parseInt(req?.params?.id);
      const response = await this.Airplaneservices.GetAirplane("_id");
      successResponse.message = "Airplane Fetched";
      successResponse.data = response;
      return res.status(StatusCodes.CREATED).json(successResponse);
    } catch (e) {
      console.log("e", e);
      errorResponse.message = "Error in Getting  airplane in Controller";
      errorResponse.error = e;
      return res.status(e.statusCode).json(errorResponse);
    }
  }
  async deleteAirplaneHandler(req, res) {
    try {
      const id = parseInt(req?.params?.id);
      const response = await this.Airplaneservices.DeleteAirplane(id);
      successResponse.data = response;
      successResponse.message = "Successfully deleted the airplane.";
      return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      errorResponse.error = error;
      errorResponse.message = error.message;
      return res.status(error.statusCode).json(errorResponse);
    }
  }
  async updateAirplaneHandler(req, res) {
    try {
      const id = parseInt(req?.params?.id);
      const data = req?.body;
      const response = await this.Airplaneservices.updateAirplane(id, data);
      successResponse.data = response;
      successResponse.message = "Successfully Updated the airplane.";
      return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      console.log('error->',error)
      errorResponse.error = error;
      errorResponse.message = error.message;
      console.log(typeof error.statusCode);

      return res.status(error.statusCode).json(errorResponse);
    }
  }
}

module.exports = { AirplaneController };
