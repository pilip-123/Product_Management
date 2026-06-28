const BaseController = require('./baseController');
const UserModel = require('../models/userModel');

class UserController extends BaseController {
    getAllUsers = (req, res) => {
        UserModel.getAllUsers((err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            return this.success(res, 'Get users successful', result);
        });
    };

    getUserById = (req, res) => {
        const { id } = req.params;

        UserModel.getUserById(id, (err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            if (result.length === 0) {
                return this.notFound(res, 'User not found');
            }
            return this.success(res, 'Get user by id successful', result[0]);
        });
    };

    createUser = (req, res) => {
        UserModel.createUser(req.body, (err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            return this.success(
                res,
                'Create user successful',
                { id: result.insertId, ...req.body },
                201
            );
        });
    };

    updateUser = (req, res) => {
        const { id } = req.params;

        UserModel.updateUser(id, req.body, (err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            if (result.affectedRows === 0) {
                return this.notFound(res, 'User not found');
            }
            return this.success(res, 'Update user successful', { id, ...req.body });
        });
    };

    deleteUser = (req, res) => {
        const { id } = req.params;

        UserModel.deleteUser(id, (err, result) => {
            if (err) {
                return this.error(res, err.message);
            }
            if (result.affectedRows === 0) {
                return this.notFound(res, 'User not found');
            }
            return this.success(res, 'Delete user successful', null, 200);
        });
    };
}

module.exports = UserController;
