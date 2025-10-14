const { FlightController } = require("../../controllers");
const express = require("express");
const router = express.Router();

const flightController = new FlightController();

router.post("/createflight", flightController.handleCreateFlight);
router.delete("/deleteflight/:id", flightController.handleDeleteFlight);

module.exports = router;
