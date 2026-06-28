class BaseController {
    success(res, message = 'success', data = null, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    error(res, message = 'error', data = null, statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message,
            data
        });
    }

    notFound(res, message = 'not found', data = null, statusCode = 404) {
        return res.status(statusCode).json({
            success: false,
            message,
            data
        });
    }
}

module.exports = BaseController;
