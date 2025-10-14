const { StatusCodes } = require("http-status-codes");
const { Flight } = require("../models");
const { ApiError } = require("../utils");
const { CrudRepo } = require("./crud-repo");

class FlightRepositories extends CrudRepo {
  constructor() {
    super(Flight);
  }

  async getAllFlights(query) {
    console.log("query in repo->", query);
    try {
      /*query:{}*/
      const res = await Flight.findAll({
        where: query,
      });
      return res;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}

module.exports = { FlightRepositories };
