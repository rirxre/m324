require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todoList');

const app = express();
app.use(cors());
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
        const todo = await TodoModel.create(req.body);
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/updateTodoList/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(todo);
    } catch (err) {
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
