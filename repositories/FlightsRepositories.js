const { StatusCodes } = require("http-status-codes");
const { Flight, sequelize } = require("../models");
const { Airplane } = require("../models");
const { Airport } = require("../models");
const { City } = require("../models");
const { ApiError } = require("../utils");
const { CrudRepo } = require("./crud-repo");
const { Sequelize } = require("sequelize");
const db = require("../models");

class FlightRepositories extends CrudRepo {
  constructor() {
    super(Flight);
  }

  async getAllFlights(query) {
    // console.log("query in repo->", query);
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
            include: City,
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

  async updateSeats(id, seats, desc = true) {
    console.log("UpdateSeat called------>>>");
    try {
      const result = await db.sequelize.transaction(async () => {
        const flight = await this.get(id);
        await db.sequelize.query(
          `SELECT * FROM "Flights" WHERE ID = ${id} FOR UPDATE`
        ); // to lock the row to update
        let response;
        if (desc) {
          response = await flight.decrement("totalSeats", { by: seats });
        } else {
          response = await flight.increment("totalSeats", { by: seats });
        }
        return response;
      });
      return result;
    } catch (error) {
      const e = new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
      throw e;
    }
  }
}

module.exports = { FlightRepositories };
