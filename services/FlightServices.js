const { logger } = require("sequelize/lib/utils/logger");
const { Op } = require("sequelize");
const { FlightRepositories } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { ApiError } = require("../utils");
const { response } = require("express");
class FlightServices extends FlightRepositories {
  constructor() {
    super();
  }

  async createFlight(data) {
    try {
      // console.log("Creating Flight at Service layer");
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

  async getallFlights(query) {
    const customFilter = {};
    const OneDay = "23:59:59";
    // console.log("query->", query);

    if (query.trips) {
      let [departureAirportId, arrivalAirportId] = query.trips.split("-");
      customFilter.departureAirportId = departureAirportId;
      customFilter.arrivalAirportId = arrivalAirportId;
    }

    if (query.availableSeats) {
      let availableSeats = query.availableSeats;
      customFilter.totalSeats = {
        [Op.gte]: availableSeats,
      };
    }

    if (query.price) {
      let [minPrice, maxPrice] = query.price.split("-");
      customFilter.price = {
        [Op.between]: [
          (minPrice = minPrice ? minPrice : 0),
          (maxPrice = maxPrice ? maxPrice : Number.MAX_SAFE_INTEGER),
        ],
      };
    }

    // if (query.time) {
    //   let temp = new Date(query?.time);
    //   customFilter.departureTime = {
    //     [Op.between]: [],
    //   };
    // }

    try {
      const reponse = await this.getAllFlights(customFilter);
      // console.log("Response->", reponse);
      return reponse;
    } catch (error) {
      throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getFlight(id) {
    try {
      const response = await this.get(id);
      // console.log("response in fetching om service->", response);
      if (!response) {
        throw new ApiError(
          "Flight with provided id not found",
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

  async updateFlightSeats(id, seats, desc) {
    try {
      const resp = await this.updateSeats(id, seats, desc);
      return resp;
    } catch (error) {
      console.log("error------>", error);
      const e = new ApiError(
        "Error in upating the seats about Flight in Service:" + error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      throw e;
    }
  }
}

module.exports = { FlightServices };
