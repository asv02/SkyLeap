"use strict";
const { Model } = require("sequelize");
const { Airplane } = require("../models");
const { FLIGHT_SEAT_ENUM } = require("../utils");
const { BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = FLIGHT_SEAT_ENUM;
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
      });
    }
  }
  Seat.init(
    {
      airplaneId: { type: DataTypes.INTEGER, allowNull: false },
      row: { type: DataTypes.INTEGER, allowNull: false },
      col: { type: DataTypes.STRING, allowNull: false },
      seatType: {
        type: DataTypes.ENUM,
        values: [ECONOMY, BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS],
        defaultValue: ECONOMY,
      },
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
