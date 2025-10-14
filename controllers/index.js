const { AirplaneController } = require("./Airplane-Controllers");
const { CityController } = require("./City-Controller");
const infoController = require("./info-controller");
const { AirportController } = require("./AirportController");
const { FlightController } = require("./FlightController");

module.exports = {
  infoController,
  AirplaneController,
  CityController,
  AirportController,
  FlightController
};
