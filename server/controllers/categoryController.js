const Category = require('../models/Category');

class CategoryController {

    async createCategory(req, res) {
        try {
            const createCateg = new Category(req.body);
            const newCateg = await createCateg.save();
            res.status(201).json(newCateg);
        }catch(err) {
            res.status(500).json(err);   
        }
    }

    async getCategory(req, res) {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        }catch(err) {
            res.status(500).json(err);   
        }
    }

}

module.exports = new CategoryController();
