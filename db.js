const mongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId;
mongoClient.connect("mongodb://localhost:27017/workshop", {useUnifiedTopology:true})
           .then(conn => global.conn = conn.db("workshop"))
           .catch(err => console.log(err))

function findAll(callback) {
    global.conn.collection("customers").find({}).toArray(callback);
}

function insert(customer, callback){
    global.conn.collection("customers").insertOne(customer, callback);
}

function findOne(id, callback){
    global.conn.collection("customers").findOne(new ObjectId(id), callback);
}

function update(id, customer, callback){
    global.conn.collection("customers").updateOne({_id: new ObjectId(id)}, customer, callback);
}

function deleteOne(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne }
