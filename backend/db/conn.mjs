import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = "mongodb+srv://duncan:i0RJQ962mG2jKUfQ@cluster0.nv83w.mongodb.net/?retryWrites=true&w=majority";
console.log("Connection String:", connectionString); // Log the connection string

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
    console.log('mongoDB is CONNECTED!!! :)');
} catch (e) {
    console.error("Connection Error:", e);
}

let db = client.db("users"); // Ensure the database name is correct

export default db;
