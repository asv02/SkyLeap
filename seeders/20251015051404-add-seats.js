"use strict";

/** @type {import('sequelize-cli').Migration} */
const { FLIGHT_SEAT_ENUM } = require("../utils");
const { BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = FLIGHT_SEAT_ENUM;

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Seats",
      [
        {
          airplaneId: "1",
          row: "1",
          col: "A",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: "1",
          row: "1",
          col: "B",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: "1",
          row: "1",
          col: "C",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: "1",
          row: "2",
          col: "A",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: "1",
          row: "2",
          col: "B",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: "1",
          row: "2",
          col: "C",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: "1",
          row: "3",
          col: "A",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: "1",
          row: "3",
          col: "B",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: "1",
          row: "3",
          col: "C",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
