const BaseController = require('./baseController');
const ProductModel = require('../models/productModel');

class ProductController extends BaseController {
    getAllProducts = (req, res) => {
        ProductModel.getAllProducts((err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            return this.success(res, 'Get products successful', result);
        });
    };

    getProductById = (req, res) => {
        const { id } = req.params;

        ProductModel.getProductById(id, (err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            if (result.length === 0) {
                return this.notFound(res, 'Product not found');
            }
            return this.success(res, 'Get product by id successful', result[0]);
        });
    };

    createProduct = (req, res) => {
        ProductModel.createProduct(req.body, (err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            return this.success(
                res,
                'Create product successful',
                { id: result.insertId, ...req.body },
                201
            );
        });
    };

    updateProduct = (req, res) => {
        const { id } = req.params;

        ProductModel.updateProduct(id, req.body, (err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            if (result.affectedRows === 0) {
                return this.notFound(res, 'Product not found');
            }
            return this.success(res, 'Update product successful', { id, ...req.body });
        });
    };

    deleteProduct = (req, res) => {
        const { id } = req.params;

        ProductModel.deleteProduct(id, (err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            if (result.affectedRows === 0) {
                return this.notFound(res, 'Product not found');
            }
            return this.success(res, 'Delete product successful');
        });
    };
}

module.exports = ProductController;
