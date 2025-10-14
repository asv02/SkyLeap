const { FlightController } = require("../../controllers");
const express = require("express");
const router = express.Router();
const { FlightRequestValidation } = require("../../middlewares");
const flightController = new FlightController();

router.post(
  "/createflight",
  FlightRequestValidation,
  flightController.handleCreateFlight
);
router.get("/getFlight", flightController.handleGetFlight);
router.delete("/deleteflight/:id", flightController.handleDeleteFlight);

module.exports = router;
