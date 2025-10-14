const { StatusCodes } = require("http-status-codes");
const { Flight } = require("../models");
const { ApiError } = require("../utils");
const { CrudRepo } = require("./crud-repo");

class FlightRepositories extends CrudRepo {
  constructor() {
    super(Flight);
  }

  async getAllFlights(query) {
    try {
      /*query:{}*/
      const res = await Flight.findAll({
        where: query,
      });
    } catch (error) {
      throw new ApiError(
        "Not able to get flights",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = { FlightRepositories };
