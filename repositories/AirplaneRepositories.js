const { Airplane } = require("../models");
const { CrudRepo } = require('./crud-repo');

class AirplaneRepositories extends CrudRepo {
  constructor() {
    super(Airplane);
  }
}

module.exports = { AirplaneRepositories }