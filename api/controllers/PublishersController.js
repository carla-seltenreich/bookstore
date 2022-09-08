const { Op } = require('sequelize');
const CityModel = require('../models/City');
const StateModel = require('../models/State');
const PublisherModel = require('../models/Publisher');

class PublishersController {

  index = async (req, res, next) => {
    const params = req.query;
    const limit = params.limit || 100;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const sort = params.sort || 'id';
    const order = params.order || 'ASC';
    const where = {};

    if (params.name) {
      where.name = {
        [Op.iLike]: `%${params.name}%`
      };
    }

    const publishers = await PublisherModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [ [sort, order] ],
      include: [{
        model: CityModel,
        required: false,
        attributes: ['name'],
        include: [{
          model: StateModel,
          attributes: ['name']
        }]
      }]
    });
    res.json(publishers);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      console.log(data);
      const publisher = await PublisherModel.create(data);
      res.json(publisher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const publisher = await PublisherModel.findByPk(req.params.publisherId, {
      include: [{
        model: CityModel,
        required: false,
        attributes: ['name'],
        include: [{
          model: StateModel,
          attributes: ['id', 'name']
        }]
      }]
    });

    res.json(publisher);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.publisherId;
      const data = await this._validateData(req.body, id);
      await PublisherModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await PublisherModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await PublisherModel.destroy({
      where: {
        id: req.params.publisherId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'CityId'];
    const publisher = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      publisher[attribute] = data[attribute];
    }

    if (await this._checkIfNameExists(publisher.name, id)) {
      throw new Error(`The publisher with mail address "${publisher.name}" already exists.`);
    }

    return publisher;
  }

  _checkIfNameExists = async (name, id) => {
    const where = {
      name: name
    };

    if (id) {
      where.id = { [Op.ne]: id };
    }

    const count = await PublisherModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new PublishersController();