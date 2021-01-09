const sqlite3 = require('sqlite3').verbose();
exports.DataBase = void 0;

var DataBase = /** @class */ (function () {
    function DataBase(filePath = ':memory:') {
        console.log(filePath);
        this.database = new sqlite3.Database(filePath, (error) => {
            if (null != error) {
                console.error('Could not connect to database' + error);
            } else {
                console.log('Connected to database');
            }
        });  //TODO: handle exception
    }

    DataBase.prototype.init = function (callback) {
        return new Promise((resolve, reject) => {
            this.database.serialize(() => {
                //TODO: hash INTEGER,
                let createTable = `CREATE TABLE IF NOT EXISTS clipboard (
                    id INTEGER PRIMARY KEY,
                    time INTEGER,
                    content TEXT)`;
                this.database.run(createTable, (error) => {
                    if(error) {
                        console.error('create table error: ' + error);
                        return reject(error);
                    } else {
                        console.log('create table success.');
                    }
                });

                // this.database.all("SELECT * FROM clipboard ORDER BY time desc",[], callback);
                this.database.all("SELECT * FROM clipboard ORDER BY time desc",[], (error, result) => {
                    console.log('Database init: ');
                    if(error) {
                        console.log('select all error: ' + error);
                        return reject(error);
                    }

                    return resolve(result);
                });
            });
        });
        }

    DataBase.prototype.handleError = function (error) {
        if(null !== error) {
            console.trace('Database failed. error: ' + error);
        }
    }

    DataBase.prototype.insert = function (item) {
        // this.database.serialize(() => {
            let insertString = `INSERT INTO clipboard (id, time, content) VALUES (?, ?, ?)`;
            this.database.run(insertString, [item.id, item.time, item.content]);
        // });
    }

    DataBase.prototype.insertMore = function (items, callback) {
        let insertString = `INSERT INTO clipboard VALUES(?)`;
        var statement = this.database.prepare(insertString, callback);
        items.each((item) => {
            statement.run(item.id + ',' + item.time + ',' + item.content);
        }, callback);
        statement.finalize(callback);
    };

    DataBase.prototype.update = function (item) {
        // this.database.serialize(() => {
        let updateString = 'UPDATE clipboard SET time = ?, content = ? WHERE id = ?';
        this.database.run(updateString, [item.time, item.content, item.id]);
        // });
    }

    DataBase.prototype.getAll = function() {
        return new Promise((resolve, reject) => {
            this.database.all("SELECT * FROM clipboard ORDER BY time desc", (error, result) => {  //TODO: limit 20
                console.log('Database getAll: ');
                if(error) {
                    console.log('select all error: ' + error);
                    return reject(error);
                }

                return resolve(result);
            });
        });
    }

    DataBase.prototype.updateMore = function (items, callback) {
        let updateString = `UPDATE clipboard SET ?`;
        var statement = this.database.prepare(updateString, callback);
        items.each((item) => {
            statement.run('time = ' + item.time + ', content = ' + item.content + ' WHERE id = ' + item.id, callback);
        }, callback);
        statement.finalize(callback);
    }

    DataBase.prototype.filter = function (content) {
        let filterString = `SELECT * FROM clipboard WHERE content LIKE '%` + content + `%' ORDER BY time desc`;
        return new Promise((resolve, reject) => {
            this.database.all(filterString, (error, result) => {
                if(error) {
                    console.log('filter all error: ' + error);
                    return reject(error);
                }

                return resolve(result);
            });
        });
    }

    DataBase.prototype.delete = function (id) {
        let deleteString = 'DELETE FROM clipboard WHERE id = ?';
        this.database.run(deleteString, [id], (result, error) => {
            if(null != result) {
                console.log('delete error: ');
                console.log(error);
            }
        });
    }

    DataBase.prototype.close = function () {
        this.database.close(handleError);
    }

    return DataBase;
}());

exports.DataBase = DataBase;