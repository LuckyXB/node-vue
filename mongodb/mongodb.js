const mongodb = require('mongodb');
const mongo_client = mongodb.MongoClient;
const db_url = 'mongodb://localhost:27017';

let storeDB;

function getStoreDB(callback){
    if(storeDB){
        callback(storeDB);
        return;
    }
    mongo_client.connect(db_url,{useUnifiedTopology:true},function(err,client){
        if(err){
            console.log(err);
            return;
        }
        console.log('连接成功');
        storeDB = client.db('store');
        callback(storeDB);
    });
}

module.exports = {
    getStoreDB
}