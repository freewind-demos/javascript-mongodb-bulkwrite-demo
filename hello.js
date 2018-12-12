const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const DB_NAME = 'javascript-mongodb-bulkwrite-demo';
const COLLECTION_NAME = 'users';

async function clearDb(db) {
  console.log('------- clearDb --------');
  const collections = await db.collections();
  await Promise.all(collections.map(async it => {
    await it.drop();
  }));
}

async function createUsers(users) {
  console.log('------- createUsers --------');
  users.insertMany([
    {
      name: 'javascript',
      age: 10
    }, {
      name: 'mongodb',
      age: 20
    }
  ])
}

async function printUsers(users) {
  console.log('------- printUsers --------');
  await users.find().forEach(user => {
    console.log(user);
  })
}

async function bulkWrite(users) {
  console.log('------- bulkWrite --------');
  await users.bulkWrite([
    {
      insertOne: {
        document: {
          name: 'bulk-insert1',
          age: 100
        }
      },
      updateOne: {
        filter: {
          name: 'mongodb'
        },
        update: {
          $set: {
            age: 200
          }
        }
      }
    }
  ])
}

async function run() {
  const mongo = await MongoClient.connect(url, {useNewUrlParser: true});
  const db = mongo.db(DB_NAME);

  await clearDb(db);

  const users = await db.createCollection(COLLECTION_NAME);

  await createUsers(users);

  await printUsers(users);

  await bulkWrite(users);

  await printUsers(users);

  await mongo.close()
}

run();
