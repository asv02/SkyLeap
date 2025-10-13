const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const AirplaneRoutes = require("./Airplane-Routers");

router.get("/info", controllers.infoController.info);
router.use("/", AirplaneRoutes);

module.exports = router;
