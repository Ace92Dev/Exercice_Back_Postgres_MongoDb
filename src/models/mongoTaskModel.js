const { connect, ObjectId } = require('../db/mongo');

async function getAll() {
  const db = await connect();
  const docs = await db.collection('tasks').find({}).sort({ _id: 1 }).toArray();
  return docs.map(d => ({ id: d._id.toString(), title: d.title }));
}

async function add(title) {
  const db = await connect();
  const res = await db.collection('tasks').insertOne({ title });
  return { id: res.insertedId.toString(), title };
}

async function remove(id) {
  let oid;
  try {
    oid = new ObjectId(id);
  } catch (e) {
    return false;
  }
  const db = await connect();
  const res = await db.collection('tasks').deleteOne({ _id: oid });
  return res.deletedCount > 0;
}

module.exports = { getAll, add, remove };

