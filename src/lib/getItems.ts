import { getMongoDb } from "@/lib/mongodb";

export async function getItemsByUserEmail(email: string, limit: number = 10) {
    const db = await getMongoDb();
    const dbQuery = db.collection("items").find({ createdBy: email });
    if (limit > 0) {
        dbQuery.limit(limit);
    }
    return dbQuery.toArray();
}