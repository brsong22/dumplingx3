import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getMongoDb } from "@/lib/mongodb";
import { User } from "@/types/user";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const db = await getMongoDb();

    // Check if user already exists
    const existingUser: User | null = await db.collection<User>("users").findOne({ email });
    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.collection<User>("users").insertOne({
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return NextResponse.json({ message: "User created", userId: result.insertedId }, { status: 201 });
}
