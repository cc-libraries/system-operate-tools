const sqlite3 = require('sqlite3');
exports.DataBase = void 0;

var DataBase = /** @class */ (function () {
    function DataBase(filePath = ':memory:') {
        this.database = new sqlite3.Database(filePath, sqlite3.OPEN_READWRITE, (error) => {
            if(error) {
                console.error('Could not connect to database', error);
            } else {
                console.log('Connected to database');
            }
        });  //TODO: handle exception
    }

    DataBase.prototype.init = function (callback) {
        this.database.serialize(() => {
            //TODO: cc_hash INTEGER,
            let createTable = `CREATE TABLE IF NOT EXISTS cc_clipboard (
                cc_id INTEGER PRIMARY KEY,
                cc_time INTEGER,
                cc_content TEXT)`;
            this.database.run(createTable, (error) => {
                if(error) {
                    console.log('create table error: ' + error);
                } esle {
                    console.log('create table success.');
                }
            });

            this.database.each("SELECT * FROM cc_clipboard ORDER BY cc_time desc limit 10", callback);
        });
    }

    DataBase.prototype.handleError = function (error) {
        if(null !== error) {
            console.trace('Database failed. error: ' + error);
        }
    }

    DataBase.prototype.insert = function (items, callback) {
        let insertString = `INSERT INTO cc_clipboard VALUES(?)`;
        var statement = this.database.prepare(insertString, callback);
        items.each((item) => {
            statement.run(item.id + ',' + item.time + ',' + item.content);
        }, callback);
        statement.finalize(callback);
    };

    DataBase.prototype.update = function (items, callback) {
        let updateString = `UPDATE cc_clipboard SET ?`;
        var statement = this.database.prepare(updateString, callback);
        items.each((item) => {
            statement.run('cc_time = ' + item.time + ', cc_content = ' + item.content + ' WHERE cc_id = ' + item.id, callback);
        }, callback);
        statement.finalize(callback);
    }

    DataBase.prototype.select = function (content, callback) {
        let selectString = `SELECT * FROM cc_clipboard WHERE cc_content LIKE '%` + content + `' ORDER BY cc_time DESC LIMIT 10`;
        this.database.each(selectString, callback);
    }

    DataBase.prototype.close = function () {
        this.database.close(handleError);
    }

    return DataBase;
}());

exports.DataBase = DataBase;