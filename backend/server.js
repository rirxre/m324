import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import TodoModel from "./models/todoList.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: '*', // Falls nur das Frontend erlaubt sein soll, setze die Render-Frontend-URL hier ein
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// Sichere MongoDB-Verbindung
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
            return res.status(400).json({ error: "All fields are required" });
        }

        const todo = await TodoModel.create(req.body);
        res.status(201).json(todo);
    } catch (err) {
        console.error("Error adding task:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.put("/updateTodoList/:id", async (req, res) => {
    try {
        console.log("📥 Eingehende Daten für Update:", req.body); // Debugging

        const { id } = req.params;
        const updatedTask = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Aufgabe nicht gefunden" });
        }

        res.json(updatedTask);
    } catch (err) {
        console.error("❌ Fehler beim Aktualisieren:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.delete("/deleteTodoList/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await TodoModel.findByIdAndDelete(id);
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
