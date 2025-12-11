// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB; // ta variable Vercel
if (!uri) {
  throw new Error("🔴 Variable d'environnement MONGODB manquante");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    // useNewUrlParser et useUnifiedTopology plus nécessaires avec les nouvelles versions
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
