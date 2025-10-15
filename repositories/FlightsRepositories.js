const { StatusCodes } = require("http-status-codes");
const { Flight } = require("../models");
const { Airplane } = require("../models");
const { Airport } = require("../models");
const { City } = require("../models");
const { ApiError } = require("../utils");
const { CrudRepo } = require("./crud-repo");
const { Sequelize } = require("sequelize");

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
        // sort:
        include: [
          Airplane,
          {
            model: Airport,
            on: {
              col1: Sequelize.where(
                Sequelize.col("Flight.departureAirportId"),
                "=",
                Sequelize.col("Airport.airportCode")
              ),
            },
            // as: "Departure_Airport",
            include:City
          },
          {
            model: Airport,
            on: {
              col1: Sequelize.where(
                Sequelize.col("Flight.arrivalAirportId"),
                "=",
                Sequelize.col("Airport.airportCode")
              ),
            },
            // as: "Departure_Airport",
          },
        ],
      });
      return res;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}

module.exports = { FlightRepositories };
