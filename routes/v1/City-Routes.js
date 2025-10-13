const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");

const City = new controllers.CityController();

router.post("/city", City.createCityHandler);
router.get("/city/:id",City.getCityHandler)
router.get("/city",City.getAllCityHandler)
router.delete("/city/:id",City.deleteCityHandler);
router.patch("/update_city/:id",City.updateCityHandler);

module.exports = router;
