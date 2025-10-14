const { AirportController } = require("../../controllers");
const express = require("express");
const router = express.Router();

const airportController = new AirportController();

router.get("/airport/:id", airportController.handleGetAirport);
router.get("/allairport", airportController.handleGetAllAirport);
router.post("/createairport", airportController.handleCreateAirport);
router.delete("/deleteairport/:id", airportController.handleDeleteAirport);
router.patch("/updateairport/:id", airportController.handleUpdateAirport);

module.exports = router;
