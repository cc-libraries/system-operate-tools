export function demo () {
    // var clipboard11 = require('clipboard');  //TODO: supported
    // var n = clipboard11.foo();
    // console.log('===111===');
    // console.log(n);
    // console.log('===222===');

    var sqlite3 = require('sqlite3');
    var db = new sqlite3.Database(':memory:');

    db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
    });

    db.close();
}

var DataBase = /** @class */ (function () {
    function DataBase() {
        this.sqlite3 = require('sqlite3');
        this.database = new this.sqlite3.Database(':memory:');
    }

    DataBase.prototype.instance = function (dataBaseName) {
        this.database.serialize(function() {});
    };

    return DataBase;
}());