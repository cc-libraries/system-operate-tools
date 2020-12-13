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
                //TODO: cc_hash INTEGER,
                let createTable = `CREATE TABLE IF NOT EXISTS cc_clipboard (
                    cc_id INTEGER PRIMARY KEY,
                    cc_time INTEGER,
                    cc_content TEXT)`;
                this.database.run(createTable, (error) => {
                    if(error) {
                        console.error('create table error: ' + error);
                        return reject(error);
                    } else {
                        console.log('create table success.');
                    }
                });

                // this.database.all("SELECT * FROM cc_clipboard ORDER BY cc_time desc",[], callback);
                this.database.all("SELECT * FROM cc_clipboard ORDER BY cc_time desc",[], (error, result) => {
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

    DataBase.prototype.insert = function (item, callback) {
        // this.database.serialize(() => {
            let insertString = `INSERT INTO cc_clipboard (cc_id, cc_time, cc_content) VALUES (?, ?, ?)`;
            this.database.run(insertString, [item.id, item.time, item.content]);
        // });
    }

    DataBase.prototype.insertMore = function (items, callback) {
        let insertString = `INSERT INTO cc_clipboard VALUES(?)`;
        var statement = this.database.prepare(insertString, callback);
        items.each((item) => {
            statement.run(item.id + ',' + item.time + ',' + item.content);
        }, callback);
        statement.finalize(callback);
    };

    DataBase.prototype.update = function (item) {
        // this.database.serialize(() => {
        let updateString = 'UPDATE cc_clipboard SET cc_time = ?, cc_content = ? WHERE cc_id = ?';
        this.database.run(updateString, [item.time, item.content, item.id]);
        // });
    }

    DataBase.prototype.getTop20 = function(callback) {
        return new Promise((resolve, reject) => {
            // this.database.serialize(() => {
            this.database.all("SELECT * FROM cc_clipboard ORDER BY cc_time desc", (error, result) => {  //TODO: limit 20
                console.log('Database getTop20: ');
                if(error) {
                    console.log('select all error: ' + error);
                    return reject(error);
                }

                return resolve(result);
            });
            // });
        });
    }

    DataBase.prototype.updateMore = function (items, callback) {
        let updateString = `UPDATE cc_clipboard SET ?`;
        var statement = this.database.prepare(updateString, callback);
        items.each((item) => {
            statement.run('cc_time = ' + item.time + ', cc_content = ' + item.content + ' WHERE cc_id = ' + item.id, callback);
        }, callback);
        statement.finalize(callback);
    }

    DataBase.prototype.filter = function (content, callback) {
        let filterString = `SELECT * FROM cc_clipboard WHERE cc_content LIKE '%` + content + `' ORDER BY cc_time DESC LIMIT 10`;
        this.database.each(filterString, callback);
    }

    DataBase.prototype.close = function () {
        this.database.close(handleError);
    }

    return DataBase;
}());

exports.DataBase = DataBase;