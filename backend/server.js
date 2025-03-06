import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import TodoModel from "./models/todoList.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://m324-1.onrender.com'], // Lokales Frontend + Render Frontend erlauben
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}

connectDB();

// API-Routen
app.get("/getTodoList", async (req, res) => {
    try {
        const todoList = await TodoModel.find({});
        res.json(todoList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/addTodoList", async (req, res) => {
    try {
        const { task, status, deadline } = req.body;

        if (!task || !status || !deadline) {
            return res.status(400).json({ error: "Alle Felder müssen ausgefüllt sein" });
        }

        const todo = await TodoModel.create(req.body);
        res.status(201).json(todo);
    } catch (err) {
        console.error("Error adding task:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Update-Funktion für eine Aufgabe (PUT)
app.put("/updateTodoList/:id", async (req, res) => {
    try {
        const updatedTask = await TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Aufgabe nicht gefunden" });
        }

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Löschen einer Aufgabe (DELETE)
app.delete("/deleteTodoList/:id", async (req, res) => {
    try {
        const deletedTask = await TodoModel.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ error: "Aufgabe nicht gefunden" });
        }

        res.json({ message: "Aufgabe erfolgreich gelöscht" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
