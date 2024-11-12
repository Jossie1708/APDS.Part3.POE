import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import checkauth from "../check-auth.mjs";

const router = express.Router();

router.get("/transactions", async (req, res) => {
    try {
        // Connect to the collection
        const collection = await db.collection("posts");

        // Log the action for tracing purposes
        console.log("Fetching all transactions");

        // Retrieve all transaction documents from the collection
        const results = await collection.find({}).toArray();

        // Send the data as a JSON response
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        console.error(error.stack);  // Log the stack trace for debugging
        res.status(500).json({ error: "Failed to fetch transactions." });
    }
});



// Create a new transaction.
router.post("/upload", async (req, res) => {
    try {
        const newDocument = {
            user: req.body.username,
            amount: req.body.amount,
            currency: req.body.currency,
            provider: req.body.provider,
            accountNumber: req.body.accountNumber
                };
        const collection = await db.collection("posts");
        const result = await collection.insertOne(newDocument);
        res.status(201).json({ message: "Transaction created successfully", transactionId: result.insertedId });
    } catch (error) {
        console.error("Error uploading transaction:", error);
        res.status(500).json({ error: "Failed to upload transaction." });
    }
});

// Update a transaction by id
router.patch("/:id", checkauth, async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id), user: req.user.username };
        const updates = {
            $set: {
                user: req.body.username,
                amount: req.body.amount,
                currency: req.body.currency,
                provider: req.body.provider,
                accountNumber: req.body.accountNumber,
            }
        };
        const collection = await db.collection("posts");
        const result = await collection.updateOne(query, updates);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Transaction not found or not modified." });
        }
        
        res.status(200).json({ message: "Transaction updated successfully." });
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ error: "Failed to update transaction." });
    }
});

// Get a single record by id
router.get("/:id", async (req, res) => {
    try {
        const collection = await db.collection("posts");
        const query = { _id: new ObjectId(req.params.id) };
        const result = await collection.findOne(query);

        if (!result) {
            return res.status(404).json({ error: "Post not found." });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Failed to fetch post." });
    }
});

// Delete a transaction
router.delete("/transactions/:id", checkauth, async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id), user: req.user.username };
        const collection = await db.collection("posts");
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Transaction not found." });
        }

        res.status(200).json({ message: "Transaction deleted successfully." });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ error: "Failed to delete transaction." });
    }
});

export default router;
