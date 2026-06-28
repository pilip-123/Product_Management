const db = require('../config/db');

exports.getAllUsers = (callback) => {
    db.query('SELECT * FROM users', callback);
};

exports.getUserById = (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

exports.createUser = (data, callback) => {
    db.query(
        'INSERT INTO users (name, age, gender, email) VALUES (?, ?, ?, ?)',
        [data.name, data.age, data.gender, data.email],
        callback
    );
};

exports.updateUser = (id, data, callback) => {
    db.query(
        'UPDATE users SET name = ?, age = ?, gender = ?, email = ? WHERE id = ?',
        [data.name, data.age, data.gender, data.email, id],
        callback
    );
};

exports.deleteUser = (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
};
