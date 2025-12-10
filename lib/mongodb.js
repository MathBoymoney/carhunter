// lib/mongodb.js
import { MongoClient } from "mongodb";

if (!process.env.MONGODB) {
  throw new Error("MONGODB environment variable is not set");
}

const uri = process.env.MONGODB;
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
