const { where } = require("sequelize");
const { logger } = require("sequelize/lib/utils/logger");

class CrudRepo {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      logger.error("Error in creating CrudRepo Model");
      throw error;
    }
  }

  async delete(data) {
    try {
      await model.destroy({ where: { id: data.id } });
    } catch (error) {
      logger.error("Error in deleting CrudRepo Model");
    }
  }

  async get(data) {
    try {
      const res = await model.findByPk({ id: data.id });
      return res;
    } catch (error) {
      logger.error("Error in getting by Primary key in CrudRepo Model");
    }
  }

  async getAll(data) {
    try {
      const res = await model.findAll({ where: { id: data.id } });
      return res;
    } catch (error) {
      logger.error("Error in getting by Primary key in CrudRepo Model");
    }
  }
}
