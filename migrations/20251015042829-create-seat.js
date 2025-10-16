"use strict";
/** @type {import('sequelize-cli').Migration} */

const { FLIGHT_SEAT_ENUM } = require("../utils");
const { BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = FLIGHT_SEAT_ENUM;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Seats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Airplanes",
          key: "id",
        },
        allowNull: false,
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seatType: {
        type: Sequelize.ENUM,
        values: [BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS],
        allowNull: false,
        defaultValue: ECONOMY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Seats");
  },
};
