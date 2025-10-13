const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const AirplaneRoutes = require("./Airplane-Routers");
const CityRoutes = require('./City-Routes');

router.get("/info", controllers.infoController.info);
router.use("/city_routes", CityRoutes);
router.use("/air", AirplaneRoutes);

module.exports = router;
