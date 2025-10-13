const { CrudRepo } = require("./crud-repo");
const {City} = require('../models');

class CityRepositories extends CrudRepo
{
      constructor()
      {
        super(City)
      }
}

module .exports = {CityRepositories}