const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.MONGO_DB_NAME);
  }
  return db;
}

module.exports = { connect, ObjectId };

