import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION!;
const dbName = process.env.MONGO_DB!;

declare global {
    // eslint-disable-next-line no-var
    var _mongoClient: Promise<MongoClient> | undefined;
}

let client: Promise<MongoClient> | null = null;
let db: Db | null = null;

if (!uri) throw new Error("No MongoDB connection string defined");
if (!dbName) throw new Error("No MongoDB DB defined");

export async function getMongoClient(): Promise<MongoClient> {
    if (client) return client;

    if (process.env.NODE_ENV === "development") {
        if (!global._mongoClient) {
            global._mongoClient = new MongoClient(uri).connect();
        }
        client = global._mongoClient;
    } else {
        client = new MongoClient(uri).connect();
    }

    return client;
}

export async function getMongoDb(): Promise<Db> {
    if (db) return db;

    const client = await getMongoClient();
    db = client.db(dbName);
    return db;
}

interface CounterDoc {
    _id: string;
    seq: number;
}
export async function getNextId(db: Db, field: string): Promise<number> {
    const result = await db.collection<CounterDoc>("counters").findOneAndUpdate(
        { _id: field },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );
    return result.value?.seq ?? 1;
}