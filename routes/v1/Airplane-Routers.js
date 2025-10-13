const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const {AirplaneRequestValidation} = require('../../middlewares');

const Airplane = new controllers.AirplaneController();

router.post("/airplane", AirplaneRequestValidation,Airplane.createAirplaneHandler);
router.get("/airplane/:id",Airplane.getAirplaneHandler)
router.get("/airplanes",Airplane.getAllAirplaneHandler)
router.delete("/airplanes/:id",Airplane.deleteAirplaneHandler);
router.patch("/update_airplanes/:id",Airplane.updateAirplaneHandler);

module.exports = router;
