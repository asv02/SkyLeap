"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) { 
    await queryInterface.addConstraint("Airports", {
      fields: ["cityId"],
      type: "foreign key",
      name: "Airport_to_City",
      references: {
        table: "Cities",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Airports", "Airport_to_City");
  },
};
