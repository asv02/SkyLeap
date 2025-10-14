const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const AirplaneRoutes = require("./Airplane-Routers");
const CityRoutes = require("./City-Routes");
const AirportRoutes = require("./Airport-Routes");
const FlightRoutes = require("./Flight-Routes");

router.get("/info", controllers.infoController.info);
router.use("/city_routes", CityRoutes);
router.use("/air", AirplaneRoutes);
router.use("/airport_routes", AirportRoutes);
router.use("/flight_routes",FlightRoutes);
module.exports = router;
