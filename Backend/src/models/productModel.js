const db = require('../config/db');

exports.getAllProducts = (callback) => {
    db.query('SELECT * FROM products', callback);
};

exports.getProductById = (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

exports.createProduct = (data, callback) => {
    db.query(
        'INSERT INTO products (name, quality, price) VALUES (?, ?, ?)',
        [data.name, data.quality, data.price],
        callback
    );
};

exports.updateProduct = (id, data, callback) => {
    db.query(
        'UPDATE products SET name = ?, quality = ?, price = ? WHERE id = ?',
        [data.name, data.quality, data.price, id],
        callback
    );
};

exports.deleteProduct = (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
};
