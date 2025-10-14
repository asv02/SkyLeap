const { StatusCodes } = require("http-status-codes");
const { AirportRepo } = require("../repositories/Airport-repositories");
const { ApiError } = require("../utils");

class AirportServices extends AirportRepo {
  constructor() {
    super();
  }

  async getairport(id) {
    try {
      const res = await this.get(id);
      if (!res) {
        throw new ApiError(
          "Airport with given ID is not found",
          StatusCodes.NOT_FOUND
        );
      }
      return res;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError(error.message, error.statusCode);
      }
      throw new ApiError(
        "Issue with GetAirport",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getallairport() {
    try {
      const res = await this.getAll();
      if (!res) {
        throw new ApiError("No Airport found", StatusCodes.NOT_FOUND);
      }
      return res;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError(error.message, error.statusCode);
      }
      throw new ApiError(
        "Issue with GetAllAirport",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createairport(data) {
    try {
      const res = await this.create(data);
      return res;
    } catch (error) {
      console.log(error);
      const explanation = [];

      if (error.name === "SequelizeUniqueConstraintError") {
        error.errors.forEach((element) => {
          explanation.push(element.message);
        });
        throw new ApiError(
          `Error in creating Airport in Service layer:${explanation}`,
          StatusCodes.BAD_REQUEST
        );
      }
      throw new ApiError(
        `Error in creating Airport in Service layer`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteairport(id) {
    try {
      const res = await this.delete(id);
      if (!res) {
        throw new ApiError(
          "Airport not found to delete",
          StatusCodes.NOT_FOUND
        );
      }
      return res;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError(error.message, error.statusCode);
      }
      throw new ApiError(
        "Issue with DeleteAirport",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateairport(id, data) {
    try {
      const res = await this.update(id, data);
      if (!res) {
        throw new ApiError(
          "Airport not found to update",
          StatusCodes.NOT_FOUND
        );
      }
      return res;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError(error.message, error.statusCode);
      }
      throw new ApiError(
        "Issue with UpdateAirport",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = { AirportServices };
