const { Op } = require('sequelize');
const CategoryModel = require('../models/Category');

class CategoriesController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';
        const where = {};

        if (params.description) {
            where.description = {
                [Op.iLike]: `%${params.description}%`
            };
        }

        const categories = await CategoryModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        });
        res.json(categories);
    }

    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            const user = await UserModel.create(data);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    show = async (req, res, next) => {
        const user = await UserModel.findByPk(req.params.userId);
        res.json(user);
    }

    update = async (req, res, next) => {
        try {
            const id = req.params.userId;
            const data = await this._validateData(req.body, id);
            await UserModel.update(data, {
                where: {
                    id: id
                }
            });
            res.json(await UserModel.findByPk(id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    delete = async (req, res, next) => {
        await UserModel.destroy({
            where: {
                id: req.params.userId
            }
        });
        res.json({});
    }

    _validateData = async (data, id) => {
        const attributes = ['name', 'age', 'sex', 'email'];
        const user = {};
        for (const attribute of attributes) {
            if (!data[attribute]) {
                throw new Error(`The attribute "${attribute}" is required.`);
            }
            user[attribute] = data[attribute];
        }

        if (await this._checkIfEmailExists(user.email, id)) {
            throw new Error(`The user with mail address "${user.email}" already exists.`);
        }

        return user;
    }

    _checkIfEmailExists = async (email, id) => {
        const where = {
            email: email
        };

        if (id) {
            where.id = { [Op.ne]: id }; // WHERE id != id
        }

        const count = await UserModel.count({
            where: where
        });

        return count > 0;
    }

}

module.exports = new CategoriesController();