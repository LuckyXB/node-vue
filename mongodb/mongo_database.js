const mongodb_client = require("mongodb").MongoClient;
const db_url = "mongodb://localhost:27017";

function getDb(callback) {
    mongodb_client.connect(db_url, function (err, client) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("连接成功.");
        const test_db = client.db('test');
        callback(test_db);
    });
}

function getTestSync(db_name) {
    return new Promise(function (resolve, reject) {
        mongodb_client.connect(db_url, function (err, client) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            console.log("连接成功.");
            const test_db = client.db(db_name);
            resolve(test_db);
        });
    });
}

function gettestdata(_table, filter) {
    return new Promise(function (resolve, reject) {
        _table.find(filter).toArray(function (err, result) {

            if (err) {
                reject(err);
                return;
            }

            resolve(result);
        });
    });
}
module.exports = {
    getDb,
    getTestSync,
    gettestdata
}