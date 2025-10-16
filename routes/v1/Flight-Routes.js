const { FlightController } = require("../../controllers");
const express = require("express");
const router = express.Router();
const { FlightRequestValidation,FlighUpdateRequestValidate } = require("../../middlewares");
const flightController = new FlightController();

router.post(
  "/createflight",
  FlightRequestValidation,
  flightController.handleCreateFlight
);
router.get("/getFlight", flightController.handleGetFlight);
router.get("/getAflight/:id", flightController.handleAFlight);
router.patch("/updateflight/:id", FlighUpdateRequestValidate,flightController.handleupdateFlightSeats);

module.exports = router;
