const { Op } = require('sequelize');
const BookModel = require('../models/Book');
const PublisherModel = require('../models/Publisher');
const CategoryModel = require('../models/Category');


class BooksController {

    index = async (req, res, next) => {
        const params = req.query;
        const limit = params.limit || 100;
        const page = params.page || 1;
        const offset = (page - 1) * limit;
        const sort = params.sort || 'id';
        const order = params.order || 'ASC';
        const where = {};

        if (params.title) {
            where.title = {
                [Op.iLike]: `%${params.title}%`
            };
        }

        if (params.author) {
            where.author = {
                [Op.iLike]: `%${params.author}%`
            };
        }

        if (params.publication_year) {
            where.publication_year = {
                [Op.like]: `%${params.publication_year}%`
            };
        }
        if (params.pages) {
            where.pages = {
                [Op.like]: `%${params.pages}%`
            };
        }
        const books = await BookModel.findAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [[sort, order]],
            include: [
                {
                    model: CategoryModel,
                    require: false,
                    attributes: ['description']
                },
                {
                    model: PublisherModel,
                    require: false,
                    attributes: ['name']
                }
            ]
        });
        res.json(books);
    }

    create = async (req, res, next) => {
        try {
            const data = await this._validateData(req.body);
            const book = await BookModel.create(data);
            res.json(book);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    show = async (req, res, next) => {
        const book = await BookModel.findByPk(req.params.bookId, {
            include: [{
                model: CategoryModel,
                require: false,
                attributes: ['description']
            }],
            include: [{
                model: PublisherModel,
                require: false,
                attributes: ['name']
            }]
        })
        res.json(book);
    }

    update = async (req, res, next) => {
        try {
            const id = req.params.bookId;
            const data = await this._validateData(req.body, id);
            await BookModel.update(data, {
                where: {
                    id: id
                }
            });
            res.json(await BookModel.findByPk(id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    delete = async (req, res, next) => {
        await BookModel.destroy({
            where: {
                id: req.params.bookId
            }
        });
        res.json({});
    }

    _validateData = async (data) => {
        const attributes = ['title', 'author', 'publication_year', 'pages', 'CategoryId', 'PublisherId'];
        const book = {};
        for (const attribute of attributes) {
            if (!data[attribute]) {
                throw new Error(`The attribute "${attribute}" is required.`);
            }
            book[attribute] = data[attribute];
        }
        // if (await this._checkIIdExists(book.id)) {
        //     throw new Error(`The book with id "${book.id}" already exists.`);
        // }

        return book;
    }

    // _checkIfIdExists = async (title, ) => {
    //     const where = {
    //         title : title
    //     };

    //     // if (id) {
    //     //     where.id = { [Op.ne]: id }; // WHERE id != id
    //     // }

    //     const count = await BookModel.count({
    //         where: where
    //     });

    //     return count > 0;
    

}

module.exports = new BooksController();