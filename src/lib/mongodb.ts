import { MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_CONNECTION) {
    throw new Error("Please add MONGO_CONNECTION to your environment variables");
}

if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        // eslint-disable-next-line
        (global as any)._mongoClientPromise = client.connect();
    }
    // eslint-disable-next-line
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;